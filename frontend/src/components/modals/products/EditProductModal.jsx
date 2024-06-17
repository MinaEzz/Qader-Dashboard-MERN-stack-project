import { useState } from "react";
import Loader from "../../shared/Loader";
import Button from "../../shared/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../shared/Input";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const EditProductModal = ({ open, close, product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    categoryName: "",
    image: product?.image || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + `/api/products/${product?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Product updated successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(responseData?.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something Went Wrong, Please Try Again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;
  return (
    <>
      <ToastContainer theme="colored" />
      <section className="w-full h-full " onClick={close}>
        <div className="layer flex justify-center items-center z-40">
          <div
            className="bg-white h-fit w-10/12 flex flex-col  p-4 gap-8 fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 overflow-scroll lg:justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h3 className="text-primary-600 text-3xl  capitalize font-medium">
                  edit product
                </h3>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-md capitalize text-black"
                      htmlFor="title"
                    >
                      Product Name
                    </label>
                    <Input
                      element={"input"}
                      type={"text"}
                      name={"title"}
                      id={"title"}
                      placeholder={"Product Name"}
                      value={formData?.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-md capitalize text-black"
                      htmlFor="description"
                    >
                      Product Description
                    </label>
                    <Input
                      name={"description"}
                      id={"description"}
                      placeholder={"Product Description"}
                      value={formData?.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-md capitalize text-black"
                      htmlFor="price"
                    >
                      Product Price
                    </label>
                    <Input
                      element={"input"}
                      type={"number"}
                      name={"price"}
                      id={"price"}
                      placeholder={"Product Price"}
                      value={formData?.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-md capitalize text-black"
                      htmlFor="categoryName"
                    >
                      Category Name
                    </label>
                    <Input
                      element={"input"}
                      type={"text"}
                      name={"categoryName"}
                      id={"categoryName"}
                      placeholder={"Product Category"}
                      value={formData?.categoryName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-md capitalize text-black"
                      htmlFor="image"
                    >
                      Image
                    </label>
                    <Input
                      element={"input"}
                      type={"text"}
                      name={"image"}
                      id={"image"}
                      placeholder={"Product Image"}
                      value={formData?.image}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex max-lg:flex-col justify-center items-center gap-4">
                    <Button
                      label={"cancel"}
                      type={"button"}
                      width={"w-[160px]"}
                      fontSize={"text-base"}
                      height={"h-10"}
                      backgroundColor={"bg-slate-700"}
                      hoverBgColor={"hover:bg-slate-800"}
                      activeBgColor={"active:bg-slate-900"}
                      onClick={close}
                    />
                    <Button
                      label={"save changes"}
                      type={"submit"}
                      width={"w-[160px]"}
                      fontSize={"text-base"}
                      height={"h-10"}
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProductModal;
