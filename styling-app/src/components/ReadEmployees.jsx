import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import useEmployee from "./useEmployee";

const ReadEmployees = () => {
  const { employees, error, loading, refetch } = useEmployee(
    `${import.meta.env.VITE_API_URL}/employees`,
  );

  const [deletingId, setDeletingId] = useState(null);

  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const formatDate = (isoStr) => isoStr.split("T")[0];
  const roundSalary = (sal) => Number(sal.toFixed(0));

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    setDeletingId(id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/${id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete employee with status ${response.status}`,
        );
      }

      refetch();
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading Employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors pb-4">
      <div className="flex gap-2 justify-center items-center pt-4">
        <p className="dark:text-white text-lg">
          Switch to {dark ? "Light" : "Dark"} Mode
        </p>
        <FontAwesomeIcon
          icon={dark ? faSun : faMoon}
          className="cursor-pointer text-3xl text-yellow-400"
          onClick={() => setDark(!dark)}
        />
      </div>

      {employees.map((employee) => (
        <div
          className="m-4 border-1 w-70 p-4 border-gray-400 rounded-md dark:text-white"
          key={employee.id}
        >
          <p className="text-center text-xl font-bold">
            {employee.first_name} {employee.last_name}
          </p>
          <p>Email: {employee.email}</p>
          <p>
            Salary: ${roundSalary(Number(employee.salary)).toLocaleString()}
          </p>
          <p>Hire Date: {formatDate(employee.hire_date)}</p>
          <p>Dept ID: {employee.dept_id}</p>
          <p>Status: {employee.state}</p>
          <button
            className="bg-blue-500 text-md text-white mt-1 pt-[2px] pb-[2px] pl-[6px] pr-[6px] rounded-sm hover:bg-blue-600 ring-1 ring-blue-600 cursor-pointer"
            onClick={() => deleteEmployee(employee.id)}
          >
            {employee.id === deletingId ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReadEmployees;
