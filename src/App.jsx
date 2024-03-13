import AllProducts from "./components/AllProducts";
import Footer from "./components/Footer";
import Home from "./components/Home";
import InnerContainer from "./components/InnerContainer";
import Navbar from "./components/Navbar";
import OuterContainer from "./components/OuterContainer";
import ProductPredictionPage from "./components/ProductPredictionPage";
import UpperNavbar from "./components/UpperNavbar";
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
      <OuterContainer>
        <InnerContainer>
          <UpperNavbar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<AllProducts/>}/>
            {/* <Route path="/products/:pluno" element={<ProductPredictionPage/>}/> */}
            <Route path="/products/:pluno/:month" element={<ProductPredictionPage/>}/>
          </Routes>
          <Footer />
        </InnerContainer>
      </OuterContainer>
    </>
  );
}

export default App;
