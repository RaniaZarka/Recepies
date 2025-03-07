import Link from "next/link";
import Image from "next/image";
import food from "@/Images/food.jpg";

const HeroSection = () => {

    const categories = [
        { title: "Breakfast", image: "/Images/breakfast.jpg", link: "/categories/breakfast" },
        { title: "Salads", image: "/Images/salads.jpg", link: "/categories/salads" },
        { title: "Main Course", image: "/Images/maincourse.jpg", link: "/categories/maincourse" },
        { title: "Desserts", image: "/Images/desserts.jpg", link: "/categories/desserts" },
        { title: "Appetizers", image: "/Images/appetizers.jpg", link: "/categories/appetizers" },
        { title: "Bread", image: "/Images/bread.jpg", link: "/categories/bread" },
        { title: "Beverages", image: "/Images/beverages.jpg", link: "/categories/beverages" },
        { title: "Soups", image: "/Images/soups.jpg", link: "/categories/soups" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center mb-8">
                <h1 className="font-heading mb-4">
                    Discover Recipes You&apos;ll Love
                </h1>
                <p className="text-lg text-gray-600">
                    Browse through our curated collection of recipes to inspire your next meal.
                </p>
            </section>

            {/* Main Content */}
            <div className="flex flex-wrap -mx-4">
                {/* Recipe Grid */}
                <div className="w-full lg:w-2/3 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {categories.map((category, index) => (
                            <Link href={category.link} key={index} passHref>
                                <div
                                    className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
                                >

                                    {/* Aspect Ratio Wrapper */}
                                    <div className="relative aspect-w-16 aspect-h-9">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>

                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-semibold">{category.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Latest Recipes Sidebar */}
                <aside className="w-full lg:w-1/4 px-4  mt-8 lg:mt-0 lg:ml-32 ">
                    <h2 className="font-sub-heading mb-4">Latest Recipes</h2>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-md p-4 flex items-center"
                            >
                                <Image
                                    src={food} alt="Image" width={100} height={100}

                                />
                                <div className="ml-2">
                                    <h3 className="text-md font-semibold">
                                        Latest Recipe {index + 1}
                                    </h3>
                                    <p className="text-sm text-gray-600">Quick description here.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};






export default HeroSection;