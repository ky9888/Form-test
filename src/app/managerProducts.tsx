"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  images: { image: string }[];
  note: string;
  price: string;
  giam: string;
  priceG: string;
  title: string;
  describe: string;
};

type HomePageProps = {
  data: Product[];
};

const ManagerProducts: React.FC<HomePageProps> = ({ data }) => {
  const [products, setProducts] = useState(data);
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `https://be-e-commerce-tohe.onrender.com/api/products/deleteProducts/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the deleted product from the state
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-[20%] ">
      <table className="min-w-full border-collapse ">
        <thead>
          <tr className="text-left bg-gray-200 border border-black">
            <th className="py-2 px-4 border-r text-center border-black">Sản phẩm</th>
            <th className="py-2 px-4 border-r text-center border-black">Giá</th>
            <th className="py-2 px-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b border-black ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} items-center border-x `}
            > 
              <td className=" border-r border-black">
               <div className="py-2 h-full px-4 flex items-center space-x-2">
                  <Image
                    src={item.images[0]?.image}
                    alt={item.name}
                    height={30}
                    width={30}
                  />
                  <span>{item.title}</span>
               </div>
              </td>
              <td className="py-2 px-4 border-r border-black text-center">{item.priceG}</td>
              <td className="py-2 px-4 flex space-x-3 justify-center">
                <button
                  onClick={() => router.push(`/${item._id}`)}
                  className="py-1 px-2 rounded-md bg-slate-400 hover:bg-slate-500"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="py-1 px-2 rounded-md bg-red-500 hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>router.push("/addProduct")} className="bg-green-300 mt-3 p-2 font-medium rounded-xl" >Thêm sản phẩm</button>
    </div>
  );
};

export default ManagerProducts;
