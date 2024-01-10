import fetch from 'node-fetch';

const options = {method: 'GET'};

export const getVoices = async () => {
    try {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', options);
        const response_1 = await response.json();
        const voices = response_1.voices; // Assuming the API response has a "voices" property
        return voices;
    } catch (err) {
        return console.error(err);
    }
};
