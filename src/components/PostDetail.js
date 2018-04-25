import React, { Component } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { votePost } from '../actions/infoActions';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Comment from '../components/Comment';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import downvoteArrowDark from '../images/downvote-dark.jpeg';
import upvoteArrowDark from '../images/upvote-dark.jpeg';
import upvoteArrow from '../images/upvote-arrow.jpeg';
import * as ReadableAPI from '../utils/readableAPI';
import EditModal from '../components/EditModal';
import editIcon from '../images/edit.png';
import NoMatch from './NoMatch';

class PostDetail extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.fetchPostData();
    this.fetchComments();
  }

  getTime = () => {
    const { timestamp } = this.state;
    const date = new Date(timestamp);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getUTCFullYear();
    return `${month}-${day}-${year}`;
  };

  votePost = vote => {
    const { id } = this.state;
    ReadableAPI.vote(id, vote).then(data => {
      this.setState(state => ({
        voteScore: vote === 'upVote' ? state.voteScore + 1 : state.voteScore - 1
      }));
      votePost(id, vote);
    });
  };

  voteComment = (id, vote) => {
    ReadableAPI.voteComment(id, vote)
      .then(data => {
        const newComments = this.state.comments.map(obj => {
          if (obj.id === id) {
            obj.voteScore = vote === 'upVote' ? obj.voteScore + 1 : obj.voteScore - 1;
          }
          return obj;
        });

        this.setState({
          comments: newComments
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  fetchPostData = () => {
    const { id } = this.props.match.params;
    ReadableAPI.getPost(id)
      .then(data => {
        this.setState(prevState => ({
          ...prevState,
          ...data
        }));
      })
      .catch(e => {
        alert(e);
      });
  };

  fetchComments = () => {
    const { id } = this.props.match.params;
    ReadableAPI.getComments(id)
      .then(data => {
        this.setState({
          comments: data
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  generateComments = () => {
    const { comments } = this.state;

    if (!comments) {
      return <li>No Comments</li>;
    }

    return comments.map(obj => (
      <li>
        <Comment
          body={obj.body}
          author={obj.author}
          voteScore={obj.voteScore}
          id={obj.id}
          date={obj.timestamp}
          vote={(id, vote) => this.voteComment(id, vote)}
        />
      </li>
    ));
  };

  submitComment = e => {
    e.preventDefault();
    const body = e.target[0].value;
    const author = e.target[1].value;
    const { id } = this.state;
    ReadableAPI.postComment(body, author, id).then(data => {
      this.setState(prevState => ({
        comments: [...prevState.comments, data]
      }));
    });
  };

  showEditModal = () => {
    this.setState({
      show: true
    });
  };

  closeEditModal = () => {
    this.setState({
      show: false
    });
  };

  updatePost = (title, body) => {
    this.setState({
      title,
      body
    });
  };

  render() {
    const {
      title, id, body, author, category, voteScore, commentCount
    } = this.state;
    if (this.props.posts.length !== 0) {
      return (
        <div>
          <Header />
          <NavBar />
          <div className="post-detail">
            <div className="vote-container">
              <input
                type="image"
                onMouseOver={e => (e.currentTarget.src = upvoteArrowDark)}
                onMouseOut={e => (e.currentTarget.src = upvoteArrow)}
                onClick={() => this.votePost('upVote')}
                className="vertical-vote arrow"
                src={upvoteArrow}
                alt="upVote"
              />
              <h4 className="vertical-vote">{voteScore}</h4>
              <input
                type="image"
                onMouseOver={e => (e.currentTarget.src = downvoteArrowDark)}
                onMouseOut={e => (e.currentTarget.src = downvoteArrow)}
                className="vertical-vote"
                src={downvoteArrow}
                alt="downVote"
                onClick={() => this.votePost('downVote')}
              />
            </div>
            <div className="info-container">
              <div className="author-container">
                <button className="title-button">{this.state.title}</button>
                <h5>Author: {author}</h5>
              </div>
            </div>
            <div className="post-body">
              <p className="body-text">{body}</p>
            </div>
            <div className="metadata-container">
              <Badge>{commentCount} comments</Badge>
              <Badge>Posted {this.getTime()}</Badge>
              <Badge>{category}</Badge>
              <input
                className="post-icon"
                type="image"
                src={editIcon}
                alt="Edit"
                onClick={this.showEditModal}
              />
            </div>
            <hr />
            <form className="comment-container" onSubmit={this.submitComment}>
              <textarea
                className="comment-input"
                name="commentSection"
                cols="40"
                rows="4"
                placeholder="Leave a comment!"
              />
              <textarea className="author-input" placeholder="Author" rows="1" />
              <Button className="post-button" bsStyle="primary" value="Submit" type="submit">
                Post
              </Button>
              <hr />
            </form>
            <ol>{this.generateComments()}</ol>
          </div>
          {this.state.show === false || (
            <EditModal
              show
              close={this.closeEditModal}
              body={body}
              title={title}
              id={id}
              echoChanges={(postTitle, postBody) => this.updatePost(postTitle, postBody)}
            />
          )}
        </div>
      );
    }
    return <NoMatch />;
  }
}

const mapStateToProps = state => ({
  posts: state.info.posts
});

const mapDispatchToProps = dispatch => ({
  votePost: (id, vote) => dispatch(votePost(id, vote))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
