import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import PackageDetalis from "./PackageDetalis";
import LoadSpinner from "../../components/Spiner/LoadSpinner";


const CheckOut = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    console.log(id);
  
    const { data: card = {}, isLoading} = useQuery({
      queryKey: ["card", id],
      queryFn: async () => {
        const { data } = await axiosPublic.get(`/package/${id}`);
        return data;
      },
    });
    console.log(card);
    if(isLoading) return <LoadSpinner />
    return (
        <div>
            <h2 className="text-center py-5 text-green-500 text-xl font-bold">By activating any package you can order meals from us</h2>
            <PackageDetalis card={card} />
        </div>
    );
};

export default CheckOut;