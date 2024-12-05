const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

app.use(bodyParser.json());

app.post('/download', (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.json({ success: false, message: 'URL is required' });
    }

    // Example using yt-dlp
    const command = `yt-dlp -o "./downloads/%(title)s.%(ext)s" ${videoUrl}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({ success: false, message: stderr });
        }

        // Assuming the video is downloaded successfully
        const downloadLink = `/downloads/${stdout.trim()}`;
        res.json({ success: true, downloadLink });
    });
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Kirim file HTML utama
});
app.use(express.static('public'));

// Serve static files (e.g., downloaded videos)
app.use('/downloads', express.static('downloads'));

const PORT = 3008;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

