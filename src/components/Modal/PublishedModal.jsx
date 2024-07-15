import { Button, Dialog } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useState } from "react";

const PublishedModal = ({ publishOpen, setIsPublishOpen, refetch, item }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const axiosSecure = useAxiosSecure();

  const handlePublish = async (id) => {

    const info  = {
        category: selectedCategory
    }
    
    try {
        const { data } = await axiosSecure.patch(`/upcoming-meal/${id}`, info)
        console.log(data);
    
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully updated",
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
          setIsPublishOpen(false);
  
   
    } catch (error) {
        
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500
          });
          setIsPublishOpen(false)
 
    }

  };

  return (
    <Dialog
      open={publishOpen}
      as="div"
      className="relative z-10"
      onClose={() => setIsPublishOpen(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-2xl transition-all transform">
            <Dialog.Title className="font-medium text-white text-center text-xl">
              Do you want to publish {item.title}
            </Dialog.Title>
            <div className="flex items-center justify-center mt-2"></div>

            <p className="text-white/50 text-xl pb-3">
              Change the meal Category
            </p>
            <select
              className="select select-info w-full max-w-xs"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option disabled value="">
                Select category
              </option>
              <option value={"breakfast"}>Breakfast</option>
              <option value={"lunch"}>Lunch</option>
              <option value={"snacks"}>Snacks</option>
              <option value={"dinner"}>Dinner</option>
            </select>
            <div className="flex justify-between mt-4 ">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:ring-1 focus:ring-white"
                onClick={() => handlePublish(item._id)}
              >
                Yes, Publish
              </Button>
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:ring-1 focus:ring-white md:mr-20"
                onClick={() => setIsPublishOpen(false)}
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

PublishedModal.propTypes = {
  publishOpen: PropTypes.bool.isRequired,
  setIsPublishOpen: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default PublishedModal;
