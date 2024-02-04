import { unstable_noStore } from "next/cache";
import { prisma } from "@/lib/data/prisma-client";

export async function fetchCategories() {
  const items = await prisma.item.findMany({
    include: {
      category: true,
    },
  });

  return items;
}

// findMany<T extends ItemFindManyArgs<ExtArgs>>(
//   args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>
// ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, 'findMany'>>

export async function fetchItems() {
  const items = await prisma.item.findMany({
    args: { name: true },
  });

  return items;
}

export async function fetchSuppliers() {
  const suppliers = await prisma.supplier.findMany({
    include: {
      name: true,
    },
  });

  return items;
}
