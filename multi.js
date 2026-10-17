import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {getAuth,signInAnonymously} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {getFirestore,doc,setDoc,getDoc,updateDoc,onSnapshot,collection,increment} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const app=initializeApp({apiKey:"AIzaSyAQAbI8Ipib04YJIevhlrdY8H_TQee6l2Y",authDomain:"instrutor-de-codigo.firebaseapp.com",projectId:"instrutor-de-codigo",storageBucket:"instrutor-de-codigo.firebasestorage.app",messagingSenderId:"659205376818",appId:"1:659205376818:web:a88029ea8c02df049f652b"});
const auth=getAuth(app),db=getFirestore(app),QS=window.QS;
const $=s=>document.querySelector(s),main=$('#main'),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L=k=>String.fromCharCode(97+k),fmt=ms=>{const s=Math.max(0,Math.round(ms/1000));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
let uid,code,room,pl=[],un=[],host=false,i=0,t0=0,hist=[],tm=null,hostT=null,hostCur=-2,revd=-2,lastCur=-2,qs0=0,locked=false,mine=null,fin=false,name='';
const ready=signInAnonymously(auth).then(c=>uid=c.user.uid).catch(e=>console.error(e));
const rd=()=>doc(db,'rooms',code),pd=()=>doc(db,'rooms',code,'players',uid);
const err=m=>{const e=$('#me');if(e)e.textContent=m};
window.mpCfg=()=>{if($('#mk'))return;const b=document.createElement('div');b.className='box';
 b.innerHTML=`<b>👥 Multijogador</b><label>O teu nome: <input id="mn" maxlength="16" value="${E(localStorage.mpname||'')}"></label>
<label><input type="radio" name="mm" value="race" checked> Corrida — cada um ao seu ritmo, com ranking em direto</label>
<label><input type="radio" name="mm" value="live"> Ao vivo — a mesma pergunta para todos, <input type="number" id="mq" value="20" min="5"> s por pergunta, pontos pela rapidez</label>
<p><button class="btn p" id="mk">Criar sala com as definições acima</button></p>
<label>Código da sala: <input id="mc" maxlength="4" style="width:90px;text-transform:uppercase"></label> <button class="btn" id="mj">Entrar na sala</button> <small id="me" style="color:var(--ko)"></small>`;
 main.append(b);$('#mk').onclick=create;$('#mj').onclick=join};
const nm=()=>{name=$('#mn').value.trim();if(name)localStorage.mpname=name;return name};
async function create(){if(!nm())return err('Escreve o teu nome.');
 const sel=new Set([...document.querySelectorAll('.tc:checked')].map(c=>+c.value)),p=QS.filter(q=>q.t.some(t=>sel.has(t)));
 if(!p.length)return err('Escolhe pelo menos um tema.');
 for(let k=p.length-1;k>0;k--){const j=Math.random()*(k+1)|0;[p[k],p[j]]=[p[j],p[k]]}
 const n=Math.min(+$('#qn').value||100,p.length),lim=document.querySelector('[name=tm]:checked').value==='1'?Math.max(1,+$('#qm').value||120)*60000:0;
 await ready;if(!uid)return err('Sem ligação ao Firebase. Verifica o login anónimo.');
 code=Array.from({length:4},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.random()*24|0]).join('');
 try{await setDoc(rd(),{host:uid,mode:document.querySelector('[name=mm]:checked').value,state:'lobby',qids:p.slice(0,n).map(q=>q.id),lim,per:Math.max(5,+$('#mq').value||20),cur:-1,rev:false})}catch(e){return err('Não foi possível criar a sala ('+e.code+').')}
 enter(true)}
async function join(){if(!nm())return err('Escreve o teu nome.');code=$('#mc').value.trim().toUpperCase();await ready;if(!uid)return err('Sem ligação ao Firebase.');
 try{const s=await getDoc(rd());if(!s.exists())return err('Sala não encontrada.');if(s.data().state!=='lobby')return err('Essa sala já começou.')}catch(e){return err('Erro ao entrar ('+e.code+').')}
 enter(false)}
