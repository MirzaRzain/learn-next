"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return; // Pastikan ID tersedia sebelum fetch

    console.log("Fetching post with ID:", id); // Debugging

    fetch(`/api/posts/${id}`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched post data:", data); // Debugging
        setPost(data.post);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debugging
        await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push("/"); // Redirect ke homepage setelah menghapus
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post");
      }
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!post) return <p className="text-gray-400 text-center">Post not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-300 mb-6">By {post.user.name}</p>
        <div className="relative mb-3 overflow-hidden rounded-lg ">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-25 h-25 object-cover rounded-lg mb-2"
                  />
                )}
              </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-gray-300">{post.content}</p>
        </div>

        {/* Tombol Edit dan Delete */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => router.push(`/posts/${id}/edit`)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Edit Post
          </button>
          {/* <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Delete Post
          </button> */}
        </div>
      </div>
    </div>
  );
}
