import { MetaFunction } from "@remix-run/node";
import { InstaFrom } from "~/features/instagram/components/form";

export const meta: MetaFunction = () => {
  return [
    { title: "Instagram" },
    { name: "Instagram videos Downloader", content: "Welcome to Downloader BinancePe!" },
  ];
};

export default function Instagram() {
  return (
    <div className="flex flex-col py-8">
      <h1 className="text-balance mb-8 text-center text-4xl font-extrabold">
        Instagram Video Downloader
      </h1>
      <section className="flex flex-col items-center justify-center gap-4">
        <InstaFrom />
      </section>
    </div>
  );
}