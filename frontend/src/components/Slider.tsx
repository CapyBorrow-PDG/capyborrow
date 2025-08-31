import '../styles/Slider.css';
import Slider from 'react-slider';
import { useEffect, useState } from 'react';

const MIN = 0;
const MAX = 1000;

const MySlider = (props) => {
  const [minval, setMinVal] = useState(MIN);
  const [maxval, setMaxVal] = useState(MAX);

  const changeVals = (val: number[]) => {
    setMinVal(val[0]);
    setMaxVal(val[1]);
    props.onChange(val);
  }

  useEffect(() => {
    props.onChange([MIN, MAX]);
  }, []);

  return(
    <div>
      <div className="values">
        <input id="min-price" type="number" value={minval} onChange={e => {setMinVal(Number(e.target.value))}}></input>
         - 
        <input id="max-price" type="number" value={maxval} onChange={e => {setMaxVal(Number(e.target.value))}}></input>
      </div>
      <Slider className="slider"
      value={[minval, maxval]} onChange={changeVals}
      min={MIN} max={MAX}
      step={5} />
    </div>
  );
};

export default MySlider;