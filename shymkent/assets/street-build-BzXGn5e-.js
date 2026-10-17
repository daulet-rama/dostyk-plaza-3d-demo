const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BufferGeometryUtils-SihnJDJ8.js","./index-CoIUSgy_.js"])))=>i.map(i=>d[i]);
import{$t as e,An as t,B as n,Dt as r,Ft as i,It as a,J as o,Lt as s,Ot as c,Q as l,Rt as u,b as d,dt as f,fn as p,gt as m,hn as h,ht as g,in as _,jn as v,kn as y,lt as b,nt as x,on as S,ot as C,q as w}from"./index-CoIUSgy_.js";import{n as T}from"./runtime-CUDw1R-h.js";function E(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var D={plane:{H:17,base:.28,R:7,env:e=>Math.sin(Math.PI*Math.min(1,e*.92+.08))**.7,trunkR:.34,lean:.06,cells:[`plane`,`planeLight`],card:2,cards:8,scaff:6,sub:5,up:.45,bark:[.78,.74,.66]},elm:{H:13,base:.2,R:5.4,env:e=>Math.sin(Math.PI*Math.min(1,e*.9+.1))**.8,trunkR:.26,lean:.1,cells:[`elm`,`elmDark`],card:1.6,cards:8,scaff:7,sub:5,up:.45,bark:[.42,.38,.34]},poplar:{H:22,base:.1,R:2.4,env:e=>Math.min(1,.55+.6*Math.sin(Math.PI*Math.min(1,e*.85+.12)))*(1-e*.35),trunkR:.3,lean:.02,cells:[`poplar`],card:1.4,cards:8,scaff:14,sub:3,up:.92,bark:[.62,.6,.55]},ball:{H:4.6,base:.45,R:1.75,env:e=>Math.sqrt(Math.max(0,1-(2*e-1)**2)),trunkR:.08,lean:0,cells:[`ball`],card:.85,cards:8,scaff:7,sub:4,up:.55,bark:[.45,.42,.38]},young:{H:6.5,base:.38,R:1.7,env:e=>Math.sin(Math.PI*Math.min(1,e*.9+.1)),trunkR:.07,lean:.03,cells:[`young`],card:.9,cards:5,scaff:6,sub:3,up:.65,bark:[.5,.45,.4]},fruit:{H:5.5,base:.3,R:2.8,env:e=>Math.sin(Math.PI*Math.min(1,e*.85+.15))**.6,trunkR:.12,lean:.14,cells:[`fruit`],card:1.1,cards:6,scaff:5,sub:4,up:.4,bark:[.4,.34,.3]},willow:{H:11,base:.22,R:5,env:e=>Math.sin(Math.PI*Math.min(1,e*.9+.1))**.6,trunkR:.3,lean:.12,cells:[`willow`],card:1.7,cards:8,scaff:6,sub:5,up:.5,droop:.9,bark:[.45,.4,.34]},conifer:{H:10,base:.04,R:2.6,env:e=>Math.max(.04,1-e)**.95,trunkR:.16,lean:0,cells:[`conifer`],card:1.35,cards:6,scaff:26,sub:0,up:-.05,conifer:!0,bark:[.38,.32,.28]}},O=Object.keys(D),k=(e,n,r)=>new t(e,n,r),A=k(0,1,0);function j(e,n,r){let i=Math.abs(e.y)<.95?A.clone():k(1,0,0),a=new t().crossVectors(e,i).normalize(),o=new t().crossVectors(e,a).normalize();return e.clone().multiplyScalar(Math.cos(n)).addScaledVector(a,Math.sin(n)*Math.cos(r)).addScaledVector(o,Math.sin(n)*Math.sin(r)).normalize()}function M(e,n,r,i){let a=D[e]||D.elm,s=E(n*7919+O.indexOf(e)*104729+0),c=r!==`lo`,l=a.H*(.9+s()*.2),u=l*a.base,d=a.R*(.9+s()*.2),f=u+(l-u)*.5,p=l-u,m=e=>d*Math.max(.05,a.env(Math.max(0,Math.min(1,(e-u)/p)))),h=e=>e.y<l&&e.y>u*.7&&Math.hypot(e.x,e.z)<m(e.y),g={p:[],n:[],uv:[],c:[],i:[]},_={p:[],n:[],uv:[],c:[],i:[]},v=c?[7,5,4]:[5,3,3];function y(e,n,r){if(e.length<2)return;let i=g.p.length/3,o=0,s=null;for(let i=0;i<e.length;i++){let c=(i<e.length-1?e[i+1].clone().sub(e[i]):e[i].clone().sub(e[i-1])).normalize(),d=s?s.clone().sub(c.clone().multiplyScalar(s.dot(c))).normalize():new t().crossVectors(c,Math.abs(c.y)<.9?A:k(1,0,0)).normalize();(!isFinite(d.x)||d.lengthSq()<.5)&&(d=new t().crossVectors(c,k(1,0,0)).normalize()),s=d;let f=new t().crossVectors(c,d).normalize();i&&(o+=e[i].distanceTo(e[i-1]));for(let t=0;t<=r;t++){let s=t/r*Math.PI*2,c=d.clone().multiplyScalar(Math.cos(s)).addScaledVector(f,Math.sin(s)),p=e[i].clone().addScaledVector(c,n[i]);g.p.push(p.x,p.y,p.z),g.n.push(c.x,c.y,c.z),g.uv.push(t/r*Math.max(1,Math.round(n[i]*8)),o/1.6);let m=Math.min(1,.55+p.y/Math.max(4,l)*.6)*(p.y>u?.85:1);g.c.push(m*a.bark[0],m*a.bark[1],m*a.bark[2])}}for(let t=0;t<e.length-1;t++)for(let e=0;e<r;e++){let n=i+t*(r+1)+e,a=n+r+1;g.i.push(n,a,n+1,n+1,a,a+1)}}let x=a.cells.map(e=>i[e]).filter(Boolean);function S(e,n,r,i){let o=x[Math.floor(s()*x.length)];if(!o)return;let c=n.clone().normalize(),l=new t().crossVectors(c,j(A,1.2,s()*Math.PI*2)).normalize();(!isFinite(l.x)||l.lengthSq()<.5)&&(l=k(1,0,0));let m=s()*Math.PI,h=new t().crossVectors(l,c).normalize();l=l.clone().multiplyScalar(Math.cos(m)).addScaledVector(h,Math.sin(m)).normalize();let g=r*.5,v=r*.08,y=[e.clone().addScaledVector(l,-g).addScaledVector(c,-v),e.clone().addScaledVector(l,g).addScaledVector(c,-v),e.clone().addScaledVector(l,g).addScaledVector(c,r-v),e.clone().addScaledVector(l,-g).addScaledVector(c,r-v)],b=[[o.u0,o.v1],[o.u1,o.v1],[o.u1,o.v0],[o.u0,o.v0]],S=_.p.length/3;for(let e=0;e<4;e++){let t=y[e],n=a.conifer?t.y:f,r=k(t.x,(t.y-n)*(d/Math.max(1,p*.5)),t.z),o=r.lengthSq()>1e-6?r.normalize():A.clone();o.lerp(A,.18).normalize(),_.p.push(t.x,t.y,t.z),_.n.push(o.x,o.y,o.z),_.uv.push(b[e][0],b[e][1]);let s=Math.min(1.2,Math.hypot(t.x/d,(t.y-f)/Math.max(1,p*.55),t.z/d)),c=Math.max(.28,Math.min(1,.3+s*.72))*(.82+.18*Math.min(1,(t.y-u)/p+.2));_.c.push(c*i[0],c*i[1],c*i[2])}_.i.push(S,S+1,S+2,S,S+2,S+3)}let C=a.conifer?l*.97:u+p*.55,w=j(A,a.lean*s(),s()*Math.PI*2),T=[],M=[],N=c?8:4,P=k(0,-.3,0),F=w.clone();for(let e=0;e<=N;e++){T.push(P.clone());let t=e/N;M.push(a.trunkR*(1-t*.72)*(e===0?1.25:1)),F=j(F,.06*s(),s()*Math.PI*2).lerp(A,.12).normalize(),P=P.clone().addScaledVector(F,(C+.3)/N)}y(T,M,v[0]);let I=e=>{let t=Math.max(0,Math.min(1,(e+.3)/(C+.3)))*N,n=Math.min(N-1,Math.floor(t));return T[n].clone().lerp(T[n+1],t-n)},L=c?a.scaff:Math.max(3,Math.round(a.scaff*.6)),R=Math.PI*(3-Math.sqrt(5)),z=s()*Math.PI*2,B=[];for(let e=0;e<L;e++){let t=I(a.conifer?u+(l*.9-u)*(e/L):u+(C-u)*(.05+.9*(e/L)**.9)),n=z+e*R+(s()-.5)*.4,r=a.up*(Math.PI/2)*(.6+s()*.5)+(a.conifer?-.1:0),i=k(Math.cos(n)*Math.cos(r),Math.sin(r),Math.sin(n)*Math.cos(r)).normalize(),o=0,f=.25;for(;o<30&&h(t.clone().addScaledVector(i,o+f));)o+=f;o=Math.max(.6,o*(.8+s()*.2));let p=c?5:3,m=[t.clone()],g=[],_=Math.min(a.trunkR*.55,Math.max(.025,a.trunkR*(a.conifer?.18:.5)*(o/d))),b=t.clone(),x=i.clone();for(let e=1;e<=p;e++)x=j(x,.18*s(),s()*Math.PI*2),a.droop&&(x.y-=a.droop*.12*e/p),x.normalize(),b=b.clone().addScaledVector(x,o/p),m.push(b);for(let e=0;e<=p;e++)g.push(_*(1-.8*e/p)+.008);(c||_>.12)&&y(m,g,v[1]);let S=a.conifer?0:c?a.sub:Math.max(2,Math.round(a.sub*.6)),w=e=>{let t=e*p,n=Math.min(p-1,Math.floor(t));return m[n].clone().lerp(m[n+1],t-n)};for(let e=0;e<S;e++){let t=.3+.7*((e+s()*.6)/S),n=w(t),r=j(w(Math.min(1,t+.05)).sub(w(Math.max(0,t-.05))).normalize(),.6+s()*.5,s()*Math.PI*2).lerp(A,a.up*.3).normalize();a.droop&&(r.y-=a.droop*.5),r.normalize();let i=0;for(;i<12&&h(n.clone().addScaledVector(r,i+.2));)i+=.2;i=Math.max(.5,Math.min(o*.7,i*(.75+s()*.25)));let l=n.clone().addScaledVector(r,i);c&&_>.04&&y([n,n.clone().lerp(l,.5).add(k(0,a.droop?-.2:.05,0)),l],[_*.45,_*.28,.012],v[2]),B.push({s0:n,e:l,d:r,L:i})}(a.conifer||S===0)&&B.push({s0:t,e:m[m.length-1],d:i,L:o})}let V=c?a.cards:Math.max(3,Math.round(a.cards*.6)),H=a.card*(c?1.15:2);for(let e of B)for(let t=0;t<V;t++){let n=a.conifer?.15+.85*((t+s())/V):.25+.75*((t+s())/V)**.7,r=e.s0.clone().lerp(e.e,n).add(k((s()-.5)*.5,(s()-.5)*.4,(s()-.5)*.5)),i=k(r.x,0,r.z).normalize(),o=e.d.clone().multiplyScalar(.6).add(i.multiplyScalar(.5)).add(k(0,a.droop?-.7:.35,0));o=j(o.normalize(),.5*s(),s()*Math.PI*2);let c=.88+s()*.24,l=[c*(.96+s()*.08),c,c*(.92+s()*.1)];S(r,o,H*(.75+s()*.5),l)}let U=c?a.conifer?60:Math.round(d*d*4.5):a.conifer?26:Math.round(d*d*2.2);for(let e=0;e<U;e++){let e=a.conifer?u+(l-u)*s()**1.3*.97:u+p*(.15+.8*s()),t=s()*Math.PI*2,n=m(e)*(.72+s()*.25),r=k(Math.cos(t)*n,e,Math.sin(t)*n),i=j(k(Math.cos(t),a.conifer?-.1:.6,Math.sin(t)).normalize(),.4*s(),s()*Math.PI*2),o=.9+s()*.2;S(r,i,H*(.8+s()*.5),[o,o,o*.97])}let W=e=>{let t=new o;return t.setAttribute(`position`,new b(e.p,3)),t.setAttribute(`normal`,new b(e.n,3)),t.setAttribute(`uv`,new b(e.uv,2)),t.setAttribute(`color`,new b(e.c,3)),t.setIndex(e.i),t.computeBoundingSphere(),t};return{bark:W(g),leaves:W(_),H:l,R:d,crownY:f}}var N=class{constructor(e=null){this.p=[],this.n=[],this.c=[],this.uv=[],this.o=e}tri(e,t,n,r=[1,1,1],i){let a=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],o=[n[0]-e[0],n[1]-e[1],n[2]-e[2]],s=[a[1]*o[2]-a[2]*o[1],a[2]*o[0]-a[0]*o[2],a[0]*o[1]-a[1]*o[0]];if(this.o){let r=[(e[0]+t[0]+n[0])/3-this.o[0],(e[1]+t[1]+n[1])/3-this.o[1],(e[2]+t[2]+n[2])/3-this.o[2]];s[0]*r[0]+s[1]*r[1]+s[2]*r[2]<0&&([t,n]=[n,t],s=s.map(e=>-e),i&&(i=[i[0],i[2],i[1]]))}let c=Math.hypot(...s)||1;s=s.map(e=>e/c);for(let[a,o]of[e,t,n].entries())this.p.push(...o),this.n.push(...s),this.c.push(...r),this.uv.push(...i?i[a]:[0,0])}at(e,t){let n=this.o;this.o=e,t(),this.o=n}quad(e,t,n,r,i,a){this.tri(e,t,n,i,a&&[a[0],a[1],a[2]]),this.tri(e,n,r,i,a&&[a[0],a[2],a[3]])}loft(e,t,n=!0){let r=e.flat(),i=this.o;this.o=[0,1,2].map(e=>r.reduce((t,n)=>t+n[e],0)/r.length);for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1],a=r.length;for(let e=0;e<a;e++){let n=(e+1)%a;this.quad(r[e],r[n],i[n],i[e],t)}}if(n){let n=e[0],r=e[e.length-1];for(let e=1;e<n.length-1;e++)this.tri(n[0],n[e+1],n[e],t);for(let e=1;e<r.length-1;e++)this.tri(r[0],r[e],r[e+1],t)}this.o=i}box(e,t,n,r=1){let i=this.o;this.o=e;let[a,o,s]=e,[c,l,u]=t.map(e=>e/2),d=(e,t,n)=>[a+e*c*(t>0?r:1),o+t*l,s+n*u*(t>0?r:1)],f=[d(-1,-1,-1),d(1,-1,-1),d(1,1,-1),d(-1,1,-1),d(-1,-1,1),d(1,-1,1),d(1,1,1),d(-1,1,1)];for(let[e,t,r,i]of[[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[3,7,6,2],[0,1,5,4]])this.quad(f[e],f[t],f[r],f[i],n);this.o=i}cyl(e,t,n,r,i,a=`y`,o=t){let s=this.o;this.o=e;let c=(t,r,i)=>{let o=Math.cos(t)*i,s=Math.sin(t)*i,c=r*n/2;return a===`y`?[e[0]+o,e[1]+c,e[2]+s]:a===`x`?[e[0]+c,e[1]+o,e[2]+s]:[e[0]+o,e[1]+s,e[2]+c]};for(let e=0;e<r;e++){let n=e/r*Math.PI*2,s=(e+1)/r*Math.PI*2,l=[c(n,-1,t),c(s,-1,t),c(s,1,o),c(n,1,o)];a===`y`?this.quad(l[0],l[3],l[2],l[1],i):this.quad(l[0],l[1],l[2],l[3],i);let u=c(0,-1,0),d=c(0,1,0);a===`y`?(this.tri(u,l[0],l[1],i),this.tri(d,l[2],l[3],i)):(this.tri(u,l[1],l[0],i),this.tri(d,l[3],l[2],i))}this.o=s}geometry(){let e=new o;return e.setAttribute(`position`,new b(this.p,3)),e.setAttribute(`normal`,new b(this.n,3)),e.setAttribute(`color`,new b(this.c,3)),e.setAttribute(`uv`,new b(this.uv,2)),e.computeBoundingSphere(),e}},P=e=>{let t=new l().setStyle(e,p);return[t.r,t.g,t.b]};function F(){let e=new N,t=new N;for(let t=0;t<4;t++)e.box([0,.45,-.18+t*.12],[1.9,.04,.09],[1,1,1]);for(let t=0;t<2;t++)e.box([0,.62+t*.13,.27],[1.9,.09,.03],[1,1,1]);for(let e of[-.8,.8])t.box([e,.22,0],[.06,.44,.5],[1,1,1]),t.box([e,.6,.27],[.05,.36,.04],[1,1,1]);return{wood:e.geometry(),metal:t.geometry()}}function I(){let e=new N;return e.cyl([0,.42,0],.22,.8,10,[1,1,1],`y`,.25),e.cyl([0,.84,0],.26,.05,10,P(`#3A3C40`),`y`),{metal:e.geometry()}}function L(e=9,t=1){let n=new N,r=new N;n.cyl([0,e/2,0],.11,e,8,[1,1,1],`y`,.06),n.cyl([0,.4,0],.17,.8,8,[1,1,1],`y`,.13);for(let i of t===2?[-1,1]:[1])n.box([i*.8,e-.15,0],[1.6,.07,.07],[1,1,1]),n.box([i*1.55,e-.25,0],[.62,.12,.26],[1,1,1],.85),r.o=[i*1.55,e,0],r.quad([i*1.27,e-.315,-.11],[i*1.83,e-.315,-.11],[i*1.83,e-.315,.11],[i*1.27,e-.315,.11],[1,1,1]);return{metal:n.geometry(),head:r.geometry()}}function R(e,n,r,i=2,a=!1,o=[1,1,1]){let s=new N,c=[[e.u0,e.v1],[e.u1,e.v1],[e.u1,e.v0],[e.u0,e.v0]];for(let e=0;e<i;e++){let t=e/i*Math.PI,a=Math.cos(t)*n/2,l=Math.sin(t)*n/2;s.quad([-a,0,-l],[a,0,l],[a,r,l],[-a,r,-l],o,c)}a&&s.quad([-n/2,r*.7,n/2],[n/2,r*.7,n/2],[n/2,r*.7,-n/2],[-n/2,r*.7,-n/2],o,c);let l=s.geometry(),u=l.attributes.normal;for(let e=0;e<u.count;e++){let n=l.attributes.position.getX(e),i=l.attributes.position.getY(e),a=l.attributes.position.getZ(e),o=new t(n,Math.max(.3,i/r)+.4,a).normalize();u.setXYZ(e,o.x,o.y,o.z)}return l}function z(e,n=.7,r=26,i=1){let a=new N,o=i*9301+49297,s=()=>(o=(o*9301+49297)%233280,o/233280),c=[[e.u0,e.v1],[e.u1,e.v1],[e.u1,e.v0],[e.u0,e.v0]];for(let e=0;e<r;e++){let e=s()*Math.PI*2,t=Math.acos(1-s()*1.3),r=n*(.35+s()*.5),i=[Math.cos(e)*Math.sin(t)*r,n*.75+Math.cos(t)*r*.8,Math.sin(e)*Math.sin(t)*r],o=n*(.7+s()*.5),l=s()*Math.PI,u=Math.cos(l)*o/2,d=Math.sin(l)*o/2,f=.55+.45*Math.min(1,Math.hypot(i[0],i[1]-n*.75,i[2])/n);a.quad([i[0]-u,i[1]-o/2,i[2]-d],[i[0]+u,i[1]-o/2,i[2]+d],[i[0]+u,i[1]+o/2,i[2]+d],[i[0]-u,i[1]+o/2,i[2]-d],[f,f,f],c)}let l=a.geometry(),u=l.attributes.position,d=l.attributes.normal;for(let e=0;e<u.count;e++){let r=new t(u.getX(e),u.getY(e)-n*.6,u.getZ(e)).normalize();d.setXYZ(e,r.x,r.y,r.z)}return l}var B={sedan:{L:4.75,W:1.82,clr:.17,wr:.33,tw:.22,wb:2.78,shift:-.05,roofK:.8,nose:.2,tail:.14,top:[[-.5,.74],[-.485,.94],[-.43,1],[-.31,1.03],[-.17,1.39],[-.08,1.45],[.06,1.45],[.12,1.41],[.27,1.01],[.4,.95],[.48,.84],[.5,.7]],belt:[[-.5,.74],[-.485,.94],[-.31,.99],[0,.98],[.27,.96],[.4,.93],[.48,.83],[.5,.7]],ws:[.12,.27],rw:[-.31,-.17],side:[-.3,.27],bp:[-.035]},compact:{L:4.38,W:1.72,clr:.16,wr:.31,tw:.2,wb:2.6,shift:-.04,roofK:.79,nose:.2,tail:.15,top:[[-.5,.76],[-.485,.93],[-.43,.98],[-.33,1.01],[-.19,1.4],[-.1,1.46],[.05,1.46],[.11,1.42],[.27,1],[.4,.94],[.48,.83],[.5,.7]],belt:[[-.5,.76],[-.485,.93],[-.33,.97],[0,.97],[.27,.95],[.4,.92],[.48,.82],[.5,.7]],ws:[.11,.27],rw:[-.33,-.19],side:[-.32,.27],bp:[-.05]},hatch:{L:4.12,W:1.76,clr:.16,wr:.31,tw:.2,wb:2.6,shift:-.06,roofK:.8,nose:.2,tail:.18,top:[[-.5,.82],[-.495,1.02],[-.48,1.36],[-.43,1.47],[.04,1.48],[.11,1.43],[.27,1],[.41,.94],[.48,.83],[.5,.7]],belt:[[-.5,.82],[-.495,1],[-.45,1],[0,.98],[.27,.96],[.41,.92],[.48,.82],[.5,.7]],ws:[.11,.27],rw:[-.495,-.44],side:[-.43,.27],bp:[-.05,-.33]},cross:{L:4.5,W:1.85,clr:.2,wr:.36,tw:.23,wb:2.68,shift:-.04,roofK:.82,nose:.18,tail:.16,top:[[-.5,.92],[-.495,1.12],[-.48,1.52],[-.42,1.64],[.07,1.65],[.14,1.58],[.29,1.12],[.42,1.05],[.48,.95],[.5,.8]],belt:[[-.5,.92],[-.495,1.1],[-.44,1.12],[0,1.1],[.29,1.07],[.42,1.03],[.48,.93],[.5,.8]],ws:[.14,.29],rw:[-.495,-.43],side:[-.42,.29],bp:[-.04,-.3]},suv:{L:4.92,W:1.96,clr:.24,wr:.39,tw:.26,wb:2.85,shift:-.02,roofK:.86,nose:.12,tail:.1,top:[[-.5,1],[-.497,1.3],[-.488,1.74],[-.45,1.86],[.13,1.86],[.19,1.8],[.3,1.24],[.45,1.17],[.49,1.08],[.5,.95]],belt:[[-.5,1],[-.497,1.2],[-.46,1.22],[0,1.21],[.3,1.19],[.45,1.15],[.49,1.06],[.5,.95]],ws:[.19,.3],rw:[-.497,-.455],side:[-.45,.3],bp:[.02,-.25]},van:{L:5.1,W:1.92,clr:.18,wr:.34,tw:.22,wb:3.2,shift:-.12,roofK:.9,nose:.14,tail:.08,top:[[-.5,1],[-.498,1.5],[-.49,1.92],[-.46,1.98],[.3,1.98],[.36,1.9],[.44,1.26],[.48,1.12],[.5,.95]],belt:[[-.5,1],[-.498,1.15],[-.47,1.16],[0,1.15],[.36,1.14],[.44,1.12],[.48,1.08],[.5,.95]],ws:[.36,.44],rw:[-.498,-.475],side:[-.47,.36],bp:[.16,-.06,-.27]}};Object.keys(B);var V=e=>{let t=new l().setStyle(e,p);return[t.r,t.g,t.b]},H=[1,1,1],U=V(`#141518`),W=V(`#1B1C1E`),ee=V(`#26272A`),te=V(`#A9AEB3`),ne=V(`#3A3D41`),re=V(`#0E0F11`),G=V(`#E6E6DF`);V(`#8C9196`);function K(e){let t=e.length,n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=[],a=[];for(let e=0;e<t-1;e++)i.push(n[e+1]-n[e]),a.push((r[e+1]-r[e])/i[e]);let o=Array(t).fill(0);o[0]=a[0],o[t-1]=a[t-2];for(let e=1;e<t-1;e++)if(a[e-1]*a[e]<=0)o[e]=0;else{let t=2*i[e]+i[e-1],n=i[e]+2*i[e-1];o[e]=(t+n)/(t/a[e-1]+n/a[e])}return e=>{if(e<=n[0])return r[0];if(e>=n[t-1])return r[t-1];let a=0;for(;a<t-2&&e>n[a+1];)a++;let s=(e-n[a])/i[a],c=s*s,l=c*s;return(2*l-3*c+1)*r[a]+(l-2*c+s)*i[a]*o[a]+(-2*l+3*c)*r[a+1]+(l-c)*i[a]*o[a+1]}}var q=class{constructor(){this.p=[],this.c=[],this.i=[]}v(e,t){return this.p.push(e[0],e[1],e[2]),this.c.push(t[0],t[1],t[2]),this.p.length/3-1}t(e,t,n){this.i.push(e,t,n)}q(e,t,n,r){this.i.push(e,t,n,e,n,r)}geometry(e=!0){let t=new o;return t.setAttribute(`position`,new b(this.p,3)),t.setAttribute(`color`,new b(this.c,3)),t.setIndex(this.i),e||(t=t.toNonIndexed()),t.computeVertexNormals(),t.setAttribute(`uv`,new b(new Float32Array(t.attributes.position.count*2),2)),t.computeBoundingSphere(),t}};function J(e,t=`hi`){let n=B[e]||B.sedan,r=t!==`lo`,{L:i,W:a}=n,s=a/2,c=K(n.top),l=K(n.belt),u=[n.wb/2+n.shift,-n.wb/2+n.shift],d=n.wr+.06,f=[],p=r?34:12;for(let e=0;e<=p;e++){let t=e/p;f.push(-.5+.5*(1-Math.cos(Math.PI*t)))}if(r)for(let e of u)for(let t of[-.9,-.6,-.3,0,.3,.6,.9])f.push((e+t*d)/i);f.sort((e,t)=>e-t);let m=f.filter((e,t)=>t===0||e-f[t-1]>.004),h=e=>{let t=1;return e>.36&&(t-=n.nose*((e-.36)/.14)**2),e<-.38&&(t-=n.tail*((-.38-e)/.12)**2),s*t},g=e=>{let t=e*i,r=n.clr+.04+Math.max(0,Math.abs(e)-.4)*1.4;for(let e of u){let i=t-e;Math.abs(i)<d&&(r=Math.max(r,n.wr+Math.sqrt(d*d-i*i)*.92))}return r},_=e=>{let t=h(e),i=g(e),a=Math.max(l(e),c(e)),o=l(e),s=Math.max(0,a-o),u=Math.min(t*n.roofK,t-.04),d=.03*Math.min(1,s/.3)+.012,f=i+(o-i)*.5,p=[[t*.86,i-.02,`trim`],[t*.975,i+.05,`trim`],[t*.99,i+.075,`paint`],[t,f,`paint`],[t*.985,o-.06,`paint`],[t*.955,o,`paint`],[t*.935,o+Math.min(.012,s*.1),`win`],[u+(t*.935-u)*.08,o+s*.84,`paint`],[u*.9,a-s*.015,`roof`],[u*.5,a+d*.75,`roof`],[0,a+d,`end`]];return r?p:[0,1,3,5,6,7,8,10].map(e=>p[e])},v=(e,t)=>e>=t[0]&&e<=t[1],y=e=>(n.bp||[]).some(t=>Math.abs(e-t)<.016),b=(e,t,r)=>{let i=(e+t)/2;return r===`win`?v(i,n.side)&&!y(i)&&Math.abs(i-n.side[0])>.012&&Math.abs(i-n.side[1])>.012:r===`roof`?v(i,[n.ws[0]+.012,n.ws[1]-.004])||v(i,[n.rw[0]+.004,n.rw[1]-.012]):!1},x=new q,S=new q,C=m.map(e=>({u:e,x:e*i,pts:_(e)})),T=C[0].pts.length,E=C.map(e=>{let t=[],n=[];for(let r=0;r<T;r++){let[i,a,o]=e.pts[r],s=o===`trim`?U:H;t.push(x.v([e.x,a,i],s)),n.push(r===T-1?t[r]:x.v([e.x,a,-i],s))}return{R:t,Lf:n}});for(let e=0;e<C.length-1;e++){let t=E[e],n=E[e+1],r=C[e].u,i=C[e+1].u;for(let a=0;a<T-1;a++){let o=C[e].pts[a][2];if(b(r,i,o))for(let t of[1,-1]){let n=(e,n)=>{let[r,i]=C[e].pts[n];return[C[e].x,i,r*t]},r=S.v(n(e,a),H),i=S.v(n(e+1,a),H),o=S.v(n(e+1,a+1),H),s=S.v(n(e,a+1),H);t>0?S.q(r,i,o,s):S.q(r,s,o,i)}else x.q(t.R[a],n.R[a],n.R[a+1],t.R[a+1]),x.q(t.Lf[a],t.Lf[a+1],n.Lf[a+1],n.Lf[a])}x.q(t.R[0],t.Lf[0],n.Lf[0],n.R[0])}for(let[e,t]of[[0,-1],[C.length-1,1]]){let n=C[e],r=E[e],i=(n.pts[0][1]+n.pts[T-1][1])/2,a=x.v([n.x+t*.015,i,0],H),o=[...r.R,...r.Lf.slice(0,T-1).reverse()];for(let e=0;e<o.length;e++){let n=o[e],r=o[(e+1)%o.length];t>0?x.t(a,r,n):x.t(a,n,r)}}let D=new q,O=new q,k=new q,A=new q,j=i/2,M=-i/2,N=l(.49),P=l(-.49),F=(e,t,n,r,i,a,o,s=!1)=>{let c=e.v([t,n,i],o),l=e.v([t,n,a],o),u=e.v([t,r,a],o),d=e.v([t,r,i],o);s?e.q(c,l,u,d):e.q(c,d,u,l)};for(let e of[1,-1]){let t=e*s*.42,r=e*s*.86,i=N-.17,a=N-.06,o=j-.06-n.nose*.25,c=j+.004,l=k.v([c,i,t],H),u=k.v([o,i,r],H),d=k.v([o,a,r],H),f=k.v([c,a+.01,t],H);e>0?k.q(l,f,d,u):k.q(l,u,d,f);let p=e*s*.36,m=e*s*.9,h=P-.2,g=P-.06,_=M+.05+n.tail*.25,v=M-.004,y=A.v([v,h,p],H),b=A.v([_,h,m],H),x=A.v([_,g,m],H),S=A.v([v,g,p],H);e>0?A.q(y,b,x,S):A.q(y,S,x,b)}F(O,j+.006,n.clr+.22,N-.2,-s*.36,s*.36,re),F(O,j+.01,n.clr+.16,n.clr+.27,-.26,.26,G),F(O,M-.01,P-.42,P-.31,-.26,.26,G,!0),F(O,j+.008,n.clr+.05,n.clr+.13,-s*.6,s*.6,U);let I=n.ws[1]-.02,L=l(I)+.12,R=h(I)*.96;for(let e of[1,-1]){let t=I*i,n=e*R,r=e*(R+.17),a=[[t-.06,L-.06,n],[t+.06,L-.06,n],[t+.06,L+.06,n],[t-.06,L+.06,n],[t-.08,L-.05,r],[t+.02,L-.05,r],[t+.02,L+.06,r],[t-.08,L+.06,r]].map(e=>O.v(e,H));for(let t of[[0,1,5,4],[3,7,6,2],[4,5,6,7],[0,4,7,3],[1,2,6,5]])e>0?O.q(a[t[0]],a[t[1]],a[t[2]],a[t[3]]):O.q(a[t[0]],a[t[3]],a[t[2]],a[t[1]])}let z=r?14:8,V=r?[[.62,-.5],[.9,-.5],[1,-.32],[1,.32],[.9,.5],[.62,.5]]:[[.62,-.5],[1,-.4],[1,.4],[.62,.5]];for(let e of u)for(let t of[1,-1]){let i=t*(s-n.tw/2-.035),a=n.wr,o=[];for(let t=0;t<=z;t++){let r=t/z*Math.PI*2,s=Math.cos(r),c=Math.sin(r);o.push(V.map(([t,r],o)=>D.v([e+s*t*n.wr,a+c*t*n.wr,i+r*n.tw],o===0||o===V.length-1?ee:W)))}for(let e=0;e<z;e++)for(let t=0;t<V.length-1;t++){let n=o[e][t],r=o[e+1][t],i=o[e+1][t+1],a=o[e][t+1];D.q(n,r,i,a)}let c=i+t*(n.tw/2-.012),l=c+t*.02,u=r?20:10;for(let i=0;i<u;i++){let o=i/u*Math.PI*2,s=(i+1)/u*Math.PI*2,d=(r?i%4<2:i%2==0)?te:ne,f=n.wr*.6,p=O.v([e+Math.cos(o)*f,a+Math.sin(o)*f,c],d),m=O.v([e+Math.cos(s)*f,a+Math.sin(s)*f,c],d),h=O.v([e,a,l],d);t>0?O.t(h,p,m):O.t(h,m,p)}}for(let e of u)for(let t of[1,-1]){let i=s*.62*t,a=r?10:5,o=O.v([e,n.wr,i],U);for(let r=0;r<a;r++){let s=r/a*Math.PI,c=Math.PI*((r+1)/a),l=O.v([e+Math.cos(s)*d,n.wr+Math.sin(s)*d,i],U),u=O.v([e+Math.cos(c)*d,n.wr+Math.sin(c)*d,i],U);t>0?O.t(o,l,u):O.t(o,u,l)}}return{body:x.geometry(!0),glass:S.geometry(!0),parts:((e,t)=>{let n=e.geometry(!0),r=t.geometry(!1),i=n.toNonIndexed(),a=new o;for(let e of[`position`,`normal`,`color`,`uv`]){let t=i.attributes[e].array,n=r.attributes[e].array,o=new Float32Array(t.length+n.length);o.set(t),o.set(n,t.length),a.setAttribute(e,new w(o,i.attributes[e].itemSize))}return a.computeBoundingSphere(),a})(D,O),lightsF:k.geometry(!1),lightsR:A.geometry(!1),L:i,W:a,wr:n.wr}}var Y=[`sedan`,`sedan`,`compact`,`compact`,`cross`,`cross`,`suv`,`hatch`,`sedan`,`van`],X=75;function ie(){let e=new Uint8Array(8192);for(let t=0;t<32;t++)for(let n=0;n<64;n++){let r=Math.abs((n+.5)/64*2-1),i=Math.abs((t+.5)/32*2-1),a=Math.max(0,r-.7)/.3,o=Math.max(0,i-.45)/.55,s=Math.min(1,Math.hypot(a,o)),c=(1-s*s*(3-2*s))*(.75+.25*(1-Math.max(r,i))),l=(t*64+n)*4;e[l]=e[l+1]=e[l+2]=Math.round(255*c),e[l+3]=255}let t=new x(e,64,32,S);return t.needsUpdate=!0,t.magFilter=r,t.minFilter=r,t}async function ae(n,r,o,{leafMat:c}={}){let u=r.props||{},f=r.cells||{},p=new i,h=new _,g=new t,v=new t(1,1,1),y=new t(0,1,0),b=new l,x={paint:n.mats.lit({color:`#ffffff`,vertexColors:!0,rough:.28,metal:.35,sun:1,hemi:1,envI:1.1,name:`x.carPaint`}),glass:n.mats.lit({color:`#0D1215`,rough:.06,metal:.85,sun:.8,hemi:.5,envI:1.6,name:`x.carGlass`}),parts:n.mats.lit({vertexColors:!0,rough:.6,metal:.3,envI:.6,name:`x.carParts`}),lightF:n.mats.emissive({color:`#FFF1D8`,intensity:7,day:.75,name:`x.headlight`}),lightR:n.mats.emissive({color:`#FF2B1C`,intensity:5,day:.45,name:`x.taillight`}),metal:n.mats.lit({color:`#3F4348`,rough:.45,metal:.6,envI:1,name:`x.metal`}),wood:n.mats.lit({color:`#9A7550`,rough:.7,envI:.3,name:`x.wood`}),lampHead:n.mats.emissive({color:`#FFD9A6`,intensity:7,day:.3,name:`x.lampHead`})},S=0,C=(e,t,n=1)=>(g.set(e[0],e[2],-e[1]),h.setFromAxisAngle(y,t),v.set(n,n,n),p.compose(g,h,v)),w=(e,t,n,r,i,a,s=!0)=>{if(!n.length)return null;let c=new m(e,t,n.length);return n.forEach((e,t)=>{c.setMatrixAt(t,r(e,t)),i&&c.setColorAt(t,i(e,t))}),c.name=a,c.castShadow=s,c.receiveShadow=!0,c.computeBoundingSphere(),o.add(c),c},T=u.car||[],E=[],D=ie(),O=n.mats.fade(new s({color:0,alphaMap:D,transparent:!0,opacity:.62,depthWrite:!1,name:`x.carShadow`}));O.polygonOffset=!0,O.polygonOffsetFactor=-2,O.polygonOffsetUnits=-4;let k=(e,t,n,r,i)=>{let a=new m(e,t,n);return a.name=r,a.castShadow=i,a.receiveShadow=!0,a.count=0,a.frustumCulled=!0,o.add(a),a};for(let t of[...new Set(Y)]){let n=T.filter(e=>Y[(e[7]|0)%Y.length]===t);if(!n.length)continue;let r=n.length,i={hi:J(t,`hi`),lo:J(t,`lo`)},a=n.map(e=>C(e,e[3]).clone()),s=n.map(e=>new l(e[4],e[5],e[6])),c=n.map(e=>e[8]===1),u=n.map(e=>[e[0],e[2],-e[1]]),d={};for(let e of[`hi`,`lo`]){let n=i[e];d[e]={body:k(n.body,x.paint,r,`x:car-${t}-${e}-body`,!0),glass:k(n.glass,x.glass,r,`x:car-${t}-${e}-glass`,!1),parts:k(n.parts,x.parts,r,`x:car-${t}-${e}-parts`,e===`hi`)}}let f=c.filter(Boolean).length,p=f?{f:k(i.hi.lightsF,x.lightF,f,`x:car-${t}-lightsF`,!1),r:k(i.hi.lightsR,x.lightR,f,`x:car-${t}-lightsR`,!1)}:null,h=new e(i.hi.L+.5,i.hi.W+.45).rotateX(-Math.PI/2).translate(0,.03,0),g=new m(h,O,r);if(g.name=`x:car-${t}-shadow`,g.castShadow=!1,g.receiveShadow=!1,a.forEach((e,t)=>g.setMatrixAt(t,e)),g.instanceMatrix.needsUpdate=!0,g.computeBoundingSphere(),o.add(g),p){let e=0;a.forEach((t,n)=>{c[n]&&(p.f.setMatrixAt(e,t),p.r.setMatrixAt(e,t),e++)});for(let t of[p.f,p.r])t.count=e,t.instanceMatrix.needsUpdate=!0,t.computeBoundingSphere()}for(let e of[`hi`,`lo`])d[e].body.setColorAt(0,b.setRGB(1,1,1));E.push({kind:t,mats:a,cols:s,pos:u,M:d,tris:{hi:oe(i.hi),lo:oe(i.lo)}}),S+=r}let A={hi:0,lo:0,tris:0};function j(e){A.hi=A.lo=A.tris=0;let t=(n.lite?X*.6:X)**2;for(let n of E){let r={hi:0,lo:0};for(let i=0;i<n.mats.length;i++){let a=n.pos[i],o=(a[0]-e.x)**2+(a[1]-e.y)**2+(a[2]-e.z)**2<t?`hi`:`lo`,s=r[o]++,c=n.M[o];c.body.setMatrixAt(s,n.mats[i]),c.glass.setMatrixAt(s,n.mats[i]),c.parts.setMatrixAt(s,n.mats[i]),c.body.setColorAt(s,n.cols[i])}for(let e of[`hi`,`lo`])for(let t of Object.values(n.M[e]))t.count=r[e],t.visible=r[e]>0,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0),t.computeBoundingSphere();A.hi+=r.hi,A.lo+=r.lo,A.tris+=r.hi*n.tris.hi+r.lo*n.tris.lo}}let M=new t(1e9,0,0);E.length&&(j(n.stage.camera.position),M.copy(n.stage.camera.position));let N=F();w(N.wood,x.wood,u.bench||[],e=>C(e,e[3]),null,`x:bench-wood`),w(N.metal,x.metal,u.bench||[],e=>C(e,e[3]),null,`x:bench-metal`),w(I().metal,x.metal,u.bin||[],e=>C(e,0),null,`x:bin`);let P=L(9.5,1);if(w(P.metal,x.metal,u.lamp||[],e=>C(e,e[3]),null,`x:lamp-metal`),w(P.head,x.lampHead,u.lamp||[],e=>C(e,e[3]),null,`x:lamp-head`,!1),S+=(u.bench||[]).length+(u.bin||[]).length+(u.lamp||[]).length,c){if(f.shrub){let e=[z(f.shrub,.8,30,1),z(f.elmDark||f.shrub,.8,30,2)];for(let t=0;t<2;t++){let n=(u.shrub||[]).filter(e=>(e[4]|0)%2===t);w(e[t],c,n,e=>C(e,e[0]*3.1,e[3]/.8*1.25),e=>b.setScalar(.85+e[4]%4*.06),`x:shrub-${t}`),S+=n.length}}let e=[`flowerRed`,`flowerPink`,`flowerYellow`,`flowerWhite`].map(e=>f[e]).filter(Boolean),t=[],n=1,r=()=>(n=n*16807%2147483647,n/2147483647);for(let n of u.bed||[]){let[i,a,o,s]=n,c=Math.round(s*s*Math.PI*9),l=e[Math.floor(r()*e.length)],u=e[Math.floor(r()*e.length)];for(let e=0;e<c;e++){let e=r()*Math.PI*2,n=Math.sqrt(r())*(s-.15),c=R(n>s*.62?l:u,.42+r()*.2,.32+r()*.18,2,!1);c.rotateY(r()*Math.PI).translate(i+Math.cos(e)*n,o+.02+(1-n/s)*.12,-(a+Math.sin(e)*n)),t.push(c)}}if(f.grass)for(let e of u.lawn||[]){let n=[0,1,2,3].map(t=>[e[t*2],e[t*2+1]]),i=e[8],a=Math.abs((n[2][0]-n[0][0])*(n[3][1]-n[1][1])-(n[3][0]-n[1][0])*(n[2][1]-n[0][1]))/2,o=Math.min(4e3,Math.round(a*3));for(let e=0;e<o;e++){let e=r(),a=r(),o=(n[0][0]*(1-e)+n[1][0]*e)*(1-a)+(n[3][0]*(1-e)+n[2][0]*e)*a,s=(n[0][1]*(1-e)+n[1][1]*e)*(1-a)+(n[3][1]*(1-e)+n[2][1]*e)*a,c=.75+r()*.35,l=R(f.grass,.32+r()*.2,.22+r()*.16,2,!1,[c,c,c*.95]);l.rotateY(r()*Math.PI).translate(o,i-.01,-s),t.push(l)}}if(t.length){let{mergeGeometries:e}=await d(async()=>{let{mergeGeometries:e}=await import(`./BufferGeometryUtils-SihnJDJ8.js`).then(e=>e.t);return{mergeGeometries:e}},__vite__mapDeps([0,1]),import.meta.url),n=e(t,!1);for(let e of t)e.dispose();if(n){let e=new a(n,c);e.name=`x:flowers-grass`,e.receiveShadow=!0,e.castShadow=!1,o.add(e)}}}return{count:S,cars:A,frame(e){E.length&&e&&e.distanceToSquared(M)>64&&(M.copy(e),j(e))},dispose(){D.dispose()}}}function oe(e){let t=0;for(let n of[`body`,`glass`,`parts`])t+=(e[n].index?e[n].index.count:e[n].attributes.position.count)/3;return t}var se=`
attribute vec3 tangent3;
varying vec3 vW;
varying vec3 vN;
varying vec3 vT;
varying vec2 vUv;
void main() {
	vUv = uv;
	vN = normal; vT = tangent3;
	vec4 w = modelMatrix * vec4( position, 1.0 );
	vW = w.xyz;
	gl_Position = projectionMatrix * viewMatrix * w;
}`,ce=`
uniform vec3 uEnvZen;
uniform vec3 uEnvHor;
uniform vec3 uEnvGnd;
vec3 xSky( vec3 R ) {
	return R.y >= 0.0 ? mix( uEnvHor, uEnvZen, smoothstep( 0.0, 0.7, R.y ) ) : mix( uEnvHor, uEnvGnd, smoothstep( 0.0, 0.25, - R.y ) );
}
float xHash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
`,le=`
uniform float uDemoGlow;
uniform float uDemoNight;
uniform float uXDay;
varying vec3 vW;
varying vec3 vN;
varying vec3 vT;
varying vec2 vUv;
${ce}
FADE_HEAD
// [S2 X2] Витрины 1 этажа — разные магазины по типам арендаторов этажа 1 (data/tenants.json, без брендов): одежда, техника, кафе,
// косметика, оптика, спорт и обувь, дом, ювелирный, холл. У каждого — свои стены, свет, задняя стена (вешалки, экраны, меню,
// полки) и «стойки» посреди комнаты (вешала с одеждой, столы, прилавки) — силуэтом на плоскости в глубине 2,2 м.
// Тип: 0 одежда, 1 техника, 2 кафе, 3 косметика, 4 оптика, 5 спорт, 6 дом, 7 ювелирный, 8 холл
int xType( float k ) {
	return k < 0.3 ? 0 : k < 0.42 ? 1 : k < 0.5 ? 2 : k < 0.63 ? 3 : k < 0.69 ? 4 : k < 0.81 ? 5 : k < 0.87 ? 6 : k < 0.93 ? 7 : 8;
}
// стены, пол, свет (цвет), сила света
void xRoom( int s, out vec3 wall, out vec3 floorC, out vec3 lc, out float li ) {
	wall = vec3( 0.86, 0.84, 0.8 ); floorC = vec3( 0.78, 0.76, 0.72 ); lc = vec3( 1.0, 0.94, 0.84 ); li = 1.0;
	if ( s == 1 ) { wall = vec3( 0.16, 0.17, 0.19 ); floorC = vec3( 0.32, 0.33, 0.35 ); lc = vec3( 0.9, 0.95, 1.0 ); li = 1.1; }
	else if ( s == 2 ) { wall = vec3( 0.42, 0.28, 0.17 ); floorC = vec3( 0.36, 0.25, 0.16 ); lc = vec3( 1.0, 0.78, 0.52 ); li = 0.85; }
	else if ( s == 3 ) { wall = vec3( 0.95, 0.93, 0.93 ); floorC = vec3( 0.9, 0.88, 0.87 ); lc = vec3( 1.0, 0.97, 0.95 ); li = 1.25; }
	else if ( s == 4 ) { wall = vec3( 0.92, 0.93, 0.94 ); floorC = vec3( 0.7, 0.72, 0.74 ); lc = vec3( 0.95, 0.98, 1.0 ); li = 1.2; }
	else if ( s == 5 ) { wall = vec3( 0.3, 0.31, 0.33 ); floorC = vec3( 0.5, 0.5, 0.5 ); lc = vec3( 1.0, 0.98, 0.95 ); li = 1.15; }
	else if ( s == 6 ) { wall = vec3( 0.8, 0.74, 0.66 ); floorC = vec3( 0.55, 0.42, 0.3 ); lc = vec3( 1.0, 0.88, 0.7 ); li = 0.9; }
	else if ( s == 7 ) { wall = vec3( 0.12, 0.1, 0.09 ); floorC = vec3( 0.2, 0.18, 0.16 ); lc = vec3( 1.0, 0.92, 0.78 ); li = 0.8; }
	else if ( s == 8 ) { wall = vec3( 0.72, 0.7, 0.66 ); floorC = vec3( 0.66, 0.64, 0.6 ); lc = vec3( 1.0, 0.95, 0.88 ); li = 1.0; }
}
// цвет «товара» по хэшу: палитра типа
vec3 xGoods( int s, float h ) {
	if ( s == 0 ) return h < 0.2 ? vec3( 0.08, 0.09, 0.12 ) : h < 0.35 ? vec3( 0.85, 0.83, 0.78 ) : h < 0.5 ? vec3( 0.55, 0.16, 0.14 ) : h < 0.65 ? vec3( 0.16, 0.24, 0.42 ) : h < 0.8 ? vec3( 0.62, 0.55, 0.42 ) : vec3( 0.3, 0.42, 0.3 );
	if ( s == 3 ) return h < 0.3 ? vec3( 0.95, 0.9, 0.92 ) : h < 0.55 ? vec3( 0.85, 0.5, 0.6 ) : h < 0.75 ? vec3( 0.8, 0.66, 0.4 ) : vec3( 0.55, 0.75, 0.85 );
	if ( s == 5 ) return h < 0.3 ? vec3( 0.92, 0.92, 0.92 ) : h < 0.5 ? vec3( 0.08, 0.08, 0.09 ) : h < 0.65 ? vec3( 0.8, 0.2, 0.15 ) : h < 0.8 ? vec3( 0.15, 0.35, 0.75 ) : vec3( 0.9, 0.75, 0.2 );
	if ( s == 6 ) return h < 0.4 ? vec3( 0.88, 0.85, 0.78 ) : h < 0.7 ? vec3( 0.5, 0.58, 0.62 ) : vec3( 0.72, 0.55, 0.45 );
	return mix( vec3( 0.3 ), vec3( 0.9 ), h );
}
float xBox( vec2 p, vec2 a, vec2 b ) { return step( a.x, p.x ) * step( p.x, b.x ) * step( a.y, p.y ) * step( p.y, b.y ); }
// задняя стена (x — вдоль, м; y — высота); → цвет (emis > 1 — светится)
vec3 xBack( int s, vec2 q, float cx, vec3 wall, vec3 lc ) {
	vec3 c = wall;
	if ( s == 0 || s == 5 ) {
		// одежда / спорт: штанги с вешалками на 1,7 и 0,9 м, вещи разной длины; у спорта — полки с обувью
		for ( int r = 0; r < 2; r++ ) {
			float rail = r == 0 ? 1.75 : 0.95, len = r == 0 ? 0.75 : 0.62;
			float ix = floor( q.x / 0.11 ), fx = fract( q.x / 0.11 ), h = xHash( vec2( ix, cx + float( r ) * 7.0 ) );
			float L = len * ( 0.6 + 0.4 * h );
			float on = step( 0.06, fx ) * step( fx, 0.98 ) * step( rail - L, q.y ) * step( q.y, rail - 0.04 ) * step( 0.25, fract( q.x / 2.2 ) );
			c = mix( c, xGoods( s, xHash( vec2( ix * 1.7, cx ) ) ) * ( 0.75 + 0.3 * fx ), on );
			c = mix( c, vec3( 0.55 ), step( abs( q.y - rail ), 0.015 ) );
		}
		if ( s == 5 ) {
			float row = floor( ( q.y - 2.0 ) / 0.32 ), fy = fract( ( q.y - 2.0 ) / 0.32 );
			float ix = floor( q.x / 0.36 ), fx = fract( q.x / 0.36 );
			float shoe = step( 2.0, q.y ) * step( q.y, 3.3 ) * step( 0.15, fx ) * step( fx, 0.85 ) * step( 0.1, fy ) * step( fy, 0.4 );
			c = mix( c, xGoods( 5, xHash( vec2( ix, row + cx ) ) ), shoe );
			c = mix( c, vec3( 0.75 ), step( 2.0, q.y ) * step( q.y, 3.3 ) * step( fy, 0.06 ) );
		}
	} else if ( s == 1 ) {
		// техника: стена экранов (светятся, разные «картинки» — градиенты) и полоса подсветки
		vec2 g = vec2( floor( ( q.x - 0.2 ) / 1.3 ), floor( ( q.y - 1.2 ) / 0.85 ) );
		vec2 f = vec2( fract( ( q.x - 0.2 ) / 1.3 ), fract( ( q.y - 1.2 ) / 0.85 ) );
		float scr = step( 1.2, q.y ) * step( q.y, 2.9 ) * step( 0.05, f.x ) * step( f.x, 0.95 ) * step( 0.08, f.y ) * step( f.y, 0.92 );
		float h = xHash( g + cx );
		vec3 img = mix( vec3( 0.15, 0.35, 0.8 ), vec3( 0.95, 0.55, 0.25 ), h ) * ( 0.6 + 0.6 * f.y ) + vec3( 0.2 ) * step( 0.5, fract( f.x * 3.0 + h ) );
		c = mix( c, img * 2.2, scr );
		c = mix( c, lc * 2.5, step( 3.4, q.y ) * step( q.y, 3.5 ) );
	} else if ( s == 2 ) {
		// кафе: стойка 1,1 м (дерево), выше — доски меню (тёмные со светлыми строками) и полки с посудой
		c = mix( c, vec3( 0.32, 0.2, 0.12 ), step( q.y, 1.1 ) );
		c = mix( c, vec3( 0.75, 0.72, 0.68 ), step( 1.08, q.y ) * step( q.y, 1.14 ) );
		float mb = xBox( vec2( fract( q.x / 2.1 ) * 2.1, q.y ), vec2( 0.25, 2.0 ), vec2( 1.85, 3.0 ) );
		float lines = step( 0.55, fract( q.y / 0.11 ) ) * step( 0.2, fract( q.x / 0.9 + 0.1 ) );
		c = mix( c, mix( vec3( 0.05 ), vec3( 0.85, 0.82, 0.7 ) * 1.4, lines * 0.8 ), mb );
		float cups = step( 1.45, q.y ) * step( q.y, 1.62 ) * step( 0.5, fract( q.x / 0.14 ) );
		c = mix( c, vec3( 0.92 ), cups * ( 1.0 - mb ) );
	} else if ( s == 3 || s == 4 ) {
		// косметика / оптика: белые полки с подсветкой, мелкие предметы (флаконы, оправы), лайтбоксы-панели (без надписей)
		float rowH = s == 3 ? 0.36 : 0.28;
		float row = floor( ( q.y - 0.5 ) / rowH ), fy = fract( ( q.y - 0.5 ) / rowH );
		float zone = step( 0.5, q.y ) * step( q.y, 2.4 );
		float iw = s == 3 ? 0.07 + 0.05 * xHash( vec2( row, cx ) ) : 0.16;
		float ix = floor( q.x / iw ), fx = fract( q.x / iw ), h = xHash( vec2( ix, row + cx * 5.0 ) );
		float item = s == 3 ? step( 0.2, fx ) * step( fx, 0.8 ) * step( 0.08, fy ) * step( fy, 0.3 + 0.5 * h )
		                    : step( 0.12, fx ) * step( fx, 0.88 ) * step( 0.35, fy ) * step( fy, 0.55 ) * ( 1.0 - step( 0.42, abs( fx - 0.5 ) * 2.0 ) * step( 0.4, fy ) );
		c = mix( c, ( s == 3 ? xGoods( 3, h ) : vec3( 0.1, 0.1, 0.12 ) + 0.5 * h * vec3( 0.6, 0.4, 0.2 ) ), item * zone );
		c = mix( c, lc * 1.6, zone * step( fy, 0.04 ) );
		float lb = xBox( vec2( fract( q.x / 3.2 ) * 3.2, q.y ), vec2( 0.4, 2.6 ), vec2( 2.8, 3.6 ) );
		c = mix( c, mix( vec3( 0.92, 0.8, 0.82 ), vec3( 0.85, 0.9, 0.95 ), float( s == 4 ) ) * 1.9, lb );
	} else if ( s == 6 ) {
		// дом: стеллаж с текстилем и посудой, картины
		float row = floor( ( q.y - 0.3 ) / 0.42 ), fy = fract( ( q.y - 0.3 ) / 0.42 );
		float ix = floor( q.x / 0.3 ), fx = fract( q.x / 0.3 ), h = xHash( vec2( ix, row + cx ) );
		float item = step( 0.3, q.y ) * step( q.y, 2.0 ) * step( 0.06, fx ) * step( fx, 0.94 ) * step( 0.06, fy ) * step( fy, 0.4 + 0.5 * h );
		c = mix( c, xGoods( 6, h ) * 0.9, item );
		float pic = xBox( vec2( fract( q.x / 2.6 ) * 2.6, q.y ), vec2( 0.6, 2.4 ), vec2( 1.9, 3.3 ) );
		c = mix( c, mix( vec3( 0.35, 0.45, 0.4 ), vec3( 0.75, 0.6, 0.45 ), fract( q.y * 1.7 + q.x * 0.3 ) ), pic );
	} else if ( s == 7 ) {
		// ювелирный: тёмная стена, освещённые ниши с искрами
		float n = xBox( vec2( fract( q.x / 1.6 ) * 1.6, q.y ), vec2( 0.3, 1.3 ), vec2( 1.3, 2.1 ) );
		float sp = step( 0.985, xHash( floor( q * 40.0 ) + cx ) );
		c = mix( c, vec3( 0.55, 0.48, 0.4 ) * 1.4 + sp * vec3( 3.0, 2.8, 2.4 ), n );
	} else {
		// холл: камень, проход вглубь, указатели (без текста)
		c = mix( c, vec3( 0.3, 0.3, 0.32 ), xBox( q, vec2( 1.8, 0.0 ), vec2( 4.6, 3.0 ) ) );
		c = mix( c, lc * 2.0, xBox( q, vec2( 2.2, 3.3 ), vec2( 4.2, 3.5 ) ) );
	}
	return c;
}
// «стойки» на плоскости в глубине 2,2 м (x — вдоль, y — высота) → альфа (0/1), цвет в col
float xMid( int s, vec2 q, float cx, out vec3 col ) {
	col = vec3( 0.0 );
	float a = 0.0;
	float bx = fract( q.x / 6.4 ) * 6.4;
	if ( s == 0 ) {
		// вешало 1,4 м с одеждой + стол со стопками
		float rail = xBox( vec2( bx, q.y ), vec2( 0.6, 1.38 ), vec2( 2.6, 1.42 ) ) + xBox( vec2( bx, q.y ), vec2( 0.6, 0.0 ), vec2( 0.64, 1.42 ) ) + xBox( vec2( bx, q.y ), vec2( 2.56, 0.0 ), vec2( 2.6, 1.42 ) );
		float ix = floor( bx / 0.09 ), h = xHash( vec2( ix, cx + 2.0 ) );
		float cl = xBox( vec2( bx, q.y ), vec2( 0.7, 1.38 - 0.55 - 0.3 * h ), vec2( 2.5, 1.38 ) ) * step( 0.1, fract( bx / 0.09 ) );
		float tb = xBox( vec2( bx, q.y ), vec2( 3.6, 0.0 ), vec2( 5.4, 0.72 ) );
		float st = xBox( vec2( bx, q.y ), vec2( 3.7, 0.72 ), vec2( 5.3, 0.86 ) ) * step( 0.15, fract( bx / 0.4 ) );
		col = mix( vec3( 0.5 ), xGoods( 0, xHash( vec2( ix * 2.3, cx ) ) ), cl );
		col = mix( col, vec3( 0.75, 0.73, 0.7 ), tb );
		col = mix( col, xGoods( 0, xHash( vec2( floor( bx / 0.4 ), cx + 9.0 ) ) ), st );
		a = clamp( rail + cl + tb + st, 0.0, 1.0 );
	} else if ( s == 1 ) {
		// столы-острова 0,9 м с устройствами (светятся)
		float tb = xBox( vec2( bx, q.y ), vec2( 0.8, 0.0 ), vec2( 2.6, 0.9 ) ) + xBox( vec2( bx, q.y ), vec2( 3.8, 0.0 ), vec2( 5.6, 0.9 ) );
		float dev = xBox( vec2( bx, q.y ), vec2( 0.8, 0.9 ), vec2( 5.6, 1.02 ) ) * step( 0.55, fract( bx / 0.3 ) ) * ( 1.0 - xBox( vec2( bx, q.y ), vec2( 2.6, 0.0 ), vec2( 3.8, 2.0 ) ) );
		col = mix( vec3( 0.85, 0.86, 0.88 ), vec3( 0.4, 0.7, 1.0 ) * 1.8, dev );
		a = clamp( tb + dev, 0.0, 1.0 );
	} else if ( s == 2 ) {
		// кафе: круглые столики и стулья, подвесные светильники
		float t1 = xBox( vec2( bx, q.y ), vec2( 0.9, 0.7 ), vec2( 1.9, 0.76 ) ) + xBox( vec2( bx, q.y ), vec2( 1.36, 0.0 ), vec2( 1.44, 0.7 ) );
		float t2 = xBox( vec2( bx, q.y ), vec2( 3.9, 0.7 ), vec2( 4.9, 0.76 ) ) + xBox( vec2( bx, q.y ), vec2( 4.36, 0.0 ), vec2( 4.44, 0.7 ) );
		float ch = xBox( vec2( bx, q.y ), vec2( 0.4, 0.0 ), vec2( 0.75, 0.46 ) ) + xBox( vec2( bx, q.y ), vec2( 0.4, 0.46 ), vec2( 0.46, 0.95 ) )
		         + xBox( vec2( bx, q.y ), vec2( 2.05, 0.0 ), vec2( 2.4, 0.46 ) ) + xBox( vec2( bx, q.y ), vec2( 2.34, 0.46 ), vec2( 2.4, 0.95 ) );
		float lx = fract( ( bx - 1.4 ) / 3.0 + 0.5 ) * 3.0 - 1.5;
		float lamp = step( length( vec2( lx, q.y - 2.55 ) ), 0.18 ) * step( 2.4, q.y );
		float cord = xBox( vec2( lx, q.y ), vec2( -0.01, 2.7 ), vec2( 0.01, 5.3 ) );
		col = mix( vec3( 0.2, 0.13, 0.08 ), vec3( 1.0, 0.8, 0.5 ) * 3.0, lamp );
		a = clamp( t1 + t2 + ch + lamp + cord, 0.0, 1.0 );
	} else if ( s == 3 || s == 5 ) {
		// гондолы 1,3 м с товаром
		float g = xBox( vec2( bx, q.y ), vec2( 1.0, 0.0 ), vec2( 5.4, 1.3 ) );
		float ix = floor( bx / 0.12 ), row = floor( q.y / 0.32 );
		float it = g * step( 0.15, q.y ) * step( 0.2, fract( bx / 0.12 ) ) * step( 0.25, fract( q.y / 0.32 ) );
		col = mix( vec3( 0.9 ), xGoods( s, xHash( vec2( ix, row + cx ) ) ), it );
		a = g;
	} else if ( s == 4 || s == 7 ) {
		// прилавки 1,0 м со стеклом сверху (подсветка, искры у ювелирного)
		float cnt = xBox( vec2( bx, q.y ), vec2( 0.6, 0.0 ), vec2( 2.8, 1.0 ) ) + xBox( vec2( bx, q.y ), vec2( 3.6, 0.0 ), vec2( 5.8, 1.0 ) );
		float top = cnt * step( 0.72, q.y );
		float sp = step( 0.97, xHash( floor( q * 50.0 ) + cx ) ) * top;
		col = mix( s == 7 ? vec3( 0.08, 0.07, 0.06 ) : vec3( 0.92 ), vec3( 0.95, 0.92, 0.85 ) * 1.6, top ) + sp * vec3( 3.0 );
		a = clamp( cnt, 0.0, 1.0 );
	} else if ( s == 6 ) {
		// дом: диван и торшер
		float sofa = xBox( vec2( bx, q.y ), vec2( 1.0, 0.0 ), vec2( 3.2, 0.45 ) ) + xBox( vec2( bx, q.y ), vec2( 1.0, 0.45 ), vec2( 3.2, 0.85 ) ) * step( 0.0, 1.0 );
		float lampP = xBox( vec2( bx, q.y ), vec2( 4.4, 0.0 ), vec2( 4.44, 1.5 ) );
		float shade = xBox( vec2( bx, q.y ), vec2( 4.2, 1.5 ), vec2( 4.64, 1.8 ) );
		col = mix( vec3( 0.55, 0.5, 0.44 ), vec3( 1.0, 0.85, 0.6 ) * 2.0, shade );
		a = clamp( sofa + lampP + shade, 0.0, 1.0 );
	}
	return a;
}
void main() {
	FADE_TEST
	vec3 V = normalize( vW - cameraPosition );
	vec3 N = normalize( vN ), T = normalize( vT );
	vec3 r = vec3( dot( V, T ), V.y, dot( V, N ) );
	const float W = 6.4, D = 7.5;
	float H = 5.3;
	vec2 p = vUv;
	float cx = floor( p.x / W ), x0 = cx * W;
	int s = xType( xHash( vec2( cx, 3.1 ) ) );
	vec3 wall, floorC, lc; float li;
	xRoom( s, wall, floorC, lc, li );
	float rz = min( r.z, -1e-3 );
	float tx = r.x > 0.0 ? ( x0 + W - p.x ) / max( r.x, 1e-4 ) : ( x0 - p.x ) / min( r.x, -1e-4 );
	float ty = r.y > 0.0 ? ( H - p.y ) / max( r.y, 1e-4 ) : ( 0.0 - p.y ) / min( r.y, -1e-4 );
	float tz = - D / rz;
	float t = min( min( tx, ty ), tz );
	vec3 h = vec3( p, 0.0 ) + r * t;              // точка в комнате (x — вдоль, y — вверх, z — вглубь, < 0)
	vec3 c;
	if ( t == tz ) {
		c = xBack( s, vec2( h.x - x0, h.y ), cx, wall, lc );
	} else if ( t == ty ) {
		if ( r.y > 0.0 ) { // потолок: панели или точечные светильники (ювелирный, кафе, дом)
			vec2 q = fract( vec2( h.x, h.z ) / vec2( 1.6, 1.8 ) );
			float panel = ( s == 2 || s == 6 || s == 7 ) ? step( length( q - 0.5 ), 0.12 ) : step( 0.25, q.x ) * step( q.x, 0.75 ) * step( 0.3, q.y ) * step( q.y, 0.7 );
			c = mix( wall * 0.9 + 0.1, lc * 4.0, panel );
		} else { // пол: плитка или дерево, отражение света
			vec2 q = fract( vec2( h.x, h.z ) / vec2( s == 2 || s == 6 ? 0.2 : 1.2, 1.2 ) );
			float seam = step( 0.97, max( q.x, q.y ) );
			c = mix( floorC, floorC * 0.7, seam ) * ( 0.88 + 0.12 * xHash( floor( vec2( h.x, h.z ) / 1.2 ) ) );
			c += lc * 0.2 * li * ( 1.0 - smoothstep( 0.0, 6.0, - h.z ) );
		}
	} else {
		// боковые стены: полки по типу (у одежды — вешалки)
		vec2 q = vec2( - h.z, h.y );
		c = xBack( s, q + vec2( 11.0, 0.0 ), cx + 17.0, wall * 0.92, lc );
	}
	// стойки посреди комнаты: плоскость на глубине 2,2 м
	float tm = - 2.2 / rz;
	if ( tm < t && s != 8 ) {
		vec3 hm = vec3( p, 0.0 ) + r * tm;
		if ( hm.x > x0 && hm.x < x0 + W && hm.y > 0.0 && hm.y < H ) {
			vec3 mc;
			float ma = xMid( s, vec2( hm.x - x0, hm.y ), cx, mc );
			c = mix( c, mc, ma );
		}
	}
	// свет комнаты: ярче у потолка, к глубине чуть темнее; днём комната темнее улицы (видно отражение), вечером светится
	float light = ( 0.75 + 0.35 * smoothstep( 0.0, H, h.y ) ) * ( 1.0 - 0.25 * smoothstep( 0.0, D, - h.z ) ) * li;
	vec3 interior = c * lc * light * mix( uXDay, 1.0, uDemoGlow );      // [S2 X2] вечером 1,35 → 1,0: магазины видны, а не «белый свет»
	// стекло: тон и Френель с отражением неба
	float cosv = clamp( - dot( V, N ), 0.0, 1.0 );
	float F = 0.05 + 0.95 * pow( 1.0 - cosv, 5.0 );
	vec3 R = reflect( V, N );
#ifdef X_ENV
	// [S2 X3a] настоящее окружение: небо с облаками, кроны, дома напротив, площадь; панели стекла чуть «гуляют» (каждая 1,6 м —
	// свой наклон до 0,25°), отражение ломается на стыках, как у реального витража
	vec2 xPan = floor( vec2( dot( vW.xz, vec2( vT.x, vT.z ) ) / 1.6, 0.0 ) );
	vec3 xJit = ( vec3( xHash( xPan + 1.7 ), 0.0, xHash( xPan + 9.1 ) ) - 0.5 ) * 0.009;
	vec3 refl = xEnv( normalize( reflect( V, normalize( N + xJit ) ) ), 0.04 );
#else
	vec3 refl = xSky( R ) * mix( 1.0, 0.25, uDemoNight );
	// [S2 X2] в стекле — не только небо: у горизонта отражаются кроны и дома напротив (тёмная неровная полоса по азимуту),
	// ниже — площадь; витрина перестаёт быть «плоской голубой»
	float az = atan( R.x, R.z );
	float skyline = 0.04 + 0.16 * ( 0.5 + 0.5 * sin( az * 9.0 + 1.3 ) * sin( az * 23.0 ) ) + 0.06 * sin( az * 57.0 );
	float band = smoothstep( -0.02, 0.02, R.y ) * ( 1.0 - smoothstep( skyline - 0.02, skyline + 0.02, R.y ) );
	vec3 trees = mix( vec3( 0.07, 0.1, 0.06 ), vec3( 0.18, 0.17, 0.15 ), step( 0.6, fract( az * 3.7 ) ) ) * mix( 1.0, 0.15, uDemoNight );
	refl = mix( refl, trees, band * 0.85 );
	refl = mix( refl, vec3( 0.45, 0.44, 0.42 ) * mix( 1.0, 0.2, uDemoNight ), smoothstep( 0.0, -0.08, R.y ) );
#endif
	vec3 col = interior * vec3( 0.8, 0.87, 0.85 ) * ( 1.0 - F ) + refl * ( F * 0.9 + 0.06 );
	gl_FragColor = vec4( col, 1.0 );
}`,ue=`
uniform vec3 uXSun;
uniform float uXSunI;
uniform float uDemoNight;
varying vec3 vW;
varying vec3 vN;
varying vec3 vT;
varying vec2 vUv;
${ce}
FADE_HEAD
void main() {
	FADE_TEST
	float s = vUv.x / 0.05;
	float w = fwidth( s );
	float aa = 1.0 - smoothstep( 0.12, 0.4, w );
	if ( aa < 0.01 ) discard;
	float f = fract( s );
	// трапеция: левая грань, гребень, правая грань, впадина
	float tilt = f < 0.22 ? - 0.75 : f < 0.5 ? 0.0 : f < 0.72 ? 0.75 : 0.0;
	float valley = step( 0.72, f );
	vec3 N = normalize( vN ), T = normalize( vT );
	vec3 n2 = normalize( N + T * tilt );
	vec3 V = normalize( vW - cameraPosition );
	vec3 R = reflect( V, n2 );
	float cosv = clamp( - dot( V, n2 ), 0.0, 1.0 );
	float F = 0.08 + 0.92 * pow( 1.0 - cosv, 5.0 );
#ifdef X_ENV
	vec3 env = xEnv( R, 0.35 );
#else
	vec3 env = xSky( R ) * mix( 1.0, 0.2, uDemoNight );
#endif
	float sunT = clamp( dot( n2, uXSun ), 0.0, 1.0 ) - clamp( dot( N, uXSun ), 0.0, 1.0 );
	// добавка: блик неба на гранях + солнечный «перелив» по граням; множитель фона: тень впадин
	vec3 add = ( env * F * 0.35 + vec3( 1.0, 0.95, 0.88 ) * max( sunT, 0.0 ) * 0.05 * uXSunI ) * aa;
	float mul = mix( 1.0, ( 1.0 - 0.28 * valley ) * ( 1.0 + 0.6 * min( sunT, 0.0 ) ), aa );
	gl_FragColor = vec4( add, mul );
}`;function de(e){let t=[],n=[],r=[],i=[],a=[];for(let o of e){let[e,s,c,l,u,d]=o,f=c-e,p=l-s,m=Math.hypot(f,p)||1,h=[f/m,0,-p/m],g=[p/m,0,f/m],_=t.length/3;for(let[a,f,p,_]of[[e,s,u,0],[c,l,u,m],[c,l,d,m],[e,s,d,0]])t.push(a,p,-f),n.push(...g),r.push(...h),i.push(_+(o[7]||0),p-u+(o[8]||0));a.push(_,_+1,_+2,_,_+2,_+3)}let s=new o;return s.setAttribute(`position`,new b(t,3)),s.setAttribute(`normal`,new b(n,3)),s.setAttribute(`tangent3`,new b(r,3)),s.setAttribute(`uv`,new b(i,2)),s.setIndex(a),s.computeBoundingSphere(),s}function fe(e,n,r){let i=n.props||{},o=e.uniforms,s=e.mats.fadeU,c=e.env||null,l=c?T(c):null,u=t=>t.replace(`FADE_HEAD`,e.mats.FADE_HEAD+(l?l.head:``)).replace(`FADE_TEST`,e.mats.FADE_TEST),d=e=>(l&&(e.defines={...e.defines||{},...l.defines},e.uniforms.uXEnv={value:c},e.uniforms.uXEnvI={value:1}),e),f={vitrines:0,ribs:0},p={value:new t(0,1,0)},m={value:1};if((i.vitrine||[]).length){let e=i.vitrine.map(e=>{let[t,n,r,i]=e,a=[(t+r)/2,(n+i)/2],o=[i-n,-(r-t)];return o[0]*a[0]+o[1]*a[1]>=0?e:[r,i,t,n,e[4],e[5]]}),t=new h({name:`x.vitrine`,vertexShader:se,fragmentShader:u(le),fog:!1,side:2,uniforms:{uDemoFade:s,uDemoGlow:o.uDemoGlow,uDemoNight:o.uDemoNight,uEnvZen:o.uEnvZen,uEnvHor:o.uEnvHor,uEnvGnd:o.uEnvGnd,uXDay:{value:.42}}});d(t);let n=new a(de(e),t);n.name=`x:vitrines`,r.add(n),f.vitrines=e.length}if((i.facade||[]).length){let e=i.facade.map(e=>{let[t,n,r,i]=e,a=[(t+r)/2,(n+i)/2],o=[i-n,-(r-t)];return o[0]*a[0]+o[1]*a[1]>=0?e:[r,i,t,n,e[4],e[5],e[6]]}),t=new h({name:`x.ribs`,vertexShader:se,fragmentShader:u(ue),fog:!1,transparent:!0,depthWrite:!1,side:2,blending:5,blendEquation:100,blendSrc:201,blendDst:204,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,uniforms:{uDemoFade:s,uDemoNight:o.uDemoNight,uEnvZen:o.uEnvZen,uEnvHor:o.uEnvHor,uEnvGnd:o.uEnvGnd,uXSun:p,uXSunI:m}});d(t);let n=new a(de(e),t);n.name=`x:facade-ribs`,n.renderOrder=1,r.add(n),f.ribs=e.length}let g=new t;return{...f,frame(){let t=e.look&&e.look.sun;t&&(g.subVectors(t.position,t.target.position).normalize(),p.value.copy(g),m.value=t.intensity/3.75)}}}var Z={pave:{file:`pave`,m:4.8,rot:Math.atan2(.7337,.6794),slab:1,mix:0},asph:{file:`asph`,m:4,rot:.3,slab:0,mix:1},conc:{file:`conc`,m:2.4,rot:0,slab:0,mix:1},grass:{file:`grass`,m:1.6,rot:0,slab:0,mix:1}},pe={"site.granite":[`pave`,1,1],"site.graniteStrip":[`pave`,1,1],"site.paving":[`pave`,1,1],"site.pavingDark":[`pave`,.9,1],"site.asphalt":[`asph`,1,1],"site.asphaltPark":[`asph`,1,1],"site.asphaltLight":[`asph`,.9,1],"site.marking":[`asph`,.45,.8],"site.sidewalk":[`conc`,1,1],"site.curb":[`conc`,1,.8],"site.grass":[`grass`,1,1],"site.grassDark":[`grass`,.9,1],"site.ground":[`conc`,.6,.6]};Object.values(Z).flatMap(e=>[`exterior/street/ground-${e.file}-a.jpg`,`exterior/street/ground-${e.file}-n.jpg`]);var me=`
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
`,he=`
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
		// тон каждой плиты 1,2 × 0,6 м — по хэшу её места (без повтора текстуры)
		vec2 id = floor( uvm / vec2( 1.2, 0.6 ) );
		alb *= 0.93 + 0.14 * xgH( id + 0.5 );
	}
	nr = vec3( ( t.r * 2.0 - 1.0 ), - ( t.g * 2.0 - 1.0 ), t.b );
}
`,ge=`
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
				w0 = smoothstep( 0.1, 0.18, lum ) * ( 1.0 - paint );
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
`,_e=`
	roughnessFactor = mix( roughnessFactor, clamp( xgR, 0.04, 1.0 ), xgRw );
`,ve=`
	if ( xgRw > 0.0 ) normal = normalize( normal + ( viewMatrix * vec4( xgN, 0.0 ) ).xyz );
`;function ye(e,t,n){Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vXGW;
`).replace(`#include <project_vertex>`,`#include <project_vertex>`+me),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+(n?`#define XG_TWO
`:``)+he).replace(`#include <color_fragment>`,ge+`#include <color_fragment>`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>`+_e).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>`+ve)}async function be(e){let t={};await Promise.all(Object.entries(Z).map(async([n,r])=>{let[i,a]=await Promise.all([e.texture(`exterior/street/ground-${r.file}-a.jpg`,{srgb:!1,repeat:!0,anisotropy:8}),e.texture(`exterior/street/ground-${r.file}-n.jpg`,{srgb:!1,repeat:!0,anisotropy:8})]);t[n]={a:i,n:a}})),e.check();let n={enabled:!0},r={value:e.mats.fadeU.value},i=(e,n=1,r=1,i=0)=>{let a=Z[e];return{[`uXGa${i}`]:{value:t[e].a},[`uXGn${i}`]:{value:t[e].n},[`uXGp${i}`]:{value:new v(a.m,a.rot,n,r)},[`uXGq${i}`]:{value:new y(a.slab,a.mix)}}},a=new Map;function o(e,t,n){let r=e.onBeforeCompile,i=e.customProgramCacheKey;a.set(e,[r,i]),e.onBeforeCompile=(i,a)=>{r&&r.call(e,i,a),ye(i,t,n)};let o=i?i.call(e):``;e.customProgramCacheKey=()=>o+(n?`+xg2`:`+xg`),e.needsUpdate=!0}let s=-1e9,c=0,l=0,u=0;function d(){let t=performance.now();if(t-s<1500)return;s=t;let n=window.__dostyk&&window.__dostyk.root||e.scene.getObjectByName(`ShymkentPlaza`);n&&n.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material||[])){let e=t&&pe[t.name];!e||a.has(t)||!t.isMeshStandardMaterial||t.userData&&!t.userData.lookPatched||(o(t,{uXGOn:r,...i(e[0],e[1],e[2])},!1),c++)}});let d=e.scene.getObjectByName(`demo:gi-site`);d&&d.traverse(e=>{if(!e.isMesh)return;let t=e.material,n=t&&pe[t.userData&&t.userData.giSource];n&&!a.has(t)&&(o(t,{uXGOn:r,...i(n[0],n[1],n[2])},!1),u++)});let f=e.scene.getObjectByName(`demo:exterior`);f&&f.traverse(e=>{if(!e.isMesh)return;let t=e.material;t&&!a.has(t)&&/^dx\.G\./.test(t.name)&&(o(t,{uXGOn:r,...i(`pave`,1,1,0),...i(`asph`,1,1,1)},!0),l++)})}return d(),e.log(`фактура земли: лёгких материалов ${c}, атласа G ${l}, GI ${u}`),{state:n,stats:()=>({light:c,atlas:l,gi:u,on:r.value}),frame(){d(),r.value=n.enabled?e.mats.fadeU.value:0},dispose(){for(let[e,[t,n]]of a)e.onBeforeCompile=t,e.customProgramCacheKey=n,e.needsUpdate=!0;a.clear()}}}var Q=8,xe=`
attribute vec4 aImp;          // порода, масштаб, поворот вокруг y, оттенок (индекс)
uniform vec4 uImpC[ 8 ];      // центр кроны (м, масштаб 1, от основания), радиус
uniform vec3 uImpTint[ 8 ];
varying vec4 vImpA;           // проекции точки на плоскости 4 ячеек: (s, t) × 2
varying vec4 vImpB;
varying vec4 vImpCell;        // ячейки: i0, j0, i1, j1
varying vec2 vImpF;           // веса
varying vec3 vImpTint;
varying float vImpKind;
varying float vImpRot;
#ifdef IMP_SHADOW
varying float vImpR;          // радиус кроны экземпляра, м
varying float vImpDz;         // шаг глубины окна на метр от солнца (ортокамера тени)
#endif
vec3 impDir( float i, float j ) {
	vec2 e = vec2( 2.0 * ( i + 0.5 ) / ${Q.toFixed(1)} - 1.0, 2.0 * ( j + 0.5 ) / ${Q.toFixed(1)} - 1.0 );
	float tx = ( e.x + e.y ) * 0.5, tz = ( e.x - e.y ) * 0.5;
	return normalize( vec3( tx, 1.0 - abs( tx ) - abs( tz ), tz ) );
}
vec2 impProj( vec3 cam, vec3 P, vec3 C, float r, float i, float j ) {
	vec3 d = impDir( i, j );
	vec3 rg = normalize( cross( vec3( 0.0, 1.0, 0.0 ), d ) );
	vec3 up = cross( d, rg );
	vec3 ray = P - cam;
	float den = dot( ray, d );
	float t = abs( den ) > 1e-4 ? dot( C - cam, d ) / den : 1.0;
	vec3 q = ( cam + ray * t - C ) / r;
	return vec2( dot( q, rg ), dot( q, up ) );
}
`,Se=`
	vec3 transformed;
	{
		int k = int( aImp.x + 0.5 );
		vec4 C4 = uImpC[ k ];
		float s = aImp.y, c = cos( aImp.z ), sn = sin( aImp.z );
		// поворот вокруг y (three: Quaternion.setFromAxisAngle(Y, rot)): мир = R · локальное
		mat3 R = mat3( c, 0.0, - sn, 0.0, 1.0, 0.0, sn, 0.0, c );
		vec3 base = vec3( 0.0 );
		#ifdef USE_INSTANCING
			base = instanceMatrix[ 3 ].xyz;
		#endif
		base = ( modelMatrix * vec4( base, 1.0 ) ).xyz;
		#ifdef IMP_SHADOW
			// [S2 X3b доиспр.] карта теней: «камера» — далеко на луче к солнцу (ось z камеры тени), лучи почти параллельны, как у
			// ортокамеры тени; точка самой камеры тени (в 900 м) давала поворот квадрата до 18° к краям участка
			vec3 impEye = base + normalize( vec3( viewMatrix[ 0 ][ 2 ], viewMatrix[ 1 ][ 2 ], viewMatrix[ 2 ][ 2 ] ) ) * 4000.0;
			vImpR = C4.w * s;
			vImpDz = - 0.5 * projectionMatrix[ 2 ][ 2 ];
		#else
			vec3 impEye = cameraPosition;
		#endif
		vec3 camL = ( transpose( R ) * ( impEye - base ) ) / s;
		vec3 dL = camL - C4.xyz;
		vec3 dV = normalize( vec3( dL.x, max( dL.y, 0.0 ), dL.z ) + vec3( 0.0, 1e-4, 0.0 ) );
		vec3 rg = normalize( cross( vec3( 0.0, 1.0, 0.0 ), normalize( dL ) ) );
		vec3 up = cross( normalize( dL ), rg );
		// квадрат шире кроны (× 1,15): точка квадрата, спроецированная на плоскость соседней ячейки (до ≈ 20° от взгляда), не выходит
		// за её квадрат — иначе крону «срезало» прямой (проба shots/s2-X3b-t11-park-n0)
		vec3 Pl = C4.xyz + ( position.x * rg + position.y * up ) * C4.w * 1.15;
		transformed = R * ( Pl * s );
		// ячейки вокруг направления на камеру (полуоктаэдр): e = (d.x + d.z, d.x − d.z) после d /= |d|₁
		vec3 d1 = dV / ( abs( dV.x ) + abs( dV.y ) + abs( dV.z ) );
		vec2 e = vec2( d1.x + d1.z, d1.x - d1.z );
		vec2 g = clamp( ( e * 0.5 + 0.5 ) * ${Q.toFixed(1)} - 0.5, 0.0, ${7 .toFixed(1)} );
		vec2 g0 = floor( g ), g1 = min( g0 + 1.0, ${7 .toFixed(1)} );
		vImpF = g - g0;
		vImpCell = vec4( g0, g1 );
		vImpA = vec4( impProj( camL, Pl, C4.xyz, C4.w, g0.x, g0.y ), impProj( camL, Pl, C4.xyz, C4.w, g1.x, g0.y ) );
		vImpB = vec4( impProj( camL, Pl, C4.xyz, C4.w, g0.x, g1.y ), impProj( camL, Pl, C4.xyz, C4.w, g1.x, g1.y ) );
		vImpKind = aImp.x;
		vImpRot = aImp.z;
		vImpTint = uImpTint[ int( aImp.w + 0.5 ) ];
	}
`,Ce=`
uniform sampler2D uImpColor;
uniform sampler2D uImpData;
uniform vec4 uImpRect[ 8 ];
uniform vec3 uImpGain;
varying vec4 vImpA;
varying vec4 vImpB;
varying vec4 vImpCell;
varying vec2 vImpF;
varying vec3 vImpTint;
varying float vImpKind;
varying float vImpRot;
#ifdef IMP_SHADOW
varying float vImpR;
varying float vImpDz;
#endif
// (s, t) ∈ [−1, 1]² ячейки (i, j) → uv атласа (v вверх в атласе; текстура без переворота — y = 1 − v)
vec2 impUv( vec2 st, float i, float j ) {
	vec4 r = uImpRect[ int( vImpKind + 0.5 ) ];
	vec2 c = ( vec2( i, j ) + clamp( st, - 1.0, 1.0 ) * 0.5 + 0.5 ) / ${Q.toFixed(1)};
	vec2 uv = r.xy + c * ( r.zw - r.xy );
	return vec2( uv.x, 1.0 - uv.y );
}
float impIn( vec2 st ) { return step( abs( st.x ), 1.0 ) * step( abs( st.y ), 1.0 ); }
vec3 impNrm( vec4 t ) {
	vec2 e = t.rg * 2.0 - 1.0;
	vec3 n = vec3( e.x, 1.0 - abs( e.x ) - abs( e.y ), e.y );
	if ( n.y < 0.0 ) n.xz = ( 1.0 - abs( e.yx ) ) * vec2( e.x >= 0.0 ? 1.0 : - 1.0, e.y >= 0.0 ? 1.0 : - 1.0 );
	return normalize( n );
}
`,we=`
	vec4 impCol = vec4( 0.0 );
	vec3 impN = vec3( 0.0 );
	float impAO = 0.0;
	float impDf = 0.0;
	{
		vec4 w = vec4( ( 1.0 - vImpF.x ) * ( 1.0 - vImpF.y ), vImpF.x * ( 1.0 - vImpF.y ), ( 1.0 - vImpF.x ) * vImpF.y, vImpF.x * vImpF.y );
		vec2 st[ 4 ];
		st[ 0 ] = vImpA.xy; st[ 1 ] = vImpA.zw; st[ 2 ] = vImpB.xy; st[ 3 ] = vImpB.zw;
		vec2 ij[ 4 ];
		ij[ 0 ] = vImpCell.xy; ij[ 1 ] = vImpCell.zy; ij[ 2 ] = vImpCell.xw; ij[ 3 ] = vImpCell.zw;
		vec2 uvk[ 4 ];
		vec4 ak = vec4( 0.0 );
		for ( int k = 0; k < 4; k ++ ) {
			uvk[ k ] = impUv( st[ k ], ij[ k ].x, ij[ k ].y );
			float wk = w[ k ] * impIn( st[ k ] );
			if ( wk < 0.001 ) continue;
			vec4 c = texture2D( uImpColor, uvk[ k ] );
			impCol += vec4( c.rgb * c.a, c.a ) * wk;
			ak[ k ] = c.a * wk;
		}
		if ( impCol.a < IMP_CUT ) discard;
		impCol.rgb /= max( impCol.a, 1e-4 );
		#ifdef IMP_DATA
			for ( int k = 0; k < 4; k ++ ) {
				if ( ak[ k ] < 0.001 ) continue;
				vec4 dt = texture2D( uImpData, uvk[ k ] );
				impN += impNrm( dt ) * ak[ k ];
				impAO += clamp( ( dt.a - 0.04 ) / 0.96, 0.0, 1.0 ) * ak[ k ];
			}
			impAO /= max( impCol.a, 1e-4 );
			float c = cos( vImpRot ), sn = sin( vImpRot );
			impN = normalize( mat3( c, 0.0, - sn, 0.0, 1.0, 0.0, sn, 0.0, c ) * ( impN + vec3( 0.0, 1e-4, 0.0 ) ) );
		#endif
		#ifdef IMP_SHADOW
			// глубина передней (к солнцу) поверхности кроны от плоскости центра, в долях радиуса (data.B)
			for ( int k = 0; k < 4; k ++ ) {
				if ( ak[ k ] < 0.001 ) continue;
				impDf += ( texture2D( uImpData, uvk[ k ] ).b * 2.0 - 1.0 ) * ak[ k ];
			}
			impDf /= max( impCol.a, 1e-4 );
		#endif
	}
`,Te=`
${we}
	diffuseColor.rgb *= impCol.rgb * vImpTint * uImpGain;
	diffuseColor.a *= smoothstep( 0.0, 1.0, impCol.a * 1.15 );
`,Ee=`
	normal = normalize( ( viewMatrix * vec4( impN, 0.0 ) ).xyz );
`,De=`
	reflectedLight.indirectDiffuse *= impAO;
	reflectedLight.directDiffuse *= impAO;
	reflectedLight.indirectSpecular *= impAO;
#if NUM_DIR_LIGHTS > 0
	{
		// как у листвы-геометрии (street-build.js LEAF_LIGHT): против солнца крона светится насыщенным цветом листа, теневая сторона —
		// мягче («обёрнутый» свет); без этого импостор против солнца выходил чёрным силуэтом
		vec3 xL = directionalLights[ 0 ].direction;
		float xBack = pow( saturate( dot( - geometryViewDir, xL ) ), 4.0 );
		float xWrap = saturate( dot( geometryNormal, xL ) * 0.5 + 0.5 );
		vec3 xT = diffuseColor.rgb * diffuseColor.rgb * vec3( 2.4, 2.6, 1.6 ) / max( uImpGain * uImpGain, vec3( 0.05 ) );
		reflectedLight.directDiffuse += directionalLights[ 0 ].color * ( xT * xBack * 0.3 + diffuseColor.rgb * xWrap * xWrap * 0.14 ) * mix( 0.5, 1.0, impAO );
	}
#endif
`;async function Oe(n,r,a,{kinds:o}){let[s,l,d]=await Promise.all([n.json(`exterior/trees/impostor.json`),n.texture(`exterior/trees/impostor-color.webp`,{anisotropy:4}),n.texture(`exterior/trees/impostor-data.webp`,{srgb:!1,anisotropy:4})]);n.check();for(let e of[l,d])e.minFilter=c,e.needsUpdate=!0;let f=new Map(s.species.map(e=>[e.kind,e])),p=[],h=[];for(let e=0;e<8;e++){let t=f.get(o[e])||s.species[e]||s.species[0];p.push(new v(t.center[0],t.center[1],t.center[2],t.radius)),h.push(new v(t.rect.u0,t.rect.v0,t.rect.u1,t.rect.v1))}let _=[];for(let e=0;e<8;e++){let n=a[e%a.length];_.push(new t(n[0],n[1],n[2]))}let y=n.param&&parseFloat(n.param(`impGain`))||1,b={uImpGain:{value:new t(.38,.42,.4).multiplyScalar(y)},uImpC:{value:p},uImpTint:{value:_},uImpColor:{value:l},uImpData:{value:d},uImpRect:{value:h}},x=n.mats.lit({color:`#ffffff`,rough:.85,metal:0,sun:1,hemi:1,envI:.25,name:`x.tree.impostor`});x.alphaTest=.5,x.alphaToCoverage=!0,x.side=2,x.defines={...x.defines||{},IMP_DATA:``,IMP_CUT:`0.12`};let S=x.onBeforeCompile;x.onBeforeCompile=(e,t)=>{S(e,t),Object.assign(e.uniforms,b),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+xe).replace(`#include <begin_vertex>`,Se),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+Ce).replace(`#include <map_fragment>`,Te).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
`+Ee).replace(`#include <aomap_fragment>`,`#include <aomap_fragment>
`+De),(!e.vertexShader.includes(`vImpCell = vec4`)||!e.fragmentShader.includes(`impCol.rgb /=`))&&n.log(`шейдер three изменился — импостор не встал`)},x.customProgramCacheKey=()=>`dpdemo-std+imp`,x.needsUpdate=!0;let w=new u({alphaTest:.5});w.defines={IMP_CUT:`0.55`,IMP_SHADOW:``},w.name=`x.tree.impostor.shadow`,w.side=2,w.onBeforeCompile=e=>{Object.assign(e.uniforms,b),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+xe).replace(`#include <begin_vertex>`,Se),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+Ce).replace(`#include <alphatest_fragment>`,we+`
	diffuseColor.a = impCol.a;
	if ( diffuseColor.a < 0.55 ) discard;
	gl_FragDepth = clamp( gl_FragCoord.z + ( max( impDf, 0.0 ) + 0.5 ) * vImpR * vImpDz, 0.0, 1.0 );
`),e.fragmentShader.includes(`gl_FragDepth = clamp`)||n.log(`шейдер three изменился — глубина тени импостора не встала`)},w.customProgramCacheKey=()=>`x-imp-shadow2`;let T=new e(2,2),E=r.trees.length,D=new g(new Float32Array(E*4),4);D.setUsage(C),T.setAttribute(`aImp`,D);let O=new m(T,x,E);O.name=`x:tree-impostors`,O.instanceMatrix.setUsage(C),O.castShadow=!(n.param&&n.param(`impShadow`)===`0`),O.receiveShadow=!0,O.customDepthMaterial=w,O.frustumCulled=!1,O.count=0;let k=new i,A=0;function j(e){let t=0;for(let n of e){let e=r.trees[n];k.makeTranslation(e[0],e[2]-.05,-e[1]),O.setMatrixAt(t,k),D.setXYZW(t,e[3],e[5],e[6],e[7]%8),t++}O.count=t,A=t,O.instanceMatrix.needsUpdate=!0,D.needsUpdate=!0,O.visible=t>0}return{mesh:O,set:j,stats:()=>({shown:A,kinds:s.species.length,atlas:s.size}),dispose(){w.dispose()}}}var ke=300,Ae=90,$=[[1,1,1],[1.06,1.06,.96],[.82,.88,.84],[1.08,1.03,.82],[.86,.93,.95],[.97,.98,.9],[.9,.96,.88],[.78,.84,.8]],je=`
uniform float uXTrans;
uniform float uXSpec;
uniform float uXBump;
// [S2 X2] рельеф листа из яркости атласа (жилки, края листьев, тени между листьями): нормаль кроны + наклон по производным
vec3 xLeafBump( vec3 p, vec3 n, float h ) {
	vec3 dpx = dFdx( p ), dpy = dFdy( p );
	vec3 r1 = cross( dpy, n ), r2 = cross( n, dpx );
	float det = dot( dpx, r1 );
	vec3 g = sign( det ) * ( dFdx( h ) * r1 + dFdy( h ) * r2 );
	float k = uXBump * ( 1.0 - smoothstep( 6.0, 22.0, length( p ) ) );
	return normalize( abs( det ) * n - k * g );
}
`,Me=`
	reflectedLight.directSpecular *= uXSpec;
#if NUM_DIR_LIGHTS > 0
	{
		vec3 xL = directionalLights[ 0 ].direction;
		float xBack = pow( saturate( dot( - geometryViewDir, xL ) ), 4.0 );
		float xWrap = saturate( dot( geometryNormal, xL ) * 0.5 + 0.5 );
		vec3 xT = diffuseColor.rgb * diffuseColor.rgb * vec3( 2.4, 2.6, 1.6 );
		float xDepth = saturate( dot( vColor.rgb, vec3( 0.333 ) ) * 1.3 - 0.2 );
		reflectedLight.directDiffuse += directionalLights[ 0 ].color * ( xT * xBack * 0.32 * xDepth + diffuseColor.rgb * xWrap * xWrap * 0.12 ) * uXTrans;
	}
#endif
`;function Ne(e,t,r=`x.leaf`){let i=e.mats.lit({map:t,color:`#C9CFC0`,vertexColors:!0,rough:.78,metal:0,sun:1,hemi:.9,envI:.35,side:2,name:r});i.alphaTest=.42,i.alphaToCoverage=!0;let a={uXTrans:{value:1},uXSpec:{value:.18},uXBump:{value:.45}},o=i.onBeforeCompile,s=n.normal_fragment_begin.replace(`normal *= faceDirection;`,``)+`
	normal = xLeafBump( - vViewPosition, normal, xLeafH );
`;return i.onBeforeCompile=(e,t)=>{o(e,t),Object.assign(e.uniforms,a),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+je).replace(`#include <color_fragment>`,`	float xLeafH = dot( diffuseColor.rgb, vec3( 0.3, 0.59, 0.11 ) ) * 3.0;
#include <color_fragment>`).replace(`#include <normal_fragment_begin>`,s).replace(`#include <lights_fragment_end>`,Me+`
#include <lights_fragment_end>`)},i.customProgramCacheKey=()=>`dpdemo-std+xleaf2`,i.userData.xU=a,i}function Pe(e,t){let n=window.__dostyk&&window.__dostyk.root||e.scene.getObjectByName(`ShymkentPlaza`),r=new Set;if(!n)return[];let i=new Set(t);return n.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material||[]))t&&i.has(t.name)&&r.add(t)}),[...r]}async function Fe(e){let[n,r,a]=await Promise.all([e.json(`exterior/street/street.json`),e.texture(`exterior/street/foliage.webp`,{anisotropy:8,half:!1}),e.texture(`exterior/street/bark.jpg`,{repeat:!0,anisotropy:4})]);e.check();let s=new f;s.name=`demo:street`;let c=Ne(e,r),u=e.mats.lit({map:a,vertexColors:!0,rough:.92,sun:1,hemi:1,envI:.15,name:`x.bark`}),d=e.lite,p=new Map;n.trees.forEach((e,t)=>{let n=e[3]+`|`+e[4];p.has(n)||p.set(n,{kind:O[e[3]],v:e[4],list:[]}),p.get(n).list.push(t)}),new i;let h=new _,g=new t,v=new t,y=new l,x=0,S=0,C=[],w=null;if(e.param(`imp`)!==`0`)try{w=await Oe(e,n,$,{kinds:O}),s.add(w.mesh)}catch(t){if(t&&t.name===`AbortError`)throw t;e.log(`импосторы не собрались — дальние деревья геометрией:`,t&&t.message),w=null}let T=parseFloat(e.param(`impNear`)),E=w?Number.isFinite(T)&&T>=0?T:Ae:ke,D=()=>{let e=new o;return e.setIndex([]),e.setAttribute(`position`,new b([],3)),e};for(let r of p.values()){let a=M(r.kind,r.v+1,`hi`,n.cells),o=w?{leaves:D(),bark:D()}:M(r.kind,r.v+1,`lo`,n.cells);S++;let l=r.list.length,d=(e,t,n,r)=>{let i=new m(e,t,l);return i.name=n,i.castShadow=r,i.receiveShadow=!0,i.frustumCulled=!0,i.count=0,s.add(i),i};r.mesh={hiLeaf:d(a.leaves,c,`x:tree-${r.kind}${r.v}-hi-leaves`,!0),hiBark:d(a.bark,u,`x:tree-${r.kind}${r.v}-hi-bark`,!0),loLeaf:d(o.leaves,c,`x:tree-${r.kind}${r.v}-lo-leaves`,!0),loBark:d(o.bark,u,`x:tree-${r.kind}${r.v}-lo-bark`,!1)},r.mats=r.list.map(e=>{let r=n.trees[e];g.set(r[0],r[2]-.05,-r[1]),h.setFromAxisAngle(new t(0,1,0),r[6]);let a=r[5];return v.set(a,a*(.94+e*37%11/100),a),new i().compose(g,h,v)}),r.tint=r.list.map(e=>$[n.trees[e][7]%$.length]),r.pos=r.list.map(e=>[n.trees[e][0],n.trees[e][2],-n.trees[e][1]]),r.hiTris=(a.leaves.index.count+a.bark.index.count)/3,r.loTris=(o.leaves.index.count+o.bark.index.count)/3,C.push(r),S%4==0&&(await new Promise(e=>setTimeout(e,0)),e.check())}let k=new t(1e9,0,0),A={hi:0,lo:0,tris:0},j=[];function N(t){A.hi=A.lo=A.tris=0,j.length=0;let n=(d?E*.6:E)**2;for(let e of C){let r=0,i=0,{hiLeaf:a,hiBark:o,loLeaf:s,loBark:c}=e.mesh;for(let l=0;l<e.list.length;l++){let u=e.pos[l],d=(u[0]-t.x)**2+(u[1]-t.y)**2*.3+(u[2]-t.z)**2,f=e.tint[l];y.setRGB(f[0],f[1],f[2]),d<n?(a.setMatrixAt(r,e.mats[l]),o.setMatrixAt(r,e.mats[l]),a.setColorAt(r,y),r++):w?j.push(e.list[l]):(s.setMatrixAt(i,e.mats[l]),c.setMatrixAt(i,e.mats[l]),s.setColorAt(i,y),i++)}for(let[e,t]of[[a,r],[o,r],[s,i],[c,i]])e.count=t,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0),t>0&&e.computeBoundingSphere(),e.visible=t>0;A.hi+=r,A.lo+=i,A.tris+=r*e.hiTris+i*e.loTris}w&&(w.set(j),A.imp=j.length,A.tris+=j.length*2);let r=A.hi*7919;for(let e of j)r=r*31+e|0;r!==P&&(P=r,clearTimeout(F),F=setTimeout(()=>{F=0,s.parent&&e.stage.updateShadows()},350))}let P=0,F=0;for(let e of C)for(let t of[e.mesh.hiLeaf,e.mesh.loLeaf])t.setColorAt(0,y.setRGB(1,1,1));N(e.stage.camera.position),k.copy(e.stage.camera.position);let I=await ae(e,n,s,{leafMat:c});e.check();let L=fe(e,n,s),R=await be(e);e.check(),s.userData.ground=R.state,e.hideLight(Pe(e,n.hideLight||[]));let z=0,B=()=>{let t=e.scene.getObjectByName(`demo:trees`);t&&t.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material||[]))t&&t.visible&&(t.visible=!1,z++)})};for(let e of C)x+=e.list.length*e.loTris;e.log(`деревьев ${n.trees.length}, прототипов ${S} × 2, вблизи ${A.hi}, вдали ${A.lo}, треугольников ${Math.round(A.tris/1e3)} тыс.; предметов ${I.count}`);let V=0;return{root:s,stats:()=>({...A,impNear:E,impostors:w?w.stats():null,ground:R.stats(),props:I.count,cars:I.cars?{...I.cars}:null,bHidden:z,vitrines:L.vitrines,ribs:L.ribs}),update(e){I.update&&I.update(e)},frame(t){let n=t.camera||e.stage.camera.position;n.distanceToSquared(k)>144&&(k.copy(n),N(n)),V++%30==0&&B(),I.frame&&I.frame(n),R.frame(),L.frame()},dispose(){clearTimeout(F),I.dispose&&I.dispose(),R.dispose(),w&&w.dispose()}}}export{Fe as buildStreet};