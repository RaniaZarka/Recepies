"use client";
import ThemeContext from "@/context/themeContext";
import Link from "next/link";
import Image from "next/image";
import logoRecipe from "@/Images/logoRecipe.png";
import { useState, useContext } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi"; // Importing icons for hamburger and close
import { FaSearch } from "react-icons/fa";

const Header = () => {
    const { darkTheme, setDarkTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="py-2 px-4 container mx-auto text-xl flex flex-wrap items-center justify-between ">
            <div className="flex items-center  md:w-auto " >
                <Link href="/" className="font-black text-tertiary-dark ml-7">
                    <Image
                        src={logoRecipe}
                        alt="Recipes"
                        width={150}
                        height={150}
                        className="w-[75px] h-[75px] sm:w-[150px] sm:h-[150px]"
                    />

                </Link>
            </div>

            {/* Hamburger Icon and Theme Toggle (Visible on Small Screens) */}
            <div className="md:hidden flex items-center ml-auto space-x-4">
                <div onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </div>
                <div onClick={() => setDarkTheme(!darkTheme)}>
                    {darkTheme ? <MdOutlineLightMode size={18} /> : <MdDarkMode size={18} />}
                </div>
            </div>

            {/* Menu Items with Spacing for Small Screens */}
            <ul className={`md:flex items-center justify-between w-full md:w-auto ${menuOpen ? "block" : "hidden"} mt-4 md:mt-0 space-y-4 md:space-y-0`}>
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/">Home</Link>
                </li>
                <li className="hover:-translate-y-2 duration-500 transition-all md:ml-5">
                    <Link href="/recepies">Recipes</Link>
                </li>

                {/* Search Box */}
                <li className="flex items-center relative md:ml-5">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded-lg px-4 py-1 w-full md:w-48 focus:outline-none"
                    />
                    <span className="absolute right-3 text-gray-500"><FaSearch /></span>
                </li>

                {/* Theme Toggle (Visible on Large Screens) */}
                <li className="hidden md:flex items-center ml-2">
                    {darkTheme ? (
                        <MdOutlineLightMode
                            className="cursor-pointer"
                            onClick={() => {
                                setDarkTheme(false);
                                localStorage.removeItem("recipe-theme");
                            }}
                        />
                    ) : (
                        <MdDarkMode
                            className="cursor-pointer"
                            onClick={() => {
                                setDarkTheme(true);
                                localStorage.setItem("recipe-theme", "true");
                            }}
                        />
                    )}
                </li>
            </ul>
        </header>
    );
};

export default Header;
