import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Cookies from 'js-cookie';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';


// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
      constructor(props) {
      super(props);
		  this.state = { student: { email: '', name: '', status: '', status_code: 0 }, open: false};
	};
	
	handleClickOpen = () => {
	this.setState( {open:true} );
	};

	handleClose = () => {
	this.setState( {open:false} );
	};

    handleEmailChange = (event) => {
		this.setState({ student: { ...this.state.student, email: event.target.value } });
    }

	handleNameChange = (event) => {
		this.setState({ student: { ...this.state.student, name: event.target.value } });
	}
	
	handleStatusChange = (event) => {
		this.setState({ student: { ...this.state.student, status: event.target.value } });
	}
	
	handleStatusCodeChange = (event) => {
		this.setState({ student: { ...this.state.student, status_code: event.target.value } });
	}

  	// Save student and close modal form
	handleAdd = () => {
		const token = Cookies.get('XSRF-TOKEN');
		console.log(JSON.stringify(this.state.student));
		fetch(`http://localhost:8080/student`,
		{ 
		  method: 'POST', 
		  headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': token }, 
		  body: JSON.stringify(this.state.student)
		})
	  .then(res => {
		  if (res.ok) {
			toast.success("Student successfully added", {
				position: toast.POSITION.BOTTOM_LEFT
			});
		  } else {
			toast.error("Error when adding", {
				position: toast.POSITION.BOTTOM_LEFT
			});
			console.error('Post http status =' + res.status);
		  }})
	  .catch(err => {
		toast.error("Error when adding", {
			  position: toast.POSITION.BOTTOM_LEFT
		  });
		  console.error(err);
	  })
       this.handleClose();
    }

    render()  { 
      return (
          <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Student
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
					  <TextField autoFocus fullWidth placeholder="Student's email" label="Email" name="email" onChange={this.handleEmailChange} /> 
					  <TextField autoFocus fullWidth placeholder="Student's name" label="Name" name="name" onChange={this.handleNameChange}  /> 
					  <TextField autoFocus fullWidth placeholder="Student's registration status" label="Status" name="status" onChange={this.handleStatusChange}  /> 
					  <TextField autoFocus fullWidth placeholder="Student's registration status code" label="Status Code" name="status_code" onChange={this.handleStatusCodeChange}  /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
			  </Dialog>   
			  <ToastContainer autoClose={1500} />   

          </div>
      ); 
    }
}

export default AddStudent;