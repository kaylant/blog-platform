import React, {Component} from 'react'
import Header from './header'
import AddPost from './addPost'
import MyPosts from './myPosts'

// --------------- All Posts --------------- //

var AllPosts = React.createClass ({

	componentDidMount: function() {
		console.log("running")
		var self = this
		this.props.allPostsColl.on('sync', function() {self.forceUpdate()})
	},

	_makePostComponent: function(model, i) {
		console.log('working')
		return <SinglePost postsData={model} key={i} />
	},

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
				{this.props.allPostsColl.map(this._makePostComponent)}
			</div>
			)
	}
})

var SinglePost = React.createClass ({
	render: function() {
		return (
			<div className="post">
				<p>{this.props.postsData.get('title')}</p>
				<p>{this.props.postsData.get('content')}</p>
			</div>
			)
	}
})

export default AllPosts