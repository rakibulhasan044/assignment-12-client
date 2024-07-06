import PropTypes from 'prop-types';
import CheckOutModal from '../../components/Modal/CheckOutModal';
import { useState } from 'react';

const PackageDetalis = ({ item }) => {

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex justify-center">
      <section className={`border rounded-xl px-2 py-5 lg:w-3/5
        ${item?.title === "Silver" && "border-[#C0C0C0]"}
        ${item?.title === "Gold" && "border-[#FFD700]"}
        ${item?.title === "Platinum" && "border-[#e5e4e2]"}`}>
        <div className=" space-y-1">
          <h2 className={`text-3xl text-center font-bold
            ${item.title === "Silver" && "text-[#C0C0C0]"}
            ${item.title === "Gold" && "text-[#FFD700]"}
            ${item.title === "Platinum" && "text-[#e5e4e2]"}`}>
            {item.title}
          </h2>
          <h2 className={`text-3xl text-center font-bold
            ${item.title === "Silver" && "text-[#C0C0C0]"}
            ${item.title === "Gold" && "text-[#FFD700]"}
            ${item.title === "Platinum" && "text-[#e5e4e2]"}`}>
            ${item.price}
          </h2>
          <h2 className={`text-xl text-center font-semibold
            ${item.title === "Silver" && "text-[#C0C0C0]"}
            ${item.title === "Gold" && "text-[#FFD700]"}
            ${item.title === "Platinum" && "text-[#e5e4e2]"}`}>
            /month
          </h2>
          <p className="text-center md:px-5">
            Meals for Breakfast, Lunch, Dinner and Snack with 4 Week Rotation
          </p>
          <p className="text-center">Calories1350-1600</p>
        </div>
        <ul className="timeline timeline-vertical -ml-40 md:-ml-72">
          {
            item?.facilities.map((p, index) => (
                <li key={index}>
            <div className="timeline-middle ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box ">
              {p}
            </div>
          </li>
            ))
          }
         
        </ul>
        <div className="pt-5">
        <button onClick={() => setIsOpen(true)} className="btn border-green-500 text-green-500 bg-slate-100 hover:bg-green-500 hover:text-white w-full">
          Activate Plan
        </button>
        <CheckOutModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        item={item} />
        </div>
      </section>
    </div>
  );
};

PackageDetalis.propTypes = {
    item: PropTypes.object,
}

export default PackageDetalis;
