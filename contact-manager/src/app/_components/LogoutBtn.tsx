import { logoutAction } from "../actions/auth";

export default function LogoutBtn() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="cursor-pointer rounded-md bg-red-600 px-2 py-1 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </form>
  );
}
