import { Link, Route, Routes } from "react-router-dom";
// import { useContext } from "react";
import "./App.css";
import "./company/styles/Header.css";
import ConditionalRendering from "./components/ConditionalRendering";
import EventHandler from "./components/EventHandler";
import Greetings from "./components/Greetings";
import Welcome from "./components/Welcome";
import Dashboard from "./company/Dashboard";
import Form from "./components/Form";
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
import ToDoList from "./components/ToDoList";
import MultiForm from "./components/MultiForm";
import HooksPractice from "./components/hooksPractice";
import Timer from "./components/Timer";
import UpdateTitle from "./components/UpdateTitle";
import WindowResize from "./components/WindowResize";
import RandomUser from "./components/RandomUser";
import NavigationBar from "./components/NavigationBar";
import UseReducerCounter from "./components/UseReducerCounter";
import UseReducerForm from "./components/UseReducerForm";
import ThemeToggle from "./components/ThemeToggle";
import ThemeContext from "./context/ThemeContext";
import GlobalEmployees from "./components/GlobalEmployees";
import AddEmployee from "./components/AddEmployee";
import PageNotFound from "./components/PageNotFound";
import EditEmployee from "./components/EditEmployee";
import ExpensiveCalculation from "./components/ExpensiveCalculation";
import Parent from "./components/Parent";
import Formik from "./components/Formik";
import YupForm from "./components/YupForm";
import ReactHookForm from "./components/ReactHookForm";
import FetchDepartments from "./components/FetchDepartments";
import FetchRoutes from "./components/FetchRoutes";
import FetchEmployees from "./components/fetchEmployees";
import ReadRoutes from "./components/ReadRoutes";
import ReadEmployees from "./components/ReadEmployees";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  // const { theme } = useContext(ThemeContext);

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
      {/* <EmployeeList /> */}
      {/* <ToDoList /> */}
      {/* <MultiForm /> */}
      {/* <HooksPractice /> */}
      {/* <Timer /> */}
      {/* <UpdateTitle /> */}
      {/* <WindowResize /> */}
      {/* <RandomUser /> */}
      {/* <NavigationBar /> */}
      {/* <UseReducerCounter /> */}
      {/* <UseReducerForm /> */}
      {/* <div className={`${theme}Container`}>
        <ThemeToggle />
      </div> */}
      {/* <Routes>
        <Route path="/" element={<GlobalEmployees />}></Route>
        <Route path="/add" element={<AddEmployee />}></Route>
        <Route path="/edit/:id" element={<EditEmployee />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes> */}
      {/* <ExpensiveCalculation /> */}
      {/* <Parent /> */}
      {/* <Formik /> */}
      {/* <YupForm /> */}
      {/* <ReactHookForm /> */}
      {/* <Routes>
        <Route path="/" element={<FetchRoutes />}></Route>
        <Route path="/employees" element={<FetchEmployees />}></Route>
        <Route path="/departments" element={<FetchDepartments />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes> */}
      {/* <Routes>
        <Route path="/" element={<ReadRoutes />}></Route>
        <Route path="/employees" element={<ReadEmployees />}></Route>
        <Route path="/employees/add" element={<CreateEmployee />}></Route>
        <Route path="/employees/edit/:id" element={<UpdateEmployee />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes> */}
    </>
  );
}

export default App;
