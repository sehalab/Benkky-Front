<!-- components/GlobalMoneyGlobe.vue -->
<template>
  <div class="money-movement-globe">
    <!-- Canvas Three.js pour le globe -->
    <canvas ref="globeCanvas" class="globe-canvas"></canvas>

    <!-- Interface utilisateur superposée (comme dans Stripe) -->
    <div class="globe-ui-container">
      <!-- Éléments d'interface flottants (arcs UI) -->
      <div
        v-for="(ui, index) in floatingUI"
        :key="index"
        class="globe-arc-ui"
        :style="{
          '--ui-opacity': ui.opacity,
          '--ui-scale': ui.scale,
          '--ui-x': ui.x + 'px',
          '--ui-y': ui.y + 'px',
          'display': ui.opacity > 0 ? 'block' : 'none'
        }"
      >
        <div class="globe-arc-ui-content">
          <div class="globe-arc-ui-icon" v-html="ui.icon"></div>
          <div class="globe-arc-ui-text">
            <span class="globe-arc-ui-amount">{{ ui.amount }}</span>
            <span class="globe-arc-ui-currency">{{ ui.currency }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu de la carte (comme dans votre structure Stripe) -->
    <div class="modular-solutions-bento-card__content">
      <div class="modular-solutions-bento-card__content-inner">
        <div class="modular-solutions-bento-card__text">
          <h3 class="hds-heading modular-solutions-bento-card__title hds-heading--md">
            Benkky c'est plus que de la finance.
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const props = defineProps({
  autoRotate: {
    type: Boolean,
    default: true
  },
  rotationSpeed: {
    type: Number,
    default: 0.001
  },
  showControls: {
    type: Boolean,
    default: false
  }
});

const globeCanvas = ref(null);
let scene, camera, renderer, globe, controls;
let linesGroup;
let animationFrameId;

// Interface utilisateur flottante (comme dans Stripe)
const floatingUI = reactive([
  {
    opacity: 0.9,
    scale: 0.8,
    x: 150,
    y: 200,
    amount: '$45K',
    currency: 'USDC',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#2775CA"/><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="white"/><path d="M12 8V10M12 14V16M9 12H15" stroke="#2775CA" stroke-width="1.5" stroke-linecap="round"/></svg>'
  },
  {
    opacity: 0.7,
    scale: 0.7,
    x: -180,
    y: 300,
    amount: '$120K',
    currency: 'USDT',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#26A17B"/><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="white"/><path d="M12 8V10M12 14V16M9 12H15" stroke="#26A17B" stroke-width="1.5" stroke-linecap="round"/></svg>'
  },
  {
    opacity: 0.85,
    scale: 0.75,
    x: 220,
    y: -150,
    amount: '$89K',
    currency: 'DAI',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#F5AC37"/><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="white"/><path d="M12 8V10M12 14V16M9 12H15" stroke="#F5AC37" stroke-width="1.5" stroke-linecap="round"/></svg>'
  },
  {
    opacity: 0.6,
    scale: 0.65,
    x: -250,
    y: -100,
    amount: '$234K',
    currency: 'EURC',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#1A4D8C"/><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="white"/><path d="M12 8V10M12 14V16M9 12H15" stroke="#1A4D8C" stroke-width="1.5" stroke-linecap="round"/></svg>'
  },
  {
    opacity: 0.95,
    scale: 0.85,
    x: 50,
    y: -250,
    amount: '$567K',
    currency: 'SOL',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#9945FF"/><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="white"/><path d="M12 8V10M12 14V16M9 12H15" stroke="#9945FF" stroke-width="1.5" stroke-linecap="round"/></svg>'
  }
]);

// Points pour les liaisons (villes mondiales)
const cityPoints = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, weight: 1.0 },
  { name: 'London', lat: 51.5074, lng: -0.1278, weight: 0.9 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, weight: 0.95 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, weight: 0.85 },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, weight: 0.9 },
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737, weight: 0.8 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, weight: 0.7 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, weight: 0.75 },
  { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, weight: 0.8 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, weight: 0.8 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, weight: 0.7 },
  { name: 'Sao Paulo', lat: -23.5505, lng: -46.6333, weight: 0.65 },
  { name: 'Moscow', lat: 55.7558, lng: 37.6173, weight: 0.6 },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, weight: 0.55 },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332, weight: 0.6 }
];

