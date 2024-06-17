import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Loader from "../shared/Loader";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Category added successfully");
        setFormData({ name: "", description: "" });
        navigate("/dashboard/categories");
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
            name={"name"}
            value={formData?.name}
            onChange={handleChange}
            placeholder={"Category Name"}
          />
          <Input
            name={"description"}
            value={formData?.description}
            onChange={handleChange}
            placeholder={"Category description"}
          />
          <Button type={"submit"} label={"add category"} />
        </form>
      )}
    </>
  );
};

export default AddCategoryForm;
