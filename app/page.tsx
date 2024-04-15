"use client"
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { truncateText } from "../utils/truncateText";
import ProductCard from "./components/products/ProductCard";
import { products } from "../utils/products";
import getProducts, { IProductParams } from "../utils/getProducts";
import NullData from "./components/NullData";

interface HomeProps{
  searchParams:IProductParams
}


export default function Home({searchParams}:HomeProps) {
  let availableProducts;
  if(!searchParams.category && !searchParams.searchTerm){
    availableProducts = products
  }else if(searchParams.category){
    availableProducts = products.filter(item=>{
      return  item.category === searchParams.category
     });
     
     if(availableProducts.length === 0){
      return <NullData title='Oops! No Products found. Click "All" to clear filter'/>
     }
  }else if(searchParams.searchTerm){
    availableProducts = products.filter((item:any)=>{
       return item.name.toLowerCase().indexOf(searchParams.searchTerm?.toLowerCase()) > -1 || item.name.includes(searchParams.searchTerm)
      //return item.name.includes(searchParams.searchTerm)
    })

    if(availableProducts.length === 0){
      return <NullData title='Oops! No Products found. Click "All" to get all products'/>
     }
    
  }
  

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {availableProducts?.map((product:any)=>{
            return <ProductCard data={product}/>
          })}
        </div>
      </Container> 
    </div>
  )
}
