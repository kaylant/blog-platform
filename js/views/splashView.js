import React, {Component} from 'react'
import Header from './header'

// --------------- Splash View --------------- //

var SplashView = React.createClass ({
	email: '',
	password: '',

	_grabUserEmail: function(evt) {
		evt.preventDefault() // prevents from a complete page refresh
		this.email = evt.target.value
	},

	_grabUserPassword: function(evt) {
		evt.preventDefault()
		this.password = evt.target.value
	},

	_handleSignIn: function() {
		this.props.boundSignUserIn(this.email, this.password)
	},

	_handleSignUp: function() {
		this.props.boundSignUserUp(this.email, this.password)
	},

	render: function() {
		var errorMsg = ''
		return (
			<div className="splash">
				<Header/>
				<div className="signInContainer">
					<p className="error">{errorMsg}</p>
					<input onChange={this._grabUserEmail}/>
					<input type="password" onChange={this._grabUserPassword}/>
					<button onClick={this._handleSignIn}>Sign In</button>
					<button onClick={this._handleSignUp}>Sign Up</button>
				</div>
			</div>
			)
	}
})

export default SplashView