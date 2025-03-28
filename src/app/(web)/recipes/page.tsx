import { groq } from 'next-sanity';
import client from '@/sanity/sanityClient';
import { urlFor } from '@/sanity/imageBuilder';
import Image from 'next/image';
import Link from 'next/link';

interface Recipe {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image: any;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: string;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  // Convert slug back to category title
  const categoryTitle = params.category;

  const query = groq`
  *[_type == "recipe" && category->slug.current == $category]{
    title,
    slug,
    image,
    
  }
`;

  const recipes: Recipe[] = await client.fetch(query, { category: categoryTitle });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{categoryTitle} Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link href={`/recipes/${recipe.slug.current}`} key={recipe._id}>
              <div className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform">
                <div className="relative w-full h-48">
                  <Image
                    src={urlFor(recipe.image).width(600).height(400).url()}
                    alt={recipe.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{recipe.title}</h2>
                  <p className="text-gray-600 text-sm">
                    Prep: {recipe.prepTime} | Cook: {recipe.cookTime}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Servings: {recipe.servings} | Difficulty: {recipe.difficulty}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
