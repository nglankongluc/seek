import React, {useState, useContext} from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}

export function useUserUpdate(){
    return useContext(UserUpdateContext);
}

export const UserProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        console.log("LoggedIn was: " + loggedIn);
        setLoggedIn(prevLoginState => !prevLoginState);
        console.log("loggedIn should now be: " + loggedIn);
    }

    return(
        <UserContext.Provider value={loggedIn}>
            <UserUpdateContext.Provider value={handleLogin}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}