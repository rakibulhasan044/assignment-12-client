
import LoadSpinner from "../../components/Spiner/LoadSpinner";
import useUpcomingMeals from "../../hooks/useUpcomingMeals";
import MealsCard from "../Home/MealsCategory/MealsCard";


const UpcomingMeals = () => {
    const [meals, isLoading] = useUpcomingMeals()
  
    if(isLoading) return <LoadSpinner/>
    return (
        <div>
            <h2 className=" text-center text-2xl font-bold">All Upcoming Meals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    meals.map(item => <MealsCard key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default UpcomingMeals;