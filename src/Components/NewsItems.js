import React, { Component } from "react";


export class NewsItems extends Component {
	render() { 4
		// * array destructuring: 
		let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
		return (
			<div className="my-2">
				<div className="card " >
					{/* if image is null in API then we have create a if else function with a default image url from google ⬇️ */}
					<img
						src={!imageUrl ? "https://thumbs.dreamstime.com/b/live-breaking-news-television-broadcast-globe-gradient-blue-background-illustration-panorama-185818606.jpg" : imageUrl}
						className="card-img img-thumbnail "
						alt="..."
						style={{width: '1280', height: '720'}}
					/>
					<div className="card-body" >
						<span className="badge bg-danger" style={{ position: "absolute", left: "1%", top: "1%", zIndex: "1", border: "0px solid white", borderRadius: "0px" }}>{source}</span>
						<h5 className="card-title" style={{ fontFamily: "Rockwell Nova" }}>{title} </h5>
						<p className="card-text">{description}</p>
						<p className="card-text" ><small className="text"  > By <b> {!author ? "unknown" : author} </b> on {new Date(date).toGMTString()}</small></p>
						<a
							href={newsUrl}
							rel="noreferrer"
							target="_blank"
							className="btn btn-sm btn-primary">
							Read Full Article
						</a>

					</div>
				</div>
			</div>
		);
	}
}

export default NewsItems;
