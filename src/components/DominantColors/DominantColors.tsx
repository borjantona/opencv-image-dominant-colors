import "./DominantColors.scss";

export const DominantColors = ({
  dominantColors,
  imgElement,
  isLoading
}: {
  dominantColors: [number, number, number][];
  imgElement: HTMLImageElement | null;
  isLoading: boolean;
}) => {

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
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

