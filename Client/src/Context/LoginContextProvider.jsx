import React, { useState } from 'react'
import LoginContext from './LoginContext'
import { useEffect } from 'react';

function LoginContextProvider({children}) {
  let [userLogin,SetUserLogin]=useState(null)
  const API_BASE = import.meta.env.VITE_API_URL;
  console.log(userLogin)

  useEffect(() => {
    fetch(`${API_BASE}/api/me`, { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('Not logged in');
      })
      .then(data => SetUserLogin(true))
      .catch(() => SetUserLogin(false));
  }, [API_BASE]);
  return (
    <div>
        <LoginContext.Provider value={[userLogin,SetUserLogin]} >
          {children}
        </LoginContext.Provider>
    </div>
  )
}

export default LoginContextProvider