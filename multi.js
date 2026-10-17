import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {getAuth,signInAnonymously} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {getFirestore,doc,setDoc,getDoc,getDocs,deleteDoc,updateDoc,onSnapshot,collection,increment} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const app=initializeApp({apiKey:"AIzaSyAQAbI8Ipib04YJIevhlrdY8H_TQee6l2Y",authDomain:"instrutor-de-codigo.firebaseapp.com",projectId:"instrutor-de-codigo",storageBucket:"instrutor-de-codigo.firebasestorage.app",messagingSenderId:"659205376818",appId:"1:659205376818:web:a88029ea8c02df049f652b"});
const auth=getAuth(app),db=getFirestore(app),QS=window.QS;
const $=s=>document.querySelector(s),main=$('#main'),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L=k=>String.fromCharCode(97+k),fmt=ms=>{const s=Math.max(0,Math.round(ms/1000));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
let uid,code,room,pl=[],un=[],host=false,i=0,okc=0,t0=0,tm=null,hostT=null,revT=null,hostCur=-2,revd=-2,lastCur=-2,qs0=0,locked=false,mine=null,fin=false,name='',view=null;
const ready=signInAnonymously(auth).then(c=>uid=c.user.uid).catch(e=>console.error(e));
const rd=()=>doc(db,'rooms',code),pd=()=>doc(db,'rooms',code,'players',uid);
const err=m=>{const e=$('#me');if(e)e.textContent=m};
const spec=()=>host&&room&&room.hp===false;
window.mpCfg=()=>{if($('#mk'))return;const b=document.createElement('div');b.className='box';
 b.innerHTML=`<b>👥 Multijogador</b><label>O teu nome: <input id="mn" maxlength="16" value="${E(localStorage.mpname||'')}"></label>
<label><input type="radio" name="mm" value="race" checked> Corrida — cada um ao seu ritmo, com ranking em direto</label>
<label><input type="radio" name="mm" value="live"> Ao vivo — a mesma pergunta para todos, <input type="number" id="mq" value="20" min="5"> s por pergunta, pontos pela rapidez</label>
<label><input type="checkbox" id="mh" checked> Participar também no teste (desmarca para só acompanhar a sala)</label>
<p><button class="btn p" id="mk">Criar sala com as definições acima</button></p>
<label>Código da sala: <input id="mc" maxlength="4" style="width:90px;text-transform:uppercase"></label> <button class="btn" id="mj">Entrar na sala</button> <small id="me" style="color:var(--ko)"></small>`;
 main.append(b);$('#mk').onclick=create;$('#mj').onclick=join};
const nm=()=>{name=$('#mn').value.trim();if(name)localStorage.mpname=name;return name};
async function create(){if(!nm())return err('Escreve o teu nome.');
 const sel=new Set([...document.querySelectorAll('.tc:checked')].map(c=>+c.value)),p=QS.filter(q=>q.t.some(t=>sel.has(t)));
 if(!p.length)return err('Escolhe pelo menos um tema.');
 for(let k=p.length-1;k>0;k--){const j=Math.random()*(k+1)|0;[p[k],p[j]]=[p[j],p[k]]}
 const n=Math.min(+$('#qn').value||100,p.length),lim=document.querySelector('[name=tm]:checked').value==='1'?Math.max(1,+$('#qm').value||120)*60000:0,hp=$('#mh').checked;
 await ready;if(!uid)return err('Sem ligação ao Firebase. Verifica o login anónimo.');
 code=Array.from({length:4},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.random()*24|0]).join('');
 try{await setDoc(rd(),{host:uid,hp,mode:document.querySelector('[name=mm]:checked').value,state:'lobby',qids:p.slice(0,n).map(q=>q.id),lim,per:Math.max(5,+$('#mq').value||20),cur:-1,rev:false})}catch(e){return err('Não foi possível criar a sala ('+e.code+').')}
 enter(true,hp)}
