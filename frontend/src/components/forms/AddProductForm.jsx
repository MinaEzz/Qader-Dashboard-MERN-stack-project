import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Loader from "../shared/Loader";
import { validateProductForm } from "../../utils/validation";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryName: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateProductForm(formData)) return;
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Product added successfully");
        setFormData({
          title: "",
          description: "",
          price: "",
          categoryName: "",
          image: "",
        });
      } else {
        toast.error(responseData?.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something Went Wrong, Please Try Again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ToastContainer theme="colored" />
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="w-full flex flex-col flex-1 gap-4 "
          method="POST"
          onSubmit={handleSubmit}
        >
          <Input
            element={"input"}
            type={"text"}
            name={"title"}
            value={formData?.title}
            onChange={handleChange}
            placeholder={"Product Name"}
          />
          <Input
            element={"input"}
            type={"text"}
            name={"categoryName"}
            value={formData?.categoryName}
            onChange={handleChange}
            placeholder={"Product Category"}
          />
          <Input
            name={"description"}
            value={formData?.description}
            onChange={handleChange}
            placeholder={"Product Description"}
          />
          <Input
            element={"input"}
            type={"number"}
            name={"price"}
            value={formData?.price}
            onChange={handleChange}
            placeholder={"Price"}
          />
          <Input
            element={"input"}
            type={"text"}
            name={"image"}
            value={formData?.image}
            onChange={handleChange}
            placeholder={"Product Image"}
          />
          <Button type={"submit"} label={"add product"} />
        </form>
      )}
    </>
  );
};

export default AddProductForm;
