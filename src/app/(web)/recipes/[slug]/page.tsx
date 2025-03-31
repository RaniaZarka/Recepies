import { groq } from 'next-sanity';
import client from '@/sanity/sanityClient';
import { urlFor } from '@/sanity/imageBuilder';
import Image from 'next/image';

interface Recipe {
    _id: string;
    name: string;
    slug: { current: string };
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    method: any;
    image: any;
    tag: { _id: string; name: string }[];
    cuisine: string;
    ingredient: {
        quantity: string;
        ingredient: { name: string };
    }[];
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
    const query = groq`
    *[_type == "recipe" && slug.current == lower($slug)][0]{
      _id,
      name,
      slug,
      prepTime,
      cookTime,
      servings,
      difficulty,
      method,
      image,
      tag[]->{_id, name},
      "cuisine": cuisine->name,
      ingredient[] {
        quantity,
        ingredient-> {
          name
        }
      }
    }
  `;

    const recipe: Recipe = await client.fetch(query, { slug: params.slug });
    if (!recipe) return <div className="p-8">Recipe not found.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>

            {/* Tags & Cuisine */}
            <div className="mb-6 text-sm text-gray-600 space-x-2">
                {recipe.tag?.map((tag) => (
                    <span
                        key={tag._id}
                        className="inline-block bg-gray-200 px-2 py-1 rounded-full text-xs"
                    >
                        {tag.name}
                    </span>
                ))}
                {recipe.cuisine && (
                    <span className="inline-block bg-green-100 px-2 py-1 rounded-full text-xs">
                        {recipe.cuisine}
                    </span>
                )}
            </div>

            {/* Image & Ingredients side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-8">
                {/* Image */}
                {recipe.image && (
                    <div className="relative w-full h-96 rounded overflow-hidden">
                        <Image
                            src={urlFor(recipe.image).width(800).height(500).url()}
                            alt={recipe.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                        />
                    </div>
                )}

                {/* Ingredients */}
                <div className='ml-0 lg:ml-20'>
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-800">
                        {recipe.ingredient?.map((ing, i) => (
                            <li key={i}>
                                {ing.quantity} {ing.ingredient?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Time & Difficulty */}
            <div className="mb-6 text-gray-700">
                <div className="flex flex-wrap gap-4 mb-1">
                    <p>
                        <strong>Prep Time:</strong> {recipe.prepTime} min
                    </p>
                    <p>
                        <strong>Cook Time:</strong> {recipe.cookTime} min
                    </p>
                    <p>
                        <strong>Servings:</strong> {recipe.servings}
                    </p>
                </div>
                <p>
                    <strong>Difficulty:</strong> {recipe.difficulty}
                </p>
            </div>

            {/* Method */}
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
