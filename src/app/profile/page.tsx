"use client"
import Sidebar from "@/components/sidebar"
import { profile } from "@/actions/profile"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Search, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: string;
  post: Post[];
}

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  userId: number;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      profile(token)
        .then((userData) => {
          if (userData) {
            setUser(userData);
          }
        })
        .catch((err) => {
          setError("Failed to fetch profile data");
          console.error(err);
        });
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (error) {
    return <div className="min-h-screen bg-black text-white p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>

          <div className="hidden md:block">
            <Button variant="ghost" className="text-white" onClick={toggleSidebar}>
              MENU
            </Button>
          </div>

          <Link href="/" className="text-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-wider text-white">
              RICHARD MILLE
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" className="text-sm">
                ENGLISH
              </Button>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container mx-auto px-4 py-8">
          <h1 className="bg-gray-900 p-6 rounded-lg shadow-lg text-2xl font-semibold mb-6">Profile Page</h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.roles || "No role assigned"}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user?.post.map((post) => (
                <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <Button variant="outline" className="w-full">Read More</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
