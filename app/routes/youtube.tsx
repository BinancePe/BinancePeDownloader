import { MetaFunction } from "@remix-run/node";
import { lazy, Suspense } from "react";

const YouTubeDownloader = lazy(() => import("~/features/youtube/YouTubeDownloader"));

export const meta: MetaFunction = () => {
  return [
    { title: "YouTube Video Downloader - Fast & Free Online HD Downloader" },
    { name: "description", content: "Download YouTube videos in HD, MP4, and MP3 formats instantly. No registration required. Fast and free YouTube downloader online!" },
    { name: "keywords", content: "YouTube Video Downloader, Download YouTube Videos, Free YouTube MP4 Downloader, HD YouTube Downloader, Online YouTube Converter" },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "BinancePe" },
  ];
};

export default function YouTubeDownloadPage() {
  return (
    <div className="">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 
                     bg-gradient-to-r from-red-600 via-gray-800 to-blue-600 
                     bg-clip-text text-transparent drop-shadow-2xl">
        YouTube Video Downloader
      </h1>

      <Suspense fallback={<p className="text-center text-lg">Loading...</p>}>
        <section className="flex flex-col items-center justify-center gap-4">
          <YouTubeDownloader />
        </section>
      </Suspense>

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "YouTube Video Downloader",
            "operatingSystem": "All",
            "applicationCategory": "Multimedia",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "9582"
            }
          }
        `}
      </script>
    </div>
  );
}
