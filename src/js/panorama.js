import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

// Our Javascript will go here.
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0xffffff, 1.2 ) );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor( 0xffffff, 1);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
window.addEventListener('resize', () => {
	renderer.setSize( window.innerWidth, window.innerHeight );
});
camera.position.z = 0;
camera.position.y = 0;
camera.position.x = 0;
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(.1, 0, 0);
controls.noZoom = true;
// controls.noKeys = true;
controls.noPan = true;
// controls.maxDistance = controls.minDistance = 0; 
// controls.mouseButtons = {
// 	LEFT: THREE.MOUSE.ROTATE,
// 	MIDDLE: null,
// 	RIGHT: THREE.MOUSE.PAN
// };
// controls.minDistance = 0;
// controls.maxDistance = 20;
controls.update();

document.body.appendChild( renderer.domElement );

var cube_width = 100;
var geometry = new THREE.BoxBufferGeometry( cube_width, cube_width, cube_width, 80, 10, 80 ).toNonIndexed();
geometry.scale( - 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( '../../phanagor/virtual_exhibition/models/panorama.min.jpg' )} );
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
var meshBox = new THREE.Mesh( geometry, material );
scene.add( meshBox );

var cameraY = 0, cameraZ = 0;
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
	// controls.update();
	[cameraY, cameraZ] = [camera.position.y, camera.position.z];
}
animate();

// var ship = null;
// var mesh = null;

// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setPath( "../../phanagor/virtual_exhibition/models/ship/" );
// mtlLoader.load( 'ship200k_1.mtl', function( materials ) {

//   materials.preload();

//   var objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials( materials );
//   objLoader.setPath( "../../phanagor/virtual_exhibition/models/ship/" );
//   objLoader.load( 'ship200k_1.obj', function ( object ) {

//     mesh = object;
//     ship = mesh;
//     // mesh.position.y = -50;
//     scene.add( mesh );

//   } );

// } );

var loadedModelsCount = 0;

var mitridat = null;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "../../phanagor/virtual_exhibition/models/mitridat/" );
mtlLoader.load( 'Mitridat.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
		loadedModelsCount += 1;
		objLoader.setMaterials( materials );
		objLoader.setPath( "../../phanagor/virtual_exhibition/models/mitridat/" );
		objLoader.load( 'Mitridat.obj', function ( object ) {
		mitridat = object;
		mitridat.position.x = 18;
		mitridat.position.y = -2.9;
		mitridat.position.z = 2.9;
		mitridat.rotation.y = -1.2;
		// scene.add( mitridat );
		// scene.remove( mitridat );
	} );
} );

var klinopis = null;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "../../phanagor/virtual_exhibition/models/klinopis/" );
mtlLoader.load( 'klinopis.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( "../../phanagor/virtual_exhibition/models/klinopis/" );
	objLoader.load( 'klinopis.obj', function ( object ) {
		loadedModelsCount += 1;
		klinopis = object;
		klinopis.position.x = 0;
		klinopis.position.y = 0;
		klinopis.position.z = 0;
		klinopis.rotation.y = 3;
		klinopis.name = 'klinopis';
		// scene.add( klinopis );
		// scene.remove( klinopis );
	} );
} );

var ship = null;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "../../phanagor/virtual_exhibition/models/ship/" );
mtlLoader.load( 'ship200k_1.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( "../../phanagor/virtual_exhibition/models/ship/" );
	objLoader.load( 'ship200k_1.obj', function ( object ) {
		loadedModelsCount += 1;
		ship = object;
		ship.position.x = 0;
		ship.position.y = 0;
		ship.position.z = 0;
		ship.rotation.y = -1.3;
		ship.rotation.z = 0.5;
		ship.rotation.x = 0.6;
		ship.name = 'ship';
		// scene.add( ship );
		// scene.remove( ship );
	} );
} );

