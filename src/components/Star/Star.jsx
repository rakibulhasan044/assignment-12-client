// import { FaStar } from "react-icons/fa";

// const Star = ({rating}) => {
//     return [...Array(5)].map((_, index) => (
//         <FaStar
//           key={index}
//           size={25}
//           className={index < rating ? "text-yellow-500" : "text-gray-300"}
//         />
//       ));
// };

// export default Star;

import { FaStar, FaStarHalf } from 'react-icons/fa';
import PropTypes from 'prop-types';


const Star = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  console.log(fullStars,'mm', halfStar,'empty', emptyStars);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} size={25} className="text-yellow-500" />
      ))}
      {halfStar && <FaStarHalf size={25} className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar key={fullStars + index + (halfStar ? 1 : 0)} size={25} className="text-gray-300" />
      ))}
    </div>
  );
};

Star.propTypes = {
  rating: PropTypes.number
};

export default Star;

