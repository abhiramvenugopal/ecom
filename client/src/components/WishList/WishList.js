import './WishList.css';
import { getUser, isAuthenticated } from "../../utils/authOperations";
import Products from "../Products/Products";
import { useNavigate  } from "react-router-dom";
import { useEffect, useState } from 'react';


/*
    component for showing wishlisted items
 */
function WishList() {
  const [displayProducts, setdisplayProducts] = useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    if(!isAuthenticated()){
        navigate('/loginorsignup')
    }
    else{
      setdisplayProducts(true)                                // setting flag for showing products if user is authenticated
    }   
  }, []);
    
   
  return (
      <div>
          <h1>WISH LIST</h1>
          {displayProducts && 
          <Products products={getUser().wishlist}/>             // reused products component for showing wishlisted products
          }
      </div>
  );
}

export default WishList;
