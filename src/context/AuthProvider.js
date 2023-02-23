import {
    createContext, useState, useMemo,
  } from 'react';
  
  export const AuthContext = createContext({});
  
  export function AuthProvider({ initialUserData, children }) {
    const [user, setUser] = useState(initialUserData);
  
    const memoUser = useMemo(() => ({ user, setUser }), [user]);
    return (
      <AuthContext.Provider value={memoUser}>{children}</AuthContext.Provider>
    );
  }