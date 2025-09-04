import '../styles/Slider.css';
import Slider from 'react-slider';
import { useEffect, useState } from 'react';

const MySlider = (props) => {
  const [minval, setMinVal] = useState(props.startMin);
  const [maxval, setMaxVal] = useState(props.startMax);

  const changeVals = (val: number[]) => {
    setMinVal(val[0]);
    setMaxVal(val[1]);
    props.onChange(val);
  }

  return(
    <div>
      <div className="values">
        <input id="min-price" type="number" value={minval} onChange={e => {setMinVal(Number(e.target.value))}}></input>
         - 
        <input id="max-price" type="number" value={maxval} onChange={e => {setMaxVal(Number(e.target.value))}}></input>
      </div>
      <Slider className="slider"
      value={[minval, maxval]} onChange={changeVals}
      min={props.MIN} max={props.MAX}
      step={5} />
    </div>
  );
};

export default MySlider;