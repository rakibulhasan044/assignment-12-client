import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) return <p>Data Loading...</p>;
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
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
          {requestedMeals.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
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
    </div>
  );
};

export default ServeMeals;