var taran = null;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "../../phanagor/virtual_exhibition/models/taran/" );
mtlLoader.load( 'taran.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( "../../phanagor/virtual_exhibition/models/taran/" );
	objLoader.load( 'taran.obj', function ( object ) {
		loadedModelsCount += 1;
		taran = object;
		taran.position.x = 0;
		taran.position.y = -3;
		taran.position.z = 0;
		taran.rotation.y = -1.3;
		taran.rotation.z = 0.5;
		taran.rotation.x = 0.6;
		taran.name = 'taran';
		// scene.add( taran );
		// scene.remove( taran );
	} );
} );

var friz = null;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "../../phanagor/virtual_exhibition/models/friz/" );
mtlLoader.load( 'friz_met_trig.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( "../../phanagor/virtual_exhibition/models/friz/" );
	objLoader.load( 'friz_met_trig.obj', function ( object ) {
		loadedModelsCount += 1;
		friz = object;
		friz.position.x = 0;
		friz.position.y = 0;
		friz.position.z = 10;
		// friz.rotation.y = -1;
		friz.name = 'friz';
		// scene.add( friz );
		// scene.remove( friz );
	} );
} );

var darkCubeGeometry = new THREE.BoxGeometry(49,49,49);
darkCubeGeometry.scale( - 1, 1, 1 );
var darkCubeMaterial = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: false, opacity: 0.6, transparent: true});  
var darkCube = new THREE.Mesh(darkCubeGeometry, darkCubeMaterial);
darkCube.position.x = 0;
darkCube.position.y = 0;
darkCube.position.z = 0;
darkCube.name = 'dark cube';

var $loadedModelsCount = document.getElementById('loadedModelsCount');
var $modelsLoader = document.getElementById('models-loader');
scene.add(darkCube);
var loadingInterval = setInterval(() => {
	console.log('loaded: ', loadedModelsCount);
	$loadedModelsCount.innerHTML = loadedModelsCount;
	if (loadedModelsCount >= 5) {
		clearInterval(loadingInterval);
		$modelsLoader.style.display = 'none';
		scene.remove(darkCube);
	}
}, 500);

var x = -25, y = -20;
var klinopisShape = new THREE.Shape();
klinopisShape.moveTo( x+3, y );
klinopisShape.lineTo( x + 3.4, y + 2.8 );
klinopisShape.lineTo( x + 1.8, y + 4.7 );
klinopisShape.lineTo( x-3.3, y + 4.7 );
klinopisShape.lineTo( x-3.6, y );
klinopisShape.lineTo( x-3, y-0.3 );
var klinopisAreaGeometry = new THREE.ShapeGeometry( klinopisShape );
var klinopisAreaMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.3, transparent: true } );
var klinopisAreaMesh = new THREE.Mesh( klinopisAreaGeometry, klinopisAreaMaterial ) ;
klinopisAreaMesh.position.x = 10;
klinopisAreaMesh.position.y = 0;
klinopisAreaMesh.position.z = -49;
klinopisAreaMesh.name = 'klinopis area';
scene.add( klinopisAreaMesh );

x = 0, y = 0;
var shipShape = new THREE.Shape();
shipShape.moveTo( x+4, y-0.5 );
shipShape.lineTo( x+4, y+4.5 );
shipShape.lineTo( x-11, y+4 );
shipShape.lineTo( x-11, y-1.3 );
var shipAreaGeometry = new THREE.ShapeGeometry( shipShape );
var shipAreaMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.4, transparent: true } );
var shipAreaMesh = new THREE.Mesh( shipAreaGeometry, shipAreaMaterial ) ;
shipAreaMesh.position.x = 49;
shipAreaMesh.position.y = -8;
shipAreaMesh.position.z = -10;
shipAreaMesh.rotation.y = -1.5;
shipAreaMesh.name = 'ship area';
scene.add( shipAreaMesh );

