import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Swiper , SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'
export default function Listing() {
    const[listing,setlisting]=useState(null)
    SwiperCore.use([Navigation])
const params=useParams()
useEffect(() => {
  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listing/single/${params.listingid}`, {
        credentials: 'include',
      });
      const data = await response.json(); 

      if (data.success === false) {
        toast.error("Failed to fetch data");
        return;
      }

      setlisting(data);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("❌ Fetch error:", error);
    }
  };

  fetchListing();
}, [params.listingid]);

      return (
    <div>
{listing && (
  <>
    <Swiper navigation>
      {listing.imageUrls.map((url) => (
        <SwiperSlide key={url}>
          <div
            className="h-[500px] w-[100vw]"
            style={{
              background: `url(${url}) center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  </>
)}

    </div>
  )
}
