import { useEffect } from "react";
import { AddCategoryForm } from "../components";

const AddCategoryPage = () => {
  useEffect(() => {
    document.title = "Add Category";
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="space-y-4">
      <h2 className="text-3xl text-black font-semibold capitalize">
        add category
      </h2>
      <AddCategoryForm />
    </section>
  );
};

export default AddCategoryPage;
