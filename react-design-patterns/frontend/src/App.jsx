import "./App.css";
import PostCard from "./containers/PostCard";
// import { Routes, Route } from "react-router-dom";
// import CountDown from "./components/CountDown";
// import StopWatch from "./components/StopWatch";
// import UserContainer from "./containers/UserContainer";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
// import WithAuth from "../hoc/withAuth";
// import Modal from "./containers/Modal";

// const AuthenticatedDashboard = WithAuth(Dashboard);
// const AuthenticatedProfile = WithAuth(Profile);

function App() {
  return (
    <>
      <h1 className="p-4 text-center text-2xl font-semibold">
        React Design Patterns
      </h1>
      {/* <UserContainer /> */}
      {/* <StopWatch />
      <CountDown initialSeconds={20} /> */}
      {/* <Routes>
        <Route path="/dashboard" element={<AuthenticatedDashboard />} />
        <Route path="/profile" element={<AuthenticatedProfile />} />
        <Route
          path="/"
          element={
            <div className="flex h-screen flex-col items-center justify-center gap-4">
              <h1 className="text-4xl font-semibold">Home</h1>
              <p className="text-lg text-gray-600">
                Welcome to the Home Page! Login to access your dashboard.
              </p>
            </div>
          }
        />
      </Routes> */}
      {/* <Modal /> */}
      <PostCard>
        <PostCard.Title title="First Post" />
        <PostCard.Content content="This is the first post on our new blog." />
        <PostCard.User author="John Doe" />
        <PostCard.Buttons />
      </PostCard>
    </>
  );
}

export default App;
