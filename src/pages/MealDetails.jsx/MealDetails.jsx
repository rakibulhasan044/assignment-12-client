import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadSpinner from "../../components/Spiner/LoadSpinner";
import { useEffect, useState } from "react";
import Star from "../../components/Star/Star";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useUserDetails from "../../hooks/useUserDetails";

const MealDetails = () => {
  const [selected, setSelected] = useState();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userInfo, isLoading ] = useUserDetails()


  const { data: meal = {}, isLoading: ghur, refetch } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/meal/${id}`);
      return data;
    },
  });

  const {
    meal_img,
    admin_name,
    post_time,
    rating,
    likes,
    title,
    price,
  } = meal;

  useEffect(() => {
    const checkIfLiked = async () => {
      if(user) {
        const { data } = await axiosSecure.get(`/liked/${id}?email=${user.email}`)
        setSelected(data.liked)
      }
    }
    checkIfLiked()
  },[id, user, axiosSecure])

  const handleRadioChange = async () => {
    if(user && userInfo.package !== 'Bronze') {
      try {
        if(!selected) {
          await axiosSecure.post(`/like/${id}`, {email: user.email})
        }
        else {
          await axiosSecure.post(`/unlike/${id}`, { email: user.email });
        }
        setSelected(!selected);
        refetch()

      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.response?.data?.message || error.message}`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please activate package to like this meal",
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  };

  const handleBtnClick = async () => {
    if(userInfo.package != 'Bronze') {
      const requestedMealInfo = {
        name: meal.title,
        like: meal.likes,
        rating: meal.rating,
        mealId: meal._id,
        image: meal.meal_img,
        userName: user?.displayName,
        userEmail: user?.email,
        price: meal.price,
        status: 'Pending'
      }
      
      try {
        const { data } = await axiosSecure.post(`/requested-meal`, requestedMealInfo)
        console.log(data);
        if(data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Requested for meal successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error}`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    if(userInfo.package === 'Bronze') {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: 'Please upgrade Your package for requesting meals',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  if (isLoading || ghur) return <LoadSpinner />;

  return (
    <div>
      <div className=" flex flex-col md:flex-row md:gap-10 lg:gap-20">
        <img className="md:w-1/2" src={meal_img} alt="" />
        <div className="flex-1 space-y-2">
          <h3 className="md:text-2xl lg:text-4xl font-bold ">{title}</h3>
          <p className="text-xl font-semibold">distributor: {admin_name}</p>
          <p className="text-2xl font-extrabold text-green-500">${price}</p>
          <div className="flex gap-10 text-xl">
            <p>Added: {post_time}</p>
            <div className="flex gap-5">
              <div className="rating gap-1">
                <input
                  type="checkbox"
                  name="rating-3"
                  className={`mask mask-heart size-8 ${
                    selected ? "bg-red-400" : "bg-gray-300"
                  }`}
                  checked={selected}
                  onChange={handleRadioChange}
                />
              </div>
              <span className="">{likes}</span>
            </div>
          </div>
          <div className="flex gap-2">
          </div>
          <p>{meal?.description || "description...."}</p>
          <button
          onClick={handleBtnClick}
           className="btn btn-outline btn-warning"
           >Request Meal</button>
        </div>
      </div>
      <div className="mt-10">
      <Star rating={rating} />
      </div>
    </div>
  );
};

export default MealDetails;
