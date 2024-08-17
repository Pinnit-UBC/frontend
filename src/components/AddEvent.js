import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleMap from './SimpleMap';
import dayjs from 'dayjs';
import '../styles/AddEvent.css';

function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    pass_key: '',
    event_date: '',
    event_title: '',
    host_organization: '',
    start_time: '',
    end_time: '',
    location: '',
    activity_description: '',
    registration_status: '',
    reference_link: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const handleMapClick = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    setOpenDialog(false);

    if (!selectedFile) {
      setDialogContent('Please attach a file before submitting.');
      setOpenDialog(true);
      setIsSubmitting(false);
      return;
    }
    if (!markerPosition) {
      setDialogContent('Please pin a location on the map before submitting.');
      setOpenDialog(true);
      setIsSubmitting(false);
      return;
    }

    // Verify the pass key
    const verifyKeyResponse = await fetch('https://backend-8eis.onrender.com/verify-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: formData.user_id, pass_key: formData.pass_key }),
    });

    const verifyKeyData = await verifyKeyResponse.json();

    if (!verifyKeyData.valid) {
      setDialogContent('Invalid Pass Key. Please try again.');
      setOpenDialog(true);
      setIsSubmitting(false);
      return;
    }

    // Prepare form data for submission
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append('image', selectedFile);
    formDataToSend.append('latitude', markerPosition.lat);
    formDataToSend.append('longitude', markerPosition.lng);

    try {
      const response = await fetch('https://backend-8eis.onrender.com/add-event', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setDialogContent('Successfully added event!');
      } else {
        setDialogContent('Event not added. Please fill out the required fields and if issue persists please call/text 778-318-9661 or email richardluo73@gmail.com');
      }
    } catch (error) {
      console.error('Error:', error);
      setDialogContent('Event not added. Please fill out the required fields and if issue persists please call/text 778-318-9661 or email richardluo73@gmail.com');
    } finally {
      setOpenDialog(true);
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    const today = dayjs().format('YYYY-MM-DD');
    navigate(`/?date=${today}`);
    window.scrollTo(0, 0); // Ensure the page scrolls to the top
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (dialogContent === 'Successfully added event!') {
      navigate('/'); // Navigate to the homepage or a success page if the event is successfully added
    }
  };

  return (
    <div className="add-event-container">
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} className="add-event-form">
        <TextField
          label="User ID"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <TextField
          label="Pass Key"
          name="pass_key"
          value={formData.pass_key}
          onChange={handleChange}
          required
        />
        <TextField
          label="Event Date"
          type="date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Event Title"
          name="event_title"
          value={formData.event_title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Host or Organization"
          name="host_organization"
          value={formData.host_organization}
          onChange={handleChange}
          required
        />
        <TextField
          label="Start Time"
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Time"
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <TextField
          label="Activity Description"
          name="activity_description"
          value={formData.activity_description}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <TextField
          label="Registration Status"
          name="registration_status"
          value={formData.registration_status}
          onChange={handleChange}
          required
        />
        <TextField
          label="Reference Link"
          name="reference_link"
          value={formData.reference_link}
          onChange={handleChange}
        />
        <div className="upload-section">
          <label>Upload event image</label>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              required={!selectedFile}
            />
          </Button>
        </div>
        {selectedFile && (
          <div className="file-details">
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="file-preview" />
            <div className="file-name">{selectedFile.name}</div>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteFile}
            >
              Delete
            </Button>
          </div>
        )}
        <label>Select event location</label>
        <div className="map-container">
          <SimpleMap markerPosition={markerPosition} handleMapClick={handleMapClick} />
        </div>
        <div className="form-buttons">
          <Button variant="outlined" color="secondary" onClick={handleBackClick}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submission Status"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddEvent;
