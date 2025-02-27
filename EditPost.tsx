
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/supabaseClient';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { useCategories } from '@/hooks/useCategories';
import { postService } from '@/services/postService';
import { PostForm } from '@/components/post/PostForm';
import { Post } from '@/types/post';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isAdmin = useAdminCheck();
  const categories = useCategories();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    setFetchLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, category:categories(id, name)')
        .eq('id', postId)
        .single();

      if (error) throw error;

      if (data) {
        const post = data as Post;
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category?.id || '');
        setCurrentImageUrl(post.image_url);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let imageUrl = currentImageUrl;
      
      // Upload new image if provided
      if (image) {
        imageUrl = await postService.uploadImage(image);
      }
      
      // Update post
      const { error } = await supabase
        .from('posts')
        .update({
          title,
          content,
          category_id: category,
          image_url: imageUrl
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        description: "Post updated successfully!",
      });
      
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(category);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
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

  if (!isAdmin) {
    return null;
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
      </CardHeader>
      <CardContent>
        <PostForm
          title={title}
          content={content}
          category={category}
          categories={categories}
          loading={loading}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onCategoryChange={setCategory}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          isEditing={true}
          currentImageUrl={currentImageUrl}
        />
      </CardContent>
    </Card>
  );
};

export default EditPost;
