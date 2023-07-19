import { Link, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useProvider } from "../context";

const Navigation = () => {

  const { token, updateToken, updateRole } = useProvider()
  const navigate = useNavigate()

  const logout = async () => {
    const response = await fetch('https://puce-frightened-camel.cyclic.app/api/logout', {
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
    <div className="nav-bar">
      <h1>SaDam Restaurant</h1>
      <ul>
        <Link to='/' className="nav-link">Home</Link>
        <Link to='/menu' className="nav-link">Menu</Link>
        <Link to='/cart' className="nav-link" ><ShoppingCartCheckoutSharpIcon /></Link>
        {!token && <Link to='/signin' className="sign-in-btn">Sign in</Link>}
        {token && <button onClick={logout} className="sign-up-btn">
          <LogoutSharpIcon/>
        </button>}
      </ul>
    </div>
  )
}

export default Navigation;
