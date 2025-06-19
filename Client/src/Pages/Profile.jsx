import React, { useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserExist } from "../Redux/User/userSlice.js";
import { Link } from "react-router-dom";
export default function Profile() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
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
          defaultValue={user}
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
        <span className="text-red-700 cursor-default" onClick={SignOutUser}>Sign Out</span>
      </div>
    </div>
  );
}
