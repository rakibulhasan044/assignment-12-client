import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useMeals from '../../hooks/useMeals';
import MealsCard from "../Home/MealsCategory/MealsCard";
import CategoryListbox from "../../components/CategoryListbox/CategoryListbox";
import LoadSpinner from "../../components/Spiner/LoadSpinner";

const Meals = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [meals, totalMealsCount, isLoading, refetch ] = useMeals(page, filter, priceRange);
  const [items, setItems] = useState([]);

  const options = ['breakfast', 'lunch', 'snacks', 'dinner', 'all'];
  const priceRangeOptions = ['5-10', '10-20', '20-30', 'all'];

  useEffect(() => {
    if (page === 1) {
      setItems(meals);
    } else {
      setItems(prevItems => [...prevItems, ...meals]);
    }
  }, [meals, page]);

  useEffect(() => {
    setPage(1);
    refetch();
  }, [filter, priceRange, refetch]);

  const handleCategory = (selectedFilter) => {
    setFilter(selectedFilter === 'all' ? '' : selectedFilter);
  };

  const handlePriceRange = (selectedPriceRange) => {
    setPriceRange(selectedPriceRange === 'all' ? '' : selectedPriceRange);
  };

  const fetchMoreData = () => {
    if (items.length < totalMealsCount) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      <h1>Meals</h1>
      <hr />
      <div className="flex gap-5 md:gap-20">
        <CategoryListbox
          options={options}
          name={'Filter by Category'}
          handleCategory={handleCategory}
        />
        <CategoryListbox
          options={priceRangeOptions}
          name={'Filter by Price'}
          handleCategory={handlePriceRange}
        />
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < totalMealsCount}
        loader={<LoadSpinner/>}
        
        endMessage={
          <p style={{ textAlign: "center", padding: 10 }}>
            <b>No More Meal Availavle</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <MealsCard key={item._id} item={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Meals;
