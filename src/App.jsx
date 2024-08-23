import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Views/Home";
import Store from "./Views/Store";
import Cart from "./Views/Cart";
import { LuMessagesSquare } from "react-icons/lu";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import Footer from "./Components/Footer";
import AdminDashboard from "./Views/Admin/AdminDashboard";
import AddProductPage from "./Views/Admin/AddProductPage";
import DeleteProductPage from "./Views/Admin/DeleteProductPage";
import ErrorPage from "./Views/ErrorPage";
import ContactUs from "./Views/ContactUs";
import CompletedOrder from "./Views/CompletedOrder";
import Checkout from "./Views/Checkout";
import ProductPage from "./Views/ProductPage";
import Login from "./Views/Admin/Login";

export let CartContext = createContext(null);

function App() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.cart) {
      localStorage.setItem("cart", "[]");
    }

    setCart(JSON.parse(localStorage.getItem("cart")));
  }, [localStorage.cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/completed-order" element={<CompletedOrder />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin-dashboard/add-product"
          element={<AddProductPage />}
        />
        <Route
          path="/admin-dashboard/delete-product"
          element={<DeleteProductPage />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Tooltip label="تواصل معنا" openDelay={500}>
        <IconButton
          colorScheme="white"
          aria-label="Contact With Customer Service"
          size="lg"
          isRound
          sx={{
            bg: "black",
            color: "white",
            fontSize: 22,
            position: "fixed",
            bottom: "20px",
            right: "20px",
            boxShadow: "dark-lg",
            zIndex: "999",
          }}
          icon={<LuMessagesSquare />}
          onClick={() => {
            navigate("/contact");
          }}
        />
      </Tooltip>

      <Footer />
    </CartContext.Provider>
  );
}

export default App;
