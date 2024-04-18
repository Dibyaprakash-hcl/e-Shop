"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'
import { register } from 'module'
import { error } from 'console'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Button from '../components/Button'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User } from '../components/nav/UserMenu'

interface RegisterFormProps{
    currentUser:User
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {

    const [isLoading,setIsLoading] = useState(false);
    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({defaultValues :{
        name:"",
        email:"",
        password:""
    }})

    const router = useRouter();

    useEffect(()=>{
        if(Object.entries(currentUser).length !== 0){
            router.push("/cart");
            router.refresh();
        }
    },[])

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        console.log(data);
        const finalData = {...data,userId:Math.random().toString(16).slice(2)}
        localStorage.setItem("USER",JSON.stringify(finalData))
        toast.success("Account Created and Logged In Successfully");

        router.push("/cart");
        router.refresh();

        // signIn("credentials",{
        //     email:data.email,
        //     password:data.password,
        //     redirect:false
        // }).then((callback:any)=>{
        //     if(callback?.ok){
        //         router.push("/cart");
        //         router.refresh();
        //         toast.success("Logged In")
        //     }

        //     if(callback?.error){
        //         toast.error(callback.error)
        //     }
        // })

    }

    if(Object.entries(currentUser).length !== 0){
        return <p className='text-center'>Logged In. Redirecting...</p>
    }

  return (
    <div data-testid="register">
        <Heading title='Sign up For E-Shop'/>
        <hr className='bg-slate-300 w-full h-px'/>
        <Input 
            id='name' 
            label='Name' 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

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

        <Button label={isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />

        <p className='text-sm'>
            Already, have an account? <Link href='/login' className='underline'>Log In</Link>
        </p>
    </div>

  )
}

export default RegisterForm
