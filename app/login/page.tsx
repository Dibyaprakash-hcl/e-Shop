"use client"
import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import LoginForm from './LoginForm'

const Login = () => {
  let currentUser;
    currentUser = JSON.parse(localStorage.getItem('USER')|| '{}')
  
  return (
    <Container>
        <FormWrap>
            <LoginForm currentUser={currentUser}/>
        </FormWrap>
    </Container>
  )
}

export default Login
