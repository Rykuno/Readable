import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Modal, ControlLabel, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';
import * as ReadableAPI from '../utils/readableAPI';
import { modifyComment } from '../actions/infoActions';

class EditCommentModal extends Component {
  state = {
    show: false,
    body: '',
    error: ''
  };

  componentDidMount() {
    const { show } = this.props;
    if (show === true) {
      this.handleShow();
    } else {
      this.handleClose();
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    const { body } = this.props;
    this.setState({
      show: true,
      body
    });
  };

  handleChange = e => {
    e.preventDefault();
    switch (e.target.name) {
      case 'body':
        this.setState({
          body: e.target.value
        });
        break;
      default:
        this.setState({
          error: 'Error updating fields'
        });
        break;
    }
  };

  submitChanges = () => {
    const { body } = this.state;
    const { id, close, updateComment } = this.props;
    ReadableAPI.modifyComment(id, body)
      .then(() => {
        updateComment(id, body);
        close();
      })
      .catch(e => {
        swal('Oh No!', e, 'error');
      });
  };

  render() {
    const { close } = this.props;
    const { body, error } = this.state;
    return (
      <div>
        <Modal show={this.state.show} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="body-form">
                <ControlLabel>Body:</ControlLabel>
                <FormControl
                  name="body"
                  componentClass="textarea"
                  className="comment-input"
                  input="text"
                  value={body}
                  onChange={this.handleChange}
                />
                <HelpBlock>{error}</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.submitChanges}>
              Submit
            </Button>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

EditCommentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  modifyComment: (id, title, body) => dispatch(modifyComment(id, body))
});

export default connect(null, mapDispatchToProps)(EditCommentModal);
