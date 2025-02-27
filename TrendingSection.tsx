
import { TrendingUp } from "lucide-react";
import { Post } from "@/types/post";

interface TrendingSectionProps {
  posts: Post[];
}

const TrendingSection = ({ posts }: TrendingSectionProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-muted">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="h-6 w-6 text-destructive" />
        <h2 className="text-2xl font-bold">Trending Now</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <article key={post.id} className="flex gap-4 items-start">
            <span className="text-4xl font-bold text-muted-foreground/30">
              #{index + 1}
            </span>
            <div>
              <span className="text-sm text-primary font-medium">
                {post.category?.name || 'Uncategorized'}
              </span>
              <h3 className="font-semibold mt-1 line-clamp-2">
                {post.title}
              </h3>
              <time className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
