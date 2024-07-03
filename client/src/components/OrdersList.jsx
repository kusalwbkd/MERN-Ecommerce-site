
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formatPrice } from '../utils';
day.extend(advancedFormat);

const OrdersList = () => {
    const{orders,totalOrders}=useLoaderData()
  return (
   
    <div className='mt-8'>
    <h4 className='mb-4 capitalize'>
      total orders : {totalOrders}
    </h4>
    <div className='overflow-x-auto'>
      <table className='table table-zebra'>
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Products</th>
            <th>Cost</th>
            <th className='hidden sm:block'>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => {

            const{_id,createdAt,orderItems,subtotal,user}=order
          
           
            const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
            return (
              <tr key={_id}>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{orderItems.length}</td>
                <td>{formatPrice(subtotal)}</td>
                <td className='hidden sm:block'>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default OrdersList