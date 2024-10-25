import { createContext, useState } from "react";

export let UserContext = createContext(0);

export default function UserContextProvider(props:a){
    let [user,setUser] = useState(0)

    let increaseUser = () => {
        setUser(user + 1)
    }

    let decreaseUser = () => {
        setUser(user - 1)
    }



return(
    <UserContext.Provider value={{ user,increaseUser,decreaseUser }}>
        {props.children}
    </UserContext.Provider>
)

}