async function enter(h){host=h;window.mpActive=true;i=0;t0=0;hist=[];fin=false;lastCur=-2;hostCur=-2;revd=-2;room=null;pl=[];
 await setDoc(pd(),{name,score:0,ok:0,n:0,ms:0,done:false,ans:null});
 un=[onSnapshot(rd(),d=>{room=d.data();hostCheck();render()}),onSnapshot(collection(db,'rooms',code,'players'),c=>{pl=c.docs.map(x=>({id:x.id,...x.data()}));hostCheck();render()})];
 main.innerHTML='<p>A entrar na sala…</p>'}
function leave(){un.forEach(f=>f());clearInterval(tm);clearTimeout(hostT);window.mpActive=false;window.quizCfg()}
const upd=o=>updateDoc(pd(),o).catch(console.error);
function rank(live){const tot=room.qids.length,s=[...pl].sort((a,b)=>b.score-a.score||a.ms-b.ms);
 return '<table><tr><th>#</th><th>Jogador</th><th>'+(live?'Pontos':'Certas')+'</th><th>'+(live?'Acertos':'Progresso')+'</th>'+(live?'':'<th>Tempo</th>')+'</tr>'+s.map((p,k)=>`<tr${p.id===uid?' style="font-weight:700"':''}><td>${k+1}</td><td>${E(p.name)}</td><td>${p.score}</td><td>${live?p.ok:p.n+'/'+tot+(p.done?' ✔':'')}</td>${live?'':'<td>'+fmt(p.ms)+'</td>'}</tr>`).join('')+'</table>'}
const opts=(q,sel,show)=>q.o.map((o,k)=>`<button class="opt ${show?(k===q.a?'ok':k===sel?'ko':''):sel===k?'s':''}" data-o="${k}"><b>${L(k)})</b> ${E(o)}</button>`).join('');
function review(){const w=hist.map((h,k)=>({h,k})).filter(x=>x.h&&x.h.c!==x.h.q.a);
 return w.length?'<h3>Perguntas erradas</h3>'+w.map(({h,k})=>`<div class="ri"><b>${k+1}.</b> <span class="qt">${E(h.q.q)}</span>`+h.q.o.map((o,j)=>`<div class="opt ${j===h.q.a?'ok':j===h.c?'ko':''}"><b>${L(j)})</b> ${E(o)}</div>`).join('')+(h.q.u?'<span class="bd">resposta não confirmada</span>':h.q.e?`<div class="ex">${h.q.e}</div>`:'')+'</div>').join(''):'<p>Sem erros. 🎉</p>'}
function render(){if(!room||!window.mpActive)return;
 if(room.state==='lobby')return lobby();
 if(room.state==='done')return endScreen(true);
 room.mode==='race'?race():live()}
function lobby(){main.innerHTML=`<h1 class="t">Sala <span style="letter-spacing:.2em">${code}</span></h1><p>Modo: <b>${room.mode==='race'?'Corrida':'Ao vivo ('+room.per+' s por pergunta)'}</b> · ${room.qids.length} perguntas${room.mode==='race'&&room.lim?' · '+Math.round(room.lim/60000)+' min':''}</p>
<p>Diz aos amigos para entrarem com este código.</p><div class="box"><b>Jogadores (${pl.length})</b><br>${pl.map(p=>E(p.name)).join(' · ')}</div>`+
 (host?'<button class="btn p" id="st">Começar</button> ':'<p>À espera do anfitrião…</p>')+'<button class="btn" id="lv">Sair</button>';
 $('#lv').onclick=leave;if(host)$('#st').onclick=()=>updateDoc(rd(),room.mode==='live'?{state:'play',cur:0,rev:false}:{state:'play'})}
