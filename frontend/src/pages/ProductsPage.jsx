import { useEffect, useState, useMemo } from "react";
import {
  DataTable,
  Loader,
  EditProductModal,
  Button,
  DeleteProductModal,
} from "../components";
import { IoAddSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const closeEditModal = () => setIsEditModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Category Id",
        accessor: "category",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BASE_URL + "/api/products");
        const responseData = await response.json();
        if (response.ok) {
          setProducts(responseData?.data?.products);
        } else {
          toast.error(responseData?.message);
        }
      } catch (err) {
        toast.error(err?.message || "Something Went Wrong, Please Try Again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    document.title = "Products";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <section className="w-full min-h-[100dvh] space-y-3">
        <Button
          label={"add product"}
          icon={<IoAddSharp fontSize={24} />}
          to={"/dashboard/addProduct"}
          width={"w-[180px]"}
          height={"h-10"}
          fontSize={"text-lg"}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={products}
            showEdit={true}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            onEdit={(product) => setSelectedProduct(product)}
            onDelete={(product) => setSelectedProduct(product)}
          />
        )}
        {isEditModalOpen && (
          <EditProductModal
            product={selectedProduct}
            open={isEditModalOpen}
            close={closeEditModal}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteProductModal
            productId={selectedProduct}
            open={isDeleteModalOpen}
            close={closeDeleteModal}
            products={products}
            setProducts={setProducts}
          />
        )}
      </section>
    </>
  );
};

export default ProductsPage;
