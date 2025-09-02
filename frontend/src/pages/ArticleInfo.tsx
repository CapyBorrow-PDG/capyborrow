import '../styles/ArticleInfo.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Searchbar from '../components/Searchbar.tsx';
import Calendar from '../components/Calendar.tsx';


const ArticleInfo = () => {
	const navigate = useNavigate();

	const availableDates = [
		new Date('2025-09-08'),
		new Date('2025-09-09'),
		new Date('2025-09-10'),
		new Date('2025-08-11'),
		new Date('2025-08-12'),
		new Date('2025-10-13'),
	];

	const location = useLocation();
	const { currSearch } = location.state || {};
	//Add Search bar
	const [search, setSearch] = useState(currSearch);

	return (
		<div>
			<Searchbar onChange={(e) => setSearch(e)} />
			<div id="container">
				<img src={"../assets/images/chargeur.jpg"} alt="Article" />
				<div id="compact-section">
					<div id="text-section">
						<h2>Chargeur Téléphone USB-C</h2>
						<h3><b>Price: </b>50p/day</h3>
						<p>Posted by <i>username0</i></p>
						<p><b>State: </b> good</p>
						<p><b>Localisation: </b>Martigny, VS</p>
					</div>
					<div id="top-button">
						<button className="darkbutton" onClick={() => alert("Prout")}>Contact Owner</button>
						<button className="darkbutton" onClick={() => alert("Prout")}>Add to collection</button>
					</div>
					<button className="darkbutton" id="bottom-button" onClick={() => alert("Prout")}>Borrow Article</button>
				</div>

				<div id="description-section">
					<h2>Description</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque magni est eius exercitationem sint, ea corporis sed, vel praesentium eligendi neque iusto? Omnis quos nobis est ratione, deleniti laborum! Dolorem, laborum laboriosam. Iure iste tempore nemo, cumque libero debitis dolore doloremque at saepe animi dicta nihil, quis facilis vel, facere neque dolores deleniti in quisquam ipsum accusamus aperiam. Ad, quae aspernatur, unde dolorem maxime quod, nesciunt sequi nam voluptas facilis alias. Tempore repellendus quibusdam perferendis at eius nisi voluptates qui ipsam, nulla ipsa debitis. Itaque atque in unde aliquam, quo debitis neque voluptas facere soluta! Quisquam aspernatur animi ipsam sed.</p>
				</div>
				<div id="calendar-section">
					<h3>Disponibility</h3>
					<Calendar disponibility={availableDates} mode={false} />
				</div>

				<h2 id="review-title">Reviews</h2>
				<h4 id="total-reviews"><b>Total Reviews:</b> 2</h4>
				<hr id="review-divider" />


				<div id="review-section">
					<div className="review">
						<h4>User1</h4>
						<p className="comment">Great article!</p>
						<h4>★★★★☆</h4>
					</div>
					<div className="review">
						<h4>User2</h4>
						<p className="comment">Not as described.</p>
						<h4>★★☆☆☆</h4>
					</div>
				</div>
				<div id="rating-summary">
					<h4 id="global-rating">4 ★★★★☆</h4>

					<div className="rating-line">
						<div className="side">5 ★</div>
						<div className="middle">
							<div className="bar-container">
								<div className="bar-5"></div>
							</div>
						</div>
						<div className="side right">0%</div>
					</div>

					<div className="rating-line">
						<div className="side">4 ★</div>
						<div className="middle">
							<div className="bar-container">
								<div className="bar-4"></div>
							</div>
						</div>
						<div className="side right">50%</div>
					</div>

					<div className="rating-line">
						<div className="side">3 ★</div>
						<div className="middle">
							<div className="bar-container">
								<div className="bar-3"></div>
							</div>
						</div>
						<div className="side right">0%</div>
					</div>

					<div className="rating-line">
						<div className="side">2 ★</div>
						<div className="middle">
							<div className="bar-container">
								<div className="bar-2"></div>
							</div>
						</div>
						<div className="side right">50%</div>
					</div>

					<div className="rating-line">
						<div className="side">1 ★</div>
						<div className="middle">
							<div className="bar-container">
								<div className="bar-1"></div>
							</div>
						</div>
						<div className="side right">0%</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleInfo;