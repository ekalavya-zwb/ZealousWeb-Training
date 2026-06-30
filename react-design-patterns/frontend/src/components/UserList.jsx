export default function UserList({ users, isLoading, error }) {
  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error fetching users.</p>;
  }

  return (
    <>
      {users.data?.map((user) => (
        <div key={user.id} className="border-b p-4">
          <p className="font-bold">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
    </>
  );
}