x = 0, y = -5;
var taranShape = new THREE.Shape();
taranShape.moveTo( x+5.2, y-0.5 );
taranShape.lineTo( x+5.4, y+1 );
taranShape.lineTo( x+3, y+1 );
taranShape.lineTo( x, y+1.5 );
taranShape.lineTo( x-3, y+2.7 );
taranShape.lineTo( x-6, y+5.5 );
taranShape.lineTo( x-6.8, y+7.5 );
taranShape.lineTo( x-7.6, y+7.4 );
taranShape.lineTo( x-7, y+5.5 );
taranShape.lineTo( x-5, y+3 );
taranShape.lineTo( x-3.8, y+1.8 );
taranShape.lineTo( x-4.2, y+1.2 );
taranShape.lineTo( x-4, y+0.5 );
taranShape.lineTo( x-11.3, y+0.2 );
taranShape.lineTo( x-11.5, y-1.4 );
var taranAreaGeometry = new THREE.ShapeGeometry( taranShape );
var taranAreaMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.3, transparent: true } );
var taranAreaMesh = new THREE.Mesh( taranAreaGeometry, taranAreaMaterial ) ;
taranAreaMesh.position.x = 48;
taranAreaMesh.position.y = -8;
taranAreaMesh.position.z = -10;
taranAreaMesh.rotation.y = -1.5;
taranAreaMesh.name = 'taran area';
scene.add( taranAreaMesh );

var mitridatCubeGeometry = new THREE.BoxGeometry(1,2.3,2);
var mitridatCubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false, opacity: 0.3, transparent: true});  
var mitridatCube = new THREE.Mesh(mitridatCubeGeometry, mitridatCubeMaterial);
mitridatCube.position.x = 18;
mitridatCube.position.y = -2.5;
mitridatCube.position.z = 2.9;
mitridatCube.rotation.y = 0.5;
mitridatCube.name = 'mitridat area';
scene.add( mitridatCube );

var frizCubeGeometry = new THREE.BoxGeometry(2.2,3,7);
var frizCubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false, opacity: 0.3, transparent: true});  
var frizCube = new THREE.Mesh(frizCubeGeometry, frizCubeMaterial);
frizCube.position.x = 28;
frizCube.position.y = -10;
frizCube.position.z = 15;
frizCube.rotation.y = 0.4;
frizCube.rotation.z = -1.3;
frizCube.name = 'friz area';
scene.add( frizCube );

// Clicking
var mouse = new THREE.Vector2(), INTERSECTED;
var raycaster = new THREE.Raycaster();
var startMouseDownTime = 0;

var firstTouch = null;
document.addEventListener( 'touchstart', (e) => {
	let intersected = null;
	if (e.touches.length === 1) {
		intersected = onDocumentMouseDown(e);
	}
	if (e.touches.length === 1 && intersected.name === 'dark cube') {
		startMouseDownTime = new Date().getTime();
		firstTouch = e;
	} else {
		startMouseDownTime = -10000;
	}
}, false);
document.addEventListener( 'touchend', () => {
	var mousePressDuration = new Date().getTime() - startMouseDownTime;
	if (mousePressDuration < 300) {
		onDocumentMouseDown(firstTouch, 'close model');
		firstTouch = null;
	}
}, false);

var zDelta = 0;
var openedModel = null;
// document.addEventListener( 'click', (e) => {
// 	console.log('Click handled!');
// 	onDocumentMouseDown(e);
// }, false );

