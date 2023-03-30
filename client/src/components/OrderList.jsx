import '../style/OrderRow.css';
import React from 'react';

  function OrderRow({orders}) {
    return (
        <div className="App">
        <table>
        <thead>
          <tr>
            <th> Select </th>
            <th>Order_Id</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {orders.map(order => <Order key={order.id} order = {order}/>)}
          </tbody>
        </table>

        <button className='Handle-orders-button'>
        Handle Orders

        </button>


      </div>
    );
  }

  export default OrderRow;


  function Order({order:{id, items}}){
    return(
        <tr key={id}>
            <td>{id}</td>
            <td>{items}</td>


        </tr>
    )
  }