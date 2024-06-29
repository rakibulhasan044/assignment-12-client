import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = (limit, page) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: meals =[],
    IsLoading,
    refetch,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/meals", {
        params: { limit, page }
      });
      return res.data;
    },
  });
  return [meals, IsLoading, refetch];
};

export default useMenu;
