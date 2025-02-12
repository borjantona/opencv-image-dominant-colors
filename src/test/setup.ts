import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@techstark/opencv-js", () => ({
	default: {
	  Mat: vi.fn(),
	  onRuntimeInitialized: true, // Simula que OpenCV ya está listo inmediatamente
	},
  }));