import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromToken } from "@/lib/auth";
import ImageKit from "imagekit"

const prisma = new PrismaClient();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postId = parseInt(params.id);

  // Mengambil post berdasarkan ID
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { user: true }, // jika perlu menginclude informasi user terkait
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  
  const userId = getUserIdFromToken(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ambil data dari FormData
    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const image = formData.get("image");

    // Validasi field yang diperlukan
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Jika ada gambar baru, upload ke ImageKit
    if (image instanceof File) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const imageUpload = await imagekit.upload({
        file: buffer,
        fileName: `${Date.now()}.jpg`,
      });

      if (!imageUpload || !imageUpload.url) {
        throw new Error("Image upload failed");
      }

      imageUrl = imageUpload.url;
    }
    console.log("Received params:", context.params);

    // Update post di database (hanya update gambar jika ada gambar baru)
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(context.params?.id), userId },
      data: {
        title: title as string,
        content: content as string,
        ...(imageUrl && { image: imageUrl }), // Update image hanya jika ada URL baru
      },
    });

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = getUserIdFromToken(request);
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postId = parseInt(params.id);
  
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.userId !== userId) {
    return NextResponse.json({ error: "Forbidden: You can't delete this post" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id: postId } });

  return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = getUserIdFromToken(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postId = parseInt(params.id);
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.userId !== userId) {
    return NextResponse.json({ error: "Forbidden: You can't edit this post" }, { status: 403 });
  }

  const body = await request.json();
  const { title, content } = body;

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { title, content },
  });

  return NextResponse.json({ post: updatedPost }, { status: 200 });
}

