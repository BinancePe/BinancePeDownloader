import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { InstaIcon, YoutubeIcon } from "~/components/Icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Free YouTube & Instagram Video Downloader - Fast & HD" },
    {
      name: "description",
      content:
        "Download YouTube and Instagram videos online in HD for free. Fast, secure, and easy-to-use video downloader with no ads!",
    },
    {
      name: "keywords",
      content:
        "YouTube video downloader, Instagram video downloader, download YouTube videos, HD video downloader, online video downloader",
    },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  // Redirect user when they click a button
  const handleDownload = (platform: "youtube" | "insta") => {
    navigate(`/${platform}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 🔹 Banner Section */}
      <header className="relative w-full h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Free YouTube & Instagram Video Downloader
          </h1>
          <p className="mt-4 text-lg">
            Download high-quality videos in seconds. Fast, secure, and free!
          </p>
        </div>
      </header>

      {/* 🔹 Video Downloader Section - Only Buttons */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Download Any Video Instantly
        </h2>
        <p className="mt-2 text-gray-600">
          Choose a platform to start downloading your videos.
        </p>

        {/* Buttons with Icons & Mobile Friendly */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* 🔴 YouTube Button */}
          <button
            onClick={() => handleDownload("youtube")}
            className="flex items-center justify-center space-x-3 px-6 py-3 text-white font-semibold rounded-lg shadow-lg 
                   bg-gradient-to-r from-red-500 to-orange-500 
                   hover:from-orange-500 hover:to-red-600 
                   transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <YoutubeIcon className="h-7 w-7" />
            <span>Download YouTube Video</span>
          </button>

          {/* 🎨 Instagram Button */}
          <button
            onClick={() => handleDownload("insta")}
            className="flex items-center justify-center space-x-3 px-6 py-3 text-white font-semibold rounded-lg shadow-lg 
                   bg-gradient-to-r from-purple-500 to-pink-500 
                   hover:from-pink-500 hover:to-purple-600 
                   transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <InstaIcon className="h-7 w-7" />
            <span>Download Instagram Video</span>
          </button>
        </div>
      </section>

      {/* 🔹 SEO-Optimized Content */}
      <section className="py-12 px-6 max-w-3xl mx-auto text-gray-700">
        <h3 className="text-2xl font-bold">Why Use Our Video Downloader?</h3>
        <p className="mt-2">
          Our free YouTube and Instagram video downloader allows you to save
          your favorite videos in HD quickly and securely. No software required!
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          <li>✅ Download videos from YouTube & Instagram</li>
          <li>✅ High-quality MP4 downloads</li>
          <li>✅ 100% free, no ads, and no registration required</li>
          <li>✅ Works on mobile & desktop</li>
        </ul>
      </section>
    </div>
  );
}
