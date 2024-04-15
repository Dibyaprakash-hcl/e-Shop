"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from '../../components/Heading'
import OrderItem from './OrderItem'

interface OrderDetailsProps{
    order:any
}

const OrderDetails:React.FC<OrderDetailsProps> = ({order}) => {

    //const router = useRouter();


  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
        <div className='mt-8'>
            <Heading title='Order Details'/>
        </div>
        <div>Order Id: {order[0].id}</div>
        <div>Order Name: {order[0].name}</div>
        <div>
            Total Amount:{" "}
            <span className='font-bold'>{order[0].totalprice}</span>
        </div>
        <div>Phone No: {order[0].phone}</div>
        <div>Address: {order[0].address}</div>
        <div>
            <h2 className='font-semibold mt-4 mb-2'>Products Ordered</h2>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className=" justify-self-center">PRICE</div>
                <div className=" justify-self-center">QTY</div>
                <div className=" justify-self-end">TOTAL</div>
            </div>
            {order[0].product && order[0].product.map((item:any) =>{
                return <OrderItem key={item.id} item={item}></OrderItem>
            })}
        </div>
      
    </div>
  )
}

export default OrderDetails
