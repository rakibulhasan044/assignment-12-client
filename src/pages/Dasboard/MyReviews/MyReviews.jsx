import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadSpinner from "../../../components/Spiner/LoadSpinner";
import { Link } from "react-router-dom";
import DeleteReviewModal from "../../../components/Modal/DeleteReviewModal";
import ViewReviewModal from "../../../components/Modal/ViewReviewModal";
import EditReviewModal from "../../../components/Modal/EditReviewModal";
import Swal from "sweetalert2";

const MyReviews = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewOpen, setIsReviewOpen] = useState(false);
  const [editOpen, setIsEditOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [passId, setPassId] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const itemsPerPage = 10;

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/review/${user.email}`);
      return data;
    },
  });

  const totalReviews = reviews.length;
  const totalPages = Math.max(1, Math.ceil(totalReviews / itemsPerPage));

  const paginatedReviews = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return reviews.slice(startIndex, startIndex + itemsPerPage);
  }, [reviews, page]);

  const handleOpenModal = (item) => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  const handleOpenReviewModal = (id) => {
    setPassId(id);
    setIsReviewOpen(true);
  };

  const handleOpenEditModal = (id) => {
    setPassId(id);
    setIsEditOpen(true);
  };

  const deleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/review/${id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your review has been deleted",
          icon: "success"
        });
      }
    });
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="w-full mt-5">
      <h1 className="text-center text-info text-2xl font-semibold">
        My Reviews
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Review</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((item, index) => (
              <tr className="hover" key={item._id}>
                <th>{index + 1 + (page - 1) * itemsPerPage}</th>
                <td>{item.title || '...'}</td>
                <td>{item.likes}</td>
                <td>
                  <button
                    onClick={() => handleOpenReviewModal(item._id)}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    View
                  </button>
                </td>
                <td>
                  <BiSolidEdit
                    size={22}
                    className="text-orange-500"
                    onClick={() => handleOpenEditModal(item._id)}
                  />
                </td>
                <td>
                  <RiDeleteBin5Line
                    size={24}
                    className="text-red-700"
                    onClick={() => deleteReview(item._id)}
                  />
                </td>
                <td>
                  <Link to={`/meal/${item.mealId}`} className="btn btn-sm btn-outline btn-info">
                    View
                  </Link>
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

      {isOpen && currentItem && (
        <DeleteReviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          item={currentItem}
          refetch={refetch}
        />
      )}
      {reviewOpen && (
        <ViewReviewModal
          reviewOpen={reviewOpen}
          setIsReviewOpen={setIsReviewOpen}
          passId={passId}
        />
      )}
      {editOpen && (
        <EditReviewModal
          editOpen={editOpen}
          setIsEditOpen={setIsEditOpen}
          passId={passId}
        />
      )}
    </div>
  );
};

export default MyReviews;