async function join(){if(!nm())return err('Escreve o teu nome.');code=$('#mc').value.trim().toUpperCase();await ready;if(!uid)return err('Sem ligação ao Firebase.');
 try{const s=await getDoc(rd());if(!s.exists())return err('Sala não encontrada.');if(s.data().state!=='lobby')return err('Essa sala já começou.')}catch(e){return err('Erro ao entrar ('+e.code+').')}
 enter(false,true)}
async function enter(h,plays){host=h;window.mpActive=true;i=0;okc=0;t0=0;fin=false;lastCur=-2;hostCur=-2;revd=-2;room=null;pl=[];view=null;
 if(plays)await setDoc(pd(),{name,score:0,ok:0,n:0,ms:0,done:false,ans:null,a:{}});
 un=[onSnapshot(rd(),d=>{if(!d.exists()){room=null;return gone()}room=d.data();hostCheck();render()}),onSnapshot(collection(db,'rooms',code,'players'),c=>{pl=c.docs.map(x=>({id:x.id,...x.data()}));hostCheck();render()})];
 main.innerHTML='<p>A entrar na sala…</p>'}
function leave(){un.forEach(f=>f());clearInterval(tm);clearTimeout(hostT);clearTimeout(revT);window.mpActive=false;window.quizCfg()}
function gone(){clearInterval(tm);main.innerHTML='<h1 class="t">Sala apagada</h1><p>O anfitrião apagou esta sala.</p><button class="btn p" id="lv">Sair</button>';$('#lv').onclick=leave}
async function delRoom(){if(!confirm('Apagar esta sala para todos? Não dá para desfazer.'))return;
 un.forEach(f=>f());clearInterval(tm);clearTimeout(hostT);clearTimeout(revT);
 try{const s=await getDocs(collection(db,'rooms',code,'players'));await Promise.all(s.docs.map(d=>deleteDoc(d.ref)));await deleteDoc(rd())}
 catch(e){alert('Não foi possível apagar a sala ('+e.code+'). Confirma que publicaste as regras novas.')}
 window.mpActive=false;window.quizCfg()}
const hostBtn=()=>host?'<button class="btn" id="dl">🗑️ Apagar sala</button>':'';
const bindHost=()=>{if($('#dl'))$('#dl').onclick=delRoom};
const upd=o=>updateDoc(pd(),o).catch(console.error);
function rank(live,links){const tot=room.qids.length,s=[...pl].sort((a,b)=>b.score-a.score||a.ms-b.ms);
 return '<table><tr><th>#</th><th>Jogador</th><th>'+(live?'Pontos':'Certas')+'</th><th>'+(live?'Acertos':'Progresso')+'</th>'+(live?'':'<th>Tempo</th>')+(links?'<th></th>':'')+'</tr>'+s.map((p,k)=>`<tr${p.id===uid?' style="font-weight:700"':''}><td>${k+1}</td><td>${E(p.name)}</td><td>${p.score}</td><td>${live?p.ok:p.n+'/'+tot+(p.done?' ✔':'')}</td>${live?'':'<td>'+fmt(p.ms)+'</td>'}${links?`<td><button class="btn" data-p="${p.id}">Ver teste</button></td>`:''}</tr>`).join('')+'</table>'}
const opts=(q,cls,extra)=>q.o.map((o,k)=>`<button class="opt ${cls(k)}" data-o="${k}"><b>${L(k)})</b> ${E(o)}${extra?`<span style="float:right">${extra(k)}</span>`:''}</button>`).join('');
function stats(qi){const q=QS[room.qids[qi]],c=q.o.map(()=>0);let t=0;pl.forEach(p=>{const v=p.a&&p.a[qi];if(v!=null&&c[v]!=null){c[v]++;t++}});return{c,t}}
const info=q=>q.u?'<span class="bd">resposta não confirmada</span>':q.e?`<div class="ex">${q.e}</div>`:'';
function overview(){const open=new Set([...document.querySelectorAll('#ovl details[open]')].map(d=>d.dataset.i));
 return '<h2>Visão geral do teste</h2><p>Clica numa pergunta para ver a percentagem de jogadores que escolheu cada resposta.</p><div id="ovl">'+room.qids.map((id,qi)=>{const q=QS[id],{c,t}=stats(qi),pc=k=>t?Math.round(100*c[k]/t):0;
  return `<details class="co" data-i="${qi}"${open.has(String(qi))?' open':''}><summary><b>${qi+1}.</b> ${E(q.q.slice(0,90))}${q.q.length>90?'…':''} — <b>${t?pc(q.a)+'% acertaram':'sem respostas'}</b> (${c[q.a]}/${t})</summary><div class="qt">${E(q.q)}</div>`+
  q.o.map((o,k)=>`<div class="opt ${k===q.a?'ok':''}" style="background:linear-gradient(90deg,color-mix(in srgb,var(${k===q.a?'--ok':'--ac'}) 30%,transparent) ${pc(k)}%,transparent ${pc(k)}%)"><b>${L(k)})</b> ${E(o)}<span style="float:right"><b>${pc(k)}%</b> (${c[k]})</span></div>`).join('')+info(q)+'</details>'}).join('')+'</div>'}
