import { groq } from 'next-sanity';
import client from '@/sanity/sanityClient';
import { urlFor } from '@/sanity/imageBuilder';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumps/breadcrumps';

interface Recipe {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    image: any;

}

interface ExplorePageProps {
    params: Promise<{
        filter: string;
    }>;
}

// ✅ Optional: dynamic title for SEO
export async function generateMetadata(
    props: {
        params: Promise<{ filter: string }>;

    }
): Promise<Metadata> {
    const params = await props.params;
    return {
        title: `${params.filter} Recipes`,
    };
}


export default async function ExplorePage({ params }: ExplorePageProps) {
    const filter = (await params).filter;

    const query = groq`
    *[
      _type == "recipe" &&
      (
        category->slug.current == lower($filter) ||
        cuisine->slug.current == lower($filter) ||
        $filter in tag[]->slug.current
      )
    ] {
      _id,
      name,
      slug,
      image,
      
    }
  `;

    const recipes: Recipe[] = await client.fetch(query, { filter });

    function formatTitle(slug: string) {
        return slug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <h1 className="text-3xl font-bold mb-6">
                {formatTitle(filter)} Recipes
            </h1>

            {recipes.length === 0 ? (
                <p>No recipes found for this filter.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <Link href={`/explore/${filter}/${recipe.slug.current}`} key={recipe._id}>
                            <div className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform">
                                <div className="relative  w-full h-48">
                                    <Image className='object-cover'
                                        src={
                                            recipe.image
                                                ? urlFor(recipe.image).width(600).height(400).url()
                                                : '/Images/fallback.jpg'
                                        }
                                        alt={recipe.name || 'Recipe image'}
                                        fill

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
