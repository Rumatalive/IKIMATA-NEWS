
export interface PostFormData {
  title: string;
  content: string;
  category_id: string;
  image_url: string;
  user_id: string;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
}
