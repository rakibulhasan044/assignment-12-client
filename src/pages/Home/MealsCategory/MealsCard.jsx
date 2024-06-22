const MealsCard = ({ item }) => {
  return (
    <div className="bg-base-100 shadow-xl">
      <figure>
        <img className=" rounded-md" src={item.meal_img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default MealsCard;
