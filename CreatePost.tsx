
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/supabaseClient';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { useCategories } from '@/hooks/useCategories';
import { postService } from '@/services/postService';
import { PostForm } from './post/PostForm';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isAdmin = useAdminCheck();
  const categories = useCategories();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast({
        title: "Error",
        description: "Please select an image for the post",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const publicUrl = await postService.uploadImage(image);
      
      await postService.createPost({
        title,
        content,
        category_id: category,
        image_url: publicUrl,
        user_id: user.id,
        likes: 0
      });

      toast({
        description: "Post created successfully!",
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

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 sm:px-0">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
