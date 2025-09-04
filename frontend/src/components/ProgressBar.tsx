

const ProgressBar = (props) => {
  const fillStyle = {
    height: '100%',
    width: `${props.percent}%`,
    backgroundColor: `${props.color}`
  }

  return(
    <div className={props.className}>
      <div style={fillStyle}></div>
    </div>
  );
}

export default ProgressBar;