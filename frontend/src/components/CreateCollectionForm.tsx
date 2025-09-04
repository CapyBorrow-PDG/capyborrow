

const CreateCollectionForm = (props) => {

  const createCollection = async () => {
    const colname = (document.getElementById("collection-name-input") as HTMLInputElement).value;
    const form = {name: colname};
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${props.userid?.toString()}/collections`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(form)
    }).then(data => data.json()).catch(err => console.log(err));
  }

  return(
    <form onSubmit={createCollection}>
      <input type="text" id="collection-name-input" placeholder="new collection name"/>
      <input type="submit" className="darkbutton clickable" value="create new collection" />
    </form>
  );
};

export default CreateCollectionForm;