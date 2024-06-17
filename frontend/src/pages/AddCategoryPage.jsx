import { AddCategoryForm } from "../components";

const AddCategoryPage = () => {
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
