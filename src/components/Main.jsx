
import Navbar from "./Navbar";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import ProductShowcaseWrapper from "./Products";
import ProductDetails from "./Product";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";

export default function Main() {
    
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProtectedRoute component={Home}  />} />
                <Route path="/products" element={<ProductShowcaseWrapper/>} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path='/user/cart' element={<ProtectedRoute component={Cart} />} />
                <Route path='/user/orders' element={<ProtectedRoute component={OrderHistory} />} />
            </Routes>

        </>
    )
}

