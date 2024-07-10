import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadSpinner from "../../../../components/Spiner/LoadSpinner";
import { useState } from "react";
import MakeAdminModal from "../../../../components/Modal/MakeAdminModal";

const ManageUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });

  const handleOpenModal = (user) => {
    setCurrentUser(user);
    setIsOpen(true);
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>UserName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar flex flex-col gap-2 items-center justify-center">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photo} alt={user.name} />
                      </div>
                      <h1>{user.name}</h1>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                      <span className="text-center">User</span>
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="btn-sm bg-purple-700 rounded-xl"
                      >
                        Make admin
                      </button>
                    </div>
                  )}
                </td>
                <th>
                  <p
                    className={`
                        ${user?.package === "Silver" && "text-[#C0C0C0]"}
                        ${user?.package === "Gold" && "text-[#FFD700]"}
                        ${user?.package === "Platinum" && "text-[#e5e4e2]"}
                        ${user?.package === "Bronze" && "text-[#CD7F32]"}`}
                  >
                    {user.package}
                  </p>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && currentUser && (
        <MakeAdminModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={currentUser}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageUsers;
