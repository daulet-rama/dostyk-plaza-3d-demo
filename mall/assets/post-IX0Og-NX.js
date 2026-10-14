import{B as e,Et as t,Gt as n,Ht as r,I as i,K as a,L as o,St as s,Ut as c,V as l,Xt as u,Y as d,cn as f,dn as p,f as m,j as h,jt as g,ln as _,pn as v,q as y,sn as b,un as x,vt as S,yt as C,z as w}from"./index-4nt_5mns.js";var T=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},E=new g(-1,1,1,-1,0,1),D=new class extends h{constructor(){super(),this.setAttribute(`position`,new a([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new a([0,2,0,0,2,0],2))}},O=class{constructor(e){this._mesh=new C(D,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,E)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},k={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new x},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new S},cameraProjectionMatrixInverse:{value:new S},cameraWorldMatrix:{value:new S},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new p(-1,-1,-1)},sceneBoxMax:{value:new p(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},A={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},j={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function M(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),r=N(t),i=r.length,a=new Uint8Array(i*4);for(let e=0;e<i;++e){let t=r[e],n=2*Math.PI*t/i,o=new p(Math.cos(n),Math.sin(n),0).normalize();a[e*4]=(o.x*.5+.5)*255,a[e*4+1]=(o.y*.5+.5)*255,a[e*4+2]=127,a[e*4+3]=255}let o=new w(a,t,t);return o.wrapS=n,o.wrapT=n,o.needsUpdate=!0,o}function N(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;)i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]===0?(r[i*t+a]=e++,a++,i--):(a-=2,i++);return r}var P={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:F(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new x},cameraProjectionMatrixInverse:{value:new S},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function F(e,t,n){let r=I(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function I(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new p(Math.cos(a),Math.sin(a),o))}return r}var L={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},R=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,k=_-C+2*d,A=v-w+2*d,j=g-1+3*d,M=_-1+3*d,N=v-1+3*d,P=c&255,F=l&255,I=u&255,L=this.perm[P+this.perm[F+this.perm[I]]]%12,R=this.perm[P+y+this.perm[F+b+this.perm[I+x]]]%12,z=this.perm[P+S+this.perm[F+C+this.perm[I+w]]]%12,ee=this.perm[P+1+this.perm[F+1+this.perm[I+1]]]%12,B=.6-g*g-_*_-v*v;B<0?r=0:(B*=B,r=B*B*this._dot3(this.grad3[L],g,_,v));let V=.6-T*T-E*E-D*D;V<0?i=0:(V*=V,i=V*V*this._dot3(this.grad3[R],T,E,D));let H=.6-O*O-k*k-A*A;H<0?a=0:(H*=H,a=H*H*this._dot3(this.grad3[z],O,k,A));let U=.6-j*j-M*M-N*N;return U<0?o=0:(U*=U,o=U*U*this._dot3(this.grad3[ee],j,M,N)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,k=w>E?16:0,A=T>E?8:0,j=w>D?4:0,M=T>D?2:0,N=+(E>D),P=O+k+A+j+M+N,F=+(a[P][0]>=3),I=+(a[P][1]>=3),L=+(a[P][2]>=3),R=+(a[P][3]>=3),z=+(a[P][0]>=2),ee=+(a[P][1]>=2),B=+(a[P][2]>=2),V=+(a[P][3]>=2),H=+(a[P][0]>=1),U=+(a[P][1]>=1),te=+(a[P][2]>=1),ne=+(a[P][3]>=1),re=w-F+c,ie=T-I+c,ae=E-L+c,W=D-R+c,G=w-z+2*c,K=T-ee+2*c,q=E-B+2*c,J=D-V+2*c,oe=w-H+3*c,se=T-U+3*c,ce=E-te+3*c,le=D-ne+3*c,Y=w-1+4*c,X=T-1+4*c,ue=E-1+4*c,de=D-1+4*c,Z=h&255,Q=g&255,fe=_&255,pe=v&255,me=o[Z+o[Q+o[fe+o[pe]]]]%32,he=o[Z+F+o[Q+I+o[fe+L+o[pe+R]]]]%32,ge=o[Z+z+o[Q+ee+o[fe+B+o[pe+V]]]]%32,_e=o[Z+H+o[Q+U+o[fe+te+o[pe+ne]]]]%32,ve=o[Z+1+o[Q+1+o[fe+1+o[pe+1]]]]%32,ye=.6-w*w-T*T-E*E-D*D;ye<0?l=0:(ye*=ye,l=ye*ye*this._dot4(i[me],w,T,E,D));let be=.6-re*re-ie*ie-ae*ae-W*W;be<0?u=0:(be*=be,u=be*be*this._dot4(i[he],re,ie,ae,W));let xe=.6-G*G-K*K-q*q-J*J;xe<0?d=0:(xe*=xe,d=xe*xe*this._dot4(i[ge],G,K,q,J));let Se=.6-oe*oe-se*se-ce*ce-le*le;Se<0?f=0:(Se*=Se,f=Se*Se*this._dot4(i[_e],oe,se,ce,le));let $=.6-Y*Y-X*X-ue*ue-de*de;return $<0?p=0:($*=$,p=$*$*this._dot4(i[ve],Y,X,ue,de)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},z=class a extends T{constructor(e,t,n=512,r=512,a,o,c){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=M(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new v(this.width,this.height,{type:d,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new u({defines:Object.assign({},k.defines),uniforms:b.clone(k.uniforms),vertexShader:k.vertexShader,fragmentShader:k.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new s,this.normalMaterial.blending=0,this.pdMaterial=new u({defines:Object.assign({},P.defines),uniforms:b.clone(P.uniforms),vertexShader:P.vertexShader,fragmentShader:P.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new u({defines:Object.assign({},A.defines),uniforms:b.clone(A.uniforms),vertexShader:A.vertexShader,fragmentShader:A.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new u({uniforms:b.clone(L.uniforms),vertexShader:L.vertexShader,fragmentShader:L.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new u({uniforms:b.clone(j.uniforms),vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new O(null),this._originalClearColor=new i,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),c!==void 0&&this.updatePdMaterial(c)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(n,r){n===void 0?(this.depthTexture=new l,this.depthTexture.format=e,this.depthTexture.type=_,this.normalRenderTarget=new v(this.width,this.height,{minFilter:t,magFilter:t,type:d,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=n,this.normalTexture=r,this._renderGBuffer=!1);let i=+!!this.normalTexture,a=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=a,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=a,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=F(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case a.OUTPUT.Off:break;case a.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new R,i=e*e*4,a=new Uint8Array(i);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=n,o=r;a[(n*e+r)*4]=(t.noise(i,o)*.5+.5)*255,a[(n*e+r)*4+1]=(t.noise(i+e,o)*.5+.5)*255,a[(n*e+r)*4+2]=(t.noise(i,o+e)*.5+.5)*255,a[(n*e+r)*4+3]=(t.noise(i+e,o+e)*.5+.5)*255}let o=new w(a,e,e,r,f);return o.wrapS=n,o.wrapT=n,o.needsUpdate=!0,o}};z.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var ee=160,B=`
			vec2 lookUv = vec2( ( worldPos.x - uHfRect.x ) / uHfRect.z, ( uHfRect.y - worldPos.z ) / uHfRect.w );
			vec2 lookE = min( lookUv, 1.0 - lookUv );
			float lookTop = ( 1.0 - smoothstep( 0.2, 0.8, abs( worldPos.y - texture2D( uHfTex, lookUv ).g ) ) )
				* step( 0.0, min( lookE.x, lookE.y ) ) * step( 0.001, uHfParams.x );
			// A = 0 — метка для шумоподавления: такой пиксель не фильтруется
			if ( lookTop > 0.99 ) { gl_FragColor = vec4( 1.0, 1.0, 1.0, 0.0 ); return; }`,V=4,H=`
		vec3 lookWideNormal( const vec2 uv ) {
			vec2 size = vec2( textureSize( tDepth, 0 ) );
			ivec2 p = ivec2( uv * size );
			float c0 = fetchDepth( p );
			float l2 = fetchDepth( p - ivec2( 8, 0 ) ), l1 = fetchDepth( p - ivec2( ${V}, 0 ) );
			float r1 = fetchDepth( p + ivec2( ${V}, 0 ) ), r2 = fetchDepth( p + ivec2( 8, 0 ) );
			float b2 = fetchDepth( p - ivec2( 0, 8 ) ), b1 = fetchDepth( p - ivec2( 0, ${V} ) );
			float t1 = fetchDepth( p + ivec2( 0, ${V} ) ), t2 = fetchDepth( p + ivec2( 0, 8 ) );
			float dl = abs( ( 2.0 * l1 - l2 ) - c0 ), dr = abs( ( 2.0 * r1 - r2 ) - c0 );
			float db = abs( ( 2.0 * b1 - b2 ) - c0 ), dt = abs( ( 2.0 * t1 - t2 ) - c0 );
			vec3 ce = getViewPosition( uv, c0 ).xyz;
			vec2 o = vec2( ${V}.0 ) / size;
			vec3 dpdx = ( dl < dr ) ? ce - getViewPosition( uv - vec2( o.x, 0.0 ), l1 ).xyz : -ce + getViewPosition( uv + vec2( o.x, 0.0 ), r1 ).xyz;
			vec3 dpdy = ( db < dt ) ? ce - getViewPosition( uv - vec2( 0.0, o.y ), b1 ).xyz : -ce + getViewPosition( uv + vec2( 0.0, o.y ), t1 ).xyz;
			return normalize( cross( dpdx, dpdy ) );
		}
`,U=class extends z{constructor(e,t,n,r,i,a){super(e,t,Math.max(1,Math.round(n*i)),Math.max(1,Math.round(r*i))),this.resScale=i,this.setGBuffer(a),this.output=z.OUTPUT.Off;let o=this.gtaoMaterial,s=/(if \(boxDistance > radiusToUse\) \{\s*discard;\s*return;\s*\})(\s*#endif)/,c=o.fragmentShader;if(s.test(c)&&[`ao = pow(ao, scale);`,`uniform float thickness;`,`vec3 getViewNormal(const vec2 uv) {`,`vec3 viewNormal = getViewNormal(vUv);`].every(e=>c.includes(e))){c=c.replace(`uniform float thickness;`,`uniform float thickness;
uniform sampler2D uHfTex;
uniform vec4 uHfRect;
uniform vec4 uHfParams;
uniform float uLookMinR;
`).replace(`vec3 getViewNormal(const vec2 uv) {`,H+`
		vec3 getViewNormal(const vec2 uv) {`).replace(`vec3 viewNormal = getViewNormal(vUv);`,``).replace(s,`if (boxDistance > radiusToUse) { gl_FragColor = vec4( 1.0, 1.0, 1.0, 0.0 ); return; }`+B+`$2
			vec3 viewNormal = lookWideNormal(vUv);`).replace(/if \(depth >= 1\.0\) \{\s*discard;/,`if (depth >= 1.0) { gl_FragColor = vec4( 1.0, 1.0, 1.0, 0.0 );`).replace(`vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);`,`vec3 sampleViewOffset = sampleDir.xyz * ( uLookMinR + ( radiusToUse - uLookMinR ) * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent) );`).replace(`ao = pow(ao, scale);`,`#if SCENE_CLIP_BOX == 1
			ao = mix( ao, 1.0, lookTop );
		#endif
			ao = pow(ao, scale);`),o.fragmentShader=c,o.uniforms.uHfTex=m.tex,o.uniforms.uHfRect=m.rect,o.uniforms.uHfParams=m.params,o.uniforms.uLookMinR={value:.5},o.needsUpdate=!0,this.topMask=!0;let e=this.pdMaterial;/void main\(\) \{/.test(e.fragmentShader)&&(e.fragmentShader=e.fragmentShader.replace(/void main\(\) \{/,`void main() {
			if ( textureLod( tDiffuse, vUv, 0.0 ).a < 0.5 ) { gl_FragColor = vec4( 1.0 ); return; }`),e.needsUpdate=!0)}else console.warn(`[look] GTAO: шейдер three изменился, маска «поверхности сверху» не применена`),this.topMask=!1}setSize(e,t){super.setSize(Math.max(1,Math.round(e*this.resScale)),Math.max(1,Math.round(t*this.resScale)))}},te=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,ne=`
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uMode;      // 0 — порог + вниз, 1 — вниз, 2 — вверх
uniform float uThreshold;
uniform float uKnee;
uniform float uRadius;
varying vec2 vUv;
vec3 S( vec2 o ) { return texture2D( tSrc, vUv + o * uTexel ).rgb; }
void main() {
	vec3 c;
	if ( uMode > 1.5 ) {
		float r = uRadius;
		c = S( vec2( 0.0 ) ) * 4.0
			+ ( S( vec2( -r, 0.0 ) ) + S( vec2( r, 0.0 ) ) + S( vec2( 0.0, -r ) ) + S( vec2( 0.0, r ) ) ) * 2.0
			+ S( vec2( -r, -r ) ) + S( vec2( r, -r ) ) + S( vec2( -r, r ) ) + S( vec2( r, r ) );
		c *= 0.0625;
	} else {
		vec3 a = S( vec2( -2.0, 2.0 ) ), b = S( vec2( 0.0, 2.0 ) ), d = S( vec2( 2.0, 2.0 ) );
		vec3 e = S( vec2( -2.0, 0.0 ) ), f = S( vec2( 0.0 ) ), g = S( vec2( 2.0, 0.0 ) );
		vec3 h = S( vec2( -2.0, -2.0 ) ), i = S( vec2( 0.0, -2.0 ) ), j = S( vec2( 2.0, -2.0 ) );
		vec3 k = S( vec2( -1.0, 1.0 ) ), l = S( vec2( 1.0, 1.0 ) ), m = S( vec2( -1.0, -1.0 ) ), n = S( vec2( 1.0, -1.0 ) );
		c = f * 0.125 + ( a + d + h + j ) * 0.03125 + ( b + e + g + i ) * 0.0625 + ( k + l + m + n ) * 0.125;
		if ( uMode < 0.5 ) {
			float br = max( c.r, max( c.g, c.b ) );
			float soft = clamp( br - uThreshold + uKnee, 0.0, 2.0 * uKnee );
			soft = soft * soft / ( 4.0 * uKnee + 1e-4 );
			c *= max( soft, br - uThreshold ) / max( br, 1e-4 );
			c = min( c, vec3( 24.0 ) );
		}
	}
	gl_FragColor = vec4( c, 1.0 );
}`,re=`
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,ie=`
precision highp float;
uniform sampler2D tDiffuse;
uniform sampler2D tAO;
uniform sampler2D tBloom;
uniform float uAO;
uniform float uBloom;
#include <tonemapping_pars_fragment>
#include <colorspace_pars_fragment>
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( tDiffuse, vUv );
	gl_FragColor.rgb *= mix( 1.0, texture2D( tAO, vUv ).r, uAO );
	gl_FragColor.rgb += texture2D( tBloom, vUv ).rgb * uBloom;
	#ifdef NEUTRAL_TONE_MAPPING
		gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
	#elif defined( AGX_TONE_MAPPING )
		gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
	#elif defined( ACES_FILMIC_TONE_MAPPING )
		gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
	#elif defined( LINEAR_TONE_MAPPING )
		gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
	#endif
	#ifdef SRGB_TRANSFER
		gl_FragColor = sRGBTransferOETF( gl_FragColor );
	#endif
}`,ae=5;function W(e,t={}){let{renderer:n,scene:r,camera:i}=e,a=n.getDrawingBufferSize(new x),s=n.getPixelRatio(),f=Math.max(1,a.x),p=Math.max(1,a.y),m=new l(f,p);m.type=y;let h=new v(f,p,{type:d,samples:t.samples??(s>=2?0:4),depthTexture:m});h.texture.name=`look.scene`;let g=new U(r,i,f,p,t.aoScale??.5,m),_=new u({name:`look.bloom`,vertexShader:te,fragmentShader:ne,depthTest:!1,depthWrite:!1,uniforms:{tSrc:{value:null},uTexel:{value:new x},uMode:{value:0},uThreshold:{value:.9},uKnee:{value:.3},uRadius:{value:1}}}),b=new O(_),C=null,T=new w(new Uint8Array([0,0,0,255]),1,1);T.needsUpdate=!0;let E={enabled:!1,strength:.5,radius:1,threshold:.9},D=new c({name:`look.output`,vertexShader:re,fragmentShader:ie,depthTest:!1,depthWrite:!1,uniforms:{tDiffuse:{value:null},tAO:{value:null},tBloom:{value:T},uAO:{value:0},uBloom:{value:0},toneMappingExposure:{value:1}}}),k=new O(D),A=null,j=null,M=new x,N=f,P=p,F=new S,I=new S,L=!0,R=-1e9,z=1,B=0,V=0,H=!1,W=0,G=!!t.slow,K=null,q=1;function J(e){return[Math.max(1,Math.ceil(N/2**(e+1))),Math.max(1,Math.ceil(P/2**(e+1)))]}function oe(){if(!C){C=[];for(let e=0;e<ae;e++){let[t,n]=J(e),r=new v(t,n,{type:d,depthBuffer:!1});r.texture.name=`look.bloom`+e,C.push(r)}}return C}function se(){n.getDrawingBufferSize(M),(M.x!==N||M.y!==P)&&(N=Math.max(1,M.x),P=Math.max(1,M.y),h.setSize(N,P),g.setSize(N,P),C&&C.forEach((e,t)=>e.setSize(...J(t))))}function ce(){i.updateMatrixWorld();let e=!F.equals(i.matrixWorld)||!I.equals(i.projectionMatrix);return F.copy(i.matrixWorld),I.copy(i.projectionMatrix),L?(L=!1,!1):e}function le(e){let t=oe(),r=_.uniforms;r.uThreshold.value=E.threshold,r.uKnee.value=Math.max(.05,E.threshold*.5),r.uRadius.value=.6+E.radius*.9;let i=e;_.blending=0;for(let e=0;e<t.length;e++)r.tSrc.value=i.texture,r.uTexel.value.set(1/i.width,1/i.height),r.uMode.value=e===0?0:1,n.setRenderTarget(t[e]),b.render(n),i=t[e];let a=n.autoClear;n.autoClear=!1,_.blending=2,r.uMode.value=2;for(let e=t.length-1;e>0;e--)r.tSrc.value=t[e].texture,r.uTexel.value.set(1/t[e].width,1/t[e].height),n.setRenderTarget(t[e-1]),b.render(n);return n.autoClear=a,t[0].texture}function Y(e,t,r,i){if(A!==n.outputColorSpace||j!==n.toneMapping){A=n.outputColorSpace,j=n.toneMapping;let e={};o.getTransfer(A)===`srgb`&&(e.SRGB_TRANSFER=``),j===7?e.NEUTRAL_TONE_MAPPING=``:j===6?e.AGX_TONE_MAPPING=``:j===4?e.ACES_FILMIC_TONE_MAPPING=``:j===1&&(e.LINEAR_TONE_MAPPING=``),D.defines=e,D.needsUpdate=!0}let a=D.uniforms;a.tDiffuse.value=e,a.tAO.value=g.pdRenderTarget.texture,a.uAO.value=t,a.tBloom.value=i||T,a.uBloom.value=i?r:0,a.toneMappingExposure.value=n.toneMappingExposure,n.setRenderTarget(null),k.render(n)}let X={gtao:g,rtScene:h,outputMaterial:D,adaptive:t.adaptive??!0,get slow(){return G},set slow(e){G=!!e},setAO({enabled:e=!0,radius:t=3,thickness:n=4,distanceExponent:r=1.5,distanceFallOff:i=1,scale:a=1.6,intensity:o=.85,samples:s=16,denoise:c=8}={}){g.enabled=e,g.updateGtaoMaterial({radius:t,thickness:n,distanceExponent:r,distanceFallOff:i,scale:a,samples:s,screenSpaceRadius:!1}),g.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:c,rings:3,samples:24}),q=o},setClipBox(e){g.setSceneClipBox(e||null)},setBloom({enabled:e=!1,strength:t=.5,radius:n=.45,threshold:r=.9}={}){Object.assign(E,{enabled:e,strength:t,radius:n,threshold:r})},render(){se(),n.info.autoReset=!1,n.info.reset();let t=performance.now();ce()&&(H&&t-V<250&&(W=W?W*.7+(t-V)*.3:t-V,W>34&&(G=!0)),R=t);let a=t-R<ee;if(V=t,H=!1,X.adaptive&&G&&a){z=0,K?(K.width!==N||K.height!==P)&&K.setSize(N,P):(K=new v(N,P,{type:d}),K.texture.name=`look.fast`),n.setRenderTarget(K),n.render(r,i),Y(K.texture,0,0,null),clearTimeout(B),B=setTimeout(()=>e.requestRender(),180);return}H=a,z<1&&(z=Math.min(1,z+.34),z<1&&e.requestRender()),n.setRenderTarget(h),n.render(r,i),g.enabled&&g.render(n,null,h);let o=E.enabled?le(h):null;Y(h.texture,g.enabled?q*z:0,E.strength*z,o)},dispose(){clearTimeout(B),n.info.autoReset=!0,h.dispose(),m.dispose(),K&&K.dispose(),C&&C.forEach(e=>e.dispose()),g.dispose(),_.dispose(),b.dispose(),D.dispose(),k.dispose(),T.dispose()}};return X}export{W as createPost};