// Convertir lat/lng en coordonnées 3D
const latLngToPosition = (lat, lng, radius) => {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = lng * Math.PI / 180;
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Créer les lignes de liaison entre les villes
const createConnectionLines = () => {
  const group = new THREE.Group();
  const radius = 5; // Rayon du globe

  // Couleurs pour les lignes (dégradé)
  const colors = [
    new THREE.Color(0x3b82f6), // Bleu
    new THREE.Color(0x10b981), // Vert
    new THREE.Color(0x8b5cf6), // Violet
    new THREE.Color(0xf59e0b), // Orange
    new THREE.Color(0xef4444)  // Rouge
  ];

  // Créer des connexions entre certaines villes
  for (let i = 0; i < cityPoints.length; i++) {
    for (let j = i + 1; j < cityPoints.length; j++) {
      // Connexion aléatoire pour simuler des transferts
      if (Math.random() > 0.7) {
        const start = latLngToPosition(cityPoints[i].lat, cityPoints[i].lng, radius);
        const end = latLngToPosition(cityPoints[j].lat, cityPoints[j].lng, radius);

        // Créer une courbe entre les deux points
        const points = [];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Ajouter un point milieu pour créer une courbe
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(radius * 1.2); // Légèrement au-dessus du globe

        // Créer une courbe de Bézier quadratique
        for (let t = 0; t <= 1; t += 0.02) {
          const p0 = start.clone();
          const p1 = mid.clone();
          const p2 = end.clone();

          // Interpolation quadratique de Bézier
          const point = new THREE.Vector3()
            .copy(p0.clone().multiplyScalar(Math.pow(1 - t, 2)))
            .add(p1.clone().multiplyScalar(2 * (1 - t) * t))
            .add(p2.clone().multiplyScalar(t * t));

          points.push(point);
        }

        // Créer la géométrie de la ligne
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.3 + Math.random() * 0.3
        });
        const line = new THREE.Line(geometry, material);
        group.add(line);

        // Ajouter une particule animée sur la ligne
        const particleCount = 3;
        for (let k = 0; k < particleCount; k++) {
          const particleGeometry = new THREE.SphereGeometry(0.08, 8, 8);
          const particleMaterial = new THREE.MeshBasicMaterial({ color: color });
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          particle.userData = {
            type: 'moving-particle',
            lineIndex: group.children.length - 1,
            offset: k / particleCount,
            speed: 0.002 + Math.random() * 0.003,
            points: points
          };
          group.add(particle);
        }
      }
    }
  }

  return group;
};

