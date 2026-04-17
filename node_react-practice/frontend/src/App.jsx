import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ToastContainer from "./components/ToastContainer";
import TailwindPractice from "./components/TailwindPractice";
import Modal from "./components/Modal";
import Home from "./components/Home";
import PostCard from "./components/PostCard";
import Accordion from "./components/Accordion";
import Form from "./pages/Form";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
      {/* <TailwindPractice /> */}
      {/* <Modal /> */}
      {/* <Home /> */}
      {/* <PostCard>
        <PostCard.Title />
        <PostCard.Content />
        <PostCard.User />
        <PostCard.Buttons />
      </PostCard> */}
      {/* <Accordion allowMultiple={true}>
        <Accordion.Item id="1">
          <Accordion.Header>What is React?</Accordion.Header>
          <Accordion.Body>
            A JavaScript library for building UIs.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item id="2">
          <Accordion.Header>Is it a framework?</Accordion.Header>
          <Accordion.Body>
            Technically it's a library, but often used like a framework.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      {/* <Form /> */}
    </>
  );
}

export default App;
