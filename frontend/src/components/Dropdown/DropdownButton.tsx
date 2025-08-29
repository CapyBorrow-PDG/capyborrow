import '../../styles/Dropdown.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const DropdownButton = (props) => {
  return(
    <div data-testid="dropdownbutton" className={`dropdown-button ${props.open ? 'button-open' : ''}`}
      onClick={props.toggle}>
      {props.text}
      <span className="dropdown-button__icon">{props.open ? <FaChevronUp /> : <FaChevronDown />}</span>
    </div>
  );
};

export default DropdownButton;