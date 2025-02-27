
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        if (!data || error) {
          toast({
            title: "Access Denied",
            description: "You must be an admin to create posts.",
            variant: "destructive",
          });
          navigate('/');
        } else {
          setIsAdmin(true);
        }
      } else {
        navigate('/auth');
      }
    };

    checkAdminStatus();
  }, [navigate, toast]);

  return isAdmin;
};
