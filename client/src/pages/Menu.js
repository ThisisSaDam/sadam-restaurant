/* eslint-disable jsx-a11y/alt-text */
import Layout from "../pages/Layout";
import { chicken, hamburger, pizza } from "../fakedata/data";
import AddToCart from "../components/AddToCart";
import { useProvider } from "../context";
import { Navigate } from "react-router-dom";
import { useRef } from 'react';

const Menu = () => {

  const { token } = useProvider();
  const hamburgerRef = useRef(null);
  const pizzaRef = useRef(null);
  const chickenRef = useRef(null);

  if (!token) {
    return <Navigate to={'/signin'} />
  }

  const hamburgerItem = hamburger.map(foodItem =>
    <div className="dishes-item">
      <img src={foodItem.url} />
      <h4>{foodItem.name} <p>{foodItem.price}$</p></h4>
      <AddToCart dish={foodItem}/>
    </div>
  );

  const pizzaItem = pizza.map(foodItem => 
    <div className="dishes-item">
      <img src={foodItem.url} />
      <h4>{foodItem.name} <p>{foodItem.price}$</p></h4>
      <AddToCart dish={foodItem}/>
    </div>
  );

  const chickenItem = chicken.map(foodItem => 
    <div className="dishes-item">
      <img src={foodItem.url} />
      <h4>{foodItem.name} <p>{foodItem.price}$</p></h4>
      <AddToCart dish={foodItem}/>
    </div> 
  )

  const scroll = ref => {
    ref.current.scrollIntoView();
  }

  return (
    <Layout>
      <div className="menu-container">
        <div className="sub-nav">
          <button onClick={() => scroll(hamburgerRef)}>Hamburger</button>
          <button onClick={() => scroll(pizzaRef)}>Pizza</button>
          <button onClick={() => scroll(chickenRef)}>Chicken</button>
        </div>
        <div className="menu">
          <span ref={hamburgerRef} className="empty-row"></span>
          {hamburgerItem}
          <span ref={pizzaRef} className="empty-row"></span>
          {pizzaItem}
          <span ref={chickenRef} className="empty-row"></span>
          {chickenItem}
        </div>
      </div>
    </Layout>
  )
};

export default Menu;
