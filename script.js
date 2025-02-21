let clickCount = 0;
const totalClicksNeeded = 10; // Jumlah klik yang dibutuhkan diubah menjadi 10
const heart = document.getElementById('heart');
const messageDiv = document.getElementById('message');
const loveMessage = document.getElementById('loveMessage');
const valentineVideo = document.getElementById('valentineVideo');
const backgroundMusic = document.getElementById('backgroundMusic'); // Elemen audio
const clickInstruction = document.getElementById('clickInstruction');

// Nonaktifkan kontrol pause pada video
valentineVideo.removeAttribute("controls"); // Menghapus kontrol default
valentineVideo.controls = false; // Memastikan kontrol tidak muncul

// Mencegah video di-pause
valentineVideo.addEventListener('pause', (e) => {
    e.preventDefault(); // Mencegah pause
    valentineVideo.play(); // Lanjutkan pemutaran
});

heart.addEventListener('click', () => {
    clickCount++;
    heart.style.animation = 'pulse 0.3s ease';
    setTimeout(() => {
        heart.style.animation = 'pulse 2s infinite';
    }, 300);

    // Update instruksi klik
    const clicksLeft = totalClicksNeeded - clickCount;
    if (clicksLeft > 0) {
        clickInstruction.textContent = `Klik ${clicksLeft} kali lagi!`;
    }

    if (clickCount === totalClicksNeeded) {
        showMessage();
    }

});

function showMessage() {
    messageDiv.style.display = 'block';
    clickInstruction.style.display = 'none'; // Sembunyikan instruksi klik
    loveMessage.textContent = "Happy valentine my beloved Erza! 💖. Maaf hadiahnya gabisa seheboh orang - orang (masih belajar juga buat ginian hehe), semoga kamu suka ya sayang <3";
    
    // Mulai memutar video
    valentineVideo.play();
    
    // Aktifkan suara setelah video mulai diputar
    valentineVideo.muted = false; // Matikan muted

    // Mulai memutar musik latar (tanpa loop)
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();
    backgroundMusic.loop = false; // Pastikan musik tidak di-loop
}

valentineVideo.addEventListener('ended', showPopup);
backgroundMusic.addEventListener('ended', showPopup);

function showPopup() {
    setTimeout(() => {
        const userResponse = confirm("Makasih udah nonton sampe abis sayang! Mau lanjut dengerin playlist buatanku nda? 💖");
        if (userResponse) {
            const playlistId = "7Ch5U1DDyEQcXO80CMOl59";
            const intentUrl = `intent://open.spotify.com/playlist/${playlistId}#Intent;scheme=https;package=com.spotify.music;end;`;
            const webUrl = `https://open.spotify.com/playlist/${playlistId}`;

            // Coba buka dengan intent (untuk Android)
            window.location.href = intentUrl;

            // Jika gagal, fallback ke web
            setTimeout(() => {
                window.location.href = webUrl;
            }, 500);
        }
    }, 1000); // Delay sedikit biar tidak terlalu mendadak
}

