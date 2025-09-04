import MyPopup from './Popup.tsx';
import Dropdown from '../Dropdown/Dropdown.tsx';
import CreateCollectionForm from '../CreateCollectionForm.tsx';
import { useState, useEffect } from "react";

const AddToCollectionPopup = (props) => {

  type collection = {
    collection_id: number,
    name: string
  }

  const [open, setOpen] = useState(false);
  const [currentCollectionInfo, setCurrentCollectionInfo] = useState<collection>();
  const [userCollections, setUserCollections] = useState<collection[]>([]);

  useEffect(() => {
    const getUserCollections = async () => {
      let userid = props.userid?.toString();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}/collections`)
      .then(data => data.json())
      .then(res => {
        setUserCollections(res);
        setCurrentCollectionInfo(res[0]);
      })
      .catch(err => console.log(err));
    }
  
  if(props.userid) getUserCollections();

  }, [props.userid, currentCollectionInfo, userCollections]);

  const addToCollection = async () => {
    
    let form = {
      item_id: props.articleId
    }

    let userid = props.userid?.toString();
    let colid = currentCollectionInfo?.collection_id;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}/collections/${colid}`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(form)
    }).then(data => data.json()).catch(err => console.log(err));
  }

  return(
    <div>
      <button className="collection-button darkbutton" onClick={() => setOpen(true)}>Add to collection</button>
      <MyPopup open={open}>
        <div className="collection-popup">
          <CreateCollectionForm userid={props.userid} />
          <form className="collection-form" onSubmit={addToCollection} >
            <p>Choose a collection</p>
            <Dropdown buttontext={currentCollectionInfo?.name || "collections"} content={
              userCollections?.map((col: collection) => (
                <p key={col.collection_id} style={{margin: '2px'}} className="clickable" onClick={() => setCurrentCollectionInfo(col)} >{col.name}</p>
              ))
            } />
            <div className="update-form-buttons">
              <input className="darkbutton rounded clickable" type="submit" value="Submit" />
              <button className="lightbutton" onClick={() => {setOpen(false);}}>cancel</button>
            </div>
          </form>
        </div>
      </MyPopup>
    </div>
  );
};

export default AddToCollectionPopup;