document.addEventListener('DOMContentLoaded', () => {
  console.log('[MATRIX] Initializing chat...');

  const matrixRain = new MatrixRain('matrix-canvas');
  matrixRain.start();
  console.log('[MATRIX] Rain animation started');

  const chat = new ChatInterface();
  console.log('[MATRIX] Chat interface initialized');

  if (!CONFIG.ANIMATIONS.enableScanlines) {
    document.querySelector('.scanlines').style.display = 'none';
  }
  if (!CONFIG.ANIMATIONS.enableFlicker) {
    document.querySelector('.crt-flicker').style.display = 'none';
  }

  console.log('[MATRIX] Chat ready');
});
