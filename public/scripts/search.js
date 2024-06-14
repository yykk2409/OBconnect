document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const searchQuery = formData.get('search');

    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search: searchQuery })
        });
        const result = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (result.status === 'success') {
            result.matches.forEach(match => {
                const matchDiv = document.createElement('div');
                matchDiv.textContent = `名前: ${match.name} - メール: ${match.email}`;
                resultsDiv.appendChild(matchDiv);
            });
        } else {
            resultsDiv.textContent = result.message;
        }
    } catch (error) {
        document.getElementById('results').textContent = '検索に失敗しました';
    }
});
