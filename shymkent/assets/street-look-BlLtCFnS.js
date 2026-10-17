import{An as e,dt as t}from"./index-CoIUSgy_.js";var n={day:{sat:1.07,con:.16,sh:[.97,.99,1.04],hi:[1.03,1.01,.97],vig:.22,bloom:{enabled:!0,strength:.06,radius:.5,threshold:2.6}},evening:{sat:1.1,con:.18,sh:[.95,.97,1.06],hi:[1.05,1,.94],vig:.3,bloom:{enabled:!0,strength:.45,radius:.6,threshold:1.05}},night:{sat:1.08,con:.14,sh:[.94,.97,1.08],hi:[1.06,1,.93],vig:.34,bloom:{enabled:!0,strength:.7,radius:.65,threshold:.8}}},r={day:{sat:1.22,con:.2,pow:1.35,sh:[.97,.99,1.04],hi:[1,1,1]},evening:{sat:1.2,con:.2,pow:1.3},night:{sat:1.12,con:.16,pow:1.25}},i=`
uniform float uXGrade;
uniform float uXSat;
uniform float uXCon;
uniform vec3 uXSh;
uniform vec3 uXHi;
uniform float uXVig;
uniform float uXPow;
`,a=`
	{
		vec3 xc = gl_FragColor.rgb;
		float xl = dot( xc, vec3( 0.2126, 0.7152, 0.0722 ) );
		vec3 xg = mix( vec3( xl ), xc, uXSat );
		xg *= mix( uXSh, uXHi, smoothstep( 0.15, 0.85, xl ) );
		xg = clamp( xg, 0.0, 1.0 );
		xg = pow( xg, vec3( uXPow ) );        // [S2 X3a] AgX «Punchy»: степень по выходу (тени глубже, чёрный гофр — чёрный)
		xg = mix( xg, xg * xg * ( 3.0 - 2.0 * xg ), uXCon );
		vec2 xd = ( vUv - 0.5 ) * vec2( 1.0, 0.82 );
		xg *= 1.0 - uXVig * smoothstep( 0.3, 0.95, length( xd ) * 1.45 );
		gl_FragColor.rgb = mix( xc, xg, uXGrade );
	}
	// [S2 X2] канва — непрозрачная. three всегда создаёт контекст WebGL с alpha: true (alpha: false в stage.js задаёт только альфу
	// очистки), а листва с alphaToCoverage пишет в буфер сцены альфу < 1 по краю каждого листа; выходной проход копировал её в канву,
	// и сквозь край листа просвечивал белый фон страницы — «белые контуры» деревьев (жалоба пользователя 16.10). Пробы
	// refs-local/s2/X2/crop-d3.png, crop-d4.png: ободки уходят только с альфой 1 на выходе; AO, блик неба, просвет, тени, MSAA — не причина.
	gl_FragColor.a = 1.0;
`,o=`gl_FragColor = sRGBTransferOETF( gl_FragColor );`,s={day:3,evening:1.4,night:1.4};async function c(c){let l=new t;l.name=`demo:x-look`;let u={uXGrade:c.mats.fadeU,uXSat:{value:1},uXCon:{value:0},uXSh:{value:new e(1,1,1)},uXHi:{value:new e(1,1,1)},uXVig:{value:0},uXPow:{value:1}},d=null;function f(){let e=c.look&&c.look.post,t=e&&e.outputMaterial;t&&t!==d&&(d=t,t.fragmentShader.includes(o)?t.fragmentShader.includes(`uXGrade`)||(t.fragmentShader=t.fragmentShader.replace(`varying vec2 vUv;`,`varying vec2 vUv;
`+i).replace(/(gl_FragColor = sRGBTransferOETF\( gl_FragColor \);\s*#endif)/,`$1
`+a),Object.assign(t.uniforms,u),t.needsUpdate=!0):c.log(`выходной шейдер изменился — цветокоррекция не встала`))}let p={value:s.day},m=new Map,h=-1e9;function g(){let e=performance.now();if(e-h<1500)return;h=e;let t=window.__dostyk&&window.__dostyk.root||c.scene.getObjectByName(`ShymkentPlaza`);t&&t.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material||[])){if(!t||m.has(t)||!t.isMeshStandardMaterial||t.transparent||!t.userData||t.userData.kind!==`glassOpaque`||!t.userData.lookPatched)continue;let e=t.onBeforeCompile,n=t.customProgramCacheKey;m.set(t,[e,n]),t.onBeforeCompile=(n,r)=>{e.call(t,n,r),n.uniforms.uXGlint=p,n.fragmentShader=n.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uXGlint;`).replace(`#include <lights_fragment_end>`,`	reflectedLight.directSpecular = min( reflectedLight.directSpecular, vec3( uXGlint ) );
#include <lights_fragment_end>`)};let r=n.call(t);t.customProgramCacheKey=()=>r+`+xglint`,t.needsUpdate=!0}})}let _=!!(window.__dostyk&&window.__dostyk.demoTier&&window.__dostyk.demoTier.igpu),v=null,y=e=>{let t=c.param?parseFloat(c.param(e)):NaN;return Number.isFinite(t)?t:null};function b(e){let t=n[e]||n.day;if(c.stage.renderer.toneMapping===6&&(t={...t,...r[e]||r.day}),t={...t,sat:y(`gSat`)??t.sat,con:y(`gCon`)??t.con,pow:y(`gPow`)??t.pow??1},p.value=s[e]??s.day,u.uXSat.value=t.sat,u.uXCon.value=t.con,u.uXPow.value=t.pow??1,u.uXSh.value.set(...t.sh),u.uXHi.value.set(...t.hi),u.uXVig.value=t.vig,v=e,!c.lite&&!_&&c.look&&c.look.setShadowSize){let e=c.stage.renderer.capabilities.maxTextureSize||4096,t=parseInt(c.param&&c.param(`demoShadow`),10)||4096;c.look.setShadowSize(Math.min(e,t))}c.look&&c.look.sun&&(c.look.sun.shadow.radius=2.4,c.stage.updateShadows())}return f(),g(),b(c.look&&c.look.state?c.look.state.preset:`day`),{root:l,update(e){f(),e.preset!==v&&b(e.preset)},dispose(){for(let[e,[t,n]]of m)e.onBeforeCompile=t,e.customProgramCacheKey=n,e.needsUpdate=!0;m.clear()},frame(e){f(),g();let t=c.look&&c.look.post;t&&!c.lite&&t.setBloom((n[e.preset]||n.day).bloom)}}}export{c as buildLook};