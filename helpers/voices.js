import fetch from 'node-fetch';

const options = {method: 'GET', headers: {'xi-api-key': '9b139b9c3761bd2453c432ce92ca4498'}};

export const getVoices = async () => {
    try {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', options);
        const response_1 = await response.json();
        const voices = response_1.voices; // Assuming the API response has a "voices" property
        // Sort the voices by name
        voices.sort((a, b) => a.name.localeCompare(b.name));
        return voices;
    } catch (err) {
        return console.error(err);
    }
};

export const voiceOverVoices = [
    { label: "Natasha", voiceId: "gKudNzYSuD2TXBq0fV7A"},
    { label: "Marcus", voiceId: "g40ERfon1UOYXq0t5W5J"},
    { label: "Victoria", voiceId: "i8oJQmHsoK7h9nvT29EP"},
    { label: "Joanne", voiceId: "wtmgNfg9pBwzZiFeS1Gm"},
    { label: "Knightley", voiceId: "z7PuneW6l0vpT2tllezi"},
  ];