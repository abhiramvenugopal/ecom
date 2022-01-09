import './Bag.css';
import { getToken, getUser, isAuthenticated, updateUser } from "../../utils/authOperations";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";

/*
    Bag component for showing summary of orders
*/

function Bag() {
    const navigate=useNavigate()
    const [products, setproducts] = useState([])                                //state for storeing all the products in the bag        
    const [countArray, setcountArray] = useState([])                            //Array for storeing quantity of each product in the bag
    const [totalCost, settotalCost] = useState(0)                               //state for storeing total cost of the products in the bag

    //function for requesting products based on the products id in the bag array
    const getProductsByArray=(prdsArray,tempCountArr)=>{                        
        var body={}
        body={products:prdsArray}
        axios.post('http://localhost:3035/api/v1/product/products/array',body)   
        .then(function (response) {
            console.log(response)
            if(response.status===200){           
                console.log(response.data)
                setproducts(response.data.products)
                calculateCost(response.data.products,tempCountArr)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    //function for calculating total cost of products in the bag
    const calculateCost=(tempProducts,tempCountArr)=>{
        var total=0
        tempProducts.forEach((product,index)=>{
            total+=product.price*tempCountArr[index]
        })
        settotalCost(total)
        console.log(total)
    }
    
    //function for updating quantity of each products in the abg on change of quantity field value
    const updateCountArray=(event,index)=>{
        event.preventDefault()
        let tempArr=countArray
        tempArr[index]=event.target.value
        setcountArray(tempArr)
        calculateCost(products,countArray)
    }
    
    //function for removing an item from a bag
    const removeFromBag=(index)=>{
        
        let token=getToken()
        let header={Authorization:"bearer "+token}
        console.log(token)
        axios.delete('http://localhost:3035/api/v1/bag/remove/'+products[index]._id,{headers:header})
            .then(function (response) {
                console.log(response)
                let tempProducts=[...products]
                let tempCountArray=[...countArray]
                tempProducts = tempProducts.filter(function(item,itemindex) {
                    return itemindex !== index
                })
                setproducts(tempProducts)
                tempCountArray = tempCountArray.filter(function(item,itemindex) {
                    return itemindex !== index
                })
                setcountArray(tempCountArray)
                updateUser()
                calculateCost(tempProducts,tempCountArray)
            })
            .catch(function (error) {
                console.log(error)
            })
        
    }  
    const onClickaddItems=()=>{
        navigate('/products')
    }

    useEffect(() => {
        var tempUser=getUser()
        if(!isAuthenticated()){
            navigate('/loginorsignup')
        }
        else{
            let tempCountArr=new Array(tempUser.bag.length).fill(1)
            setcountArray(tempCountArr)
            getProductsByArray(tempUser.bag,tempCountArr)
        }
        
        
        
    }, []);
   
  return (
      <div className='container-fluid bag-container'>
          <div className='row'>
              <div className='col-md-6 products-summary'>
                  <div className='col-md-12'>
                      <div className='bag-heading'>
                          <span>My Shopping Bag</span>
                          <span>Total:{totalCost}</span>
                      </div>
                        <div className='bag-items'>
                            <div className='bag-heading'>
                                <div className='bag-heading-discount'>
                                    <span>You have got 60% off on this items</span>
                                    <span>Add more and get 70% off</span>
                                </div>
                                <div>
                                    <button onClick={()=>{onClickaddItems()}} className='bag-btn'>ADD ITEMS</button>
                                </div>
                            </div>
                            {
                                products.map((product,index)=>{
                                    return(
                                        <div key={index} className="card custom-bag-card">
                                            <div className="card-horizontal">
                                                <div className="img-square-wrapper">
                                                    <img className="product-image" src={product.image} alt="errr"/>
                                                </div>
                                                <div className="card-body">
                                                    <div className='product-info'>
                                                        <div className='col-md-8 product-info-descr'>
                                                            <span className='product-title'>{product.title}</span>
                                                            <div>
                                                                <span>Quantity : </span>
                                                                <input onChange={(event)=>{updateCountArray(event,index)}} type="number" defaultValue={1} min={1} className='product-quantity' />
                                                            </div>
                                                            
                                                        </div>
                                                        <div className='col-md-3 product-info-cost'>
                                                            <span className='product-title'>{product.price}</span>
                                                        </div>

                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className='col-md-4 remove-btn-div'>
                                                    <button onClick={()=>{removeFromBag(index)}} className='card-footer-btn'>REMOVE</button>
                                                </div>
                                                <div className='col-md-6'>
                                                    <button className='card-footer-btn' >MOVE TO WISHLIST</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                  </div>

              </div>
              <div className='col-md-3 cost-summary'>
                  <div className='price-details'>
                      <div className='price-details-left-div'>
                          <span>Total MRP</span>
                          <span>Discount on MRP</span>
                          <span>Coupon Discount</span>
                          <span>Convenience Fee</span>
                          <span style={{fontSize:"larger",fontWeight:"bolder"}}>Total Amount</span>
                      </div>
                      <div className='price-details-right-div'>
                          <span>{totalCost}</span>
                          <span>₹30</span>
                          <span>₹90</span>
                          <span>₹60</span>
                          <span  style={{fontSize:"larger",fontWeight:"bolder"}} >{Math.floor(totalCost-30+90-60)}</span>
                      </div>

                  </div>
                  <div>
                    <button className='bag-btn' style={{width:"90%"}}>PLACE ORDER</button>
                  </div>

              </div>

          </div>
          
      </div>
  );
}

export default Bag;
