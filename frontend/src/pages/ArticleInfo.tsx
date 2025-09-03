import '../styles/ArticleInfo.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Searchbar from '../components/Searchbar.tsx';
import Calendar from '../components/Calendar.tsx';


const ArticleInfo = () => {
	const availableDates = [
		new Date(2025, 10, 10),
		new Date(2025, 10, 11),
		new Date(2025, 10, 15),
		new Date(2025, 10, 20),
		new Date(2025, 10, 21),
		new Date(2025, 10, 22)
	];

  type article = {
    name: string,
    description: string,
    price: number,
    username: string,
    state: string,
    picture: string,
    location: string
  }

	const params = useParams();
	const {articleId} = params.id ? {articleId: params.id} : {articleId: "1"};

	const [currArticle, setCurrArticle] = useState<article>();

	useEffect(() => {
		const fetchArticle = async () => {
      console.log(articleId);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/item/${articleId}`)
      .then(data => data.json())
      .then(res => {console.log(res);setCurrArticle(res[0])})
      .catch(err => console.log(err));
		};

		if (articleId) fetchArticle();
	}, [articleId]);


	return (
		<div>
			<Searchbar onChange={() => {}} />
			<div id="container">
				<img src={currArticle?.picture} alt="Article" />
				<div id="compact-section">
					<div id="text-section">
						<h2>{currArticle?.name}</h2>
						<h3><b>Price: </b>{currArticle?.price}p/day</h3>
						<p>Posted by <i className="username clickable" onClick={() => {}} >{currArticle?.username}</i></p>
						<p><b>State: </b>{currArticle?.state}</p>
						<p><b>Location: </b>{currArticle?.location}</p>
					</div>
					<div id="top-button">
						<button className="darkbutton" onClick={() => alert("Prout")}>Contact Owner</button>
						<button className="darkbutton" onClick={() => alert("Prout")}>Add to collection</button>
					</div>
					<button className="darkbutton" id="bottom-button" onClick={() => alert("Prout")}>Borrow Article</button>
				</div>

				<div id="description-section">
					<h2>Description</h2>
					<p>{currArticle?.description}</p>
				</div>
				<div id="calendar-section">
					<h3>Disponibility</h3>
					<Calendar disponibility={availableDates} mode={false} />
				</div>
				
				<div id="review-header">
					<div id="review-title">
						<h2>Reviews</h2>
					</div>
					<div id="total-reviews">
						<h4>Total Reviews: 2</h4>
					</div>
					<hr id="review-divider" />
				</div>


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