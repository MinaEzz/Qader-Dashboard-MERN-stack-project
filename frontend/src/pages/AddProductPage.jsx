import { AddProductForm } from "../components";

const AddProductPage = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl text-black font-semibold capitalize">
        add product
      </h2>
      <AddProductForm />
    </section>
  );
};

export default AddProductPage;
