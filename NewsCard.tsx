
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import LikeButton from "./LikeButton";

interface NewsCardProps {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  likes?: number;
  showEditButton?: boolean;
}

const NewsCard = ({ 
  id, 
  title, 
  excerpt, 
  category, 
  image, 
  date, 
  likes = 0, 
  showEditButton = false 
}: NewsCardProps) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    if (id) {
      navigate(`/edit-post/${id}`);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-2 right-2" 
          variant="secondary"
        >
          {category}
        </Badge>
      </div>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{date}</span>
          {id && <LikeButton postId={id} initialLikes={likes} />}
        </div>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          {showEditButton && id && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto" 
              onClick={handleEdit}
              title="Edit post"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{excerpt}</p>
        {id && <Comments postId={id} />}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
