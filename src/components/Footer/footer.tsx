import Link from "next/link";
import { BsFillSendFill } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="mt-auto h-16 border-t border-gray-300">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 mb-5 h-full">
                <div className="flex flex-wrap md:flex-nowrap sm:gap-4 md:gap-16 items-center justify-between h-full">
                    <p className=" w-full sm:w-auto text-sm md:text-base text-center sm:text-left">Copyright  © 2025 The Recipes </p>
                    <div className="flex items-center">

                        {/* Message Button */}
                        <a
                            href="mailto:RaniaZarka@hotmail.com?subject=Message from The Recipies&body=Hello,"
                            className="flex items-center hover:font-semibold"
                        >
                            <BsFillSendFill />
                            <p className="ml-2 text-sm md:text-base ">Message</p>
                        </a>
                    </div>
                    <div className="flex items-center">

                        {/* About Us Link */}
                        <Link href="/about" className="flex items-center hover:font-semibold">
                            <p className="ml-2 text-sm md:text-base ">About us</p>
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
