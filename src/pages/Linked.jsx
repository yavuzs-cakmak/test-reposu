
import { Routes, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Contacts from "./Contacts";
import NotFoundPages from "./NotFoundPages";
import Header from "../components/Header";
import FaultRequestForm from "./FaultRequestForm";

function Layout() {
  return (
    <div>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/fault" element={<FaultRequestForm />} />
        <Route path="/*" element={<NotFoundPages />} />
      </Routes>
    </div>
  );
}
export default Layout;