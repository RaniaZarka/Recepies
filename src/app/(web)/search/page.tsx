import { groq } from "next-sanity";
import client from "@/sanity/sanityClient";
import { urlFor } from "@/sanity/imageBuilder";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
    _id: string;
    name: string;
    slug: { current: string };
    image: any;
}

export default async function SearchPage({ searchParams }: { searchParams: { term?: string } }) {
    const term = searchParams.term || "";

    const query = groq`
    *[
      _type == "recipe" &&
      (
        name match $term ||
        ingredient[].ingredient->name match $term ||
        tag[]->name match $term ||
        category->name match $term ||
        cuisine->name match $term
      )
    ] {
      _id,
      name,
      slug,
      image
    }
  `;

    const recipes: Recipe[] = await client.fetch(query, { term: `*${term}*` });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Search results for "{term}"</h1>
            {recipes.length === 0 ? (
                <p>No matching recipes found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <Link href={`/recipes/${recipe.slug.current}`} key={recipe._id}>
                            <div className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform">
                                <div className="relative w-full h-48">
                                    <Image
                                        src={urlFor(recipe.image).width(600).height(400).url()}
                                        alt={recipe.name}
                                        fill
                                        style={{ objectFit: "cover" }}
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
    );
}
