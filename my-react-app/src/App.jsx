import { Link, Route, Routes } from "react-router-dom";
import ConditionalRendering from "./components/ConditionalRendering";
import EventHandler from "./components/EventHandler";
import Greetings from "./components/Greetings";
import Welcome from "./components/Welcome";
import Dashboard from "./company/Dashboard";
import Form from "./components/Form";
import "./company/styles/Header.css";
import Home from "./basicRouter/Home";
import About from "./basicRouter/About";
import Contact from "./basicRouter/Contact";
import Products from "./basicRouter/Products";
import CarProducts from "./basicRouter/CarProducts";
import BikeProducts from "./basicRouter/BikeProducts";
import Counter from "./components/Counter";
import EmployeeForm from "./components/EmployeeForm";
import LoginForm from "./components/LoginForm";
import EmployeeStatus from "./components/EmployeeStatus";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <>
      {/* <Welcome
        name="Zealousweb Technologies Pvt. Ltd."
        tagline="Solving The Unsolved"
      /> */}
      {/* <ConditionalRendering /> */}
      {/* <EventHandler /> */}
      {/* <Greetings /> */}
      {/* <Dashboard /> */}
      {/* <Form /> */}

      {/* <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />}>
          <Route path="cars" element={<CarProducts />} />
          <Route path="bikes" element={<BikeProducts />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes> */}

      {/* <Counter /> */}
      {/* <EmployeeForm /> */}
      {/* <LoginForm /> */}
      {/* <EmployeeStatus />
      <EmployeeStatus
        f_name="John"
        l_name="Miller"
        email="john.miller@company.com"
        salary={45000}
        status="Inactive"
        rating={3.2}
      />
      <EmployeeStatus
        f_name="Emily"
        l_name="Carter"
        email="emily.carter@company.com"
        salary={90000}
        status="On Project"
        rating={4.9}
      />
      <EmployeeStatus
        f_name="James"
        l_name="Robinson"
        email="james.robinson@company.com"
        salary={70000}
        status="Available"
        rating={4.5}
      /> */}
      <EmployeeList />
    </>
  );
}

export default App;
