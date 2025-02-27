
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types/video";
import { useNavigate } from "react-router-dom";

interface VideosSectionProps {
  videos: Video[];
  isAdmin: boolean;
}

const VideosSection = ({ videos, isAdmin }: VideosSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-muted/30">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Videos</h2>
        {isAdmin && (
          <Button onClick={() => navigate('/create-video')}>
            Upload Video
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            description={video.description || ''}
            videoUrl={video.video_url}
            thumbnailUrl={video.thumbnail_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
            duration={video.duration}
            category={video.category?.name || 'Uncategorized'}
          />
        ))}
      </div>
    </section>
  );
};

export default VideosSection;
