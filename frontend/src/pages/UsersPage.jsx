import { useEffect, useState, useMemo } from "react";
import {
  DataTable,
  Loader,
  Button,
  DeleteAllUsersModal,
  DeleteUserModal,
} from "../components";
import { IoTrash } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setIsDeleteAllModalOpen(false);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Type Of Disability",
        accessor: "disabilityType.name",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BASE_URL + "/api/users");
        const responseData = await response.json();
        if (response.ok) {
          setUsers(responseData?.data?.users);
        } else {
          toast.error(responseData?.message);
        }
      } catch (err) {
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <ToastContainer theme="colored" />
      <section className="w-full min-h-[100dvh] space-y-3">
        <Button
          label={"delete all"}
          icon={<IoTrash fontSize={24} />}
          width={"w-[180px]"}
          height={"h-10"}
          fontSize={"text-lg"}
          onClick={() => setIsDeleteAllModalOpen(true)}
          backgroundColor={"bg-coral-red-700"}
          hoverBgColor={"hover:bg-coral-red-800"}
          activeBgColor={"active:bg-coral-red-900"}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={users}
            showEdit={false}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            onDelete={(user) => setSelectedUser(user)}
          />
        )}
        {isDeleteAllModalOpen && (
          <DeleteAllUsersModal
            open={isDeleteAllModalOpen}
            close={closeDeleteModal}
            users={users}
            setUsers={setUsers}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteUserModal
            userId={selectedUser}
            open={isDeleteModalOpen}
            close={closeDeleteModal}
            users={users}
            setUsers={setUsers}
          />
        )}
      </section>
    </>
  );
};

export default UsersPage;
