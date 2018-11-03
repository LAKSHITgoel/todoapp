import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { editTodo } from "../../store/actions/todoAction";

class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let data = {
      id: this.props.id,
      title: this.state.title,
      desc: this.state.desc
    };
    this.props.editTodo(data);
    this.props.onClose();
    this.setState({ title: "", desc: "" });
  };

  handleClose = () => {
    this.props.onClose();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.onSubmit}>
          <DialogTitle id="form-dialog-title">Edit</DialogTitle>
          <DialogContent>
            <p>{this.props.id}</p>
            <TextField
              required
              onChange={this.onChange}
              value={this.state.title}
              autoFocus
              margin="dense"
              name="title"
              label="Todo Title"
              type="text"
              fullWidth
            />
            <TextField
              required
              value={this.state.desc}
              onChange={this.onChange}
              margin="dense"
              name="desc"
              label="Todo Description"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={this.onSubmit} color="primary">
              Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo.todo
});

export default connect(
  mapStateToProps,
  { editTodo }
)(EditTodo);
