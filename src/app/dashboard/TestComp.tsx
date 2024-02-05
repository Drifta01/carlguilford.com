import { fetchCategories } from "@/lib/data/data";

export default async function TestComp() {
  const data = await fetchCategories();

  return <div className="p-51">Done</div>;
}
