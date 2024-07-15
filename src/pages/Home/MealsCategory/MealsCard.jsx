import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; 

const MealsCard = ({ item }) => {
  const { _id, meal_img, rating, title, price } = item;

  return (
    <div className="bg-base-100 shadow-xl p-2 rounded-xl mt-auto">
      <figure>
        <img className=" rounded-md" src={meal_img} alt="Shoes" />
      </figure>
      <div className="py-2">
        <h2 className="card-title">{title}</h2>
        <div className="flex items-center gap-10 py-2">
          <p>
            {
              rating === 0? 'No rating yet' : <>Rating: {rating.toFixed(2)}</>
            }
          </p>
          <p className="text-xl font-bold text-red-700">${price}</p>
        </div>
      </div>
      <Link to={`/meal/${_id}`} className="btn btn-info w-full text-white hover:bg-white hover:text-info">
        Details
      </Link>
    </div>
  );
};


MealsCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    meal_img: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.node.isRequired,
  }).isRequired,
};

export default MealsCard;
