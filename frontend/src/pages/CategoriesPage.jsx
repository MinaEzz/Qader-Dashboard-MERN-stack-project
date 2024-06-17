import { useEffect, useState, useMemo } from "react";
import {
  DataTable,
  Loader,
  Button,
  EditCategoryModal,
  DeleteCategoryModal,
} from "../components";
import { IoAddSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const closeEditModal = () => setIsEditModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const columns = useMemo(
    () => [
      {
        Header: "Category id",
        accessor: "_id",
      },
      {
        Header: "Category name",
        accessor: "name",
      },
      {
        Header: "Category description",
        accessor: "description",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BASE_URL + "/api/categories");
        const responseData = await response.json();
        if (response.ok) {
          setCategories(responseData?.data?.categories);
        } else {
          toast.error(responseData?.message);
        }
      } catch (err) {
        toast.error(err?.message || "Something Went Wrong, Please Try Again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <section className="w-full min-h-[100dvh] space-y-3">
        <Button
          label={"add category"}
          icon={<IoAddSharp fontSize={24} />}
          to={"/dashboard/addCategory"}
          width={"w-[180px]"}
          height={"h-10"}
          fontSize={"text-lg"}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={categories}
            showEdit={true}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            onEdit={(category) => setSelectedCategory(category)}
            onDelete={(category) => setSelectedCategory(category)}
          />
        )}
        {isEditModalOpen && (
          <EditCategoryModal
            category={selectedCategory}
            open={isEditModalOpen}
            close={closeEditModal}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteCategoryModal
            categoryId={selectedCategory}
            open={isDeleteModalOpen}
            close={closeDeleteModal}
            categories={categories}
            setCategories={setCategories}
          />
        )}
      </section>
    </>
  );
};

export default CategoriesPage;
