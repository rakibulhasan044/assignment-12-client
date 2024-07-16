import { useMemo, useState } from "react";
import AddMealModal from "../../../../components/Modal/AddMealModal";
import useUpcomingMeals from "../../../../hooks/useUpcomingMeals";
import LoadSpinner from "../../../../components/Spiner/LoadSpinner";
import { Link } from "react-router-dom";
import PublishedModal from "../../../../components/Modal/PublishedModal";

const UpcomingMealsMange = () => {

  const [meals, isLoading, refetch] = useUpcomingMeals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publishOpen, setIsPublishOpen] = useState(false);
  const [item, setItem] = useState(null)
  const [page, setPage] = useState(1);
  const itemPerPage = 10;

  const totalMeals = meals.length;
  const totalPages = Math.max(1, Math.ceil(totalMeals / itemPerPage))

  const paginated = useMemo(() => {
    const startIndex = (page -1) * itemPerPage;
    return meals.slice(startIndex, startIndex + itemPerPage)
  }, [meals, page])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePublish = async (item) => {
    setItem(item)
    setIsPublishOpen(true);
  }

  return (
    <div className="w-full mt-5">
      <h2 className="text-2xl text-center font-semibold">
        Manage All Upcoming meal
      </h2>
      <div className="flex justify-end py-3">
        <button
          onClick={openModal}
          className="bg-green-500 text-white font-bold py-1 px-4 rounded"
        >
          Add Upcoming Meal
        </button>
      </div>
      <AddMealModal isOpen={isModalOpen} closeModal={closeModal} refetch={refetch} />
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Likes Count</th>
                <th>Publish</th>
                <th>Meal</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((meal, index) => (
                <tr className="hover" key={meal._id}>
                  <th>{index + 1 + (page - 1) * itemPerPage}</th>
                  <td>{meal.title}</td>
                  <td>{meal.likes}</td>
                  <td>
                  <button className="btn btn-sm btn-outline btn-warning"
                  onClick={() => handlePublish(meal)}>Publish</button>
                  </td>
                  <td>
                    <Link to={`/meal/${meal._id}`} className="btn btn-sm btn-outline btn-info">View</Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center my-4 gap-4">
          <button
          className="btn btn-sm btn-outline btn-info ml-2"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}>
            Previous
          </button>
          <span className="mx-2">Page {page} of {totalPages}</span>
          <button
          className="btn btn-sm btn-outline btn-info ml-2"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}>
            Next
          </button>
          </div>
          
        </div>
      )}
      {
        publishOpen && item && (
            <PublishedModal
            publishOpen={publishOpen}
            setIsPublishOpen={setIsPublishOpen}
            item={item}
            refetch={refetch} />
        )
      }
    </div>
  );
};

export default UpcomingMealsMange;
