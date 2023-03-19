export enum ShelfLifeString {
    INFINITE = "unkritisch",
    ONEDAY = "1 Tag",
    TWODAYS = "2 Tage",
    THREEDAYS = "3 Tage",
    FOURDAYS = "4 Tage",
    FIVEDAYS = "5 Tage",
    SIXDAYS = "6 Tage",
    ONEWEEK = "1 Woche"
}

export class ShelfLifeDates {
    static readonly INFINITE = ShelfLifeDates.addDays(365);
    static readonly ONEDAY = ShelfLifeDates.addDays(1);
    static readonly TWODAYS = ShelfLifeDates.addDays(2);
    static readonly THREEDAYS = ShelfLifeDates.addDays(3);
    static readonly FOURDAYS = ShelfLifeDates.addDays(4);
    static readonly FIVEDAYS = ShelfLifeDates.addDays(5);
    static readonly SIXDAYS = ShelfLifeDates.addDays(6);
    static readonly ONEWEEK = ShelfLifeDates.addDays(7);

    private static addDays(days: number): Date {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    static getShelfLifeDates(): Date[] {
        return [
            ShelfLifeDates.INFINITE,
            ShelfLifeDates.ONEDAY,
            ShelfLifeDates.TWODAYS,
            ShelfLifeDates.THREEDAYS,
            ShelfLifeDates.FOURDAYS,
            ShelfLifeDates.FIVEDAYS,
            ShelfLifeDates.SIXDAYS,
            ShelfLifeDates.ONEWEEK
        ];
    }
}