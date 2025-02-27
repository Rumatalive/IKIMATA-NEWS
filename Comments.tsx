
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/lib/supabaseClient';
import { MessageSquare, Loader2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface CommentsProps {
  postId?: string;
  videoId?: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

const Comments = ({ postId, videoId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please login to comment",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('comments')
        .insert([
          {
            content: newComment,
            user_id: user.id,
            post_id: postId,
            video_id: videoId,
          },
        ]);

      if (error) throw error;

      setNewComment('');
      fetchComments(); // Refresh comments after posting

      toast({
        description: "Comment posted successfully!",
      });
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

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .or(`post_id.eq.${postId},video_id.eq.${videoId}`);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } else {
      setComments(data || []);
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
          </Button>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-2">
              <p className="text-sm text-muted-foreground mb-1">
                Posted {formatDistanceToNow(new Date(comment.created_at))} ago
              </p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Comments;
