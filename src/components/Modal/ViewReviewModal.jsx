import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SingleReview from "../SpecificReviews/SingleReview";
import LoadSpinner from "../Spiner/LoadSpinner";
import PropTypes from 'prop-types';

const ViewReviewModal = ({ reviewOpen, setIsReviewOpen, passId }) => {

    const axiosSecure = useAxiosSecure();
    const { data: review = [], isLoading} = useQuery({
        queryKey : ['review', passId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-review/${passId}`)
            return data
        }
    })
    console.log(review);
    if(isLoading) return <LoadSpinner />
  return (
    <Dialog
      open={reviewOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsReviewOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <SingleReview  review={review} />
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-6 mt-5 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 text-green-500"
                onClick={() => setIsReviewOpen(false)}
              >
                Close
              </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

ViewReviewModal.propTypes = {
    reviewOpen: PropTypes.bool,
    setIsReviewOpen: PropTypes.func,
    passId: PropTypes.string,
}

export default ViewReviewModal;
