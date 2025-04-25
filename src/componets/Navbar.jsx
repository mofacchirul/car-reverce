"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
const Navbar = () => {
  const { data: session, status } = useSession();

  
    const links = (
        <div className='flex gap-1 '>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/mybooking">My Booking</Link></li>
            <li><Link href="/contact">Contact</Link></li>
        </div>)
        const items = (
          <>
           <li><Link href="/">Steering Cover</Link></li>
           <li><Link href="/">Steel Rim</Link></li>
           <li><Link href="/">Brake Dise</Link></li>
           <li><Link href="/">Engine Model</Link></li>
           <li><Link href="/">Slient BLock</Link></li>
           <li><Link href="/">Piston Rod</Link></li>
           <li><Link href="/">Engine Piston</Link></li>
           <li><Link href="/">Replica wheels</Link></li>
           <li><Link href="/">Car Parts</Link></li>
           <li><Link href="/">Spring</Link></li>
           
          </>
        )


 





    return (
        <div className='bg-[#ffc107] '>
           <div className="navbar justify-between   lg:justify-around ">
  <div className="">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      {
        items
      }
      </ul>
    </div>
  </div>
  <div className="flex items-center justify-center gap-2">
<ul className=''>
  {
    links
  }
</ul>
<div className="">
{
  status === "authenticated" ? (
    <button onClick={() => signOut()} className='btn btn-neutral text-[#ffc107]'>
      Log Out
    </button>
  ) 
  : 
  (
    <Link href="/singin">
      <button className='btn btn-neutral text-[#ffc107]'>
        Login
      </button>
    </Link>
  )
}


  </div>
  </div>
 
</div>
        </div>
    );
};

export default Navbar;