let scene, camera, renderer;
let aspect = window.innerWidth / window.innerHeight;
let spotLight, controls;
let plane;
let gltfLoader, texture;


const createPlane = () => {

    let planeGeometry = new THREE.BoxGeometry(100, 1, 100);
     let planeMaterial = new THREE.ShadowMaterial();
    // let planeMaterial = new THREE.MeshNormalMaterial({ color: 'blue', side: THREE.DoubleSide });
    planeMaterial.opacity = 0.2;
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.y = -1;

    scene.add(plane);

    console.log(planeMaterial);
}

const createClay = () => {

    gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('models/Clay Pot/uepibauva.glb', gltf => {
        const model = gltf.scene.children[0];
        texture = new THREE.TextureLoader().load('models/Clay Pot/uepibauva_2K_Albedo.jpg');
        model.material = new THREE.MeshBasicMaterial({map: texture});
        model.scale.setScalar(3);
        model.receiveShadow = true;
        scene.add(model);
    });
}




const init = () => {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(
        75,
        aspect,
        10,
        10000
    )
    camera.position.set(0, 60, 100);


    spotLight = new THREE.SpotLight(0x404040, 1);
    spotLight.position.set(80, 110, 10);
    spotLight.distance = 100;
    spotLight.angle = 0.4;
    spotLight.castShadow = true;

    scene.add(spotLight);


    let lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);

    createPlane();
    createClay();



    



    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.update();
}

const animate = () => {
    requestAnimationFrame(animate);


    controls.update();



    renderer.render(scene, camera);
}

init();
animate();


const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);