import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import moment from 'moment';
import PropTypes from 'prop-types';
import Star from "../Star/Star";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SpecificReviews = ({id}) => {
    
const axiosPublic = useAxiosPublic()

  const {data: reviews = []} = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
        const {data} = await axiosPublic.get(`/reviews/${id}`)
        return data
    }
  })

  return (
    <div className="max-w-6xl py-2 mx-auto">
      <h1 className=" text-2xl font-semibold text-gray-400 capitalize lg:text-3xl">
        Reviews
      </h1>
      {
        reviews.length === 0 ? <p className="text-2xl font-bold py-4">No review yet</p> : (
            <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper mt-6"
      >
        {reviews.map((r) => (
          <SwiperSlide key={r._id}>
            <div className="p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src={r.photo} alt={r.name} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{r.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {moment(r.date).format("MMM Do, YYYY")}
                  </p>
                  <div className="flex gap-1">
                    <Star rating={r.rating} />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {r.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        )
      }
    </div>
  );
};

SpecificReviews.propTypes = {
  id: PropTypes.string
}

export default SpecificReviews;