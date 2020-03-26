import React from 'react';

class SendMessageForm extends React.Component{
    constructor(){
        super()
        this.state= {
            message: ' '
        };
        this.handleChange = this.handleChange.bind();
        this.handleSubmit = this.handleSubmit.bind();
    }

    handleChange(e){
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ' '
        })
    }

    render(){
        return
        <form className="send-message-form" onSubmit={this.handleSubmit}>
            <input 
            placeholder = "Type message and hit Enter"
            type = "text"
            onChange= {this.handleChange}
            value = {this.state.message}
            disabled = {this.props.disabled}
            />
        </form>
    }
}

export default SendMessageForm