import { useState } from "react";
import "./DominantColors.scss";

export const DominantColors = ({
  dominantColors,
  imgElement,
  isLoading,
}: {
  dominantColors: [number, number, number][];
  imgElement: HTMLImageElement | null;
  isLoading: boolean;
}) => {
  const [hoveredColors, setHoveredColors] = useState<
    null | [number, number, number]
  >(null);

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div
          className="input-output-container-colors"
          style={{ height: imgElement?.clientHeight || "auto" }}
        >
          {dominantColors.map((color, index) => (
            <div
              key={index}
              className="input-output-container-colors-box"
              style={{
                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
              }}
              onMouseEnter={() => setHoveredColors(color)}
              onMouseLeave={() => setHoveredColors(null)}
			  onTouchStart={() => setHoveredColors(color)}
			  onTouchEnd={() => setHoveredColors(null)}
            ></div>
          ))}
          {hoveredColors ? (
            <div className="color-tooltip">
              {rgbToHex(hoveredColors[0], hoveredColors[1], hoveredColors[2])}
            </div>
          ) : (
            <div className="color-tooltip">
              Hover 
            </div>
          )}
        </div>
      )}
    </>
  );
};
