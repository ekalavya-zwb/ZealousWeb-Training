import React, { useState, useEffect } from "react";
import styles from "../styles/RandomUser.module.css";
import card from "../assets/placeholder_card.png";

const RandomUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch("https://randomuser.me/api/");

      if (!response.ok) {
        throw new Error("Failed to fetch user!");
      }

      const data = await response.json();
      setUser(data.results[0]);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <img src={card} alt="placeholder-card" width={400} />;
  }

  if (error) {
    return (
      <>
        <p className={styles.errorMsg}>{error}!</p>
        <button type="button" onClick={fetchUser}>
          Retry
        </button>
      </>
    );
  }

  return (
    <>
      <div className={styles.userContainer}>
        <img src={user.picture.large} alt="User" />
        <h2>
          {user.name.title} {user.name.first} {user.name.last}
        </h2>
        <p>Gender: {user.gender}</p>
        <p>
          DOB:{" "}
          {new Date(user.dob.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>Email: {user.email}</p>
        <p>
          Address: {user.location.city}, {user.location.country}
        </p>
        <p>Phone: {user.phone}</p>
        <button type="button" onClick={fetchUser}>
          Get New User
        </button>
      </div>
    </>
  );
};

export default RandomUser;
