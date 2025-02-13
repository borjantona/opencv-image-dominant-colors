import cv from "@techstark/opencv-js";

export async function getDominantColors(
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
