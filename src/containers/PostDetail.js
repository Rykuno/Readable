import React, { Component } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { votePost } from '../actions/postActions';
import { deleteComment } from '../actions/commentActions';
import NavBar from './NavBar';
import Header from '../components/Header';
import Comment from '../components/Comment';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import upvoteArrow from '../images/upvote-arrow.jpeg';
import * as ReadableAPI from '../utils/readableAPI';
import EditModal from './EditModal';
import editIcon from '../images/edit.png';
import NoMatch from '../components/NoMatch';
import DeleteModal from './DeleteModal';
import deleteIcon from '../images/delete.png';
import { getTime } from '../utils/utilities';

class PostDetail extends Component {
  state = {
    showEdit: false,
    showDelete: false,
    comments: [],
    bodyField: '',
    authorField: ''
  };

  componentDidMount() {
    this.fetchPostData();
    this.fetchComments();
  }

  votePost = vote => {
    const { id } = this.state;
    ReadableAPI.vote(id, vote).then(() => {
      this.setState(state => ({
        voteScore: vote === 'upVote' ? state.voteScore + 1 : state.voteScore - 1
      }));
      votePost(id, vote);
    });
  };

  voteComment = (id, vote) => {
    ReadableAPI.voteComment(id, vote)
      .then(() => {
        const newComments = this.state.comments.map(obj => {
          if (obj.id === id) {
            const newObj = { ...obj };
            newObj.voteScore = vote === 'upVote' ? obj.voteScore + 1 : obj.voteScore - 1;
            return newObj;
          }
          return obj;
        });

        this.setState({
          comments: newComments
        });
      })
      .catch(e => {
        swal(e);
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
        swal(e);
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
        swal(e);
      });
  };

  generateComments = () => {
    const { comments } = this.state;

    if (!comments) {
      return <li>No Comments</li>;
    }

    return comments.map(obj => (
      <li key={obj.id}>
        <Comment
          body={obj.body}
          author={obj.author}
          voteScore={obj.voteScore}
          timestamp={obj.timestamp}
          id={obj.id}
          date={obj.timestamp}
          vote={(id, vote) => this.voteComment(id, vote)}
          deleteComment={id => this.deleteComment(id)}
          updateComment={(id, body) => this.modifyComment(id, body)}
        />
      </li>
    ));
  };

  modifyComment = (id, body) => {
    this.setState(prevState => ({
      comments: prevState.comments.map(obj => {
        if (obj.id === id) {
          const newObj = { ...obj };
          newObj.body = body;
          return newObj;
        }
        return obj;
      })
    }));
  };

  deleteComment = id => {
    const { removeComment } = this.props;
    this.setState(prevState => ({
      comments: prevState.comments.filter(obj => obj.id !== id)
    }));
    removeComment(id);
  };

  submitComment = e => {
    e.preventDefault();
    const { authorField, bodyField, id } = this.state;
    if (!authorField || !bodyField) {
      swal('Validation Error', 'Please provide both an Author and Body.', 'warning');
      return;
    }

    ReadableAPI.postComment(bodyField, authorField, id).then(data => {
      this.setState(prevState => ({
        comments: [...prevState.comments, data],
        bodyField: '',
        authorField: ''
      }));
    });
  };

  toggleEditModal = () => {
    this.setState({
      showEdit: !this.state.showEdit
    });
  };

  toggleDeleteModal = () => {
    this.setState({
      showDelete: !this.state.showDelete
    });
  };

  updatePost = (title, body) => {
    this.setState({
      title,
      body
    });
  };

  returnToPage = () => {
    this.props.history.goBack();
  };

  handleChange = e => {
    switch (e.target.name) {
      case 'commentBody':
        this.setState({
          bodyField: e.target.value
        });
        break;
      case 'commentAuthor':
        this.setState({
          authorField: e.target.value
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {
      title,
      id,
      body,
      author,
      category,
      voteScore,
      bodyField,
      authorField,
      comments,
      timestamp
    } = this.state;

    if (!id) {
      return <NoMatch />;
    }
    return (
      <div>
        <Header />
        <NavBar />
        <div className="post-detail">
          <div className="vote-container">
            <input
              type="image"
              onClick={() => this.votePost('upVote')}
              className="vertical-vote arrow"
              src={upvoteArrow}
              alt="upVote"
            />
            <h4 className="vertical-vote">{voteScore}</h4>
            <input
              type="image"
              className="vertical-vote"
              src={downvoteArrow}
              alt="downVote"
              onClick={() => this.votePost('downVote')}
            />
          </div>
          <div className="info-container border">
            <div className="author-container">
              <button className="title-button no-padding">{this.state.title}</button>
              <h5>Author: {author}</h5>
            </div>
            <hr className="no-padding" />
            <div className="post-body">
              <p className="body-text padding-bottom">{body}</p>
            </div>
          </div>
          <div className="metadata-container">
            <Badge>{comments.length} comments</Badge>
            <Badge>Posted {getTime(timestamp)}</Badge>
            <Badge>{category}</Badge>
            <input
              className="post-icon"
              type="image"
              src={editIcon}
              alt="Edit"
              onClick={this.toggleEditModal}
            />
            <input
              className="post-icon"
              type="image"
              src={deleteIcon}
              alt="Delete"
              onClick={this.toggleDeleteModal}
            />
          </div>
          <hr />
          <form className="comment-container" onSubmit={this.submitComment}>
            <textarea
              className="comment-input"
              cols="40"
              name="commentBody"
              rows="4"
              placeholder="Leave a comment!"
              value={bodyField}
              onChange={this.handleChange}
            />
            <textarea
              className="author-input"
              placeholder="Author"
              name="commentAuthor"
              rows="1"
              value={authorField}
              onChange={this.handleChange}
            />
            <Button className="post-button" bsStyle="primary" value="Submit" type="submit">
              Post
            </Button>
            <hr />
          </form>
          <ol>{this.generateComments()}</ol>
        </div>
        {this.state.showEdit === false || (
          <EditModal
            show
            close={this.toggleEditModal}
            body={body}
            title={title}
            id={id}
            echoChanges={(postTitle, postBody) => this.updatePost(postTitle, postBody)}
          />
        )}
        {this.state.showDelete === false || (
          <DeleteModal id={id} close={this.toggleDeleteModal} returnToPage={this.returnToPage} />
        )}
      </div>
    );
  }
}

PostDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  removeComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.posts
});

const mapDispatchToProps = dispatch => ({
  votePost: (id, vote) => dispatch(votePost(id, vote)),
  removeComment: id => dispatch(deleteComment(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
