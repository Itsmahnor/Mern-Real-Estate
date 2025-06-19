import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form className='flex gap-4 flex-col sm:flex-row'>
<div className='flex flex-col gap-4 flex-1'>
    <input type="text" maxLength='62' minLength={10} required  placeholder='Name' id='Name' className='border p-3 rounded-lg' />
    <textarea type="text" required placeholder='Description' id='Description' className='border p-3 rounded-lg' />
    <input type="text" placeholder='address' id='address' required className='border p-3 rounded-lg' />
<div className='flex gap-5 flex-wrap'>
    <div className='flex gap-2'>
        <input type="checkbox" id='sale' className='w-5' />
        <span>Sell</span>
    </div>
    <div className='flex gap-2'>
        <input type="checkbox" id='Rent' className='w-5' />
        <span>Rent</span>
    </div>
    <div className='flex gap-2'>
        <input type="checkbox" id='Parking spot' className='w-5' />
        <span>Parking spot</span>
    </div>
    <div className='flex gap-2'>
        <input type="checkbox" id='Furnished' className='w-5' />
        <span>Furnished</span>
    </div>
        <div className='flex gap-2'>
        <input type="checkbox" id='offer' className='w-5' />
        <span>Offer</span>
    </div>
</div>
<div className='flex flex-wrap gap-6'>
    <div className='flex items-center gap-2'>
        <input className='p-3 border border-gray-300 rounded-lg' type="number" id='bedrooms' max='10' min='1' required />
        <p>Beds</p>
    </div>
        <div className='flex items-center gap-2'>
        <input className='p-3 border border-gray-300 rounded-lg' type="number" id='Baths' max='10' min='1' required />
        <p>Baths</p>
    </div>
        <div className='flex items-center gap-2'>
        <input className='p-3 border border-gray-300 rounded-lg' type="number" id='Regular Price' max='10' min='1' required />
       <div className='flex flex-col items-center'>
     <p>Regular Price</p>
     <span className='text-xs'>($ / month)</span>
       </div>
   
    </div>
        <div className='flex items-center gap-2'>
        <input className='p-3 border border-gray-300 rounded-lg' type="number" id='Discount Price' max='10' min='1' required />
         <div className='flex flex-col items-center'>
     <p>Discount Price</p>
     <span className='text-xs'>($ / month)</span>
       </div>
    </div>
</div>
</div>
<div className='flex flex-col flex-1 gap-4'>
<p className='font-semibold '>Images:
    <span className='font-normal text-gray-600 ml-2'>The First image will be the cover (max 6)</span>
</p>
<div className='flex gap-4'>
    <input type="file" className='p-3 border border-gray-300 rounded w-full
    ' id="images" accept='image/*' multiple />
    <button className='p-3 text-green-700 border border-green-700
    rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
</div>
<button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
</div>

    </form>
    </main>
  )
}
