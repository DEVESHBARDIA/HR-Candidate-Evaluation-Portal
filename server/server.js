const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
// const multer = require('multer');

const app = express();
const port = 3000;
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://intern:123@details.ikfitfm.mongodb.net/?retryWrites=true&w=majority&appName=Details', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Job application model
const ApplicationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: String,
  mobile1: String,
  mobile2: String,
  email: String,
  gender: String,
  dob: {
    day: Number,
    month: Number,
    year: Number
  },
  secondaryEducation: String,
  university: String,
  graduation: String,
  phone: String,
  country: String,
  jobTitle: String,
  employer: String,
  duration: String,
  location: String,
  experience : String,
  skills : String,
  jd : String,
  reason : String,
  ref : String,
  position: String,
  startDate: Date,
  duration: String,
  salary: String,
  additionalDetails: String,
  status: { type: String, default: 'Pending' },
  // pdf: Buffer
}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);

// API route to handle form submission
app.post('/submit', async (req, res) => {
  const applicationData = req.body;
  const application = new Application(applicationData);
  try {
    await application.save();
    res.redirect('/confirmation.html');
  } catch (error) {
    res.status(500).send('Error saving application');
  }
});

// get all the applicants in a list in admin dashboard
app.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find().lean();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).send('Failed to fetch applications');
  }
});


//get a particular applicant by its id
app.get('/applications/:id', async (req, res) => {
  try {
      const application = await Application.findById(req.params.id);
      if (!application) {
          return res.status(404).send('Application not found');
      }
      res.json(application);
  } catch (error) {
      res.status(500).send('Error fetching application');
  }
});


//update the details of id - HR will do it.
app.put('/applications/:id', async (req, res) => {
  try {
      const updateData = {
          ...req.body,
          status: req.body.status || 'Completed'  // Set status to Completed if not provided
      };
      const application = await Application.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!application) {
          return res.status(404).send('Application not found');
      }
      res.json(application);
  } catch (error) {
      res.status(400).send('Error updating application');
  }
});



// Serve confirmation page
app.get('/confirmation.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../confirmation.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
