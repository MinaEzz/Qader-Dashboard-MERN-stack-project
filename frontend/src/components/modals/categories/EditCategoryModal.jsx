import { useState } from "react";
import Loader from "../../shared/Loader";
import Button from "../../shared/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../shared/Input";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const EditCategoryModal = ({ open, close, category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
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
      const response = await fetch(
        BASE_URL + `/api/categories/${category?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        toast.success("category updated successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(responseData?.message);
        console.error("Error response:", responseData);
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
                  edit category
                </h3>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-md capitalize text-black"
                      htmlFor="name"
                    >
                      Category Name
                    </label>
                    <Input
                      element={"input"}
                      type={"text"}
                      name={"name"}
                      id={"name"}
                      placeholder={"Category Name"}
                      value={formData?.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-md capitalize text-black"
                      htmlFor="description"
                    >
                      Category Description
                    </label>
                    <Input
                      name={"description"}
                      id={"description"}
                      placeholder={"Category Description"}
                      value={formData?.description}
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

export default EditCategoryModal;
