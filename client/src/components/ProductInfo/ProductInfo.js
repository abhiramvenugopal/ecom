import {Modal} from 'react-bootstrap';
import './ProductInfo.css';
import { getToken } from "../../utils/authOperations";
import Login from "../Login/Login";
import { useState } from "react";


const axios = require('axios');
function ProductInfo(props) {
  const [showLogin, setshowLogin] = useState(false)


  let addToWishListOrBag=(option)=>{
    console.log(props.product)
    let token=getToken()
    if(token){
      let header={Authorization:"bearer "+token}
      console.log(token)
      var body={product:props.product._id}
      axios.post('http://localhost:3035/api/v1/'+option+'/add',body,{headers:header})
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    }
    else{
      setshowLogin(true)
    }
    
  }
  

    return (
      <div>

      
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              { props.product && props.product.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='product-description'>
              <div >
                <img className='product-image' src={props.product && props.product.image} alt="Error" />
              </div>
              <div className='product-spec' >
                <h2>₹{props.product && props.product.price} </h2>
                <span>{props.product && props.product.rating.rate} ★ ({props.product && props.product.rating.count})</span>
                <div>
                  <button onClick={()=>{addToWishListOrBag('bag')}} className='bag-btn' >ADD TO BAG</button>
                  <button onClick={()=>{addToWishListOrBag('wishlist')}} className='wishlist-btn'>ADD TO WISHLIST</button>
                </div>
                
                <p>{props.product && props.product.description}</p>
                
                <span>category : {props.product && props.product.category}</span>
              </div>
              
            </div>
            
          </Modal.Body>
          
        </Modal>
        <Login  show={showLogin} onHide={() => setshowLogin(false)}/>
      </div>
    );
  }

  export default ProductInfo;