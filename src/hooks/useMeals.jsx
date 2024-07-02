import { useQuery} from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = (page, filter, priceRange, limit = 6) => {
  const axiosPublic = useAxiosPublic();

  const { data: meals = [], isLoading, refetch } = useQuery({
    queryKey: ["meals", page, filter, priceRange],
    queryFn: async () => {
      const res = await axiosPublic.get("/meals", {
        params: { limit, page, filter, priceRange }
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const { data: countData } = useQuery({
    queryKey: ["mealsCount", filter, priceRange],
    queryFn: async () => {
      const res = await axiosPublic.get("/mealsCount", {
        params: { filter, priceRange }
      });
      return res.data.count;
    },
  });

  const totalMealsCount = countData || 0;

  return [ meals, totalMealsCount, isLoading, refetch ];
};

export default useMeals;

