
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from "react-hook-form";
import moment from "moment";
import PropTypes from 'prop-types';

import Swal from "sweetalert2";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { imageUpload } from '../../Utils/image';

const AddMealModal = ({ isOpen, closeModal, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: user?.email,
      likes: 0,
      postTime: new Date(),
      adminName: user?.displayName,
      rating: 0,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const imageUrl = await imageUpload(data.image[0]);
    const mealInfo = {
      meal_img: imageUrl,
      admin_name: data.adminName,
      post_time: data.postTime,
      rating: data.rating,
      category: "upcoming", // Hardcoded to upcoming
      title: data.title,
      price: parseFloat(data.price),
      likes: data.likes,
      reviews_count: 0,
      admin_email: data.email,
      description: data.description,
      ingredients: data.ingredients,
    };

    const res = await axiosSecure.post(`/meal`, mealInfo);
    if (res.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item added",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch()
      closeModal();
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-200 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold text-center leading-6 text-gray-900"
                >
                  Add Upcoming Meal
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                      {...register("title", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ingredients
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("ingredients", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                      {...register("description", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("price", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      className="shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:shadow-outline"
                      {...register("image", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Post Time
                    </label>
                    <input
                      type="text"
                      defaultValue={moment().format("MMM Do YY")}
                      className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      disabled
                      {...register("postTime")}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      disabled
                      {...register("adminName")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Meal
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

AddMealModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
}

export default AddMealModal;
