import{ut as e}from"./index-CTxzppzT.js";import{compileSoon as t,onPackageReady as n}from"./kx-env-BPNSwybz.js";var r={"ctx.clayTone":1,"ctx.clay":1,"ctx.clayFar":.8},i=`
uniform float uKxCity;
uniform float uKxCityK;
uniform float uKxCityEve;
float kxCityH( vec2 c ) { return fract( sin( dot( c, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
`,a=`
	float kxWin = 0.0;
	float kxLit = 0.0;
	vec3 kxWn = vec3( 0.0, 1.0, 0.0 );
	if ( uKxCity > 0.001 ) {
		kxWn = normalize( cross( dFdx( vLookW ), dFdy( vLookW ) ) );
		float kxWall = 1.0 - smoothstep( 0.25, 0.5, abs( kxWn.y ) );
		vec2 kxT = normalize( vec2( - kxWn.z, kxWn.x ) + 1e-5 );
		vec2 kxC = vec2( dot( vLookW.xz, kxT ) / 3.2, ( vLookW.y - 0.35 ) / 3.0 );
		vec2 kxCell = floor( kxC ), kxF = fract( kxC );
		float kxR = kxCityH( kxCell + floor( vLookW.y / 30.0 ) * 7.0 );
		// ширина окон — своя у каждой группы простенков (дом к дому разный), часть ячеек — глухая стена
		float kxG = kxCityH( floor( kxCell / vec2( 7.0, 5.0 ) ) + 3.7 );
		float kxHw = mix( 0.22, 0.36, kxG );
		float kxW = step( 0.5 - kxHw, kxF.x ) * step( kxF.x, 0.5 + kxHw ) * step( 0.3, kxF.y ) * step( kxF.y, 0.86 ) * step( 0.16, fract( kxR * 13.7 ) );
		// вдали — средняя доля стекла вместо мерцающей сетки
		float kxAa = clamp( 1.6 - max( fwidth( kxC.x ), fwidth( kxC.y ) ) * 2.5, 0.0, 1.0 );
		kxWin = mix( 0.36, kxW, kxAa ) * kxWall * uKxCity * uKxCityK;
		// стекло: тёмное сине-серое, у части окон шторы (светлее и теплее) или свет внутри
		vec3 kxGlass = mix( vec3( 0.1, 0.12, 0.14 ), vec3( 0.36, 0.31, 0.26 ), step( 0.8, kxR ) * kxAa );
		// вблизи — рама, импост и фрамуга (светлый ПВХ): окно не «чёрный квадрат»
		vec2 kxL = vec2( ( kxF.x - 0.5 ) / kxHw, ( kxF.y - 0.3 ) / 0.56 );          // −1…1 по ширине, 0…1 по высоте окна
		float kxFrame = max( max( step( 0.9, abs( kxL.x ) ), step( kxL.y, 0.06 ) + step( 0.94, kxL.y ) ), max( step( abs( kxL.x ), 0.035 ), step( abs( kxL.y - 0.66 ), 0.025 ) ) );
		kxFrame *= kxAa * kxW;
		diffuseColor.rgb = mix( diffuseColor.rgb, kxGlass, kxWin );
		diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.78, 0.78, 0.76 ), kxFrame * uKxCity );
		kxWin *= 1.0 - kxFrame;
		// [K1-KI] вечером у ≈ 30 % окон горит тёплый свет (вдали — средняя доля); ночью — окна лёгкой модели, как было
		kxLit = kxWin * mix( 0.26, step( 0.74, fract( kxR * 57.31 ) ), kxAa ) * uKxCityEve;
	}
`,o=`
	if ( kxWin > 0.001 ) {
		vec3 kxV = normalize( vLookW - cameraPosition );
		float kxCos = clamp( - dot( kxV, kxWn ), 0.0, 1.0 );
		float kxFr = 0.06 + 0.94 * pow( 1.0 - kxCos, 5.0 );
		totalEmissiveRadiance += lookSkyRefl( reflect( kxV, kxWn ), 0.08 ) * ( kxFr * 1.1 + 0.08 ) * kxWin * ( 1.0 - kxLit );
		totalEmissiveRadiance += vec3( 1.0, 0.66, 0.36 ) * 0.7 * kxLit;   // [K1-KI]
	}
`;async function s(s){let c=new e;c.name=`kx:city`;let l=s.mats.fadeU,u=new Map,d={value:0},f=0;function p(){let e=window.__dostyk&&window.__dostyk.root||s.scene.getObjectByName(`DostykPlaza`);if(!e)return;let n=!1;e.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material||[])){let e=t&&r[t.name];if(!e||u.has(t)||!t.userData||!t.userData.lookPatched||t.transparent)continue;let s=t.onBeforeCompile,c=t.customProgramCacheKey;u.set(t,[s,c]);let p={uKxCity:l,uKxCityK:{value:e},uKxCityEve:d};t.onBeforeCompile=(e,n)=>{s.call(t,e,n),e.fragmentShader.includes(`varying vec3 vLookW;`)&&e.fragmentShader.includes(`lookSkyRefl`)&&(Object.assign(e.uniforms,p),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+i).replace(`#include <color_fragment>`,`#include <color_fragment>
`+a).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
`+o))};let m=c?c.call(t):``;t.customProgramCacheKey=()=>m+`+kxcity2`,t.needsUpdate=!0,f++,n=!0}}),n&&t(s,e)}let m=performance.now();p();let h=n(s,()=>p());return s.log(`окна города: материалов ${f}`),{root:c,update(e){d.value=e&&e.preset===`evening`?1:0},frame(){let e=performance.now();e-m>2e3&&(m=e,p())},dispose(){h();for(let[e,[t,n]]of u)e.onBeforeCompile=t,e.customProgramCacheKey=n,e.needsUpdate=!0;u.clear()}}}export{s as buildCity};