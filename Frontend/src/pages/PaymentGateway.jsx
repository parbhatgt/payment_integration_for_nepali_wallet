import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { esewapayment, khaltipayment} from "../api/payment";
const PaymentGateway = () => {
  const [selectedGateway, setSelectedGateway] = useState("esewa");
  const location = useLocation();
  const { price } = location.state || {};

  const handlePayment = async () => {
    const transaction_uuid = Date.now().toString();
    const data = { transaction_uuid, amount: price };

  if (selectedGateway === "esewa") {
    const response = await esewapayment(data); 
    const html = response.data;

    const newWindow = document.open();
    newWindow.write(html);
    newWindow.close();

  } else if (selectedGateway === "khalti") {
   const response = await khaltipayment({amount: price });
    console.log("Khalti response:", response.data);
    // 🔥 redirect user to khalti page
    window.location.href = response.data.payment_url;
  }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Gateway</h2>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="text"
            value={`Rs.${price}`}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Select Payment Gateway */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Select Payment Method
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedGateway("esewa")}
              className={`flex-1 py-2 rounded-lg font-semibold border flex items-center justify-center gap-2 ${
                selectedGateway === "esewa"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <img src="/esewa.png" alt="eSewa" className="h-5" />
              eSewa
            </button>

            <button
              onClick={() => setSelectedGateway("khalti")}
              className={`flex-1 py-2 rounded-lg font-semibold border flex items-center justify-center gap-2 ${
                selectedGateway === "khalti"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <img src="/khalti.png" alt="Khalti" className="h-5" />
              Khalti
            </button>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;
