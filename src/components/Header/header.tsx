"use client";

import { useState, useEffect, useContext } from "react";
import ThemeContext from "@/context/themeContext";
import Link from "next/link";
import Image from "next/image";
import logoRecipe from "@/Images/logoRecipe.png";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import client from "@/sanity/sanityClient";
import { groq } from "next-sanity";
// 👇 Makes client accessible in browser console (for testing only)
if (typeof window !== "undefined") {
    // @ts-ignore
    window.client = client;
}


const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { darkTheme, setDarkTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const query = groq`{
              "categories": *[_type == "category"]{ _id, name, slug },
              "cuisines": *[_type == "cuisine"]{ _id, name, slug },
              "tags": *[_type == "tag"]{ _id, name, slug }
            }`;

                const data = await client.fetch(query);
                console.log("🔥 Sanity filter data:", data);

                setCategories(data?.categories || []);
                setCuisines(data?.cuisines || []);
                setTags(data?.tags || []);
                console.log("Categories from Sanity:", data.categories);

            } catch (error) {
                console.error("❌ Error fetching filters from Sanity:", error);
            }
        };

        fetchFilters();
    }, []);


    return (
        <header className="py-2 px-4 container mx-auto text-xl flex flex-wrap items-center justify-between">
            <div className="flex items-center md:w-auto">
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

            <div className="md:hidden flex items-center ml-auto space-x-4">
                <div onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </div>
                <div onClick={() => setDarkTheme(!darkTheme)}>
                    {darkTheme ? <MdOutlineLightMode size={18} /> : <MdDarkMode size={18} />}
                </div>
            </div>

            <ul className={`md:flex items-center justify-between w-full md:w-auto ${menuOpen ? "block" : "hidden"} mt-4 md:mt-0 space-y-4 md:space-y-0`}>
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/">Home</Link>
                </li>
                <li className="hover:-translate-y-2 duration-500 transition-all md:ml-5">
                    <button onClick={() => setIsModalOpen(true)} className="nav-link">
                        Recipes
                    </button>
                </li>
                <li className="flex items-center relative md:ml-5">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded-lg px-4 py-1 w-full md:w-48 focus:outline-none"
                    />
                    <span className="absolute right-3 text-gray-500">
                        <FaSearch />
                    </span>
                </li>
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

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)} className="modal-close">✖</button>
                        <div className="relative">
                            <div className="recipe-grid">
                                {/* Category */}
                                <div>
                                    <p className="font-bold-medium mb-2">Category</p>
                                    <ul className="space-y-1">
                                        {categories.length > 0 ? (
                                            categories.map((item: any) => (
                                                <li key={item._id}>
                                                    <Link href={`/explore/${item.slug.current}`} className="nav-link"
                                                        onClick={() => setIsModalOpen(false)}  >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-400 text-sm">No categories found</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Cuisine */}
                                <div>
                                    <h3 className="font-bold-medium mb-2">Cuisine</h3>
                                    <ul className="space-y-1">
                                        {cuisines.length > 0 ? (
                                            cuisines.map((item: any) => (
                                                <li key={item._id}>
                                                    <Link href={`/explore/${item.slug.current}`} className="nav-link"
                                                        onClick={() => setIsModalOpen(false)}  >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-400 text-sm">No cuisines found</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Tags */}
                                <div>
                                    <h3 className="font-bold-medium mb-2">Themes</h3>
                                    <ul className="space-y-1">
                                        {tags.length > 0 ? (
                                            tags.map((item: any) => (
                                                <li key={item._id}>
                                                    <Link href={`/explore/${item.slug.current}`} className="nav-link"
                                                        onClick={() => setIsModalOpen(false)}  >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-400 text-sm">No tags found</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
