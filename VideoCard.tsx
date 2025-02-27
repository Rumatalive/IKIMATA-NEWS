
import { Play, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  category: string;
}

const VideoCard = ({ title, description, videoUrl, thumbnailUrl, duration, category }: VideoCardProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative group">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="secondary"
            size="icon"
            className="mx-2"
            onClick={() => window.open(videoUrl, '_blank')}
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
          {formatDuration(duration)}
        </span>
      </div>
      <CardHeader className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm text-muted-foreground">{category}</span>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open(videoUrl, '_blank')}>
            <Eye className="mr-2 h-4 w-4" />
            Watch
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open(videoUrl, '_blank')}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
