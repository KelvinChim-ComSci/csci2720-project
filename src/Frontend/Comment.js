import React from "react";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: ""
    }
    //this.checkValid = this.checkValid.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  onChangeValue(e) {
    if (!e) {
      this.setState({newComment: ""});
    } else {
      this.setState({newComment: e.target.value});
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  async createComment() {
    await fetch(
      `http://csci2720-g114.cse.cuhk.edu.hk/createComment`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          locID: this.props.locID,
          username: this.props.username,
          comment: this.state.newComment
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.onChangeValue();
        this.refreshPage();
        // this.props.updateHandler();
      })
  }

  checkValid(event) {
    event.preventDefault();
    if (this.state.newComment != "") {
      this.createComment();
    } else alert("Your comment cannot be empty.")
  }

  render() {
    return (
      <div>
        {/*fetch comment*/}
        {this.props.comments.map((value) => {
          return (
            <div id="comments"> 
              <div>
                <span>
                  <h5>{value.username + "     " + value.timestamp}</h5>
                </span>
                
                <p>{value.comment}</p>
              </div>
              <br />
            </div> 
          )
        })}
        {/*create comment*/}
        <form onSubmit={(event) => this.checkValid(event)}>
          <div onChange={this.onChangeValue}>
            <label for="new-comment" class="form-label">Add your own comment: </label>
            <textarea 
              type="text" 
              class="form-control"
              id="new-comment"
              value={this.state.newComment}
              placeholder="Hello World!"
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" value="Submit">Add comment</button>
        </form>
      </div>
    )
  }
}

export default Comment