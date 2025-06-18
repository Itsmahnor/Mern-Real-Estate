import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
 const avator =  useSelector((state) => state.user.avator)
  return (
    <div className='p-5 max-w-lg mx-auto '>
     
 <h1 className='text-2xl font-semibold text-center my-5'>Profile</h1>
<form className='flex flex-col gap-3 '>
<img src={avator} alt="img" className='rounded-full self-center 
 h-24 w-24 object-cover  ' />
  <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
         
        />
         <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
         
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
         
        />
        <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg">
        UPDATE
        </button>
</form>
<div className='flex justify-between mt-5'>
  <span className='text-red-700'>Delete account</span>
   <span className='text-red-700'>Sign Out</span>
</div>
    </div>
  )
}
