import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/data/prisma-client";

export async function fetchCategories() {
  noStore();

  const items = await prisma.item.findMany({
    include: {
      category: true,
    },
  });

  return items;
}

export async function fetchItems() {
  noStore();
  const items = await prisma.item.findMany({
    select: { name: true },
  });

  return items;
}

export async function fetchSuppliers() {
  noStore();
  const suppliers = await prisma.supplier.findMany({
    select: {
      supplierId: true,

      name: true,
    },
  });

  return suppliers;
}
