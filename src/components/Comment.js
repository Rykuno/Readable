import React from 'react';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import downvoteArrowDark from '../images/downvote-dark.jpeg';
import upvoteArrowDark from '../images/upvote-dark.jpeg';
import upvoteArrow from '../images/upvote-arrow.jpeg';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import userArrow from '../images/userArrow.png';

const Comment = props => (
  <div className="wrapper border">
    <div className="vote-container">
      <input
        className="vertical-vote comment-arrow"
        type="image"
        src={upvoteArrow}
        onClick={() => props.vote(props.id, 'upVote')}
      />
      <h5>{props.voteScore}</h5>
      <input
        className="vertical-vote comment-arrow"
        type="image"
        src={downvoteArrow}
        onClick={() => props.vote(props.id, 'downVote')}
      />
    </div>
    <div className="info-container">
      <h5 className="inline comment-author">{props.author}</h5>
      <img src={userArrow} alt="<" />
      <hr className="no-margin" />
      <p>{props.body}</p>
    </div>
    <div className="metadata-container">
      <input
        className="post-icon float-right"
        type="image"
        src={deleteIcon}
        alt="Delete"
        onClick={() => props.delete(props.id)}
      />
      <input
        className="post-icon float-right"
        type="image"
        src={editIcon}
        alt="Edit"
        onClick={this.showEditModal}
      />
    </div>
  </div>
);

export default Comment;
