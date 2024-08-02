# GPT Text-to-Speech

**GPT Text-to-Speech** is a web application that integrates with the GPT API model and text-to-speech services to convert text queries into spoken audio. The application uses Node.js for the server and JavaScript for the client-side interactions. The primary features include querying the GPT model and converting the responses into audio using different voices.

## Features

- Query GPT-3.5 Turbo model to get responses based on user input.
- Convert the GPT response into speech using the StreamElements API.
- Support for different voice options.
- Display responses and play audio directly in the browser.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mikartisan/gpt-text-to-speech.git
   cd gpt-text-to-speech

2. **Install dependencies:**

   ```bash
   npm install

3. **Start the server:**

   ```bash
   node server.mjs
