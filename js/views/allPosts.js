import React, {Component} from 'react'
import Header from './header'

var AllPosts = React.createClass ({
	render: function() {
		return (
			<div className="myPostsList">
				<Header/>
				<div className="dashOptions">
					<a href="#addpost">Add Post</a>
					<a href="#myposts">View My Posts</a>
					<a href="#allposts">View All Posts</a>
					<a href="#splash">Sign Out</a>
				</div>
				<p>Posts from everyone!!</p>
			</div>
			)
	}
})

export default AllPosts