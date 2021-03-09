export const VERTEX_SHADER = `
#define STANDARD

uniform float uTime;
uniform bool wobble;

varying vec3 vViewPosition;
varying vec2 vUv;
varying float fogDepth;

const float PHI = 1.61803398874989484820459; // Φ = Golden Ratio 

float gold_noise(in vec2 xy, in float seed)
{
    return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
	vUv = uv;

	#include <uv_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

		vNormal = normalize( transformedNormal );

		#ifdef USE_TANGENT

			vTangent = normalize( transformedTangent );
			vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

		#endif

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>

	vec4 mvPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		mvPosition = instanceMatrix * mvPosition;
	#endif
	mvPosition = modelViewMatrix * mvPosition;
	gl_Position = projectionMatrix * mvPosition;

	vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );

	if (gl_Position.y > -0.3 && wobble) {
		gl_Position.x += (sin(worldPosition.x + (uTime * (worldPosition.y / 16.0)) * 25.0 * worldPosition.y + sin(mvPosition.z))) / (5.0 - worldPosition.y);

		gl_Position.y *= 2.5;
		// gl_Position.y += 1.0;

	}

	fogDepth = - mvPosition.z;

	#include <logdepthbuf_vertex>
}
`

export const FRAGMENT_SHADER = `
uniform sampler2D map;
varying vec2 vUv;
varying float fogDepth;
varying vec3 vViewPosition;

#include <common>

void main() {
	// TEXTURE MAP

	gl_FragColor = texture2D( map, vUv );
	// gl_FragColor.rgb /= 2.0;

	// FOG PASS
	float fogFactor = smoothstep( 0.01, 30.0, fogDepth );

	gl_FragColor.rgb = mix( gl_FragColor.rgb / 2.5, gl_FragColor.rgb, (1.0 - vUv.x) * vUv.x );
	gl_FragColor.rgb = mix( gl_FragColor.rgb / 2.5, gl_FragColor.rgb, (1.0 - vUv.y) * vUv.y );
	gl_FragColor.rgb = mix( gl_FragColor.rgb, vec3(0.24, 0.29, 0.43), fogFactor );
	// gl_FragColor.rgb *= 1.5;

	// MASK PASS
	if (gl_FragColor.a < 0.2)
    {
        discard;
	}
}

`
