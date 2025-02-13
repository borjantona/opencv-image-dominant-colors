import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import cv from "@techstark/opencv-js";
import "./ImageProcessor.scss";
import { DominantColors } from "../DominantColors/DominantColors";
import { getDominantColors } from "../../utils/opencv.utils";

export const ImageProcessor = () => {
  const imageSrc = useRef<string>(undefined);
  const imgElement = useRef<HTMLImageElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [dominantColors, setDominantColors] = useState<
    [number, number, number][]
  >([]);
  const [cvReady, setCvReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (cv.Mat) {
      console.log("✅ OpenCV is ready");
      setCvReady(true);
    } else {
      console.log("⏳ Waiting for OpenCV to load...");
      cv.onRuntimeInitialized = () => {
        console.log("🚀 OpenCV.js loaded correctly.");
        setCvReady(true);
      };
    }
  }, []);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file?.[0]) {
      imageSrc.current = URL.createObjectURL(file[0]);
      forceUpdate();
    }
  };

  const handleOnLoad = () => {
    setIsImageLoaded(true);
	setDominantColors([]);
    setIsLoading(false);
  };

  const handleOnProcess = async () => {
    setIsLoading(true);
    setTimeout(() => {
      processImage();
    }, 100);
  };

  const processImage = async () => {
    if (imgElement.current) {
      try {
        const colors = await getDominantColors(imgElement.current, 5);
        setDominantColors(colors);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {cvReady ? (
        <div>
          <div className="input-output-container">
            <div className="input-output-container-image">
              {imageSrc.current && (
                <img
                  className="input-output-container-image-item"
                  ref={imgElement}
                  onLoad={handleOnLoad}
                  alt="No Image"
                  src={imageSrc.current}
                />
              )}
            </div>
            <DominantColors dominantColors={dominantColors} imgElement={imgElement.current} isLoading={isLoading} />
          </div>

          <div className="custom-file">
            <input
              type="file"
              onChange={onFileChange}
              ref={inputElement}
              id="file-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload" className="custom-file-upload">
              📁 Upload Image
            </label>
            {isImageLoaded && (
              <button onClick={handleOnProcess} className="custom-file-upload">
                💻 Process Image
              </button>
            )}
          </div>
        </div>
      ) : (
        <h2>⏳ Loading OpenCV... ⏳</h2>
      )}
    </>
  );
};
