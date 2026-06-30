export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      <p className="text-lg text-gray-600">
        Welcome to the Dashboard! Only authenticated users can access it.
      </p>
    </div>
  );
}
