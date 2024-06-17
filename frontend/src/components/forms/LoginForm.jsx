import { useContext, useState } from "react";
import Input from "../shared/Input";
import Loader from "../shared/Loader";
import Button from "../shared/Button";
import { validateLoginForm } from "../../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm(formData)) return;
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "/api/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        toast.success("User login successfully");
        auth.login(responseData?.data?.user?._id, responseData?.data?.token);
      } else {
        console.log(responseData);
        toast.error(responseData.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something Went Wrong, Please Try Again.");
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
        <div className="w-[80%] m-auto bg-white flex flex-col gap-8 p-8 rounded-xl">
          <h2 className="text-4xl text-slate-700 font-bold capitalize text-center">
            welcome to{" "}
            <span className="uppercase text-5xl text-primary-600">Qader</span>{" "}
            Dashboard
          </h2>
          <form
            className="w-full flex flex-col gap-4"
            method="post"
            action="/dashboard"
            onSubmit={handleSubmit}
          >
            <Input
              element={"input"}
              type={"text"}
              name={"identifier"}
              id={"identifier"}
              placeholder={"Username"}
              value={formData?.identifier}
              onChange={onChangeHandler}
            />
            <Input
              element={"input"}
              type={"password"}
              name={"password"}
              id={"password"}
              placeholder={"Password"}
              value={formData?.password}
              onChange={onChangeHandler}
            />
            <Button type="submit" label={"login"} fontWeight={"font-semibold"}>
              login
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
