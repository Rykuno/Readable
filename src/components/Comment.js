import React from 'react';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import downvoteArrowDark from '../images/downvote-dark.jpeg';
import upvoteArrowDark from '../images/upvote-dark.jpeg';
import upvoteArrow from '../images/upvote-arrow.jpeg';

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
      <h5>{props.author}</h5>
      <p>{props.body}</p>
    </div>
    <div>
      <button>Edit</button>
    </div>
  </div>
);

export default Comment;
