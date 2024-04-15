"use client";

import React from 'react'
import "./navbar.scss"
import Container from '../Container'
import Link from 'next/link'
import { Redressed } from 'next/font/google'
import CartCount from './CartCount'
import UserMenu from './UserMenu'
import Categories from './Categories';
import SearchBar from './SearchBar';

const redressed = Redressed({ subsets:["latin"], weight:["400"]});

const NavBar = () => {
  let currentUser;
     currentUser = JSON.parse(localStorage.getItem("USER") || '{}')

  return (
    <div className='nav-bar'>
      <div className='py-4 border-b-[1px]'>
        <Container>
            <div className='nav-container'>
                <Link href="/" className={`${redressed.className} font-bold text-2xl`}>E-Shop</Link>
                <div className='nav-search'><SearchBar /></div>
                <div className='nav-container-right'>
                    <CartCount />
                    <UserMenu currentUser={currentUser}/>
                </div>
            </div>
        </Container>

      </div>
      <Categories/>
    </div>
  )
}

export default NavBar
