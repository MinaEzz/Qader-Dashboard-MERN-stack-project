import { useState } from "react";
import Loader from "../../shared/Loader";
import Button from "../../shared/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const DeleteJobModal = ({ open, close, jobId, jobs, setJobs }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Job deleted successfully!");
        setJobs(jobs.filter((job) => job._id !== jobId));
        close();
      } else {
        toast.error(responseData?.message || "Failed to delete product.");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;
  return (
    <>
      <ToastContainer theme="colored" />
      <section className="w-full h-full" onClick={close}>
        <div className="layer flex justify-center items-center z-40">
          <div
            className="bg-white lg:w-10/12 w-full h-fit flex flex-col p-4 fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 "
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="flex w-full justify-between items-start">
                  <h3 className="text-black text-3xl  capitalize font-medium">
                    are you sure ?
                  </h3>
                  <button className="w-fit h-fit " onClick={close}>
                    <IoClose
                      className="text-slate-700 dark:text-slate-400 "
                      fontSize={30}
                    />
                  </button>
                </div>
                <p className=" text-black text-lg my-8">
                  Are you sure you want to delete the job? This action cannot be
                  undone. job data will be permanently deleted.
                </p>
                <div className="flex w-full justify-center items-center gap-5">
                  <Button
                    type={"button"}
                    label={"cancel"}
                    width={"w-[160px]"}
                    height={"h-10"}
                    backgroundColor={"bg-slate-700"}
                    hoverBgColor={"hover:bg-slate-800"}
                    activeBgColor={"active:bg-slate-900"}
                    fontSize={"text-base"}
                    onClick={close}
                  />
                  <Button
                    type={"button"}
                    label={"delete job"}
                    width={"w-[160px]"}
                    height={"h-10"}
                    backgroundColor={"bg-coral-red-700"}
                    hoverBgColor={"hover:bg-coral-red-800"}
                    activeBgColor={"active:bg-coral-red-900"}
                    fontSize={"text-base"}
                    onClick={handleDelete}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteJobModal;
