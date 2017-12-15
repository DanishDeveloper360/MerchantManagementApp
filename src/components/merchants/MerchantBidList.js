import React from "react";
import { MerchantBidRow } from "./MerchantBidRow";

export const MerchantBidList = ({ bids, onDelete }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Car Title</th>
          <th>Amount</th>
          <th>Created Date</th>
       
        </tr>
      </thead>
      <tbody>{bids.map(bid => MerchantBidRow({ bid, onDelete }))}</tbody>
    </table>
  );
};
