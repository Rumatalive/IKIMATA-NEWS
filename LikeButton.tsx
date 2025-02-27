
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';
import { Heart } from "lucide-react";

interface LikeButtonProps {
  postId?: string;
  videoId?: string;
  initialLikes?: number;
}

const LikeButton = ({ postId, videoId, initialLikes = 0 }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please login to like",
          variant: "destructive",
        });
        return;
      }

      if (!isLiked) {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert([
            {
              user_id: user.id,
              post_id: postId,
              video_id: videoId,
            },
          ]);

        if (error) throw error;
        
        // Update likes count in posts/videos table
        if (postId) {
          await supabase
            .from('posts')
            .update({ likes: likes + 1 })
            .eq('id', postId);
        } else if (videoId) {
          await supabase
            .from('videos')
            .update({ likes: likes + 1 })
            .eq('id', videoId);
        }

        setLikes(prev => prev + 1);
        setIsLiked(true);
      } else {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({
            user_id: user.id,
            ...(postId ? { post_id: postId } : { video_id: videoId }),
          });

        if (error) throw error;

        // Update likes count in posts/videos table
        if (postId) {
          await supabase
            .from('posts')
            .update({ likes: likes - 1 })
            .eq('id', postId);
        } else if (videoId) {
          await supabase
            .from('videos')
            .update({ likes: likes - 1 })
            .eq('id', videoId);
        }

        setLikes(prev => prev - 1);
        setIsLiked(false);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className={isLiked ? "text-red-500" : ""}
    >
      <Heart className="h-4 w-4 mr-2" fill={isLiked ? "currentColor" : "none"} />
      {likes}
    </Button>
  );
};

export default LikeButton;
