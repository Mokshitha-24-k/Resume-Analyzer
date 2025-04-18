function analyzeResume(event) {
    event.preventDefault();

    const resumeFile = document.getElementById('resume').files[0];
    const jobDescription = document.getElementById('jobDescription').value;

    if (!resumeFile || !jobDescription) {
        alert('Please upload a resume and enter a job description.');
        return;
    }

    const formData = new FormData();
    formData.append('file', resumeFile);
    formData.append('jobDescription', jobDescription);

    fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("🔄 Server Response:", data);

        const results = document.getElementById('results');
        const output = document.getElementById('analysisText');
        results.classList.remove('hidden');

        if (data.success) {
            let cleanedText = data.analysis
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .split('\n')
                .map(line => `<p>${line.trim()}</p>`)
                .join('');
            output.innerHTML = cleanedText;
        } else {
            output.innerHTML = `<p style="color:red;"><strong>Error:</strong> ${data.error || 'Unexpected error occurred.'}</p>`;
        }
    })
    .catch(error => {
        console.error('❌ JS Fetch Error:', error);
        alert('Failed to analyze resume. Please check if the backend is running.');
    });
}
