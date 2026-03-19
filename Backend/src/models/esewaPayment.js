import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const EsewaPayment= sequelize.define(
  "EsewaPayment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, // e.g., "success" or "failure"
      allowNull: false,
    },
    ref_id: {
      type: DataTypes.STRING, // eSewa reference id
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "esewa_payments",
    timestamps: false, // you already have explicit createdAt
  }
);

export default EsewaPayment;