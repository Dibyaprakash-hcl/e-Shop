"use client"
import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import RegisterForm from './RegisterForm'

const Register = () => {
  
  const currentUser = JSON.parse(localStorage.getItem("USER") || '{}')

  return (
    <Container>
        <FormWrap>
            <RegisterForm currentUser={currentUser}/>
        </FormWrap>
    </Container>
  )
}

export default Register
