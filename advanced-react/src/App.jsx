import "./App.css";
import InputFocus from "./components/InputFocus";
import Counter from "./components/Counter";
import Timer from "./components/Timer";
import TextEditor from "./components/TextEditor";
import Parent from "./components/Parent";
import EmployeeList from "./components/EmployeeList";
import Accordion from "./components/Accordion";

function App() {
  return (
    <>
      {/* <InputFocus /> */}
      {/* <Counter /> */}
      {/* <Timer /> */}
      {/* <TextEditor /> */}
      {/* <Parent /> */}
      {/* <EmployeeList /> */}
      <Accordion allowMultiple>
        <Accordion.Item id="1">
          <Accordion.Header>What is React?</Accordion.Header>
          <Accordion.Body>
            React is a JavaScript library for building UI.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item id="2">
          <Accordion.Header>What is a Hook?</Accordion.Header>
          <Accordion.Body>
            Hooks let you use state and lifecycle features.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default App;
