import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { addTodo, deleteTodo } from "../store/actions/todoAction";
import { getUniqueId } from "../store/utils";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import EditTodo from "../components/edit/EditTodo";

//===============================Overiding Styles=======================================
const styles = theme => ({
  root: {
    margin: "50px"
  },
  todo: {
    marginLeft: "50px",
    width: "250px"
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  addTodo: {
    marginLeft: "50px"
  }
});

//=================================Home component========================================
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      desc: "",
      reminder: "",
      editModal: false
    };
  }

  //=================================================================================
  onSubmit = async e => {
    e.preventDefault();
    //get a unique ID string for each newly added todo in the store
    let id = await getUniqueId();
    let obj = {
      id,
      title: this.state.title,
      desc: this.state.desc,
      reminder: this.state.reminder
    };
    //firing addTodo action to the Redux Store
    await this.props.addTodo(obj);
    await this.setState({ title: "", desc: "", reminder: "" });
  };

  //firing delete todo action to store
  delete = (e, id) => {
    this.props.deleteTodo(id);
  };

  //open edit popup on click on edit button
  openEditModal = (e, id) => {
    this.setState({ editModal: true, id });
  };

  //closes edit popup
  closeEditModal = e => {
    this.setState({ editModal: false });
  };

  //handle the onchnage event on input boxes
  onChange = async e => {
    console.log(e);
    await this.setState({ [e.target.name]: e.target.value });
  };

  //================================rendering=========================================

  render() {
    const { classes, todo } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h3">Add Todos</Typography>
        <br />
        {/*====================== form for adding todos =======================*/}
        <form onSubmit={this.onSubmit}>
          <TextField
            className={classes.todo}
            autoFocus
            label="Todo Title"
            name="title"
            required
            type="text"
            value={this.state.title}
            onChange={this.onChange}
          />
          <TextField
            className={classes.todo}
            label="Todo description"
            name="desc"
            required
            type="text"
            value={this.state.desc}
            onChange={this.onChange}
          />
          <TextField
            label="Set Reminder"
            type="datetime-local"
            name="reminder"
            value={this.state.reminder}
            onChange={this.onChange}
            className={classes.todo}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button
            type="submit"
            variant="fab"
            color="primary"
            aria-label="Add"
            size="medium"
            className={classes.addTodo}
          >
            <AddIcon />
          </Button>
        </form>
        <br />
        <br />
        <EditTodo
          id={this.state.id}
          open={this.state.editModal}
          onClose={this.closeEditModal}
          aria-labelledby="edit-dialog-"
        />
        {/* ============== List for rendring todos ========================== */}
        <List className={classes.list}>
          {todo && todo.length > 0 ? (
            todo.map(obj => (
              <ListItem key={obj.id} role={undefined} dense button>
                <ListItemText
                  primary={
                    <div>
                      <Typography variant="h6">{`${obj.title}`}</Typography>
                      <Typography>{`Alert at ${new Date(
                        obj.reminder
                      ).toLocaleString()}`}</Typography>
                    </div>
                  }
                  secondary={`${obj.desc}`}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <DeleteIcon onClick={e => this.delete(e, obj.id)} />
                  </IconButton>
                  <IconButton aria-label="Edit">
                    <EditIcon onClick={e => this.openEditModal(e, obj.id)} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography>No Todos yet...</Typography>
          )}
        </List>
      </div>
    );
  }
}

//passing todo state in redux store to this component as props
const mapStateToProps = state => ({
  todo: state.todo.todo
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addTodo, deleteTodo }
  )(Home)
);
