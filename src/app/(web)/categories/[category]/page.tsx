
import { useState, useEffect } from 'react';
import { groq } from 'next-sanity';
import client from '@/sanity/sanityClient';
import { urlFor } from '@/sanity/imageBuilder';
import Image from 'next/image';
import Link from 'next/link';

interface Recipe {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    image: any;

}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function CategoryPage({ params }: { params: { category: string } }) {
    // Convert slug back to category title
    const categoryTitle = params.category;

    const query = groq`
    *[_type == "recipe" && category->slug.current ==lower($category)]{
    _id,
      name,
      slug,
      image,
      
    }
  `;

    const recipes: Recipe[] = await client.fetch(query, { category: categoryTitle });

    return (
        <div className="container mx-auto px-4 py-8">
            <div>
                <h1 className="text-3xl font-bold mb-6 ">{categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)} Recipes</h1>
            </div>
            <div>
                {recipes.length === 0 ? (
                    <p>No recipes found for this category.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <Link href={`/recipes/${recipe.slug.current}`} key={recipe._id}>
                                <div className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform">
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={
                                                recipe.image
                                                    ? urlFor(recipe.image).width(600).height(400).url()
                                                    : "/Images/fallback.jpg" // Use a local placeholder image
                                            }
                                            alt={recipe.name || 'Recipe image'} // fallback text
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold">{recipe.name}</h2>

                                    </div>
                                </div>

                            </Link>
                        ))}
                    </div>

                )}
            </div>
        </div>
    );
}