function onDocumentMouseDown( event, typeOfAction ) {
	// event.preventDefault();
	mouse = {x: 0, y: 0};
	// if (typeOfAction === 'close model') {
		console.log(event);
		var touch = event.targetTouches[0];
		mouse.x = ( touch.pageX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( touch.pageY / window.innerHeight ) * 2 + 1;
	// }
	console.log('Touch handled!');
    
    raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
        INTERSECTED = intersects[ 0 ].object;
		if (INTERSECTED.name === 'mitridat area') {
			openedModel = 'mitridat';
			zDelta = 2;
			camera.translateZ(zDelta);
			scene.add(darkCube);
			scene.add(mitridat);
			scene.remove(frizCube);
			scene.remove(mitridatCube);
			scene.remove(klinopisAreaMesh);
			scene.remove(shipAreaMesh);
			scene.remove(taranAreaMesh);

			mitridat.position.x = 0;
			mitridat.position.y = 0;
			mitridat.position.z = 0;
		}
		if (INTERSECTED.name === 'klinopis area') {
			openedModel = 'klinopis';
			zDelta = 4;
			camera.translateZ(zDelta);
			scene.add(darkCube);
			scene.add(klinopis);
			scene.remove(frizCube);
			scene.remove(mitridatCube);
			scene.remove(klinopisAreaMesh);
			scene.remove(shipAreaMesh);
			scene.remove(taranAreaMesh);
		}
		if (INTERSECTED.name === 'friz area') {
			openedModel = 'friz';
			zDelta = 8;
			camera.translateZ(zDelta);
			scene.add(darkCube);
			scene.add(friz);
			scene.remove(frizCube);
			scene.remove(mitridatCube);
			scene.remove(klinopisAreaMesh);
			scene.remove(shipAreaMesh);
			scene.remove(taranAreaMesh);
		}
		if (INTERSECTED.name === 'ship area') {
			openedModel = 'ship';
			zDelta = 8;
			camera.translateZ(zDelta);
			scene.add(darkCube);
			scene.add(ship);
			scene.remove(frizCube);
			scene.remove(mitridatCube);
			scene.remove(klinopisAreaMesh);
			scene.remove(shipAreaMesh);
			scene.remove(taranAreaMesh);
		}
		if (INTERSECTED.name === 'taran area') {
			openedModel = 'taran';
			zDelta = 12;
			camera.translateZ(zDelta);
			scene.add(darkCube);
			scene.add(taran);
			scene.remove(frizCube);
			scene.remove(mitridatCube);
			scene.remove(klinopisAreaMesh);
			scene.remove(shipAreaMesh);
			scene.remove(taranAreaMesh);
		}
		if (INTERSECTED.name === 'dark cube' && typeOfAction === 'close model') {
			scene.remove(darkCube);
			scene.remove(mitridat);
			scene.remove(klinopis);
			scene.remove(friz);
			scene.remove(ship);
			scene.remove(taran);
			scene.add(shipAreaMesh);
			scene.add(mitridatCube);
			scene.add(frizCube);
			scene.add(klinopisAreaMesh);
			scene.add(taranAreaMesh);
			camera.translateZ(-zDelta);
		}
		// INTERSECTED.position.z += 1;
		//  console.log(INTERSECTED.position.z);
         console.log(intersects.length);
    //   }
    } else {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	  INTERSECTED = null;
	}
	return INTERSECTED;
  }

  var scale = 70, last_scale = 70, first_scale = 70;
  var hammertime = new Hammer(document, {});
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinch pinchend pinchstart', function(ev) {
	if(ev.type == "pinchstart") {
		first_scale = ev.scale;
		controls.enableRotate = false;
	}
	if(ev.type == "pinchend") {
		last_scale = scale;
		controls.enableRotate = true;
	} else {
		var fovMAX = 80;
		var fovMIN = 1;

		camera.fov = last_scale * (1/ev.scale);
		console.log(last_scale, first_scale, ev.scale, first_scale - ev.scale);
		camera.fov = scale = Math.max( Math.min( camera.fov, fovMAX ), fovMIN );
		// camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, window.innerWidth / window.innerHeight, camera.near, camera.far);
		camera.updateProjectionMatrix();
	}
  });
//   function onDocumentMouseWheel( event ) {
// 	console.log('heeey');
//     var fovMAX = 80;
//     var fovMIN = 1;

//     camera.fov -= event.wheelDeltaY * 0.05;
//     camera.fov = Math.max( Math.min( camera.fov, fovMAX ), fovMIN );
// 	// camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, window.innerWidth / window.innerHeight, camera.near, camera.far);
// 	camera.updateProjectionMatrix();

// }

// document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );