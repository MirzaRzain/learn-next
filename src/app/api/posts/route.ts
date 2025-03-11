import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromToken } from "@/lib/auth";
import ImageKit  from "imagekit";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET(request: NextApiRequest) {
    const userId = getUserIdFromToken(request);
    // const requestToken = request.headers.authorization
    // console.log(requestToken)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const posts = await prisma.post.findMany({
    include: { user: true },
  });
  return NextResponse.json({ posts }, { status: 200 });
}



export async function POST(request) {
  const userId = getUserIdFromToken(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use formData() instead of json() since you're sending FormData
  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");

  if (!title || !content || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await image.arrayBuffer());

    const imageUpload = await imagekit.upload({
      file: buffer, 
      // fileName: `${Date.now()}.jpg`, 
      fileName: `${Date.now()}`, 
    });

    if (!imageUpload || !imageUpload.url) {
      throw new Error("Image upload failed");
    }

    const imageUrl = imageUpload.url;
    

    // Create post in the database
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image: imageUrl,
        userId,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}

// export async function PUT(request: Request) {
//   const userId = getUserIdFromToken(request);

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const formData = await request.formData();

//   const postId = formData.get("postId"); // Get postId to update
//   const title = formData.get("title");
//   const content = formData.get("content");
//   const image = formData.get("image");

//   if (!postId || !title || !content) {
//     return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//   }

//   try {
//     // Check if post exists
//     const post = await prisma.post.findUnique({
//       where: { id: Number(postId) },
//     });

//     if (!post) {
//       return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     }

//     if (image) {
//       // Handle image upload if a new image is provided
//       const buffer = Buffer.from(await image.arrayBuffer());

//       const imageUpload = await imagekit.upload({
//         file: buffer,
//         fileName: `${Date.now()}.jpg`,
//       });

//       if (!imageUpload || !imageUpload.url) {
//         throw new Error("Image upload failed");
//       }

//       const imageUrl = imageUpload.url;

//       // Update post with new image
//       post.image = imageUrl;
//     }

//     // Update post with new title and content
//     const updatedPost = await prisma.post.update({
//       where: { id: Number(postId) },
//       data: {
//         title,
//         content,
//         image: post.image, // Preserve old image if no new one is provided
//       },
//     });

//     return NextResponse.json({ post: updatedPost }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating post:", error);
//     return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
//   }
// }