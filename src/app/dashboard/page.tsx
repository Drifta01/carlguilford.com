import SuppliersTable from "@/components/tables/SuppliersTable";
import TestComp from "./TestComp";
import { Suspense } from "react";
import { fetchSuppliers } from "@/lib/data/data";
import { Supplier } from "@prisma/client";

export const Page = async () => {
  const suppliers: Supplier[] = await fetchSuppliers();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TestComp />
      </Suspense>

      <SuppliersTable suppliers={suppliers} />
    </>
  );
};

export default Page;
