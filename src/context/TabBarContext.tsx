import { createContext, useContext, useState } from "react";


export interface TabBarContextProps {
    isTabBarVisible: boolean, 
    setTabBarVisible: (value: boolean) => void
}

// crear contexto
export const TabBarContext = createContext({} as TabBarContextProps);

export const useTabBarVisibility = () => useContext(TabBarContext);

export const TabBarProvider = ({ children }: any) => {
    const [isTabBarVisible, setTabBarVisible] = useState(true);

    return (
        <TabBarContext.Provider 
            value={{ 
                isTabBarVisible, 
                setTabBarVisible 
            }}
        >
            {children}
        </TabBarContext.Provider>
    );
}