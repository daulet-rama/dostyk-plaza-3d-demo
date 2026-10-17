import{An as e,It as t,On as n,Z as r,kn as i,mn as a,ut as o,xn as s}from"./index-CTxzppzT.js";var c={day:{cov:.56,soft:.22,alpha:.9,cirrus:.45,h:2400,scale:1/2300,sun:1,amb:1},evening:{cov:.52,soft:.26,alpha:.92,cirrus:.65,h:2800,scale:1/2600,sun:1.15,amb:.8},night:{cov:.64,soft:.2,alpha:.55,cirrus:.12,h:2400,scale:1/2300,sun:.35,amb:.6}},l=`
varying vec3 vWorld;
void main() {
	vec4 wp = modelMatrix * vec4( position, 1.0 );
	vWorld = wp.xyz;
	gl_Position = projectionMatrix * viewMatrix * wp;
	gl_Position.z = gl_Position.w;       // на дальней плоскости, как купол неба сайта: здания закрывают облака тестом глубины
}`,u=`
uniform vec3 uSunDir;
uniform vec3 uSunCol;
uniform vec3 uZen;
uniform vec3 uHor;
uniform vec4 uCloud;      // покрытие, мягкость, плотность, перистые
uniform vec2 uCloudH;     // высота слоя, масштаб шума
uniform float uOn;
varying vec3 vWorld;
float kH( vec2 p ) { p = fract( p * vec2( 0.1031, 0.1030 ) ); p += dot( p, p.yx + 33.33 ); return fract( ( p.x + p.y ) * p.x ); }
float kN( vec2 p ) {
	vec2 i = floor( p ), f = fract( p );
	vec2 u = f * f * ( 3.0 - 2.0 * f );
	return mix( mix( kH( i ), kH( i + vec2( 1.0, 0.0 ) ), u.x ), mix( kH( i + vec2( 0.0, 1.0 ) ), kH( i + vec2( 1.0, 1.0 ) ), u.x ), u.y );
}
float kF( vec2 p ) {
	float s = 0.0, a = 0.5;
	mat2 m = mat2( 1.6, 1.2, - 1.2, 1.6 );
	for ( int i = 0; i < 5; i ++ ) { s += a * kN( p ); p = m * p; a *= 0.5; }
	return s;
}
void main() {
	vec3 d = normalize( vWorld - cameraPosition );
	if ( d.y < 0.012 || uOn < 0.002 ) discard;
	float t = uCloudH.x / d.y;
	vec2 p = d.xz * t * uCloudH.y;
	// кучевые: шум и его значение чуть ближе к солнцу (самозатенение толщи)
	float n = kF( p * 0.9 + vec2( 3.1, 7.7 ) );
	float c = smoothstep( uCloud.x, uCloud.x + uCloud.y, n );
	vec2 toSun = normalize( uSunDir.xz + 1e-4 ) * 0.22;
	float n2 = kF( p * 0.9 + vec2( 3.1, 7.7 ) + toSun );
	float shade = 1.0 - 0.5 * smoothstep( uCloud.x, uCloud.x + 0.35, n2 );
	// перистые: вытянутые полосы выше
	vec2 q = mat2( 0.8, 0.6, - 0.6, 0.8 ) * ( d.xz * ( 8000.0 / d.y ) * uCloudH.y * 0.35 );
	float ci = smoothstep( 0.52, 0.86, kF( q * vec2( 0.25, 2.2 ) + 11.0 ) ) * uCloud.w;
	float fade = smoothstep( 0.012, 0.18, d.y );
	float dens = clamp( c * uCloud.z + ci * 0.5, 0.0, 1.0 ) * fade * uOn;
	if ( dens < 0.004 ) discard;
	// свет: солнце (вперёд по рассеянию ярче) с самозатенением + небо; к горизонту — цвет дымки неба сайта
	float mu = max( dot( d, uSunDir ), 0.0 );
	float fwd = 0.6 + 0.9 * pow( mu, 6.0 );
	vec3 lit = uSunCol * fwd * shade * ( 1.0 - 0.35 * smoothstep( 0.55, 1.0, n ) ) + uZen * 0.85 + uHor * 0.15;
	lit = mix( uHor, lit, smoothstep( 0.02, 0.28, d.y ) * 0.75 + 0.25 );
	gl_FragColor = vec4( lit, dens );
}`;async function d(d){let f=new o;f.name=`kx:sky`;let p={uSunDir:{value:new i(0,1,0)},uSunCol:{value:new r(1,1,1)},uZen:{value:new r},uHor:{value:new r},uCloud:{value:new e},uCloudH:{value:new n},uOn:d.mats.fadeU},m=new a({name:`kx.clouds`,vertexShader:l,fragmentShader:u,uniforms:p,side:1,transparent:!0,depthWrite:!1,fog:!1}),h=new t(new s(8800,48,24),m);h.name=`kx:clouds`,h.frustumCulled=!1,h.renderOrder=-9,h.castShadow=h.receiveShadow=!1,h.userData.noAO=!0,f.add(h),d.mats.fade(m),m.onBeforeCompile=()=>{},m.customProgramCacheKey=()=>`kx-clouds`;let g=d.look&&d.look.sun,_=new i,v=null,y=e=>{let t=c[e]||c.day;p.uCloud.value.set(t.cov,t.soft,t.alpha,t.cirrus),p.uCloudH.value.set(t.h,t.scale),v=e,p.kSun=t.sun,p.kAmb=t.amb},b=()=>{g&&(_.subVectors(g.position,g.target.position).normalize(),p.uSunDir.value.copy(_),p.uSunCol.value.copy(g.color).multiplyScalar(g.intensity*.24*(p.kSun??1)));let e=d.look&&d.look.sky&&d.look.sky.material&&d.look.sky.material.uniforms;e&&e.uZenith&&(p.uZen.value.copy(e.uZenith.value).multiplyScalar(p.kAmb??1),p.uHor.value.copy(e.uBandColor?e.uHorizon.value.clone().lerp(e.uBandColor.value,.4):e.uHorizon.value))};return y(d.look&&d.look.state?d.look.state.preset:`day`),b(),{root:f,update(e){e.preset!==v&&y(e.preset),b()},frame(){b()},dispose(){h.geometry.dispose()}}}export{d as buildSky};