function playerView(id){const p=pl.find(x=>x.id===id);if(!p)return '<p>Jogador não encontrado.</p>';const over=room.state==='done'||p.done;
 const w=room.qids.map((qid,qi)=>({q:QS[qid],qi,c:p.a&&p.a[qi]})).filter(x=>x.c!==x.q.a&&(x.c!=null||over));
 return `<h2>${E(p.name)} — ${w.length} erradas de ${room.qids.length}</h2>`+(w.length?w.map(({q,qi,c})=>`<div class="ri"><b>${qi+1}.</b> <span class="qt">${E(q.q)}</span>`+q.o.map((o,k)=>`<div class="opt ${k===q.a?'ok':k===c?'ko':''}"><b>${L(k)})</b> ${E(o)}${k===c?' ← resposta de '+E(p.name):''}</div>`).join('')+(c==null?'<small>Sem resposta.</small>':'')+info(q)+'</div>').join(''):'<p>Sem erros. 🎉</p>')}
function results(liveMode){clearInterval(tm);const sp=spec(),me=pl.find(p=>p.id===uid),back='<p><button class="btn" id="bk">← Voltar ao ranking</button></p>';let h;
 if(view&&view.p)h=back+playerView(view.p);else if(view==='ov')h=back+overview();
 else h=`<h1 class="t">${sp?'A acompanhar a sala':liveMode?'Fim do jogo':'Terminaste'}</h1>`+(me?`<p>${liveMode?'Pontos: <b>'+me.score+'</b>':'Certas: <b>'+me.score+'/'+room.qids.length+'</b> · Tempo: '+fmt(me.ms)}</p>`:'')+`<h3>Ranking${liveMode?'':' (atualiza em direto)'}</h3>`+rank(liveMode,1)+`<p><button class="btn p" id="ob">📋 Visão geral do teste</button> ${hostBtn()} <button class="btn" id="lv">Sair da sala</button></p>`;
 main.innerHTML=h;bindHost();if($('#bk'))$('#bk').onclick=()=>{view=null;render()};if($('#ob'))$('#ob').onclick=()=>{view='ov';render()};if($('#lv'))$('#lv').onclick=leave;
 main.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{view={p:b.dataset.p};render()})}
function render(){if(!room||!window.mpActive)return;
 if(room.state==='lobby')return lobby();
 if(room.state==='done')return results(true);
 room.mode==='race'?race():live()}
function lobby(){main.innerHTML=`<h1 class="t">Sala <span style="letter-spacing:.2em">${code}</span></h1><p>Modo: <b>${room.mode==='race'?'Corrida':'Ao vivo ('+room.per+' s por pergunta)'}</b> · ${room.qids.length} perguntas${room.mode==='race'&&room.lim?' · '+Math.round(room.lim/60000)+' min':''}</p>
<p>Diz aos amigos para entrarem com este código.</p><div class="box"><b>Jogadores (${pl.length})</b><br>${pl.map(p=>E(p.name)).join(' · ')||'—'}</div>`+
 (host?`<p>${spec()?'Estás só a acompanhar (não participas no teste).':'Vais participar no teste.'}</p><button class="btn p" id="st">Começar</button> ${hostBtn()} `:'<p>À espera do anfitrião…</p>')+'<button class="btn" id="lv">Sair</button>';
 $('#lv').onclick=leave;bindHost();if(host)$('#st').onclick=()=>updateDoc(rd(),room.mode==='live'?{state:'play',cur:0,rev:false}:{state:'play'})}
