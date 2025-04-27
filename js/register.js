document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Cek data yang akan dikirim
    console.log('Data yang akan dikirim:', { email, password });

    const webAppURL = 'https://script.google.com/macros/s/AKfycbxQT5XtGqzjY8EwZHQR7mrfCfvJ8FtXsixgnYk3SRglTzzLVCwYXl2NxSoOHvU01OjP1A/exec'; // Ganti dengan URL Web App kamu

    try {
        // Melakukan fetch untuk mengirim data registrasi
        const response = await fetch(webAppURL, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',  // Pastikan menggunakan mode 'cors'
        });

        // Mengecek response dari server
        const data = await response.json();

        if (data.success) {
            alert(data.message);
            window.location.href = './index.html'; // Redirect ke halaman login setelah registrasi berhasil
        } else {
            alert(data.message); // Menampilkan pesan error jika ada
        }

    } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
    }
});
