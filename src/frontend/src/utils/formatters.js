/**
 * Format a date string to a more readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Format a temperature value with the appropriate unit
 * @param {number} temp - Temperature value
 * @returns {string} Formatted temperature with unit
 */
export const formatTemperature = (temp) => {
  return `${temp.toFixed(1)}°C`;
};

/**
 * Format a humidity value with the appropriate unit
 * @param {number} humidity - Humidity value
 * @returns {string} Formatted humidity with unit
 */
export const formatHumidity = (humidity) => {
  return `${humidity.toFixed(1)}%`;
};

/**
 * Format a pH value
 * @param {number} ph - pH value
 * @returns {string} Formatted pH value
 */
export const formatPH = (ph) => {
  return ph.toFixed(1);
};

/**
 * Get a color based on the temperature value
 * @param {number} temp - Temperature value
 * @returns {string} Color code
 */
export const getTemperatureColor = (temp) => {
  if (temp < 18) return '#2196f3'; // Cold - blue
  if (temp > 28) return '#f44336'; // Hot - red
  return '#4caf50'; // Normal - green
};

/**
 * Get a color based on the humidity value
 * @param {number} humidity - Humidity value
 * @returns {string} Color code
 */
export const getHumidityColor = (humidity) => {
  if (humidity < 30) return '#f44336'; // Dry - red
  if (humidity > 70) return '#2196f3'; // Wet - blue
  return '#4caf50'; // Normal - green
};

/**
 * Get a color based on the pH value
 * @param {number} ph - pH value
 * @returns {string} Color code
 */
export const getPHColor = (ph) => {
  if (ph < 6.0) return '#f44336'; // Acidic - red
  if (ph > 7.5) return '#2196f3'; // Alkaline - blue
  return '#4caf50'; // Neutral - green
}; 