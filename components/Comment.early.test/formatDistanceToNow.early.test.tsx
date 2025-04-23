import { formatDistanceToNow } from "date-fns";

// Mocking the date-fns formatDistanceToNow function
jest.mock("date-fns", () => ({
  formatDistanceToNow: jest.fn(),
}));

describe("formatDistanceToNow() formatDistanceToNow method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy paths", () => {
    it("should format the date correctly with a suffix", () => {
      // Arrange
      const mockDate = new Date();
      const expectedOutput = "5 minutes ago";
      (formatDistanceToNow as jest.Mock).mockReturnValue(expectedOutput);

      // Act
      const result = formatDistanceToNow(mockDate, { addSuffix: true });

      // Assert
      expect(result).toBe(expectedOutput);
      expect(formatDistanceToNow).toHaveBeenCalledWith(mockDate, {
        addSuffix: true,
      });
    });

    it("should format the date correctly without a suffix", () => {
      // Arrange
      const mockDate = new Date();
      const expectedOutput = "5 minutes";
      (formatDistanceToNow as jest.Mock).mockReturnValue(expectedOutput);

      // Act
      const result = formatDistanceToNow(mockDate, { addSuffix: false });

      // Assert
      expect(result).toBe(expectedOutput);
      expect(formatDistanceToNow).toHaveBeenCalledWith(mockDate, {
        addSuffix: false,
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle a date in the future gracefully", () => {
      // Arrange
      const futureDate = new Date(Date.now() + 100000); // 100 seconds in the future
      const expectedOutput = "in 2 minutes";
      (formatDistanceToNow as jest.Mock).mockReturnValue(expectedOutput);

      // Act
      const result = formatDistanceToNow(futureDate, { addSuffix: true });

      // Assert
      expect(result).toBe(expectedOutput);
      expect(formatDistanceToNow).toHaveBeenCalledWith(futureDate, {
        addSuffix: true,
      });
    });

    it("should handle a date in the distant past gracefully", () => {
      // Arrange
      const pastDate = new Date(0); // Unix epoch start
      const expectedOutput = "over 50 years ago";
      (formatDistanceToNow as jest.Mock).mockReturnValue(expectedOutput);

      // Act
      const result = formatDistanceToNow(pastDate, { addSuffix: true });

      // Assert
      expect(result).toBe(expectedOutput);
      expect(formatDistanceToNow).toHaveBeenCalledWith(pastDate, {
        addSuffix: true,
      });
    });

    it("should handle invalid date input gracefully", () => {
      // Arrange
      const invalidDate = new Date("invalid-date");
      const expectedOutput = "Invalid Date";
      (formatDistanceToNow as jest.Mock).mockReturnValue(expectedOutput);

      // Act
      const result = formatDistanceToNow(invalidDate, { addSuffix: true });

      // Assert
      expect(result).toBe(expectedOutput);
      expect(formatDistanceToNow).toHaveBeenCalledWith(invalidDate, {
        addSuffix: true,
      });
    });
  });
});
