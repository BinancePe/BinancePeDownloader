import { getVideoInfo } from "~/features/instagram";
import { INSTAGRAM_CONFIGS } from "~/features/instagram/constants";
import { getPostIdFromUrl } from "~/features/instagram/utils";
import { HTTPError } from "~/lib/errors";
import { makeErrorResponse, makeSuccessResponse } from "~/lib/http";
import { VideoInfo } from "~/types";

export function handleError(error: any) {
  if (error instanceof HTTPError) {
    const response = makeErrorResponse(error.message);
    return new Response(JSON.stringify(response), { status: error.status });
  } else {
    console.error("Unexpected error:", error);
    const response = makeErrorResponse();
    return new Response(JSON.stringify(response), { status: 500 });
  }
}

export async function loader({ request }: { request: Request }) {
  if (!INSTAGRAM_CONFIGS.enableServerAPI) {
    const notImplementedResponse = makeErrorResponse("Instagram API is disabled");
    return new Response(JSON.stringify(notImplementedResponse), { status: 501 });
  }

  const postUrl = new URL(request.url).searchParams.get("postUrl");
  if (!postUrl) {
    const badRequestResponse = makeErrorResponse("Post URL is required");
    return new Response(JSON.stringify(badRequestResponse), { status: 400 });
  }

  const postId = getPostIdFromUrl(postUrl);
  if (!postId) {
    const invalidPostUrlResponse = makeErrorResponse("Invalid Post URL");
    return new Response(JSON.stringify(invalidPostUrlResponse), { status: 400 });
  }

  try {
    const postJson = await getVideoInfo(postId);
    const successResponse = makeSuccessResponse<VideoInfo>(postJson);
    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return handleError(error);
  }
}
