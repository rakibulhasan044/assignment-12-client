import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = (page = null, filter, priceRange, limit = 0) => {
  const axiosPublic = useAxiosPublic();

  const queryKey = ["meals", filter, priceRange];
  if (page !== null) {
    queryKey.push(page);
  }

  const { data: meals = [], isLoading, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = { filter, priceRange };
      if (page !== null) {
        params.page = page;
        params.limit = limit;
      }
      const res = await axiosPublic.get("/meals", { params });
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

  return [meals, totalMealsCount, isLoading, refetch];
};

export default useMeals;
