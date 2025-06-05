<h1 align="center">
  🎧 <strong>Trimify</strong>
  <br>
  <sub><sup><i>Edit audio fast. No uploads. In your browser.</i></sup></sub>
</h1>

<p align="center">
  <img src="https://github.com/keshu-codes/trimify/blob/main/Trimify.jpg?raw=true" alt="Trimify Screenshot" width="80%" />
</p>

<p align="center">
  <a href="https://github.com/keshu-codes/trimify">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
  <a href="https://keshu-codes.github.io/trimify">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-Click%20Here-blue.svg?style=flat&logo=githubpages">
  </a>
  <img alt="Built with HTML, CSS, JS" src="https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS-orange">
</p>

---

## 🚀 Live Demo

👉 *Try it now:* [https://keshu-codes.github.io/trimify](https://keshu-codes.github.io/trimify)

---

## ✨ Features

- ✂ *Trim Audio* — Select start/end and download trimmed clip
- ➕ *Merge Tracks* — Combine multiple audio files in sequence
- ⚡ *Fast & Lightweight* — No backend, loads instantly
- 🔒 *Privacy First* — Files never leave your device
- 📱 *Mobile-Optimized* — Smooth experience on all screen sizes

---

## 🎥 Demo (GIF Preview)

> Show how your app works visually. Replace the GIF URL below once recorded.

<p align="center">
  <img src="https://github.com/keshu-codes/trimify/blob/main/Trimify.gif?raw=true" alt="Trimify Demo GIF" width="90%" />
</p>

---

## 🧠 How It Works

### 🔹 Trim Audio

```js
// Load and decode the file
const arrayBuffer = await file.arrayBuffer();
const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

// Select a segment
const startSample = Math.floor(startTime * sampleRate);
const endSample = Math.floor(endTime * sampleRate);

// Create trimmed buffer
const trimmedBuffer = audioContext.createBuffer(...);
