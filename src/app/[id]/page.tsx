import UpdateProduct from "./updateProducts";

export type ProductType = {
  _id: string;
  name: string;
  selectImg: SelectImgType;
};

export type SelectImgType = {
  title: string;
  image: string;
};

export default async function Home({
  params,
}: {
  params: { id: string }; 
}) {
  let data: ProductType | null = null;

  try {
    const res = await fetch(
      `https://be-e-commerce-tohe.onrender.com/api/products/getDetailProducts/${params.id}`,
      { cache: "no-store" }
    );
    const result = await res.json();
    data = result.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  console.log("Check data", data);

  return (
    <>
      {data ? <UpdateProduct data={data} /> : <div>Loading...</div>}
    </>
  );
}
