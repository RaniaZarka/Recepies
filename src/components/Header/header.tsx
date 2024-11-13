"use client"
import ThemeContext from "@/context/themeContext";
import Link from "next/link"
import { useContext } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";


const Header = () => {

    const { darkTheme, setDarkTheme } = useContext(ThemeContext)
    return (
        <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between" >
            <div className="flex items-center w-full md:2/3">
                <Link href="/" className="font-black text-tertiary-dark" >Recepies  </Link>
                <ul className="flex.items-center ml-5">

                    <li className=" flex items-center ml-2">
                        {darkTheme ? (
                            <MdOutlineLightMode className='cursor-pointer'
                                onClick={() => {
                                    setDarkTheme(false);
                                    localStorage.removeItem("recipe-theme")
                                }} />
                        ) : (
                            <MdDarkMode className='cursor-pointer'
                                onClick={() => {
                                    setDarkTheme(true);
                                    localStorage.setItem("recipe-theme", "true")
                                }} />
                        )}

                    </li>
                </ul>
            </div>
            <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/"> Home</Link>
                </li>
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/recepies"> Recepies </Link>
                </li>
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/contact">Contact </Link>
                </li>
            </ul>

        </header>
    )
}

export default Header;