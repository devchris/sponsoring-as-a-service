'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function ClubhouseTransformation3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)
  const [transformValue, setTransformValue] = useState(0)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const clubhouseRef = useRef<THREE.Group | null>(null)
  const tennisCourtRef = useRef<THREE.Group | null>(null)
  const sponsorItemsRef = useRef<THREE.Group | null>(null)
  const trophyRef = useRef<THREE.Group | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const spotlightRef = useRef<THREE.SpotLight | null>(null)
  const requestRef = useRef<number | null>(null)
  const sparklesRef = useRef<THREE.Points | null>(null)

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransformValue(parseFloat(e.target.value))
  }

  // Initialize 3D scene
  useEffect(() => {
    if (!canvasRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f8ff)
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 3, 8)
    cameraRef.current = camera

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    // Add directional light (sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.left = -10
    directionalLight.shadow.camera.right = 10
    directionalLight.shadow.camera.top = 10
    directionalLight.shadow.camera.bottom = -10
    scene.add(directionalLight)

    // Add spotlight to emphasize the trophy
    const spotlight = new THREE.SpotLight(0xffffff, 1.5)
    spotlight.position.set(0, 10, 0)
    spotlight.angle = Math.PI / 6
    spotlight.penumbra = 0.3
    spotlight.decay = 2
    spotlight.distance = 50
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1024
    spotlight.shadow.mapSize.height = 1024
    spotlight.shadow.camera.near = 1
    spotlight.shadow.camera.far = 60
    spotlight.target.position.set(0, 0, 0)
    scene.add(spotlight)
    scene.add(spotlight.target)
    spotlightRef.current = spotlight

    // Create ground plane
    const groundGeometry = new THREE.CircleGeometry(10, 32)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -2
    ground.receiveShadow = true
    scene.add(ground)

    // Create clubhouse group and rotate it
    const clubhouse = new THREE.Group()
    clubhouseRef.current = clubhouse
    // Rotate and reposition the clubhouse
    clubhouse.rotation.y = Math.PI / 4 // 45 degrees rotation
    clubhouse.position.set(-15, 0, -10) // Move to the corner area
    scene.add(clubhouse)

    // Create clubhouse building
    const buildingGeometry = new THREE.BoxGeometry(5, 3, 4)
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.7,
      metalness: 0.1
    })
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
    building.position.y = 1
    building.castShadow = true
    building.receiveShadow = true
    clubhouse.add(building)

    // Create roof
    const roofGeometry = new THREE.ConeGeometry(3.5, 2, 4)
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x994422,
      roughness: 0.6,
      metalness: 0.1
    })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial)
    roof.position.y = 3.5
    roof.rotation.y = Math.PI / 4
    roof.castShadow = true
    clubhouse.add(roof)

    // Create door
    const doorGeometry = new THREE.PlaneGeometry(1, 2)
    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x885522,
      roughness: 0.7,
      metalness: 0.1
    })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    door.position.set(0, 0.5, 2.01)
    clubhouse.add(door)

    // Add cracks to the building (initial state)
    const crackMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });

    // Crack 1
    const crackGeometry1 = new THREE.BufferGeometry();
    const crackPoints1 = [
      new THREE.Vector3(1.5, 0, 2.01),
      new THREE.Vector3(2.0, 1.5, 2.01),
      new THREE.Vector3(1.8, 2.5, 2.01)
    ];
    crackGeometry1.setFromPoints(crackPoints1);
    const crack1 = new THREE.Line(crackGeometry1, crackMaterial);
    clubhouse.add(crack1);

    // Crack 2
    const crackGeometry2 = new THREE.BufferGeometry();
    const crackPoints2 = [
      new THREE.Vector3(-1.5, 0, 2.01),
      new THREE.Vector3(-2.0, 1.0, 2.01),
      new THREE.Vector3(-1.7, 2.0, 2.01)
    ];
    crackGeometry2.setFromPoints(crackPoints2);
    const crack2 = new THREE.Line(crackGeometry2, crackMaterial);
    clubhouse.add(crack2);

    // Create windows
    const windowGeometry = new THREE.PlaneGeometry(0.8, 0.8)
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x8888ff,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7
    })

    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial)
    windowLeft.position.set(-1.5, 1.5, 2.01)
    clubhouse.add(windowLeft)

    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial)
    windowRight.position.set(1.5, 1.5, 2.01)
    clubhouse.add(windowRight)

    // Create terrace for clubhouse (appears during transformation)
    const terraceGroup = new THREE.Group()

    // Terrace floor
    const terraceFloorGeometry = new THREE.BoxGeometry(6, 0.2, 5)
    const terraceFloorMaterial = new THREE.MeshStandardMaterial({
      color: 0xbbbbbb, // Concrete color
      roughness: 0.8,
      metalness: 0.2
    })
    const terraceFloor = new THREE.Mesh(terraceFloorGeometry, terraceFloorMaterial)
    terraceFloor.position.set(0, -0.4, 4) // In front of the clubhouse
    terraceFloor.receiveShadow = true
    terraceGroup.add(terraceFloor)

    // Terrace railing
    const createRailingSection = (width: number, position: THREE.Vector3) => {
      const railingGroup = new THREE.Group()

      // Top rail
      const topRailGeometry = new THREE.BoxGeometry(width, 0.05, 0.05)
      const railingMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.5,
        metalness: 0.5
      })
      const topRail = new THREE.Mesh(topRailGeometry, railingMaterial)
      topRail.position.y = 1
      topRail.castShadow = true
      railingGroup.add(topRail)

      // Bottom rail
      const bottomRailGeometry = new THREE.BoxGeometry(width, 0.05, 0.05)
      const bottomRail = new THREE.Mesh(bottomRailGeometry, railingMaterial)
      bottomRail.position.y = 0.5
      bottomRail.castShadow = true
      railingGroup.add(bottomRail)

      // Posts
      const createPost = (x: number) => {
        const postGeometry = new THREE.BoxGeometry(0.05, 1, 0.05)
        const post = new THREE.Mesh(postGeometry, railingMaterial)
        post.position.set(x, 0.5, 0)
        post.castShadow = true
        railingGroup.add(post)
      }

      // Add posts every 0.5 units
      for (let x = -width / 2; x <= width / 2; x += 0.5) {
        createPost(x)
      }

      railingGroup.position.copy(position)
      return railingGroup
    }

    // Front railing
    const frontRailing = createRailingSection(6, new THREE.Vector3(0, 0, 6.5))
    terraceGroup.add(frontRailing)

    // Side railings
    const leftRailing = createRailingSection(5, new THREE.Vector3(-3, 0, 4))
    leftRailing.rotation.y = Math.PI / 2
    terraceGroup.add(leftRailing)

    const rightRailing = createRailingSection(5, new THREE.Vector3(3, 0, 4))
    rightRailing.rotation.y = Math.PI / 2
    terraceGroup.add(rightRailing)

    // Add terrace to clubhouse, initially with zero opacity
    terraceGroup.traverse(child => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.transparent = true
        child.material.opacity = 0
      }
    })
    clubhouse.add(terraceGroup)

    // Create tennis court group
    const tennisCourt = new THREE.Group()
    tennisCourtRef.current = tennisCourt
    scene.add(tennisCourt)

    // Create tennis courts - using official dimensions (scaled to fit scene)
    // Standard tennis court: 23.77m x 10.97m (singles: 23.77m x 8.23m)
    // Using scale factor of 1 unit = 1 meter
    const courtWidth = 10.97;
    // Court dimensions
    const courtLength = 23.77;
    const courtSpacing = 4; // 4m space between courts

    // Function to create a tennis court
    const createTennisCourt = (position: THREE.Vector3) => {
      const courtGroup = new THREE.Group();

      // Court surface
      const courtGeometry = new THREE.PlaneGeometry(courtWidth, courtLength);
      const courtMaterial = new THREE.MeshStandardMaterial({
        color: 0xd08050, // Clay court color - keeping the original color
        roughness: 0.9,
        metalness: 0.1
      });
      const court = new THREE.Mesh(courtGeometry, courtMaterial);
      court.rotation.x = -Math.PI / 2;
      court.position.y = -0.49;
      court.receiveShadow = true;
      courtGroup.add(court);

      // Remove court cracks that are causing unwanted lines
      // We'll handle cracks differently during transformation

      // Create court lines based on official dimensions
      const linesMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 2,
        opacity: 0.7, // Slightly reduce line brightness
        transparent: true
      });

      // Simplify court lines to reduce unwanted artifacts
      // Only include the main court boundaries and net
      const courtsLinesPoints = [];

      // Baselines (doubles) - outer rectangle only
      courtsLinesPoints.push(
        // Baseline 1 (back)
        new THREE.Vector3(-courtWidth / 2, -0.48, -courtLength / 2),
        new THREE.Vector3(courtWidth / 2, -0.48, -courtLength / 2),

        // Right sideline
        new THREE.Vector3(courtWidth / 2, -0.48, -courtLength / 2),
        new THREE.Vector3(courtWidth / 2, -0.48, courtLength / 2),

        // Baseline 2 (front)
        new THREE.Vector3(courtWidth / 2, -0.48, courtLength / 2),
        new THREE.Vector3(-courtWidth / 2, -0.48, courtLength / 2),

        // Left sideline
        new THREE.Vector3(-courtWidth / 2, -0.48, courtLength / 2),
        new THREE.Vector3(-courtWidth / 2, -0.48, -courtLength / 2)
      );

      // Create service line and center lines - simplified
      const serviceLineDistance = 6.4;
      courtsLinesPoints.push(
        // Service line 1
        new THREE.Vector3(-courtWidth / 2, -0.47, -courtLength / 2 + serviceLineDistance),
        new THREE.Vector3(courtWidth / 2, -0.47, -courtLength / 2 + serviceLineDistance),

        // Service line 2
        new THREE.Vector3(-courtWidth / 2, -0.47, courtLength / 2 - serviceLineDistance),
        new THREE.Vector3(courtWidth / 2, -0.47, courtLength / 2 - serviceLineDistance),

        // Center line
        new THREE.Vector3(0, -0.47, -courtLength / 2 + serviceLineDistance),
        new THREE.Vector3(0, -0.47, courtLength / 2 - serviceLineDistance)
      );

      // Add center line at halfway point of court (where the net is)
      courtsLinesPoints.push(
        new THREE.Vector3(-courtWidth / 2, -0.47, 0),
        new THREE.Vector3(courtWidth / 2, -0.47, 0)
      );

      // Create line geometry from points
      const courtLinesGeometry = new THREE.BufferGeometry();
      const linesVertices = new Float32Array(courtsLinesPoints.length * 3);

      courtsLinesPoints.forEach((point, i) => {
        linesVertices[i * 3] = point.x;
        linesVertices[i * 3 + 1] = point.y;
        linesVertices[i * 3 + 2] = point.z;
      });

      courtLinesGeometry.setAttribute('position', new THREE.BufferAttribute(linesVertices, 3));
      const courtLines = new THREE.LineSegments(courtLinesGeometry, linesMaterial);
      courtGroup.add(courtLines);

      // Add a tennis net using lines instead of a mesh to avoid rendering issues
      const netHeight = 0.914;
      const netWidth = courtWidth;

      // Create the net using vertical lines
      const netGroup = new THREE.Group();
      const netLineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });

      // Create vertical lines for the net - across the width (x-axis)
      const netLinesCount = 30; // Number of vertical lines
      const netLineSpacing = netWidth / netLinesCount;

      for (let i = 0; i <= netLinesCount; i++) {
        const x = -netWidth / 2 + i * netLineSpacing;
        const netLineGeometry = new THREE.BufferGeometry();
        netLineGeometry.setFromPoints([
          new THREE.Vector3(x, 0, 0),
          new THREE.Vector3(x, netHeight, 0)
        ]);

        const netLine = new THREE.Line(netLineGeometry, netLineMaterial);
        netGroup.add(netLine);
      }

      // Add two horizontal lines - top and middle
      const topLineGeometry = new THREE.BufferGeometry();
      topLineGeometry.setFromPoints([
        new THREE.Vector3(-netWidth / 2, netHeight, 0),
        new THREE.Vector3(netWidth / 2, netHeight, 0)
      ]);
      const topLine = new THREE.Line(topLineGeometry, netLineMaterial);
      netGroup.add(topLine);

      const middleLineGeometry = new THREE.BufferGeometry();
      middleLineGeometry.setFromPoints([
        new THREE.Vector3(-netWidth / 2, netHeight / 2, 0),
        new THREE.Vector3(netWidth / 2, netHeight / 2, 0)
      ]);
      const middleLine = new THREE.Line(middleLineGeometry, netLineMaterial);
      netGroup.add(middleLine);

      // Position the net correctly at the center of the court (z=0)
      netGroup.position.set(0, -0.49, 0);
      courtGroup.add(netGroup);

      // Add net posts correctly aligned with the net and court edges
      const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.07, 8);
      const postMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.5,
        metalness: 0.5
      });

      // Left post (on the left sideline)
      const leftPost = new THREE.Mesh(postGeometry, postMaterial);
      leftPost.position.set(-(courtWidth / 2) - 0.05, (1.07 / 2 - 0.49) + 0.01, 0);
      courtGroup.add(leftPost);

      // Right post (on the right sideline)
      const rightPost = new THREE.Mesh(postGeometry, postMaterial);
      rightPost.position.set((courtWidth / 2) + 0.05, (1.07 / 2 - 0.49) + 0.01, 0);
      courtGroup.add(rightPost);

      // Position the entire court group
      courtGroup.position.copy(position);

      return courtGroup;
    };

    // Create three tennis courts in a row
    const court1 = createTennisCourt(new THREE.Vector3(0, 0, 0));
    const court2 = createTennisCourt(new THREE.Vector3(courtWidth + courtSpacing, 0, 0));
    const court3 = createTennisCourt(new THREE.Vector3(-courtWidth - courtSpacing, 0, 0));

    tennisCourt.add(court1);
    tennisCourt.add(court2);
    tennisCourt.add(court3);

    // Center the entire courts group
    tennisCourt.position.set(0, 0, 10);

    // Create fence around the courts with 4m spacing
    const createFence = () => {
      const fenceGroup = new THREE.Group();

      // Calculate fence dimensions based on court area plus spacing
      const totalCourtWidth = (courtWidth * 3) + (courtSpacing * 2); // 3 courts with spacing between
      const fenceWidth = totalCourtWidth + (courtSpacing * 2); // Add 4m space on each side
      const fenceLength = courtLength + (courtSpacing * 2); // Add 4m space on each end

      // Function to create fence segments
      const createFenceSegment = (width: number, height: number, depth: number, position: THREE.Vector3) => {
        // Create fence frame
        const frameGroup = new THREE.Group();

        // Create a wire mesh fence appearance instead of solid panels
        // Main posts at corners
        const postMaterial = new THREE.MeshStandardMaterial({
          color: 0x336633,
          roughness: 0.7,
          metalness: 0.5
        });

        const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, height, 8);

        // Add corner posts for this segment
        if (width > depth) {
          // For horizontal segments (longer width)
          const leftPost = new THREE.Mesh(postGeometry, postMaterial);
          leftPost.position.copy(position);
          leftPost.position.x -= width / 2;
          leftPost.position.y += height / 2;

          const rightPost = new THREE.Mesh(postGeometry, postMaterial);
          rightPost.position.copy(position);
          rightPost.position.x += width / 2;
          rightPost.position.y += height / 2;

          frameGroup.add(leftPost);
          frameGroup.add(rightPost);

          // Add horizontal wires/tubes
          const wireMaterial = new THREE.MeshStandardMaterial({
            color: 0x90EE90,
            roughness: 0.6,
            metalness: 0.4,
            transparent: true,
            opacity: 0.8
          });

          // Add horizontal tubes at different heights
          for (let h = 0.3; h < height; h += 0.6) {
            const wireGeometry = new THREE.CylinderGeometry(0.02, 0.02, width, 8);
            wireGeometry.rotateZ(Math.PI / 2); // Rotate to be horizontal

            const wire = new THREE.Mesh(wireGeometry, wireMaterial);
            wire.position.copy(position);
            wire.position.y += h;
            frameGroup.add(wire);
          }

          // Add vertical wires between posts
          for (let x = -width / 2 + 0.5; x < width / 2; x += 0.5) {
            const vertWireGeom = new THREE.CylinderGeometry(0.01, 0.01, height, 6);
            const vertWire = new THREE.Mesh(vertWireGeom, wireMaterial);
            vertWire.position.copy(position);
            vertWire.position.x += x;
            vertWire.position.y += height / 2;
            frameGroup.add(vertWire);
          }

          // Add mesh for chain link appearance
          const meshGeometry = new THREE.PlaneGeometry(width, height);
          const meshMaterial = new THREE.MeshBasicMaterial({
            color: 0x90EE90,
            transparent: true,
            opacity: 0.2,
            wireframe: true,
            wireframeLinewidth: 0.5,
          });

          const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
          mesh.position.copy(position);
          mesh.position.y += height / 2;
          mesh.rotation.y = Math.PI / 2;
          frameGroup.add(mesh);

        } else {
          // For vertical segments (longer depth)
          const frontPost = new THREE.Mesh(postGeometry, postMaterial);
          frontPost.position.copy(position);
          frontPost.position.z -= depth / 2;
          frontPost.position.y += height / 2;

          const backPost = new THREE.Mesh(postGeometry, postMaterial);
          backPost.position.copy(position);
          backPost.position.z += depth / 2;
          backPost.position.y += height / 2;

          frameGroup.add(frontPost);
          frameGroup.add(backPost);

          // Add horizontal wires/tubes
          const wireMaterial = new THREE.MeshStandardMaterial({
            color: 0x90EE90,
            roughness: 0.6,
            metalness: 0.4,
            transparent: true,
            opacity: 0.8
          });

          // Add horizontal tubes at different heights
          for (let h = 0.3; h < height; h += 0.6) {
            const wireGeometry = new THREE.CylinderGeometry(0.02, 0.02, depth, 8);
            wireGeometry.rotateX(Math.PI / 2); // Rotate to be horizontal along z-axis

            const wire = new THREE.Mesh(wireGeometry, wireMaterial);
            wire.position.copy(position);
            wire.position.y += h;
            frameGroup.add(wire);
          }

          // Add vertical wires between posts
          for (let z = -depth / 2 + 0.5; z < depth / 2; z += 0.5) {
            const vertWireGeom = new THREE.CylinderGeometry(0.01, 0.01, height, 6);
            const vertWire = new THREE.Mesh(vertWireGeom, wireMaterial);
            vertWire.position.copy(position);
            vertWire.position.z += z;
            vertWire.position.y += height / 2;
            frameGroup.add(vertWire);
          }

          // Add mesh for chain link appearance
          const meshGeometry = new THREE.PlaneGeometry(depth, height);
          const meshMaterial = new THREE.MeshBasicMaterial({
            color: 0x90EE90,
            transparent: true,
            opacity: 0.2,
            wireframe: true,
            wireframeLinewidth: 0.5,
          });

          const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
          mesh.position.copy(position);
          mesh.position.y += height / 2;
          frameGroup.add(mesh);
        }

        return frameGroup;
      };

      // Fence height
      const fenceHeight = 3;
      const fenceThickness = 0.05;

      // Create fence sides - Don't create the back side (the one facing the clubhouse)

      // Front fence (opposite to clubhouse)
      const frontFence = createFenceSegment(fenceWidth, fenceHeight, fenceThickness,
        new THREE.Vector3(0, 0, 10 + fenceLength / 2)
      );
      fenceGroup.add(frontFence);

      // Left side fence - extend only to halfway (not all the way to clubhouse)
      const leftFence = createFenceSegment(fenceThickness, fenceHeight, fenceLength / 2,
        new THREE.Vector3(-fenceWidth / 2, 0, 10 + fenceLength / 4)
      );
      fenceGroup.add(leftFence);

      // Right side fence - full length
      const rightFence = createFenceSegment(fenceThickness, fenceHeight, fenceLength,
        new THREE.Vector3(fenceWidth / 2, 0, 10)
      );
      fenceGroup.add(rightFence);

      // Add fence gate on the left side (for clubhouse access)
      const gateWidth = 4;
      const gatePost1 = createFenceSegment(fenceThickness, fenceHeight, fenceThickness,
        new THREE.Vector3(-fenceWidth / 2, 0, 10 - fenceLength / 4 + gateWidth / 2)
      );
      const gatePost2 = createFenceSegment(fenceThickness, fenceHeight, fenceThickness,
        new THREE.Vector3(-fenceWidth / 2, 0, 10 - fenceLength / 4 - gateWidth / 2)
      );

      fenceGroup.add(gatePost1);
      fenceGroup.add(gatePost2);

      // Make fence visible from the start, not during transformation
      fenceGroup.traverse(child => {
        if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
          if (child.material) {
            child.material.transparent = true;
            child.material.opacity = 0.8; // Visible but slightly transparent
          }
        }
      });

      return fenceGroup;
    };

    const fence = createFence();
    fence.position.copy(tennisCourt.position);
    scene.add(fence);

    // Create group for sponsor items (banners, benches, etc.)
    const sponsorItems = new THREE.Group()
    sponsorItemsRef.current = sponsorItems
    scene.add(sponsorItems)

    // Create sponsor banners
    const createBanner = (position: THREE.Vector3, rotation: THREE.Euler, width: number, height: number) => {
      const bannerGroup = new THREE.Group()

      // Banner background - use light green for all banners (matching the fence color)
      const bannerGeometry = new THREE.PlaneGeometry(width, height)
      const bannerMaterial = new THREE.MeshStandardMaterial({
        color: 0x90EE90, // Light green color
        roughness: 0.2,
        metalness: 0.1,
        side: THREE.DoubleSide
      })
      const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
      bannerGroup.add(banner)

      // Banner frame
      const frameGeometry = new THREE.EdgesGeometry(bannerGeometry)
      const frameMaterial = new THREE.LineBasicMaterial({ color: 0x444444 })
      const frame = new THREE.LineSegments(frameGeometry, frameMaterial)
      bannerGroup.add(frame)

      // Add sponsor logo/text (simple placeholder)
      const logoGeometry = new THREE.PlaneGeometry(width * 0.8, height * 0.6);
      const logoMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.z = 0.01; // Slightly in front of banner
      bannerGroup.add(logo);

      // Position and add to scene - ensure banner sits just above ground
      bannerGroup.position.copy(position)
      bannerGroup.rotation.copy(rotation)
      bannerGroup.visible = false // Initially hidden

      return bannerGroup
    }

    // Calculate fence dimensions for banner positioning
    const totalCourtWidth = (courtWidth * 3) + (courtSpacing * 2);
    const fenceWidth = totalCourtWidth + (courtSpacing * 2);
    const fenceLength = courtLength + (courtSpacing * 2);

    // Create large banners for each side of the fence
    // Front fence banner (positioned on the inside of the fence)
    const frontBanner = createBanner(
      new THREE.Vector3(0, 1.5, 10 + fenceLength / 2 - 0.1),
      new THREE.Euler(0, Math.PI, 0), // Facing inward
      fenceWidth * 0.8, // Width covering most of the fence side
      2 // 2 meters tall
    )
    sponsorItems.add(frontBanner)

    // Back fence banner - removing since this is between clubhouse and courts

    // Left fence banner 1 (front half)
    const leftBanner1 = createBanner(
      new THREE.Vector3(-fenceWidth / 2 + 0.1, 1.5, 10 + fenceLength / 4),
      new THREE.Euler(0, -Math.PI / 2, 0), // Facing inward
      fenceLength / 2 * 0.9,
      2
    )
    sponsorItems.add(leftBanner1)

    // Left fence banner 2 (back half) - removing since this is between clubhouse and courts

    // Right fence banner 1 (front half)
    const rightBanner1 = createBanner(
      new THREE.Vector3(fenceWidth / 2 - 0.1, 1.5, 10 + fenceLength / 4),
      new THREE.Euler(0, Math.PI / 2, 0), // Facing inward
      fenceLength / 2 * 0.9,
      2
    )
    sponsorItems.add(rightBanner1)

    // Right fence banner 2 (back half)
    const rightBanner2 = createBanner(
      new THREE.Vector3(fenceWidth / 2 - 0.1, 1.5, 10 - fenceLength / 4),
      new THREE.Euler(0, Math.PI / 2, 0), // Facing inward
      fenceLength / 2 * 0.9,
      2
    )
    sponsorItems.add(rightBanner2)

    // Create benches
    const createBench = (position: THREE.Vector3) => {
      const benchGroup = new THREE.Group()

      // Bench seat
      const seatGeometry = new THREE.BoxGeometry(2, 0.1, 0.5)
      const seatMaterial = new THREE.MeshStandardMaterial({
        color: 0x885522,
        roughness: 0.8,
        metalness: 0.2
      })
      const seat = new THREE.Mesh(seatGeometry, seatMaterial)
      seat.position.y = 0.5
      seat.castShadow = true
      benchGroup.add(seat)

      // Bench legs
      const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.5)
      const legMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.5,
        metalness: 0.5
      })

      const legLeft = new THREE.Mesh(legGeometry, legMaterial)
      legLeft.position.set(-0.8, 0.25, 0)
      legLeft.castShadow = true
      benchGroup.add(legLeft)

      const legRight = new THREE.Mesh(legGeometry, legMaterial)
      legRight.position.set(0.8, 0.25, 0)
      legRight.castShadow = true
      benchGroup.add(legRight)

      // Position bench
      benchGroup.position.copy(position)
      benchGroup.visible = false // Initially hidden

      return benchGroup
    }

    // Add benches
    const bench1 = createBench(new THREE.Vector3(14, 0, 13))
    const bench2 = createBench(new THREE.Vector3(10, 0, 13))
    const bench3 = createBench(new THREE.Vector3(14, 0, -13))
    const bench4 = createBench(new THREE.Vector3(10, 0, -13))

    sponsorItems.add(bench1)
    sponsorItems.add(bench2)
    sponsorItems.add(bench3)
    sponsorItems.add(bench4)

    // Create a trophy group
    const trophy = new THREE.Group()
    trophyRef.current = trophy
    scene.add(trophy)

    // Create the trophy base
    const baseGeometry = new THREE.CylinderGeometry(1.2, 1.5, 0.5, 32)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.5,
      metalness: 0.5
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = -1.75
    base.castShadow = true
    base.receiveShadow = true
    trophy.add(base)

    // Create the trophy stem
    const stemGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 16)
    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 0.2,
      metalness: 0.8
    })
    const stem = new THREE.Mesh(stemGeometry, stemMaterial)
    stem.position.y = -0.5
    stem.castShadow = true
    stem.receiveShadow = true
    trophy.add(stem)

    // Create the trophy cup (main part)
    const cupGeometry = new THREE.CylinderGeometry(1, 0.1, 2, 32, 1, false)
    const cupMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.3,
      metalness: 0.7
    })
    const cup = new THREE.Mesh(cupGeometry, cupMaterial)
    cup.position.y = 1
    cup.castShadow = true
    cup.receiveShadow = true
    trophy.add(cup)

    // Create broken pieces that will float around the broken trophy
    const brokePiecesGeometry = new THREE.BufferGeometry()
    const pieceCount = 100
    const positions = new Float32Array(pieceCount * 3)
    const sizes = new Float32Array(pieceCount)
    const colors = new Float32Array(pieceCount * 3)

    // Create pieces with varying positions, sizes, and colors
    for (let i = 0; i < pieceCount; i++) {
      const i3 = i * 3
      // Distribute pieces in a hemisphere above the trophy
      const radius = 1.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.5

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = Math.abs(radius * Math.cos(phi)) + 0.5 // Keep pieces above ground
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      sizes[i] = 0.1 + Math.random() * 0.15

      // Set colors to a rusty/damaged metal appearance
      colors[i3] = 0.5 + Math.random() * 0.2 // R: copper/rust tones
      colors[i3 + 1] = 0.3 + Math.random() * 0.2 // G: darker
      colors[i3 + 2] = 0.1 + Math.random() * 0.1 // B: minimal blue
    }

    brokePiecesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    brokePiecesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    brokePiecesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create shader material for particles
    const piecesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })

    const brokenPieces = new THREE.Points(brokePiecesGeometry, piecesMaterial)
    brokenPieces.visible = true
    scene.add(brokenPieces)
    particlesRef.current = brokenPieces

    // Create sparkles for the transformed trophy
    const sparkleGeometry = new THREE.BufferGeometry()
    const sparkleCount = 150
    const sparklePositions = new Float32Array(sparkleCount * 3)
    const sparkleSizes = new Float32Array(sparkleCount)
    const sparkleColors = new Float32Array(sparkleCount * 3)

    // Create sparkle positions around the trophy
    for (let i = 0; i < sparkleCount; i++) {
      const i3 = i * 3
      // Distribute sparkles around the trophy in a tighter formation
      const radius = 1.2 + Math.random() * 1.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2

      sparklePositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      sparklePositions[i3 + 1] = 0.5 + Math.random() * 2.5 // Position around cup and stem
      sparklePositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      sparkleSizes[i] = 0.05 + Math.random() * 0.1

      // Set colors to gold/yellow sparkles
      sparkleColors[i3] = 1.0 // R: full red component for gold
      sparkleColors[i3 + 1] = 0.8 + Math.random() * 0.2 // G: high green for gold
      sparkleColors[i3 + 2] = 0.3 + Math.random() * 0.2 // B: low blue for gold look
    }

    sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3))
    sparkleGeometry.setAttribute('size', new THREE.BufferAttribute(sparkleSizes, 1))
    sparkleGeometry.setAttribute('color', new THREE.BufferAttribute(sparkleColors, 3))

    // Create shader material for sparkles
    const sparkleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.0, // Start invisible
      blending: THREE.AdditiveBlending // Add additive blending for glow effect
    })

    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial)
    sparkles.visible = true
    scene.add(sparkles)
    sparklesRef.current = sparkles

    // Add cracks to the trophy to show it's broken
    const createCrack = (from: THREE.Vector3, to: THREE.Vector3, width: number = 0.01) => {
      const direction = new THREE.Vector3().subVectors(to, from)
      const length = direction.length()
      direction.normalize()

      const crackGeometry = new THREE.CylinderGeometry(width, width, length, 8)
      const crackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
      const crack = new THREE.Mesh(crackGeometry, crackMaterial)

      // Position and orient the crack
      crack.position.copy(from).add(direction.multiplyScalar(length / 2))
      crack.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)

      return crack
    }

    // Add cracks to the cup
    const trophyCrack1 = createCrack(
      new THREE.Vector3(0, 0.5, 0.8),
      new THREE.Vector3(0.7, 1.8, 0.5)
    )
    trophy.add(trophyCrack1)

    const trophyCrack2 = createCrack(
      new THREE.Vector3(-0.2, 0.3, -0.7),
      new THREE.Vector3(-0.9, 2, -0.3)
    )
    trophy.add(trophyCrack2)

    const trophyCrack3 = createCrack(
      new THREE.Vector3(0.5, 1, 0),
      new THREE.Vector3(-0.5, 2, 0.5)
    )
    trophy.add(trophyCrack3)

    // Add dents and discoloration to show damage
    const addDent = (position: THREE.Vector3, radius: number, depth: number) => {
      const dent = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0x222222,
          roughness: 0.9,
          metalness: 0.1
        })
      )
      dent.position.copy(position)
      dent.scale.y = depth
      return dent
    }

    const dent1 = addDent(new THREE.Vector3(0.8, 0.8, 0.2), 0.2, 0.3)
    trophy.add(dent1)

    const dent2 = addDent(new THREE.Vector3(-0.5, 1.3, -0.6), 0.25, 0.4)
    trophy.add(dent2)

    // Create light rays/beams effect
    const lightRaysGroup = new THREE.Group();
    scene.add(lightRaysGroup);

    // Create several beams of light coming from above
    const rayCount = 8;
    const rayMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffaa,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const height = 10;
      const bottomWidth = 2;

      // Create a triangular beam shape
      const rayGeometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        // Top point
        0, height, 0,
        // Bottom left
        -bottomWidth * Math.cos(angle), 0, -bottomWidth * Math.sin(angle),
        // Bottom right
        bottomWidth * Math.cos(angle), 0, bottomWidth * Math.sin(angle)
      ]);

      rayGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      rayGeometry.setIndex([0, 1, 2]); // Face indices

      const ray = new THREE.Mesh(rayGeometry, rayMaterial.clone());
      lightRaysGroup.add(ray);
    }

    lightRaysGroup.position.y = -1; // Position at the base of the trophy
    lightRaysGroup.visible = true;

    // Add orbit controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 5
    controls.maxDistance = 15
    controls.maxPolarAngle = Math.PI / 2 - 0.1
    controls.target.set(0, 0, 0)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    // Animation loop
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate)

      if (controls) controls.update()

      // Add subtle rotation to the trophy
      if (trophyRef.current) {
        trophyRef.current.rotation.y += 0.005
      }

      // Add subtle motion to the broken pieces
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          // Add subtle floating motion
          positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true
      }

      // Animate sparkles with shimmering effect
      if (sparklesRef.current) {
        const sparklePositions = sparklesRef.current.geometry.attributes.position.array as Float32Array
        const sparkleSizes = sparklesRef.current.geometry.attributes.size.array as Float32Array

        for (let i = 0; i < sparklePositions.length; i += 3) {
          // Orbit slightly around trophy
          const time = Date.now() * 0.001
          const angle = time * 0.2 + i

          // Get original position (radius)
          const x = sparklePositions[i]
          const z = sparklePositions[i + 2]
          const radius = Math.sqrt(x * x + z * z)

          // Apply subtle orbital motion
          sparklePositions[i] = radius * Math.cos(angle * 0.05)
          sparklePositions[i + 2] = radius * Math.sin(angle * 0.05)

          // Pulsate size for twinkling effect
          sparkleSizes[i / 3] = (0.05 + Math.random() * 0.1) *
            (1 + 0.3 * Math.sin(time * 3 + i))
        }

        sparklesRef.current.geometry.attributes.position.needsUpdate = true
        sparklesRef.current.geometry.attributes.size.needsUpdate = true
      }

      // Animate light rays
      if (lightRaysGroup) {
        lightRaysGroup.rotation.y += 0.001; // Very slow rotation

        lightRaysGroup.children.forEach((ray, i) => {
          if (ray instanceof THREE.Mesh && ray.material instanceof THREE.MeshBasicMaterial) {
            // Subtle animation of each ray's opacity based on transformValue (from global state)
            const time = Date.now() * 0.001;
            const offset = i / lightRaysGroup.children.length * Math.PI * 2;
            ray.material.opacity = Math.max(0, transformValue - 0.7) * 0.5 * (0.7 + 0.3 * Math.sin(time + offset));
          }
        });
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    requestRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      // Dispose resources
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  // Update scene based on transformation value
  useEffect(() => {
    if (!trophyRef.current || !sceneRef.current || !particlesRef.current || !spotlightRef.current || !sparklesRef.current) return

    // Handle trophy transformation
    if (trophyRef.current) {
      const trophy = trophyRef.current

      // Update cracks opacity
      trophy.children.slice(3, 6).forEach(crack => {
        if (crack instanceof THREE.Mesh && crack.material instanceof THREE.Material) {
          crack.material.opacity = 1 - transformValue;
          crack.material.transparent = true;
        }
      });

      // Update dents visibility
      trophy.children.slice(6, 8).forEach(dent => {
        if (dent instanceof THREE.Mesh && dent.material instanceof THREE.Material) {
          dent.material.opacity = 1 - transformValue;
          dent.material.transparent = true;
          dent.scale.y = 0.4 - (transformValue * 0.3); // Reduce dent depth
        }
      });

      // Update base material
      const base = trophy.children[0] as THREE.Mesh;
      if (base.material instanceof THREE.MeshStandardMaterial) {
        // Transform from dull to shiny golden color
        const baseColor = new THREE.Color(0x555555);
        const targetBaseColor = new THREE.Color(0xD4AF37); // Gold
        base.material.color.lerpColors(baseColor, targetBaseColor, transformValue);
        base.material.roughness = 0.5 - (transformValue * 0.3);
        base.material.metalness = 0.5 + (transformValue * 0.4);
      }

      // Update stem material
      const stem = trophy.children[1] as THREE.Mesh;
      if (stem.material instanceof THREE.MeshStandardMaterial) {
        const stemColor = new THREE.Color(0x777777);
        const targetStemColor = new THREE.Color(0xD4AF37); // Gold
        stem.material.color.lerpColors(stemColor, targetStemColor, transformValue);
        stem.material.roughness = 0.2 - (transformValue * 0.15);
        stem.material.metalness = 0.8 + (transformValue * 0.15);
      }

      // Update cup material
      const cup = trophy.children[2] as THREE.Mesh;
      if (cup.material instanceof THREE.MeshStandardMaterial) {
        const cupColor = new THREE.Color(0x555555);
        const targetCupColor = new THREE.Color(0xD4AF37); // Gold
        cup.material.color.lerpColors(cupColor, targetCupColor, transformValue);
        cup.material.roughness = 0.3 - (transformValue * 0.25);
        cup.material.metalness = 0.7 + (transformValue * 0.25);
      }
    }

    // Update broken pieces
    if (particlesRef.current) {
      // Fade out and shrink the broken pieces
      const particles = particlesRef.current;
      if (particles.material instanceof THREE.PointsMaterial) {
        particles.material.opacity = 0.8 * (1 - transformValue);
      }

      // Move pieces away as transformation increases
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const originalPositions = new Float32Array(positions.length);

      // Store original positions (first time only)
      if (!particles.userData.originalPositions) {
        for (let i = 0; i < positions.length; i++) {
          originalPositions[i] = positions[i];
        }
        particles.userData.originalPositions = originalPositions;
      }

      // Enhanced outward movement with spin and acceleration
      for (let i = 0; i < positions.length; i += 3) {
        const origX = particles.userData.originalPositions[i];
        const origY = particles.userData.originalPositions[i + 1];
        const origZ = particles.userData.originalPositions[i + 2];

        // Push particles outward with increasing transformation and acceleration
        const pushFactor = 3 * Math.pow(transformValue, 1.5); // Non-linear acceleration

        // Add spiral motion to the outward movement
        const angle = transformValue * Math.PI * 2 * (i % 7) / 7; // Varying rotation
        const radius = Math.sqrt(origX * origX + origZ * origZ);

        positions[i] = origX * (1 + pushFactor) + Math.sin(angle) * radius * transformValue * 0.3;
        positions[i + 1] = origY * (1 + pushFactor);
        positions[i + 2] = origZ * (1 + pushFactor) + Math.cos(angle) * radius * transformValue * 0.3;
      }

      particles.geometry.attributes.position.needsUpdate = true;
    }

    // Update sparkles with transformation
    if (sparklesRef.current) {
      const sparkles = sparklesRef.current;
      if (sparkles.material instanceof THREE.PointsMaterial) {
        // Only appear during the last 40% of the transformation
        const sparkleOpacity = transformValue > 0.6 ?
          (transformValue - 0.6) * 2.5 : 0;
        sparkles.material.opacity = sparkleOpacity;

        // Increase size as transformation completes
        sparkles.material.size = 0.1 + (transformValue * 0.1);
      }
    }

    // Update lighting
    if (spotlightRef.current) {
      const spotlight = spotlightRef.current;

      // Increase intensity with transformation
      spotlight.intensity = 1.5 + (transformValue * 3.0); // More dramatic lighting

      // Animate spotlight angle for dramatic effect
      spotlight.angle = Math.PI / 6 - (Math.PI / 18 * transformValue);

      // Add animated penumbra for more realistic lighting
      spotlight.penumbra = 0.3 + (transformValue * 0.4);

      // Add color shift towards golden
      const baseColor = new THREE.Color(0xffffff);
      const targetColor = new THREE.Color(0xffcc66); // Warm golden glow
      spotlight.color.lerpColors(baseColor, targetColor, transformValue);

      // Add subtle pulsing to the spotlight at higher transformation values
      if (transformValue > 0.8) {
        const pulseAmount = Math.sin(Date.now() * 0.002) * 0.2 + 0.8;
        spotlight.intensity = (3.5 + (transformValue * 2)) * pulseAmount;
      }

      // Update target position to focus more precisely on trophy
      if (transformValue > 0.5) {
        spotlight.target.position.y = transformValue * 0.5; // Raise the target point slightly
      }
    }

    // Add glow effect to trophy for completed transformation
    if (trophyRef.current && transformValue > 0.9) {
      // Find cup and base meshes
      const cup = trophyRef.current.children[2] as THREE.Mesh;
      const base = trophyRef.current.children[0] as THREE.Mesh;

      if (cup && cup.material instanceof THREE.MeshStandardMaterial) {
        // Create subtle glow effect by increasing emissive property
        cup.material.emissive = new THREE.Color(0xffaa00);
        cup.material.emissiveIntensity = (transformValue - 0.9) * 10; // Ramp up in last 10%
      }

      if (base && base.material instanceof THREE.MeshStandardMaterial) {
        base.material.emissive = new THREE.Color(0xffaa00);
        base.material.emissiveIntensity = (transformValue - 0.9) * 5; // Less intense than cup
      }
    } else if (trophyRef.current && transformValue <= 0.9) {
      // Reset emissive when not at high transformation
      trophyRef.current.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0;
        }
      });
    }

    // Update ground
    if (sceneRef.current) {
      const ground = sceneRef.current.children[3] as THREE.Mesh;
      if (ground instanceof THREE.Mesh && ground.material instanceof THREE.MeshStandardMaterial) {
        // Transform ground from dark to lighter, more reflective surface
        const baseGroundColor = new THREE.Color(0x333333);
        const targetGroundColor = new THREE.Color(0x444455); // Dark blue-gray
        ground.material.color.lerpColors(baseGroundColor, targetGroundColor, transformValue);
        ground.material.roughness = 0.8 - (transformValue * 0.5);
        ground.material.metalness = 0.2 + (transformValue * 0.3);
      }
    }
  }, [transformValue])

  return (
    <div className="w-full h-[500px] relative" ref={containerRef}>
      <canvas ref={canvasRef} className="w-full h-full" />

      <div className="absolute left-0 right-0 bottom-8 mx-auto w-4/5 max-w-2xl bg-white/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-medium">Verein ohne Sponsoring</span>
            <span className="text-primary font-medium">Erfolgreicher Verein mit Sponsoring</span>
          </div>

          <input
            ref={sliderRef}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={transformValue}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />

          <div className="text-center text-gray-700 font-medium">
            {transformValue < 0.25 ? (
              <span>Ein beschädigter Pokal: Symbol für einen Verein ohne professionelles Sponsoring, wo Potenzial ungenutzt bleibt</span>
            ) : transformValue < 0.5 ? (
              <span>Die ersten Erfolge: Durch strategisches Sponsoring beginnt die Transformation des Vereins</span>
            ) : transformValue < 0.75 ? (
              <span>Der Wandel: Aus Sponsoring wird sichtbarer Erfolg, der den gesamten Verein stärkt</span>
            ) : (
              <span>Gemeinsam zum Erfolg: Ein glänzender Pokal symbolisiert das volle Potenzial eines professionell gesponserten Vereins!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 