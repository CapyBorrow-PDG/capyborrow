const CreditButton = (props) => {
    return (
        <div className="creditButton">
            <div>
                <p>{props.desc}</p>
                <button className="darkbutton" onClick={() => alert("Give us money pls :(")}>
                    {props.text}
                </button>
            </div>
        </div>
    );
};

export default CreditButton;