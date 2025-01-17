import './js/panorama.js';
import { WEBGL } from './js/WebGL.js';

if ( !WEBGL.isWebGLAvailable() ) {
    var warning = WEBGL.getWebGLErrorMessage();
    document.getElementById( 'webgl_is_not_supported' ).appendChild( warning );
} else {
    document.getElementById( 'webgl_is_not_supported' ).style.display = 'none';
}

if ( WEBGL.isWebGL2Available() === false ) {
	document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
}