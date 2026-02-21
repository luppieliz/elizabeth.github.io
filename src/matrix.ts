export function initMatrix(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+~`|}{[]:;?><,./-=';
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        // Semi-transparent black to create trailing effect
        ctx!.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);

        ctx!.fillStyle = '#0F0'; // Green text
        ctx!.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

            // Randomly end the drop and reset
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }

    draw();
}
