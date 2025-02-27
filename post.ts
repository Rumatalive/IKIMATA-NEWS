
export interface Post {
  id: string;
  title: string;
  content: string;
  category: {
    id: string;
    name: string;
  } | null;
  created_at: string;
  image_url: string;
  likes: number;
}
