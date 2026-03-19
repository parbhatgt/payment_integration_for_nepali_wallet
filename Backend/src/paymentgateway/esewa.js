import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import EsewaPayment from '../models/esewaPayment.js';

function generateSignature(dataString, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(dataString)
    .digest('base64');
}

export const esewaPayment = (req, res) => {
  const { amount, transaction_uuid } = req.body;

  const merchantCode = process.env.ESEWA_MERCHANT_CODE;
  const secretKey = process.env.ESEWA_SECRET;

  const totalAmount = amount;
  const fields = `total_amount,transaction_uuid,product_code`;
  const raw = `total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=${merchantCode}`;

  const signature = generateSignature(raw, secretKey);

  const successUrl = `http://localhost:5173/esewa/success?transaction_uuid=${transaction_uuid}&total_amount=${totalAmount}`;
  const failureUrl = `http://localhost:5173/esewa/failure?transaction_uuid=${transaction_uuid}&total_amount=${totalAmount}`;

  res.send(`
    <form id="esewaForm" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
      <input type="hidden" name="amount" value="${amount}" />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value="${totalAmount}" />
      <input type="hidden" name="transaction_uuid" value="${transaction_uuid}" />
      <input type="hidden" name="product_code" value="${merchantCode}" />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input type="hidden" name="success_url" value="${successUrl}" />
      <input type="hidden" name="failure_url" value="${failureUrl}" />
      <input type="hidden" name="signed_field_names" value="${fields}" />
      <input type="hidden" name="signature" value="${signature}" />
    </form>

    <script>document.getElementById('esewaForm').submit();</script>
  `);
};

export const verifyEsewa = async (req, res) => {
  try {

    let { transaction_uuid, total_amount } = req.query;

    if (!transaction_uuid || !total_amount) {
      return res.status(400).json({ error: "Missing transaction_uuid or total_amount" });
    }

    // Convert to number
    const numericAmount = Number(total_amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({ error: "Invalid total_amount" });
    }

    const url = `https://rc.esewa.com.np/api/epay/transaction/status/`;
    const payload = {
      product_code: process.env.ESEWA_MERCHANT_CODE,
      total_amount: numericAmount,
      transaction_uuid
    };

    const response = await axios.get(url, { params: payload });
    const data = response.data;

    const paymentStatus = data.status || "failure";
    const refId = data.ref_id || null;

    let paymentRecord = await EsewaPayment.findOne({ where: { transaction_uuid } });

if (paymentRecord) {
  await paymentRecord.update({ status: paymentStatus, ref_id: refId });
} else {
  paymentRecord = await EsewaPayment.create({
    transaction_uuid,
    amount: total_amount,
    status: paymentStatus,
    ref_id: refId,
    createdAt: new Date()
  });
}

  res.json({ success: true, payment: paymentRecord });

  } catch (error) {
    console.error("❌ Payment verification error:", error.errors || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};