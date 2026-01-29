import React, { useState, useEffect } from "react";

const UpdateTitle = () => {
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    const originalTitle = document.title;

    const title =
      notification > 0
        ? `(${notification}) unread notifications`
        : originalTitle;

    document.title = title;

    return () => (document.title = originalTitle);
  }, [notification]);
  return (
    <>
      <button type="button" onClick={() => setNotification((n) => n + 1)}>
        Add Notification
      </button>
      <button type="button" onClick={() => setNotification(0)}>
        Clear Notifications
      </button>
    </>
  );
};

export default UpdateTitle;
