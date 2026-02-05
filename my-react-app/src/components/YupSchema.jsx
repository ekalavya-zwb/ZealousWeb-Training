import React from "react";
import * as Yup from "yup";

const YupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be greater than 0")
    .required("Salary is required"),
  hireDate: Yup.date()
    .max(new Date(), "Hire date cannot be in the future")
    .required("Hire date is required"),
  department: Yup.string()
    .oneOf(["engineering", "marketing", "sales", "hr"], "Invalid department")
    .required("Department is required"),
});

export default YupSchema;
