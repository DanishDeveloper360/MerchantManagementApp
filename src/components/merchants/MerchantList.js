import React from 'react';
import { MerchantRow } from './MerchantRow';

export const MerchantList = ({merchants, onDelete}) => {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
      <th>Avatar</th>
        <th>First Name</th>
        <th>Last Name</th>      
        <th>Email</th>
        <th>Phone</th>
        <th>Has Premium</th>    
        <th></th>
      </tr>
      </thead>
      <tbody>
      {merchants.map(merchant => MerchantRow({merchant, onDelete}))}
      </tbody>
    </table>
  )
};