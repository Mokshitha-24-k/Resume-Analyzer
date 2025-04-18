document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email && password) {
        fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                alert("Login successful!");
                window.location.href = 'analyzer.html';
            } else {
                document.getElementById('loginMessage').textContent = data.message;
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('loginMessage').textContent = 'Server error. Try again later.';
        });
    } else {
        alert('Please enter valid credentials');
    }
});
