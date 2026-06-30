import { useState } from "react";
import DisplayModal from "../components/DisplayModal";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpen = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);

  const mainModal = (
    <DisplayModal onClose={handleOnClose}>
      <h2 className="text-2xl font-semibold">Modal Title</h2>
      <p className="mt-4 text-gray-600">
        This is a simple modal. Click outside or press "Escape" to close it.
      </p>
      <button
        type="button"
        className="mt-6 cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        onClick={handleOnClose}
      >
        Close Modal
      </button>
    </DisplayModal>
  );

  return (
    <>
      <h2 className="text-center text-xl">Modal Pattern</h2>

      <button
        type="button"
        onClick={handleOnOpen}
        className="ml-4 cursor-pointer rounded-md bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
      >
        Open Modal
      </button>

      {isOpen && mainModal}

      <p className="p-4 text-gray-700">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
        quos minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia? Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quos
        minus et incidunt, eum iure beatae minima dolores architecto rem,
        quisquam unde iste dolore. Iusto, totam ea? Tempore, ut! Officia?
      </p>
    </>
  );
}
