import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  const { email, name, image } = session?.user ?? {};

  const respInit : ResponseInit = {
    status: 401
  }

  if (typeof email !== "string"){
    return new Response("Unauthorized", respInit);
  }

  const user = await prisma.user.upsert({
    where: { email: email },
    update: { name: name ?? undefined, image: image ?? undefined },
    create: { email, name: name ?? null, image: image ?? null },
  });
  

  const header = {
    "content-type": "application/json"
  }

  return new Response(JSON.stringify(user), {
    status: 201,
    headers: header,
  });
}
