import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // OrbitControls 경로 수정
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // GLTFLoader 경로 수정
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'; // RGBELoader 경로 수정
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js"; // CSS2DRenderer 경로 수정

let camera, scene, renderer;

init();

function init() {
    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( - 1.8, 0.6, 2.7 );

    scene = new THREE.Scene();

    new RGBELoader()
        .setPath( 'https://designed-realities.github.io/Exhibition/contents/models/' )
        .load( 'studio_small_08_1k.hdr', function ( texture ) {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;

            render();

            // model
            const loader = new GLTFLoader().setPath( 'https://designed-realities.github.io/Exhibition/contents/models/' );
            loader.load( 'Test.glb', function ( gltf ) {
                const model = gltf.scene;
              
                scene.add(model);
                render();
            } );
        } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set( 0, 0, - 0.2 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

function render() {
    renderer.render( scene, camera );
}
