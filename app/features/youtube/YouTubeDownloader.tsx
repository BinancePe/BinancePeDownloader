import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { BackIcon, DownloadIcon } from "~/components/Icons";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function YouTubeDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [quality, setQuality] = useState("360p");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setDownloadLink("");
    setTitle("");
    setThumbnail("");

    try {
      const response = await fetch("/ttube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl, quality }),
      });

      const data = await response.json();

      if (data.downloadUrl) {
        setDownloadLink(data.downloadUrl);
        setTitle(data.title || "Unknown Title");
        setThumbnail(data.thumbnail || "");
      } else {
        setError(data.error || "Failed to fetch video. Please check the URL.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-warmWhite">
      <div className="bg-white p-8 mt-5 rounded-lg shadow-lg w-full max-w-md">
        

        {/* Show Form Only If No Download Link */}
        {!downloadLink ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-xl font-semibold text-gray-700">Enter Your YouTube URL</Label>
              <Input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-md shadow-sm border border-gray-300">
              <label className="text-gray-700 font-semibold">Video Quality:</label>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-8 py-1 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 transition">
                  {quality}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-white shadow-lg rounded-md border border-gray-200">
                  {["144p", "240p", "360p", "480p", "720p", "1080p"].map((q) => (
                    <DropdownMenuItem
                      key={q}
                      onSelect={() => setQuality(q)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {q}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-75 transition duration-200 flex items-center justify-center gap-2"
            >
              <DownloadIcon className="w-8 h-8 mr-5 invert" />
              {isLoading ? "Processing..." : "Download Now"}
            </Button>

          </form>
        ) : (
          // Show Download Section When Link is Available
          <div className="mt-6">
            <div className="mb-8">
              <Button onClick={() => window.location.reload()} className="mr-4">
                <BackIcon className="invert" />Back
              </Button>
            </div>
            {thumbnail && <img src={thumbnail} alt="Video Thumbnail" className="w-full rounded-md mb-4" />}
            {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
            <div className="w-full flex justify-center">
              <a
                href={downloadLink}
                className="w-full flex mt-6 items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 transition duration-200"
                download
              >
                <DownloadIcon className="w-6 h-6 mr-3 invert" />
                Click Here to Download
              </a>
            </div>

          </div>
        )}

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
