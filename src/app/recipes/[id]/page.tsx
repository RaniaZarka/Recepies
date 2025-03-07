// app/recipes/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

// Simulate fetching recipe details by ID. Replace this with actual data fetching logic.
async function getRecipeData(id: string) {
    const recipesData = {
        "1": {
            title: "Avocado Toast",
            keywords: ["Main dish", "Vegan", "Vegetarian", "American"],
            image: "/images/avocado-toast.jpg",
            prepTime: "10 mins",
            cookTime: "5 mins",
            servings: "2 servings",
            difficulty: "Easy",
            method: ["Toast the bread", "Mash avocado", "Spread avocado on toast."],
            ingredients: ["2 slices of bread", "1 ripe avocado", "Salt", "Pepper"],
        },
        "2": {
            title: "Pancakes",
            keywords: ["Main dish", "Vegan", "American"],
            image: "/images/pancakes.jpg",
            prepTime: "5 mins",
            cookTime: "10 mins",
            servings: "4 servings",
            difficulty: "Medium",
            method: [
                "Mix ingredients.",
                "Cook pancakes on a griddle.",
                "Serve with syrup.",
            ],
            ingredients: ["2 cups flour", "1 cup almond milk", "2 tbsp sugar", "1 tsp baking powder"],
        },
        // Add more recipes here
    };

    return recipesData[id] || null;
}

export default async function RecipePage({ params }: { params: { id: string } }) {
    const { id } = params;

    const recipe = await getRecipeData(id);

    if (!recipe) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Section: Recipe Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
                    <div className="flex flex-wrap mb-4">
                        {recipe.keywords.map((keyword: any, index: any) => (
                            <span key={index} className="text-sm bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2">
                                {keyword}
                            </span>
                        ))}
                    </div>
                    <div className="relative w-full h-80 mb-8">
                        <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" />
                    </div>
                    <div className="flex space-x-8 text-gray-600 mb-8">
                        <div><strong>Prep Time:</strong> {recipe.prepTime}</div>
                        <div><strong>Cook Time:</strong> {recipe.cookTime}</div>
                        <div><strong>Servings:</strong> {recipe.servings}</div>
                        <div><strong>Difficulty:</strong> {recipe.difficulty}</div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                    <ul className="list-disc pl-5">
                        {recipe.method.map((step: any, index: any) => (
                            <li key={index} className="mb-2"> {step}</li>
                        ))}
                    </ul>
                </div>

                {/* Right Section: Ingredients */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="list-disc pl-5">
                        {recipe.ingredients.map((ingredient: any, index: any) => (
                            <li key={index} className="mb-2">{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
