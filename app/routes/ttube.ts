import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

interface RequestBody {
  videoUrl: string;
  quality?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = (await request.json()) as RequestBody;
    const { videoUrl, quality = "360p" } = body;

    if (!videoUrl) {
      return json({ error: "YouTube URL is required." }, { status: 400 });
    }

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch|shorts|live)|youtu\.be)\/.+/;
    if (!youtubeRegex.test(videoUrl)) {
      return json({ error: "Invalid YouTube URL format." }, { status: 400 });
    }

    const outputDir = path.join(process.cwd(), "public", "downloads");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate a Video Metadata (title, thumbnail) using yt-dlp

    const commandMetadata = `yt-dlp --get-title --get-thumbnail --skip-download "${videoUrl}"`;
    const { stdout: metadataOutput } = await execAsync(commandMetadata);

    const metadataLines = metadataOutput.trim().split("\n");
    const videoTitle = metadataLines[0]; // Pehli line me title hota hai
    const videoThumbnail = metadataLines[1]; // Dusri line me thumbnail URL hota hai


    // Generate a unique filename
    const commandFilename = `yt-dlp --print filename -f "bestvideo[height<=?${quality.replace("p", "")}]+bestaudio/best" --merge-output-format mp4 --geo-bypass "${videoUrl}"`;
    const { stdout: filenameOutput } = await execAsync(commandFilename);

    const filename = filenameOutput.trim();
    const outputFile = path.join(outputDir, filename);

    // Download the video
    const commandDownload = `yt-dlp -f "bestvideo[height<=?${quality.replace("p", "")}]+bestaudio/best" -o "${outputFile}" --merge-output-format mp4 --geo-bypass "${videoUrl}"`;
    console.log("Running command:", commandDownload);

    const { stdout, stderr } = await execAsync(commandDownload);
    console.log("yt-dlp stdout:", stdout);
    if (stderr) console.error("yt-dlp stderr:", stderr);

    if (!fs.existsSync(outputFile)) {
      return json({ error: "Download failed or file not found." }, { status: 500 });
    }

    // ✅ 5 Minute ke baad file delete karne ka logic
    setTimeout(() => {
      if (fs.existsSync(outputFile)) {
        fs.unlink(outputFile, (err) => {
          if (err) console.error("File delete failed:", err);
          else console.log(`✅ File deleted: ${outputFile}`);
        });
      }
    }, 3 * 60 * 1000); // 3 minutes

    return json({
      message: "Download successful",
      downloadUrl: `/downloads/${path.basename(outputFile)}`,
      title: videoTitle,
      thumbnail: videoThumbnail,
    }, { status: 200 });

  } catch (error) {
    console.error("Server error:", error);
    return json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export const headers = () => ({
  "Cache-Control": "no-store, max-age=0, must-revalidate",
});
