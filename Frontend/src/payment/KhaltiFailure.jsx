import { useNavigate, useLocation } from "react-router-dom";

const KhaltiFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pidx = query.get("pidx");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Khalti Payment Failed ❌
        </h1>

        <p className="text-gray-700 mb-4">
          Your payment was cancelled or failed.
        </p>

        <div className="bg-gray-100 p-4 rounded mb-4 text-left">
          <p>
            <strong>PIDX:</strong> {pidx}
          </p>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
        >
          Go Dashboard
        </button>
      </div>
    </div>
  );
};

export default KhaltiFailure;
