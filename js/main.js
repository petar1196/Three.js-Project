let scene, camera, renderer;
let aspect = window.innerWidth / window.innerHeight;
let light, controls;


const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color();

    camera = new THREE.PerspectiveCamera(
        75,
        aspect,
        1,
        1000
    )
    camera.position.z = 20;

    light = new THREE.SpotLight(0xffffff);
    light.position.set(0, 0, 0);





    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.update();
}

const mainLoop = () => {
    requestAnimationFrame(mainLoop);

    controls.update();

    renderer.render(scene, camera);
}

init();
mainLoop();


const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);