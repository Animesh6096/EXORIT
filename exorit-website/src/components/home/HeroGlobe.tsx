import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Clock,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'
import { globePoints } from './globePoints.generated'
import { locations } from '../../config/site'

/**
 * Hero globe: land as dots, arcs from Dhaka to the other places in
 * `locations` — the same real geography as the contact-page map. Loaded lazily
 * and only on large screens with motion allowed (see Home.tsx), so none of this
 * reaches phones or blocks the headline. Pauses when off screen or the tab is
 * hidden.
 */
/** Palettes per theme. Additive glow vanishes on a light page, so light mode uses normal blending. */
const PALETTES = {
  dark: { core: '#07142b', coreOpacity: 0.92, dots: '#6fb3ff', dotsOpacity: 0.8, glow: '#3d9bff', glowStrength: 0.34, arc: '#3d9bff', arcOpacity: 0.22, comet: '#bfe0ff', city: '#ffffff', pulse: '#3d9bff', additive: true },
  light: { core: '#eef4fc', coreOpacity: 0.96, dots: '#1d6fd8', dotsOpacity: 0.55, glow: '#7cb8ff', glowStrength: 0.2, arc: '#007bff', arcOpacity: 0.3, comet: '#0057c2', city: '#0b3d91', pulse: '#007bff', additive: false },
}
const RADIUS = 1

const toVector = (lat: number, lng: number, r = RADIUS) => {
  const la = (lat * Math.PI) / 180
  const lo = (lng * Math.PI) / 180
  return new Vector3(r * Math.cos(la) * Math.cos(lo), r * Math.sin(la), -r * Math.cos(la) * Math.sin(lo))
}

/** Great-circle arc between two points, lifted off the surface in the middle. */
const arcPoints = (a: Vector3, b: Vector3, segments = 96) => {
  const lift = 0.12 + a.angleTo(b) * 0.14
  const pts: Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = a.angleTo(b)
    const sin = Math.sin(angle)
    const p = a
      .clone()
      .multiplyScalar(Math.sin((1 - t) * angle) / sin)
      .add(b.clone().multiplyScalar(Math.sin(t * angle) / sin))
    pts.push(p.normalize().multiplyScalar(RADIUS + Math.sin(Math.PI * t) * lift))
  }
  return pts
}

const dotTexture = () => {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.45, 'rgba(255,255,255,0.9)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new CanvasTexture(c)
}

