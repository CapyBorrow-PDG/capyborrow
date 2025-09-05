import { useEffect, useState } from "react";

const CreditButton = (props) => {

    type Data = {
        user_id,
        points
    }

    const [data, setData] = useState<Data>();

    const handleAddPoint = async (e) => {
        e.preventDefault();
        const new_points = props.current_points + props.point_value;
        setData({
            user_id: props.user_id,
            points: new_points
        });
        console.log("data", data);
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${props.user_id}/credit`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(data => data.json()).catch(err => console.error("Error adding points", err));
        //window.location.reload();
    }
    
    useEffect(() => {
        const new_points= props.current_points + props.point_value;
        setData({
            user_id: props.user_id,
            points: new_points
        })
    }, [])

    return (
        <div className="creditButton">
            <div>
                <p>{props.point_value} points</p>
                <button className="darkbutton" onClick={handleAddPoint}>
                    {props.money_value}.00 CHF
                </button>
            </div>
        </div>
    );
};

export default CreditButton;