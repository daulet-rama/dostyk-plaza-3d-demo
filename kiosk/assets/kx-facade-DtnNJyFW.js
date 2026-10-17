import{It as e,K as t,ct as n,kn as r,mn as i,ut as a}from"./index-CTxzppzT.js";import{envShader as o}from"./kx-env-BPNSwybz.js";var s={"es.panel":{pitch:.12,k:1},"facade.sand":{pitch:.16,k:.8}},c=.012,l=`
attribute vec3 tangent3;
attribute float ribPitch;
attribute float ribK;
varying vec3 vW;
varying vec3 vN;
varying vec3 vT;
varying vec2 vUv;
varying float vPitch;
varying float vK;
void main() {
	vUv = uv; vN = normal; vT = tangent3; vPitch = ribPitch; vK = ribK;
	vec4 w = modelMatrix * vec4( position, 1.0 );
	vW = w.xyz;
	gl_Position = projectionMatrix * viewMatrix * w;
}`,u=`
uniform vec3 uXSun;
uniform float uXSunI;
uniform float uDemoNight;
uniform vec3 uEnvZen;
uniform vec3 uEnvHor;
uniform vec3 uEnvGnd;
varying vec3 vW;
varying vec3 vN;
varying vec3 vT;
varying vec2 vUv;
varying float vPitch;
varying float vK;
ENV_HEAD
FADE_HEAD
vec3 xSky( vec3 R ) {
	return R.y >= 0.0 ? mix( uEnvHor, uEnvZen, smoothstep( 0.0, 0.7, R.y ) ) : mix( uEnvHor, uEnvGnd, smoothstep( 0.0, 0.25, - R.y ) );
}
void main() {
	FADE_TEST
	float s = vUv.x / vPitch;
	float w = fwidth( s );
	float aa = 1.0 - smoothstep( 0.12, 0.4, w );
	if ( aa < 0.01 ) discard;
	float f = fract( s );
	// профиль ребра: левая грань, гребень, правая грань, впадина
	float tilt = f < 0.2 ? - 0.7 : f < 0.52 ? 0.0 : f < 0.72 ? 0.7 : 0.0;
	float valley = step( 0.72, f );
	vec3 N = normalize( vN ), T = normalize( vT );
	vec3 n2 = normalize( N + T * tilt );
	vec3 V = normalize( vW - cameraPosition );
	vec3 R = reflect( V, n2 );
	float cosv = clamp( - dot( V, n2 ), 0.0, 1.0 );
	float F = 0.06 + 0.94 * pow( 1.0 - cosv, 5.0 );
#ifdef KX_ENV
	vec3 env = kxEnv( R, 0.4 );
#else
	vec3 env = xSky( R ) * mix( 1.0, 0.2, uDemoNight );
#endif
	float sunT = clamp( dot( n2, uXSun ), 0.0, 1.0 ) - clamp( dot( N, uXSun ), 0.0, 1.0 );
	vec3 add = ( env * F * 0.22 + vec3( 1.0, 0.95, 0.88 ) * max( sunT, 0.0 ) * 0.05 * uXSunI ) * aa * vK;
	float mul = mix( 1.0, ( 1.0 - 0.22 * valley ) * ( 1.0 + 0.55 * min( sunT, 0.0 ) ), aa * vK );
	gl_FragColor = vec4( add, mul );
}`;function d(e){let i=[],a=[],o=[],l=[],u=[],d=[],f=new r,p=new r,m=new r,h=new r,g=new r,_=new r(0,1,0),v=new r,y=new r,b=0;if(e.updateMatrixWorld(!0),e.traverse(e=>{if(!e.isMesh||Array.isArray(e.material))return;let t=s[e.userData&&e.userData.material||e.material&&e.material.name||``];if(!t)return;let n=e,r=!1;for(;n;){if(n.name===`Building`){r=!0;break}n=n.parent}if(!r)return;let x=e.geometry,S=x.attributes.position,C=x.index,w=C?C.count:S.count;for(let n=0;n+2<w;n+=3){let r=C?C.getX(n):n,s=C?C.getX(n+1):n+1,x=C?C.getX(n+2):n+2;f.fromBufferAttribute(S,r).applyMatrix4(e.matrixWorld),p.fromBufferAttribute(S,s).applyMatrix4(e.matrixWorld),m.fromBufferAttribute(S,x).applyMatrix4(e.matrixWorld),h.crossVectors(v.subVectors(p,f),y.subVectors(m,f));let w=h.length();if(!(w<1e-6)&&(h.divideScalar(w),!(Math.abs(h.y)>.2))){g.crossVectors(_,h).normalize();for(let e of[f,p,m])i.push(e.x+h.x*c,e.y+h.y*c,e.z+h.z*c),a.push(h.x,h.y,h.z),o.push(g.x,g.y,g.z),l.push(e.x*g.x+e.z*g.z,e.y),u.push(t.pitch),d.push(t.k);b++}}}),!b)return null;let x=new t;return x.setAttribute(`position`,new n(i,3)),x.setAttribute(`normal`,new n(a,3)),x.setAttribute(`tangent3`,new n(o,3)),x.setAttribute(`uv`,new n(l,2)),x.setAttribute(`ribPitch`,new n(u,1)),x.setAttribute(`ribK`,new n(d,1)),x.computeBoundingSphere(),{geo:x,tris:b}}async function f(t){let n=new a;n.name=`kx:facade`,n.userData.kxNoEnv=!0;let s=window.__dostyk&&window.__dostyk.root||t.scene.getObjectByName(`DostykPlaza`),c=s?d(s):null;if(!c)return t.log(`накладка рёбер: материалов es.panel / facade.sand нет — пропущено`),{root:n};t.check();let f=t.dep?t.dep(`kx-env`):null,p=f&&f.env&&f.env.texture?f.env:null,m=p?o(p.texture):null,h=t.uniforms,g={value:new r(0,1,0)},_={value:1},v=new i({name:`kx.ribs`,vertexShader:l,fragmentShader:u.replace(`ENV_HEAD`,m?m.head:``).replace(`FADE_HEAD`,t.mats.FADE_HEAD).replace(`FADE_TEST`,t.mats.FADE_TEST),defines:m?{...m.defines}:{},fog:!1,transparent:!0,depthWrite:!1,side:0,blending:5,blendEquation:100,blendSrc:201,blendDst:204,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,uniforms:{uDemoFade:t.mats.fadeU,uDemoNight:h.uDemoNight,uEnvZen:h.uEnvZen,uEnvHor:h.uEnvHor,uEnvGnd:h.uEnvGnd,uXSun:g,uXSunI:_,...p?{uKxEnv:p.uniform}:{}}});t.mats.fade(v),v.onBeforeCompile=()=>{},v.customProgramCacheKey=()=>`kx-ribs`+(m?`+env`:``);let y=new e(c.geo,v);y.name=`kx:facade-ribs`,y.renderOrder=1,y.castShadow=y.receiveShadow=!1,n.add(y),t.log(`рёбра фасада: ${c.tris} треугольников накладки`);let b=new r;return{root:n,update(){},frame(){let e=t.look&&t.look.sun;e&&(b.subVectors(e.position,e.target.position).normalize(),g.value.copy(b),_.value=e.intensity/3.75)}}}export{f as buildFacade};