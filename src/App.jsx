import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import signIn from "./Pages/signIn"
import signUp from "./Pages/signUp"
import Profile from "./Pages/Profile"
export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route  path="/"  element={<Home />} />
     <Route  path="/about"  element={<About />} />
      <Route  path="/signIn"  element={<signIn />} />
       <Route  path="/signUp"  element={<signUp />} />
        <Route  path="/profile"  element={<Profile />} />
   </Routes>
   </BrowserRouter>
  )
}