"use client";
import { useRef, useEffect } from "react";
import { useFormik, Field, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  name: string;
  priceG: string;
  price: string;
  title: string;
  images: { image: string; color: string }[];
  describe: string;
};

const AddProducts: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router=useRouter()
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik<Product>({
    initialValues: {
      name: "",
      priceG: "",
      price: "",
      title: "",
      images: [{ image: "", color: "" }],
      describe: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được để trống"),
      priceG: Yup.string().required("Không được để trống"),
      price: Yup.string().required("Không được để trống"),
      title: Yup.string().required("Không được để trống"),
      describe: Yup.string().required("Không được để trống"),
      images: Yup.array().of(
        Yup.object({
          image: Yup.string().required("Required"),
          color: Yup.string().required("Required"),
        })
      ),
    }),
    onSubmit: (values) => {
    
      console.log(values);
      axios({
        method: "POST",
        url: `https://be-e-commerce-tohe.onrender.com/api/products/createProduct`,
        data: values,
      })
        .then((res) => {
          console.log(res.data);
          alert("Tạo sản phẩm thành công");
          router.push("/")
        })
        .catch((res) => {
          console.log(res);
          alert("Tạo sản phẩm thất bại");
        });
    },
  });

  return (
    <div className="px-[25%]  max-lg:px-[7%] rounded-md mt-1">
      <h1 className="text-center text-[20px] font-bold mb-5">Thêm sản phẩm</h1>
      <FormikProvider value={formik}>
        <form
          className="rounded-lg font-medium space-y-2 w-full h-full shadow-[0_0px_70px_-5px_rgba(0,0,0,0.1)] py-5 px-10"
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-2">
            <div className="space-x-1">
              <input
                type="radio"
                id="watch"
                name="name"
                value="watch"
                onChange={formik.handleChange}
              />
              <label htmlFor="watch">Đồng hồ</label>
            </div>
            <div className="space-x-1">
              <input
                type="radio"
                id="Airpods"
                name="name"
                value="Airpods"
                onChange={formik.handleChange}
              />
              <label htmlFor="Airpods">Tai nghe</label>
            </div>
            <div className="space-x-1">
              <input
                type="radio"
                id="PhoneCover"
                name="name"
                value="PhoneCover"
                onChange={formik.handleChange}
              />
              <label htmlFor="PhoneCover">Ốp lưng</label>
            </div>
            <div className="space-x-1">
              <input
                type="radio"
                id="Ipad"
                name="name"
                value="Ipad"
                onChange={formik.handleChange}
              />
              <label htmlFor="Ipad">Máy tính bảng</label>
            </div>
          </div>
          {formik.errors.name && (
            <span className="text-red-500 text-[12px] font-normal ">
              {formik.errors.name}
            </span>
          )}

          <div>
            <label htmlFor="price">Giá: </label> <br />
            <input
              type="text"
              id="price"
              name="price"
              className="outline-0 border w-full border-slate-500 rounded-[3px] text-[15px] font-normal p-1"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price && (
              <span className="text-red-500 text-[12px] font-normal ">
                {formik.errors.price}
              </span>
            )}
            <br />
          </div>

          <div>
            <label htmlFor="priceG">Giá Giảm: </label>
            <br />
            <input
              type="text"
              id="priceG"
              className="outline-0 border w-full border-slate-500 rounded-[3px] text-[15px] font-normal p-1"
              name="priceG"
              value={formik.values.priceG}
              onChange={formik.handleChange}
            />
            {formik.errors.priceG && (
              <span className="text-red-500 text-[12px] font-normal ">
                {formik.errors.priceG}
              </span>
            )}
            <br />
          </div>
          <div>
            <label htmlFor="title">Tên sản phẩm: </label> <br />
            <input
              type="text"
              id="title"
              className="outline-0 border w-full border-slate-500 rounded-[3px] text-[15px] font-normal p-1"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && (
              <span className="text-red-500 text-[12px] font-normal ">
                {formik.errors.title}
              </span>
            )}
            <br />
          </div>
          <div>
            <label htmlFor="describe">Mô tả sản phẩm:</label>
            <br />
            <textarea
              id="describe"
              name="describe"
              className="outline-0 border border-slate-500 rounded-[3px] w-full h-[100px] text-[15px] font-normal p-1"
              value={formik.values.describe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.describe && (
            <span className="text-red-500 text-[12px] font-normal ">
              {formik.errors.describe}
            </span>
          )}
          <div className="space-y-1">
            <label> Hình ảnh</label>
            <FieldArray name="images">
              {({ remove, push }) => (
                <div className="border space-y-2 p-2 border-slate-500 rounded-md">
                  {formik.values.images.length > 0 &&
                    formik.values.images.map((image, index) => (
                      <div className="space-y-2" key={index}>
                        <div className="space-x-2">
                          <label htmlFor="">Chọn ảnh:</label>
                          <Field
                            type="text"
                            name={`images.${index}.image`}
                            placeholder="image"
                            className="outline-0 w-full p-1  rounded-[3px] "
                          />
                        </div>
                        <div className="space-x-1">
                          <label htmlFor="">Màu sắc:</label>
                          <Field
                            type="text"
                            name={`images.${index}.color`}
                            placeholder="màu sắc"
                            className="outline-0 p-1 w-full  rounded-[3px] "
                          />
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="bg-red-500 py-1 px-4 rounded-md"
                            onClick={() => remove(index)}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    className="bg-slate-500 py-1 px-3 rounded-md"
                    type="button"
                    onClick={() => push({ image: "", color: "" })}
                  >
                    Thêm hình ảnh
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
          {formik.errors.describe && (
            <span className="text-red-500 text-[12px] font-normal ">
              {formik.errors.describe}
            </span>
          )}
           <div className="flex  text-slate-100 justify-center    ">
            <button type="submit" className="w-full bg-slate-600 rounded-md  border hover:bg-slate-500 border-slate-400  py-2">Xác nhận</button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default AddProducts;
