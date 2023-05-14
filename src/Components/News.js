import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
	static defaultProps = {
		country: 'in',
		category: 'general',
		pageSize: 8,
	}
	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	}

	capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	constructor(props) {
		super(props)
		this.state = {
			articles: [],
			loading: true,
			page: 1,
			totalResults: 0,
		}

		document.title = `${this.capitalizeFirstLetter(
			this.props.category
		)}- RapidNews`
	}

	async updateNews() {
		this.props.setProgress(10)
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24d8922aa2134799af3a25e6fbf2bb3d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		this.setState({ loading: true })
		let data = await fetch(url)
		this.props.setProgress(30)
		let parsedData = await data.json()
		this.props.setProgress(70)
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		})
		this.props.setProgress(100)
	}

	async componentDidMount() {
		this.updateNews()
	}

	fetchMoreData = async () => {
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24d8922aa2134799af3a25e6fbf2bb3d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
		
		this.setState({ page: this.state.page + 1 })
		let data = await fetch(url)
		let parsedData = await data.json()
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalResults: parsedData.totalResults,
		})
	}

	// handlePreviClick = async () => {
	// 	this.setState({ page: this.state.page - 1 })
	// 	this.updateNews()
	// }

	// handleNextClick = async () => {
	// 	this.setState({ page: this.state.page + 1 })
	// 	this.updateNews()
	// }

	render() {
		return (
			<>
				<h1
					className="text-center"
					style={{
						margin: '95px 0px 42px',
						fontFamily: "Perpetua Titling MT",
						// fontFamily: 'Prompt',
						fontSize: '40px',
					}}
				>
					Rapid-News-{' '}
					{this.capitalizeFirstLetter(this.props.category)} top
					headlines{' '}
				</h1>
				{this.state.loading && <Spinner />}

				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={
						this.state.articles.length !== this.state.totalResults
					}
					loader={<Spinner />}
				>
					<div className="container">
						<div className="row ">
							{this.state.articles.map((element) => {
								return (
									<div className="col-md-4" key={element.url}>
										<NewsItems
											title={
												element.title
													? element.title
													: ' '
											}
											description={
												element.description
													? element.description
													: ' '
											}
											newsUrl={element.url}
											imageUrl={element.urlToImage}
											author={element.author}
											date={element.publishedAt}
											source={element.source.name}
										/>
									</div>
								)
							})}
						</div>
					</div>
				</InfiniteScroll>

				{/* <div className="d-flex justify-content-between">
						<button
							disabled={this.state.page <= 1}
							type="button"
							className="btn btn-dark"
							onClick={this.handlePreviClick}>
							&larr; Previous
						</button>
						<button
							disabled={
								this.state.page + 1 >
								Math.ceil(
									this.state.totalResults /
										this.props.pageSize
								)
							}
							type="button"
							onClick={this.handleNextClick}
							className="btn btn-dark">
							Next &rarr;
						</button>
					</div> */}
			</>
		)
	}
}

export default News
