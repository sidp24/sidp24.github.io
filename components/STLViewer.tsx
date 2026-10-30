"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Part = {
  file: string;
  label: string;
  description: string;
};

const PARTS: Part[] = [
  {
    file: "/models/worlds-bot.stl",
    label: "Worlds robot",
    description: "Full robot assembly we competed with at the 2025 VEX World Championship in Dallas. Every subsystem — drivetrain, intake, elevator, color sorter — is visible in the assembly. Large file; give it a moment to load.",
  },
  {
    file: "/models/intake.stl",
    label: "Intake",
    description: "Ring intake mechanism — rubber-tip rollers spin to grab game elements off the field and feed them up into the elevator. Designed to accept elements from any angle within the intake width.",
  },
  {
    file: "/models/rollers.stl",
    label: "Rollers",
    description: "Intake roller set — custom-printed SUNLU PETG friction pegs that contact game elements. Peg count, offset angle, and standoff height were all iterated to maximize pickup reliability.",
  },
  {
    file: "/models/belly-pan.stl",
    label: "Chassis belly pan",
    description: "Load-bearing chassis floor plate with a triangulated lightening web — every diagonal brace saves weight while maintaining rigidity. Designed in Onshape, printed on our Elegoo printers.",
  },
  {
    file: "/models/roller-face.stl",
    label: "Intake face bracket",
    description: "Weight-optimized intake mounting bracket with arced relief cuts and a circular axle boss. The geometry is pared to the minimum structure needed to transmit shear load from the roller shaft.",
  },
];

export default function STLViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePart, setActivePart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Stable ref so the part-change effect can call into the running scene
  const loadPartRef = useRef<((url: string) => Promise<void>) | null>(null);

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;

    async function init() {
      if (!containerRef.current) return;
      const container = containerRef.current;

      const THREE = await import("three");
      const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader.js");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

      if (cancelled) return;

      const w = container.clientWidth || 640;
      const h = container.clientHeight || 320;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1e1916);

      // Grid floor (subtle)
      const grid = new THREE.GridHelper(6, 12, 0x2c2318, 0x2c2318);
      grid.position.y = -1.2;
      scene.add(grid);

      // Camera
      const camera = new THREE.PerspectiveCamera(40, w / h, 0.01, 500);
      camera.position.set(3.5, 2.5, 3.5);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Lights
      scene.add(new THREE.AmbientLight(0xede9e4, 0.5));
      const key = new THREE.DirectionalLight(0xfff0e0, 1.4);
      key.position.set(4, 8, 5);
      key.castShadow = true;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xf47085, 0.35);
      fill.position.set(-4, 1, -3);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffddbb, 0.5);
      rim.position.set(0, -3, -5);
      scene.add(rim);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.minDistance = 1;
      controls.maxDistance = 20;

      let currentMesh: THREE.Mesh | null = null;

      async function loadPart(url: string) {
        if (cancelled) return;
        setLoading(true);
        setError(false);

        try {
          const loader = new STLLoader();
          const geometry = await new Promise<THREE.BufferGeometry>((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
          });

          if (cancelled) return;

          if (currentMesh) {
            scene.remove(currentMesh);
            currentMesh.geometry.dispose();
            (currentMesh.material as THREE.Material).dispose();
          }

          geometry.computeBoundingBox();
          const box = geometry.boundingBox!;
          const center = new THREE.Vector3();
          box.getCenter(center);
          geometry.translate(-center.x, -center.y, -center.z);

          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.4 / maxDim;

          const mat = new THREE.MeshStandardMaterial({
            color: 0xd96070,
            roughness: 0.45,
            metalness: 0.15,
          });

          currentMesh = new THREE.Mesh(geometry, mat);
          currentMesh.scale.setScalar(scale);
          // rest the bottom of the model on the grid (grid.position.y = -1.2)
          currentMesh.position.y = -1.2 + (size.y / 2) * scale;
          currentMesh.castShadow = true;
          currentMesh.receiveShadow = true;
          scene.add(currentMesh);

          controls.reset();
          camera.position.set(3.5, 2.5, 3.5);
          setLoading(false);
        } catch {
          if (!cancelled) setError(true);
        }
      }

      loadPartRef.current = loadPart;
      await loadPart(PARTS[activePart].file);

      function animate() {
        rafId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      function onResize() {
        if (!container || cancelled) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener("resize", onResize);

      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        controls.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        loadPartRef.current = null;
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = useCallback(
    (i: number) => {
      setActivePart(i);
      loadPartRef.current?.(PARTS[i].file);
    },
    [],
  );

  return (
    <div className="mt-8">
      {/* Part tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PARTS.map((p, i) => (
          <button
            key={p.file}
            type="button"
            onClick={() => handleSelect(i)}
            className={`rounded px-3 py-1.5 text-sm border transition-colors ${
              i === activePart
                ? "border-accent/60 bg-accent-soft text-ink"
                : "border-rule text-muted hover:border-accent/30 hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative h-80 w-full rounded-[3px] border border-rule overflow-hidden sm:h-96"
      >
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-xs tracking-widest text-muted uppercase">Loading…</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-sm text-muted">Could not load model.</span>
          </div>
        )}
      </div>

      <p className="mt-3 text-[0.88rem] leading-snug text-muted">
        {PARTS[activePart].description}{" "}
        <span className="opacity-60">Drag to rotate · scroll to zoom.</span>
      </p>
    </div>
  );
}
