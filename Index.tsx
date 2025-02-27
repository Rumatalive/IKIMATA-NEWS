
import Navigation from "@/components/Navigation";
import NewsHero from "@/components/NewsHero";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FeaturedStories from "@/components/sections/FeaturedStories";
import TrendingSection from "@/components/sections/TrendingSection";
import LatestStories from "@/components/sections/LatestStories";
import CategorySection from "@/components/sections/CategorySection";
import VideosSection from "@/components/sections/VideosSection";
import ContactSection from "@/components/sections/ContactSection";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Post } from "@/types/post";
import type { Video } from "@/types/video";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categoryOrder = ['technology', 'business', 'culture', 'science', 'sports', 'entertainment'];

  useEffect(() => {
    fetchPosts();
    fetchVideos();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (data && !error) {
        setIsAdmin(true);
      }
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, category:categories(id, name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const allPosts = data;
      setFeaturedPosts(allPosts.slice(0, 3));
      setTrendingPosts(allPosts.slice(3, 6));
      setPosts(allPosts.slice(6));
    }
  };

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*, category:categories(name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setVideos(data);
    }
  };

  const getFilteredPostsByCategory = (categoryName: string) => {
    return posts.filter(post => {
      const matchesCategory = post.category?.name.toLowerCase() === categoryName.toLowerCase();
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <NewsHero />
        <FeaturedStories posts={featuredPosts} />
        <TrendingSection posts={trendingPosts} />
        <LatestStories posts={posts} isAdmin={isAdmin} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news articles..."
              className="pl-10 w-full max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-16">
            {categoryOrder.map((category) => {
              const categoryPosts = getFilteredPostsByCategory(category);
              return categoryPosts.length > 0 && (
                <CategorySection
                  key={category}
                  id={category}
                  title={category.charAt(0).toUpperCase() + category.slice(1)}
                  posts={categoryPosts}
                  isAdmin={isAdmin}
                />
              );
            })}
          </div>
        </div>

        <VideosSection videos={videos} isAdmin={isAdmin} />
        <ContactSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
