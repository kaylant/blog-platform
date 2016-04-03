import React, {Component} from 'react'
import Header from './header'
import AddPost from './addPost'

// --------------- My Posts --------------- //

var MyPosts = React.createClass ({

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