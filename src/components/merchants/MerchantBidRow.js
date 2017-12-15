import React from "react";
import { Link } from "react-router";

export const MerchantBidRow = ({ bid, onDelete }) => {
  return (
    <tr key={bid.id}>
      <td>{bid.id}</td>
      <td>{bid.carTitle}</td>
      <td>{bid.amount}</td>
      <td>{new Date(bid.created).toLocaleString()}</td>
    </tr>
  );
};
