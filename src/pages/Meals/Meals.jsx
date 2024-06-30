import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import MealsCard from "../Home/MealsCategory/MealsCard";
import LoadSpinner from "../../components/Spiner/LoadSpinner";
import CategoryListbox from "../../components/CategoryListbox/CategoryListbox";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const axiosPublic = useAxiosPublic();

  const options = ['breakfast', 'lunch', 'snacks', 'dinner', 'all']

  const handleCategory = async (selectedFilter) => {
    setFilter(selectedFilter === 'all' ? '' : selectedFilter);
  }

  const getMealsData = async () => {
    try {
      const res = await axiosPublic.get(`/meals?limit=6&page=${page}`, {
        params: {
          filter: filter,
        }
      });
      if (page === 1) {
        setMeals(res.data);
        setLoading(false)
      } else {
        setMeals((prev) => [...prev, ...res.data]);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching meals data:", error);
    }
  };

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setLoading(true)
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMealsData();
  }, [page, filter]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div>
      <div>
        <CategoryListbox
        options={options}
        name={'Filter by Category'}
        handleCategory={handleCategory} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {meals.map((item) => (
            <MealsCard key={item._id} item={item} />
          ))}
        </div>
        {loading && <LoadSpinner />}
    </div>
  );
};

export default Meals;
