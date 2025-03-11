"use client"
import Link from "next/link";  
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, Search, ChevronDown, SlidersHorizontal, LayoutGrid } from "lucide-react";
import { getPost } from "@/actions/getPost";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [watches, setWatches] = useState([]); 
  const [error, setError] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPost(); 
        setWatches(data); 
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []); // Empty dependency array to run only once on mount

  if (error) return <div>{error}</div>; // Show error state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar Component */}
      {isLoggedIn && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>

          <div className="hidden md:block">
            <Button variant="ghost" className="text-white" onClick={toggleSidebar} disabled={!isLoggedIn}>
              MENU
            </Button>
          </div>

          <Link href="/" className="text-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-wider">RICHARD MILLE</h1>
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

            <Button variant="ghost" className="hidden md:flex items-center gap-1 text-sm">
              COLLECTIONS
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full border border-white">
                <span className="sr-only">Collections</span>⋮
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-lg px-4 md:px-8 lg:px-12 py-8">
        {/* Watch Collection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
          {watches.map((watch) => (
            <Link
              key={watch.id}
              href={`/collections/${watch.slug}`}
              className="group transition-transform hover:scale-105 max-w-xs mx-auto"
            >
              <div className="relative mb-3 overflow-hidden rounded-lg aspect-[3/4]">
                {watch.image && (
                  <img
                    src={watch.image}
                    alt={watch.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">{watch.title}</h3>
                <p className="text-xs text-gray-400">{watch.content}</p>
                <p className="text-xs text-gray-400">Posted by: {watch.user.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}
