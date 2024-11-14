import Link from "next/link";
import { BiMessageDetail } from "react-icons/bi";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="mt-16 bg-tertiary-light h-16">
            <div className="container mx-auto px-4 mb-5 h-full">
                <div className="flex flex-wrap md:flex-nowrap sm:gap-4 md:gap-16 items-center justify-between h-full">
                    <p className="text-sm md:text-base">Address</p>
                    <div className="flex items-center">
                        <BsFillSendFill />
                        <p className="ml-2 text-sm md:text-base">Message</p>
                    </div>
                    <div className="flex items-center">
                        <BsTelephoneOutbound />
                        <p className="ml-2 text-sm md:text-base">Phone number</p>
                    </div>
                    <div className="flex items-center">
                        <BiMessageDetail />
                        <p className="ml-2 text-sm md:text-base">Info</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
