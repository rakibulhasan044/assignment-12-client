import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react";
import DeleteRequestModal from "../../../components/Modal/DeleteRequestModal";
import LoadSpinner from "../../../components/Spiner/LoadSpinner";

const RequestedMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false)
  const { data: requestedMeals = [], isLoading, refetch } = useQuery({
    queryKey: ["requestedMeals", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requested-meal/${user.email}`);
      return data;
    },
  });

  if(isLoading) return <LoadSpinner />

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.like}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
                <td
                  className={`${
                    item.status === "Deliverd"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {item.status}
                </td>
                <td>
                  <button
                  onClickCapture={() => setIsOpen(true)}
                    className="btn btn-ghost btn-xs"
                  >
                    <RiDeleteBin5Fill size={25} className="text-red-700" />
                  </button>
                  <DeleteRequestModal isOpen={isOpen} setIsOpen={setIsOpen} item={item} refetch={refetch}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedMeals;
