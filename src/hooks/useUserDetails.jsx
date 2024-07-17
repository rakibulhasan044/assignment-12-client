import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: userInfo='' , isLoading, refetch} = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data
        }
    })
    return [userInfo, isLoading, refetch]
};

export default useUserDetails;