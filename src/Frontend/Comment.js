/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: ""
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  onChangeValue(e) {
    if (!e) {
      this.setState({ newComment: "" });
    } else {
      this.setState({ newComment: e.target.value });
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  async createComment() {
    await fetch(
      `http://csci2720-g96.cse.cuhk.edu.hk/createComment`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          locID: this.props.locID,
          username: window.localStorage.getItem("username"),
          comment: this.state.newComment
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.onChangeValue();
        this.refreshPage();
        // this.props.updateHandler();
      })
  }

  checkValid(event) {
    event.preventDefault();
    if (this.state.newComment !== "") {
      this.createComment();
    } else alert("Your comment cannot be empty.")
  }

  render() {
    return (
      <div>
        {/*fetch comment*/}
        {this.props.comments.map((value) => {
          var date = new Date(value.timestamp);
          var convertedMonth = date.getMonth() + 1;
          var formalDate = date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0') +
            '  ' +
            date.getDate().toString().padStart(2, '0') +
            '/' +
            convertedMonth.toString().padStart(2, '0') +
            '/' +
            date.getFullYear().toString()
          return (
            <div id="comments">
              <div>
                <span>
                  <p>{value.username}   {formalDate}</p>
                  <h4>{value.comment}</h4>
                </span>
              </div>
            </div>
          )
        })}
        {/*create comment*/}
        <form  onSubmit={(event) => this.checkValid(event)}>
          <div className="createCommitForm" onChange={this.onChangeValue}>
            <label for="new-comment">Add your own comment: </label>
            <br></br>
            <textarea
              type="text"
              class="form-control"
              id="new-comment"
              value={this.state.newComment}
              className="commentBox"
              placeholder="Leave some comment on this location!"
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