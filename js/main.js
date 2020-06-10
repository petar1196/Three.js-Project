let scene, camera, renderer;
let aspect = window.innerWidth / window.innerHeight;
let spotLight, controls;
let plane;
let gltfLoader, texture;


const createPlane = () => {

    let planeGeometry = new THREE.BoxGeometry(100, 1, 100);
    // let planeMaterial = new THREE.ShadowMaterial();
    let planeMaterial = new THREE.MeshNormalMaterial({ color: 'blue', side: THREE.DoubleSide });
    planeMaterial.opacity = 0.2;
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.y = -20;

    scene.add(plane);

    // console.log(planeMaterial);
}

const createSkyBox = () => {

    let skyboxGeo = new THREE.BoxGeometry(500, 500, 500);

    let skyboxMaterials = [

        //Right
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/3.jpg'), side: THREE.BackSide }),

        //left ok
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/1.jpg'), side: THREE.BackSide }),

        //up
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/up.jpg'), side: THREE.BackSide }),

        //down
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/down.jpg'), side: THREE.BackSide }),

        //front ok
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/4.jpg'), side: THREE.BackSide }),

        //back
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/2.jpg'), side: THREE.BackSide }),

    ];

    let skybox = new THREE.Mesh(skyboxGeo, skyboxMaterials);
    scene.add(skybox);
}

const createClay = () => {

    gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('models/Clay Pot/uepibauva.glb', gltf => {
        const model = gltf.scene.children[0];
        texture = new THREE.TextureLoader().load('models/Clay Pot/uepibauva_2K_Albedo.jpg');
        model.material = new THREE.MeshNormalMaterial({ map: texture });
        model.scale.setScalar(3);
        model.receiveShadow = true;
        scene.add(model);
    });
}

const createCone = () => {
    gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('models/Traffic Cone/ue4jfevga.glb', gltf => {
        const model = gltf.scene.children[0];
        texture = new THREE.TextureLoader().load('models/Traffic Cone/ue4jfevga_2K_Albedo.jpg');
        model.material = new THREE.MeshNormalMaterial({ map: texture });
        model.scale.setScalar(1);
        scene.add(model);
        model.receiveShadow = true;

    })
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
    camera.position.set(0, 52, 90);


    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(80, 110, 10);
    spotLight.distance = 100;
    spotLight.angle = 0.4;
    spotLight.castShadow = true;


    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);


    let lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);

    createPlane();
    createSkyBox();
    //createClay();
    createCone();



    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = true;
    // controls.minDistance = 50;
    // controls.maxDistance = 120;
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