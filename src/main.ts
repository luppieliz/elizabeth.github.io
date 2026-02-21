import './style.css'
import { initMatrix } from './matrix'
import { AppTerminal } from './terminal'

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Background Matrix Canvas
  const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
  if (canvas) {
    initMatrix(canvas);
  }

  // Initialize Terminal Interface
  const terminalApp = new AppTerminal();
  terminalApp.bootSequence();
});
