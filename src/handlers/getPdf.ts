import prisma from '@/utils/db';

export async function getPdfs(id: string) {
  const pdf = await prisma.pdf.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      name: true,
      url: true,
    },
  });
  return pdf;
}
