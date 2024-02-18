//Habilita el enrutamiento en una aplicacion web permite cambiar lo que se muestra
//en la pagina sin cargar una pagina completamente nueva
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Páginas
import { Home, ProductDetails, Products, About, Contact, Error, IniciarSesion, Registrarse  } from "./pages";
import { ValidacionVenta } from "./pages/ValidacionVenta";
import { GestionProductos } from "./pages/GestionProductos";
// Componentes
import { Header, Footer } from "./components";

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
            <Route path="/gestionProductos" element={<GestionProductos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/iniciarSesion" element={<IniciarSesion />} />
            <Route path="/validacionVenta" element={<ValidacionVenta />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
};

export default App;
