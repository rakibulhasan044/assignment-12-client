import { useState } from "react";
import useMeals from "../../../../hooks/useMeals";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import LoadSpinner from "../../../../components/Spiner/LoadSpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AllMeals = () => {
  const [page, setPage] = useState(1);
  const [meals, totalMealsCount, isLoading, refetch] = useMeals(page, "", "", 10);
  const axiosSecure = useAxiosSecure();

  const totalPages = Math.ceil(totalMealsCount / 10);

  const deleteMeal = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/meal/${id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted",
          icon: "success",
        });
      }
    });
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="w-full mt-5">
      <h1 className="text-center text-info text-2xl font-semibold">
        Manage All meals
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Admin Name</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Meal</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr className="hover" key={meal._id}>
                <th>{index + 1 + (page - 1) * 10}</th>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>
                <td>{meal.reviews_count}</td>
                <td>{meal.admin_name}</td>
                <td>
                  <Link to={`/dashboard/update-meal/${meal._id}`}>
                    <RxUpdate size={22} className="text-orange-500" />
                  </Link>
                </td>
                <td>
                  <MdDelete
                    size={24}
                    className="text-red-700"
                    onClick={() => deleteMeal(meal._id)}
                  />
                </td>
                <td>
                  <Link
                    to={`/meal/${meal._id}`}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <button
            className="btn btn-sm btn-outline btn-info mr-2"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline btn-info ml-2"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
