import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const MakeAdminModal = ({ isOpen, setIsOpen, user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const makeAdmin = async (id) => {
    const { data } = await axiosSecure.patch(`/user/admin/${id}`);
    if(data.modifiedCount > 0) {
        refetch();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Done",
            showConfirmButton: false,
            timer: 1500
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
              Do you want to make this user an admin?
            </DialogTitle>
            <p className="mt-2 text-white/50 text-xl">Name: {user.name}</p>
            <p className="text-white/50 text-xl">Email: {user.email}</p>
            <div className="flex justify-between mt-4 px-10">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={() => makeAdmin(user._id)}
              >
                Yes, make admin
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

MakeAdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default MakeAdminModal;
