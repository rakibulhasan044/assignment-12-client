import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import LoadSpinner from "../../../components/Spiner/LoadSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-payments/${user.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadSpinner />;

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const currentPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <h2 className="text-center pt-6 text-2xl font-bold">My Payment History</h2>
      {payments.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>User Name</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                    <td>{payment.name}</td>
                    <td className="text-green-500">{payment.transectionId}</td>
                    <td>{moment(payment.date).format("MMMM Do YYYY, h:mm a")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="btn btn-sm btn-outline btn-info mr-2"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2">Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-sm btn-outline btn-info ml-2"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl font-bold flex items-center justify-center min-h-[500px] text-yellow-500">
          No transactions Found
        </h2>
      )}
    </div>
  );
};

export default PaymentPage;
