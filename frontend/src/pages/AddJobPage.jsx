import { useEffect } from "react";
import { AddJobForm } from "../components";

const AddJobPage = () => {
  useEffect(() => {
    document.title = "Add Job";
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="space-y-4">
      <h2 className="text-3xl text-black font-semibold capitalize">add job</h2>
      <AddJobForm />
    </section>
  );
};

export default AddJobPage;
