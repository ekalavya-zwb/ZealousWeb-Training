import React, { useState } from "react";
import MyModal from "./ShowModal";

const Modal = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCloseModal = () => setDisplayModal(false);

  const mainModal = (
    <MyModal handleCloseModal={handleCloseModal}>
      <h2 className="text-3xl font-bold">This is a Modal</h2>
      <p className="mt-2 text-xl">
        I am a Modal that appears on the webpage after you click on the open
        modal button. Click on the close modal button below to close me.
      </p>
      <button
        type="button"
        className="mt-6 cursor-pointer rounded-md border bg-gray-200 px-4 py-2 font-semibold hover:bg-gray-300"
        onClick={handleCloseModal}
      >
        Close Modal
      </button>
    </MyModal>
  );

  return (
    <>
      <button
        type="button"
        className="m-4 cursor-pointer rounded-md border bg-gray-200 px-4 py-2 font-semibold hover:bg-gray-300"
        onClick={() => setDisplayModal(true)}
      >
        Open Modal
      </button>

      {displayModal && mainModal}

      <p className="p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laboriosam nemo ab aut omnis sequi sapiente maiores ducimus incidunt
        itaque aliquid, alias repellat et? Iusto rem itaque odit autem ipsa?
      </p>
    </>
  );
};

export default Modal;
