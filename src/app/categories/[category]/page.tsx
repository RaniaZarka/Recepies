// app/categories/[category]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Simulate fetching recipes for a category. Replace this with your data fetching logic.
async function getCategoryRecipes(category: string) {

    const recipesData: any = {
        breakfast: [
            { id: 1, title: "Avocado Toast", image: "/Images/avocado-toast.jpg" },
            { id: 2, title: "Pancakes", image: "/Images/breakfast.jpg" },
        ],
        salads: [
            { id: 3, title: "Caesar Salad", image: "/Images/breakfast.jpg" },
            { id: 4, title: "Greek Salad", image: "/Images/breakfast.jpg" },
        ],
        bread: [{ id: 5, title: "Baguette", image: "/Images/bread.jpg" },
        { id: 6, title: "Pain au lait", image: "/Images/bread.jpg" }
        ],
        desserts: [{ id: 7, title: "Pain perdu", image: "/Images/desserts.jpg" },
        { id: 8, title: "Cake", image: "/Images/desserts.jpg" }
        ],
        maincourse: [{ id: 9, title: "Steak", image: "/Images/maincourse.jpg" },
        { id: 10, title: "Chicken", image: "/Images/maincourse.jpg" }
        ],
        appetizers: [{ id: 11, title: "Tomato", image: "/Images/appetizers.jpg" },
        { id: 12, title: "Mozarella", image: "/Images/appetizers.jpg" }
        ],
        beverages: [{ id: 13, title: "Juice", image: "/Images/beverages.jpg" },
        { id: 14, title: "Jallab", image: "/Images/beverages.jpg" }
        ],
        soups: [{ id: 15, title: "Tomato Soup", image: "/Images/soups.jpg" },
        { id: 16, title: "Pumpkin Soup", image: "/Images/soups.jpg" }
        ]

        // Add other categories and their recipes here
    };

    return recipesData[category] || null;
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    const recipes = await getCategoryRecipes(category);

    if (!recipes) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Recipes for {category}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe: any) => (
                    <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
                        <div className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform">
                            <div className="relative aspect-w-16 aspect-h-9">
                                <Image
                                    src={recipe.image}
                                    alt={recipe.title}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
