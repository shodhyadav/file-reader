const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('public'));  // Serve static files

// Folder path on Windows (D drive)
const FOLDER_PATH = 'D:\\edi';  // Change to your folder path

// API to read folder content
app.get('/read-folder', (req, res) => {
  fs.readdir(FOLDER_PATH, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return res.status(500).json({ error: 'Error reading folder' });
    }

    const fileDetails = files.map(file => ({
      name: file,
      path: path.join(FOLDER_PATH, file)
    }));

    res.json({
      totalFiles: files.length,
      files: fileDetails
    });
  });
});

// Catch-all route to prevent "Cannot GET" error
app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
