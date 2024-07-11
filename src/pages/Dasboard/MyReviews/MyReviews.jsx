import { useQuery } from "@tanstack/react-query";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadSpinner from "../../../components/Spiner/LoadSpinner";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteReviewModal from "../../../components/Modal/DeleteReviewModal";

const MyReviews = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/review/${user.email}`);
      return data;
    },
  });

  const handleOpenModal = (item) => {
    setCurrentItem(item)
    setIsOpen(true)
  }


  return (
    <div className="w-full">
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Meal Title</th>
                <th>Likes</th>
                <th>Review</th>
                <th>Delete</th>
                <th>View Meal</th>
              </tr>
            </thead>
            <tbody>
              {
                reviews.map((item, index )=> (
                  <tr className="hover" key={item._id}>
                <th>{index + 1}</th>
                <td>{item.title || '...'}</td>
                <td>{item.likes}</td>
                <td>
                  <BiSolidEdit size={25} className=" text-orange-500" />
                </td>
                <td>
                  <RiDeleteBin5Line
                  size={25}
                  className=" text-red-600" 
                  onClick={() => handleOpenModal(item)}
                  />
                </td>
                <td>
                <Link to={`/meal/${item.mealId}`} className="btn btn-outline btn-warning btn-sm">View Meals</Link>
                </td>
              </tr>
                ))
              }
            </tbody>
          </table>
          {
            isOpen && currentItem && (
              <DeleteReviewModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              item={currentItem}
              refetch={refetch}
               />
            )
          }
        </div>
        
      )}
    </div>
  );
};

export default MyReviews;
