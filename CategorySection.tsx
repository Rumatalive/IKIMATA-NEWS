
import NewsCard from "@/components/NewsCard";
import { Post } from "@/types/post";
import { Separator } from "@/components/ui/separator";

interface CategorySectionProps {
  id: string;
  title: string;
  posts: Post[];
  className?: string;
  isAdmin?: boolean;
}

const CategorySection = ({ id, title, posts, className = "", isAdmin = false }: CategorySectionProps) => {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <NewsCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.content.substring(0, 150) + '...'}
              category={post.category?.name || 'Uncategorized'}
              image={post.image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
              date={new Date(post.created_at).toLocaleDateString()}
              likes={post.likes}
              showEditButton={isAdmin}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