function race(){const n=room.qids.length;if(spec())return results(false);if(!t0){t0=Date.now();clearInterval(tm);tm=setInterval(tick,1000)}
 if(fin||i>=n)return results(false);const q=QS[room.qids[i]];
 main.innerHTML=`<div class="qbar"><b>Pergunta ${i+1}/${n}</b><span class="tm" id="mt"></span><button class="btn" id="lv">Sair</button></div><div class="qt">${E(q.q)}</div>${opts(q,()=>'')}<h3>Ranking</h3>${rank(0)}`;
 $('#lv').onclick=leave;main.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const k=+b.dataset.o,idx=i;if(k===q.a)okc++;i++;if(i>=n)fin=true;
  upd({score:okc,n:i,ms:Date.now()-t0,done:fin,['a.'+idx]:k});render()});tick()}
function tick(){const e=$('#mt'),d=Date.now()-t0;if(!room)return;
 if(room.mode==='race'){if(room.lim&&d>=room.lim&&!fin){fin=true;upd({score:okc,n:i,ms:room.lim,done:true});render();return}if(e)e.textContent='⏱ '+fmt(room.lim?room.lim-d:d)}
 else{const r=room.per*1000-(Date.now()-qs0);if(e)e.textContent='⏱ '+Math.max(0,Math.ceil(r/1000))+' s';if(r<=0&&!locked&&!room.rev){locked=true;render()}}}
function live(){const q=QS[room.qids[room.cur]],n=room.qids.length,sp=spec();
 if(room.cur!==lastCur){lastCur=room.cur;qs0=Date.now();locked=sp;mine=null;clearInterval(tm);tm=setInterval(tick,500)}
 const st=stats(room.cur),cnt=room.rev||sp,cls=k=>room.rev?(k===q.a?'ok':k===mine?'ko':''):sp?'':mine===k?'s':'';
 main.innerHTML=`<div class="qbar"><b>Pergunta ${room.cur+1}/${n}</b><span class="tm" id="mt"></span>${hostBtn()}<button class="btn" id="lv">Sair</button></div>${sp?`<p>Responderam: ${st.t}/${pl.length}</p>`:''}<div class="qt">${E(q.q)}</div>${opts(q,cls,cnt?k=>st.c[k]:null)}`+
 (room.rev?'<h3>Ranking</h3>'+rank(1):locked&&!sp?'<p>'+(mine==null?'Tempo esgotado.':'Resposta enviada. À espera dos outros…')+'</p>':'');
 $('#lv').onclick=leave;bindHost();tick();if(room.rev||locked||sp)return;
 main.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const k=+b.dataset.o,ms=Date.now()-qs0,ok=k===q.a;if(ms>room.per*1000)return;locked=true;mine=k;
  upd({score:increment(ok?Math.round(1000*(1-ms/(room.per*2000))):0),ok:increment(ok?1:0),ans:{n:room.cur,c:k},['a.'+room.cur]:k});render()})}
function hostCheck(){if(!host||!room||room.state!=='play'||room.mode!=='live')return;
 if(room.cur!==hostCur){hostCur=room.cur;clearTimeout(hostT);hostT=setTimeout(reveal,room.per*1000+2000)}
 if(!room.rev&&pl.length&&pl.every(p=>p.ans&&p.ans.n===room.cur))reveal()}
function reveal(){if(!room||revd===room.cur)return;revd=room.cur;clearTimeout(hostT);updateDoc(rd(),{rev:true}).catch(console.error);
 revT=setTimeout(()=>{if(!room)return;const c=room.cur;updateDoc(rd(),c+1>=room.qids.length?{state:'done'}:{cur:c+1,rev:false}).catch(console.error)},5000)}
if($('#go')&&!$('#mk'))window.mpCfg();
