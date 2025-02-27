
import { supabase } from '@/lib/supabaseClient';
import { PostFormData } from '@/types/post-form';

export const postService = {
  async uploadImage(image: File): Promise<string> {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('post_images')
      .upload(fileName, image);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('post_images')
      .getPublicUrl(fileName);

    return publicUrl;
  },

  async createPost(postData: PostFormData): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .insert([postData]);

    if (error) throw error;
  }
};
