document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form submit secara default

    const url = document.getElementById('url').value;
    const errorMessage = document.getElementById('error-message');

    // Validasi URL menggunakan regex yang mendukung YouTube, Facebook, Instagram, TikTok
    const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|facebook\.com|instagram\.com|tiktok\.com)\/.+$/;

    if (!urlRegex.test(url)) {
        errorMessage.textContent = 'URL tidak valid. Pastikan URL berasal dari YouTube, Facebook, Instagram, atau TikTok.';
        errorMessage.style.color = 'red';
        return;
    }

    errorMessage.textContent = ''; // Kosongkan pesan error jika validasi sukses

    // Kirim data URL ke server
    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(url)}`
    })
    .then(response => response.text())
    .then(data => {
        // Menampilkan pesan berdasarkan hasil dari server
        if (data.includes("Terjadi kesalahan")) {
            errorMessage.textContent = 'Terjadi kesalahan saat mengunduh video.';
            errorMessage.style.color = 'red';
        } else {
            alert('Video berhasil diunduh!');
        }
    })
    .catch(error => {
        errorMessage.textContent = 'Terjadi kesalahan pada server.';
        errorMessage.style.color = 'red';
    });
});
