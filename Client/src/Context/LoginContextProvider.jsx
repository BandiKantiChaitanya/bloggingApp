import React, { useState } from 'react'
import LoginContext from './LoginContext'

function LoginContextProvider({children}) {
  let [userLogin,SetUserLogin]=useState(false)
  return (
    <div>
        <LoginContext.Provider value={[userLogin,SetUserLogin]} >
          {children}
        </LoginContext.Provider>
    </div>
  )
}

export default LoginContextProvider