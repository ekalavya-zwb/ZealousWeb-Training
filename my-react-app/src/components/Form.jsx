import React from "react";
import { useState } from "react";

// const Form = () => {
//   const [name, setName] = useState("John");
//   const handleChange = (event) => {
//     setName(event.target.value);
//   };
//   return (
//     <>
//       <form action="#">
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" value={name} onChange={handleChange} />
//       </form>
//       <p>User Input: {name}</p>
//     </>
//   );
// };

// const Form = () => {
//   const [name, setName] = useState("John");

//   const handleChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(name);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="username">Username:</label>
//       <input type="text" id="username" value={name} onChange={handleChange} />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const Form = () => {
//   const [txt, setTxt] = useState("");
//   const handleChange = (event) => {
//     setTxt(event.target.value);
//   };
//   return (
//     <>
//       <form action="#">
//         <label htmlFor="textarea">Feedback:</label> <br />
//         <textarea
//           id="textarea"
//           rows={5}
//           cols={25}
//           value={txt}
//           onChange={handleChange}
//           placeholder="Enter your opinion..."
//         ></textarea>
//       </form>
//       <p>User Feedback: {txt}</p>
//     </>
//   );
// };

// const Form = () => {
//   const [myCar, setmyCar] = useState("Select");
//   const handleChange = (event) => {
//     setmyCar(event.target.value);
//   };
//   return (
//     <>
//       <form action="#">
//         <select value={myCar} onChange={handleChange}>
//           <option value="Select">Select</option>
//           <option value="Ford">Ford</option>
//           <option value="Ferrari">Ferrari</option>
//           <option value="Volkswagon">Volkswagon</option>
//           <option value="Nissan">Nissan</option>
//         </select>
//       </form>
//       <p>Selected Option: {myCar}</p>
//     </>
//   );
// };

// const Form = () => {
//   const [inputs, setInputs] = useState({
//     firstName: "John",
//     lastName: "Doe",
//   });

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs((values) => ({ ...values, [name]: value }));
//   };
//   return (
//     <>
//       <form action="#">
//         <label htmlFor="firstName">
//           First Name:
//           <input
//             type="text"
//             name="firstName"
//             id="firstName"
//             value={inputs.firstName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label htmlFor="lastName">
//           Last Name:
//           <input
//             type="text"
//             name="lastName"
//             id="lastName"
//             value={inputs.lastName}
//             onChange={handleChange}
//           />
//         </label>
//       </form>
//       <p>
//         Full Name: {inputs.firstName} {inputs.lastName}
//       </p>
//     </>
//   );
// };

const Form = () => {
  const [inputs, setInputs] = useState({
    firstName: "John",
    tomato: true,
    onion: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const finalVal = type === "checkbox" ? checked : value;

    setInputs((values) => ({ ...values, [name]: finalVal }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let fillings = "";

    if (inputs.firstName.trim() === "") {
      alert("Enter your name first!");
    } else {
      if (inputs.tomato) fillings += "tomato";
      if (inputs.onion) {
        if (inputs.tomato) {
          fillings += " and onion";
        } else {
          fillings += "onion";
        }
      }
      if (fillings === "") fillings += "no fillings";
      alert(`${inputs.firstName.trim()} wants a burger with ${fillings}`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          Name:
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={inputs.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <input
          type="checkbox"
          name="tomato"
          id="tomato"
          checked={inputs.tomato}
          onChange={handleChange}
        />
        <label htmlFor="tomato">Tomato</label>
        <br />
        <input
          type="checkbox"
          name="onion"
          id="onion"
          checked={inputs.onion}
          onChange={handleChange}
        />
        <label htmlFor="onion">Onion</label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

// const Form = () => {
//   const [selectedFruit, setSelectedFruit] = useState("Apple");

//   const handleChange = (event) => {
//     setSelectedFruit(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`Your favorite fruit is ${selectedFruit}`);
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>Select your favorite fruit:</label>
//         <br />
//         <input
//           type="radio"
//           name="fruits"
//           id="apple"
//           value="Apple"
//           checked={selectedFruit === "Apple"}
//           onChange={handleChange}
//         />
//         <label htmlFor="apple">Apple</label>
//         <br />
//         <input
//           type="radio"
//           name="fruits"
//           id="banana"
//           value="Banana"
//           checked={selectedFruit === "Banana"}
//           onChange={handleChange}
//         />
//         <label htmlFor="banana">Banana</label>
//         <br />
//         <input
//           type="radio"
//           name="fruits"
//           id="mango"
//           value="Mango"
//           checked={selectedFruit === "Mango"}
//           onChange={handleChange}
//         />
//         <label htmlFor="mango">Mango</label>
//         <br />
//         <input
//           type="radio"
//           name="fruits"
//           id="orange"
//           value="Orange"
//           checked={selectedFruit === "Orange"}
//           onChange={handleChange}
//         />
//         <label htmlFor="orange">Orange</label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// };

export default Form;
