"use client";

import { FiTrash } from "react-icons/fi";
import { deleteContactAction } from "../actions/contact";

export default function DeleteContactBtn({ id }: { id: string }) {
  return (
    <form
      action={async (formData) => {
        if (!confirm("Are you sure you want to delete this contact?")) {
          return;
        }
        await deleteContactAction(formData);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="cursor-pointer rounded border border-red-500 px-2 py-1 text-red-500 hover:bg-red-100 hover:text-red-700"
      >
        <div className="flex items-center gap-1">
          <FiTrash /> Delete
        </div>
      </button>
    </form>
  );
}
