"use client"; // Tandai sebagai Client Component
import Link from "next/link";
import { handleRegister } from "@/actions/regist";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Register() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, email, password }),
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       alert(data.message); // Tampilkan pesan sukses
  //       router.push("/login"); // Redirect ke halaman login
  //     } else {
  //       const errorData = await res.json();
  //       alert(errorData.error); // Tampilkan pesan error
  //     }
  //   } catch (error) {
  //     console.error("An unexpected error happened:", error);
  //     alert("Registration failed. Please try again.");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h1>
        <form action={handleRegister} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
