import '../../styles/Dropdown.css';

const DropdownContent = ({children, open}) => {
  return(
    <div className={`dropdown-content ${open ? 'content-open' : ''}`}>{children}</div>
  );
};

export default DropdownContent;