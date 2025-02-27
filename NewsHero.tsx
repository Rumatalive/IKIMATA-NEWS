
const NewsHero = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
        alt="Featured news"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/90 rounded-full">
            Featured
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            The Future of Technology: AI Revolution
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl">
            Discover how artificial intelligence is reshaping industries and changing the way we live and work.
          </p>
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
