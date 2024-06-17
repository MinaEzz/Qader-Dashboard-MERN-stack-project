import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoAddSharp } from "react-icons/io5";
import { Loader, DataTable, Button } from "../components";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const DisabilitiesPage = () => {
  const [disabilities, setDisabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Disability",
        accessor: "name",
      },
      {
        Header: "Related Category Id",
        accessor: "category",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchDisabilities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BASE_URL + "/api/disability");
        const responseData = await response.json();
        if (response.ok) {
          setDisabilities(responseData?.data?.disabilities);
        } else {
          toast.error(responseData?.message);
        }
      } catch (err) {
        toast.error(err?.message || "Something Went Wrong, Please Try Again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDisabilities();
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <section className="w-full min-h-[100dvh] space-y-3">
        <Button
          label={"add disability"}
          icon={<IoAddSharp fontSize={24} />}
          to={"/dashboard/adddisability"}
          width={"w-[180px]"}
          height={"h-10"}
          fontSize={"text-lg"}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={disabilities}
            onDelete={"handleDeleteProduct"}
            showEdit={true}
          />
        )}
      </section>
    </>
  );
};

export default DisabilitiesPage;
