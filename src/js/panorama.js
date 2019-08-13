// Our Javascript will go here.
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0xffffff, 1.5 ) );

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
controls.zoomSpeed = 5;
controls.minZoom = 0;
controls.maxZoom = 0;
controls.update();

document.body.appendChild( renderer.domElement );

var cube_width = 100;
var geometry = new THREE.BoxBufferGeometry( cube_width, cube_width, cube_width, 80, 10, 80 ).toNonIndexed();;
geometry.scale( - 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( '../../models/panorama.min.jpg' )} );
var positions = geometry.attributes.position.array;
var uvs = geometry.attributes.uv.array;
// var material = new THREE.MeshBasicMaterial( {
//   map: new THREE.TextureLoader().load( '../../models/panorama.min.jpg' )
// } );
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
					
					
					if((tmp_x == 0) && (tmp_z < 0)){//修补前后两端拼接区域的效果
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

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
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