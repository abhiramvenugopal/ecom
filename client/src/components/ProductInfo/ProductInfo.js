import {Modal} from 'react-bootstrap';
import './ProductInfo.css';
function ProductInfo(props) {
    return (
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
                <button className='bag-btn' >ADD TO BAG</button>
                <button className='wishlist-btn'>WISHLIST</button>
              </div>
              
              <p>{props.product && props.product.description}</p>
              
              <span>category : {props.product && props.product.category}</span>
            </div>
            
          </div>
          
        </Modal.Body>
        
      </Modal>
    );
  }

  export default ProductInfo;