import { createContext,useState } from "react";
const MainContext= createContext();

export const MainContextProvider=({children})=>{
    const [userState,setUserState]=useState({})
    const [inventory,setInventory]=useState([])


    return <MainContext.Provider value={
        {
            userState,
            setUserState,
            inventory,
            setInventory,
            
          
        }
    }>
        {children}
    </MainContext.Provider>
}
export default MainContext