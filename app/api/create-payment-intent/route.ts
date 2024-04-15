"use client";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CartProductType } from "../../product/[productid]/ProductDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion:'2023-10-16',
});

const calculateOrderAmount = (items:CartProductType[])=>{
    const totalPrice = items.reduce((acc,item)=>{
        const itemTotal = item.price * item.quantity
        return acc + itemTotal;
    },0);
    return totalPrice;
}

export async function POST(request:Request){
    const currentUser = JSON.parse(localStorage.getItem("USER") || '{}');

    if(Object.entries(currentUser).length === 0){
        return NextResponse.json({error:'Unauthorized'},{status:401});
    }

    const body = await request.json()
    const {items,payment_intent_id} = body
    const total = calculateOrderAmount(items) * 100
    const orderData = {
        user:{connect:{id:currentUser.email}},
        amount:total,
        currency:'INR',
        status:"pending",
        payemntIntentId:payment_intent_id,
        products:items
    }

    if(payment_intent_id){
        //update the order
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
        if(current_intent){
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id, {amount:total}
            )

            const [existing_order,update_order] = await Promise.all([
                JSON.parse(localStorage.getItem("Order") || "{}"),
                localStorage.setItem("Order",JSON.stringify(orderData))
            ])
    
            if(!existing_order){
                return NextResponse.json({error:"Invalid Payment Intent"},{status:400})
            }
    
            return NextResponse.json({paymentIntent:updated_intent})
        }

       

    }else{
        //create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:'INR',
            automatic_payment_methods:{enabled:true}
        });

        //create the order
        orderData.payemntIntentId = paymentIntent.id
        localStorage.setItem("Order",JSON.stringify(orderData));
        return NextResponse.json({paymentIntent});
    }
}