import { createContext, useState } from "react";

export const userContext = createContext()



export default function UserContextProvider(props) {
    const [userToken, setUserToken] = useState(localStorage.getItem("userTokennote"))



    return <userContext.Provider value={{ userToken, setUserToken }}>
        {props.children}
    </userContext.Provider>

}

