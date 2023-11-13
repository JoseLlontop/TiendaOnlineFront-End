import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// contexts
//import CartProvider from "./contexts/CartContext";
import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import "bootstrap/dist/css/bootstrap.min.css"
//Iconos
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "./pages/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
      <ProductProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
      </ProductProvider>
  </SidebarProvider>
);
