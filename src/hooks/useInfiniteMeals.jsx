import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from './useAxiosPublic';

const fetchMeals = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/meals?page=${pageParam}`);
  return data;
};

const useInfiniteMeals = () => {
  return useInfiniteQuery({
    queryKey: ['meals'],
    queryFn: fetchMeals,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage ?? false;
    },
  });
};

export default useInfiniteMeals;
