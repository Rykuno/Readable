import React, { Component } from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Modal, ControlLabel, FormControl, Button, FormGroup } from 'react-bootstrap';
import * as ReadableAPI from '../utils/readableAPI';

class EditCommentModal extends Component {
  state = {
    body: ''
  };

  componentDidMount() {
    this.updatePropsToState();
  }

  updatePropsToState = () => {
    const { body } = this.props;
    this.setState({
      body
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
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
    const { close, show } = this.props;
    const { body } = this.state;
    return (
      <div>
        <Modal show={show} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="body-form" validationState={body ? 'success' : 'error'}>
                <ControlLabel>Body:</ControlLabel>
                <FormControl
                  name="body"
                  componentClass="textarea"
                  className="comment-input"
                  input="text"
                  value={body}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.submitChanges} disabled={!body}>
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

export default EditCommentModal;
