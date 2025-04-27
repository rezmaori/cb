// Login Manual
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const sheetID = '1paS5n5OrM5JJZiLjtTHZHBouh4tlfBdX-zqXSZ6Xkhs';    // Ganti dengan Spreadsheet ID kamu
  const apiKey = 'AIzaSyBJiU959hGM7-U7QhY0vwfN_rbbxpnhjWs';             // Ganti dengan API Key kamu
  const sheetName = 'Sheet1';                // Pastikan nama Sheet cocok

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rows = data.values;

    const userFound = rows.some(row => row[0] === email && row[1] === password);

    if (userFound) {
      alert('Login berhasil!');
      window.location.href = './dashboard.html';
    } else {
      alert('Email atau Password salah!');
    }
  } catch (err) {
    console.error(err);
    alert('Terjadi kesalahan server.');
  }
});

// Login Google (biarkan tetap, belum diubah)
function handleCredentialResponse(response) {
  fetch('http://localhost:5000/api/google-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: response.credential })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('token', data.token);
      window.location.href = './dashboard.html';
    } else if (data.redirectToRegister) {
      window.location.href = './register.html?email=' + data.email;
    } else {
      alert(data.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert('Login dengan Google gagal.');
  });
}

// Load Google Identity
window.onload = function () {
  google.accounts.id.initialize({
    client_id: '889114689523-5sta7o1ce6pdskbql8rjfcp6i8vtebr3.apps.googleusercontent.com',
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById('google-login'),
    { theme: "outline", size: "large" }
  );
};
