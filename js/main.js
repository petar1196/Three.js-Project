let scene, camera, renderer;
let aspect = window.innerWidth / window.innerHeight;
let light, controls;
let plane;

 const createPlane = () => {

    let planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    let planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.2;
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.y = -200;
    
    scene.add(plane);

} 


// const createCube = () => {
//     let geometry = new THREE.BoxGeometry(10, 10, 10);
//     let material = new THREE.MeshBasicMaterial( {color: 0xDC143C} );
//     let cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);
// }


const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color();

    camera = new THREE.PerspectiveCamera(
        75,
        aspect,
        10,
        1000
    )
    camera.position.set(80, 0, 100);


    light = new THREE.SpotLight(0x404040);
    light.position.set(10, 10, 10);

    let lightHelper = new THREE.SpotLightHelper(light);
    scene.add(lightHelper);

    createPlane();
    // createCube();





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