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

export async function generateStaticParams() {
  // Fetch danh sách sản phẩm để tạo các tham số động
  const res = await fetch(
    "https://be-e-commerce-tohe.onrender.com/api/products/getAllProducts"
  );
  const result = await res.json();
  const products: ProductType[] = result.data;

  // Trả về danh sách params để Next.js pre-render
  return products.map((product) => ({
    id: product._id,
  }));
}

export default async function Home({
  params,
}: {
  params: { id: string }; // Kiểu dữ liệu phù hợp với Next.js
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
