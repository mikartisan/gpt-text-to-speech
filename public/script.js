async function fetchAIResponse() {
    const query = document.getElementById('query').value;
    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');
    const player = document.getElementById('audio');

    if (!query) {
        resultDiv.innerHTML = '<p class="error">Query is required.</p>';
        return;
    }

    const selectedVoice = document.querySelector('input[name="list-radio"]:checked')?.value || 'Mathew';

    resultDiv.style.display = 'none';
    loader.style.display = 'block';
    player.style.display = 'none';

    const url = `http://localhost:3000/proxy?query=${encodeURIComponent(query)}`;

    try {
        if (!player.paused) {
            player.pause();
            player.currentTime = 0;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        console.log('Received data:', data); // Log the data to see the structure

        if (data.error) {
            resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
            loader.style.display = 'none';
            resultDiv.style.display = 'block';
            displayResult(data);

            // Adjust the field name to match the data structure
            const textToSpeak = data.reply || data.result || ''; // Use appropriate key
            if (textToSpeak) {
                let speak = await fetch(`https://api.streamelements.com/kappa/v2/speech?voice=${selectedVoice}&text=` + encodeURIComponent(textToSpeak));

                if (speak.status != 200) {
                    alert(await speak.text());
                    return;
                }

                let mp3 = await speak.blob();

                let blobUrl = URL.createObjectURL(mp3);
                document.getElementById('source').setAttribute('src', blobUrl);
                let audio = document.getElementById('audio');
                audio.pause();
                audio.load();
                audio.play();
            } else {
                resultDiv.innerHTML = '<p class="error">No valid response received.</p>';
            }
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    const player = document.getElementById('audio');
    resultDiv.innerHTML = `<p>${data.reply || data.result}</p>`;
    player.style.display = 'block';
}
