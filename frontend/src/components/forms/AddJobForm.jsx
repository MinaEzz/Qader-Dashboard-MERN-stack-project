import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Loader from "../shared/Loader";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AddJobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    expectedSalary: "",
    applyLink: "",
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
      const response = await fetch(BASE_URL + "/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Job added successfully");
        setFormData({
          title: "",
          description: "",
          location: "",
          expectedSalary: "",
          applyLink: "",
        });
        navigate("/dashboard/jobs");
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
            placeholder={"Job Title"}
          />
          <Input
            name={"description"}
            value={formData?.description}
            onChange={handleChange}
            placeholder={"Job Description"}
          />
          <Input
            element={"input"}
            type={"text"}
            name={"location"}
            value={formData?.location}
            onChange={handleChange}
            placeholder={"Location"}
          />
          <Input
            element={"input"}
            type={"number"}
            name={"expectedSalary"}
            value={formData?.expectedSalary}
            onChange={handleChange}
            placeholder={"Exp. Salary"}
          />
          <Input
            element={"input"}
            type={"text"}
            name={"applyLink"}
            value={formData?.applyLink}
            onChange={handleChange}
            placeholder={"Apply Link"}
          />
          <Button type={"submit"} label={"add job"} />
        </form>
      )}
    </>
  );
};

export default AddJobForm;
