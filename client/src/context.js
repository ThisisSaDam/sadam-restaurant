import React, { useContext, useEffect, useState } from "react";

export const Context = React.createContext();

export const Provider = ({children}) => {
  
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
      if (cookie.startsWith('token=')) setToken(cookie.split('=')[1])
      if (cookie.startsWith('role=')) setRole(cookie.split('=')[1])
      if (cookie.startsWith('dishes=')) {
        const value = cookie.split('=')[1].split('|')
        const list = value.map(v => JSON.parse(v))
        setDishes(list)
      }
    }
  }, [])

  const updateToken = token => setToken(token)
  const updateRole = role => setRole(role)
  const updateDishes = dishes => setDishes(dishes)

  return (
    <Context.Provider value={{
      token, updateToken,
      role, updateRole,
      dishes, updateDishes
    }}>
      {children}
    </Context.Provider>
)}

export const useProvider = () => useContext(Context)
