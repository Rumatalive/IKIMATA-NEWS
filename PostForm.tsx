
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { Category } from "@/types/post-form";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PostFormProps {
  title: string;
  content: string;
  category: string;
  categories: Category[];
  loading: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing?: boolean;
  currentImageUrl?: string;
}

export const PostForm = ({
  title,
  content,
  category,
  categories,
  loading,
  onTitleChange,
  onContentChange,
  onCategoryChange,
  onImageChange,
  onSubmit,
  isEditing = false,
  currentImageUrl
}: PostFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(currentImageUrl || null);

  // Handle preview of selected image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      onImageChange(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <Label htmlFor="image" className="block">
          {isEditing ? "Post Image (change optional)" : "Post Image"}
        </Label>
        
        {/* Image Preview Card */}
        <Card className="overflow-hidden">
          <div className="aspect-video w-full relative bg-muted flex items-center justify-center">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Post preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground p-12">
                <ImageIcon className="h-12 w-12 mb-2" />
                <p>Upload an image for your post</p>
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            {/* Title Input */}
            <div className="mb-4">
              <Label htmlFor="title" className="mb-2 block">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            {/* Content Input */}
            <div className="mb-4">
              <Label htmlFor="content" className="mb-2 block">Content</Label>
              <textarea
                id="content"
                className="w-full min-h-[150px] px-3 py-2 rounded-md border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
        
        {/* File Input */}
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!isEditing}
          className="mt-2"
        />
        {isEditing && !imagePreview && (
          <p className="text-sm text-muted-foreground">
            Leave empty to keep the current image
          </p>
        )}
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          className="w-full px-3 py-2 rounded-md border border-input bg-background"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isEditing ? "Updating..." : "Creating..."}
          </>
        ) : (
          isEditing ? 'Update Post' : 'Create Post'
        )}
      </Button>
    </form>
  );
};
