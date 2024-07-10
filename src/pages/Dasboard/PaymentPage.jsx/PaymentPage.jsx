import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import LoadSpinner from "../../../components/Spiner/LoadSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-payments/${user.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadSpinner />;

  return (
    <div className="w-full">
        <h2 className=" text-center pt-6  text-2xl font-bold">
        My Payment History
      </h2>
      {payments.length > 0 ? <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>Transection ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.name}</td>
                <td className="text-green-500">{payment.transectionId}</td>
                <td>{moment(payment.date).format("MMMM Do YYYY, h:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></> : <h2 className="text-center text-2xl font-bold flex items-center justify-center min-h-[500px] text-yellow-500">
        No transection Found
      </h2>}
    </div>
  );
};

export default PaymentPage;
