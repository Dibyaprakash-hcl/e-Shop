"use client"
import React from 'react'
import Container from '../components/Container'
import OrderClient from './OrderClient';
import NullData from '../components/NullData';

const Orders = () => {

    const currentUser = JSON.parse(localStorage.getItem("USER") || '{}');

    const dipun = JSON.parse(localStorage.getItem("ORDER") || '{}')
    let orders
    if(Array.isArray(dipun) && dipun.length ){
      orders = dipun?.filter(function (selection:any){ 
        return selection.userDetails.email === currentUser.email;
      });
    }

    if(!orders ){
      return (<NullData title='No Orders Found...'/>)
    }
 
  return (
    <div className='pt-8'>
        <Container>
            <OrderClient orders={orders}/>
        </Container>
      
    </div>
  )
}

export default Orders
