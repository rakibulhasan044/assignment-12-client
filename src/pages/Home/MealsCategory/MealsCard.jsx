import { Link } from "react-router-dom";

const MealsCard = ({ item }) => {
  const { _id, meal_img, rating, title, price } = item;

  return (
    <div className="bg-base-100 shadow-xl">
      <figure>
        <img className=" rounded-md" src={meal_img} alt="Shoes" />
      </figure>
      <div className="py-2">
        <h2 className="card-title">{title}</h2>
        <div className="flex">
          <p>Rating: {rating}</p>
          <p className="text-xl font-bold text-red-700">${price}</p>
        </div>
      </div>
      <Link to={`/meal/${_id}`} className="btn btn-info w-full">
        Details
      </Link>
    </div>
  );
};

export default MealsCard;
