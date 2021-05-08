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
          //console.log("value.timestamp: " + value.timestamp);
          //console.log("date: " + date);
          var formalDate = date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0') +
            '  ' +
            date.getDate().toString().padStart(2, '0') +
            '/' +
            convertedMonth.toString().padStart(2, '0') +
            '/' +
            date.getFullYear().toString()
          //console.log("formalDate: " + formalDate);
          //console.log(formalDate);
          // console.log("hours: " + value.timestamp.getHours().toString());
          return (
            <div id="comments">
              <div>
                <span>
                  <p>{value.username}   {formalDate}</p>
                  <p>{value.comment}</p>
                </span>
              </div>
            </div>
          )
        })}
        {/*create comment*/}
        <form  onSubmit={(event) => this.checkValid(event)}>
          <div className="createCommitForm" onChange={this.onChangeValue}>
            <label for="new-comment" class="form-label">Add your own comment: </label>
            <br></br>
            <textarea
              type="text"
              class="form-control"
              id="new-comment"
              value={this.state.newComment}
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