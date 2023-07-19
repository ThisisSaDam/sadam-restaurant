/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../context";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';


const Admin = () => {

  const [orders, setOrders] = useState([])
  const { token, updateToken, updateRole } = useProvider()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return;
    const getData = async () => {
      const response = await fetch('http://localhost:3003/api/order', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()
      const { message, orders } = data
      if (message === 'error') alert(message)
      else setOrders(orders);
    }

    getData()
  }, [token])

  
  const orderTotal = dishes => {
    let total = 0
    for (const dish of dishes) {
      total += parseInt(dish.amount) * dish.price
    }

    return total
  }
  
  const logout = async () => {
    const response = await fetch('http://localhost:3003/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()
    const { message } = data;
    if (message === 'error') alert(message)
    else {
      document.cookie = 'token=; Expires=Thu, 01 Jan 1970 00:00:01 GMT'
      document.cookie = 'role=; Expires=Thu, 01 Jan 1970 00:00:01 GMT'
      updateToken(null)
      updateRole(null)
      navigate('/')
    }
  }

  return (
    <div className="admin-container">
      <div className="header-admin">
        <h1>SaDam Restaurant</h1>
        <button className="sign-up-btn"
          onClick={logout}><LogoutSharpIcon /></button>
      </div>
      <h2>Danh sách đơn đặt hàng</h2>
      <div className="order">
        {orders.map((order, i) => (
          <div key={i} className="order-item">
            <h3>Customer: {order.user}</h3>
            {order.dishes.map((dish, j) => (
              <span key={j}>
                <img src={dish.url} />
                <h5>{dish.name} <p>{dish.price}$</p></h5>
              </span>
            ))}
            <h4>Total: {orderTotal(order.dishes)}</h4>
          </div>
        ))}
      </div>
    </div>

  )

}

export default Admin;