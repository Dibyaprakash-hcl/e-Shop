"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { formatPrice } from '../../utils/formatPrice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { randomInt } from 'crypto';
import { truncateText } from '../../utils/truncateText';
import Heading from '../components/Heading';
import ActionBtn from '../components/ActionBtn';
import { MdRemoveRedEye } from 'react-icons/md';

interface OrderClientProps{
    orders:any;
}

const OrderClient:React.FC<OrderClientProps> = ({orders}) => {

    console.log(orders,"NAMEFOR")

    const router = useRouter();
    let rows:any=[];

    if(orders){
        rows = orders.map((item:any)=>{
            console.log(item,"cmd")
            return{
                id:item.id,
                customer:item.name,
                amount:item.totalprice,
                category:item.product?.map((item:any)=>{return item.category}),
                brand:item.product?.map((item:any)=>{return item.brand}),
                images:item.product?.map((item:any)=>{return item.selectedImg})
            }
        })
    }

    const columns:GridColDef[] = [
        {field:"id",headerName:"ID",width:220},
        {field:"customer",headerName:"NAME",width:220},
        {field:"amount",headerName:"AMOUNT",width:190,renderCell:(params)=>{
            return(
                <div className='font-bold text-slate-800'>{params.row.amount}</div>
            )
        }},
        {field:"category",headerName:"CATEGORY",width:190},
        {field:"brand",headerName:"BRAND",width:190},
        {field:"action",headerName:"ACTION",width:100,renderCell:(params)=>{
            return(
            <div className='flex justify-between w-full'> <ActionBtn icon={MdRemoveRedEye} onClick={()=>{router.push(`order/${params.row.id}`)}}/> </div>
        )}}
    ]

  return (
    <div className='max-w-[1150px] m-auto text-xl'>
        <div className='mb-4 mt-8'>
            <Heading title='My Orders' center/>
        </div>

        <div style={{height:600,width:"100%"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[9, 20]}
            />
        </div>
        
        
      
    </div>
  )
}

export default OrderClient
