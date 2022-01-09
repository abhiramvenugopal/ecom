
import './Products.css';
import React,{useState,useEffect} from 'react';
import axios from "axios";
import ProductInfo from "../ProductInfo/ProductInfo";
import Login from "../Login/Login";
/*
    component for showing all products
 */
function Products(props) {
    const [products, setproducts] = useState([])                            //state for storeing products details
    const [showProduct, setshowProduct] = useState(false)                   //flag for showing product details modal
    const [selectedProduct, setselectedProduct] = useState(0)               //state for setting which ever product is clicked by the user

    const getProducts=()=>{                                                 //function for requesting API for all products based on filter condition
        var body={}
        if(props.filter){
            body=props.filter
        }
        axios.post('http://localhost:3035/api/v1/product/filter',body)
        .then(function (response) {
            console.log(response)
            if(response.status===200){           
                console.log(response.data)
                setproducts(response.data.products)
            
            }
        })
        .catch(function (error) {
            
            // handle error
            console.log(error);
        })
    }
    const getProductsByArray=()=>{                                                  //function for requesting API for all products which is present in the array
        var body={}
        if(props.products){
            body={products:props.products}
            axios.post('http://localhost:3035/api/v1/product/products/array',body)
            .then(function (response) {
                console.log(response)
                if(response.status===200){           
                    console.log(response.data)
                    setproducts(response.data.products)
                
                }
            })
            .catch(function (error) {
                
                // handle error
                console.log(error);
            })
        }
        
    }
    useEffect(() => {                                                           
        console.log(props.products)
        if(props.products){
            getProductsByArray()                                            //its will be true if products component is loading from wishlist component
        }
        else{
            getProducts()
        }
        
    }, []);
  return (
    <div className='container'>
        <div className='products'>
            {products.map((product,index)=>{
                return(
                    <div key={index} className="card custom-card" onClick={()=>{ setselectedProduct(index) 
                                                                                    setshowProduct(true)}}>
                        <img className="card-img-top product-img" src={product.image} alt="Error"/>
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <span className="product-price">₹{product.price}</span>
                            <p className="card-text">Rating:{product.rating.rate}({product.rating.count})</p>
                        </div>
                    </div>
                )
            })}

        </div>
        <ProductInfo product={products[selectedProduct]} show={showProduct} onHide={() => setshowProduct(false)}/>
    </div>
    
  );
}

export default Products;
