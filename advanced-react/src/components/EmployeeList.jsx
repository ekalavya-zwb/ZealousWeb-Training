import useInfiniteScroll from "../hooks/useInfiniteScroll";

const fetchEmployees = async (page, signal) => {
  const res = await fetch(
    `https://dummyjson.com/users?limit=10&skip=${(page - 1) * 10}`,
    { signal },
  );

  const data = await res.json();

  return {
    items: data.users,
    hasMore: data.users.length > 0,
  };
};

const EmployeeList = () => {
  const { data, loading, error, hasMore, sentinelRef } =
    useInfiniteScroll(fetchEmployees);

  return (
    <div>
      {data.map((emp) => (
        <div key={emp.id}>
          {emp.firstName} {emp.lastName}
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}

      {hasMore && <div ref={sentinelRef} style={{ height: 20 }} />}
    </div>
  );
};

export default EmployeeList;
