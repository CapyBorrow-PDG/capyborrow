import '../styles/Credit.css';
//import { useNavigate } from 'react-router-dom';
import CreditButton from "../components/CreditButton.tsx";

const Credit = () => {

	//const navigate = useNavigate();

    return(
        <div id="section1">
            <h2>username0</h2>
            <h3>275 points</h3>
            <div id="buttonSection">
                <CreditButton desc="+10 points" text="3.00CHF" />
				<CreditButton desc="+25 points" text="7.00CHF" />
				<CreditButton desc="+50 points" text="13.00CHF" />
				<CreditButton desc="+100 points" text="25.00CHF" />
            </div>
        </div>
    );
};

export default Credit; 