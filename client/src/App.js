import './App.css';

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* <Home/> */}
      <Products/>


    </div>
  );
}

export default App;
