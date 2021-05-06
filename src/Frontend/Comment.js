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
    console.log("e.target.value: " + e.target.value);
    this.setState({ newComment: e.target.value });
  }

  createComment() {
    fetch(
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
      .then()
  }

  checkValid() {
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
                  <h5>{value.username}</h5>
                  <h5>{value.time}</h5>
                </span>
                
                <p>{value.comment}</p>
              </div>
            </div> 
          )
        })}
        {/*create comment*/}
        <form>
          <div onChange={this.onChangeValue}>
            <label for="new-comment" class="form-label">Comment</label>
            <textarea type="text" class="form-control" id="new-comment" placeholder="Hello World!" rows="3" required></textarea>
          </div>
        <button type="button" onClick={() => this.checkValid()}>Add comment</button>
        </form>
      </div>
    )
  }
}

export default Comment