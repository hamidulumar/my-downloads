function detectPlatform() {
    const urlInput = document.getElementById('videoUrl').value;
    const platformInfo = document.getElementById('platformInfo');
    const downloadBtn = document.getElementById('downloadBtn');
    const platformName = document.getElementById('platformName');

    const youtubePattern = /youtube.com|youtu.be/;
    const facebookPattern = /facebook.com/;
    const instagramPattern = /instagram.com/;
    const tiktokPattern = /tiktok.com/;

    // Detect platform
    if (youtubePattern.test(urlInput)) {
        platformName.textContent = 'YouTube';
        platformInfo.style.display = 'block';
        downloadBtn.disabled = false;
    } else if (facebookPattern.test(urlInput)) {
        platformName.textContent = 'Facebook';
        platformInfo.style.display = 'block';
        downloadBtn.disabled = false;
    } else if (instagramPattern.test(urlInput)) {
        platformName.textContent = 'Instagram';
        platformInfo.style.display = 'block';
        downloadBtn.disabled = false;
    } else if (tiktokPattern.test(urlInput)) {
        platformName.textContent = 'TikTok';
        platformInfo.style.display = 'block';
        downloadBtn.disabled = false;
    } else {
        platformInfo.style.display = 'none';
        downloadBtn.disabled = true;
    }
}

function startDownload() {
    const urlInput = document.getElementById('videoUrl').value;
    const downloadDetails = document.getElementById('downloadDetails');
    const downloadLink = document.getElementById('downloadLink');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const videoTitle = document.getElementById('videoTitle');

    // Simulating the video data (replace with real API call to fetch video details)
    videoThumbnail.src = 'https://via.placeholder.com/200'; // Example image
    videoTitle.textContent = 'Sample Video Title'; // Example title
    downloadLink.href = urlInput; // Direct URL for download (replace with actual link)
    
    // Display download section
    downloadDetails.style.display = 'block';
}
