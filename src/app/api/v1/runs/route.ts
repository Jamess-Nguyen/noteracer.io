import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const RunInput = z.object({
  notes: z.array(z.string()).length(10),
  date: z.string().datetime(),
  runTime: z.number().int().nonnegative(),
});

export async function POST(req: Request) {
  const session = await auth();
  const userEmail = session?.user?.email ?? "";

  if (userEmail === "") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
  where: { email: userEmail },
  select: { id: true },
  });

  if (user === null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;
  const json = await req.json();
  const parsed = RunInput.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { notes, date, runTime } = parsed.data;

  const responseBody = await prisma.run.create({
    data: {
      userId,
      notes,
      runTimeMs: runTime,
      date: new Date(date),
    },
    select: { id: true, date: true, runTimeMs: true, notes: true },
  });

  return NextResponse.json(responseBody, { status: 201 });
}
