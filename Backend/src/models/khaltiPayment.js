import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const KhaltiPayment = sequelize.define(
  "KhaltiPayment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pidx: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, // Completed / Pending / Failed
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    refunded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "khalti_payments",
    timestamps: false,
  }
);

export default KhaltiPayment;