import{An as e,On as t,ut as n}from"./index-CTxzppzT.js";import{compileSoon as r,onPackageReady as i}from"./kx-env-BPNSwybz.js";var a=Math.atan2(70-61.4,112.2),o={pave:{file:`pave`,m:4.8,rot:a,slab:1,mix:0},stone:{file:`stone`,m:2.4,rot:a,slab:0,mix:1},asph:{file:`asph`,m:4,rot:.3,slab:0,mix:1},conc:{file:`conc`,m:2.4,rot:0,slab:0,mix:1},grass:{file:`grass`,m:1.6,rot:0,slab:0,mix:1}},s={"site.plaza":[`pave`,1,1],"site.paving":[`pave`,1,1],"site.granite":[`stone`,1,1],"site.pavingDark":[`stone`,.9,1],"site.pavingMid":[`stone`,.9,1],"site.pavingLight":[`stone`,.9,1],"site.asphalt":[`asph`,1,1],"site.asphaltLight":[`asph`,.9,1],"site.marking":[`asph`,.45,.8],"site.sidewalk":[`conc`,1,1],"site.curb":[`conc`,1,.8],"site.grass":[`grass`,1,1],"site.grassDark":[`grass`,.9,1],"site.lawnMix":[`grass`,.9,1],"site.ground":[`conc`,.6,.6]};Object.values(o).flatMap(e=>[`k/exterior/ground-${e.file}-a.jpg`,`k/exterior/ground-${e.file}-n.jpg`]);var c=`
	{
		vec4 xgP = vec4( transformed, 1.0 );
		#ifdef USE_INSTANCING
			xgP = instanceMatrix * xgP;
		#endif
		#ifdef USE_BATCHING
			xgP = batchingMatrix * xgP;
		#endif
		vXGW = ( modelMatrix * xgP ).xyz;
	}
`,l=`
varying vec3 vXGW;
uniform float uXGOn;
uniform sampler2D uXGa0;
uniform sampler2D uXGn0;
uniform vec4 uXGp0;      // метров на текстуру, поворот, сила альбедо, сила нормали
uniform vec2 uXGq0;      // плиты (0/1), анти-повтор (0/1)
#ifdef XG_TWO
uniform sampler2D uXGa1;
uniform sampler2D uXGn1;
uniform vec4 uXGp1;
uniform vec2 uXGq1;
#endif
float xgH( vec2 c ) { return fract( sin( dot( c, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
float xgVN( vec2 p ) {
	vec2 i = floor( p ), f = fract( p ); f = f * f * ( 3.0 - 2.0 * f );
	return mix( mix( xgH( i ), xgH( i + vec2( 1.0, 0.0 ) ), f.x ), mix( xgH( i + vec2( 0.0, 1.0 ) ), xgH( i + vec2( 1.0, 1.0 ) ), f.x ), f.y );
}
// выборка класса: → альбедо-множитель (rgb), смещение нормали в осях класса (xy), шероховатость (z)
void xgSample( sampler2D ta, sampler2D tn, vec4 p, vec2 q, vec2 en, out vec3 alb, out vec3 nr ) {
	float c = cos( p.y ), s = sin( p.y );
	vec2 uvm = vec2( c * en.x + s * en.y, - s * en.x + c * en.y );      // м по осям класса
	vec2 uv = uvm / p.x;
	alb = texture2D( ta, uv ).rgb * 2.0;
	vec3 t = texture2D( tn, uv ).rgb;
	if ( q.y > 0.5 ) {
		// анти-повтор: вторая выборка (другой масштаб и поворот), смешивание по крупному шуму; крупные пятна тона
		vec2 uv2 = mat2( 0.62, -0.78, 0.78, 0.62 ) * uv * 0.61 + vec2( 0.37, 0.71 );
		float w = smoothstep( 0.32, 0.68, xgVN( en * 0.14 ) );
		alb = mix( alb, texture2D( ta, uv2 ).rgb * 2.0, w );
		t = mix( t, texture2D( tn, uv2 ).rgb, w );
		alb *= 0.9 + 0.2 * xgVN( en * 0.045 + 3.1 );
	}
	if ( q.x > 0.5 ) {
		// тон каждой плиты 0,6 × 0,3 м — по хэшу её места (без повтора текстуры)
		vec2 id = floor( uvm / vec2( 0.6, 0.3 ) );
		alb *= 0.93 + 0.14 * xgH( id + 0.5 );
	}
	nr = vec3( ( t.r * 2.0 - 1.0 ), - ( t.g * 2.0 - 1.0 ), t.b );
}
`,u=`
	vec3 xgN = vec3( 0.0 );
	float xgR = 0.0, xgRw = 0.0;
	{
		vec3 xgFn = normalize( cross( dFdx( vXGW ), dFdy( vXGW ) ) );
		float xgUp = smoothstep( 0.75, 0.92, abs( xgFn.y ) ) * uXGOn;
		if ( xgUp > 0.001 ) {
			vec2 en = vec2( vXGW.x, - vXGW.z );
			vec3 a0, n0;
			xgSample( uXGa0, uXGn0, uXGp0, uXGq0, en, a0, n0 );
			float w0 = 1.0, ka0 = uXGp0.z, kn0 = uXGp0.w;
			#ifdef XG_TWO
				// атлас G: светлое — гранит (класс 0), тёмное — асфальт (класс 1), краска разметки — асфальт слабее
				vec3 xc = diffuseColor.rgb;
				float lum = dot( xc, vec3( 0.2126, 0.7152, 0.0722 ) );
				float mx = max( xc.r, max( xc.g, xc.b ) ), mn = min( xc.r, min( xc.g, xc.b ) );
				float paint = smoothstep( 0.3, 0.55, ( mx - mn ) / max( mx, 0.01 ) );
				w0 = smoothstep( 0.08, 0.14, lum ) * ( 1.0 - paint );
				vec3 a1, n1;
				xgSample( uXGa1, uXGn1, uXGp1, uXGq1, en, a1, n1 );
				float w1 = 1.0 - w0, ka1 = uXGp1.z * mix( 1.0, 0.4, paint );
				diffuseColor.rgb *= mix( vec3( 1.0 ), a1, w1 * ka1 * xgUp );
				vec2 d1 = n1.xy * uXGp1.w * w1;
				float c1 = cos( uXGp1.y ), s1 = sin( uXGp1.y );
				xgN += vec3( c1 * d1.x - s1 * d1.y, 0.0, - ( s1 * d1.x + c1 * d1.y ) );
				xgR += n1.z * w1;
			#endif
			diffuseColor.rgb *= mix( vec3( 1.0 ), a0, w0 * ka0 * xgUp );
			vec2 d0 = n0.xy * kn0 * w0;
			float c0 = cos( uXGp0.y ), s0 = sin( uXGp0.y );
			// оси класса в мире: u → (cos, 0, −sin), v → (−sin, 0, −cos) (север = −z)
			xgN += vec3( c0 * d0.x - s0 * d0.y, 0.0, - ( s0 * d0.x + c0 * d0.y ) );
			xgR += n0.z * w0;
			xgN *= xgUp;
			xgRw = xgUp * 0.85;
		}
	}
`,d=`
	roughnessFactor = mix( roughnessFactor, clamp( xgR, 0.04, 1.0 ), xgRw );
`,f=`
	if ( xgRw > 0.0 ) normal = normalize( normal + ( viewMatrix * vec4( xgN, 0.0 ) ).xyz );
`;function p(e,t,n){Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vXGW;
`).replace(`#include <project_vertex>`,`#include <project_vertex>`+c),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+(n?`#define XG_TWO
`:``)+l).replace(`#include <color_fragment>`,u+`#include <color_fragment>`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>`+d).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>`+f)}async function m(a){let c={};await Promise.all(Object.entries(o).map(async([e,t])=>{let[n,r]=await Promise.all([a.texture(`k/exterior/ground-${t.file}-a.jpg`,{srgb:!1,repeat:!0,anisotropy:8}),a.texture(`k/exterior/ground-${t.file}-n.jpg`,{srgb:!1,repeat:!0,anisotropy:8})]);c[e]={a:n,n:r}})),a.check();let l={enabled:!0},u=a.mats.fadeU,d=(n,r=1,i=1,a=0)=>{let s=o[n];return{[`uXGa${a}`]:{value:c[n].a},[`uXGn${a}`]:{value:c[n].n},[`uXGp${a}`]:{value:new e(s.m,s.rot,r,i)},[`uXGq${a}`]:{value:new t(s.slab,s.mix)}}},f=new Map;function m(e,t,n){let r=e.onBeforeCompile,i=e.customProgramCacheKey;f.set(e,[r,i]),e.onBeforeCompile=(i,a)=>{r&&r.call(e,i,a),p(i,t,n)};let a=i?i.call(e):``;e.customProgramCacheKey=()=>a+(n?`+kxg2`:`+kxg`),e.needsUpdate=!0}let h=-1e9,g=0,_=0;function v(e=!1){let t=performance.now();if(!e&&t-h<1500)return;h=t;let n=g+_,i=window.__dostyk&&window.__dostyk.root||a.scene.getObjectByName(`DostykPlaza`);i&&i.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material||[])){let e=t&&s[t.name];!e||f.has(t)||!t.isMeshStandardMaterial||t.userData&&!t.userData.lookPatched||(m(t,{uXGOn:u,...d(e[0],e[1],e[2])},!1),g++)}});let o=a.scene.getObjectByName(`kx:core`)||a.scene.getObjectByName(`demo:exterior`);o&&o.traverse(e=>{if(!e.isMesh)return;let t=e.material;t&&!f.has(t)&&/^dx\.G\./.test(t.name)&&(m(t,{uXGOn:u,...d(`pave`,1,1,0),...d(`asph`,1,1,1)},!0),_++)}),g+_!==n&&(r(a,i),r(a,o))}v(!0);let y=i(a,()=>v(!0));a.log(`фактура земли: лёгких материалов ${g}, атласа G ${_}`);let b=new n;return b.name=`kx:ground`,{root:b,state:l,stats:()=>({light:g,atlas:_,on:u.value}),update(){},frame(){v()},dispose(){y();for(let[e,[t,n]]of f)e.onBeforeCompile=t,e.customProgramCacheKey=n,e.needsUpdate=!0;f.clear()}}}export{m as buildGround};