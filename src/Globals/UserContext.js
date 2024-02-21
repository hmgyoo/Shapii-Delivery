import React from 'react'

const UserContext = React.createContext();

const UserProvider =({ children }) => {
  const [userId, setUserId] = React.useState('')
  const [userUsername, setUserUsername] = React.useState('')

  return (
    <UserContext.Provider value={{ 
      userId, 
      setUserId,
      userUsername,
      setUserUsername, 
    }}>
      { children }
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider}