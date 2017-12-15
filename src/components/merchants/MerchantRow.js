import React from 'react';
import { Link } from 'react-router';

export const MerchantRow = ({merchant, onDelete}) => {
  return (
    <tr key={merchant.id}>    
      <td>
      <img src={`${merchant.avatarUrl}`} style={{ height: 50 }} /> </td>
      <td>{merchant.firstname}</td>
      <td>{merchant.lastname}</td>   
      <td>{merchant.email}</td>
      <td>{merchant.phone}</td>      
      <td>{merchant.hasPremium ? "yes" : "No"}</td>   

      <td>
        <div className="btn-toolbar pull-right" >
          <Link to={`/merchants/${merchant.id}`} className="btn btn-primary">Edit</Link>
          <a onClick={onDelete.bind(this, merchant)} className="btn btn-danger">Delete</a>
        </div>
      </td>
    </tr>
  )
};