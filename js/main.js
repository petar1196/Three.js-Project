let scene, camera, renderer;
let aspect = window.innerWidth / window.innerHeight;
let spotLight, controls;
let plane;
let texture;
let skyboxGeo, skyboxMaterials1, skyboxMaterials2, skybox, skyboxGeo2, skybox2;
const gltfLoader = new THREE.GLTFLoader();
const textureLoader = new THREE.TextureLoader();




const createPlane = () => {

    let planeGeometry = new THREE.BoxBufferGeometry(100, 1, 100);
   
    let planeMaterial = new THREE.ShadowMaterial({ side: THREE.DoubleSide });
     planeMaterial.opacity = 0.7;
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.castShadow = false;
    plane.position.y = -10;

    scene.add(plane);

    // console.log(planeMaterial);
}


const createSkyBox = () => {

    skyboxGeo = new THREE.BoxBufferGeometry(1000, 1000, 1000);

    skyboxMaterials1 = [
        //Right
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/3.jpg'), side: THREE.BackSide }),
        //Left 
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/1.jpg'), side: THREE.BackSide }),
        //Up
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/up.jpg'), side: THREE.BackSide }),
        //Down
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/down.jpg'), side: THREE.BackSide }),
        //Front 
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/4.jpg'), side: THREE.BackSide }),
        //Back
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box1/2.jpg'), side: THREE.BackSide }),
    ];

    skyboxMaterials2 = [

        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box2/negx.jpg'), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box2/posx.jpg'), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box2/posy.jpg'), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box2/negy.jpg'), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box2/negz.jpg'), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('skyBox/box2/posz.jpg'), side: THREE.BackSide }),
    ];

    skybox = new THREE.Mesh(skyboxGeo, skyboxMaterials1);
    scene.add(skybox);

}

/* 
const createSkyBox2 = () => {

    skyboxGeo = new THREE.BoxBufferGeometry(1000, 1000, 1000);

   

    skybox = new THREE.Mesh(skyboxGeo, skyboxMaterials);
    scene.add(skybox);




} */


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
            model.position.y -= 9;
            scene.add(model);
        });
    });
}

const createClay = () => {
    gltfLoader.load('models/Clay Pot/uepibauva.glb', gltf => {
        const model = gltf.scene.children[0];
        texture = new THREE.TextureLoader().load('models/Clay Pot/uepibauva_2K_Albedo.jpg');
        model.material = new THREE.MeshStandardMaterial({ map: texture });
        model.scale.setScalar(3);
        model.castShadow = true;
        model.receiveShadow = true;
        model.visible = false;
        scene.add(model);

        model.position.y -= 8;

        console.log(model.material);
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
    camera.position.set(0, 40, 110);


    spotLight = new THREE.SpotLight(0xffffff, 5, 1000);
    spotLight.position.set(30, 60, 30);
    spotLight.distance = 110;
    spotLight.angle = 0.8;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 60;
    spotLight.shadow.camera.far = 150;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);

    // TEMP
   /*  let ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight)
 */

     
    // let lightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(lightHelper); 

    createPlane();
     createSkyBox();
   //  createSkyBox2();

    createCone();
      createClay();





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
    controls.minDistance = 80;
    controls.maxDistance = 170;
    controls.maxPolarAngle = 1.5;
    
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

let skyBox2 = document.getElementById('skybox2');
skyBox2.addEventListener('click', () => {
    skybox.material = skyboxMaterials2;
}
);

let skyBox1 = document.getElementById('skybox1');
skyBox1.addEventListener('click', () => {
    skybox.material = skyboxMaterials1;
})