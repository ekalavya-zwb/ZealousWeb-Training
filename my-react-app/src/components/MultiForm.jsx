import React, { useState } from "react";
import styles from "../styles/MultiForm.module.css";

const MultiForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
    hireDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const nextStep = () => {
    setErrors({});
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setErrors({});
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const validateForm = () => {
    const newErrors = {};

    if (step === 1) {
      if (formData.firstName.trim() === "") {
        newErrors.firstName = "First name cannot remain empty!";
      }
      if (formData.lastName.trim() === "") {
        newErrors.lastName = "Last name cannot remain empty!";
      }
      if (formData.email.trim() === "") {
        newErrors.email = "Email cannot remain empty!";
      }
    }

    if (step === 2) {
      if (formData.department.trim() === "") {
        newErrors.department = "Department cannot remain empty!";
      }
      if (Number(formData.salary) <= 0) {
        newErrors.salary = "Salary must be greater than 0!";
      }
      if (formData.hireDate.trim() === "") {
        newErrors.hireDate = "Hire Date cannot remain empty!";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStep();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      salary: "",
      hireDate: "",
    });
    setStep(1);
    console.log(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formData}>
          {step === 1 && (
            <>
              <h2>Step 1: Personal Info</h2>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.firstName}</p>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.lastName}</p>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.email}</p>
              <div className={styles.btnContainer}>
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={validateForm}>
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2>Step 2: Employment Info</h2>
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.department}</p>
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.salary}</p>
              <label htmlFor="hireDate">Hire Date</label>
              <input
                type="date"
                id="hireDate"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.hireDate}</p>
              <div className={styles.btnContainer}>
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={validateForm}>
                  Next
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2>Step 3: Review & Submit</h2>
              <p>First Name: {formData.firstName}</p>
              <p>Last Name: {formData.lastName}</p>
              <p>Email: {formData.email}</p>
              <p>Department: {formData.department}</p>
              <p>Salary: {Number(formData.salary).toLocaleString()}</p>
              <p>Hire Date: {formData.hireDate}</p>
              <div className={styles.btnContainer}>
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="submit">Submit</button>
              </div>
            </>
          )}
        </div>
        <p>Step {step} of 3</p>
      </form>
    </>
  );
};

export default MultiForm;
