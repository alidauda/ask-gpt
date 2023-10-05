import prisma from '@/utils/db';
import { cache } from 'react';
export const revalidate = 3600;
export const getPdfs = cache(async (id: string) => {
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
});
