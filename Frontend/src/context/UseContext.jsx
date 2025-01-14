import { createContext } from "react"

export const UserDataContext = createContext()

const testing = "Goutam Bhati"

const UseContext = ({children}) => {
  return (
    <div>
        <UserDataContext.Provider value={testing}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UseContext