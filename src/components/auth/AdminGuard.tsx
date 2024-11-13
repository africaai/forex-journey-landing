import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthorization = async () => {
      const sessionToken = localStorage.getItem('sessionToken');
      
      if (!sessionToken) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_WEBHOOK_BASE_URL}/verify-admin`, {
          headers: {
            'Authorization': `Bearer ${sessionToken}`
          }
        });

        if (!response.ok) throw new Error('Unauthorized');
        
        setIsAuthorized(true);
      } catch (error) {
        toast({
          title: "Unauthorized",
          description: "You don't have permission to access this area",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    checkAuthorization();
  }, [navigate]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}