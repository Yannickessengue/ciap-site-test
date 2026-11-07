
/* ---- Réglages de la revue ---- */
var PARUTION = '2026-12-01';   // date de parution du numéro (à confirmer par le comité)
var EMBARGO_MOIS = 12;
var ARTICLES = [
 {r:'Ouverture',t:'Présentation du numéro',a:'Ulrich Metende et Yannick Essengue',p:9,l:'FR',libre:true,pdf:'articles/consequence-2026-presentation.pdf'},
 {r:'Hommages à Paulin Hountondji',t:'Paulin J. Hountondji : un honnête philosophe',a:'Tanella Boni',p:15,l:'FR'},
 {r:'Hommages à Paulin Hountondji',t:'En a-t-on fini avec l’extraversion ?',a:'Seloua Luste Boulbina',p:23,l:'FR'},
 {r:'Hommages à Paulin Hountondji',t:'Philosophy in Language: A Tribute for Paulin Hountondji',a:'Mark Sanders',p:31,l:'EN'},
 {r:'Hommages à Paulin Hountondji',t:'Paulin Hountondji, en avance',a:'Michèle Gendreau-Massaloux',p:39,l:'FR'},
 {r:'Paulin Hountondji : un « combat pour le sens »',t:'Changement du front de la philosophie africaine. Libération du discours et sociologie de la science à la périphérie',a:'Yaovi Akakpo',p:53,l:'FR'},
 {r:'Paulin Hountondji : un « combat pour le sens »',t:'Hountondji, une philosophie du compromis : penser autrement la vie politique en Afrique',a:'Kouamé Hyacinthe Kouakou',p:89,l:'FR'},
 {r:'Paulin Hountondji : un « combat pour le sens »',t:'Paulin Hountondji : sens et combats d’une vie',a:'Béatrice Afiavi Agbo et Paul Christian Kiti',p:107,l:'FR'},
 {r:'Paulin Hountondji : un « combat pour le sens »',t:'Réflexion sur le texte de Paulin Hountondji de 2020 : « Le retour à l’humain comme condition de la paix mondiale ? »',a:'Abel Kouvouama',p:119,l:'FR'},
 {r:'Paulin Hountondji : un « combat pour le sens »',t:'L’économie des savoirs chez Paulin J. Hountondji. Dé-marginalisation et transversalité critique',a:'Ulrich Metende',p:133,l:'FR'},
 {r:'Dialogues critiques et fécondité conceptuelle',t:'Décoloniser la philosophie : dans quelle direction ou dans quel sens ?',a:'Mahamadé Savadogo',p:151,l:'FR'},
 {r:'Dialogues critiques et fécondité conceptuelle',t:'Paulin Hountondji et l’émergence d’une pensée critique universelle',a:'Roland Techou',p:167,l:'FR'},
 {r:'Dialogues critiques et fécondité conceptuelle',t:'« Je n’ai pas osé courir pour le rattraper ». Paulin Hountondji et Paul Ricœur',a:'Christian Berner',p:185,l:'FR'},
 {r:'Dialogues critiques et fécondité conceptuelle',t:'Paulin Hountondji, penseur décolonial ?',a:'Sètondji Paterne Bossoussi Agbanninhin',p:193,l:'FR'},
 {r:'Dialogues critiques et fécondité conceptuelle',t:'Borrowing from the Elders: “Back to the Things Themselves”. Phenomenology in Perspective, Paulin Hountondji and Kwasi Wiredu',a:'D. A. Masolo',p:221,l:'EN'},
 {r:'Recensions',t:'Paulin J. Hountondji (dir.), Les savoirs endogènes. Pistes pour une recherche',a:'Yannick Essengue',p:247,l:'FR'},
 {r:'Recensions',t:'Paulin J. Hountondji, Combats pour le sens. Un itinéraire africain',a:'Yannick Essengue',p:253,l:'FR'}
];
/* ---- Logique d'embargo ---- */
var lock='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0"/></svg>';
var unl='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></svg>';
var fin=new Date(PARUTION); fin.setMonth(fin.getMonth()+EMBARGO_MOIS);
var fmt=function(d){return d.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})};
if(document.getElementById('toc')){
document.getElementById('oaDate').textContent=fmt(fin);
var now=new Date(), filt='all';
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function render(){
  var h='',cur='';
  ARTICLES.forEach(function(x,i){
    var open=x.libre||now>=fin;
    if(filt==='open'&&!open||filt==='emb'&&open)return;
    if(x.r!==cur){cur=x.r;h+='<div class="rub">'+esc(cur)+'</div>';}
    var acc=open
      ?'<span class="chip open">'+unl+'Libre accès</span>'+(x.pdf?'<a href="'+x.pdf+'" target="_blank" rel="noopener">Lire le PDF</a>':'<span class="d">PDF à venir</span>')
      :'<span class="chip emb">'+lock+'Embargo</span><button data-i="'+i+'">Demander l’accès</button>';
    h+='<div class="art"><div><div class="t">'+esc(x.t)+'</div><div class="a">'+esc(x.a)+'<i>p. '+x.p+' · '+x.l+'</i></div></div><div class="acc">'+acc+'</div></div>';
  });
  document.getElementById('toc').innerHTML=h;
}
render();
document.getElementById('flt').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;filt=b.dataset.f;this.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});render();});
var md=document.getElementById('md');
document.getElementById('toc').addEventListener('click',function(e){var b=e.target.closest('button[data-i]');if(!b)return;document.getElementById('mt').textContent=ARTICLES[b.dataset.i].t;document.getElementById('md-date').textContent=fmt(fin);document.getElementById('mok').style.display='none';md.classList.add('on');});
document.getElementById('mx').onclick=function(){md.classList.remove('on')};
md.addEventListener('click',function(e){if(e.target===md)md.classList.remove('on')});
document.getElementById('mj').onclick=function(){md.classList.remove('on')};
document.getElementById('ms').onclick=function(){document.getElementById('mok').style.display='block'};
}
var _t=document.getElementById('tog');if(_t)_t.onclick=function(){var e=document.getElementById('exg');e.classList.toggle('open');this.textContent=e.classList.contains('open')?'Replier le texte':'Lire le texte intégral'};
var _g=document.getElementById('gal');if(_g)_g.addEventListener('click',function(e){var f=e.target.closest('figure');if(!f)return;var i=f.querySelector('img');document.getElementById('lbi').src=i.src;document.getElementById('lbi').alt=i.alt;document.getElementById('lbc').textContent=f.querySelector('figcaption').textContent+' — Photo : Gilles-Christ Codjo';document.getElementById('lb').classList.add('on')});
var _l=document.getElementById('lb');if(_l)_l.onclick=function(){this.classList.remove('on')};
var _f=document.getElementById('f');if(_f)_f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('ok').style.display='block';});
/* header + menu + reveal */
var hd=document.getElementById('hd');
function sc(){hd.classList.add('solid')}sc();window.addEventListener('scroll',sc,{passive:true});
document.getElementById('bg').onclick=function(){document.getElementById('menu').classList.toggle('open');hd.classList.add('solid')};
document.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('menu').classList.remove('open')})});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})}

