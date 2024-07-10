import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from 'prop-types'

const DeleteRequestModal = ({ isOpen, setIsOpen, refetch, item }) => {
  const axiosSecure = useAxiosSecure();
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/requested-meal/${id}`);
    refetch();
    setIsOpen(false);
    console.log(res);
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
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
              Do you want to cancel request for
            </DialogTitle>
            <div className="flex items-center justify-center">
              <img className="h-32 rounded-lg mt-2" src={item.image} />
            </div>
            <p className="mt-2  text-white/50 text-xl">{item.name}</p>
            <p className="text-white/50 text-xl">Price: ${item?.price || 0} </p>

            <div className="flex justify-between mt-4 px-10">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={() => handleDelete(item._id)}
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

DeleteRequestModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  refetch: PropTypes.func,
  item: PropTypes.object
}
export default DeleteRequestModal;
