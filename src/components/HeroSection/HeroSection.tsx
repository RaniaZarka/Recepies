import Link from "next/link";
import Image from "next/image";
import food from "@/Images/food.jpg";

const categories = [
    { title: "Breakfast", image: "/Images/breakfast.jpg" },
    { title: "Salads", image: "/Images/salads.jpg" },
    { title: "Main Course", image: "/Images/maincourse.jpg" },
    { title: "Desserts", image: "/Images/desserts.jpg" },
    { title: "Appetizers", image: "/Images/appetizers.jpg" },
    { title: "Bread", image: "/Images/bread.jpg" },
    { title: "Beverages", image: "/Images/beverages.jpg" },
    { title: "Soups", image: "/Images/soups.jpg" },
];

export default function HeroSection() {
    const slugify = (str: string) =>
        str.toLowerCase().replace(/\s+/g, "-"); // e.g., "Main Course" → "main-course"

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center mb-8">
                <h1 className="font-heading mb-4">Discover Recipes You&apos;ll Love</h1>
                <p className="text-lg text-gray-600">
                    Browse through our curated collection of recipes to inspire your next meal.
                </p>
            </section>

            {/* Main Content */}
            <div className="flex flex-wrap -mx-6">
                {/* Recipe Categories Grid */}
                <div className="w-full lg:w-2/3 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {categories.map((category, index) => (
                            <Link href={`/explore/${slugify(category.title)}`} key={index}>
                                <div className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform">
                                    <div className="relative aspect-[16/9]">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            fill
                                            style={{ objectFit: "cover" }}
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
                <aside className="w-full lg:w-1/4 px-4 mt-8 lg:mt-0 lg:ml-10">
                    <h2 className="font-sub-heading mb-4">Latest Recipes</h2>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-white shadow-md rounded-md p-4 flex items-center">
                                <Image src={food} alt={`Latest Recipe ${index + 1}`} width={100} height={100} />
                                <div className="ml-2">
                                    <h3 className="text-md font-semibold">Latest Recipe {index + 1}</h3>
                                    <p className="text-sm text-gray-600">Quick description here.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
