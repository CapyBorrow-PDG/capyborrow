import '../styles/Checkbox.css';

const Checkbox = (props) => {
  return(
    <div className="checkbox">
      <input type="checkbox" id={props.id} name={props.name} value={props.val} />
      <label htmlFor={props.id}>{props.val}</label>
    </div>
  );
}

export default Checkbox;