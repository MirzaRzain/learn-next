// 'use server'
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
// // import { DELETE } from "@/app/api/posts/[id]/route";

// export async function getPosts(){
//     const cookieStore = await cookies()
//     const tokenCookie = cookieStore.get('token')
//     if(!tokenCookie){
//         redirect("/login")
//     }
//     const token = tokenCookie.value;
//     console.log(token)

//     const res = await fetch("http://localhost:3000/api/posts", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         cache: "no-store",
//       });

//     if(res.status === 401){
//         redirect("/login")
//     }

//     const data = await res.json();
//     return data;
// }

// export async function deletePost(postId: string){
//     const cookieStore = await cookies()
//     const tokenCookie = cookieStore.get('token')
//     if (!tokenCookie) {
//         redirect("/login");
//     }
//     const token = tokenCookie.value;

//     const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
//         method: "DELETE",
//         headers:{
//             Authorization: `Bearer ${token}`,
//         },
//         cache: "no-store",
//     });

//     if(res.status === 401){
//         redirect("/login");
//     }

//     const data = await res.json()
//     return data;
// }

