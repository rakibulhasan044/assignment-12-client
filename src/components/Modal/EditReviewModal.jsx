import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadSpinner from "../Spiner/LoadSpinner";
import PropTypes from "prop-types";
import moment from "moment";
import Star from "../Star/Star";
import { useState, useEffect } from "react";

const EditReviewModal = ({ editOpen, setIsEditOpen, passId }) => {
  const axiosSecure = useAxiosSecure();
  const [newText, setNewText] = useState("");

  const { data: review, isLoading, refetch } = useQuery({
    queryKey: ["review", passId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/single-review/${passId}`);
      return data;
    },
    enabled: editOpen,
  });

  useEffect(() => {
    if (editOpen && review) {
      setNewText(review.text);
    }
  }, [editOpen, review]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!review || review.text === newText || newText.length === 0) {
      return setIsEditOpen(false);
    }

    try {
      const data = { text: newText };

      await axiosSecure.patch(`/single-review/${passId}`, data);
      setIsEditOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      setIsEditOpen(false);
    }
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <Dialog
      open={editOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsEditOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <h2 className="text-center text-info font-semibold pb-4">
              You Can Only Edit Text
            </h2>
            <div className="p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={review.photo}
                    alt={review.name}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {moment(review.date).format("MMM Do, YYYY")}
                  </p>
                  <div className="flex gap-1">
                    <Star rating={review.rating} />
                  </div>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
                <textarea
                  className="textarea textarea-ghost mt-2 w-full"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  name="newTxt"
                />
                <div className="flex justify-between mt-4 px-10">
                  <Button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:ring-1 focus:ring-white"
                  >
                    Yes, Update
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:ring-1 focus:ring-white"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

EditReviewModal.propTypes = {
  editOpen: PropTypes.bool.isRequired,
  setIsEditOpen: PropTypes.func.isRequired,
  passId: PropTypes.string.isRequired,
};

export default EditReviewModal;
