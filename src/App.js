import "./App.css";
import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
	pageSize = 9;
	apiKey = process.env.REACT_API_KEY;

	state = {
		progress: 0,
	}
	setProgress = (progress) => {
		this.setState({ progress: progress })
	}
	// example code for class based components
	render() {
		return (
			<div>
				<Router>
					<NavBar />
					<LoadingBar
						height={3}
						color=' linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 57%, rgba(252,176,69,1) 100%)'
						progress={this.state.progress}
					/>
					<Switch>
						<Route exact path="/"> <News setProgress={this.setProgress}   key="general" pageSize={this.pageSize} country="in" category="general" /></Route>
						<Route exact path="/business"> <News setProgress={this.setProgress}   key="business" pageSize={this.pageSize} country="in" category="business" /></Route>
						<Route exact path="/entertainment" > <News setProgress={this.setProgress}   key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" /></Route>
						<Route exact path="/health"> <News setProgress={this.setProgress}   key="health" pageSize={this.pageSize} country="in" category="health" /></Route>
						<Route exact path="/science"> <News setProgress={this.setProgress}   key="science" pageSize={this.pageSize} country="in" category="science" /></Route>
						<Route exact path="/sports" > <News setProgress={this.setProgress}   key="sports" pageSize={this.pageSize} country="in" category="sports" /></Route>
						<Route exact path="/technology" > <News setProgress={this.setProgress}   key="technology" pageSize={this.pageSize} country="in" category="technology" /></Route>
					</Switch>
				</Router>
			</div>
		);
	}
}
