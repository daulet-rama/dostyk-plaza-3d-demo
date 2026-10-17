import{Ft as e,K as t,Z as n,ct as r,dn as i,gt as a,mt as o}from"./index-CTxzppzT.js";import{t as s}from"./kf-reflect-1HHuovYv.js";var c=e=>new n().setStyle(e,i),l=`
attribute vec4 aKfA;   // начало оси полосы (план e, n) и направление оси (u.e, u.n)
attribute vec4 aKfB;   // Lr (марш — длина наклона; колодец — длина затемнения), смещение полосы поперёк (м), ширина ступени, направление (±1)
attribute vec4 aKfC;   // фаза (м), длина петли (м), s0 — начало петли (м), шаг ступени (м)
attribute float aKfD;  // режим: 0 — марш между этажами, 1 — ровный колодец спуска
uniform float uKfTime;
uniform float uKfH;
uniform float uKfSpeed;
varying float vKfX;
varying float vKfTop;
varying float vKfFade;
`,u=`
	{
		float kfLr = aKfB.x;
		float kfD = aKfC.w;
		float kfS = aKfC.z + mod( aKfC.x + uKfTime * uKfSpeed * aKfB.w, aKfC.y );
		float kfAlong = kfS + position.z * ( kfD - 0.012 );
		float kfY;
		if ( aKfD > 0.5 ) {
			kfY = 0.088;
			vKfFade = clamp( ( kfS - aKfC.z - 0.4 ) / max( kfLr, 1.0 ), 0.0, 1.0 );
		} else {
			float kfF0 = clamp( kfS / kfLr, 0.0, 1.0 );
			float kfF1 = clamp( ( kfS + kfD ) / kfLr, 0.0, 1.0 );
			kfY = mix( kfF0, kfF1, position.y ) * uKfH;
			vKfFade = 0.0;
		}
		float kfW = aKfB.y + ( position.x - 0.5 ) * aKfB.z;
		vec2 kfP = aKfA.xy + aKfA.zw * kfAlong + vec2( - aKfA.w, aKfA.z ) * kfW;
		transformed = vec3( kfP.x, kfY, - kfP.y );
		vKfX = position.x * aKfB.z;
		vKfTop = position.y < 0.5 && normal.y > 0.5 ? 1.0 : 0.0;
	}
`,d=`
	if ( vKfTop > 0.5 ) {
		float kfW = fwidth( vKfX );
		float kfG = abs( fract( vKfX / 0.0085 ) - 0.5 ) * 2.0;
		float kfK = 1.0 - smoothstep( 0.003, 0.009, kfW );
		diffuseColor.rgb *= mix( 0.84, 0.55 + 0.5 * smoothstep( 0.3, 0.7, kfG ), kfK );
	}
	diffuseColor.rgb *= mix( 1.0, 0.14, pow( vKfFade, 0.7 ) );
`,f=`
	objectNormal = normal.y > 0.5 ? vec3( 0.0, 1.0, 0.0 ) : vec3( - aKfA.z, 0.0, aKfA.w );
`;function p(){let e=[],n=[],i=[],a=[],o=c(`#B4BAC1`),s=c(`#E8B92C`),l=c(`#6C737B`),u=(t,r,o,s,c,l)=>{let u=e.length/3;for(let a of[t,r,o,s])e.push(...a),n.push(...c),i.push(l.r,l.g,l.b);a.push(u,u+1,u+2,u,u+2,u+3)};u([0,0,0],[0,0,.1],[1,0,.1],[1,0,0],[0,1,0],s),u([0,0,.1],[0,0,1],[1,0,1],[1,0,.1],[0,1,0],o),u([0,0,1],[0,1,1],[1,1,1],[1,0,1],[0,0,1],l);let d=new t;return d.setAttribute(`position`,new r(e,3)),d.setAttribute(`normal`,new r(n,3)),d.setAttribute(`color`,new r(i,3)),d.setIndex(a),d}function m(t,n,r,i,s=[]){if(!n||!(t&&t.length)&&!(s&&s.length))return null;let c=[],m=[],h=[],g=[];for(let e of t||[]){let t=n.sA+.1,r=n.step,i=e.b[0]-e.a[0],a=e.b[1]-e.a[1],o=Math.hypot(i,a),s=[i/o,a/o],l=o+n.sBx-.1-t,u=Math.max(4,Math.round(l/r)),d=u*r,f=e.width/2-n.side,p=n.dw;for(let[n,i,a]of[[-f,-p,1],[p,f,-1]]){let l=(n+i)/2,f=i-n-.04;for(let n=0;n<u;n++)c.push(e.a[0],e.a[1],s[0],s[1]),m.push(o,l,f,a),h.push(n*r,d,t,r),g.push(0)}}for(let e of s||[]){let t=(e.angle||0)*Math.PI/180,n=[Math.cos(t),Math.sin(t)],r=e.length/2,i=e.width,a=(i-.3)/2,o=e.kind===`travelator`?1.2:.42,s=-r+.6,l=r-.3,u=Math.max(3,Math.round((l-s)/o)),d=u*o;for(let t=0;t<2;t++){let r=-i/2+.15+a*t+.08,f=r+a-.16;for(let t=0;t<u;t++)c.push(e.at[0],e.at[1],n[0],n[1]),m.push(l-s-.4,(r+f)/2,f-r,1),h.push(t*o,d,s,o),g.push(1)}}let _=g.length,v=p();v.setAttribute(`aKfA`,new o(new Float32Array(c),4)),v.setAttribute(`aKfB`,new o(new Float32Array(m),4)),v.setAttribute(`aKfC`,new o(new Float32Array(h),4)),v.setAttribute(`aKfD`,new o(new Float32Array(g),1));let y={uKfTime:i,uKfH:{value:6},uKfSpeed:{value:.5}},b=r.lit({vertexColors:!0,rough:.45,metal:.3,sun:.6,hemi:.6,name:`kf.esc.steps`}),x=b.onBeforeCompile,S=b.customProgramCacheKey;b.onBeforeCompile=(e,t)=>{x&&x.call(b,e,t),Object.assign(e.uniforms,y),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+l).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
`+f).replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+u),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vKfX;
varying float vKfTop;
varying float vKfFade;
`).replace(`#include <color_fragment>`,`#include <color_fragment>
`+d)},b.customProgramCacheKey=()=>(S?S.call(b):``)+`|kf-esc`,b.needsUpdate=!0;let C=new a(v,b,_),w=new e;for(let e=0;e<_;e++)C.setMatrixAt(e,w);return C.name=`KfEscSteps`,C.frustumCulled=!1,C.castShadow=!1,C.receiveShadow=!1,{mesh:C,count:_,setRise(e){return e>.05&&Math.abs(y.uKfH.value-e)>.001&&(y.uKfH.value=e,!0)},setSpeed(e){y.uKfSpeed.value=e}}}var h=13.57*Math.PI/180,g=[.3,.27,.25];async function _(e){let t=await e.json(`k/interior/floors.json`);e.check();let n=(t,n)=>e.texture(t,n).catch(n=>(e.log(`нет`,t,n&&n.message),null)),[r,i,a,o]=await Promise.all([n(`k/interior/signs.webp`,{srgb:!0,anisotropy:8,half:!1}),n(`k/interior/tex/marble-l1.webp`,{srgb:!0,repeat:!0,anisotropy:16,half:!1}),n(`k/interior/tex/marble-l23.webp`,{srgb:!0,repeat:!0,anisotropy:16,half:!1}),n(`k/interior/tex/plant.webp`,{srgb:!0,anisotropy:4,half:!1})]);e.check();let c=e.kiosk&&typeof e.kiosk.lookFor==`function`?e.kiosk.lookFor(`mall`,e.look.state.preset):null,l=c&&c.reflect||{enabled:!0,scale:.5,strength:1},u=s(e.stage,{scale:l.scale||.5});u.setStrength(4.5*(l.strength??1));let d=l.enabled!==!1,f=()=>u.invalidate();e.stage.events&&e.stage.events.addEventListener(`preset`,f);let p={value:0},m=null,h=(e,t,n,r)=>(t=t&&d,t?(m=e,u.setOn(!0,n,r)):m===e&&(m=null,u.setOn(!1)));try{let e=typeof window<`u`?window.__dostyk:null;e&&(e.kf=Object.assign(e.kf||{},{reflector:u,reflStats:u.stats}))}catch{}return{exports:{meta:t,signs:r,plant:o,marble:{L1:i,L2:a,L3:a},reflector:u,claim:h,timeU:p},vramMB:146/10,dispose(){e.stage.events&&e.stage.events.removeEventListener(`preset`,f),u.dispose()}}}function v(e,t,n){let r=e.onBeforeCompile,i=e.customProgramCacheKey;return e.onBeforeCompile=(t,i)=>{r&&r.call(e,t,i),n(t)},e.customProgramCacheKey=()=>(i?i.call(e):``)+`|`+t,e.needsUpdate=!0,e}var y=`
uniform sampler2D uKfRefl;
uniform mat4 uKfReflMat;
uniform float uKfReflOn;
uniform float uKfReflK;
uniform float uKfRoughK;
uniform sampler2D uDfRefl;
uniform float uDfReflK;
uniform float uDemoGlow;
uniform vec3 uKfBandCol;
float kfHash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
`,b=(e,t)=>`
	vec2 kfP = mat2( ${e}, -${t}, ${t}, ${e} ) * vec2( vDemoW.x, - vDemoW.z );
	vec2 kfT = kfP / vec2( 1.2, 0.6 );
	vec2 kfId = floor( kfT );
	vec2 kfF = fract( kfT );
	float kfH = kfHash( kfId );
	vec2 kfUv0 = kfP / 2.4;
	vec2 kfUv = ( kfH > 0.5 ? kfUv0 : - kfUv0 ) + vec2( kfHash( kfId + 17.13 ), kfHash( kfId + 31.71 ) ) * 9.0;
	vec4 sampledDiffuseColor = textureGrad( map, kfUv, dFdx( kfUv0 ), dFdy( kfUv0 ) );
	vec2 kfE = min( kfF, 1.0 - kfF ) * vec2( 1.2, 0.6 );
	float kfPx = max( length( vec2( dFdx( kfP.x ), dFdy( kfP.x ) ) ), length( vec2( dFdx( kfP.y ), dFdy( kfP.y ) ) ) );
	float kfGrout = ( 1.0 - smoothstep( 0.0015, 0.0015 + kfPx, min( kfE.x, kfE.y ) ) ) * clamp( 0.007 / max( kfPx, 1e-5 ), 0.0, 1.0 );
	sampledDiffuseColor.rgb *= ( 0.985 + 0.03 * kfHash( kfId + 7.7 ) ) * ( 1.0 - 0.28 * kfGrout );
	// [K1-KF доисправления] каменные пояса (тёмный камень): 0,5…1,1 м от линии витрин (поле пола R) и 0,45…1,0 м от ограждений
	// проёмов (B); края — по fwidth (чёткие вблизи, без лесенки вдали). Поля нет (uDfReflK = 0) — поясов нет
	float kfBand = 0.0;
	if ( uDfReflK > 0.5 ) {
		vec2 kfFuv = vec2( ( vDemoW.x - uDemoRect.x ) / uDemoRect.z, ( uDemoRect.y + uDemoRect.w + vDemoW.z ) / uDemoRect.w );
		vec3 kfFd = texture2D( uDfRefl, kfFuv ).rgb * 8.0;
		float kfW1 = max( fwidth( kfFd.r ), 0.006 ), kfW2 = max( fwidth( kfFd.b ), 0.006 );
		float kfB1 = smoothstep( 0.5 - kfW1, 0.5 + kfW1, kfFd.r ) * ( 1.0 - smoothstep( 1.1 - kfW1, 1.1 + kfW1, kfFd.r ) );
		float kfB2 = smoothstep( 0.45 - kfW2, 0.45 + kfW2, kfFd.b ) * ( 1.0 - smoothstep( 1.0 - kfW2, 1.0 + kfW2, kfFd.b ) );
		kfBand = max( kfB1, kfB2 );
	}
	sampledDiffuseColor.rgb = mix( sampledDiffuseColor.rgb, sampledDiffuseColor.rgb * uKfBandCol, kfBand );
	float kfRoughT = sampledDiffuseColor.a;
	sampledDiffuseColor.a = 1.0;
	float dfReflDark = 0.0; float dfReflLit = 0.0;
`,x=`
	roughnessFactor = clamp( ( 0.055 + kfRoughT * 0.55 ) * uKfRoughK * ( 1.0 - 0.25 * kfBand ) + kfGrout * 0.35, 0.04, 1.0 );
`,S=`
	vec2 kfTilt = ( vec2( kfHash( kfId + 3.1 ), kfHash( kfId + 5.7 ) ) - 0.5 ) * 0.006;
	normal = normalize( ( viewMatrix * vec4( kfTilt.x, 1.0, kfTilt.y, 0.0 ) ).xyz );
`,C=`
	if ( uKfReflOn > 0.5 ) {
		vec4 kfRc = uKfReflMat * vec4( vDemoW, 1.0 );
		vec2 kfRuv = kfRc.xy / kfRc.w + ( viewMatrix * vec4( kfTilt.x, 0.0, kfTilt.y, 0.0 ) ).xy * 0.6;
		float kfLod = clamp( material.roughness * 6.0, 0.0, 6.0 );
		vec4 kfR = textureLod( uKfRefl, kfRuv, kfLod );
		vec2 kfB = smoothstep( vec2( 0.0 ), vec2( 0.04 ), kfRuv ) * smoothstep( vec2( 0.0 ), vec2( 0.04 ), 1.0 - kfRuv );
		kfR *= kfB.x * kfB.y;
		radiance = kfR.rgb * uKfReflK / max( uDemoEnv, 0.3 ) + radiance * ( 1.0 - clamp( kfR.a, 0.0, 1.0 ) );
	} else {
		vec3 dfR = inverseTransformDirection( reflect( - geometryViewDir, geometryNormal ), viewMatrix );
		vec2 dfRh = vec2( dfR.x, - dfR.z );
		float dfRl = length( dfRh );
		if ( dfR.y > 0.0 && dfRl > 1e-3 ) {
			vec2 dfDir = dfRh / dfRl, dfP = vec2( vDemoW.x, - vDemoW.z );
			float dfK = dfR.y / dfRl, dfMax = min( 12.0, 3.75 / max( dfK, 1e-3 ) ), dfS = 0.0, dfHit = 0.0, dfSign = 0.0;
			for ( int i = 0; i < 14; i ++ ) {
				vec2 dfQ = dfP + dfDir * dfS;
				vec2 dfUv = vec2( ( dfQ.x - uDemoRect.x ) / uDemoRect.z, ( uDemoRect.y + uDemoRect.w - dfQ.y ) / uDemoRect.w );
				vec2 dfF = textureLod( uDfRefl, dfUv, 0.0 ).rg;
				float dfD = dfF.r * 8.0;
				if ( dfD < 0.1 ) { dfS += dfD; dfHit = 1.0; dfSign = dfF.g; break; }
				dfS += max( dfD, 0.06 );
				if ( dfS > dfMax ) break;
			}
			if ( dfHit > 0.5 ) {
				float dfY = dfS * dfK;
				float dfW = 0.05 + 0.045 * dfS;
				float dfFade = 1.0 - smoothstep( 7.0, 12.0, dfS );
				float dfFres = 0.55 + 0.45 * pow( 1.0 - saturate( dot( geometryNormal, geometryViewDir ) ), 3.0 );
				float dfFr = smoothstep( 2.58 - dfW, 2.58 + dfW, dfY ) * ( 1.0 - smoothstep( 3.6 - dfW, 3.6 + dfW, dfY ) );
				float dfGls = smoothstep( 0.07, 0.07 + dfW, dfY ) * ( 1.0 - smoothstep( 2.58 - dfW, 2.58 + dfW, dfY ) );
				float dfLt = smoothstep( 0.3, 0.8, dfSign ) * smoothstep( 2.8 - dfW, 2.8 + dfW, dfY ) * ( 1.0 - smoothstep( 3.38 - dfW, 3.38 + dfW, dfY ) );
				dfReflDark = dfFr * ( 1.0 - 0.7 * dfLt ) * dfFade * dfFres;
				dfReflLit = ( dfLt * ( 1.0 + uDemoGlow ) * 1.2 + dfGls * 0.35 ) * dfFade * dfFres;
			}
		}
	}
`,w=`
	reflectedLight.indirectSpecular = min( reflectedLight.indirectSpecular, vec3( uKfReflOn > 0.5 ? 2.5 : 0.35 ) );
	reflectedLight.directSpecular = min( reflectedLight.directSpecular, vec3( 0.25 ) );
	reflectedLight.indirectDiffuse *= 1.0 - uDfReflK * 0.7 * dfReflDark;
	reflectedLight.directDiffuse *= 1.0 - uDfReflK * 0.7 * dfReflDark;
	reflectedLight.indirectSpecular += uDfReflK * dfReflLit * vec3( 0.5, 0.49, 0.46 );
`;function ee(e,{refl:t,reflector:n,glow:r,roughK:i}){return v(e,`kf-floor`,e=>{let a=`vec4 sampledDiffuseColor = texture2D( map, vec2( vDemoW.x, - vDemoW.z ) / uDemoTile );`,o=`demoAO = dpLm.b;`,s=`reflectedLight.directSpecular *= uDemoSun * demoAO;`,c=e.fragmentShader;if(!c.includes(a)||!c.includes(o)||!c.includes(s)||!c.includes(`#include <roughnessmap_fragment>`)||!c.includes(`#include <normal_fragment_maps>`)){console.warn(`[kf] шейдер пола: вставка не применена (изменился three или DC)`);return}Object.assign(e.uniforms,n.uniforms),e.uniforms.uDfRefl={value:t},e.uniforms.uDfReflK={value:+!!t},e.uniforms.uDemoGlow=r||{value:0},e.uniforms.uKfRoughK=i,e.uniforms.uKfBandCol={value:g};let l=Math.cos(h).toFixed(6),u=Math.sin(h).toFixed(6);e.fragmentShader=c.replace(`#include <common>`,`#include <common>
`+y).replace(a,b(l,u)).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
`+x).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
`+S).replace(o,o+C).replace(s,s+w)})}var T=`
	{
		float kfFr = pow( 1.0 - saturate( abs( dot( geometryNormal, geometryViewDir ) ) ), 4.0 );
		diffuseColor.a = mix( diffuseColor.a, 1.0, kfFr * uKfGlassF );
	}
`;function E(e,t){return v(e,`kf-glass`,e=>{e.fragmentShader.includes(`#include <opaque_fragment>`)&&(e.uniforms.uKfGlassF={value:t},e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uKfGlassF;
`).replace(`#include <opaque_fragment>`,T+`
#include <opaque_fragment>`))})}function D(e,t){let n=t.geometry,r=n.getAttribute(`position`),i=n.getAttribute(`_rise`);if(!r||!i)return null;t.updateMatrix();let a=r.count,o=new Float32Array(a*3),s=new Float32Array(a),c=new Float32Array(a),l=new e.Vector3;for(let e=0;e<a;e++)l.fromBufferAttribute(r,e).applyMatrix4(t.matrix),o[e*3]=l.x,o[e*3+1]=l.y,o[e*3+2]=l.z,s[e]=l.y,c[e]=i.getX(e);let u=new e.BufferAttribute(o,3);n.setAttribute(`position`,u),n.deleteAttribute(`_rise`),t.position.set(0,0,0),t.quaternion.identity(),t.scale.set(1,1,1),t.updateMatrix(),t.frustumCulled=!1;let d=NaN;return e=>{if(!(e>.05)||Math.abs(e-d)<.002)return!1;d=e;for(let e=0;e<a;e++)o[e*3+1]=s[e]+c[e]*d;return u.needsUpdate=!0,!0}}var O=(e,t)=>`
	{
		vec2 kfP = mat2( ${e}, -${t}, ${t}, ${e} ) * vec2( vDemoW.x, - vDemoW.z );
		vec2 kfT = vec2( kfP.x / 0.19, kfP.y / 1.5 );
		float kfRow = floor( kfT.x );
		float kfOff = fract( sin( kfRow * 91.7 ) * 43758.5453 );
		float kfCol = floor( kfT.y + kfOff );
		float kfH = fract( sin( dot( vec2( kfRow, kfCol ), vec2( 127.1, 311.7 ) ) ) * 43758.5453 );
		vec2 kfF = vec2( fract( kfT.x ), fract( kfT.y + kfOff ) );
		vec2 kfPx = max( fwidth( kfT ), vec2( 1e-4 ) );
		float kfJ = max( 1.0 - smoothstep( 0.0, 0.05 + kfPx.x, min( kfF.x, 1.0 - kfF.x ) ), 1.0 - smoothstep( 0.0, 0.006 + kfPx.y, min( kfF.y, 1.0 - kfF.y ) ) );
		float kfVis = clamp( 0.12 / max( kfPx.x, 1e-4 ), 0.0, 1.0 );
		float kfGrain = 0.5 + 0.5 * sin( kfP.y * 23.0 + kfH * 40.0 + sin( kfP.x * 61.0 + kfH * 9.0 ) * 1.3 );
		vec3 kfWood = vec3( 0.93, 0.80, 0.62 ) * ( 0.88 + 0.2 * kfH ) * ( 0.97 + 0.05 * kfGrain ) * ( 1.0 - 0.28 * kfJ * kfVis );
		diffuseColor.rgb = mix( diffuseColor.rgb, kfWood, uKfShopNear );
	}
`;function te(e,t,n,r){t.transparent=!0,t.depthWrite=!1,t.blending=e.CustomBlending,t.blendEquation=e.AddEquation,t.blendSrc=e.OneFactor,t.blendDst=e.SrcAlphaFactor;let i=Math.cos(h).toFixed(6),a=Math.sin(h).toFixed(6);return v(t,`df-overlay-u+kfplank`,e=>{e.uniforms.uDfK=n,e.uniforms.uKfShopNear=r,e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uDfK;
uniform float uKfShopNear;`).replace(`#include <color_fragment>`,`#include <color_fragment>
`+O(i,a)).replace(`#include <dithering_fragment>`,`#include <dithering_fragment>
	gl_FragColor = vec4( gl_FragColor.rgb * uDfK, 1.0 - uDfK );
`)})}var k=`
	{
		vec3 kfWN = inverseTransformDirection( normal, viewMatrix );
		float kfV = vDemoW.y - uKfFloorY - 2.58;
		if ( kfWN.y > -0.5 ) {
			vec2 kfT = normalize( vec2( - kfWN.z, kfWN.x ) + 1e-5 );
			float kfU = dot( vDemoW.xz, kfT );
			float kfPx = max( fwidth( kfU ), 1e-4 );
			float kfJ = abs( fract( kfU / 1.2 + 0.5 ) - 0.5 ) * 1.2;
			float kfJoint = ( 1.0 - smoothstep( 0.003, 0.003 + kfPx, kfJ ) ) * clamp( 0.025 / kfPx, 0.0, 1.0 );
			float kfVp = max( fwidth( kfV ), 1e-4 );
			float kfTrim = 1.0 - smoothstep( 0.03, 0.03 + kfVp, kfV );
			float kfWash = exp( - max( 1.02 - kfV, 0.0 ) / 0.3 ) * mix( 5.0, 8.0, uDemoGlow ) + exp( - max( kfV, 0.0 ) / 0.1 ) * mix( 1.2, 2.5, uDemoGlow );
			diffuseColor.rgb *= 1.0 - 0.5 * kfJoint;
			totalEmissiveRadiance += diffuseColor.rgb * vec3( 1.0, 0.86, 0.68 ) * kfWash * ( 1.0 - kfTrim );
			diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.55, 0.38, 0.19 ), kfTrim );
			metalnessFactor = mix( metalnessFactor, 1.0, kfTrim );
			roughnessFactor = mix( roughnessFactor, 0.32, kfTrim );
		} else {
			roughnessFactor = 0.85;
		}
	}
`;function ne(e,t,n){return v(e,`kf-fascia`,e=>{!e.fragmentShader.includes(`#include <normal_fragment_maps>`)||!e.fragmentShader.includes(`varying vec3 vDemoW;`)?console.warn(`[kf] шейдер фриза: вставка не применена`):(e.uniforms.uKfFloorY=t,e.uniforms.uDemoGlow=n||{value:0},e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uKfFloorY;
uniform float uDemoGlow;
`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
`+k))})}function re(e,t){let n=!1;for(let r of t||[])for(let t of[r.outer,...r.holes||[]])if(t)for(let r=0,i=t.length-1;r<t.length;i=r++){let a=t[r],o=t[i];a[1]>e[1]!=o[1]>e[1]&&e[0]<(o[0]-a[0])*(e[1]-a[1])/(o[1]-a[1])+a[0]&&(n=!n)}return n}async function A(e,t){let{THREE:n,mats:r,floors:i}=e,a=e.dep(`kf-floors-lib`)||{},o=a.meta&&a.meta.levels&&a.meta.levels[t]||null,s=await e.gltf(`k/interior/${t}.glb`);e.check();let c=null,l=null;try{c=await e.texture(`k/interior/${t}-light.jpg`,{srgb:!1,half:!1,anisotropy:4})}catch(t){e.log(`карта света не пришла`,t&&t.message)}if(e.check(),o&&o.refl)try{l=await e.texture(`k/interior/${t}-refl.webp`,{srgb:!1,mips:!1,half:!1})}catch(t){e.log(`поле отражений не пришло`,t&&t.message)}e.check();let u=o?o.rect:null,d=c&&u?{lightmap:c,rect:u}:{},f=e.uniforms||{},p=a.reflector,h=new n.DataTexture(new Uint8Array([102,31,255,255]),1,1);h.needsUpdate=!0;let g={lightmap:h,rect:[0,0,1,1]},_={value:.45},v={value:1},y={value:1},b={value:0},x=a.marble&&a.marble[t],S={floor:ee(r.floor({color:t===`L1`?`#F4EEE6`:`#EAE3DA`,map:x||null,tile:[2.4,2.4],rough:.1,sun:.35,hemi:.55,envI:2.2,...d,name:`kf.${t}.floor`}),{refl:c&&u?l:null,reflector:p,glow:f.uDemoGlow,roughK:y}),shop:te(n,r.lit({color:`#F6F1E8`,rough:.55,sun:.55,hemi:.75,...d,name:`kf.${t}.shop`}),_,v),fabric:r.lit({vertexColors:!0,rough:.55,sun:.65,hemi:.6,envI:.8,...g,name:`kf.${t}.fabric`}),fascia:ne(r.lit({vertexColors:!0,rough:.26,sun:.5,hemi:.6,envI:1.3,...g,name:`kf.${t}.fascia`}),b,f.uDemoGlow),escSteel:r.lit({vertexColors:!0,rough:.42,metal:1,sun:.9,hemi:.9,envI:.85,name:`kf.${t}.escsteel`}),escRail:r.lit({vertexColors:!0,rough:.26,sun:.6,hemi:.6,envI:1.2,...g,name:`kf.${t}.escrail`}),brass:r.lit({vertexColors:!0,rough:.4,metal:1,sun:.9,hemi:.9,envI:1.15,name:`kf.${t}.brass`}),leaf:a.plant?r.lit({map:a.plant,color:`#D2D9C6`,vertexColors:!0,rough:.72,sun:.7,hemi:.85,envI:.3,side:n.DoubleSide,...g,name:`kf.${t}.leaf`}):null,lit:r.lit({vertexColors:!0,rough:.62,sun:.6,hemi:.6,...g,name:`kf.${t}.lit`}),wall:r.lit({vertexColors:!0,rough:.7,sun:.6,hemi:.6,...g,name:`kf.${t}.wall`}),smooth:r.lit({vertexColors:!0,rough:.45,sun:.6,hemi:.6,...g,name:`kf.${t}.smooth`}),metal:r.lit({vertexColors:!0,rough:.26,metal:1,sun:.9,hemi:.9,envI:1.3,name:`kf.${t}.metal`}),steel:r.lit({vertexColors:!0,rough:.16,metal:1,sun:.9,hemi:.9,envI:1.7,name:`kf.${t}.steel`}),glass:E(r.glass({tint:`#CFE2EA`,opacity:.13,envI:1.1,name:`kf.${t}.glass`}),.55),railGlass:E(r.glass({tint:`#D6EBE6`,opacity:.1,envI:1.2,name:`kf.${t}.railglass`}),.6),wellGlass:E(r.glass({tint:`#DDEBF0`,opacity:.3,envI:1,name:`kf.${t}.wellglass`}),.4),skyGlass:E(r.glass({tint:`#DCEAF2`,opacity:.16,envI:1,name:`kf.${t}.skyglass`}),.35),marchGlass:E(r.glass({tint:`#D3E4E6`,opacity:.14,envI:.8,name:`kf.${t}.marchglass`}),.22),sign:a.signs?r.emissive({color:`#FFFFFF`,map:a.signs,transparent:!0,intensity:2.4,day:1.6,name:`kf.${t}.sign`}):null,cove:a.signs?r.emissive({color:`#FFFFFF`,map:a.signs,transparent:!0,intensity:1.8,day:.95,name:`kf.${t}.cove`}):null,down:a.signs?r.emissive({color:`#FFFFFF`,map:a.signs,transparent:!0,intensity:3.2,day:2.2,name:`kf.${t}.down`}):null,led:a.signs?r.emissive({color:`#FFFFFF`,map:a.signs,transparent:!0,intensity:2.2,day:1.15,name:`kf.${t}.led`}):null};S.lit.color.setScalar(1.05),S.smooth.color.setScalar(1),S.wall.color.setScalar(1.18),S.leaf&&(S.leaf.alphaTest=.42,S.leaf.alphaToCoverage=!0),S.floor.polygonOffset=!0,S.floor.polygonOffsetFactor=-1,S.floor.polygonOffsetUnits=-2;for(let e of[`sign`,`cove`,`down`,`led`]){let t=S[e];t&&(t.depthWrite=!1,t.alphaTest=.02,t.polygonOffset=!0,t.polygonOffsetFactor=-1,t.polygonOffsetUnits=-4,t.vertexColors=!0)}for(let e of[`lit`,`wall`,`metal`,`glass`,`railGlass`,`wellGlass`,`marchGlass`,`skyGlass`,`fascia`,`escSteel`,`escRail`])S[e].flatShading=!0;let C=new Set([`glass`,`railGlass`,`wellGlass`,`marchGlass`,`skyGlass`,`sign`,`cove`,`down`,`led`]),w=new Map(Object.entries(S).filter(([,e])=>e&&e.color).map(([e,t])=>[e,t.color.clone()])),T=s.scene;T.name=`KioskFloors_${t}`;let O={near:[],far:[],faronly:[],below:[],well:[]},k=[],A=[],j=[],M=[],N=[],P=null;T.traverse(e=>{if(!e.isMesh)return;let t=e.userData&&e.userData.df||{};e.castShadow=!1,e.receiveShadow=!1,e.matrixAutoUpdate=!1,e.updateMatrix();let r=null,i=!0;switch(t.kind){case`floor`:r=S.floor,e.renderOrder=0,i=!1;break;case`shopfloor`:r=S.shop,e.renderOrder=1,i=!1;break;case`lit`:r=e.geometry.getAttribute(`normal`)?S.smooth:e.name===`df_walls`||e.name===`df_col_square`?S.wall:S.lit;break;case`metal`:r=S.metal;break;case`brass`:r=e.geometry.getAttribute(`normal`)?S.brass:S.metal;break;case`leaf`:r=S.leaf;break;case`fabric`:r=e.geometry.getAttribute(`normal`)?S.fabric:S.lit;break;case`steel`:r=e.geometry.getAttribute(`normal`)?S.steel:S.metal;break;case`glass`:r=S.glass,e.renderOrder=2;break;case`railglass`:r=S.railGlass,e.renderOrder=2;break;case`skyglass`:r=S.skyGlass,e.renderOrder=2;break;case`wellglass`:r=S.wellGlass,e.renderOrder=2;break;case`sign`:r=t.part===`cove`?S.cove:t.part===`downlights`?S.down:S.sign,e.renderOrder=e.name===`kf_signs_back`?2.9:3;break;case`march`:r=S.lit,(t.marches||[]).forEach(e=>k.push(e)),A.push(D(n,e));break;case`marchsteel`:r=S.escSteel,A.push(D(n,e));break;case`marchrail`:r=S.escRail,A.push(D(n,e));break;case`fascia`:r=S.fascia;break;case`led`:r=S.led,e.renderOrder=3;break;case`marchglass`:r=S.marchGlass,e.renderOrder=2,A.push(D(n,e));break;case`marchled`:r=S.led,e.renderOrder=3,A.push(D(n,e));break;case`vwall`:r=S.wall,j.push(D(n,e)),P=t.below||P;break;case`vfloor`:r=S.floor,j.push(D(n,e)),P=t.below||P,i=!1;break;default:r=S.lit}if(!r){e.visible=!1;return}let a=e.material;e.material=r,a&&a!==r&&a.dispose(),e.isInstancedMesh&&t.part===`props`&&(i=!1),i&&e.layers.enable(9),(O[t.set]||O.near).push(e),e.isInstancedMesh&&(t.part===`props`||t.part===`plants`)&&M.push(e),e.isInstancedMesh&&t.small&&N.push(e)});let F=o?m(o.marches,a.meta&&a.meta.esc,r,a.timeU||{value:0},o.wellFrames||[]):null;F&&(F.mesh.layers.enable(9),F.mesh.matrixAutoUpdate=!1,T.add(F.mesh),O.far.push(F.mesh));let I=i.levelGroup(t),L=[],R=I&&I.getObjectByName(`FloorLevel_${t}__glass`);R&&L.push(R);let z=I&&I.getObjectByName(`FloorLevel_${t}__marches`);z&&k.length&&L.push(z),L.length&&e.hideLight(L);let B=null,V=-1,H=null,U=null;function W(e,t,n){let r=e===`full`&&!!t,i=e===`full`&&!!n;if(e!==B||r!==H||i!==U){B=e,H=r,U=i;for(let e of O.near)e.visible=B===`full`;for(let e of O.far)e.visible=B===`full`||B===`far`;for(let e of O.faronly)e.visible=B===`far`;for(let e of O.below)e.visible=r;for(let e of O.well)e.visible=i;N.length&&(Y=null)}}function ie(e){let t=1-.45*Math.max(0,Math.min(1,e||0));if(!(Math.abs(t-V)<.004)){V=t;for(let[e,n]of w)S[e].color.copy(n).multiplyScalar(C.has(e)?1:t);p&&p.invalidate&&p.invalidate()}}function G(){for(let e of k){let t=i.marchInfo&&i.marchInfo(e);if(t&&t.rise>.05){let e=!1;for(let n of A)n&&n(t.rise)&&(e=!0);return F&&F.setRise(t.rise)&&(e=!0),e}}return!1}function K(){if(!U||!j.length||!P||!i.levelY)return!1;let e=i.levelY(t),n=i.levelY(P);if(!Number.isFinite(e)||!Number.isFinite(n))return!1;let r=Math.max(3.5,e-n),a=!1;for(let e of j)e&&e(r)&&(a=!0);return a}function ae(){let e=i.state;if(e&&typeof e==`object`&&`category`in e)return!!e.category&&!e.suspendCategory||!!(e.highlight&&e.highlight.style===`dimOthers`&&e.highlight.ids&&e.highlight.ids.size);let t=i.getState?i.getState():null;return!!(t&&t.category)}let q=60;function J(){let e=1-Math.min(1,Math.max(0,(q-110)/110)),t=e*e*(3-2*e),n=ae()?.12:.24+.24*t;return Math.abs(_.value-n)<.002&&Math.abs(v.value-t)<.002?!1:(_.value=n,v.value=t,!0)}let Y=null,X=new n.Vector3;function Z(n){let r=e.stage&&e.stage.controls;return r&&typeof r.getTarget==`function`?(r.getTarget(X),n.distanceTo(X)):Math.abs(n.y-(i.levelY&&i.levelY(t)||0))}function oe(e){if(!N.length||B!==`full`||!e)return!1;let t=Z(e),n=Y===!1?t<112:t<125;if(n===Y)return!1;Y=n;for(let e of N)e.visible=n;return!0}let Q=new Map,$=``;function se(e){let n=e&&e.route,r=e&&e.pair,a=null;r&&n&&n.active&&n.to&&i.place&&(a=i.place(n.to),a&&(a.level===t||!a.polys)&&(a=null));let o=r&&(r.lower||(Array.isArray(r)?r[0]:null));o&&o!==t&&(a=null);let s=a?a.id||n.to:``;if(s===$)return!1;$=s;for(let[e,t]of Q)e.instanceMatrix.array.set(t),e.instanceMatrix.needsUpdate=!0;if(Q.clear(),!a)return!0;let c=1/0,l=-1/0,u=1/0,d=-1/0;for(let e of a.polys)for(let t of e.outer||[])c=Math.min(c,t[0]),l=Math.max(l,t[0]),u=Math.min(u,t[1]),d=Math.max(d,t[1]);for(let e of M){let t=e.instanceMatrix.array,n=e.instanceMatrix.count,r=null;for(let i=0;i<n;i++){let n=t[i*16+12],o=-t[i*16+14];if(!(n<c-1||n>l+1||o<u-1||o>d+1||!re([n,o],a.polys))){r||(r=t.slice(),Q.set(e,r));for(let e=0;e<15;e++)t[i*16+e]=0}}r&&(e.instanceMatrix.needsUpdate=!0)}return!0}let ce=new n.Vector3,le=!1,ue=`color`;function de(e){if(!p||!a.claim)return!1;let n=!!e&&e.lod===`full`&&e.level===t&&!e.pair&&!e.transfer&&e.style!==`maquette`;le=n;let r=0;return n&&I&&(I.updateWorldMatrix(!0,!1),r=I.getWorldPosition(ce).y+.07),a.claim(t,n,r,T)}let fe=!1;return W(`far`),G(),{root:T,update(n){W(n.lod===`hidden`?B||`far`:n.lod,n.below,n.level===t&&!n.pair&&!n.transfer),ie(n.lod===`far`&&n.layout?n.layout.dim:0),ue=n.style||`color`;let r=G();K()&&(r=!0),J()&&(r=!0),se(n)&&(r=!0),de(n)&&(r=!0),r&&e.stage.requestRender()},frame(t){let n=k.length&&G();O.below.length&&t&&B===`full`&&!!t.below!==H&&(W(B,t.below,U),n=!0),U&&K()&&(n=!0),t&&t.camera&&(q=Z(t.camera)),J()&&(n=!0),t&&oe(t.camera)&&(n=!0),t&&t.pair&&se(t)&&(n=!0),le&&de(t)&&(n=!0);{let e=T.matrixWorld.elements[13];Math.abs(e-b.value)>1e-4&&(b.value=e)}if(F){let e=(B===`full`||B===`far`)&&ue!==`maquette`&&!!t&&!!t.camera&&Z(t.camera)<170;fe=e,e&&a.timeU&&(a.timeU.value=performance.now()/1e3%3600)}return n&&e.stage.requestRender(),fe},dispose(){a.claim&&a.claim(t,!1),h.dispose()}}}export{A as buildKfLevel,_ as buildKfLib};