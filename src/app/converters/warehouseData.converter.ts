import { FoodEntry } from '../models/food-entry.interface';
import { GenericObject } from '../models/generic-object';

export class WarehouseDataConverter {
    fromRestArray(obj: any[]): FoodEntry[] {
        return obj.map(item => this.fromRest(item));
    }

    fromRest(obj: GenericObject): FoodEntry {
        return {
            id: obj['id'],
            title: obj['title'],
            cool: obj['cool'],
            quantity: obj['quantity'],
            shelf_life: obj['shelf_life'],
            category_id: obj['category_id'],
            origin_category_id: obj['origin_category_id'],
            origin: obj['origin'],
            allergens: obj['allergens'],
            comment: obj['comment'],
            first_name: obj['first_name'],
            last_name: obj['last_name'],
            email: obj['email'],
            tel: obj['tel'],
            checkin_id: obj['checkin_id'],
            food_id: obj['food_id'],
            point_id: obj['point_id'],
            created_at: obj['created_at'],
        };
    }

    toRest(obj: FoodEntry): GenericObject {
        const restObj: GenericObject = {
            id: obj.id,
            title: obj.title,
            cool: obj.cool,
            quantity: obj.quantity,
            shelf_life: obj.shelf_life,
            category_id: obj.category_id,
            origin_category_id: obj.origin_category_id,
            origin: obj.origin,
            allergens: obj.allergens,
            comment: obj.comment,
            first_name: obj.first_name,
            last_name: obj.last_name,
            email: obj.email,
            tel: obj.tel,
            checkin_id: obj.checkin_id,
            food_id: obj.food_id,
            point_id: obj.point_id,
            created_at: obj.created_at,
        };
        // remove undefined properties
        Object.keys(restObj).forEach(key => restObj[key] === undefined && delete restObj[key]);
        return restObj;
    }
}