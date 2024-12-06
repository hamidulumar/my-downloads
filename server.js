const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3008;

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk menangani permintaan download
app.post('/download', (req, res) => {
    let videoUrl = req.body.url;
    console.log(`Menerima URL: ${videoUrl}`);

    // Bersihkan URL jika mengandung query string (menghapus bagian setelah ?)
    const cleanedUrl = videoUrl.split('?')[0];  // Menghapus query string

    // Regex untuk mendapatkan ID video YouTube
    const urlRegex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+|(?:v|e(?:mbed)?)\/([a-zA-Z0-9_-]+)|.*(?:v|e(?:mbed)?)=([a-zA-Z0-9_-]+))|youtu\.be\/([a-zA-Z0-9_-]+)))/;
    const match = cleanedUrl.match(urlRegex);
    
    if (match) {
        // Pilih ID video dari URL yang sesuai
        videoUrl = match[1] || match[2] || match[3];
        console.log(`URL yang digunakan untuk download: ${videoUrl}`);
    } else {
        return res.send('URL tidak valid. Pastikan URL berasal dari YouTube, Facebook, Instagram, atau TikTok.');
    }

    // Perbaiki perintah yt-dlp (hilangkan backslash ekstra)
    const command = `C:\\yt-dlp\\yt-dlp.exe ${videoUrl}`; // Perbaikan: Hapus backslash ekstra

    exec(command, (error, stdout, stderr) => {
        console.log('stdout:', stdout); // Tambahkan log stdout
        console.log('stderr:', stderr); // Tambahkan log stderr
    
        if (error) {
            console.error(`Gagal menjalankan yt-dlp: ${error}`);
            return res.send('Terjadi kesalahan saat mengunduh video.');
        }
    
        // Cek apakah stderr berisi pesan kesalahan dari yt-dlp
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            // Periksa apakah ada peringatan tentang ffmpeg
            if (stderr.includes('WARNING: ffmpeg not found')) {
                console.log('Peringatan tentang ffmpeg, tetapi video tetap diunduh.');
            } else {
                return res.send('Terjadi kesalahan saat mengunduh video.');
            }
        }
    
        console.log(`stdout: ${stdout}`);
        res.send('Video berhasil diunduh!');
    });
});

// Memulai server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
