export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Draw rotated image on canvas
    // This logic may be expanded based on your requirements

    return new Promise((resolve, reject) => {
        image.onload = () => {
            try {
                canvas.width = pixelCrop.width;
                canvas.height = pixelCrop.height;
                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height
                );

                const dataUrl = canvas.toDataURL('image/jpeg');
                resolve(dataUrl);
            } catch (e) {
                reject(e);
            }
        };
    });
}