// Créer les points lumineux pour les villes
const createCityPoints = () => {
  const group = new THREE.Group();
  const radius = 5;

  cityPoints.forEach((city, index) => {
    const pos = latLngToPosition(city.lat, city.lng, radius);

    // Point principal
    const geometry = new THREE.SphereGeometry(0.1 * city.weight, 16, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1e40af,
      emissiveIntensity: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(pos);
    group.add(sphere);

    // Halo lumineux
    const haloGeometry = new THREE.SphereGeometry(0.2 * city.weight, 16, 16);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.position.copy(pos);
    group.add(halo);
  });

  return group;
};

// Initialisation de la scène Three.js
const initScene = () => {
  if (!globeCanvas.value) return;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1929); // Fond sombre

  // Camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 15);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: globeCanvas.value,
    antialias: true,
    alpha: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x404060);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  const backLight = new THREE.PointLight(0x4466aa, 0.5);
  backLight.position.set(-5, 0, -5);
  scene.add(backLight);

  // Controls
  if (props.showControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = props.autoRotate;
    controls.autoRotateSpeed = props.rotationSpeed * 10;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
  }

  // Create globe
  const geometry = new THREE.SphereGeometry(5, 64, 64);

  // Texture du globe
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  const cloudTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');

  // Matériau de base
  const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 5,
    emissive: new THREE.Color(0x112233)
  });

  globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Ajouter les nuages
  const cloudGeometry = new THREE.SphereGeometry(5.02, 64, 64);
  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(clouds);

  // Ajouter les points lumineux des villes
  const cityPointsGroup = createCityPoints();
  scene.add(cityPointsGroup);

  // Ajouter les lignes de connexion
  linesGroup = createConnectionLines();
  scene.add(linesGroup);

  // Ajouter une atmosphère
  const atmosphereGeometry = new THREE.SphereGeometry(5.1, 64, 64);
  const atmosphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x3399ff,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphere);

  // Étoiles en arrière-plan
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 2000;
  const starsPositions = new Float32Array(starsCount * 3);
  for (let i = 0; i < starsCount * 3; i += 3) {
    starsPositions[i] = (Math.random() - 0.5) * 200;
    starsPositions[i+1] = (Math.random() - 0.5) * 200;
    starsPositions[i+2] = (Math.random() - 0.5) * 200;
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  // Animation
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    // Rotation automatique
    if (props.autoRotate && !props.showControls) {
      globe.rotation.y += props.rotationSpeed;
      clouds.rotation.y += props.rotationSpeed * 1.1;
      cityPointsGroup.rotation.y += props.rotationSpeed;
      linesGroup.rotation.y += props.rotationSpeed;
    }

    // Animer les particules sur les lignes
    if (linesGroup) {
      linesGroup.children.forEach(child => {
        if (child.userData && child.userData.type === 'moving-particle') {
          const points = child.userData.points;
          if (points && points.length > 0) {
            child.userData.offset += child.userData.speed;
            if (child.userData.offset > 1) {
              child.userData.offset = 0;
            }

            const t = child.userData.offset;
            const index = Math.floor(t * (points.length - 1));
            const nextIndex = Math.min(index + 1, points.length - 1);
            const frac = t * (points.length - 1) - index;

            if (points[index] && points[nextIndex]) {
              const pos = points[index].clone().lerp(points[nextIndex], frac);
              child.position.copy(pos);
            }
          }
        }
      });
    }

    if (controls) controls.update();

    renderer.render(scene, camera);
  };

  animate();
};

// Gestion du redimensionnement
const handleResize = () => {
  if (!camera || !renderer) return;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// Mise à jour des positions UI
const updateUIPositions = () => {
  // Animation aléatoire des UI flottants
  setInterval(() => {
    floatingUI.forEach(ui => {
      ui.opacity = 0.5 + Math.random() * 0.5;
      ui.scale = 0.6 + Math.random() * 0.3;
    });
  }, 3000);
};

onMounted(() => {
  initScene();
  window.addEventListener('resize', handleResize);
  updateUIPositions();
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('resize', handleResize);

  // Nettoyage Three.js
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.money-movement-globe {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1929 0%, #0F2727 100%);
  border-radius: 24px;
}

.globe-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.globe-ui-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.globe-arc-ui {
  position: absolute;
  transform: translate(var(--ui-x), var(--ui-y)) scale(var(--ui-scale));
  opacity: var(--ui-opacity);
  transition: opacity 0.3s ease, transform 0.3s ease;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
  pointer-events: none;
}

.globe-arc-ui-content {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 40px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: floatUI 3s ease-in-out infinite;
}

@keyframes floatUI {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.globe-arc-ui-icon {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.globe-arc-ui-icon svg {
  width: 100%;
  height: 100%;
}

.globe-arc-ui-text {
  display: flex;
  flex-direction: column;
}

.globe-arc-ui-amount {
  font-size: 14px;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  font-family: 'Courier New', monospace;
}

.globe-arc-ui-currency {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Contenu de la carte (comme dans Stripe) */
.modular-solutions-bento-card__content {
  position: relative;
  z-index: 20;
  padding: 24px;
  pointer-events: none;
}

.modular-solutions-bento-card__text {
  max-width: 280px;
  background: rgba(10, 25, 41, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(106, 196, 166, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hds-heading {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  color: white;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .money-movement-globe {
    min-height: 400px;
  }

  .globe-arc-ui-content {
    padding: 6px 12px;
  }

  .globe-arc-ui-icon {
    width: 20px;
    height: 20px;
  }

  .globe-arc-ui-amount {
    font-size: 12px;
  }

  .globe-arc-ui-currency {
    font-size: 8px;
  }

  .modular-solutions-bento-card__text {
    max-width: 220px;
    padding: 16px;
  }

  .hds-heading {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .money-movement-globe {
    min-height: 350px;
  }

  .modular-solutions-bento-card__text {
    max-width: 100%;
    margin: 0 16px;
  }
}
</style>
