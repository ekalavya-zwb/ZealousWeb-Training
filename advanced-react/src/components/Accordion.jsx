import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import "../styles/Accordion.css";

const AccordionContext = createContext(null);

const Item = ({ id, children }) => {
  return (
    <div className="accordion-item" data-id={id}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { id }),
      )}
    </div>
  );
};

const Header = ({ children, id }) => {
  const { toggleItem } = useContext(AccordionContext);

  return (
    <button className="accordion-header" onClick={() => toggleItem(id)}>
      {children}
    </button>
  );
};

const Body = ({ children, id }) => {
  const { openIds, allowMultiple } = useContext(AccordionContext);

  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const isOpen = allowMultiple ? openIds.includes(id) : openIds === id;

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className="accordion-body"
      style={{
        height,
        overflow: "hidden",
        transition: "height 0.3s ease",
      }}
    >
      <div ref={contentRef} className="accordion-content">
        {children}
      </div>
    </div>
  );
};

const Accordion = ({ children, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState(allowMultiple ? [] : null);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setOpenIds((prev) => (prev === id ? null : id));
    }
  };

  return (
    <AccordionContext.Provider value={{ openIds, toggleItem, allowMultiple }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Body = Body;

export default Accordion;