/* filtre sociétés */

var sf=document.getElementById('sfilt');
if(sf){sf.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var r=b.dataset.r;sf.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});document.querySelectorAll('.soc').forEach(function(c){c.style.display=(r==='all'||c.dataset.r===r)?'':'none'});document.querySelectorAll('.region').forEach(function(g){var v=[].some.call(g.querySelectorAll('.soc'),function(c){return c.style.display!=='none'});g.style.display=v?'':'none'});});}
var sq=document.getElementById('sq');
if(sq){sq.addEventListener('input',function(){var q=this.value.toLowerCase();document.querySelectorAll('.soc').forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(q)>-1?'':'none'});document.querySelectorAll('.region').forEach(function(g){var v=[].some.call(g.querySelectorAll('.soc'),function(c){return c.style.display!=='none'});g.style.display=v?'':'none'});});}


function gtInit(){new google.translate.TranslateElement({pageLanguage:'fr',includedLanguages:'fr,en,pt,ar,sw,es,de',autoDisplay:false},'gt');}
(function(){
  var sel=document.getElementById('langSel');
  var m=document.cookie.match(/googtrans=\/fr\/(\w+)/); if(m) sel.value=m[1];
  function apply(l){
    var c=document.querySelector('#gt select.goog-te-combo');
    if(!c){setTimeout(function(){apply(l)},300);return;}
    if(l==='fr'){document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain='+location.hostname;location.reload();return;}
    c.value=l;c.dispatchEvent(new Event('change'));
    document.documentElement.dir=(l==='ar')?'rtl':'ltr';
  }
  sel.addEventListener('change',function(){apply(this.value)});
  if(m&&m[1]==='ar')document.documentElement.dir='rtl';
})();
