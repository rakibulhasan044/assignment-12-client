import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const DeleteReviewModal = ({ isOpen, setIsOpen, item, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleReviewDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/review/${id}`);
    if (data.deletedCount) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Done",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="font-medium text-white text-center text-xl"
            >
              Do you want to delete thid review?
            </DialogTitle>
            <p className="mt-2 text-white/50 text-xl text-center">
              Item name: {item?.title}
            </p>
            <div className="flex justify-between mt-4 px-10">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={() => handleReviewDelete(item._id)}
              >
                Yes, delete
              </Button>
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

DeleteReviewModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  item: PropTypes.object,
  refetch: PropTypes.func,
};

export default DeleteReviewModal;
