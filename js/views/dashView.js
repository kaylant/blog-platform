import React, {Component} from 'react'
import Header from './header'

// --------------- Dash View --------------- //

var DashView = React.createClass ({
	render: function() {
		return (
			<div className="dash">
				<Header/>
				<p>Welcome, {this.props.email}</p>
				<div className="dashOptions">
					<a href="#addpost">Add Post</a>
					<a href="#myposts">View My Posts</a>
					<a href="#allposts">View All Posts</a>
					<a href="#splash">Sign Out</a>
				</div>
			</div> 
			)
	}
})

export default DashView