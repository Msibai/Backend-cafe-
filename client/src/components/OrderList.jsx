import '../style/OrderRow.css';
import React from 'react';

  function OrderRow({orders}) {
    return (
        <div className="App">
        <table>
        <thead>
          <tr>
            <th> Select </th>
            <th>Order_Number</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {orders.map(order => <Order key={order.orderNumber} order = {order}/>)}
          </tbody>
        </table>

        <button className='Handle-orders-button'>
        Handle Orders

        </button>


      </div>
    );
  }

  export default OrderRow;


  function Order({order:{orderNumber, items}}){
    return(
        <tr key={orderNumber}>
            <td>{<input type="radio" value="Selection" name="order" />}</td>
            <td>{orderNumber}</td>
            <td> Received </td>


        </tr>
    )
  }