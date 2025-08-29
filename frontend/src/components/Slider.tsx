import '../styles/Slider.css';
import Slider from 'react-slider';
import { useState } from 'react';

const MIN = 0;
const MAX = 1000;

const MySlider = () => {
  const [ values, setValues ] = useState([MIN, MAX]);
  return(
    <div>
      <div className="values">{values[0]} - {values[1]}</div>
      <Slider className="slider"
      value={values} onChange={setValues}
      min={MIN} max={MAX}
      step={5} />
    </div>
  );
};

export default MySlider;