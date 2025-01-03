import UpdateProduct from "./updateProducts";

export type productType = {
  _id: string,
  name: string,
  selectImg: seletImgtype,
};

export type seletImgtype = {
  title: string,
  image: string,
};

export default async function home({
  params: { id },
}: {
  params: { id: string },
}) {
  let data: productType | null = null;
  try {
    const res = await fetch(`https://be-e-commerce-tohe.onrender.com/api/products/getDetailProducts/${id}`, { cache: "no-store" });
    const ress = await res.json();
    data = ress.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
  console.log("check data", data);

  return (
    <>
      <UpdateProduct data={data} />
    </>
  );
}
