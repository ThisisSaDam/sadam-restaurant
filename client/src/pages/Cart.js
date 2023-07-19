/* eslint-disable jsx-a11y/alt-text */
import { useProvider } from "../context";
import Layout from "./Layout"
import { Navigate } from "react-router-dom";

const Cart = () => {

  const {dishes, token} = useProvider()
  if (!token) {
    return <Navigate to={'/signin'} />
  }

  let total = 0
  for (const dish of dishes) {
    total += parseInt(dish.amount) * dish.price
  }

  const submitOrder = async () => {
    const response = await fetch('https://puce-frightened-camel.cyclic.app/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({dishes}),
    })

    const data = await response.json()
    const { message } = data
    if (message === 'error') alert('Order thất cmm bại!')
    else alert('Ngon!!!')
  }

  return (
    <Layout>
      <div className="menu-container">
        <div className="order-btn">
          <h3>All Total: {total}$</h3>
          <button onClick={submitOrder}>Đặt hàng</button>
        </div>
        <div className="menu">
          {dishes && dishes.map((dish, i) => (
            <div className="dishes-item" key={i}>
              <img src={dish.url} />
              <h4>{dish.name}</h4>
              <div className="title">
                <h5>Price: {dish.price}$</h5>
                <h5>Amount: {dish.amount}</h5>
                <h4>Total: {dish.price * dish.amount}$</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Cart;