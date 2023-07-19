import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';
import { useProvider } from '../context';


const AddToCard = ({dish}) => {

  const [amount, setAmount] = useState(0)
  const {dishes, updateDishes} = useProvider();

  const addToCart = () => {
    let newDishes = null
    let dishObj = dishes.find(d => d.name === dish.name)
    if (!dishObj) {
      dishObj = { ...dish, amount: parseInt(amount) }
      newDishes = [...dishes, dishObj]
    } else {
      dishObj.amount = parseInt(dishObj.amount) + parseInt(amount);
      newDishes = [...dishes.filter(d => d.name !== dish.name), dishObj]
    }

    updateDishes(newDishes)
    const dishList = newDishes.map(dish => JSON.stringify(dish))
    document.cookie = `dishes=${dishList.join('|')}`

    alert('Success: ' + dishObj.name + ' ' + dishObj.amount)
  }

  return (
    <div className='add-to-card'>
      <label>Số Lượng:</label>
      <input type={'number'} min={0} max={100} placeholder={0}
        value={amount} onChange={e => setAmount(e.target.value)}></input>
      <button onClick={addToCart}><AddShoppingCartIcon /></button>
    </div>
)
}

export default AddToCard;