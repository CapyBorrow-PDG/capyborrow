import '../../styles/Dropdown.css';

const DropdownContent = ({children, open}) => {
  return (open) ? (
    <div className={`dropdown-content`}>{children}</div>
  ) : null;
};

export default DropdownContent;