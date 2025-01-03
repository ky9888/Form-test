import ManagerProducts from "./managerProducts";

export default async function home() {
  let data = [];
  try {
    const res = await fetch(`https://be-e-commerce-tohe.onrender.com/api/products/getAllProducts`, { cache: "no-store" });
    const ress = await res.json();
    data = ress.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }


  return (
    <div className="mx-auto py-10 w-full">
      <ManagerProducts data={data} />
    </div>
  );
}