const HeroGlobe = ({ onReady, dark = true }: { onReady?: () => void; dark?: boolean }) => {
  const mount = useRef<HTMLDivElement>(null)
  // Kept in a ref so a new callback from the parent never rebuilds the scene.
  const readyRef = useRef(onReady)
  readyRef.current = onReady

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const pal = PALETTES[dark ? 'dark' : 'light']
    const blending = pal.additive ? AdditiveBlending : NormalBlending

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 4.2)

    const globe = new Group()
    // Dhaka sits just right of centre, where the hero's device mockups do not
    // cover it. The globe sways around this angle rather than spinning, so the
    // arcs stay in view.
    const baseSpin = -163 * (Math.PI / 180)
    globe.rotation.set(0.28, baseSpin, 0)
    scene.add(globe)

    // Solid core hides the dots on the far side.
    const core = new Mesh(
      new SphereGeometry(RADIUS * 0.985, 64, 64),
      new MeshBasicMaterial({ color: pal.core, transparent: true, opacity: pal.coreOpacity })
    )
    globe.add(core)

    // Atmosphere: a back-facing shell with a fresnel falloff.
    const atmosphere = new Mesh(
      new SphereGeometry(RADIUS * 1.18, 64, 64),
      new ShaderMaterial({
        side: BackSide,
        transparent: true,
        blending,
        depthWrite: false,
        uniforms: { color: { value: new Color(pal.glow) }, strength: { value: pal.glowStrength } },
        vertexShader: `varying vec3 vNormal;
          void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 color; uniform float strength; varying vec3 vNormal;
          void main(){ float i = pow(0.6 - dot(vNormal, vec3(0.0,0.0,1.0)), 4.0); gl_FragColor = vec4(color, clamp(i * strength * 1.6, 0.0, 1.0)); }`,
      })
    )
    scene.add(atmosphere)

    // Land dots.
    const count = globePoints.length / 2
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const v = toVector(globePoints[i * 2], globePoints[i * 2 + 1], RADIUS)
      positions.set([v.x, v.y, v.z], i * 3)
    }
    const dotsGeometry = new BufferGeometry()
    dotsGeometry.setAttribute('position', new BufferAttribute(positions, 3))
    const sprite = dotTexture()
    const dots = new Points(
      dotsGeometry,
      new PointsMaterial({ size: 0.026, map: sprite, color: pal.dots, transparent: true, opacity: pal.dotsOpacity, depthWrite: false })
    )
    globe.add(dots)

    // Cities.
    const cityVectors = locations.map(l => toVector(l.lat, l.lng, RADIUS * 1.004))
    const cityGeometry = new BufferGeometry().setFromPoints(cityVectors)
    const cities = new Points(
      cityGeometry,
      new PointsMaterial({ size: 0.07, map: sprite, color: pal.city, transparent: true, depthWrite: false })
    )
    globe.add(cities)

    const pulses = cityVectors.map(v => {
      const ring = new Points(
        new BufferGeometry().setFromPoints([v]),
        new PointsMaterial({ size: 0.1, map: sprite, color: pal.pulse, transparent: true, depthWrite: false, blending })
      )
      globe.add(ring)
      return ring
    })

    // Arcs from the first team location (Dhaka) to every other place.
    const origin = cityVectors[0]
    const arcs = cityVectors.slice(1).map((target, i) => {
      const pts = arcPoints(origin, target)
      const faint = new Line(
        new BufferGeometry().setFromPoints(pts),
        new LineBasicMaterial({ color: pal.arc, transparent: true, opacity: pal.arcOpacity })
      )
      const comet = new Line(
        new BufferGeometry().setFromPoints(pts),
        new LineBasicMaterial({ color: pal.comet, transparent: true, opacity: 0.95, blending })
      )
      globe.add(faint, comet)
      return { comet, total: pts.length, offset: i * 0.33 }
    })

    // Sizing.
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // Pointer parallax.
    const target = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.25
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.15
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    // Only animate while visible.
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) loop()
    })
    io.observe(el)
    const onVisibility = () => {
      if (!document.hidden) loop()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const clock = new Clock()
    let elapsed = 0
    let frame = 0
    let ready = false
    const baseTilt = globe.rotation.x

    function loop() {
      cancelAnimationFrame(frame)
      if (!visible || document.hidden) return
      frame = requestAnimationFrame(loop)
      const dt = Math.min(clock.getDelta(), 0.05)
      elapsed += dt

      globe.rotation.y = baseSpin + Math.sin(elapsed * 0.12) * 0.35
      globe.rotation.x += (baseTilt + target.y - globe.rotation.x) * 0.04
      scene.rotation.y += (target.x - scene.rotation.y) * 0.04

      arcs.forEach(({ comet, total, offset }) => {
        const t = ((elapsed * 0.28 + offset) % 1.4) / 1.4
        const head = Math.floor(t * (total + 24))
        const start = Math.max(0, head - 24)
        comet.geometry.setDrawRange(start, Math.max(0, Math.min(head, total) - start))
      })

      pulses.forEach((p, i) => {
        const s = (elapsed * 0.8 + i * 0.25) % 1
        ;(p.material as PointsMaterial).size = 0.06 + s * 0.14
        ;(p.material as PointsMaterial).opacity = 1 - s
      })

      renderer.render(scene, camera)
      if (!ready) {
        ready = true
        readyRef.current?.()
      }
    }
    loop()

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      scene.traverse(obj => {
        const o = obj as Mesh
        o.geometry?.dispose()
        const m = o.material
        if (Array.isArray(m)) m.forEach(x => x.dispose())
        else m?.dispose()
      })
      sprite.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [dark])

  return <div ref={mount} className="h-full w-full" aria-hidden="true" />
}

export default HeroGlobe
