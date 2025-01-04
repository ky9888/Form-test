import ManagerProducts from "./managerProducts";
import { notFound } from "next/navigation";
export default async function home() {
  let data = [];

  const res = await fetch(
    `https://be-e-commerce-tohe.onrender.com/api/products/getAllProducts`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    notFound(); 
  }
  const ress = await res.json();
  data = ress.data;

  return (
    <div className="mx-auto py-10 w-full">
      <ManagerProducts data={data} />
    </div>
  );
}
