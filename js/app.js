// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'bbfire'
import Firebase from 'firebase'

import SplashView from './views/splashView'
import DashView from './views/dashView'
import AddPost from './views/addPost'
import MyPosts from './views/myPosts'

function app() {

	// --------------- Collection/Models --------------- //
	var MyPostModel = Backbone.Model.extend ({
		defaults: {
			'title': "",
			'content': ""
		}
	})

	var MyPostsCollection = Backbone.Firebase.Collection.extend ({
		url: "https://blog-platform.firebaseio.com/users",
		model: MyPostModel,

		initialize: function(uid) {
			this.url = `https://blog-platform.firebaseio.com/users${uid}/myposts`
		}
	})

	// --------------- Router --------------- //
	var BlogRouter = Backbone.Router.extend ({
		routes: {
			"splash"   : "toSplash",
			"dash"     : "toDash",
			"myposts"  : "toMyPosts",
			"addpost"  : "toAddPost",
			"allposts" : "toAllPosts"
		},

		initialize: function(){
			this.ref = new Firebase("https://blog-platform.firebaseio.com/")
			var auth = this.ref.getAuth()
			if (!auth) location.hash = "splash" // if user is not registered, route them back to splash page

			this.on("all", function() {
				if (!this.ref.getAuth()) location.hash = "splash"
			}, this)
		},

		toSplash: function(){
			var boundSignUserIn = this._signUserIn.bind(this)
			var boundSignUserUp = this._signUserUp.bind(this)
			DOM.render(<SplashView error={null} boundSignUserIn={boundSignUserIn} boundSignUserUp={boundSignUserUp}/>, document.querySelector('.container'))
			window.location.hash = "splash"
		},

		// code from Firebase
		_signUserIn: function(submittedEmail, submittedPassword) {
			var ref = this.ref
			var handler = function(error, authData) {
				if (error) {
					console.log("Login Failed!", error)
				} else {
					console.log("Authenticated successfully")
					console.log(authData)
					location.hash = "dash"
				}
			}
			ref.authWithPassword({
				email    : submittedEmail,
				password : submittedPassword
			}, handler)  	
		},

		// code from Firebase
		_signUserUp: function(submittedEmail, submittedPassword) {
			var ref = this.ref
			var boundSignUserIn = this._signUserIn.bind(this)
			var boundSignUserUp = this._signUserUp.bind(this)
			var storeUser = function(userData) {
				ref.child('users').child(userData.uid).set({email:submittedEmail})
			}
			var handler = function(error, userData) {
				if (error) {
					console.log("Error creating user:", error)
					DOM.render(<SplashView error={error} boundSignUserIn={boundSignUserIn} boundSignUserUp={boundSignUserUp} />, document.querySelector('.container'))
				} else {
					console.log("Successfully created user account with uid:", userData.uid)
					storeUser(userData)
					boundSignUserIn(submittedEmail, submittedPassword)
				}
			}
			ref.createUser({
				email    : submittedEmail,
				password : submittedPassword				
			}, handler)
		},

		toDash: function(){
			DOM.render(<DashView email={this.ref.getAuth().password.email}/>, document.querySelector('.container'))
			window.location.hash = "dash"
		},

		toMyPosts: function(){
			var mc = new MyPostsCollection(this.ref.getAuth().uid)
			DOM.render(<MyPosts email={this.ref.getAuth().password.email} myPostsColl={mc}/>, document.querySelector('.container'))
			window.location.hash = "myposts"			
		},

		toAddPost: function(){
			// pass collection down to add post
			DOM.render(<AddPost/>, document.querySelector('.container'))
			window.location.hash = "addpost"
		},

		toAllPosts: function(){ // posts by all users
			DOM.render(<p>View All Posts</p>, document.querySelector('.container'))
			window.location.hash = "allposts"
		}
	})

	var rtr = new BlogRouter()

	Backbone.history.start()

}

app()
