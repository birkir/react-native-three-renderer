/* global requestAnimationFrame cancelAnimationFrame */
import React, { Component } from 'react';
// import { View, Text } from 'react-native-ui-lib';
import { View, YellowBox } from 'react-native';
import { WebGLView } from 'react-native-webgl';
import PropTypes from 'prop-types';
import { bind } from 'lodash-decorators';
import { SPLASH_SCREEN } from 'screens';
import THREE from 'utils/three';
import React3 from '../../vendor/react-three-renderer-fiber/src/index.ts';


YellowBox.ignoreWarnings([
  'THREE.WebGLRenderer',
  'Module RNUeno',
  'Module RCTImageLoader',
  'Module RCTManagerModule',
  'Module RNWebGLTextureLoader',
  'Module RCCManagerModule',
  'RCTBatchedBridge',
]);

export default class Splash extends Component {

  static propTypes = {
    // navigator: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.animationRequest = requestAnimationFrame(this.onAnimate);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationRequest);
  }

  onAnimate = () => {
    if (this.mesh) {
      this.mesh.rotation.x += 0.1;
      this.mesh.rotation.y += 0.1;
    }
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
      this.renderer.context.flush();
      this.rngl.endFrame();
    }
    this.animationRequest = requestAnimationFrame(this.onAnimate);
  }

  cameraPosition = new THREE.Vector3(0, 0, 5);
  cubeRotation = new THREE.Euler();

  cameraRef = (camera) => {
    this.camera = camera;
  }

  sceneRef = (scene) => {
    this.scene = scene;
  }

  meshRef = (mesh) => {
    this.mesh = mesh;
  }

  rendererRef = (renderer) => {
    this.renderer = renderer;
    this.rngl = renderer.context.getExtension('RN');
    // renderer.setSize(100, 100);
    renderer.setClearColor(0xFF0000, 1);
  }

  render() {
    return (
      <View>
        <React3>
          <webGLRenderer
            width={100}
            height={100}
            antialias
            ref={this.rendererRef}
          >
            <scene ref={this.sceneRef}>
              <perspectiveCamera
                fov={75}
                aspect={1}
                near={0.1}
                far={1000}
                position={this.cameraPosition}
                ref={this.cameraRef}
              />
              <mesh ref={this.meshRef} rotation={this.cubeRotation}>
                <boxGeometry
                  width={2}
                  height={2}
                  depth={2}
                />
                <meshBasicMaterial
                  color={0xFFFFFF}
                />
              </mesh>
            </scene>
          </webGLRenderer>
        </React3>
      </View>
    );
  }

  // requestId;

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.requestId);
  // }

  // @bind()
  // onPress() {
  //   this.props.navigator.push({
  //     screen: SPLASH_SCREEN,
  //     passProps: {
  //       id: 1,
  //     },
  //   });
  // }

  // @bind()
  // onContextCreate(gl) {
  //   const rngl = gl.getExtension("RN");

  //   const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: {
  //       width,
  //       height,
  //       style: {},
  //       addEventListener: () => {},
  //       removeEventListener: () => {},
  //       clientHeight: height
  //     },
  //     context: gl
  //   });
  //   renderer.setSize(width, height);
  //   renderer.setClearColor(0x000000, 1);

  //   let camera, scene;
  //   let cube;

  //   function init() {
  //     camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
  //     camera.position.y = 150;
  //     camera.position.z = 500;
  //     scene = new THREE.Scene();

  //     let geometry = new THREE.BoxGeometry(200, 200, 200);
  //     for (let i = 0; i < geometry.faces.length; i += 2) {
  //       let hex = Math.random() * 0xffffff;
  //       geometry.faces[i].color.setHex(hex);
  //       geometry.faces[i + 1].color.setHex(hex);
  //     }

  //     let material = new THREE.MeshBasicMaterial({
  //       vertexColors: THREE.FaceColors,
  //       overdraw: 0.5
  //     });

  //     cube = new THREE.Mesh(geometry, material);
  //     cube.position.y = 150;
  //     scene.add(cube);
  //   }
  //   const animate = () => {
  //     this.requestId = requestAnimationFrame(animate);
  //     renderer.render(scene, camera);

  //     cube.rotation.y += 0.05;

  //     gl.flush();
  //     rngl.endFrame();
  //   };

  //   init();
  //   animate();
  // };

  // cameraPosition = new THREE.Vector3(0, 0, 5);

  // render() {
  //   return (
  //     <View flex center testID="SPLASH_SCREEN">
  //       <WebGLView
  //         style={{ width: 200, height: 200, backgroundColor: 'blue' }}
  //         onContextCreate={this.onContextCreate}
  //       />
  //       <React3
  //         mainCamera="camera"
  //         width={200}
  //         height={200}
  //         onAnimate={this.onAnimate}
  //       >
  //         <scene>
  //           <perspectiveCamera
  //             name="camera"
  //             fov={75}
  //             aspect={1}
  //             near={0.1}
  //             far={1000}
  //             position={this.cameraPosition}
  //           />
  //           <mesh>
  //             <boxGeometry
  //               width={1}
  //               height={1}
  //               depth={1}
  //             />
  //             <meshBasicMaterial color={0x00ff00} />
  //           </mesh>
  //         </scene>
  //       </React3>
  //     </View>
  //   );
  // }
}
