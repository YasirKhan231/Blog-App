import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import {Signin} from './Pages/Signin'
import Quote from './Components/quote'
import { Publish } from './Pages/Publish'
import { Blogs } from './Pages/Blogs'
import { Blog } from './Pages/Blog'

function App() {

  return ( <>

  <BrowserRouter>
   <Routes>
    <Route path='/quote' element={<Quote/>}> </Route>
    <Route path='/Signup'  element={<Signup/>}></Route>
    <Route  path='/Signin' element={<Signin/>}></Route>
    <Route path='/Blogs' element={<Blogs/>}></Route>
    <Route path="/publish" element={<Publish />} />
    <Route path='/blog/:id' element={<Blog />} />
   </Routes>
  </BrowserRouter>
  </>
    
  )
}

export default App
