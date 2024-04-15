"use client"
import React, { useCallback, useState } from 'react'
import Avatar from '../Avatar';
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import BackDrop from './BackDrop';

export type User={
    name:string,
    email:string,
    password:string
};

interface userMenuProps{
    currentUser:User
}

const UserMenu:React.FC<userMenuProps> = ({currentUser}) => {

    const [isOpen,setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=>{
        setIsOpen(prev => !prev);
    },[])

    const router = useRouter();

  return (
    <>

        <div className='relative z-30'>
            <div onClick={toggleOpen} className='p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'>
                <Avatar />
                <AiFillCaretDown />
            </div>
            {isOpen && (
                <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer'>
                    {Object.entries(currentUser).length !== 0 ? (
                        <div>
                        <Link href="/orders">
                            <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                        </Link>
                        <hr />
                        <MenuItem onClick={()=>{
                            toggleOpen();
                            toast.success("Log out Successfull")
                            router.push("/login")
                        }}>Log Out</MenuItem>
                    </div>
                    ) : (
                        <div>
                        <Link href="/login">
                            <MenuItem onClick={toggleOpen}>LogIn</MenuItem>
                        </Link>
                        <Link href="/register">
                            <MenuItem onClick={toggleOpen}>Register</MenuItem>
                        </Link>
                    </div>
                    )}
                    

                    

                </div>
            )}
        </div>

        {isOpen ? <BackDrop onClick={toggleOpen}/> : null}

    </>
  )
}

export default UserMenu
