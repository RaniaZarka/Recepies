'use client';

import { useEffect, useState, createContext, Children } from "react";

import ThemeContext from "@/context/themeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const themeFromStorage: boolean =
        typeof localStorage !== "undefined" && localStorage.getItem("recipe.theme")
            ? JSON.parse(localStorage.getItem("recipe-theme")!) : false;

    const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);

    const [renderComponent, setRenderComponent] = useState(false);
    useEffect(() => {
        setRenderComponent(true);
    }, []);
    if (!renderComponent) return <></>;
    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            <div className={`${darkTheme ? 'dark' : ''} min-h-screen`}>
                <div className='dark:text-white dark:bg-black text-[#1E1E1E]'>
                    {children}
                </div>
            </div>
        </ThemeContext.Provider>)
}
export default ThemeProvider;