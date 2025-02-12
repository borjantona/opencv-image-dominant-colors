import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import cv from "@techstark/opencv-js";
import "./ImageProcessor.scss";

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
        forceUpdate();
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

  const handleOnProcess = async () => {
    setIsLoading(true);
    setTimeout(() => {
      processImage();
    }, 10);
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
    } else {
      console.log(event);
    }
  };

  const handleOnLoad = () => {
    setIsImageLoaded(true);
	setDominantColors([]);
    setIsLoading(false);
  };

  async function getDominantColors(
    imageElement: HTMLImageElement,
    k: number = 3
  ) {
    return new Promise<[number, number, number][]>((resolve, reject) => {
      try {
        console.log("⏳ Processing image...⏳");
        let src = cv.imread(imageElement);

        if (src.type() === cv.CV_8UC4) {
          const temp = new cv.Mat();
          cv.cvtColor(src, temp, cv.COLOR_RGBA2RGB);
          src.delete();
          src = temp;
        }

        const samples = new cv.Mat(src.rows * src.cols, 3, cv.CV_32F);
        let index = 0;

        for (let i = 0; i < src.rows; i++) {
          for (let j = 0; j < src.cols; j++) {
            const pixelIndex = (i * src.cols + j) * 3;
            samples.data32F[index * 3] = src.data[pixelIndex]; // R
            samples.data32F[index * 3 + 1] = src.data[pixelIndex + 1]; // G
            samples.data32F[index * 3 + 2] = src.data[pixelIndex + 2]; // B
            index++;
          }
        }

        const labels = new cv.Mat();
        const centers = new cv.Mat();
        cv.kmeans(
          samples,
          k,
          labels,
          new cv.TermCriteria(
            cv.TermCriteria_EPS + cv.TermCriteria_MAX_ITER,
            10,
            1.0
          ),
          5,
          2,
          centers
        );

        const colors: [number, number, number][] = [];
        for (let i = 0; i < centers.rows; i++) {
          const color: [number, number, number] = [
            Math.round(centers.data32F[i * 3]), // R
            Math.round(centers.data32F[i * 3 + 1]), // G
            Math.round(centers.data32F[i * 3 + 2]), // B
          ];
          colors.push(color);
        }

        src.delete();
        samples.delete();
        labels.delete();
        centers.delete();

        resolve(colors);
      } catch (error) {
        reject(error);
      }
    });
  }

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
            {isLoading ? (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <div
                className="input-output-container-colors"
                style={{ height: imgElement.current?.clientHeight || "auto" }}
              >
                {dominantColors.map((color, index) => (
                  <div
                    key={index}
                    className="input-output-container-colors-box"
                    style={{
                      backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          <div className="caption">
            <input
              type="file"
              onChange={onFileChange}
              name="file"
              ref={inputElement}
              id="file-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload" className="custom-file-upload">
              📁 Upload Image
            </label>
            {isImageLoaded && (
              <label onClick={handleOnProcess} className="custom-file-upload">
                💻 Process Image
              </label>
            )}
          </div>
        </div>
      ) : (
        <h2>⏳ Loading OpenCV... ⏳</h2>
      )}
    </>
  );
};
