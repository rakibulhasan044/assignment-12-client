import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import LoadSpinner from "../../../../components/Spiner/LoadSpinner";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: requestedMeals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requestedMeals"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requested-meal`);
      return data;
    },
  });

  const handleUpdate = async (id) => {
    const { data } = await axiosSecure.patch(`/requested-meal/${id}`);
    if (data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) return <LoadSpinner />;


  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeals = requestedMeals.slice(startIndex, startIndex + itemsPerPage);


  const totalPages = Math.ceil(requestedMeals.length / itemsPerPage);

  return (
    <div className="w-full">
      <h2 className="text-3xl py-5 text-warning font-bold text-center">Serve Meals</h2>
      <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMeals.map((item, index) => (
            <tr key={item._id}>
              <th>{startIndex + index + 1}</th>
              <td>{item.name}</td>
              <td>{item.userEmail}</td>
              <td>{item.userName}</td>
              <td
                className={`
              ${
                item.status === "Pending" ? "text-yellow-500" : "text-green-500"
              }`}
              >
                {item.status}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-warning"
                  disabled={item.status === "Delivered"}
                  onClick={() => handleUpdate(item._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`btn btn-sm mx-1 ${
              page === currentPage ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ServeMeals;
