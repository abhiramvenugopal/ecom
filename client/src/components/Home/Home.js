
import './Home.css';
import carouselOne from "../../assets/img/carousel-1.jpg";
import carouselTwo from "../../assets/img/carousel-2.jpg";
import carouselThree from "../../assets/img/carousel-3.gif";
import electronics from "../../assets/img/electronics.jpg";
import jewellery from "../../assets/img/jewellery.jpg";
import men from "../../assets/img/men.jpg";
import women from "../../assets/img/women.jpg";
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import Products from "../Products/Products";

function Home() {
    const [filter, setfilter] = useState({})
    const [showProducts, setshowProducts] = useState(false)


    const filterProducts=(value)=>{
        setfilter({category: value})
        setshowProducts(true)
    }

  return (
    <div className='home-container'>
        {!showProducts &&
        <div>
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100"
                src={carouselOne}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                className="d-block w-100"
                src={carouselTwo}
                alt="Second slide"
                />
                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carouselThree}
                alt="Third slide"
                />
                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        <div className='categories'>
            <div class="img-container">
                <img onClick={()=>{filterProducts("men's clothing")}} className='categories-img' src={men} alt="Error"/>
                <img onClick={()=>{filterProducts("women's clothing")}} className='categories-img' src={women} alt="Error"/>
                <img onClick={()=>{filterProducts("electronics")}} className='categories-img' src={electronics} alt="Error"/>
                <img onClick={()=>{filterProducts("jewelery")}} className='categories-img' src={jewellery} alt="Error"/>
            </div>
        </div>
        </div>
        }
        {showProducts && <Products filter={filter}/>}
    </div>
    
  );
}

export default Home;
