import axios from "axios";
import dotenv from "dotenv";
import KhaltiPayment from "../models/khaltiPayment.js";
dotenv.config();

export const khaltiPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const payload = {
      return_url: "http://localhost:5173/khalti/success",
      website_url: "http://localhost:5173",
      amount: amount * 100, // paisa
      purchase_order_id: Date.now().toString(),
      purchase_order_name: "Test Product",
    };

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("❌ Khalti initiate error:", error.response?.data || error.message);
    res.status(500).json({ error: "Khalti payment failed" });
  }
};


export const verifyKhalti = async (req, res) => {
  try {
    const { pidx } = req.query;

    if (!pidx) {
      return res.status(400).json({ error: "Missing pidx" });
    }

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    console.log("✅ Khalti verify:", data);

    const amount = data.total_amount / 100;

    // prevent duplicate insert
    let payment = await KhaltiPayment.findOne({ where: { pidx } });

    if (payment) {
      await payment.update({
        status: data.status,
        transaction_id: data.transaction_id,
        fee: data.fee,
        refunded: data.refunded,
      });
    } else {
      payment = await KhaltiPayment.create({
        pidx: data.pidx,
        amount,
        status: data.status,
        transaction_id: data.transaction_id,
        fee: data.fee,
        refunded: data.refunded,
        createdAt: new Date(),
      });
    }

    res.json({ success: true, payment });

  } catch (error) {
    console.error("❌ Khalti verify error:", error.response?.data || error.message);
    res.status(500).json({ error: "Verification failed" });
  }
};

