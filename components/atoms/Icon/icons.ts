// This file will map a name to its SVG path data.
// You can get the 'd' attribute from any SVG file.
export const icons = {
  'video-camera': 'M23 7l-7 5 7 5V7z M0 5h14v14H0V5z', // A simple representative icon
  'bookmark': 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z',
  search:
    'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  close:
    'M6 18L18 6M6 6l12 12',
  cart:
    'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  // --- NEW ICONS ---
  'chevron-right': 'M9 5l7 7-7 7',
  'check': 'M5 13l4 4L19 7',
  'chevron-down': 'M19 9l-7 7-7-7', // <-- Please ensure this line is added
  'filter': 'M4 6h16M7 11h10M10 16h4', // <-- Add this line
  star:
    'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  'trash': 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2',
  'arrow-left': 'M19 12H5M12 19l-7-7 7-7', // <-- Add this line
  'check-circle': 'M22 11.08V12a10 10 0 11-5.93-9.14', // A circle checkmark path
  'check-2': 'M20 6L9 17l-5-5',
};
