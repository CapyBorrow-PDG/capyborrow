import '../../styles/Tabs.css';
import { useState } from "react";

const Tabs = (props) => {

  const [activeTab, setActiveTab] = useState(0);

  return(
    <div className="darktext">
      <div className="tab-headers">
        {
          props.tabs.map((entry, index) => (
            <div
            key={index}
            className={`tab-header clickable ${activeTab === index ? "active" : ""}`}
            onClick={()=>{setActiveTab(index)}}
            >{entry.header}</div>
          ))
        }
      </div>
      <div className="tab-content">{props.tabs[activeTab].content}</div>
    </div>
  );
}

export default Tabs;