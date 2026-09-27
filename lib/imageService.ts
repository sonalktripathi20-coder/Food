// ImageService abstraction for FoodConnect Bharat

export interface FoodImageItem {
    id: string;
    category: 'Thali' | 'Packed' | 'Bhandara' | 'Jain' | 'Kitchen' | 'Event';
    title: string;
    url: string;
}

export const DEMO_FOOD_IMAGES: FoodImageItem[] = [
    {
        id: 'img_thali',
        category: 'Thali',
        title: 'North Indian Thali',
        url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'img_jain',
        category: 'Jain',
        title: 'Pure Jain Dal & Khichdi',
        url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'img_packed',
        category: 'Packed',
        title: 'Packed Meal Box',
        url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'img_bhandara',
        category: 'Bhandara',
        title: 'Temple Bhandara Prasad',
        url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80'
    }
];

export class ImageService {
    static getFallbackImage(category: string): string {
        const item = DEMO_FOOD_IMAGES.find(img => img.category.toLowerCase() === category.toLowerCase());
        return item ? item.url : DEMO_FOOD_IMAGES[0].url;
    }
}
