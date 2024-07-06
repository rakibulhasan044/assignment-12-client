import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import PackageDetalis from "./PackageDetalis";
import LoadSpinner from "../../components/Spiner/LoadSpinner";

const CheckOut = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
  
    const { data: item = {}, isLoading} = useQuery({
      queryKey: ["item", id],
      queryFn: async () => {
        const { data } = await axiosPublic.get(`/package/${id}`);
        return data;
      },
    });
  
    if(isLoading) return <LoadSpinner />

    return (
        <div>
            <h2 className="text-center py-5 text-green-500 text-xl font-bold">By activating any package you can order meals from us</h2>
            <PackageDetalis item={item} />
        </div>
    );
};

export default CheckOut;