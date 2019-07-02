import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../store'

export class NewMessageEntry extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /*
  handleChange(evt) {
    this.props.submitMessage(evt.target.value)
  }
  */

  handleSubmit(evt) {
    evt.preventDefault()
    const message = evt.target.content.value
    this.props.submitMessage({
      content: message,
      channelId: this.props.channelId
    })
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            //value={this.props.newMessageEntry}
            //onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  newMessageEntry: state.newMessageEntry
})

const mapDispatchToProps = dispatch => ({
  submitMessage: string => dispatch(sendMessage(string))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry)
