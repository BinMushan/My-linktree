// 🌗 Theme toggle setup
const toggleInput = document.getElementById('theme-toggle');
const body = document.body;
const lightIcon = document.getElementById('light-icon');
const darkIcon = document.getElementById('dark-icon');

// 🌓 Toggle dark/light mode when switch is changed
toggleInput.addEventListener('change', () => {
  body.classList.toggle('dark-mode');

  // Switch icons and colors depending on the active mode
  if (body.classList.contains('dark-mode')) {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'inline';
    setCodeRainColor('#00ffff');
    setSwitchColors('#00ffff', 'rgba(0, 255, 255, 0.4)');
  } else {
    lightIcon.style.display = 'inline';
    darkIcon.style.display = 'none';
    setCodeRainColor('#004d4d');
    setSwitchColors('#004d4d', 'rgba(0, 77, 77, 0.3)');
  }

  updateLineColors(); // Update 3D line color with mode
});

// 🌑 Ensure dark mode is set on first load
window.addEventListener('DOMContentLoaded', () => {
  // Set dark mode visually
  body.classList.add('dark-mode');
  toggleInput.checked = true;
  lightIcon.style.display = 'none';
  darkIcon.style.display = 'inline';

  // Apply dark colors
  setCodeRainColor('#00ffff');
  setSwitchColors('#00ffff', 'rgba(0, 255, 255, 0.4)');
  updateLineColors();
});

// 🔧 Utility to change color of code rain effect
function setCodeRainColor(color) {
  document.querySelectorAll('.code-rain').forEach(elem => {
    elem.style.color = color;
  });
}

// 🔧 Utility to update toggle switch color
function setSwitchColors(color, bgColor) {
  const slider = document.querySelector('.slider');
  slider.style.color = color;
  slider.style.backgroundColor = bgColor;
}

// 💬 Typewriter effect loop for name and title
const textList = ["Welcome to my LinkTree", "I'm Bin Mushan", "An Undergraduate"];
let textIndex = 0;
let charIndex = 0;
const nameType = document.getElementById("name-type");
const introText = document.getElementById("intro-text");

function typeNext() {
  // Show first text as static intro
  if (textIndex === 0) {
    introText.textContent = textList[0];
  } else {
    // Animate typewriter effect for next lines
    nameType.textContent = textList[textIndex].substring(0, charIndex);
    charIndex++;

    // After typing one line, switch to the next
    if (charIndex > textList[textIndex].length) {
      if (textIndex === 1) {
        textIndex = 2;
      } else if (textIndex === 2) {
        textIndex = 1;
      }
      charIndex = 0;
      setTimeout(typeNext, 1500); // Pause before switching
      return;
    }
  }
  setTimeout(typeNext, 120); // Typing speed
}

// Start loop after a short delay
setTimeout(() => {
  textIndex++;
  typeNext();
}, 1800);

// 💻 Code rain generator
const rainText = `01 <div> function() return [CSS3] <script> className </div> const var =>`;
const leftRain = document.querySelector('.code-rain.left');
const rightRain = document.querySelector('.code-rain.right');

// Fill code rain with lines of code
function fillCodeRain(container) {
  let html = '';
  for (let i = 0; i < 50; i++) {
    html += rainText + '<br>';
  }
  container.innerHTML = html;
}
fillCodeRain(leftRain);
fillCodeRain(rightRain);

// 🎥 Three.js background: animated 3D lines
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 10;

// Materials for light and dark mode lines
const lines = [];
const materialLight = new THREE.LineBasicMaterial({ color: 0x004d4d });
const materialDark = new THREE.LineBasicMaterial({ color: 0x00ffff });
let currentMaterial = materialDark; // Start with dark

// Create 3D lines
for (let i = 0; i < 100; i++) {
  const geometry = new THREE.BufferGeometry();
  const points = [];
  for (let j = 0; j < 10; j++) {
    points.push(new THREE.Vector3(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10
    ));
  }
  geometry.setFromPoints(points);
  const line = new THREE.Line(geometry, currentMaterial);
  scene.add(line);
  lines.push(line);
}

// Animate the 3D lines continuously
function animate() {
  requestAnimationFrame(animate);
  lines.forEach(line => {
    line.rotation.x += 0.001;
    line.rotation.y += 0.002;
  });
  renderer.render(scene, camera);
}
animate();

// Handle resizing of 3D canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 🌐 Update 3D line material based on current theme
function updateLineColors() {
  currentMaterial = body.classList.contains('dark-mode') ? materialDark : materialLight;
  lines.forEach(line => line.material = currentMaterial);
}

// ⚡ Mouse-following lightning cursor glow
const lightCursor = document.createElement('div');
lightCursor.className = 'cursor-light';
document.body.appendChild(lightCursor);

document.addEventListener('mousemove', (e) => {
  lightCursor.style.left = `${e.clientX}px`;
  lightCursor.style.top = `${e.clientY}px`;
});

window.addEventListener('click', () => {
  const music = document.getElementById('bg-music');
  if (music && music.paused) {
    music.play();
  }
}, { once: true });
