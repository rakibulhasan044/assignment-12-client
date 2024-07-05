import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const PackageCard = ({ item }) => {
  return (
    <div
      className={`border rounded-xl text-neutral-content 
      ${item.title === "Silver" && "border-[#C0C0C0]"}
      ${item.title === "Gold" && "border-[#FFD700]"}
      ${item.title === "Platinum" && "border-[#e5e4e2]"}`}
    >
      <div
        className={`card-body p-4 items-center text-center
        ${item.title === "Silver" && "text-[#C0C0C0]"}
        ${item.title === "Gold" && "text-[#FFD700]"}
        ${item.title === "Platinum" && "text-[#e5e4e2]"}`}
      >
        <h2 className="card-title text-3xl ">{item.title}</h2>
        <h2 className="card-title text-3xl">${item.price}</h2>
        <h2 className="card-title text-xl">/month</h2>
        <p className="text-slate-400">Meals for Breakfast, Lunch, Dinner and Snack with 4 Week Rotation</p>
        <Link to="/checkout" className="btn border-green-500 text-green-500 bg-slate-100 hover:bg-green-500 hover:text-white w-full">
          Details
        </Link>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
    item: PropTypes.object,
  };

export default PackageCard;
