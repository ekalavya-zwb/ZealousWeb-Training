import React, { useState, useCallback, useEffect, useRef } from "react";

const useAsync = (asyncFn, immediate = true) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args) => {
      setStatus("loading");
      setError(null);

      try {
        const response = await asyncFn(...args);

        if (!mountedRef.current) return;

        setValue(response);
        setStatus("success");

        return response;
      } catch (error) {
        if (!mountedRef.current) return;

        setError(error);
        setStatus("error");

        throw error;
      }
    },
    [asyncFn],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { status, value, error, execute };
};

export default useAsync;
