
import moment from "moment";
import PropTypes from "prop-types";
import Star from "../Star/Star";

const SingleReview = ({ review }) => {

  return (
    <div className="p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={review.photo}
            alt={review.name}
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">
            {review.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {moment(review.date).format("MMM Do, YYYY")}
          </p>
          <div className="flex gap-1">
            <Star rating={review.rating} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">{review.text}</p>

    </div>
  );
};

SingleReview.propTypes = {
  review: PropTypes.object,
};

export default SingleReview;
