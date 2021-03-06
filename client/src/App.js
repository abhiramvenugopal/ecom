import './App.css';

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import WishList from "./components/WishList/WishList";
import Bag from "./components/Bag/Bag";
import Redirector from "./components/Redirector/Redirector";
import { BrowserRouter as Router,Routes ,Route  } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Router>
        <div>
          <NavBar/>
          <Routes>
                  <Route path='/' element={ <Home/>} ></Route>
                  <Route path='/wishlist' element={<WishList/>} ></Route>
                  <Route path='/bag' element={<Bag/>} ></Route>
                  <Route path='/loginorsignup' element={<Redirector/>} ></Route>
                  <Route path='/products' element={<Products/>} ></Route>
          </Routes>
        </div>
      </Router>


    </div>
  );
}

export default App;
