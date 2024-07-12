import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState, useMemo } from "react";
import DeleteRequestModal from "../../../components/Modal/DeleteRequestModal";
import LoadSpinner from "../../../components/Spiner/LoadSpinner";
import { BiSolidMessageEdit } from "react-icons/bi";

const RequestedMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data: requestedMeals = [], isLoading, refetch } = useQuery({
    queryKey: ["requestedMeals", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requested-meal/${user.email}`);
      return data;
    },
  });

  const totalPages = Math.max(1, Math.ceil(requestedMeals.length / itemsPerPage));

  const paginatedMeals = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return requestedMeals.slice(startIndex, startIndex + itemsPerPage);
  }, [requestedMeals, page]);

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table">
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
            {paginatedMeals.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.like}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">
                    <BiSolidMessageEdit size={25} className="text-orange-500" />
                  </button>
                </td>
                <td
                  className={`${
                    item.status === "Delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {item.status}
                </td>
                <td>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="btn btn-ghost btn-xs"
                  >
                    <RiDeleteBin5Fill size={25} className="text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-sm btn-outline btn-info mr-2"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2">Page {page} of {totalPages}</span>
          <button
            className="btn btn-sm btn-outline btn-info ml-2"
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {selectedItem && (
        <DeleteRequestModal
          isOpen={!!selectedItem}
          setIsOpen={() => setSelectedItem(null)}
          item={selectedItem}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default RequestedMeals;