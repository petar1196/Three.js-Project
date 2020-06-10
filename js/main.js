let scene, camera, renderer;
let aspect = window.innerWidth / window.innerHeight;
let spotLight, controls;
let plane;
let texture;
const gltfLoader = new THREE.GLTFLoader();
const textureLoader = new THREE.TextureLoader();



const createPlane = () => {

    let planeGeometry = new THREE.BoxGeometry(100, 1, 100);
    // let planeMaterial = new THREE.ShadowMaterial();
    let planeMaterial = new THREE.MeshPhysicalMaterial({ color: 'blue', side: THREE.DoubleSide });
    // planeMaterial.opacity = 0.2;
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.castShadow = false;
    plane.position.y = -10;

    scene.add(plane);

    // console.log(planeMaterial);
}


const createSkyBox = () => {

    let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);

    let skyboxMaterials = [

        //Right
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/3.jpg'), side: THREE.BackSide }),

        //left ok
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/1.jpg'), side: THREE.BackSide }),

        //up
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/up.jpg'), side: THREE.BackSide }),

        //down
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/down.jpg'), side: THREE.BackSide }),

        //front ok
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/4.jpg'), side: THREE.BackSide }),

        //back
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/2.jpg'), side: THREE.BackSide }),

    ];

    let skybox = new THREE.Mesh(skyboxGeo, skyboxMaterials);
    scene.add(skybox);

    skybox.position.y = 120;
    skybox.position.x = 50;
}

const createClay = () => {
    gltfLoader.load('models/Clay Pot/uepibauva.glb', gltf => {
        const model = gltf.scene.children[0];
        texture = new THREE.TextureLoader().load('models/Clay Pot/uepibauva_2K_Albedo.jpg');
        model.material = new THREE.MeshStandardMaterial({ map: texture });
        model.scale.setScalar(5);
        model.castShadow = true;
        model.receiveShadow = true;
        scene.add(model);

        console.log(model.material);
    });
}

const createCone = () => {
    textureLoader.load('models/Traffic Cone/ue4jfevga_2K_Albedo.jpg', texture => {
        gltfLoader.load('models/Traffic Cone/ue4jfevga.glb', gltf => {
            const model = gltf.scene.children[0];
            model.material = new THREE.MeshPhysicalMaterial({ 
                map: texture
            });
            model.scale.setScalar(1);
            model.castShadow = true;
            model.receiveShadow = true;

            scene.add(model);
        });
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
    camera.position.set(0, 52, 90);


    spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 60, 10);
    spotLight.distance = 100;
    spotLight.angle = 0.4;
    spotLight.castShadow = true;


    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);

    // TEMP
    let ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight)


    let lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);

    createPlane();
   
    // createClay();
    createCone();

    createSkyBox();



    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = true;
    renderer.shadowMap.needsUpdate = true;
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