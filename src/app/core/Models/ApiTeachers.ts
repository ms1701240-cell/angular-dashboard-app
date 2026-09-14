export interface ApiUser{
     id: number;
    name: string;
    email: string;
    phone: string;
     address: {
        "street":string,
        "city": string,
    };
   image:string;
}