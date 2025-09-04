import '../../styles/DemandBorrowTab.css';
import { useState, useEffect } from "react";

const DemandBorrowTab = (props) => {

  type demand = {
    borrow_id: number,
    item_id: number,
    owner_id: number,
    borrower_id: number,
    is_accepted: boolean,
    start_date: Date,
    end_date: Date,
    first_code: string,
    username: string
  }

  const [demands, setDemands] = useState<demand[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getDemands = async () => {
      let userid = "";
      userid = props.user.id.toString();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/borrows/demands/${userid}`)
      .then(data => data.json())
      .then(res => setDemands(res))
      .catch(err => console.log(err));
      setReload(false);
    }
    if(props.user) getDemands();
  }, [props.user, demands, reload])

  const acceptDemand = async (borrow_id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/borrows/${borrow_id}`, {
      method: 'PUT'
    }).then(data => data.json()).catch(err => console.log(err));
    setReload(true);
  }

  const denyDemand = async (borrow_id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/borrows/${borrow_id}`, {
      method: 'DELETE'
    }).then(data => data.json()).catch(err => console.log(err));
  }

  const formatDateISO = (date: Date) => {
    return new Date(date).toLocaleDateString('en-CA');  
  };

  return(
    <div>
      {
        demands?.map((d: demand) => (
          <div className="borrow-demand">
            <p>by <b>{d?.username}</b></p>
            <div className="demand-dates">
              <p>from: {formatDateISO(d?.start_date)}</p>
              <p>to: {formatDateISO(d?.end_date)}</p>
            </div>
            <div className="demand-buttons">
              <button className="darkbutton" onClick={() => acceptDemand(d?.borrow_id)}>accept</button>
              <button className="lightbutton" onClick={() => denyDemand(d?.borrow_id)}>deny</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default DemandBorrowTab;