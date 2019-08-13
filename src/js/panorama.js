// Our Javascript will go here.
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0xffffff, 1 ) );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight, false );
// renderer.setClearColor( 0xffffff, 1);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 0;
camera.position.y = 0;
camera.position.x = 0;
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(.1, 0, 0);
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.ZOOM,
	RIGHT: THREE.MOUSE.PAN
};
controls.zoomSpeed = 1;
controls.update();

document.body.appendChild( renderer.domElement );

var cube_width = 100;
var geometry = new THREE.BoxBufferGeometry( cube_width, cube_width, cube_width, 80, 10, 80 ).toNonIndexed();
geometry.scale( - 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( '../../models/panorama.min.jpg' )} );
var positions = geometry.attributes.position.array;
var uvs = geometry.attributes.uv.array;
var r = cube_width/2;
for ( var i = 0, l = positions.length / 3; i < l; i ++ ) {
	var x = positions[ i * 3 + 0 ]/r;
	var y = positions[ i * 3 + 1 ]/r;
	var z = positions[ i * 3 + 2 ]/r;
	var tmp_x = x;
	var tmp_y = y;
	var tmp_z = z;
	var a = Math.sqrt(1.0/(x*x+y*y+z*z));
	x = a*x;
	y = a*y;
	z = a*z;
	
	var phi, theta;
	
	phi = Math.asin(y);
	theta = Math.atan2(x, z);
	
	
	if((tmp_x == 0) && (tmp_z < 0)){ //修补前后两端拼接区域的效果
		var p = Math.floor(i/3)
		if((positions[p*3*3]<0)||(positions[(p+1)*3*3]<0)||(positions[(p+2)*3*3]<0)){
			theta = -Math.PI;
		}
	}
	
	
	var uvx = 1 - (theta+Math.PI)/Math.PI/2;
	var uvy = (phi+Math.PI/2)/Math.PI;
	
	uvs[i*2] = uvx;
	uvs[i*2+1] = uvy;
}

var mesh = new THREE.Mesh( geometry, material );
meshBox = new THREE.Mesh( geometry, material );
scene.add( meshBox );

var cameraY = 0, cameraZ = 0;
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
	controls.update();
	[cameraY, cameraZ] = [camera.position.y, camera.position.z];
}
animate();

// var ship = null;
// var mesh = null;

// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setPath( "../../models/ship/" );
// mtlLoader.load( 'ship200k_1.mtl', function( materials ) {

//   materials.preload();

//   var objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials( materials );
//   objLoader.setPath( "../../models/ship/" );
//   objLoader.load( 'ship200k_1.obj', function ( object ) {

//     mesh = object;
//     ship = mesh;
//     // mesh.position.y = -50;
//     scene.add( mesh );

//   } );

// } );

var mitridat = null;
var mesh = null;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "../../models/mitridat/" );
mtlLoader.load( 'Mitridat.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( "../../models/mitridat/" );
	objLoader.load( 'Mitridat.obj', function ( object ) {
	mitridat = object;
	mitridat.position.x = 18;
	mitridat.position.y = -2.9;
	mitridat.position.z = 2.9;
	mitridat.rotation.y = -1.2;
	scene.add( object );
	} );
} );

var darkCubeGeometry = new THREE.BoxBufferGeometry(10,10,10, 80, 10, 80);
darkCubeGeometry.scale( - 1, 1, 1 );
var darkCubeMaterial = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: false, opacity: 0.6, transparent: true});  
var darkCube = new THREE.Mesh(darkCubeGeometry, darkCubeMaterial);
darkCube.position.x = 0;
darkCube.position.y = 0;
darkCube.position.z = 0;
// darkCube.rotation.y = 0.5;
darkCube.name = 'dark cube';
// scene.add( darkCube );

var mitridatCubeGeometry = new THREE.BoxGeometry(1,2.3,2);
var mitridatCubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false, opacity: 0.3, transparent: true});  
var mitridatCube = new THREE.Mesh(mitridatCubeGeometry, mitridatCubeMaterial);
mitridatCube.position.x = 18;
mitridatCube.position.y = -2.5;
mitridatCube.position.z = 2.9;
mitridatCube.rotation.y = 0.5;
mitridatCube.name = 'mitridat area';
scene.add( mitridatCube );

// camera.updateMatrixWorld();
// camera.updateProjectionMatrix();
// Clicking
var mouse = new THREE.Vector2(), INTERSECTED;
var raycaster = new THREE.Raycaster();
var startMouseDownTime = 0;
document.addEventListener( 'mousedown', () => {
	startMouseDownTime = new Date().getTime();
}, false);
document.addEventListener( 'mouseup', (e) => {
	var mousePressDuration = new Date().getTime() - startMouseDownTime;
	if (mousePressDuration < 300) {
		onDocumentMouseDown(e, 'close model');
	}
}, false);

var openedModel = null;
document.addEventListener( 'click', onDocumentMouseDown, false );
function onDocumentMouseDown( event, typeOfAction ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // find intersections
    raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
	// console.log(intersects[0]);
    if ( intersects.length > 0 ) {
    //   if ( INTERSECTED != intersects[ 0 ].object ) {
        // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = intersects[ 0 ].object;
        // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
		// INTERSECTED.material.emissive.setHex( 0xff0000 );
		if (INTERSECTED.name === 'mitridat area') {
			openedModel = 'mitridat';
			camera.translateZ(2);
			scene.add(darkCube);
			scene.remove(mitridatCube);
			// console.log(cameraY, cameraZ);
			// camera.position.y = cameraY;
			// camera.position.z = cameraZ;
			mitridat.position.x = 0;
			mitridat.position.y = 0;
			mitridat.position.z = 0;
		}
		if (INTERSECTED.name === 'dark cube' && typeOfAction === 'close model') {
			scene.remove(darkCube);
			scene.add(mitridatCube);
			camera.translateZ(-2);
		}
		// INTERSECTED.position.z += 1;
		//  console.log(INTERSECTED.position.z);
         console.log(intersects.length);
    //   }
    } else {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = null;
    }
  }