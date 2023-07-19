/* eslint-disable jsx-a11y/alt-text */
import Layout from "../pages/Layout";
import { spotlightImgs, topDishes, chefs, foodsRecipe } from "../fakedata/data";
import { Link } from "react-router-dom";

const Home = () => {

  const spotlight = spotlightImgs.map(spotlightImg =>
    <img src={spotlightImg.url} style={{ width: '300px' }} />
  );

  const bestdishes = topDishes.map(dishes =>
    <div className="dishes-item">
      <img src={dishes.url} />
      <h4>{dishes.name} {dishes.price}$</h4>
      <p>{dishes.desc}</p>
      <Link to='/Cart' className="order-btn">Order ngay</Link>
    </div>
  );

  const chefIntroduction = chefs.map(chef =>
    <div className="chef-item">
      <img src={chef.url} />
      <div className="item">
        <h4>{chef.name}</h4>
        <p>{chef.desc}</p>
      </div>
    </div>
  );

  const foodRecipeIntroduction = foodsRecipe.map(foodRecipe => 
    <div className="food-recipe">
      <div>
        <img src={foodRecipe.url}/>
      </div>
      <div>
        <h4>{foodRecipe.name}</h4>
        <p>{foodRecipe.desc}</p>
      </div>
    </div>  
  )

  return (
    <Layout>
      <div className="home">
        <div className="overlay"></div>
        <div className="spotlight">
          <div className="content-home">
            <h2>
              Welcome to <br /> SaDam Restaurant
            </h2>
            <div className="spotlight-imgs">
              {spotlight}
            </div>
          </div>
        </div>
        <h1>"Nhà hàng thức ăn nhanh hiện đại <br/>
          đã sẵn sàng để thay thế <br/>
          ngôi vua.”"</h1>
        <h2>Top Dishes</h2>
        <div className="top-dishes">
          {bestdishes}
        </div>
        <h2>About us</h2>
        <div className="container-introduction">
          <div className="introduction">
            {chefIntroduction}
            {foodRecipeIntroduction}
          </div>

        </div>
      </div>
    </Layout>
  )
};

export default Home;

