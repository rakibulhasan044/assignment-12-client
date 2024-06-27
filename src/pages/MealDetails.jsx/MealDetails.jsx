import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadSpinner from "../../components/Spiner/LoadSpinner";
import { useState } from "react";
import Star from "../../components/Star/Star";

const MealDetails = () => {
  const [selected, setSelected] = useState(false);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: meal = {}, isLoading } = useQuery({
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
    like,
    category,
    title,
    price,
  } = meal;

  const handleRadioChange = () => {
    setSelected(!selected);
  };

  if (isLoading) return <LoadSpinner />;

  return (
    <div>
      <div className=" flex flex-col md:flex-row md:gap-10 lg:gap-20">
        <img className="md:w-1/2" src={meal_img} alt="" />
        <div className="flex-1">
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
              <span className="">{like}</span>
            </div>
          </div>
          <div className="flex gap-2">
          <Star rating={rating} />
          </div>
          <p>{meal?.description || "description...."}</p>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
