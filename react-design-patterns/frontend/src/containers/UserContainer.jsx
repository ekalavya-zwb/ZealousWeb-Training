import { useEffect, useState } from "react";
import UserList from "../components/UserList";

export default function UserContainer() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch("https://reqres.in/api/users", {
        headers: {
          "X-API-Key": "import.meta.env.VITE_REQRES_API_KEY",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h2 className="text-center text-xl">Container - Presentation Pattern</h2>
      <UserList users={users} isLoading={isLoading} error={error} />
    </>
  );
}
