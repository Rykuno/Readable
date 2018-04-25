import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import * as ReadableAPI from '../utils/readableAPI';
import { deletePost } from '../actions/infoActions';

class DeleteModal extends Component {
  removePost = () => {
    const { removePost, id, close, returnToPage } = this.props;
    removePost(id);

    if (returnToPage) {
      close();
      returnToPage();
    }

    close();
  };

  render() {    
    const { close, id } = this.props;
    console.log('ID: ', id);

    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Deletion Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you wish to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
            <Button bsStyle="danger" onClick={this.removePost}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removePost: id => dispatch(deletePost(id))
});

export default connect(null, mapDispatchToProps)(DeleteModal);
