export function Hero() {
  return (
    <section className="mx-auto lg:mt-[10vh] mb-[30vh] grid grid-cols-2 gap-4 pt-10">
      <img
        className="rounded"
        src="/assets/logo/hero-banner.png"
        alt="A PC and mobile phone displaying a Twitter account banner"
      />
      <div>
        <h1 className="text-7xl text-blue-400 font-bold my-8">
          Shape <span className="text-cyan-400">Snap</span>
        </h1>
        <h2 className="text-3xl font-bold mb-8">One tool, all social media platforms</h2>

        <p className="text-2xl">Generate banners for Twitter, YouTube, Twitch, and more.</p>
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
