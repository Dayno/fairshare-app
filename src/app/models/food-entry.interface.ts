export interface FoodEntry {
    id: string;
    title: string;
    cool: boolean;
    quantity: number;
    shelf_life: number;
    category_id: number;
    origin_category_id: number;
    origin: string;
    allergens: string;
    comment: string;

    // foodsaver
    first_name?: string;
    last_name?: string;
    email?: string;
    tel?: string;

    // warehouse
    checkin_id?: string;
    food_id?: string;
    point_id?: string;
    created_at?: string;

    // checkout
    status_id?: number;
}
