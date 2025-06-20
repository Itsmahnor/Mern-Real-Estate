import React, { useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserExist } from "../Redux/User/userSlice.js";
import { Link } from "react-router-dom";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [listings, setListings] = useState([]);
const navigate = useNavigate();

  const user = useSelector((state) => state.user.User);
  const id = useSelector((state) => state.user.id);
  const avator = useSelector((state) => state.user.avator);
const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
const DeleteUser = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data = await res.json();

    if (res.status === 200 || res.status === 201) {
      toast.success(data.message || "Account deleted successfully!");
      dispatch(UserExist({ User: null, id: null }));
    } else {
      toast.error(data.message || "Failed to delete account");
    }
  } catch (error) {
    toast.error("Something went wrong while deleting the account.");
  }
};

const SignOutUser =  () =>{
   dispatch(UserExist({ User: null, id: null }));
}
const handleDelete = async (listingId) => {
  const confirm = window.confirm("Are you sure you want to delete this listing?");
  if (!confirm) return;

  try {
    const res = await axios.delete(`/api/listing/delete/${listingId}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      toast.success("Listing deleted successfully!");
      setListings((prev) => prev.filter((item) => item._id !== listingId));
    } else {
      toast.error("Failed to delete listing.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong during deletion.");
  }
};



 const handleSubmit = async (e) => {
  e.preventDefault();

  const { username, email, password } = formData;

  // ✅ Field validation
  if (!username || !email || !password) {
    toast.error("All fields are required!");
    return;
  }

  try {
    const res = await fetch(`/api/user/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Data Updated Successfully!");
        dispatch(UserExist({
    User: formData.username,
    avator: avator, // same as current
    id: id
  }));}
     else {
      toast.error(data.message || "Update failed");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

const getListing = async () => {
  try {
    const res = await axios.get(`/api/listing/getList/${id}`, {
      withCredentials: true,
    });

    const data = res.data;
    console.log(data);

    if (res.status === 401 || res.status === 403) {
      toast.error(data.message || "Unauthorized access");
    } else {
      setListings(data); 
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
};


  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-center my-5">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="file" ref={fileRef} className="hidden" accept="image/*" />
        <img
          src={avator}
          onClick={() => fileRef.current.click()}
          alt="avatar"
          className="rounded-full self-center h-24 w-24 object-cover"
        />

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
         value={formData.username || user}
          onChange={handleFormChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleFormChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleFormChange}
        />

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg"
        >
          UPDATE
        </button>
        <Link to="/createlisting" className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">
        Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={DeleteUser}>Delete account</span>
        <span className="text-red-700 cursor-pointer" onClick={SignOutUser}>Sign Out</span>
      </div>
      <p className="text-red-700 text-center my-3 cursor-pointer" onClick={getListing}>Show Listing</p>
      {listings.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-bold mb-4 text-center">Your Listings</h2>
    <div className="grid gap-5">
      {listings.map((listing, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-md bg-white text-black flex flex-col md:flex-row md:justify-between md:items-start"
        >
          <div className="md:w-3/4">
            <h3 className="text-lg font-semibold text-slate-700">{listing.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Description:</span> {listing.description}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Address:</span> {listing.address}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Type:</span> {listing.type}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Price:</span> Rs.{listing.regularPrice} {listing.discountPrice > 0 && `(Discount: Rs.${listing.discountPrice})`}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Bedrooms:</span> {listing.bedrooms}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Parking:</span> {listing.parking ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Furnished:</span> {listing.furnished ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Offer:</span> {listing.offer ? "Yes" : "No"}
            </p>
        
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4">
            <button
         
              className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
              onClick={() => navigate(`/edit/${listing._id}`)}

            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(listing._id)}
              className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}
