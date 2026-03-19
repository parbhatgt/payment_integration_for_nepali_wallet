import express from "express";
import { login, logout } from "../controllers/authController.js";
import {isAuthenticate } from "../middleware/isAuthenticated.js";
import { esewaPayment, verifyEsewa } from "../paymentgateway/esewa.js";
import { khaltiPayment, verifyKhalti } from "../paymentgateway/khalti.js";
const router = express.Router();

router.post("/login",login)
router.post("/logout",logout)

router.use(isAuthenticate)

//esewa
router.post("/payment/esewa",esewaPayment);
router.get("/verify/esewa", verifyEsewa);

//khalti
router.post("/payment/khalti",khaltiPayment);
router.get("/verify/khalti",verifyKhalti);

export default router;
