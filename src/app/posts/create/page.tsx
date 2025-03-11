"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast  } from "react-toastify";

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err) => {
  console.log("Error", err);
};

const onSuccess = (res) => {
  console.log("Success", res);
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized! Please log in.");
      router.push("/login");
    }
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("unauthorized! please log in");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image); 

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData, 
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Post created successfully!");
      router.push("/posts");
    } else {
      toast.error("Something went wrong!");
      console.error("Error creating post:", data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Create Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
