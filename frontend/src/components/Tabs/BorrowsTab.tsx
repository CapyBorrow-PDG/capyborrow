import { useEffect, useState } from "react";
import ArticleList from "../ArticleList.tsx";

const BorrowsTab = (props) => {
  const [borrowsUser, setBorrowsUser] = useState([]);

  useEffect(() => {
    const getBorrowsUser = async () => {
      let userid = "";
      if(props.user) userid = props.user.id.toString();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/borrows/${userid}`)
      .then(data => data.json())
      .then(res => setBorrowsUser(res))
      .catch(err => console.log(err));
    }
    getBorrowsUser();
  }, [props.user])

  return(
    <ArticleList items={borrowsUser} />
  );
}

export default BorrowsTab;