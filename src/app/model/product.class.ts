import { Vendor } from './vendor.class';

export class Product {
    id: number;
    vendor: Vendor;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
    photoPath: string;

    constructor(id: number = 0, vendor: Vendor = null, partNumber: string = "", name: string = "", price: number = null, unit: string = "", photoPath: string = "") {
        this.id = id;
        this.vendor = vendor;
        this.partNumber = partNumber;
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.photoPath = photoPath;
    }
}
