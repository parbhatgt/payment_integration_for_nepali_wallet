import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const KhaltiSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  const query = new URLSearchParams(location.search);

  const pidx = query.get("pidx");
  const status = query.get("status"); // ✅ ADD THIS

  console.log("Khalti params:", { pidx, status });

  // ❌ Missing pidx
  if (!pidx) {
    setError("Missing payment info");
    setLoading(false);
    return;
  }

  // ❌ Payment failed / cancelled
  if (status !== "Completed") {
    navigate(`/khalti/failure?pidx=${pidx}`);
    return;
  }

  // ✅ Only success case hits backend
  api.get("/verify/khalti", { params: { pidx } })
    .then(res => {
      setPaymentData(res.data.payment);
      setLoading(false);
    })
    .catch(() => {
      setError("Verification failed");
      setLoading(false);
    });

}, [location]);

  if (loading) return <p>Verifying Khalti payment...</p>;

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Payment Successful ✅</h1>
        <p className="text-gray-700 mb-6">Thank you for your payment!</p>

        {paymentData && (
          <div className="bg-gray-100 p-4 rounded mb-6 text-left">
            <p><strong>Pidx:</strong> {paymentData.pidx}</p>
            <p><strong>Amount Paid:</strong> Rs. {paymentData.amount}</p>
            <p><strong>Status:</strong> {paymentData.status}</p>
            <p><strong>Transaction ID:</strong> {paymentData.transaction_id}</p>
            <p><strong>Date:</strong> {new Date(paymentData.createdAt).toLocaleString()}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-6 py-3 rounded font-semibold hover:bg-blue-600 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default KhaltiSuccess;