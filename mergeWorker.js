self.onmessage = async function (e) {
  const { files } = e.data;
  try {
    const ctx = new OfflineAudioContext(2, 44100 * 60, 44100);
    const buffers = [];
    for (const fileData of files) {
      const arrayBuffer = await fileData.arrayBuffer();
      const buffer = await ctx.decodeAudioData(arrayBuffer);
      buffers.push(buffer);
    }

    const totalLength = buffers.reduce((sum, b) => sum + b.length, 0);
    const sampleRate = buffers[0].sampleRate;
    const numberOfChannels = Math.max(
      ...buffers.map((b) => b.numberOfChannels)
    );
    const output = new OfflineAudioContext(
      numberOfChannels,
      totalLength,
      sampleRate
    );
    const outputBuffer = output.createBuffer(
      numberOfChannels,
      totalLength,
      sampleRate
    );

    let offset = 0;
    for (const buffer of buffers) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const dest = outputBuffer.getChannelData(channel);
        if (channel < buffer.numberOfChannels) {
          dest.set(buffer.getChannelData(channel), offset);
        } else {
          for (let i = 0; i < buffer.length; i++) dest[offset + i] = 0;
        }
      }
      offset += buffer.length;
    }

    // Convert buffer to WAV Blob
    function encodeWAV(buffer) {
      const len = buffer.length;
      const numChannels = buffer.numberOfChannels;
      const sampleRate = buffer.sampleRate;
      const format = 1; // PCM
      const bitDepth = 16;
      const resultBuffer = new ArrayBuffer(44 + len * numChannels * 2);
      const view = new DataView(resultBuffer);

      function writeString(view, offset, str) {
        for (let i = 0; i < str.length; i++)
          view.setUint8(offset + i, str.charCodeAt(i));
      }

      writeString(view, 0, "RIFF");
      view.setUint32(4, 36 + len * numChannels * 2, true);
      writeString(view, 8, "WAVE");
      writeString(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, format, true);
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numChannels * 2, true);
      view.setUint16(32, numChannels * 2, true);
      view.setUint16(34, bitDepth, true);
      writeString(view, 36, "data");
      view.setUint32(40, len * numChannels * 2, true);

      let offset = 44;
      for (let i = 0; i < len; i++) {
        for (let ch = 0; ch < numChannels; ch++) {
          let sample = buffer.getChannelData(ch)[i];
          sample = Math.max(-1, Math.min(1, sample));
          sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
          view.setInt16(offset, sample, true);
          offset += 2;
        }
      }
      return new Blob([view], { type: "audio/wav" });
    }

    const wavBlob = encodeWAV(outputBuffer);
    const blobUrl = URL.createObjectURL(wavBlob);
    self.postMessage({ success: true, url: blobUrl });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};
