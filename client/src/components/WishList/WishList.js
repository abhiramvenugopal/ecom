import './WishList.css';
import { getUser } from "../../utils/authOperations";
import Products from "../Products/Products";




function WishList() {
    
   
  return (
      <div>
          <h1>WISH LIST</h1>
          <Products products={getUser().wishlist}/>
      </div>
  );
}

export default WishList;
