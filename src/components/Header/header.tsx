import Link from "next/link"
import { FaUserCircle } from "react-icons/fa";


const header = () => {
    return (
        <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between" >

            <div className="flex items-center w-full md:2/3">
                <Link href="/" className="font-black text-[#0568f2]" >Recepies  </Link>

            </div>

            <ul className="flex.items-center ml-5">
                <Link href="/auth"> <FaUserCircle className="cursor-pointer" /> </Link>
            </ul>
        </header>
    )
}

export default header;