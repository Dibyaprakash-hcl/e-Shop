"use client"
import React from 'react'
import Container from '../../components/Container';
import OrderDetails from './OrderDetails';

interface IPrams{
    orderId?:string;
}

const Order = ({params}:{params:IPrams}) => {
  console.log(params,"url")
  const getOrder = JSON.parse(localStorage.getItem("ORDER") || '{}')
  const order = getOrder.filter(function (selection:any){ 
      return selection.id === params.orderId;
  });

  console.log(order,"mk")

  if(!order){
    return <div className='items-center font-bold'>No order</div>
  }

  return (
    <div className='p-8'>
      <Container>
        <OrderDetails order={order}/>
      </Container>
    </div>
  )
}

export default Order
