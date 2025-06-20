import { createContext, useState } from "react";
import { ContextProviderPropsType, ContextType } from "../type/context.type";

export const Context = createContext({} as ContextType);

export const ContextProvider: React.FC<ContextProviderPropsType> = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <Context.Provider value={{ openMenu, setOpenMenu }}>
            {children}
        </Context.Provider>
    )
}