
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();

    const {data: meals = [], isLoading, refetch} = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const {data} = await axiosPublic.get('/upcoming-meals')
            return data
        }
    })
    return [meals, isLoading, refetch];
};

export default useUpcomingMeals;