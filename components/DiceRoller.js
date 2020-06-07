import React from 'react';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import * as ExpoTHREE from 'expo-three';


class IconMesh extends THREE.Mesh {
  constructor() {
    const geo = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0);
    const textureA = new ExpoTHREE.TextureLoader().load(require('../assets/images/a.png'));
    const textureB = new ExpoTHREE.TextureLoader().load(require('../assets/images/b.png'));
    const textureC = new ExpoTHREE.TextureLoader().load(require('../assets/images/c.png'));
    const textureD = new ExpoTHREE.TextureLoader().load(require('../assets/images/d.png'));
    const textureE = new ExpoTHREE.TextureLoader().load(require('../assets/images/e.png'));
    const textureF = new ExpoTHREE.TextureLoader().load(require('../assets/images/f.png'));
    const materialA = new THREE.MeshStandardMaterial({ map: textureA });
    const materialB = new THREE.MeshStandardMaterial({ map: textureB });
    const materialC = new THREE.MeshStandardMaterial({ map: textureC });
    const materialD = new THREE.MeshStandardMaterial({ map: textureD });
    const materialE = new THREE.MeshStandardMaterial({ map: textureE });
    const materialF = new THREE.MeshStandardMaterial({ map: textureF });
    const materials = [materialA, materialB, materialC, materialD, materialE, materialF];
    super(geo, materials);
  }
}

class DiceRoller extends React.Component {
  onContextCreate = async (gl) => {
    const color = 0x1d2447;

    const scene = new THREE.Scene();
    scene.background = color;

    const camera = new THREE.PerspectiveCamera(
      70,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.01,
      1000,
    );

    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(color);

    const ambientLight = new THREE.AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const obj = new IconMesh();
    camera.position.set(2, 5, 5);

    scene.add(obj);

    camera.lookAt(obj.position);

    function update() {
      obj.rotation.y += 0.05;
      obj.rotation.x += 0.025;
    }

    const render = () => {
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  render() {
    return (
      <GLView
        onContextCreate={this.onContextCreate}
        style={{ flex: 1 }}
      />
    );
  }
}


export default DiceRoller;
