import '@testing-library/jest-dom';

window.matchMedia = jest.fn().mockImplementation(query => ({
  addListener: jest.fn(),
  matches: false,
  media: query,
  onchange: null,
  removeListener: jest.fn(),
}));
