"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '../../components/Heading';
import { Rating } from '@mui/material';
import Input from '../../components/inputs/Input';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import { products } from '../../../utils/products';

interface AddRatingProps{
    product:any,
    user:any
}

const AddRating:React.FC<AddRatingProps> = ({product,user}) => {
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter();
    const {register,handleSubmit,setValue,reset,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            comment:'',
            rating:0
        }
    })

    const setCustomValue = ((id:string,value:any)=>{
        setValue(id,value,{
            shouldTouch:true,
            shouldDirty:true,
            shouldValidate:true
        })
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        if(data.rating === 0) return toast.error("No rating selected")
        const ratingData:any = {...data,userId:user.userId,productId:product.id}
        const filterData:any = products.filter((item)=>{
            return item.id === product.id
        })
        filterData[0].reviews.push(ratingData);
        console.log(filterData,"review")
        localStorage.setItem("REVIEW",JSON.stringify(filterData))
    }


  return (
    <div className='flex flex-col gap-2 max-w-[500px]'>

        <Heading title='Rate this Product'/>
        <Rating onChange={(event,newValue)=>{
            setCustomValue('rating',newValue)
        }}/>
        <Input 
            id='comment'
            label='Comment'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Button label={isLoading ? "Loading" : "Rate Product"} onClick={handleSubmit(onSubmit)}/>
      
    </div>
  )
}

export default AddRating
