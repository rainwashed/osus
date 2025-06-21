<template>
    <div
        :class="cn('w-full h-full relative overflow-hidden', containerClass)"
        ref="container">
        <canvas
            :class="cn('absolute top-0 left-0 w-full h-full blur-sm', canvasClass)"
            ref="canvas"></canvas>
        <div
            :class="
                cn('absolute top-0 left-0 w-full h-full flex items-center justify-center text-white z-10', textClass)
            ">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onBeforeUnmount, ref } from "vue";
    import * as THREE from "three";
    import { cn } from "@/lib/utils"; // Adjust to match your project

    const props = defineProps<{
        containerClass?: string;
        canvasClass?: string;
        textClass?: string;
    }>();

    const container = ref<HTMLElement | null>(null);
    const canvas = ref<HTMLCanvasElement | null>(null);

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let stars: THREE.Points;
    let animationId: number;
    let clock: THREE.Clock;
    let nebula: THREE.Sprite;

    // Star properties for flickering
    let starData: { twinkleSpeed: number; baseSize: number }[] = [];

    onMounted(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            container.value!.clientWidth / container.value!.clientHeight,
            0.1,
            1000,
        );
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ canvas: canvas.value!, alpha: true });
        renderer.setSize(container.value!.clientWidth, container.value!.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Generate stars
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        starData = [];

        for (let i = 0; i < starCount; i++) {
            const x = (Math.random() - 0.5) * 1000;
            const y = (Math.random() - 0.5) * 1000;
            const z = -Math.random() * 1000;

            positions.set([x, y, z], i * 3);

            const baseSize = 2 + Math.random() * 3; // Bigger stars
            const twinkleSpeed = 1 + Math.random() * 2; // Vary speed

            sizes[i] = baseSize;
            starData.push({ baseSize, twinkleSpeed });
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const vertexShader = `
    attribute float size;
    varying float vTwinkle;
    void main() {
      vTwinkle = size;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

        const fragmentShader = `
    varying float vTwinkle;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
      gl_FragColor = vec4(vec3(1.0), alpha);
    }
  `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
        });

        stars = new THREE.Points(geometry, material);
        scene.add(stars);

        // Nebula texture
        const loader = new THREE.TextureLoader();
        loader.load("https://cdn.jsdelivr.net/gh/akabab/starfield-assets/nebula-1.jpg", (texture) => {
            const material = new THREE.SpriteMaterial({
                map: texture,
                opacity: 0.35,
                transparent: true,
                depthWrite: false,
            });
            nebula = new THREE.Sprite(material);
            nebula.scale.set(40, 25, 1);
            nebula.position.z = -50;
            scene.add(nebula);
        });

        clock = new THREE.Clock();

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // Subtle star field motion
            stars.rotation.y += 0.0002;
            stars.rotation.x += 0.0001;

            // Animate flickering sizes
            const sizes = stars.geometry.attributes.size as THREE.BufferAttribute;
            for (let i = 0; i < starData.length; i++) {
                const { baseSize, twinkleSpeed } = starData[i];
                const flicker = Math.sin(time * twinkleSpeed + i) * 0.5 + 1;
                sizes.setX(i, baseSize * flicker);
            }
            sizes.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();
        window.addEventListener("resize", onResize);
    });

    onBeforeUnmount(() => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
    });

    const onResize = () => {
        if (!container.value) return;
        camera.aspect = container.value.clientWidth / container.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    };
</script>

<style scoped>
    canvas {
        display: block;
    }
</style>
