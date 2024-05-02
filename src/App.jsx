import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './App.css';

function App() {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
            });
        });

        Promise.all(newImages).then(images => {
            setImages(prevImages => [...prevImages, ...images]);
            if (selectedImageIndex === null && images.length > 0) {
                setSelectedImageIndex(0);
            }
        });
    };

    const selectImage = index => {
        setSelectedImageIndex(index);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
    };

    return (
        <div>
            {imageSrc ? (
                <React.Fragment>
                    <div className={classes.cropContainer}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className={classes.controls}>
                        <div className={classes.sliderContainer}>
                            <Typography
                                variant="overline"
                                classes={{root: classes.sliderLabel}}
                            >
                                Zoom
                            </Typography>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                classes={{root: classes.slider}}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                        <div className={classes.sliderContainer}>
                            <Typography
                                variant="overline"
                                classes={{root: classes.sliderLabel}}
                            >
                                Rotation
                            </Typography>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                aria-labelledby="Rotation"
                                classes={{root: classes.slider}}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </div>
                        <Button
                            onClick={showCroppedImage}
                            variant="contained"
                            color="primary"
                            classes={{root: classes.cropButton}}
                        >
                            Show Result
                        </Button>
                    </div>
                    <ImgDialog img={croppedImage} onClose={onClose}/>
                </React.Fragment>
            ) : (
                <input type="file" onChange={onFileChange} accept="image/*"/>
            )}
        </div>


    <div className="App">
        <div className="floor-plan-modify">
            <div className="sidebar">
                <input type="file" multiple accept="image/*" onChange={handleFileChange}/>
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`floor-plan-${index}`}
                         className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
                         onClick={() => selectImage(index)}
                    />
                ))}
            </div>
            <div className="main">
                <div className="image-plate">
                    {selectedImageIndex !== null && (
                        <Cropper
                            image={images[selectedImageIndex]}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onZoomChange={setZoom}
                        />
                    )}
                </div>
                <div className="properties">
                    <div>
                        <label>Zoom</label>
                        <input type="range" value={zoom} min={1} max={3} step={0.1}
                               onChange={event => setZoom(event.target.value)}/>
                    </div>
                    <div>
                        <label>Rotation</label>
                        <input type="range" value={rotation} min={0} max={360} step={1}
                               onChange={event => setRotation(event.target.value)}/>
                    </div>
                </div>

            </div>
        </div>
    </div>
)
    ;
}

export default App;
