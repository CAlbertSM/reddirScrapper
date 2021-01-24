export class Award {
    id: string;
    coinPrice: number;
    iconUrl: string;
    name: string;
    description: string;
    awardedCount: number;

    constructor(data: any) {
        this.id = data.id;
        this.coinPrice = data.coin_price ?? 0;
        this.iconUrl = data.icon_url;
        this.name = data.name ?? "Generica Award"; 
        this.description = data.description ?? "Generic Award Granted";
        this.awardedCount = data.count ?? 0;
    }
}