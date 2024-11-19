import Image from "next/image";
import food from "@/Images/food.jpg";

const Home = () => {
  return (

    <> <div className="flex items-center justify-center min-h-screen">
      <Image src={food} alt="Image" width={500} height={500} />
    </div>
    </>
  )
};

export default Home
