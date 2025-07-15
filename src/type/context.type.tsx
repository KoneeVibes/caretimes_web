import React from "react";

export type ContextType = {
    openMenu: boolean
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
    isAuthenticationMethodSelectionModalOpen: boolean,
    setIsAuthenticationMethodSelectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isAuthenticationFormModalOpen: {
        status: boolean;
        index: number;
    },
    setIsAuthenticationFormModalOpen: React.Dispatch<React.SetStateAction<{
        status: boolean;
        index: number;
    }>>
}

export type ContextProviderPropsType = {
    children: React.ReactNode
}