"use client"
import { Container, Row, Col } from 'reactstrap'
import React, { useState } from 'react'
import Heading from '../components/Heading'
import Button from '../components/Button'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md';
import Input from '../components/inputs/Input'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import { User } from '../components/nav/UserMenu'

interface CheckoutDetailsProps{
    currentUser : User
}

const CheckoutDetails:React.FC<CheckoutDetailsProps> = ({currentUser}) => {

    const {cartProducts, handleClearCart, cartTotalAmount,orderFullDetails,handleOrderFullDetails} = useCart();
    const shippingCharge = 90;

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({defaultValues :{
        name:"",
        email:"",
        phone:"",
        address:""
    }})

    const router = useRouter();
    const orderDetails:any=[];
    const [orderPlaced,setOrderPlaced] = useState(false);
    const [isDatapresentForOrder,setisDataPresentForOrder] = useState(true);

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
       const shippingDetails ={
            id:Math.random().toString(16).slice(2),
            userDetails:currentUser,
            name:data.name,
            email:data.email,
            phone:data.phone,
            address:data.address,
            product:cartProducts,
            totalprice:formatPrice(cartTotalAmount+shippingCharge)
       };
       
       handleOrderFullDetails(shippingDetails);
       setisDataPresentForOrder(false);
       setOrderPlaced(true);
       handleClearCart();
       const dipun = JSON.parse(localStorage.getItem("ORDER") || '{}')
       console.log("dppp",dipun)
       var item = dipun.filter(function (selection:any){ 
        return selection.userDetails.email === currentUser.email;
        });
        console.log(item,"typecheck")
    
    //     while(item.length > 0) {
    //         var i=0
    //         console.log(item[i].products,"final");
    //         i++;
    //         item.length--;
    //     }
    }

  return (
    <>
        {isDatapresentForOrder && (
            <>
                <Heading title='Shipping Details' center/>
                <div className='border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4'>
                    <div className='w-[890px]'>
                            <Input 
                                id='name' 
                                label='Name' 
                                errors={errors}
                                register={register}
                                required
                            />

                            <Input 
                                id='email'  
                                label='Email'
                                register={register}
                                errors={errors}
                                required
                            />

                            <Input 
                                id='phone'  
                                label='Phone'
                                register={register}
                                errors={errors}
                                required
                                type='number'
                            />

                            <Input 
                                id='address'  
                                label='Address'
                                register={register}
                                errors={errors}
                                required
                            />

                            <Button label="Place Order" onClick={handleSubmit(onSubmit)} />
                    </div>
                    <div className='text-sm flex flex-col gap-2 items-start'>
                            <h1 className='font-bold text-xl'>Price Details</h1>
                            <div className='flex justify-between w-full text-base'>
                                <span>Carttotal</span>
                                <span>{formatPrice(cartTotalAmount)}</span>
                            </div>
                            <div className='flex justify-between w-full text-base '>
                                <span>Shipping Charge</span>
                                <span>₹90.00</span>
                            </div>
                            <hr className='bg-slate-300 w-full h-px'/>
                            <div className='flex justify-between w-full text-base font-semibold'>
                                <span>Subtotal</span>
                                <span>{formatPrice(cartTotalAmount+90)}</span>
                            </div>
                        
                    </div>
                </div>
            </>
        )}

        {orderPlaced && (
            <div className='flex items-center flex-col gap-4'>
                <div className='text-teal-500 text-center'>Order Placed Successfully</div>
                    <div className='max-w-[220px] w-full'>
                        <Button label='Continue Shopping' onClick={()=>router.push('/')}/>
                    </div>
                
            </div>
        )}

    </>
    
  )
}

export default CheckoutDetails
