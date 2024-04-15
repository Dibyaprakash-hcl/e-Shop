"use client"
import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import CheckoutDetails from './CheckoutDetails'

const Checkout = () => {
  const currentUser = JSON.parse(localStorage.getItem('USER')|| '{}')
  return (
    <div className='p-8'>
      <Container>
            <CheckoutDetails currentUser={currentUser}/>
      </Container>
    </div>
  )
}

export default Checkout
