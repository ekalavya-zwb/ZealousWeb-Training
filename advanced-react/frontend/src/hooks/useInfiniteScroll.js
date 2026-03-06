import React, { useState, useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (fetchFn, deps = []) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Reset when dependencies change (search/filter etc)
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, deps);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await fetchFn(page, controller.signal);

      setData((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, page, loading, hasMore]);

  // Intersection Observer
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore]);

  return { data, loading, error, hasMore, sentinelRef };
};

export default useInfiniteScroll;
