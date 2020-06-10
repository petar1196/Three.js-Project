let scene, camera, renderer;
let aspect = window.innerWidth / window.innerHeight;
let light, controls;
let plane;

 const createPlane = () => {

    let planeGeometry = new THREE.BoxGeometry(1000, 1, 1000);
    // let planeMaterial = new THREE.ShadowMaterial();
    let planeMaterial = new THREE.MeshNormalMaterial({color: 'blue', side: THREE.DoubleSide});
    planeMaterial.opacity = 0.2;
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.y = -1;
   

   


    
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
        10000
    )
    camera.position.set(0, 60, 100);


    light = new THREE.SpotLight(0x404040, 1);
    light.position.set(80,110, 10);
    light.distance = 100;
    light.angle = 0.4;
    light.castShadow = true;
    


    scene.add(light);
    

    let lightHelper = new THREE.SpotLightHelper(light);
    scene.add(lightHelper); 

    createPlane();
    // createCube();





    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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