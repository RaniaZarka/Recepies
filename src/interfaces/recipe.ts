export interface Recipe {
    _id: string;
    name: string;
    slug: { current: string };
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    method: any;
    image: any;
    tag: {
      _id: string;
      name: string;
    }[];
    cuisine: string;
    
    ingredient: {
      quantity: string;
      unit: {
        abbreviation: string;
      };
      ingredient: {
        name: string;
      };
    }[];
  }
  