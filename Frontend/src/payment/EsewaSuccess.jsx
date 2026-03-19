import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // your axios instance

const EsewaSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const query = new URLSearchParams(location.search);
  const transaction_uuid = query.get("transaction_uuid");
  let total_amount = query.get("total_amount");

  if (total_amount && total_amount.includes("?")) {
    total_amount = total_amount.split("?")[0];
  }

  if (!transaction_uuid || !total_amount) {
    setError("Missing transaction details.");
    setLoading(false);
    return;
  }

  api.get("/verify/esewa", { params: { transaction_uuid, total_amount } })
    .then(res => {
      setPaymentData(res.data.payment);
      setLoading(false);
    })
    .catch(err => {
      console.error("❌ Verification API error:", err.response?.data || err.message);
      setError("Payment verification failed. Please contact support.");
      setLoading(false);
    });
}, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Verifying your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful ✅</h1>
        <p className="text-gray-700 mb-6">Thank you for your payment!</p>

        {paymentData && (
          <div className="bg-gray-100 p-4 rounded mb-6 text-left">
            <p><strong>Transaction ID:</strong> {paymentData.transaction_uuid}</p>
            <p><strong>Amount Paid:</strong> Rs. {paymentData.amount}</p>
            <p><strong>Status:</strong> {paymentData.status}</p>
            {paymentData.ref_id && <p><strong>Reference ID:</strong> {paymentData.ref_id}</p>}
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

export default EsewaSuccess;