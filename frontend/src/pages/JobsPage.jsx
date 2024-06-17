import { useEffect, useState, useMemo } from "react";
import { Button, Loader, DataTable } from "../components";
import { IoAddSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Job Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Exp. Salary",
        accessor: "expectedSalary",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BASE_URL + "/api/jobs");
        const responseData = await response.json();
        if (response.ok) {
          setJobs(responseData?.data?.jobs);
        } else {
          toast.error(responseData?.message);
        }
      } catch (err) {
        toast.error(err?.message || "Something Went Wrong, Please Try Again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <section className="w-full min-h-[100dvh] space-y-3">
        <Button
          label={"add job"}
          icon={<IoAddSharp fontSize={24} />}
          to={"/dashboard/addJob"}
          width={"w-[180px]"}
          height={"h-10"}
          fontSize={"text-lg"}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={jobs}
            onDelete={"handleDeleteProduct"}
            showEdit={true}
          />
        )}
      </section>
    </>
  );
};

export default JobsPage;
