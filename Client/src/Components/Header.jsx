import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className='bg-slate-400 px-4 py-3 flex flex-col sm:flex-row sm:justify-between items-center gap-3 sm:gap-4 w-full shadow-md'>
      {/* Logo */}
      <Link to="/">
      <h1 className='font-semibold tracking-wide text-center sm:text-left'>
        <span className='text-base text-slate-200 sm:text-xl'>Sahand</span>
        <span className='text-base text-slate-600 sm:text-xl font-bold'>Estate</span>
      </h1>
</Link>
      {/* Search Bar */}
      <form className='bg-slate-200 rounded-full px-3 py-2 flex items-center w-full max-w-full sm:max-w-xs md:max-w-sm shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-slate-300'>
        <input
          type='text'
          placeholder='Search...'
          className='bg-transparent focus:outline-none text-sm w-full placeholder-slate-500'
        />
        <IoSearch className="text-slate-600 ml-2 text-lg hover:scale-110 transition-transform" />
      </form>

      {/* Navigation */}
      <ul className="flex gap-4 text-slate-200 text-sm sm:text-base font-medium">
        <Link to="/" className="hover:underline underline-offset-4 cursor-pointer transition hidden sm:inline">Home</Link>
        <Link to="/about" className="hover:underline underline-offset-4 cursor-pointer transition hidden sm:inline">About</Link>
        <Link to="/signIn" className="hover:underline underline-offset-4 cursor-pointer transition">Sign In</Link>
      </ul>
    </div>
  );
}
