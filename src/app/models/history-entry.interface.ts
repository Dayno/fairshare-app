export interface HistoryEntry {
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

    // checkout
    status_id: number;
    food_id: string;
    point_id: string;
    created_at: string;
}
