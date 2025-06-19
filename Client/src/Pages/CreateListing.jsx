import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
console.log(uploadedImages)
  // Upload images to the server
  const handleUpload = async () => {
    if (files.length > 6) {
      alert('You can only upload up to 6 images');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await axios.post('/api/upload', formData);
      setUploadedImages(res.data.images);
      setFiles([]); // clear selected files
    } catch (err) {
      toast.error('Image upload failed');
    }
  };

  // Delete an uploaded image preview
  const handleDelete = (filename) => {
    setUploadedImages(prev => prev.filter(img => img.name !== filename));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listingData = {
      name: e.target.Name.value,
      description: e.target.Description.value,
      address: e.target.address.value,
      images: uploadedImages,
    };
    console.log('Final data to send to MongoDB:', listingData);
    // You can now send listingData to your backend using axios.post
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className='flex gap-4 flex-col sm:flex-row' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
          <input type="text" maxLength='62' minLength={10} required placeholder='Name' id='Name' className='border p-3 rounded-lg' />
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
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>(Max 6)</span>
          </p>

          <div className='flex gap-4'>
           <input
  type="file"
  className='p-3 border border-gray-300 rounded w-full'
  id="images"
  accept='image/*'
  multiple
  onChange={(e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 6) {
      toast.warn('Only the first 6 images will be selected');
    }
    setFiles(selectedFiles.slice(0, 6));
  }}
/>

            <button
              type='button'
              onClick={handleUpload}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              disabled={files.length === 0}
            >
              Upload
            </button>
          </div>

          {/* Preview Uploaded Images */}
          <div className='flex flex-wrap gap-4'>
            {uploadedImages.map((img, i) => (
              <div key={i} className='relative w-24 h-24'>
                <img src={img.url} alt='uploaded' className='w-full h-full object-cover rounded' />
                <button
                  type='button'
                  onClick={() => handleDelete(img.name)}
                  className='absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded-full'
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <button
            type='submit'
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
