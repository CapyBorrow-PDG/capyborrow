import AddItemPopup from "../Popups/AddItemPopup.tsx";
import ArticleList from "../ArticleList.tsx";
import { useEffect, useState } from "react";

const PostsTab = (props) => {

  const [itemOpen, setItemOpen] = useState(false);
  const [itemsUser, setItemsUser] = useState([]);

  useEffect(() => {
    const getItemsUser = async () => {
      const params = new URLSearchParams();
      if (props.user) params.append("user", props.user.id.toString());

      fetch(`${process.env.REACT_APP_BACKEND_URL}/item?${params.toString()}`)
      .then(data => data.json())
      .then(res => setItemsUser(res))
      .catch(err => console.log(err));
    }
    if(props.user) getItemsUser();
  }, [props.user]);

  return(
    <div>
      <button className="darkbutton" onClick={() => setItemOpen(true)}>+ add item</button>
      <AddItemPopup open={itemOpen} close={() => setItemOpen(false)} userId={props.user?.id} />
      <ArticleList items={itemsUser} />
    </div>
  );
}

export default PostsTab;