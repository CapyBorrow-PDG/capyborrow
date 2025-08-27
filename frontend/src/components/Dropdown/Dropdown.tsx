import '../../styles/Dropdown.css';
import DropdownButton from "./DropdownButton.tsx";
import DropdownContent from "./DropdownContent.tsx";
import { useState } from 'react';

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  return(
    <div className="dropdown">
      <DropdownButton text={props.buttontext} open={open} toggle={toggleOpen}/>
      <DropdownContent open={open}>{props.content}</DropdownContent>
    </div>
  );
};

export default Dropdown;