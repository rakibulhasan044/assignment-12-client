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
import moment from 'moment';
import { FaStar } from "react-icons/fa6";
import SpecificReviews from "../../components/SpecificReviews/SpecificReviews";

const MealDetails = () => {

  const [selected, setSelected] = useState(false);
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userInfo, isLoading ] = useUserDetails()


  const { data: meal = {}, isLoading: ghur, refetch } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/meal/${id}`)
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
    reviews_count
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
    if(userInfo.package != 'Bronze' || meal.category === 'upcoming') {
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
    if(userInfo.package === 'Bronze' || meal.category === 'upcoming') {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: 'Please upgrade Your package for requesting meals and upcoming meal cant be requested',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const handleReview = async (e, id) => {
    e.preventDefault();

    if(meal.category === 'upcoming') {
      return Swal.fire({
        position: "top-end",
        icon: "warning",
        title: 'You can not give review for Upcoming meals',
        showConfirmButton: false,
        timer: 1500
      });
    }
    
    const form = e.target;
    const text = form.text.value;
    const name = user?.displayName;
    const email = user?.email;
    const  rating = star;
    const mealId = id;
    
    const reviewInfo = {
      name,
      email,
      rating,
      text,
      mealId,
      title,
      date: new Date(),
      photo: user.photoURL
    }

    if (star > 0 && text.length > 0) {
      await axiosSecure.post(`/review`, reviewInfo);
      await axiosSecure.put(`/review/${id}`)
      refetch()
      setStar(0);
      Swal.fire({
        title: "Review Submitted",
        text: "Thank you",
        icon: "success",
      });
    
    } else {
      Swal.fire({
        title: "Please fill in the star rating & write a comment",
        text: "Thank you",
        icon: "error",
      });
    }
    form.reset()
  }

  if (isLoading || ghur) return <LoadSpinner />;

  return (
    <div>
      <div className=" flex flex-col md:flex-row gap-3 md:gap-10 lg:gap-20">
        <img className="md:w-3/5 lg:w-1/2 rounded-xl" src={meal_img} alt="" />
        <div className=" space-y-2">
          <h3 className="md:text-2xl lg:text-4xl font-bold ">{title}</h3>
          <p className="text-xl font-semibold">distributor: {admin_name}</p>
          <p className="text-2xl font-extrabold text-green-500">${price}</p>
          <div className="flex gap-10 text-xl">
            <p>Added: {moment(post_time).format("MMM Do YY") || post_time} </p>
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
      <div className="mt-10 flex gap-13 items-center">
      <Star rating={rating} />
      <span className="text-xl">({reviews_count})</span>
      </div>
      <SpecificReviews id={id} />
      <h3 className="text-xl text-gray-400 py-2 font-medium">Give us your feedback here</h3>
      <form
      onSubmit={(e) => handleReview(e, id)}
       className="border p-5 lg:w-1/2 rounded-lg border-info space-y-2">
        <h2 className="text-center text-xl font-semibold">Rate us</h2>
      
      <div className="cursor-ponter flex gap-1">
        {[...Array(5)].map((_, index) => (
          <span
          key={index}
          className={`${index + 1 <= star ? 'text-yellow-500' : ''}
          ${index + 1 <= hoverStar ? 'text-yellow-500' : 'text-gray-300'} text-3xl`}
          onMouseOver={() => setHoverStar(index + 1)}
          onMouseOut={() => setHoverStar(0)}
          onClick={() => setStar(index + 1)}>
           <FaStar />
          </span>
        ))}
      </div>
      <textarea className="textarea textarea-bordered w-full" placeholder="Write here" name='text'></textarea>
      <button type="submit" className="btn btn-outline btn-success">Submit</button>
      </form>
    </div>
  );
};

export default MealDetails;