function race(){const n=room.qids.length;if(!t0){t0=Date.now();clearInterval(tm);tm=setInterval(tick,1000)}
 if(fin||i>=n)return endScreen(false);const q=QS[room.qids[i]];
 main.innerHTML=`<div class="qbar"><b>Pergunta ${i+1}/${n}</b><span class="tm" id="mt"></span><button class="btn" id="lv">Sair</button></div><div class="qt">${E(q.q)}</div>${opts(q)}<h3>Ranking</h3>${rank(0)}`;
 $('#lv').onclick=leave;main.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{hist.push({q,c:+b.dataset.o});i++;if(i>=n)fin=true;
  upd({score:hist.filter(h=>h.c===h.q.a).length,n:i,ms:Date.now()-t0,done:fin});render()});tick()}
function tick(){const e=$('#mt'),d=Date.now()-t0;if(room&&room.mode==='race'){if(room.lim&&d>=room.lim&&!fin){fin=true;upd({score:hist.filter(h=>h.c===h.q.a).length,n:i,ms:room.lim,done:true});render();return}
 if(e)e.textContent='⏱ '+fmt(room.lim?room.lim-d:d)}
 if(room&&room.mode==='live'){const r=room.per*1000-(Date.now()-qs0);if(e)e.textContent='⏱ '+Math.max(0,Math.ceil(r/1000))+' s';if(r<=0&&!locked&&!room.rev){locked=true;render()}}}
function live(){const q=QS[room.qids[room.cur]],n=room.qids.length;
 if(room.cur!==lastCur){lastCur=room.cur;qs0=Date.now();locked=false;mine=null;clearInterval(tm);tm=setInterval(tick,500)}
 if(room.rev&&!hist[room.cur])hist[room.cur]={q,c:null};
 main.innerHTML=`<div class="qbar"><b>Pergunta ${room.cur+1}/${n}</b><span class="tm" id="mt"></span><button class="btn" id="lv">Sair</button></div><div class="qt">${E(q.q)}</div>${opts(q,mine,room.rev)}`+
 (room.rev?'<h3>Ranking</h3>'+rank(1):locked?'<p>'+(mine==null?'Tempo esgotado.':'Resposta enviada. À espera dos outros…')+'</p>':'');
 $('#lv').onclick=leave;tick();if(room.rev||locked)return;
 main.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const k=+b.dataset.o,ms=Date.now()-qs0,ok=k===q.a;if(ms>room.per*1000)return;locked=true;mine=k;hist[room.cur]={q,c:k};
  upd({score:increment(ok?Math.round(1000*(1-ms/(room.per*2000))):0),ok:increment(ok?1:0),ans:{n:room.cur,c:k}});render()})}
function endScreen(liveMode){clearInterval(tm);const me=pl.find(p=>p.id===uid)||{score:0,ms:0};
 main.innerHTML=`<h1 class="t">${liveMode?'Fim do jogo':'Terminaste'}</h1><p>${liveMode?'Pontos: <b>'+me.score+'</b>':'Certas: <b>'+me.score+'/'+room.qids.length+'</b> · Tempo: '+fmt(me.ms)}</p><h3>Ranking${liveMode?'':' (atualiza em direto)'}</h3>${rank(liveMode)}${review()}<p><button class="btn p" id="lv">Sair da sala</button></p>`;$('#lv').onclick=leave}
function hostCheck(){if(!host||!room||room.state!=='play'||room.mode!=='live')return;
 if(room.cur!==hostCur){hostCur=room.cur;clearTimeout(hostT);hostT=setTimeout(reveal,room.per*1000+2000)}
 if(!room.rev&&pl.length&&pl.every(p=>p.ans&&p.ans.n===room.cur))reveal()}
function reveal(){if(revd===room.cur)return;revd=room.cur;clearTimeout(hostT);updateDoc(rd(),{rev:true}).catch(console.error);
 setTimeout(()=>{const c=room.cur;updateDoc(rd(),c+1>=room.qids.length?{state:'done'}:{cur:c+1,rev:false}).catch(console.error)},5000)}
if($('#go')&&!$('#mk'))window.mpCfg();
