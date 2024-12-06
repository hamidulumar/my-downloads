const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3008;

// Parse JSON bodies
app.use(express.json());

// Static files (optional: if you want to serve other assets like CSS or JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk menangani permintaan download
app.post('/download', (req, res) => {
    let videoUrl = req.body.url;
    console.log(`Menerima URL: ${videoUrl}`);

    // Bersihkan URL jika mengandung query string
    const cleanedUrl = videoUrl.split('?')[0];  // Menghapus query string

    // Regex untuk mendapatkan ID video YouTube
    const urlRegex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+|(?:v|e(?:mbed)?)\/([a-zA-Z0-9_-]+)|.*(?:v|e(?:mbed)?)=([a-zA-Z0-9_-]+))|youtu\.be\/([a-zA-Z0-9_-]+)))/;
    const match = cleanedUrl.match(urlRegex);
    
    if (match) {
        videoUrl = match[1] || match[2] || match[3];
        console.log(`URL yang digunakan untuk download: ${videoUrl}`);
    } else {
        return res.json({ success: false, error: 'URL tidak valid.' });
    }

    // Perbaiki perintah yt-dlp untuk memastikan path benar
    const command = `C:\\yt-dlp\\yt-dlp.exe ${videoUrl}`;

    exec(command, (error, stdout, stderr) => {
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);

        if (error || stderr) {
            console.error(`Gagal menjalankan yt-dlp: ${error || stderr}`);
            return res.json({ success: false, error: 'Terjadi kesalahan saat mengunduh video.' });
        }

        console.log(`stdout: ${stdout}`);
        res.json({ success: true });
    });
});

// Menjalankan server di port yang diinginkan
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
