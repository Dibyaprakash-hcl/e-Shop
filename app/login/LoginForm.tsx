"use client"
import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'
import { register } from 'module'
import { error } from 'console'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Button from '../components/Button'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { User } from '../components/nav/UserMenu'

interface LoginFormProps{
    currentUser:User
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {

    const [isLoading,setIsLoading] = useState(false);
    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({defaultValues :{
        email:"",
        password:""
    }})

    const router = useRouter();

    useEffect(()=>{
        if(Object.entries(currentUser).length !== 0){
            router.push("/cart")
            router.refresh();
        }
    },[])

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        const user = JSON.parse(localStorage?.getItem("USER") || '{}')
        
        if(data.email === user.email && data.password === user.password){
            toast.success("Log In Successfull");
            router.push("/cart")
        }else{
            toast.error("Invalid Credentials")
        }
    }

    if(Object.entries(currentUser).length !== 0){
        return <p className='text-center'>Logged In. Redirecting...</p>
    }

  return (
    <>
        <Heading title='Sign in to E-Shop'/>
        <hr className='bg-slate-300 w-full h-px'/>
        <Input 
            id='email' 
            label='Email' 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

        <Input 
            id='password'  
            label='Password' 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type='password'
        />

        <Button label={isLoading ? "Loading" : "Log In"} onClick={handleSubmit(onSubmit)} />

        <p className='text-sm'>
            Do not have an account? <Link href='/register' className='underline'>Sign Up</Link>
        </p>
    </>

  )
}

export default LoginForm
