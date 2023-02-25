export function Hero() {
  return (
    <section className="max-w-[1000px] mx-auto mb-[30vh] grid grid-cols-2 gap-4 pt-10">
      <img
        className="rounded"
        src="/assets/logo/hero-banner.png"
        alt="A PC and mobile phone displaying a Twitter account banner"
      />
      <div>
        <h1 className="text-5xl text-blue-400 font-bold">
          Shape <span className="text-cyan-400">Snap</span>
        </h1>
        <h2 className="text-2xl font-bold mb-8">One tool, all social media platforms</h2>

        <p>Generate profile photos and banners for Twitter, YouTube, Twitch, and more.</p>
        <a
          href="#playground"
          className="block max-w-fit bg-blue-400 my-6 px-6 py-3 text-white hover:bg-blue-500 transition-colors rounded"
        >
          Try it now
        </a>
      </div>
    </section>
  );
}
