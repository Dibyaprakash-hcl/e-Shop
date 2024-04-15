import { products } from "./products";

export interface IProductParams{
    category?: string | null;
    searchTerm?: string | null;
}

export default function getProducts(params: IProductParams){
   
        const {category,searchTerm} = params;
        let searchString = searchTerm;

        if(!searchTerm){
            searchString=""
        }

        let query:any = {}

        if(category){
            query.category = category
        }

        console.log(searchString,"cb")

        const product = products.filter((item)=>{
            item.category === params.category
        })

        return product;

        
    
}