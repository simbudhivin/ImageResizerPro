// worker.js
self.onmessage = async (event) => {
    const { imageData, format, quality, goalKB } = event.data;
    const minKB = goalKB - 5;
    const maxKB = goalKB + 5;

    let bestBlob = null;
    let bestSize = 0;
    let low = 0.01;
    let high = 1.0;
    let currentQuality = quality;

    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);

    for (let i = 0; i < 12; i++) {
        const blob = await canvas.convertToBlob({ type: format, quality: currentQuality });
        if (!blob) break;

        const sizeKB = blob.size / 1024;
        bestBlob = blob;
        bestSize = sizeKB;

        if (sizeKB >= minKB && sizeKB <= maxKB) break;

        if (sizeKB > maxKB) {
            high = currentQuality;
        } else {
            low = currentQuality;
        }
        currentQuality = (low + high) / 2;
    }

    self.postMessage({ bestBlob, bestSize });
};
