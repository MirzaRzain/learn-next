import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter()


  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 

    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const goToPosts = () => {
    router.push("/posts")
  }

  if (!isClient) {
    return null; 
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <div
            className="absolute left-0 top-0 w-64 h-full bg-gray-800 text-white p-6 overflow-y-auto border-r-2 border-gray-600" // Sidebar styling
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              className="text-white mb-4 border border-gray-600 w-full" 
              onClick={onClose}
            >
              Close
            </Button>
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full text-white flex items-center border border-gray-600" 
                onClick={handleProfileClick}
              >
                <User className="mr-2" />
                Profile
              </Button>

              
                <Button
                  variant="ghost"
                  className="w-full text-white flex items-center border border-gray-600"
                  onClick={goToPosts} 
                >
                  Posts
                </Button>
              

              <Button
                variant="ghost"
                className="w-full text-white flex items-center border border-gray-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
