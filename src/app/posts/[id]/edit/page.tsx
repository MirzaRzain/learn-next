"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please Log In First.")
      router.push("/login");
      return;
    }
    setToken(token);

    fetch(`/api/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Unauthorized: Invalid token.");
          router.push("/login");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Post data:", data); // Debugging: see what data is returned
        if (data.post) {
          setTitle(data.post.title || "");
          setContent(data.post.content || "");
          setImagePreview(data.post.image || "");
        } else {
          console.error("Post data not found.");
        }
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id, router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e)=> {
    e.preventDefault();
    if(!token){
      alert("unauthorized missing token");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if(image){
      formData.append("image", image);
    }

    try{
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if(response.status === 401){
        toast.error("Unauthorized: Invalid token.")
        router.push("/login");
        return;
      }

      if(!response.ok){
        throw new Error("Failed to update post")
      }
      toast.success("Update data successfully!!")
      router.push("/posts")
    }catch(error){
      toast.error("Something happened: Failed edit data!!")
      console.error("Error updating post", error);
      alert("Failed to update post");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            {/* 
            <input
              type="text"
              id="image"
              placeholder="Enter post image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            /> */}
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Image File
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover" />
              )}
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Write your post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
