//Habilita el enrutamiento en una aplicacion web permite cambiar lo que se muestra
//en la pagina sin cargar una pagina completamente nueva
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Páginas
import { Home, ProductDetails, Products, About, Contact, AdminProducts, Error } from "./pages";
// Componentes
import { Sidebar, Header, Footer } from "./components";

const App = () => {
  return (
    <>
      <div className="overflow-hidden">
        {/*Este componente debe envolver toda la aplicación para que las rutas funcionen correctamente*/}
        <Router>
          <Header />
          {/*contenedor para sus rutas*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/*cuando la URL coincida con "/products", se mostrará el componente Products*/}
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/adminProducts" element={<AdminProducts />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Sidebar />
          <Footer />
        </Router>
      </div>
    </>
  );
};

export default App;
