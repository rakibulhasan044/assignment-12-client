import { useQuery } from "@tanstack/react-query";
import PackageCard from "./PackageCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MembershipPackage = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure
  const {data: packages = [] } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
       const res = await axiosPublic.get(`/package`)
       return res.data;
    }
  })

  return (
    <div className="">
      <h2 className="my-10 text-4xl text-center font-extrabold text-green-500">
        Explore Our special package
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {
          packages.map(item => <PackageCard key={item._id} item={item} />
          )
        }
      </div>
    </div>
  );
};

export default MembershipPackage;
