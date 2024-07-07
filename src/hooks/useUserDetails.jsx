import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userInfo = [], isLoading, refetch} = useQuery({
        queryKey: ['userInfo', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data
        }
    })
    return [userInfo, isLoading, refetch]
};

export default useUserDetails;