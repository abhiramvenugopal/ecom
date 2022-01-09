
import './NavBar.css';
import Logo from "../../assets/img/logo.png";
import { Link, useNavigate  } from "react-router-dom";

/*

    Navigation Bar component 
    This component is available all over the application

*/

function NavBar() {
    const navigate=useNavigate()
    const routeTo=(value)=>{                        //Naviate to Wishlist or Bag
        navigate("/"+value);
    }
    const logout=()=>{                              //Clear credentials from localstorage if we click on Logout Button
        window.localStorage.clear()
        navigate("/");
    }
  return (
    <div className='navbar-container'>
        <nav className="navbar  navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                <Link to={'/'}><img src={Logo} alt="Not Found" className='navbar-brand nav-logo' /></Link>  
                <div className="col-md-4 mb-2 search-bar-container">
                    <form className="form-inline">
                        <i className="fas fa-search fa-lg search-icon" aria-hidden="true"></i>
                        <input className="form-control form-control-sm ml-3 w-75 search-bar" type="text" placeholder="Search" aria-label="Search"/>
                    </form>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li onClick={()=>{routeTo("wishlist")}} className="nav-item">
                            <i className="fas fa-heart fa-2x icons"></i>
                            <span className='navbar-label'>WishList</span>
                        </li>
                        <li onClick={()=>{routeTo("bag")}} className="nav-item">
                            <i className="fas fa-shopping-bag fa-2x icons"></i>
                            <span className='navbar-label'>Bag</span>
                        </li>
                        <li  className="nav-item">
                            <button onClick={()=>{logout()}} className='btn logout-btn' >LOG OUT</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  );
}

export default NavBar;
