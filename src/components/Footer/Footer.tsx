import Link from "next/link"
import { BiMessageDetail } from "react-icons/bi"
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs"

const Footer = () => {
    return (
        <footer className="mt-16">
            <div className="container mx-aut px-4 mb-5">
                <Link href="/" className="font-black text-tertiary-dark">
                    Recepies
                </Link>
                <h4 className="font-semibold text-[15px] py-6">Contact </h4>
                <div className="flex flex-wrap gap-16 items-center justify-between">
                    <p> Address</p>
                    <div className=" flex items-center ">
                        <BsFillSendFill />
                        <p className="ml-2"> Message </p>
                    </div>
                    <div className=" flex items-center ">
                        <BsTelephoneOutbound />
                        <p className="ml-2"> Phone number </p>
                    </div>
                    <div className=" flex items-center ">
                        <BiMessageDetail />
                        <p className="ml-2"> Info </p>
                    </div>
                </div>
            </div>


        </footer>
    )
}

export default Footer