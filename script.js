const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const words = "Disculpa CorazÓN";
const particles = [];

// Ajustes de diseño
const particleCount = 150; 
const heartSize = 20; // Tamaño ideal para móvil y PC

function drawHeart(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x, y };
}

class Particle {
    constructor(angle) {
        this.angle = angle;
        this.speed = 0.01; // VELOCIDAD LENTA Y ROMÁNTICA
        this.color = "rgba(255, 0, 0, 1)"; // ROJO PURO
    }

    update() {
        this.angle += this.speed;
    }

    draw() {
        const pos = drawHeart(this.angle);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.translate(centerX + pos.x * heartSize, centerY + pos.y * heartSize);
        ctx.rotate(this.angle + Math.PI / 2);

        // Efecto Neón Rojo
        ctx.shadowBlur = 15; 
        ctx.shadowColor = "#FF0000"; 

        ctx.fillStyle = this.color;
        ctx.font = "bold 16px 'Segoe UI', sans-serif";
        ctx.fillText(words, 0, 0);
        ctx.restore();
    }
}

// Inicializar partículas
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle((i / particleCount) * Math.PI * 2));
}

function animate() {
    // Fondo negro sólido
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

// Redimensionar ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();

// Lógica de Audio y Botón
const music = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicBtn');

music.volume = 0.5;

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play()
            .then(() => {
                musicBtn.textContent = "⏸ Pausar Música";
                musicBtn.style.borderColor = "#FF0000";
            })
            .catch(error => {
                console.log("Error al reproducir:", error);
            });
    } else {
        music.pause();
        musicBtn.textContent = "▶️ Reanudar Música";
    }
});