"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import client from "@/sanity/sanityClient";
import { urlFor } from "@/sanity/imageBuilder";

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

interface Recipe {
    _id: string;
    name: string;
    slug: { current: string };
    image: any;
}

export default function HeroSection() {
    const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);

    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            const query = `*[_type == "recipe"] | order(_createdAt desc)[0...4] {
        _id,
        name,
        slug,
        image
      }`;

            try {
                const data: Recipe[] = await client.fetch(query);
                setLatestRecipes(data);
            } catch (error) {
                console.error("Error fetching latest recipes:", error);
            }
        };

        fetchLatestRecipes();
    }, []);


    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center mb-8">
                <h1 className="font-heading mb-4">Discover Recipes You&apos;ll Love</h1>
                <p className="text-lg text-gray-600">
                    Browse through our curated collection of recipes to inspire your next meal.
                </p>
            </section>

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
                    <h2 className="font-sub-heading mb-4 text-xl font-bold">Latest Recipes</h2>
                    <div className="space-y-6">
                        {latestRecipes.map((recipe) => (
                            <Link
                                href={`/recipes/${recipe.slug.current}`}
                                key={recipe._id}
                                className="block"
                            >
                                <div className="bg-white shadow-md rounded-md p-2 flex items-center gap-3 hover:shadow-lg transition">
                                    <Image
                                        src={
                                            recipe.image
                                                ? urlFor(recipe.image).width(80).height(80).url()
                                                : "/Images/fallback.jpg"
                                        }
                                        alt={recipe.name}
                                        width={80}
                                        height={80}
                                        className="rounded object-cover"
                                    />
                                    <div className="text-sm font-semibold">{recipe.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </aside>

            </div>
        </div>
    );
}
