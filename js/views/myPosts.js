import React, {Component} from 'react'
import Header from './header'
import AddPost from './addPost'

// --------------- My Posts --------------- //

var MyPosts = React.createClass ({

	componentDidMount: function() {
		console.log("running")
		var self = this
		this.props.myPostsColl.on('sync', function() {self.forceUpdate()})
	},

	getInitialState: function() {
		return {
			myPostsColl: this.props.myPostsColl
		} 
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
				{this.props.myPostsColl.map(this._makePostComponent)}
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

export default MyPosts