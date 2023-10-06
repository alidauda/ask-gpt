import { getServerAuthSession } from "@/utils/auth";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import z from "zod";

const bodySchema = z.object({
    pdf: z.string()
  });

export async function POST(req:Request){
    const session = await getServerAuthSession();
  if (!session?.user) {
    return NextResponse.json({
      error: 'You must be signed in to upload a PDF',
      status: 401,
    });
  }

try {

    const body = await req.json();
    console.log(body)

    const validate = bodySchema.safeParse(body);
    if (!validate.success) {
        return NextResponse.json(validate.error);
      }
    const pdfUrl=await prisma.pdf.findFirst({
        where:{
            id:validate.data.pdf
        }
    })
    return NextResponse.json({
        data: pdfUrl,
        status: 200,
        error: null,
      });


} catch (e) {
    if (e instanceof z.ZodError) {
        const error = e.format();
        return NextResponse.json({
          error,
          status: 400,
          data: null,
        });
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({
          error: e.message,
          status: 400,
          data: null,
        });
      }
      return NextResponse.json({
        error: e,
        status: 500,
        data: null,
      });
    
}

    
}