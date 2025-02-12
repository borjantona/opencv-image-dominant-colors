import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImageProcessor } from "./ImageProcessor";

describe("ImageProcessor", () => {
  it("verify that OpenCV is loaded and the component is displayed correctly", async () => {
    render(<ImageProcessor />);

    await waitFor(() => {
      expect(
        screen.queryByText("⏳ Cargando OpenCV... ⏳")
      ).not.toBeInTheDocument();
    });

    expect(screen.getByText("📁 Subir Imagen")).toBeInTheDocument();
  });
});
