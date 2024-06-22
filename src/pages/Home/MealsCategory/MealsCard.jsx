const MealsCard = ({ item }) => {
    const {meal_img, rating, title, price} = item
  return (
    <div className="bg-base-100 shadow-xl">
      <figure>
        <img className=" rounded-md" src={meal_img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex">
            <p>Rating: {rating}</p>
            <p className="text-xl font-bold text-red-700">${price}</p>
        </div>
       
          <button className="btn btn-info">Details</button>
        
      </div>
    </div>
  );
};

export default MealsCard;
