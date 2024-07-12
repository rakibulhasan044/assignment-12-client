import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import moment from "moment";
import { imageUpload } from "../../../../Utils/image";
import LoadSpinner from "../../../../components/Spiner/LoadSpinner";
import Swal from "sweetalert2";

const UpdatePage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: meal = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/meal/${id}`);
      return data;
    },
  });

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const form = e.target;
  
    const title = form.title.value;
    const price = form.price.value;
    const description = form.description.value;
    const photo = form.photo.files[0];
    let imageUrl = meal.meal_img;

    if (photo) {
      imageUrl = await imageUpload(photo);
    }

    try {
      const info = {
        title,
        price,
        description,
        meal_img: imageUrl,
      };

      const { data } = await axiosSecure.patch(`/meal/${id}`, info);
      refetch();
      if(data.modifiedCount > 0) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item has been updated",
            showConfirmButton: false,
            timer: 1500
          });
      }
    } catch (error) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "SomeThing went wrong",
            showConfirmButton: false,
            timer: 1500
          });
    }
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="w-full">
      <h2 className="py-5 text-xl font-bold text-center">Meal Details</h2>
      <div className="flex flex-col md:flex-row gap-3 md:gap-10 lg:gap-20">
        <img
          className="md:w-3/5 lg:w-1/2 rounded-xl"
          src={meal.meal_img}
          alt=""
        />
        <div className="space-y-2">
          <h3 className="md:text-2xl lg:text-4xl font-bold">{meal.title}</h3>
          <p className="text-xl font-semibold">Distributor: {meal.admin_name}</p>
          <p className="text-2xl font-extrabold text-green-500">${meal.price}</p>
          <div className="flex gap-10 text-xl">
            <p>Added: {moment(meal.post_time).format("MMM Do YY")}</p>
          </div>
          <div className="flex gap-2"></div>
          <p>{meal?.description || "Description...."}</p>
        </div>
      </div>
      <h2 className="pt-8 text-info text-xl font-bold text-center">
        Update Meal Information
      </h2>
      <form onSubmit={(e) => handleUpdate(e, id)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Meal Title</span>
            </div>
            <input
              type="text"
              defaultValue={meal.title}
              name="title"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="number"
              step="0.01"
              defaultValue={meal.price}
              name="price"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              type="text"
              defaultValue={meal.description}
              name="description"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Photo</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              name="photo"
            />
          </label>
        </div>
        <button type="submit" className="btn bg-primary w-full mt-5">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
