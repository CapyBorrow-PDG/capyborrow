import Dropdown from "../Dropdown/Dropdown.tsx";
import ArticleList from "../ArticleList.tsx";
import { useEffect, useState } from "react";
import CreateCollectionForm from "../CreateCollectionForm.tsx";



const CollectionsTab = (props) => {

  type collection = {
    collection_id: number,
    name: string
  }

  const [currentCollectionInfo, setCurrentCollectionInfo] = useState<collection>();
  const [currentCollection, setCurrentCollection] = useState([]);
  const [userCollections, setUserCollections] = useState([]);

  useEffect(() => {
    const getUserCollections = async () => {
      let userid = "";
      if(props.user) userid = props.user.id.toString();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}/collections`)
      .then(data => data.json())
      .then(res => {
        setUserCollections(res);
        setCurrentCollectionInfo(res[0]);
      })
      .catch(err => console.log(err));
    }

    const getCollection = async () => {
      let userid = "", colid = "";
      if(props.user) userid = props.user.id.toString();
      if(currentCollectionInfo) colid = currentCollectionInfo?.collection_id.toString();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}/collections/${colid}`)
      .then(data => data.json())
      .then(res => setCurrentCollection(res))
      .catch(err => console.log(err));
    }

    getUserCollections();
    if(currentCollectionInfo) getCollection();

  }, [props.user, currentCollectionInfo])

  return (
    <div>
      <div className="collections-buttons">
        <Dropdown buttontext={currentCollectionInfo?.name || "collections"} content={
          userCollections?.map((col: collection) => (
            <p key={col.collection_id} className="clickable" onClick={() => setCurrentCollectionInfo(col)} >{col.name}</p>
          ))
        } />
        <CreateCollectionForm userid={props.user?.id} />
      </div>
      <ArticleList items={currentCollection} />
    </div>
  );
}

export default CollectionsTab;