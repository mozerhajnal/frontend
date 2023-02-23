import {
    createContext,
    useReducer,
    useContext,
    useMemo,
  } from 'react';
  
  const initialMenu = {
    shopOpen: false,
    cartOpen: false,
  };
  
  const MenuContext = createContext();
  
  function menuReducer(menu, action) {
    switch (action.type) {
      case 'shop': {
        return { ...menu, shopOpen: !menu.shopOpen };
      }
      case 'cart': {
        return { ...menu, cartOpen: !menu.cartOpen };
      }
      case 'resetMenu': {
        return { ...initialMenu };
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
  
  function MenuProvider({ children }) {
    const [menu, dispatch] = useReducer(menuReducer, initialMenu);
    const memoMenu = useMemo(() => ({ menu, dispatch }), [menu]);
  
    return (
      <MenuContext.Provider value={memoMenu}>{children}</MenuContext.Provider>
    );
  }
  
  function useMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
      throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
  }
  
  export { MenuProvider, useMenu };
  