import React from "react";

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: ''
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleUsername = (e) =>{
        const username = e.target.value;
        this.setState({username: username})
    }

    handleClick = () =>{
        this.props.passUsername(this.state.username);
    }

    render(){
        return(
            <section className='login-section'>
                <article className='username-section'>
                    <label htmlFor='username' className='username-label'>Username:</label>
                    <input name='username' id='username' value={this.state.username} onChange={this.handleUsername} className='username-input' autoFocus={true}/>
                </article>
                <button type='button' onClick={this.handleClick} className='login-btn'>Log in</button>
            </section>
        )
    }
}

export default Login;

