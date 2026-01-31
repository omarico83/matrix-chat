/**
 * Matrix Chat Configuration
 * Edit this file to configure the Giphy API and other settings
 */
const CONFIG = {
  // Smiling GIF URLs
  SMILING_GIFS: [
    'https://media.giphy.com/media/ZfK4cXKJTTay1Ava29/giphy.gif',
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    'https://media.giphy.com/media/3oEjHV0z8S7WM4MwnK/giphy.gif',
    'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif',
    'https://media.giphy.com/media/3o7TKu8RvQuomFfUUU/giphy.gif',
    'https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif',
    'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
    'https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif',
    'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif',
    'https://media.giphy.com/media/l0HlSnvb3D3Me5HsA/giphy.gif',
  ],

  // Matrix rain settings
  MATRIX_RAIN: {
    fontSize: 14,
    fadeOpacity: 0.05,
    dropSpeed: 0.02,
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()+=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  },

  // Chat settings
  CHAT: {
    maxMessageLength: 1000,
    botName: 'Matrix Bot',
    userName: 'You',
    systemName: 'System',
  },

  // Animation settings
  ANIMATIONS: {
    enableScanlines: true,
    enableFlicker: true,
  }
};

Object.freeze(CONFIG);
Object.freeze(CONFIG.SMILING_GIFS);
Object.freeze(CONFIG.MATRIX_RAIN);
Object.freeze(CONFIG.CHAT);
Object.freeze(CONFIG.ANIMATIONS);
