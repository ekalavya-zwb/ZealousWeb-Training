import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    image: null,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      //   formDataToSend.append("image", formData.image);
      formData.image.forEach((file) => {
        formDataToSend.append("image", file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="m-4 grid grid-cols-4 gap-4">
      <div className="w-full rounded-2xl bg-gray-100 p-8">
        <h1 className="mb-5 text-2xl font-semibold text-gray-800">
          Upload Image
        </h1>
        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Upload
            </label>
            <input
              type="file"
              id="image"
              name="image"
              //   onChange={(e) =>
              //     setFormData({ ...formData, image: e.target.files[0] })
              //   }
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setFormData({ ...formData, image: files });
              }}
              multiple
              accept="image/*"
              required
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-2 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
