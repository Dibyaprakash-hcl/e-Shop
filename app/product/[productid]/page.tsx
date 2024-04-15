
import React from 'react'
import Container from '../../components/Container'
import ProductDetails from './ProductDetails'
import ListRating from './ListRating'
import { products } from '../../../utils/products'

interface IPramas{
    productid?:string
}

const Product = ({params}:{params:IPramas}) => {

  const product = products.find((item)=>item.id == params.productid) 

  return (
    (product && <div className='p-8'>
      <Container>
        <ProductDetails product={product}/>
        <div className="flex flex-col mt-20 gap-4">
          <ListRating product={product}/>
        </div>
      </Container>
    </div>)
  )
}

export default Product
