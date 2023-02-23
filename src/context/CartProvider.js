import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext({});

export function CartProvider({ children }){
  const [cart, setCart] = useState([]);

  const memoCart = useMemo(() => ({ cart, setCart }), [cart]);
  return (
    <CartContext.Provider value={memoCart}>{children}</CartContext.Provider>
  );
};
