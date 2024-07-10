import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import { imageUpload } from "../../../../Utils/image";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Addmeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: user?.email,
      likes: 0,
      postTime: moment().format("MMM Do YY"),
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
      category: data.category,
      title: data.title,
      price: data.price,
      likes: data.likes,
    };

    const res = await axiosSecure.post(`/meal`, mealInfo)
    if(res.data.insertedId) {
        reset();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item added",
            showConfirmButton: false,
            timer: 1500
          });
    }
    else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to add",
            showConfirmButton: false,
            timer: 1500
          });
    }

  };

  return (
    <div className="w-full">
        <h2 className="py-5 text-xl font-semibold text-center text-purple-700">Add a New Item</h2>
        <hr className="pt-5"/>
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row md:gap-5 w-full"
    >
      <div className="flex-1">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Title:</span>
          </div>
          <input
            type="text"
            placeholder="title"
            className="input input-bordered w-full"
            {...register("title", { required: true })}
          />
          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Ingredients:</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("ingredients", { required: true })}
          />

          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            defaultValue={user?.email}
            className="input input-bordered w-full"
            disabled
            {...register("email")}
          />

          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <input
            type="text"
            placeholder="description"
            className="input input-bordered w-full"
            {...register("description", { required: true })}
          />
          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Likes</span>
          </div>
          <input
            type="number"
            defaultValue={0}
            className="input input-bordered w-full"
            disabled
            {...register("likes")}
          />
          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            className="select select-bordered w-full max-w-xs"
            {...register("category", { required: true })}
          >
            <option disabled>Select a category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snacks">Snacks</option>
            <option value="dinner">Dinner</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <div className="label"></div>
        </label>
      </div>

      <div className="flex-1">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="number"
            placeholder="price"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
          />
          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Post Time</span>
          </div>
          <input
            type="text"
            defaultValue={moment().format("MMM Do YY")}
            className="input input-bordered w-full"
            disabled
            {...register("postTime")}
          />
          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Admin Name:</span>
          </div>
          <input
            type="text"
            defaultValue={user?.displayName}
            className="input input-bordered w-full"
            disabled
            {...register("adminName")}
          />
          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Rating</span>
          </div>
          <input
            type="number"
            defaultValue={null}
            className="input input-bordered w-full"
            disabled
            {...register("rating")}
          />
          <div className="label"></div>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Image</span>
          </div>

          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("image", { required: true })}
          />
          <div className="label"></div>
        </label>
        <button
          type="submit"
          className="bg-primary text-black font-semibold py-3 rounded-lg px-4 w-full mt-9"
        >
          Add Meal
        </button>
      </div>
    </form>
    </div>
  );
};

export default Addmeal;
