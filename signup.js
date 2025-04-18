document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const msgDiv = document.getElementById('signupMessage');

    if (!email || !password || !confirmPassword) {
        msgDiv.style.color = 'red';
        msgDiv.textContent = 'Please fill in all fields';
        return;
    }

    if (password !== confirmPassword) {
        msgDiv.style.color = 'red';
        msgDiv.textContent = 'Passwords do not match';
        return;
    }

    fetch('signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        msgDiv.style.color = data.success ? 'green' : 'red';
        msgDiv.textContent = data.message;
        if (data.success) {
            setTimeout(() => window.location.href = 'login.html', 1500);
        }
    })
    .catch(error => {
        console.error('Signup Error:', error);
        msgDiv.style.color = 'red';
        msgDiv.textContent = 'Server error. Try again later.';
    });
});
