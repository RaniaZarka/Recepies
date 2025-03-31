import { groq } from 'next-sanity';
import client from '@/sanity/sanityClient';
import { urlFor } from '@/sanity/imageBuilder';
import Image from 'next/image';

interface Recipe {
    name: string;
    slug: {
        current: string;
    };
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    method: any; // You can replace any[] with PortableTextBlock[] if you're using Portable Text
    image: any,
    tag: any;
    cuisine: string;

    ingredient: any,
}

export default async function RecipePage({ params }: { params: { recipe: string } }) {

    const recipeTitle = params.recipe;
    const query = groq`
        * [_type == "recipe" && slug.current == lower($recipe)][0]{
            _id,
            name,
            slug,
            prepTime,
            cookTime,
            servings,
            difficulty,
            method,
            image,
            tag,
            "cuisine": cuisine-> name,
                ingredient;
}
`;

    const recipe = await client.fetch(query, { recipe: recipeTitle });

    if (!recipe) return <div className="p-8">Recipe not found.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold mb-2">{recipeTitle}</h1>

                    <div className="mb-2 text-sm text-gray-600 space-x-2">
                        {recipe.tag?.map((tag: any) => (
                            <span key={tag._id} className="inline-block bg-gray-200 px-2 py-1 rounded-full text-xs">{tag.name}</span>
                        ))}
                        {recipe.cuisine?.map((cuisine: any) => (
                            <span key={cuisine._id} className="inline-block bg-green-100 px-2 py-1 rounded-full text-xs">{cuisine.name}</span>
                        ))}
                    </div>

                    {recipe.image && (
                        <div className="relative w-full h-96 mb-4">
                            <Image
                                src={urlFor(recipe.image).width(800).height(500).url()}
                                alt={recipe.name}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <div className="mb-6 text-gray-700 space-y-1">
                        <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
                        <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>
                        <p><strong>Servings:</strong> {recipe.servings}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-800">
                        {recipe.ingredient?.map((ing: any, i: number) => (
                            <li key={i}>
                                {ing.quantity} {ing.unit} {ing.item?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Method</h2>
                <div className="prose max-w-none">
                    {recipe.method?.map((block: any, index: number) => (
                        <p key={index}>{block.children?.[0]?.text}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}