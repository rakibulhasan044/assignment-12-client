import { Button, Dialog } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const DeleteRequestModal = ({ isOpen, setIsOpen, refetch, item }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (id) => {

    if (item.status === 'Delivered') {
      setIsOpen(false);
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Item already delivered",
        showConfirmButton: false,
        timer: 1500
      });
    }

    const res = await axiosSecure.delete(`/requested-meal/${id}`);
    setIsOpen(false);
    if (res.data.deletedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully deleted",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-2xl transition-all transform">
            <Dialog.Title className="font-medium text-white text-center text-xl">
              Do you want to cancel request for
            </Dialog.Title>
            <div className="flex items-center justify-center mt-2">
              <img className="h-32 rounded-lg" src={item.image} alt={item.name} />
            </div>
            <p className="mt-2 text-white/50 text-xl">{item.name}</p>
            <p className="text-white/50 text-xl">Price: ${item?.price || 0}</p>
            <div className="flex justify-between mt-4 px-10">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:ring-1 focus:ring-white"
                onClick={() => handleDelete(item._id)}
              >
                Yes, delete
              </Button>
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:ring-1 focus:ring-white"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

DeleteRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default DeleteRequestModal;
