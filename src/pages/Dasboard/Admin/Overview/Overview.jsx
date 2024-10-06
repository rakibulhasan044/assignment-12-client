import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadSpinner from "../../../../components/Spiner/LoadSpinner";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { MdNoMeals } from "react-icons/md";

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const { data: info = [], isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/stats`);
      return data;
    },
  });

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="w-full mt-5 pr-3">
      <h1 className="text-center text-5xl font-bold py-10">Apps Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="stat place-items-center border rounded-xl shadow-md">
          <div className="stat-title">Total Users</div>
          <div className="flex items-center justify-center gap-3">
          <FaUser size={25} />
          <div className="text-3xl font-semibold">{info.totalUsers}</div>
          </div>
        </div>

        <div className="stat place-items-center border rounded-xl shadow-md">
          <div className="stat-title">Total meal Orders</div>
          <div className="flex items-center justify-center gap-3">
          <MdNoMeals size={25} />
          <div className="text-3xl font-semibold">{info.totalRequestedMeals}</div>
          </div>
        </div>

        <div className="stat place-items-center border rounded-xl shadow-md">
          <div className="stat-title">Total Earning</div>
          <div className="flex items-center justify-center gap-3">
          <FaDollarSign size={25} />
          <div className="text-3xl font-semibold">{info.totalEarnings}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
