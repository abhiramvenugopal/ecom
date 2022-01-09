
import './Products.css';
import React,{useState,useEffect} from 'react';
import axios from "axios";
import ProductInfo from "../ProductInfo/ProductInfo";
import Login from "../Login/Login";

function Products(props) {
    const [products, setproducts] = useState([])
    const [showProduct, setshowProduct] = useState(false)
    const [selectedProduct, setselectedProduct] = useState(0)

    const getProducts=()=>{
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
    useEffect(() => {
        getProducts()
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
                            <p className="card-text">Rating:{product.rating.rate}({product.rating.count})</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                )
            })}

        </div>
        <ProductInfo product={products[selectedProduct]} show={showProduct} onHide={() => setshowProduct(false)}/>
        <Login show={true}/>
    </div>
    
  );
}

export default Products;
