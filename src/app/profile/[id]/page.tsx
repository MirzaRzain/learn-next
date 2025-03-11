"use client";

import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";  // Ensure you import this

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);  // Store the profile data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Track if the component is mounted on the client-side
  const [id, setId] = useState<string | undefined>(undefined);  // Hold the dynamic `id`
  
  const router = useRouter();

  // We use useEffect to check when we are on the client-side
  useEffect(() => {
    setIsClient(true);  // Once the component is mounted, set isClient to true
  }, []);

  useEffect(() => {
    if (!isClient || !router.query.id) return;  // Make sure the router is available on the client side

    const { id } = router.query;
    setId(id as string);  // Set the dynamic `id` from the URL

  }, [router.query, isClient]);  // Only update when the query changes or the component is mounted

  useEffect(() => {
    if (!id) return;  // Wait for `id` to be set before fetching the profile

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found");
          return;
        }

        // Fetch profile data from the API using the dynamic `id`
        const response = await fetch(`/api/profile/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);  // Re-fetch profile data when `id` changes

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Render loading state or profile data
  if (!profile) {
    return <p>Loading profile...</p>;
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

      {/* Profile Information */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="mt-4">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Roles:</strong> {profile.roles || 'No roles assigned'}</p>
        </div>
      </div>
    </div>
  );
}
