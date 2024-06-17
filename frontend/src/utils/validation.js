import { toast } from "react-toastify";

export const validateLoginForm = (formData) => {
  if (!formData.identifier.trim()) {
    toast.error("Username or Email or Phone Number is required.");
    return false;
  }
  if (!formData.password.trim()) {
    toast.error("Password is required.");
    return false;
  }
  return true;
};

export const validateProductForm = (formData)=>{
  if (!formData.title.trim()) {
    toast.error("Product name is required.");
    return false;
  }
  if (!formData.categoryName.trim()) {
    toast.error("Category name is required.");
    return false;
  }
  if (!formData.description.trim()) {
    toast.error("Product description is required.");
    return false;
  }
  if (!formData.price.trim()) {
    toast.error("Product price is required.");
    return false;
  }
  if (!formData.image.trim()) {
    toast.error("Product image is required.");
    return false;
  }


  return true;

}
