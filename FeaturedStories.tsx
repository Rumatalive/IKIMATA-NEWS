
import { Star } from "lucide-react";
import { Post } from "@/types/post";

interface FeaturedStoriesProps {
  posts: Post[];
}

const FeaturedStories = ({ posts }: FeaturedStoriesProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="flex items-center gap-2 mb-8">
        <Star className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Featured Stories</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="relative group transform transition-transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 rounded-lg z-10" />
            <img
              src={post.image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <span className="inline-block px-3 py-1 bg-primary/90 rounded-full text-sm mb-3">
                {post.category?.name || 'Uncategorized'}
              </span>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-white/80 line-clamp-2 text-sm">
                {post.content.substring(0, 120)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedStories;
