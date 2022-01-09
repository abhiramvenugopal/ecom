import {Modal,Button} from 'react-bootstrap';
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
          <img className='product-image' src={props.product && props.product.image} alt="Error" />
          <h2>₹{props.product && props.product.price} </h2>
          <span>{props.product && props.product.rating.rate} ★ ({props.product && props.product.rating.count})</span>
          <p>{props.product && props.product.description}</p>
          <span>category : {props.product && props.product.category}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Add To Bag</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ProductInfo;