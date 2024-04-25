import { useContext, createContext, useState } from "react";

const controlStateContext = createContext();

function ControlStateProvider({ children }) {

    const [isAuthenicated, setIsauthenicated] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);



    return <controlStateContext.Provider value={{
        isAuthenicated, setIsauthenicated,
        isRegistered, setIsRegistered
    }}>
        {children}
    </controlStateContext.Provider>
}

function useControlState() {
    const context = useContext(controlStateContext);
    if (context === undefined) throw new Error("Context is used outside the ContextProvider");
    return context;
}

export { useControlState, ControlStateProvider };