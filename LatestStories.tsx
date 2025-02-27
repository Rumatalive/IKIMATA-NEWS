
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/NewsCard";
import { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";

interface LatestStoriesProps {
  posts: Post[];
  isAdmin: boolean;
}

const LatestStories = ({ posts, isAdmin }: LatestStoriesProps) => {
  const navigate = useNavigate();
  
  return (
    <section id="latest-stories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Latest Stories</h2>
        {isAdmin && (
          <Button onClick={() => navigate('/create-post')}>
            Create Post
          </Button>
        )}
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
    </section>
  );
};

export default LatestStories;
