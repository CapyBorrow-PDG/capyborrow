const AnimatedText = (props) => {
  return(
    <div className="animatedsegment">
      <img src={props.image} alt="illustration" />
      <div className="animatedtext lighttext">
        <h1>{props.title}</h1>
        <h3>{props.desc}</h3>
      </div>
    </div>
  );
};

export default AnimatedText;