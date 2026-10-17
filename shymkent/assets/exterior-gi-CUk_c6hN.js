import{An as e,Dn as t,Dt as n,It as r,Q as i,dt as a,jn as o,kn as s,ln as c,nt as l,p as u,q as d}from"./index-CoIUSgy_.js";import{r as f}from"./runtime-CUDw1R-h.js";var p=[`W1`,`W2`,`R1`,`G1`,`C1`],m=[`albedo`,`day`,`eve`,`lamp`,`mask`,`amb`],h=.008,g=new Set([`site.granite`,`site.graniteStrip`]),_={"facade.blackMetal":[.52,.22],"facade.bronze":[.38,.85],"facade.goldSoffit":[.4,.82],"facade.bronzeSoffit":[.4,.85],"facade.greyPanel":[.55,0],"facade.mullion":[.35,.75],"facade.lightboxFrame":[.3,.85],"facade.canopy":[.5,0],"facade.plinth":[.85,0],"facade.l4":[.45,.35],"facade.paleGrey":[.7,0],"facade.sand":[.75,0],"facade.seam":[.75,0],"roof.capGold":[.32,.85],"roof.cap":[.6,0],"roof.lantern":[.75,0],"roof.deck":[.85,0],"roof.hvac":[.45,.6],"roof.louvre":[.5,.6],"roof.fanDisc":[.5,.5],"site.granite":[.46,0],"site.graniteStrip":[.58,0]},ee={"facade.greyPanel":[.06,.4],"facade.blackMetal":[.15,.5],"facade.canopy":[.4,.8],"facade.plinth":[.5,.8]},v={day:{w:[1,0,0,0],k:1,sun:[1,1,1],sky:[1,1,1],lamp:0,emit:0,spec:[1,0]},evening:{w:[0,1,0,0],k:1,sun:[1,1,1],sky:[1,1,1],lamp:1.4,lampT:[1,.94,.86],emit:.7,spec:[0,1]},night:{w:[0,0,.6,.5],k:0,sun:[1,1,1],sky:[1,1,1],lamp:3.5,lampT:[1,.9,.78],emit:1,spec:[0,0]}},y=`
uniform float uGiBias;
uniform sampler2D uGiDay;
uniform sampler2D uGiEve;
uniform sampler2D uGiLamp;
uniform sampler2D uGiMask;
uniform sampler2D uGiAmb;
uniform vec4 uGiW;          // веса: день, вечер, небо (amb), солнце в реальном времени
uniform vec3 uGiK;
uniform vec3 uGiSunT;
uniform vec3 uGiSkyT;
uniform vec3 uGiSunKD;
uniform vec3 uGiSunKE;
uniform vec3 uGiSunDD;
uniform vec3 uGiSunDE;
uniform vec3 uGiAmbK;
uniform vec3 uGiLampK;
uniform vec3 uGiScale;      // шкалы: день, вечер, фонари
uniform vec2 uGiSpec;       // блик солнца × видимость: день (mask.R), вечер (mask.G)
uniform vec2 uGiSpecK;      // материал: блик солнца, блик окружения
uniform float uGiEmit;
uniform float uGiDbg;
#ifdef GI_SLAB
// плиты площади (1,2 × 0,6 м при текселе 6 см): шов 2,5 см ниже плит делит с краем плиты тексели плана — край плиты темнел полосой
// ≈ 12 см. На плитах — максимум по соседним текселям (тёмный шов не «затекает»); сами швы (основание под плитами) — как в карте
uniform vec2 uGiTexel;
vec4 giMax( sampler2D t, vec2 uv ) {
	vec4 a = texture2D( t, uv );
	a = max( a, texture2D( t, uv + vec2( uGiTexel.x, uGiTexel.y ) ) );
	a = max( a, texture2D( t, uv + vec2( - uGiTexel.x, uGiTexel.y ) ) );
	a = max( a, texture2D( t, uv + vec2( uGiTexel.x, - uGiTexel.y ) ) );
	return max( a, texture2D( t, uv - uGiTexel ) );
}
#define GI_TEX( t, uv ) giMax( t, uv )
// швы плит — аналитически, со сглаживанием по fwidth (видны в обе стороны и вдали, как в кадрах Cycles; геометрический шов 2,5 см
// вдали рвётся в лесенку): плиты 1,2 × 0,6 м по осям здания (src/generator/parts/sp-kit.js uvOf), каждые 7,2 м — шов шире
float giJoint( vec3 wp ) {
	vec2 en = vec2( wp.x, - wp.z );
	vec2 q = vec2( 0.6794 * en.x + 0.7337 * en.y, - 0.7337 * en.x + 0.6794 * en.y );
	vec2 w = fwidth( q ) * 0.75;
	vec2 d = abs( fract( q / vec2( 1.2, 0.6 ) + 0.5 ) - 0.5 ) * vec2( 1.2, 0.6 );
	vec2 d7 = abs( fract( q / 7.2 + 0.5 ) - 0.5 ) * 7.2;
	vec2 hw = mix( vec2( 0.016 ), vec2( 0.032 ), step( d7, vec2( 0.05 ) ) );
	vec2 l = 1.0 - smoothstep( hw - w, hw + w, d );
	// тоньше пикселя — слабее (сглаживание по площади), без муара вдали
	l *= clamp( hw * 2.0 / max( w * 2.0, 1e-4 ), 0.0, 1.0 ) * ( 1.0 - smoothstep( 0.1, 0.4, max( w.x, w.y ) ) );
	return max( l.x, l.y );
}
#else
#define GI_TEX( t, uv ) texture2D( t, uv )
#endif
#ifdef GI_FADE
// [S2 X3b доиспр.] край земли GI поверх лёгкой: покрытие (план в осях здания, 0,5 м) с плавным спадом к краю — лёгкая модель
// проступает сквозь GI, «зубцов» обрезки нет
uniform sampler2D uGiCov;
uniform vec4 uGiCovR;       // u0, v0 (м, оси здания), 1 / ширина, 1 / высота (м)
#endif
`,b=`
#if defined( GI_SLAB ) && defined( USE_MAP )
	diffuseColor *= giMax( map, vMapUv );
#else
	#include <map_fragment>
#endif
`,x=`
	{
		vec2 gUv = vMapUv;
		vec4 gM = GI_TEX( uGiMask, gUv );
		float gAmb = pow( GI_TEX( uGiAmb, gUv ).r, 2.2 );
		vec3 gLamp = pow( texture2D( uGiLamp, gUv ).rgb, vec3( 3.0 ) ) * uGiScale.z;
		vec3 gN = inverseTransformDirection( geometryNormal, viewMatrix );
		vec3 gL = vec3( 0.0 );
		if ( uGiW.x > 0.0 ) {
			vec3 d = pow( GI_TEX( uGiDay, gUv ).rgb, vec3( 2.2 ) ) * uGiScale.x;
			vec3 s = min( gM.r * max( dot( gN, uGiSunDD ), 0.0 ) * uGiSunKD, d );
			gL += uGiW.x * ( s * uGiSunT + ( d - s ) * uGiSkyT );
		}
		if ( uGiW.y > 0.0 ) {
			vec3 d = pow( GI_TEX( uGiEve, gUv ).rgb, vec3( 2.2 ) ) * uGiScale.y;
			vec3 s = min( gM.g * max( dot( gN, uGiSunDE ), 0.0 ) * uGiSunKE, d );
			gL += uGiW.y * ( s * uGiSunT + ( d - s ) * uGiSkyT );
		}
		gL *= uGiK;
		gL += uGiW.z * gAmb * uGiAmbK + gLamp * uGiLampK;
		reflectedLight.indirectDiffuse = material.diffuseContribution * gL;
		reflectedLight.directDiffuse *= uGiW.w;
		reflectedLight.directSpecular *= mix( dot( gM.rg, uGiSpec ), 1.0, uGiW.w ) * uGiSpecK.x;
		// блик окружения: вверх — небо, его закрывают (amb); вниз — земля и дома, amb (свет неба) к ним отношения не имеет (софит аркады)
		vec3 gR = inverseTransformDirection( reflect( - geometryViewDir, geometryNormal ), viewMatrix );
		reflectedLight.indirectSpecular *= mix( 1.0, gAmb, 0.85 * smoothstep( - 0.15, 0.35, gR.y ) ) * uGiSpecK.y;
		#ifdef GI_SLAB
		{
			float j = giJoint( vDemoW );
			reflectedLight.indirectDiffuse *= 1.0 - 0.6 * j;
			reflectedLight.directSpecular *= 1.0 - 0.8 * j;
			reflectedLight.indirectSpecular *= 1.0 - 0.8 * j;
		}
		#endif
		float gS = gM.b * gM.b * 1.2;
		totalEmissiveRadiance += material.diffuseContribution * ( gS / ( 1.0 + gS * 0.15 ) ) * uGiEmit;
		if ( uGiDbg > 0.5 && uGiDbg < 1.5 ) { reflectedLight.indirectDiffuse = gL * 0.5; reflectedLight.directSpecular *= 0.0; reflectedLight.indirectSpecular *= 0.0; }
		if ( uGiDbg > 1.5 && uGiDbg < 2.5 ) { reflectedLight.directSpecular *= 0.0; reflectedLight.indirectSpecular *= 0.0; }
		if ( uGiDbg > 2.5 ) reflectedLight.indirectSpecular *= 0.0;
		#ifdef GI_FADE
		{
			vec2 en = vec2( vDemoW.x, - vDemoW.z );
			vec2 q = vec2( 0.6794 * en.x + 0.7337 * en.y, - 0.7337 * en.x + 0.6794 * en.y );
			float cov = texture2D( uGiCov, ( q - uGiCovR.xy ) * uGiCovR.zw ).r;
			if ( cov < 0.004 ) discard;
			diffuseColor.a *= cov;
		}
		#endif
	}
`,S=`
	mvPosition.xyz -= normalize( mvPosition.xyz ) * uGiBias;
	gl_Position = projectionMatrix * mvPosition;
`,C=e=>window.__dostyk&&window.__dostyk.root||e.scene&&e.scene.getObjectByName(`ShymkentPlaza`)||null;function w(e,t){let n=C(e),r=new Set,i=new Set(t);return n&&n.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material||[]))t&&i.has(t.name)&&r.add(t)}),[...r]}var T=.5,E=.75,D=9,O=.6794,k=.7337;function A(r){let i=new e,a=[],s=1/0,u=1/0,d=-1/0,f=-1/0,p=new e,m=new e,h=new e,g=new e,_=new e,ee=new e;for(let e of r){if(e.userData.giAtlas===`C1`)continue;let t=e.geometry,n=t.attributes.position,r=t.index,o=r?r.count:n.count,c=t=>i.fromBufferAttribute(n,r?r.getX(t):t).applyMatrix4(e.matrixWorld);for(let e=0;e+2<o;e+=3){p.copy(c(e)),m.copy(c(e+1)),h.copy(c(e+2)),g.crossVectors(_.subVectors(m,p),ee.subVectors(h,p));let t=g.length();if(t<1e-6||Math.abs(g.y)/t<.3)continue;let n=[p,m,h].map(e=>{let t=e.x,n=-e.z;return[O*t+k*n,-.7337*t+O*n]});for(let[e,t]of n)s=Math.min(s,e),d=Math.max(d,e),u=Math.min(u,t),f=Math.max(f,t);a.push(n)}}if(!a.length)return null;let v=4*T;s-=v,u-=v,d+=v,f+=v;let y=Math.ceil((d-s)/T),b=Math.ceil((f-u)/T),x=new Uint8Array(y*b);for(let[[e,t],[n,r],[i,o]]of a){let a=(n-e)*(o-t)-(r-t)*(i-e);if(Math.abs(a)<1e-9)continue;let c=a>0?1:-1,l=Math.max(0,Math.floor((Math.min(e,n,i)-s)/T)),d=Math.min(y-1,Math.ceil((Math.max(e,n,i)-s)/T)),f=Math.max(0,Math.floor((Math.min(t,r,o)-u)/T)),p=Math.min(b-1,Math.ceil((Math.max(t,r,o)-u)/T));for(let a=f;a<=p;a++){let f=u+(a+.5)*T;for(let u=l;u<=d;u++){let l=s+(u+.5)*T,d=((n-e)*(f-t)-(r-t)*(l-e))*c,p=((i-n)*(f-r)-(o-r)*(l-n))*c,m=((e-i)*(f-o)-(t-o)*(l-i))*c;d>=-1e-6&&p>=-1e-6&&m>=-1e-6&&(x[a*y+u]=1)}}}let S=(e,t)=>{let n=new Uint8Array(y*b),r=new Uint8Array(y*b);for(let r=0;r<b;r++)for(let i=0;i<y;i++){let a=+!t;for(let n=-2;n<=2;n++){let o=Math.min(y-1,Math.max(0,i+n)),s=e[r*y+o];if(t?s:!s){a=+!!t;break}}n[r*y+i]=a}for(let e=0;e<b;e++)for(let i=0;i<y;i++){let a=+!t;for(let r=-2;r<=2;r++){let o=n[Math.min(b-1,Math.max(0,e+r))*y+i];if(t?o:!o){a=+!!t;break}}r[e*y+i]=a}return r},C=S(S(x,!0),!1),w=new Float32Array(y*b);for(let e=0;e<y*b;e++)w[e]=C[e]?1e9:0;for(let e=0;e<b;e++)for(let t=0;t<y;t++){let n=e*y+t;if(!w[n])continue;let r=w[n];r=t>0?Math.min(r,w[n-1]+3):Math.min(r,3),e>0?(r=Math.min(r,w[n-y]+3),t>0&&(r=Math.min(r,w[n-y-1]+4)),t<y-1&&(r=Math.min(r,w[n-y+1]+4))):r=Math.min(r,3),w[n]=r}for(let e=b-1;e>=0;e--)for(let t=y-1;t>=0;t--){let n=e*y+t;if(!w[n])continue;let r=w[n];r=t<y-1?Math.min(r,w[n+1]+3):Math.min(r,3),e<b-1?(r=Math.min(r,w[n+y]+3),t<y-1&&(r=Math.min(r,w[n+y+1]+4)),t>0&&(r=Math.min(r,w[n+y-1]+4))):r=Math.min(r,3),w[n]=r}let A=new Uint8Array(y*b);for(let e=0;e<y*b;e++){let t=w[e]/3*T,n=Math.min(1,Math.max(0,(t-E)/D));A[e]=Math.round(n*n*(3-2*n)*255)}let j=new l(A,y,b,c,t);return j.name=`demo:gi-coverage`,j.unpackAlignment=1,j.minFilter=j.magFilter=n,j.generateMipmaps=!1,j.flipY=!1,j.needsUpdate=!0,{tex:j,rect:new o(s,u,1/(y*T),1/(b*T)),W:y,H:b,tris:a.length}}function j(e,t){let n=v[e]||v.day,r=t===`real`&&e!==`night`,i=new Set([`albedo`,`mask`,`amb`]);return!r&&n.w[0]>0&&i.add(`day`),!r&&n.w[1]>0&&i.add(`eve`),n.lamp>0&&i.add(`lamp`),i}var te=new Set([`W1`,`W2`,`R1`]),ne=()=>new Promise(e=>requestAnimationFrame(()=>e()));async function M(t){let[n,c]=await Promise.all([t.json(`exterior/gi/gi.json`),t.json(`exterior/gi/static.json`)]);t.check();let C=t.look,E=()=>[C&&C.state?C.state.preset:`day`,C&&C.state?C.state.sunMode:`artistic`],D=j(...E()),O={},[k]=await Promise.all([t.gltf(`exterior/gi/static.glb`),...p.map(async e=>{let r=n.atlases[e].files,i={};await Promise.all(m.map(async n=>{i[n]=await t.texture(`exterior/gi/${r[n]}`,n===`albedo`?{anisotropy:8,...te.has(e)?{half:!0}:{}}:{srgb:!1,anisotropy:n===`day`||n===`eve`?4:2}),D.has(n)||(i[n].userData.demoLazy=!0)})),O[e]=i})]);t.check();let M=new Set(D),N=new l(new Uint8Array([0,0,0,255]),1,1);N.name=`demo:gi-black`,N.needsUpdate=!0;let P={},re={day:`uGiDay`,eve:`uGiEve`,lamp:`uGiLamp`,mask:`uGiMask`,amb:`uGiAmb`};for(let e of p){P[e]={};for(let[t,n]of Object.entries(re))P[e][n]={value:M.has(t)?O[e][t]:N}}let F=n.encoding,I=n.presets,ie=n.eRef||1.4543264389038086,ae=(t,n)=>new e(...n.map(e=>t*e/Math.PI/ie*1)),L={uGiBias:{value:0},uGiW:{value:new o(1,0,0,0)},uGiK:{value:new e(1,1,1)},uGiSunT:{value:new e(1,1,1)},uGiSkyT:{value:new e(1,1,1)},uGiSunKD:{value:ae(4.2,[1,.95,.88])},uGiSunKE:{value:ae(3.6,[1,.76,.52])},uGiSunDD:{value:u(I.day.sun.az,I.day.sun.el)},uGiSunDE:{value:u(I.eve.sun.az,I.eve.sun.el)},uGiAmbK:{value:new e},uGiLampK:{value:new e},uGiScale:{value:new e(F.day.scale,F.eve.scale,F.lamp.scale)},uGiSpec:{value:new s(1,0)},uGiEmit:{value:0},uGiDbg:{value:t.param&&+t.param(`giDbg`)||0}},oe=e=>{let n=t.param?parseFloat(t.param(e)):NaN;return Number.isFinite(n)?n:null},R=null,z=null,B=!1,V=!0,se=0,ce=()=>{let n=t.look&&t.look.hemi;if(!n)return new e(.3,.35,.45);let r=n.color.clone().multiplyScalar(n.intensity/Math.PI).lerp(n.groundColor.clone().multiplyScalar(n.intensity/Math.PI),.12);return new e(r.r,r.g,r.b)};function le(e,t){let n=v[e]||v.day,r=t===`real`&&e!==`night`,i=(oe(`giK`)??1)*n.k;L.uGiW.value.set(...r?[0,0,1,1]:n.w),L.uGiK.value.set(i,i,i),L.uGiSunT.value.set(...n.sun),L.uGiSkyT.value.set(...n.sky),L.uGiAmbK.value.copy(ce());let a=(oe(`giLamp`)??1)*n.lamp,o=n.lampT||[1,1,1];L.uGiLampK.value.set(a*o[0],a*o[1],a*o[2]),L.uGiSpec.value.set(...r?[0,0]:n.spec),L.uGiEmit.value=n.emit,R=e+`|`+t;for(let e of X)e.receiveShadow=L.uGiW.value.w>0}function ue(e){for(let t of p)for(let[n,r]of Object.entries(re))P[t][r].value=e.has(n)&&M.has(n)?O[t][n]:N;for(let t of[...M])if(!e.has(t)){for(let e of p)O[e][t].dispose();M.delete(t)}}function de(e,t){let n=e+`|`+t;if(n===z&&(n===R||B))return;z=n;let r=j(e,t);[...r].every(e=>M.has(e))?(le(e,t),ue(r)):B||fe()}async function fe(){B=!0;try{for(;V;){let[e,n]=z.split(`|`),r=j(e,n),i=[...r].find(e=>!M.has(e));if(!i){le(e,n),ue(r),t.stage.requestRender();break}for(let e of p){if(await ne(),!V)return;try{t.stage.renderer.initTexture(O[e][i])}catch{}}M.add(i),se++}}finally{B=!1}}let pe=()=>{let e=0;for(let t of m)if(!M.has(t))for(let n of p)e+=f(O[n][t]);return e},H=new Set(c.hideLight||[]),U=new Map,me=t.param&&t.param(`giFade`)===`0`,W=new l(new Uint8Array([255,255,255,255]),1,1);W.needsUpdate=!0;let G={uGiCov:{value:W},uGiCovR:{value:new o(0,0,1,1)}},K=null;function he(e,r){let a=e+`|`+r.name+`|`+(H.has(r.name)?`own`:`over`);if(U.has(a))return U.get(a);let o=O[e],c=!H.has(r.name),l=t.mats.standard({name:`gi.${e}.${r.name}`,map:o.albedo,roughness:(_[r.name]||[])[0]??r.roughness??.8,metalness:(_[r.name]||[])[1]??r.metalness??0,color:new i(1,1,1)},{sun:1,hemi:1,envI:1});l.userData.giSource=r.name,l.userData.giAtlas=e;let u=ee[r.name]||[1,1],d={uGiSpecK:{value:new s(u[0],u[1])},...P[e],uGiBias:c?{value:h}:L.uGiBias};if(c&&(l.polygonOffset=!0,l.polygonOffsetFactor=-1,l.polygonOffsetUnits=-1),c&&e===`G1`&&!me&&(l.defines={...l.defines||{},GI_FADE:``},l.transparent=!0,Object.assign(d,G)),g.has(r.name)){l.defines={...l.defines||{},GI_SLAB:``};let t=n.atlases[e].sizes&&n.atlases[e].sizes.day||4096;d.uGiTexel={value:new s(.75/t,.75/t)}}let f=l.onBeforeCompile;return l.onBeforeCompile=(e,n)=>{f(e,n),Object.assign(e.uniforms,L,d),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uGiBias;
`).replace(`#include <project_vertex>`,`#include <project_vertex>
`+S),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+y).replace(`#include <map_fragment>`,b).replace(`#include <aomap_fragment>`,`#include <aomap_fragment>
`+x),e.fragmentShader.includes(`gL *= uGiK`)||t.log(`шейдер three изменился — вставка GI не встала`)},l.customProgramCacheKey=()=>`dpdemo-std+gi`,l.needsUpdate=!0,U.set(a,l),l}let q=new a;q.name=`demo:exterior-gi`;let J=new a;J.name=`demo:gi-building`;let Y=new a;Y.name=`demo:gi-site`,q.add(J,Y);let X=[],Z=[];if(k.scene.updateMatrixWorld(!0),k.scene.traverse(e=>{e.isMesh&&Z.push(e)}),t.param&&t.param(`giFlipV`)===`1`)for(let e of Z){let t=e.geometry.attributes.uv;if(!t)continue;let n=new Float32Array(t.count*2);for(let e=0;e<t.count;e++)n[e*2]=t.getX(e),n[e*2+1]=1-t.getY(e);e.geometry.setAttribute(`uv`,new d(n,2))}let Q=0;for(let e of Z){let n=/^BK_([A-Z][0-9])__(.+)$/.exec(e.name||``),i=n&&n[1];if(!i||!O[i]){t.log(`пропущен меш без атласа`,e.name);continue}let a=e.material||{},o=he(i,a);e.material&&e.material!==o&&e.material.dispose();let s=new r(e.geometry,o);s.name=`demo:`+e.name,s.matrixAutoUpdate=!1,s.matrix.copy(e.matrixWorld),s.matrixWorld.copy(e.matrixWorld);let c=H.has(a.name);s.castShadow=c&&i!==`G1`,s.receiveShadow=!1,s.renderOrder=c?0:-1,s.userData.giAtlas=i,(/^[WR]/.test(i)?J:Y).add(s),X.push(s),Q+=(e.geometry.index?e.geometry.index.count:e.geometry.attributes.position.count)/3}if(!me){let e=performance.now();K=A(X),K&&(G.uGiCov.value=K.tex,G.uGiCovR.value.copy(K.rect)),t.log(`покрытие GI: ${K?`${K.W}×${K.H} по ${T} м, ${K.tris} треугольников`:`нет`}, ${Math.round(performance.now()-e)} мс`)}de(...E());let $=w(t,c.hideLight||[]);return t.hideLight($),t.log(`GI: ${X.length} мешей, ${U.size} материалов, ${Math.round(Q)} треугольников; лёгких материалов спрятано ${$.length}`),{root:q,stats:()=>({meshes:X.length,materials:U.size,tris:Math.round(Q),hidden:$.length,mode:R,want:z,resident:[...M],swaps:se,lazyMB:Math.round(pe()/1048576),coverage:K?[K.W,K.H]:null,U:{w:L.uGiW.value.toArray(),k:L.uGiK.value.x}}),uniforms:L,vramMB:e=>Math.round((e-pe()/1048576)*10)/10,update(e){de(e.preset,E()[1])},frame(e){de(e.preset,E()[1])},dispose(){V=!1,N.dispose(),W.dispose(),K&&K.tex.dispose()}}}export{M as buildExteriorGI};