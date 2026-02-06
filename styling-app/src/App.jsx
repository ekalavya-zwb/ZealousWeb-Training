import { Routes, Route } from "react-router-dom";
import "./App.css";
import Counter from "./components/Counter";
import Button from "./components/Button";
import Container from "./components/Container";
import ReadEmployees from "./components/ReadEmployees";
import ReadEmployeesMUI from "./components/ReadEmployeesMUI";
import CreateEmployee from "./components/CreateEmployee";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      {/* <Counter /> */}
      {/* <div className="flex flex-col gap-2 m-4">
        <Button>Submit</Button>
        <Button danger>Error</Button>
      </div> */}
      {/* <div className="flex flex-col gap-4 m-4">
        <Container small>Box 1 </Container>
        <Container>Box 2</Container>
        <Container large>Box 3</Container>
      </div> */}
      {/* <ReadEmployees /> */}
      <Routes>
        <Route path="/" element={<ReadEmployeesMUI />}></Route>
        <Route path="/add" element={<CreateEmployee />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
