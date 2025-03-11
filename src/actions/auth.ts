// src/actions/auth.ts

'use server'

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Fungsi untuk menangani login
export async function handleSubmit(formData: FormData) {
  const cookieStore = await cookies();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const { token } = await res.json();
    cookieStore.set("token", token);

    revalidatePath('/'); // Update cache jika perlu
    redirect('/'); // Redirect ke halaman utama
  } else {
    redirect('/login/?error=loginError');
  }
}

// Fungsi untuk menangani registrasi
export async function handleRegister(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (res.ok) {
    const data = await res.json();
    alert(data.message);
    revalidatePath("/login");
    redirect("/login"); // Redirect ke halaman login
  } else {
    // const errorData = await res.json();
    // alert(errorData.error); // Tampilkan pesan error
  }
}
