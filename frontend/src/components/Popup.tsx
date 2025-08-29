import '../styles/Popup.css';

const MyPopup = (props) => {
  return (props.open) ? (
    <div className="popup">
      <div className="popup__content">
        {props.children}
      </div>
    </div>
  ) : null;
}

export default MyPopup;