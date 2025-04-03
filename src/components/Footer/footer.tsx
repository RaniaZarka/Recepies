import Link from "next/link";
import { BsFillSendFill } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="mt-auto h-16 border-t border-gray-300">
            <div className="container mx-auto px-4 mb-5 h-full">
                <div className="flex flex-wrap md:flex-nowrap sm:gap-4 md:gap-16 items-center justify-between h-full">
                    <p className="text-sm md:text-base">Copyright  © 2025 The Recipes </p>
                    <div className="flex items-center">

                        {/* Message Button */}
                        <a
                            href="mailto:RaniaZarka@hotmail.com?subject=Message from The Recipies&body=Hello,"
                            className="flex items-center hover:-translate-y-2 duration-500 transition-all"
                        >
                            <BsFillSendFill />
                            <p className="ml-2 text-sm md:text-base">Message</p>
                        </a>
                    </div>
                    <div className="flex items-center">

                        {/* About Us Link */}
                        <Link href="/about" className="flex items-center hover:-translate-y-2 duration-500 transition-all">
                            <p className="ml-2 text-sm md:text-base">About us</p>
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
