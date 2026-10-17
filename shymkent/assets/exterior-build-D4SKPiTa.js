import{It as e,Q as t,dt as n,fn as r,kn as i}from"./index-CoIUSgy_.js";var a={matte:{rough:.8,metal:0,envI:.35},gloss:{rough:.45,metal:0,envI:.6},metal:{rough:.36,metal:.75,envI:1}},o=/^dx\.([A-Z0-9]+)\.(matte|gloss|metal)$/,s=/^DX_([A-Z][0-9]?)\.?(matte|gloss|metal)/,c={day:{dusk:0,emit:.3},evening:{dusk:1,emit:.7},night:{dusk:1.35,emit:1}},l=`#FFC58C`,u=1.12,d=2,f=1.6,p=`
	#ifdef USE_AOMAP
	{
		vec3 dxL = texture2D( aoMap, vAoMapUv ).rgb;
		// сила свечения S = B² · emitMax, мягко ограничена (LED-линия 9 → 3,8; экраны и интерьеры почти как есть) — иначе bloom «лазером»
		float dxS = dxL.b * dxL.b * uDxEmit.x;
		dxS = dxS / ( 1.0 + dxS * 0.15 );
		totalEmissiveRadiance += diffuseColor.rgb * ( pow( dxL.g, 2.2 ) * uDxDusk + dxS * uDxEmit.y ) + uDxGlow * dxL.r;
	}
	#endif
`,m=.008,h=`
	mvPosition.xyz -= normalize( mvPosition.xyz ) * uDxBias;
	gl_Position = projectionMatrix * mvPosition;
`;function g(e,n={}){let a={uDxDusk:{value:new t(0,0,0)},uDxEmit:{value:new i(e.scales.emitMax,0)},uDxBias:{value:m},uDxGlow:{value:new t(0,0,0)}},o=new t().setStyle(l,r);return a.set=t=>{let i=c[t]||c.day,s=n.light&&n.light[t]||[1,1];a.uDxDusk.value.copy(o).multiplyScalar(e.scales.duskMax*i.dusk*d*s[0]),a.uDxEmit.value.y=i.emit*f*s[1];let l=n.glow&&n.glow[t];l?a.uDxGlow.value.setStyle(l[0],r).multiplyScalar(l[1]):a.uDxGlow.value.setRGB(0,0,0)},a}function _(e,n,r,i,o,s){let c=a[o]||a.matte,l=u*(c.gain??1),d=e.mats.standard({name:n,map:r,aoMap:i,aoMapIntensity:1,roughness:c.rough,metalness:c.metal,color:new t(l,l,l)},{sun:1,hemi:1,envI:c.envI});d.polygonOffset=!0,d.polygonOffsetFactor=-1,d.polygonOffsetUnits=-1;let f=d.onBeforeCompile;return d.onBeforeCompile=(e,t)=>{f(e,t),Object.assign(e.uniforms,{uDxDusk:s.uDxDusk,uDxEmit:s.uDxEmit,uDxBias:s.uDxBias,uDxGlow:s.uDxGlow}),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uDxBias;
`).replace(`#include <project_vertex>`,`#include <project_vertex>
`+h),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec3 uDxDusk;
uniform vec2 uDxEmit;
uniform vec3 uDxGlow;
`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
`+p)},d.customProgramCacheKey=()=>`dpdemo-std+dx`,d.needsUpdate=!0,d}async function v(t,r){let i=await t.json(`exterior/exterior.json`);t.check();let c={},[l]=await Promise.all([t.gltf(`exterior/core.glb`),...r.map(async e=>{let[n,r]=await Promise.all([t.texture(`exterior/${e}.jpg`,{anisotropy:8}),t.texture(`exterior/${e}-l.jpg`,{srgb:!1,anisotropy:4})]);c[e]={alb:n,lit:r}})]);t.check();let u=t.look&&t.look.state?t.look.state.preset:`day`,d=new Map,f=e=>{let t=a[e]&&(a[e].light||a[e].glow)?e:`*`;if(!d.has(t)){let e=g(i,t===`*`?{}:a[t]);e.set(u),d.set(t,e)}return d.get(t)},p=new Map,m=new n;m.name=`demo:exterior`;let h=[];l.scene.traverse(e=>{e.isMesh&&h.push(e)});let v=0;for(let n of h){let r=n.material&&n.material.name||``,i=o.exec(r)||s.exec(n.name||``);if(!i||!c[i[1]]){t.log(`пропущен меш без атласа`,n.name,r);continue}let a=i[1]+`.`+i[2];p.has(a)||p.set(a,_(t,`dx.`+a,c[i[1]].alb,c[i[1]].lit,i[2],f(i[2]))),n.material&&n.material!==p.get(a)&&n.material.dispose(),n.material=p.get(a),n.updateWorldMatrix(!0,!1);let l=new e(n.geometry,n.material);l.name=`demo:`+n.name,l.matrixAutoUpdate=!1,l.matrix.copy(n.matrixWorld),l.matrixWorld.copy(n.matrixWorld),l.castShadow=!1,l.receiveShadow=!0,l.renderOrder=-1,m.add(l),v+=(n.geometry.index?n.geometry.index.count:n.geometry.attributes.position.count)/3}return t.log(`экстерьер:`,h.length,`мешей,`,p.size,`материалов,`,Math.round(v),`треугольников`),{root:m,update(e){for(let t of d.values())t.set(e.preset)}}}export{v as buildExteriorCore};