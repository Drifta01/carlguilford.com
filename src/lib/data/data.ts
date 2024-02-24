import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/data/prisma-client";

export async function fetchItems() {
  noStore();

  const data = await prisma.item.findMany({
    select: { name: true, itemId: true },
  });

  return data;
}

export async function fetchCategories() {
  noStore();

  const data = await prisma.category.findMany({
    select: { name: true, categoryId: true },
  });

  return data;
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
