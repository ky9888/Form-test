"use client";
import { useFormik, Field, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
  _id:string;
  name: string;
  note: string;
  priceG: string;
  price: string;
  title: string;
  images: { image: string; color: string }[];
  describe: string;
};

type HomePageProps = {
  data: any;
};

const UpdateProduct: React.FC<HomePageProps> = ({ data }) => {
  const router=useRouter()
  const formik = useFormik<Product>({
    initialValues: {
      _id:data._id,
      name: data.name,
      note: data.note,
      priceG: data.priceG,
      price: data.price,
      title: data.title,
      images: data.images,
      describe: data.describe,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được để trống"),
      note: Yup.string().required("Không được để trống"),
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
        method: "PUT",
        url: `https://be-e-commerce-tohe.onrender.com/api/products/updateProducts/${formik.values._id}`,
        data: values,
      })
        .then((res) => {
          console.log(res.data);
          alert("update thành công");
          router.push("/")
        })
        .catch((res) => {
          console.log(res);
          alert("update thất bại");
        });
    },
  });

  return (
    <div className="px-[25%] mt-5 mx-auto w-full">
      <h1 className="text-center text-[20px] font-bold mb-5">Sửa sản phẩm</h1>
      <FormikProvider value={formik}>
        <form
          className="rounded-lg font-medium space-y-2 shadow-[0_0px_70px_-5px_rgba(0,0,0,0.1)] py-5 px-10"
          onSubmit={formik.handleSubmit}
        >
          <div >
            <label htmlFor="name">Loại: </label> <br />
            <input
              type="text"
              id="name"
              name="name"
              className="outline-0 border  w-full border-slate-500 rounded-[3px] text-[15px] font-normal p-1"
              value={formik.values.name}
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

          <div className="flex bg-slate-600 text-slate-100 justify-center pt-2 border border-slate-400 rounded-md py-2 px-5 hover:bg-slate-500">
            <button type="submit" className="w-ful">Xác nhận</button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default UpdateProduct;
