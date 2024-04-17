'use client'
import Image from 'next/image'
import React from 'react'
import { truncateText } from '../../../utils/truncateText'
import { formatPrice } from '../../../utils/formatPrice'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ProductData } from '../../../utils/products'
import Link from 'next/link'

interface ProductCardProps{
    data:ProductData
}
const ProductCard:React.FC<ProductCardProps> = ({data}) => {
    


    const productRating = data.reviews.reduce((acc:number,item:any)=>
        item.rating + acc,0
    ) /data.reviews.length ;


  return (
    <Link href={`/product/${data.id}`}>
    <div data-testid='product-card'  className='col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm' >
      <div className='flex flex-col items-center w-full gap-1 '>
        <div className='aspect-square overflow-hidden relative w-full'>
            <Image fill src={data.images[0].image} className='w-full h-full object-contain' alt={data.name}/>
        </div>
        <div className='mt-4'>
            {truncateText(data.name)}
        </div>
        <div>
            <Rating value={productRating} readOnly/>
        </div>
        <div>
            {data.reviews.length} reviews
        </div>
        <div className='font-semibold'>
            {formatPrice(data.price)}
        </div>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard
