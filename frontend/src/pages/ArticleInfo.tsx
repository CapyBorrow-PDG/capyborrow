import '../styles/ArticleInfo.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Searchbar from '../components/Searchbar.tsx';
import Calendar from '../components/Calendar.tsx';
import { Rating } from '@mui/material';
import ProgressBar from '../components/ProgressBar.tsx';
import { AiFillStar } from 'react-icons/ai';

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

  type review = {
    review_id: number,
    rating: number,
    username: string,
    comment: string
  }

	const params = useParams();
	const {articleId} = params.id ? {articleId: params.id} : {articleId: "1"};

	const [currArticle, setCurrArticle] = useState<article>();
  const [reviews, setReviews] = useState([]);
  const [reviewPercentages, setReviewPercentages] = useState<Map<number, number>>();
  const [meanRating, setMeanRating] = useState(0);

	useEffect(() => {
		const fetchArticle = async () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/item/${articleId}`)
      .then(data => data.json())
      .then(res => setCurrArticle(res[0]))
      .catch(err => console.log(err));

      fetch(`${process.env.REACT_APP_BACKEND_URL}/item/${articleId}/review`)
      .then(data => data.json())
      .then(res => setReviews(res))
      .catch(err => console.log(err));
		};

		if(articleId) fetchArticle();
    if(reviews.length > 0) {
      setMeanRating(reviews.map((el: review) => el.rating).reduce((prev, cur) => prev + cur) / reviews.length);

      let percents: Map<number, number> = reviews.map((v: review) => v.rating)
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

      setReviewPercentages(percents);
    }
	}, [articleId, reviews]);


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
						<h4>Total Reviews: {reviews.length}</h4>
					</div>
					<hr id="review-divider" />
				</div>


				<div id="review-section">
          {
            reviews?.map((rev: review) => (
              <div key={rev.review_id} className="review">
                <h4>{rev.username}</h4>
                <p className="comment">{rev.comment}</p>
                <Rating sx={{'& .MuiRating-iconFilled': {color: 'teal'}}} value={rev.rating} precision={0.5} readOnly />
              </div>
            ))
          }
				</div>
				<div id="rating-summary">
          <div id="global-rating">
            <h4 id="mean-rating">{meanRating}</h4>
            <Rating sx={{'& .MuiRating-iconFilled': {color: 'teal'}}} value={meanRating} precision={0.5} readOnly />
          </div>

          {
            [5, 4, 3, 2, 1].map((r) =>  {
              let percent = reviewPercentages?.get(r)! * 100 / reviews.length || 0;
                return(
                  <div className="rating-line">
                  <div className="side">{r} <AiFillStar /> </div>
                  <div className="middle">
                    <ProgressBar className="bar-container" percent={percent} color='teal' />
                  </div>
                  <div className="side right">{percent}%</div>
                </div>
                );
              })
          }
				</div>
			</div>
		</div>
	);
};

export default ArticleInfo;