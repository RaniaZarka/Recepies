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
import { useRouter } from "next/navigation";

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
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm(""); // optional: clear after search
        setMenuOpen(false); // optional: close menu on mobile
    };

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const query = groq`{
          "categories": *[_type == "category"]{ _id, name, slug },
          "cuisines": *[_type == "cuisine"]{ _id, name, slug },
          "tags": *[_type == "tag"]{ _id, name, slug }
        }`;
                const data = await client.fetch(query);
                setCategories(data?.categories || []);
                setCuisines(data?.cuisines || []);
                setTags(data?.tags || []);
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

            {/* Mobile icons */}
            <div className="md:hidden flex items-center ml-auto space-x-4">
                <div onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </div>
                <div onClick={() => setDarkTheme(!darkTheme)}>
                    {darkTheme ? <MdOutlineLightMode size={18} /> : <MdDarkMode size={18} />}
                </div>
            </div>

            {/* Nav Menu */}
            <ul className={`md:flex items-center justify-between w-full md:w-auto ${menuOpen ? "block" : "hidden"} mt-4 md:mt-0 space-y-4 md:space-y-0`}>
                <li><Link href="/">Home</Link></li>

                <li className="md:ml-5">
                    <button onClick={() => setIsModalOpen(true)} className="nav-link">Recipes</button>
                </li>

                {/* Search Form */}
                <li className="flex items-center relative md:ml-5">
                    <form onSubmit={handleSearch} className="flex items-center relative w-full md:w-48">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border rounded-lg px-4 py-1 w-full focus:outline-none"
                        />
                        <button type="submit" className="absolute right-3 text-gray-500">
                            <FaSearch />
                        </button>
                    </form>
                </li>

                {/* Theme Toggle */}
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

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content text-sm md:text-base" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)} className="modal-close">✖</button>
                        <div className="recipe-grid">
                            {/* Categories */}
                            <div>
                                <p className="font-bold-medium mb-2">Category</p>
                                <ul className="space-y-1">
                                    {categories.length > 0 ? (
                                        categories.map((item: any) => (
                                            <li key={item._id}>
                                                <Link
                                                    href={`/explore/${item.slug.current}`}
                                                    className="nav-link whitespace-nowrap"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
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
                                <p className="font-bold-medium mb-2">Cuisine</p>
                                <ul className="space-y-1">
                                    {cuisines.length > 0 ? (
                                        cuisines.map((item: any) => (
                                            <li key={item._id}>
                                                <Link
                                                    href={`/explore/${item.slug.current}`}
                                                    className="nav-link whitespace-nowrap"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
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
                                <p className="font-bold-medium mb-2">Themes</p>
                                <ul className="space-y-1">
                                    {tags.length > 0 ? (
                                        tags.map((item: any) => (
                                            <li key={item._id}>
                                                <Link
                                                    href={`/explore/${item.slug.current}`}
                                                    className="nav-link whitespace-nowrap"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
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
            )}
        </header>
    );
};

export default Header;
