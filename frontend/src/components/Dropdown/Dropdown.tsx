import '../../styles/Dropdown.css';
import DropdownButton from "./DropdownButton.tsx";
import DropdownContent from "./DropdownContent.tsx";
import { useEffect, useRef, useState } from 'react';

const Dropdown = (props) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if(open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    }

  }, [open]);

  return(
    <div className="dropdown" ref={ref}>
      <DropdownButton text={props.buttontext} open={open} toggle={toggleOpen}/>
      <DropdownContent open={open}>{props.content}</DropdownContent>
    </div>
  );
};

export default Dropdown;