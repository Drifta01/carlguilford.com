import categories from "./categories.json";
import items from "./items.json";
import suppliers from "./suppliers.json";

import { prisma } from "@/lib/data/prisma-client";

export const seedData = async () => {
  try {
    const mockCategories = categories.map((category) => ({
      name: category.name,
    }));

    await prisma.category.createMany({
      data: mockCategories,
      skipDuplicates: true,
    });

    const mockItems = items.map((item) => ({
      name: item.name,
      categoryId: item.categoryId,
    }));

    await prisma.item.createMany({
      data: mockItems,
      skipDuplicates: true,
    });

    const mockSuppliers = suppliers.map((supplier) => ({
      name: supplier.name,
    }));

    await prisma.supplier.createMany({
      data: mockSuppliers,
      skipDuplicates: true,
    });

    return "Data seeded successfully!";
  } catch (error: any) {
    return error.message;
  }
};
