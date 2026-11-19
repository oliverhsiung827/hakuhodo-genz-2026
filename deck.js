/* 簡報內容：每一頁都用 HTML / SVG 重新製作 */
(function(){

/* ---------- icons ---------- */
const IC = {
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><circle cx="17" cy="7.5" r="2.8"/><path d="M17 13c3 0 5 1.6 5 4.5"/>',
 chat:'<path d="M4 5h16v11H10l-5 4v-4H4z"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
 briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
 chart:'<path d="M4 20V4M4 20h16"/><path d="M8.5 16v-4M12.5 16V8M16.5 16v-6"/>',
 spark:'<path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/>',
 heart:'<path d="M12 20s-8-4.6-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.4-8 10-8 10z"/>',
 home:'<path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/>',
 plane:'<path d="M21 3L3 10.5l7 2.5 2.5 7z"/><path d="M10 13l5-5"/>',
 headphones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 loop:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v5h-5"/>',
 bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 sliders:'<path d="M4 6h9M19 6h1M4 12h3M13 12h7M4 18h11M21 18h-1"/><circle cx="16" cy="6" r="2.5"/><circle cx="10" cy="12" r="2.5"/><circle cx="18" cy="18" r="2.5"/>',
 robot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4"/><circle cx="12" cy="3" r="1"/><circle cx="9" cy="14" r="1.3"/><circle cx="15" cy="14" r="1.3"/>',
 megaphone:'<path d="M3 10v4h3l9 5V5L6 10z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
 book:'<path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z"/><path d="M12 6v14"/>',
 pen:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>'
};
const icon = (n, sz) => `<svg class="ico" viewBox="0 0 24 24" width="${sz||32}" height="${sz||32}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${IC[n]||''}</svg>`;
const ib = (n, cls, sz) => `<span class="ib ${cls||''}">${icon(n, sz||32)}</span>`;

/* ---------- helpers ---------- */
function vbars(items, max, h){
  h = h || 340;
  return `<div class="vbars">${items.map(it=>`
    <div class="vbar ${it.c||''}"><div class="v">${(+it.v).toFixed(1)}${it.u||''}</div>
    <div class="b" style="height:${Math.round(it.v/max*h)}px"></div>
    <div class="l">${it.l}</div></div>`).join('')}</div>`;
}
function zyx(vals, max, h){
  return vbars([{l:'<span class="pill z">Z世代</span>',v:vals[0],c:'z'},{l:'Y世代',v:vals[1],c:'y'},{l:'X世代',v:vals[2],c:'x'}], max, h);
}
function twjp(vals, max, h, u){
  return vbars([{l:'<span class="pill tw">台灣 Z世代</span>',v:vals[0],c:'tw',u:u||''},{l:'日本 Z世代',v:vals[1],c:'jp',u:u||''}], max, h);
}
function chartBox(q, inner, extra){
  return `<div class="chart-box" ${extra||''}><div class="q">${q}</div><div class="area">${inner}</div></div>`;
}
function lineChart(o){
  const W=o.w, H=o.h, L=o.pl||70, R=o.pr||150, T=26, B=46;
  const sx=v=>L+(v-o.x[0])/(o.x[1]-o.x[0])*(W-L-R);
  const sy=v=>T+(1-(v-o.y[0])/(o.y[1]-o.y[0]))*(H-T-B);
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
  (o.band||[]).forEach(b=>{ s+=`<rect x="${sx(b[0])}" y="${T}" width="${sx(b[1])-sx(b[0])}" height="${H-T-B}" fill="#ffd23f" opacity=".35"/><text x="${(sx(b[0])+sx(b[1]))/2}" y="${T+24}" text-anchor="middle" font-size="18" fill="#5c6a62" font-weight="700">${b[3]}</text>`; });
  o.yt.forEach(v=>{ s+=`<line x1="${L}" x2="${W-R}" y1="${sy(v)}" y2="${sy(v)}" stroke="#17191a" stroke-opacity=".12" stroke-width="2"/><text x="${L-12}" y="${sy(v)+6}" text-anchor="end" font-size="17" fill="#8a928d">${o.yf?o.yf(v):v}</text>`; });
  o.xt.forEach(v=>{ s+=`<text x="${sx(v)}" y="${H-14}" text-anchor="middle" font-size="18" fill="#6f7773">${v}</text>`; });
  o.series.forEach(se=>{
    const d=se.pts.map((p,i)=>(i?'L':'M')+sx(p[0]).toFixed(1)+' '+sy(p[1]).toFixed(1)).join(' ');
    s+=`<path class="ln" pathLength="1" d="${d}" fill="none" stroke="${se.c}" stroke-width="${se.w||6}" stroke-linejoin="round" stroke-linecap="round"/>`;
    se.pts.forEach((p,i)=>{ if(se.dots||i===0||i===se.pts.length-1) s+=`<circle cx="${sx(p[0])}" cy="${sy(p[1])}" r="8" fill="${se.c}" stroke="#17191a" stroke-width="3"/>`; });
    (se.labels||[]).forEach(lb=>{ const p=se.pts[lb[0]]; s+=`<text x="${sx(p[0])+(lb[2]||0)}" y="${sy(p[1])+(lb[3]||-16)}" text-anchor="${lb[4]||'middle'}" font-size="${lb[5]||24}" font-weight="900" fill="${se.c}">${lb[1]}</text>`; });
    if(se.name){ const p=se.pts[se.pts.length-1]; s+=`<rect x="${sx(p[0])+18}" y="${sy(p[1])-19+(se.ny||0)}" width="${se.nw||100}" height="38" rx="19" fill="${se.c}" stroke="#17191a" stroke-width="3"/><text x="${sx(p[0])+18+(se.nw||100)/2}" y="${sy(p[1])+8+(se.ny||0)}" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">${se.name}</text>`; }
  });
  return s+'</svg>';
}
function donut(parts, size){
  const r=size/2-28, C=2*Math.PI*r; let off=0;
  let s=`<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><g transform="rotate(-90 ${size/2} ${size/2})">`;
  parts.forEach(p=>{ const len=p.v/100*C; s+=`<circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${p.c}" stroke-width="52" stroke-dasharray="${len} ${C-len}" stroke-dashoffset="${-off}"/>`; off+=len; });
  return s+'</g></svg>';
}
function quad(cells, axisLabels){
  // cells: [I(右上) , II(左上), III(左下), IV(右下)] => {t,p,cls}
  const pos=[['right:2%','top:4%'],['left:2%','top:4%'],['left:2%','bottom:4%'],['right:2%','bottom:4%']];
  const rn=['I','II','III','IV'];
  let s=`<div class="quad"><div class="ax-h"></div><div class="ax-v"></div>`;
  if(axisLabels!==false) s+=`<div class="lb" style="left:50%;top:-10px;transform:translate(-50%,-100%)">保留</div><div class="lb" style="left:50%;bottom:-10px;transform:translate(-50%,100%)">全力</div><div class="lb" style="left:0;top:50%;transform:translate(-110%,-50%)">自我</div><div class="lb" style="right:0;top:50%;transform:translate(110%,-50%)">他人</div>`;
  cells.forEach((c,i)=>{ if(!c) return;
    s+=`<div class="q4 qc${i} ${c.cls||''}" style="${pos[i][0]};${pos[i][1]}">${c.raw?c.raw:`${c.t?`<span class="tagq">${c.t}</span>`:''}${c.p?`<p>${c.p}</p>`:''}<span class="rn">${rn[i]}</span>`}</div>`; });
  return s+'</div>';
}
const Q = {
  I:{t:'定義自我',p:'會根據與他人的關係，選擇性地呈現自己希望被看見的一面'},
  II:{t:'管理標準',p:'為了保有生活的餘裕，刻意降低標準'},
  III:{t:'投入資源',p:'對於能看到效果的事，才會積極投入心力'},
  IV:{t:'創造互惠',p:'發揮自己擅長的優勢，同時為他人和自己帶來助益'}
};
function vsBlock(z, xy){
  return `<div class="vs"><div class="top"><span class="pill z">Z世代</span><div class="t">${z}</div></div><div class="bot"><span class="pill xy">X / Y 世代</span><div class="t">${xy}</div></div></div>`;
}
const TAGICON={'自我介紹':'tag','社群發文':'phone','工作型態':'briefcase','繳交期限':'clock','值得努力的部分':'trophy','先認同再行動':'target','和家人的關係':'home','主動回饋的精神':'heart'};
function caseSlide(o){
  return `<div class="eyebrow">${o.eyebrow}</div><h2>${o.h}</h2>
  <div class="body-row" style="gap:50px">${o.cases.map(c=>`<div class="col" style="justify-content:center"><span class="case-tag">${ib(TAGICON[c.tag]||'spark','w',22)}${c.tag}</span><h3 style="font-size:40px;font-weight:900;margin-bottom:22px;line-height:1.3">${c.h}</h3><div class="quote"><p style="font-size:33px">${c.q}</p><cite>${c.who}</cite></div></div>`).join('')}</div>`;
}


/* ---------- extra helpers ---------- */
const POP = {"2005": [[62.3, 56.6], [78.7, 72.2], [84.5, 77.1], [82.8, 76.3], [97.6, 91.9], [100.9, 96.8], [90.2, 88.6], [95.2, 92.7], [97.6, 95.2], [90.2, 89.4], [78.7, 78.7], [50.0, 50.0], [39.4, 40.2], [33.6, 36.9], [29.5, 29.5], [26.2, 21.3], [13.9, 12.3], [7.4, 8.2]], "2015": [[53.3, 50.1], [51.7, 47.6], [63.2, 57.5], [78.8, 72.2], [83.7, 77.2], [81.2, 77.2], [96.0, 96.9], [99.3, 101.8], [87.8, 90.3], [91.1, 92.8], [92.7, 94.4], [84.5, 87.8], [72.2, 76.3], [44.3, 48.4], [32.0, 37.0], [24.6, 31.2], [17.2, 21.4], [15.6, 17.3]], "2025": [[37.0, 33.6], [50.1, 45.9], [54.2, 50.0], [52.6, 47.6], [63.2, 57.4], [78.0, 72.2], [82.9, 77.1], [81.3, 77.9], [95.3, 96.8], [96.9, 100.9], [84.6, 89.4], [86.2, 90.2], [85.4, 91.1], [75.6, 83.7], [60.8, 69.7], [33.7, 41.0], [20.6, 27.0], [17.3, 27.9]]};
function pyramid(rows){
  const W=360,H=300,cx=W/2,rh=H/rows.length,sc=1.55;
  let s=`<svg viewBox="0 0 ${W} ${H+24}" width="100%" height="100%">`;
  rows.forEach((r,i)=>{ const y=H-(i+1)*rh, z=(i===4||i===5);
    s+=`<rect class="gx" style="transform-origin:${cx}px 0" x="${cx-r[0]*sc}" y="${y+1}" width="${r[0]*sc}" height="${rh-2}" fill="${z?'#19a957':'#7fa8f0'}"/>`;
    s+=`<rect class="gx" x="${cx}" y="${y+1}" width="${r[1]*sc}" height="${rh-2}" fill="${z?'#19a957':'#f2a7a0'}"/>`; });
  s+=`<line x1="${cx}" x2="${cx}" y1="0" y2="${H}" stroke="#17191a" stroke-width="2"/>`;
  s+=`<text x="4" y="${H+20}" font-size="15" fill="#767b77">0歲</text><text x="${W-4}" y="${H+20}" font-size="15" fill="#767b77" text-anchor="end">85歲以上在最上方</text>`;
  return s+'</svg>';
}
function caseLayout(o){
  return `<span class="case-tag" style="position:absolute;left:110px;top:70px;z-index:3">${ib(o.icon,'w',22)}${o.tag}</span>
  <div class="body-row" style="margin-top:50px;gap:60px;align-items:center">
    <div class="col" style="flex:1.05;align-items:center;justify-content:center">${o.visual}</div>
    <div class="col" style="flex:.95;justify-content:center">
      <div class="eyebrow" style="margin-bottom:16px">${o.eyebrow}</div>
      <h2 style="font-size:54px;margin-bottom:34px">${o.h}</h2>
      <div class="quote"><p style="font-size:30px">${o.q}</p><cite>＜${o.who}＞</cite></div>
    </div>
  </div>`;
}
function lineSlide(o){
  return `<div class="body-row" style="margin-top:0;gap:50px">
    <div class="col" style="flex:1;justify-content:center;gap:16px">
      <span class="tagq" style="align-self:flex-start;font-size:26px">${o.tag}</span>
      <p style="font-size:30px;line-height:1.5;font-weight:700;margin-top:6px">${o.def}</p>
      <div style="width:0;height:0;border:16px solid transparent;border-top-color:var(--g);margin:0 auto -8px"></div>
      ${o.rows.map(r=>`<div class="card" style="padding:16px 24px;box-shadow:4px 4px 0 var(--ink)"><div style="font-size:20px;color:var(--mute);font-weight:700">${r[0]}</div><div style="font-size:28px;font-weight:900;margin-top:4px"><span class="hl">${r[1]}</span></div></div>`).join('')}
      <div class="card g" style="text-align:center;padding:16px"><div style="font-size:44px;font-weight:900;line-height:1.2">${o.line}</div><div style="font-size:26px;font-weight:900;opacity:.9">劃界線</div></div>
    </div>
    <div class="col" style="flex:1"><div class="card" style="flex:1;display:flex;align-items:center;justify-content:center;padding:20px;background:#fff">${o.svg}</div></div>
  </div>`;
}
const P = (x,y,c,s)=>`<g transform="translate(${x},${y}) scale(${s||1})"><circle cx="0" cy="-58" r="14" fill="${c}"/><path d="M-14 -38 h28 l6 40 h-10 l-3 50 h-14 l-3 -50 h-10z" fill="${c}"/></g>`;
const LIKE = (x,y)=>`<g transform="translate(${x},${y})"><rect x="-22" y="-20" width="44" height="34" rx="6" fill="#19a957" stroke="#17191a" stroke-width="3"/><path d="M-6 14 l6 10 l6 -10" fill="#19a957" stroke="#17191a" stroke-width="3"/><text x="0" y="5" text-anchor="middle" font-size="20" fill="#fff">👍</text></g>`;

/* ---------- slides ---------- */
const S = [];
const add = (id, title, html, cls) => S.push({id, title, html, cls});

/* ===== 封面 ===== */
add('cover','封面',`
  <div class="sticker float" style="right:150px;top:110px;width:250px;height:250px;border-radius:50%;background:var(--g);color:#fff;font-size:44px">Z 世代<br>生活者研究</div>
  <div class="sticker" style="right:430px;top:410px;width:200px;height:72px;border-radius:999px;background:var(--c);color:#fff;font-size:30px;transform:rotate(-8deg)">#劃界線</div>
  <div class="sticker" style="right:110px;top:470px;width:310px;height:190px;border-radius:24px;background:#fff;color:var(--ink);font-size:32px;transform:rotate(5deg);flex-direction:column;gap:10px"><span style="font-size:22px;color:var(--mute);font-weight:700">吃苦是……</span>成本，不是美德？</div>
  <svg class="sticker" style="right:500px;top:120px;width:120px;height:120px;border:0;box-shadow:none;background:none" viewBox="0 0 100 100"><path d="M50 4 l13 32 34 3 -26 22 8 34 -29 -18 -29 18 8 -34 -26 -22 34 -3z" fill="#a98cff" stroke="#17191a" stroke-width="4" stroke-linejoin="round"/></svg>
  <div class="kicker">2026 博報堂 台灣生活者研究</div>
  <h1><i>劃界線</i></h1>
  <div class="sub">台灣 Z 世代的新行為模式與渴望</div>
  <div class="meta">2026.11.11 ・ 台灣博報堂集團「Z 世代生活者研究」發表會 ・ 內部分享</div>`,'cover');

add('agenda','今天的內容',`
  <div class="eyebrow">AGENDA</div><h2>今天的內容</h2>
  <div class="grid3" style="margin-top:56px;grid-template-columns:repeat(3,1fr);row-gap:26px">
    ${[['01','博報堂怎麼看人','生活者發想 × INSIGHT OUT','eye','g'],['02','為什麼是 Z 世代','研究對象與方法','search',''],['03','Z 世代成長的時代背景','人口、經濟、工作、社群、AI','chart','p'],['04','Z 世代如何「用力」','四個象限、四種行為','bolt','c'],['05','核心洞察：劃界線','背後的深層欲求','spark','g'],['06','行銷啟示 & 我們的下一步','品牌如何「應援」他們','megaphone','']]
      .map((a,k)=>`<div class="card ${['','y','','pp','','c'][k]}" style="padding:26px 30px;display:flex;gap:22px;align-items:flex-start">${ib(a[3],a[4])}<div><div class="num">${a[0]}</div><h3 style="font-size:31px">${a[1]}</h3><p>${a[2]}</p></div></div>`).join('')}
  </div>`);

/* ===== 01 博報堂怎麼看人 ===== */
add('s1','01 博報堂怎麼看人',`<div class="no">01</div><h2>博報堂怎麼看人</h2><p>不把人當「消費者」，而是當「生活者」</p><div class="line"></div>`,'section');

add('seikatsusha','生活者發想',`
  <div class="eyebrow">博報堂的核心理念</div><h2>生活者發想</h2>
  <p class="lead">人不只是購買商品的「消費者」，而是有自己生活方式、價值觀與夢想的「生活者」。</p>
  <div class="flow" style="flex:1;justify-content:space-between;margin-top:30px">
    ${[['現象','透過','全方位的觀察','#ffffff','var(--g)'],['欲求','探討','行為背後的根源','#ffffff','var(--g)'],['未來','描繪及實現','未來的生活','#ffffff','var(--g)']].map((c,i)=>`
      ${i?'<div class="arrow">→</div>':''}
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:22px">
        <div class="circle" style="width:220px;height:220px;background:${i==2?'var(--g)':'#fff'};border:${i==2?'0':'4px solid var(--g)'};color:${i==2?'#fff':'var(--g3)'};font-size:54px;font-weight:900">${c[0]}</div>
        <div style="text-align:center;font-size:26px;color:var(--mute)">${c[1]}<br><b style="font-size:32px;color:var(--ink)">${c[2]}</b></div>
      </div>`).join('')}
  </div>`);

add('three','生活者發想的三個動作',`
  <div class="eyebrow">生活者發想</div><h2>從生活者出發的三個動作</h2>
  <div class="grid3" style="margin-top:60px;flex:1">
    ${[['想像','Imagining','想像生活者的真實樣貌與心情','bulb'],['構想','Envisioning','構想他們想要的未來生活','pen'],['實現','Implementing','把構想變成品牌的行動與服務','bolt']].map((c,i)=>`
      <div class="card ${['y','g','pp'][i]}" style="display:flex;flex-direction:column;justify-content:center;padding:40px">${ib(c[3],'w')}<div class="num" style="margin-top:20px">0${i+1}</div><h3 style="font-size:64px">${c[0]}</h3><div style="font-size:26px;letter-spacing:.1em;opacity:.7;margin-bottom:26px">${c[1]}</div><p style="font-size:28px">${c[2]}</p></div>`).join('')}
  </div>`);

const uSVG = (hl)=>`<svg viewBox="0 0 1380 600" width="100%" height="100%">
  <path d="M520 70 V330 a170 170 0 0 0 340 0 V120" fill="none" stroke="#131715" stroke-width="88"/>
  <path d="M800 140 L860 40 L920 140 Z" fill="#131715" transform="translate(0,-10) scale(1)"/>
  <polygon points="790,130 860,20 930,130" fill="#131715"/>
  ${[[505,110],[535,160],[500,210],[540,250]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="17" fill="#fff" stroke="#aaa" stroke-width="3"/>`).join('')}
  ${[[840,160],[880,190],[870,120]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="17" fill="${hl==='out'?'#1ea653':'#fff'}" stroke="#aaa" stroke-width="3"/>`).join('')}
  <text x="300" y="100" text-anchor="middle" font-size="34" font-weight="700" fill="#131715">看得見的</text>
  <text x="300" y="145" text-anchor="middle" font-size="34" font-weight="700" fill="#131715">消費行動</text>
  <line x1="300" y1="190" x2="300" y2="370" stroke="#131715" stroke-width="3" stroke-dasharray="6 8"/>
  <polygon points="288,370 312,370 300,392" fill="#131715"/>
  <text x="300" y="260" text-anchor="middle" font-size="28" fill="#3d4541" style="paint-order:stroke" stroke="#f6f7f3" stroke-width="14">欲求的深挖</text>
  <text x="1090" y="100" text-anchor="middle" font-size="34" font-weight="700" fill="${hl==='out'?'#0f6b33':'#131715'}">對未來新生活型態</text>
  <text x="1090" y="145" text-anchor="middle" font-size="34" font-weight="700" fill="${hl==='out'?'#0f6b33':'#131715'}">及行銷觀點的啟示</text>
  <line x1="1090" y1="390" x2="1090" y2="210" stroke="#131715" stroke-width="3" stroke-dasharray="6 8"/>
  <polygon points="1078,212 1102,212 1090,190" fill="#131715"/>
  <text x="1090" y="320" text-anchor="middle" font-size="28" fill="#3d4541" style="paint-order:stroke" stroke="#f6f7f3" stroke-width="14">欲求的實現</text>
  ${hl==='in'?'<rect x="530" y="545" width="320" height="52" fill="#9be0b4"/>':''}
  <text x="690" y="582" text-anchor="middle" font-size="36" font-weight="900" fill="#131715">看不見的深層欲求</text>
</svg>`;
add('insightout','INSIGHT OUT 方法',`
  <div class="eyebrow">研究方法</div><h2 style="letter-spacing:.06em">INSIGHT<b style="font-weight:900">OUT</b></h2>
  <p class="lead">從看得見的行為往下挖，找到看不見的深層欲求，再往上推導出未來的啟示。</p>
  <div style="flex:1;min-height:0;margin-top:10px">${uSVG()}</div>`);

/* ===== 02 為什麼是 Z 世代 ===== */
add('s2','02 為什麼是 Z 世代',`<div class="no">02</div><h2>為什麼是 Z 世代</h2><p>年長世代常常只看到「看不懂」的那一面</p><div class="line"></div>`,'section');

add('prayq','猜猜看：供桌上放什麼？',`
  <div class="eyebrow">先請大家猜猜看</div>
  <div class="body-row" style="margin-top:20px;align-items:center">
    <div class="col" style="flex:1.2">
      <h2 style="font-size:76px;line-height:1.3">這是一張廟裡的供桌<br>上面放的<span class="hl">不是水果</span><br>而是……？</h2>
    </div>
    <div class="col" style="flex:.8;align-items:center">
      <div style="width:420px;height:520px;border-radius:28px;background:#fff;border:5px dashed var(--ink);display:flex;align-items:center;justify-content:center;box-shadow:8px 8px 0 var(--ink)">
        <div class="float" style="font-family:var(--disp);font-size:300px;font-weight:800;color:var(--c);line-height:1;-webkit-text-stroke:6px #17191a">?</div>
      </div>
    </div>
  </div>`);

add('pray','求神拜佛搶門票',`
  <div class="eyebrow">答案揭曉</div>
  <div class="body-row" style="margin-top:20px;align-items:center">
    <div class="col" style="flex:1.2">
      <h2 style="font-size:76px;line-height:1.3">為了搶到演唱會門票<br>年輕世代也會<br><span class="hl">「求神拜佛」</span></h2>
      <p class="lead" style="margin-top:34px">供桌上放著 BIGBANG 台北大巨蛋演唱會的座位圖，<br>還配上象徵「圓滿」的桂圓——<br>求一張票、求一個好位子。</p>
    </div>
    <div class="col" style="flex:.8;align-items:center">
      <div class="polaroid">
        <div class="tape"></div>
        <img src="img/pray.png" alt="供桌上的 BIGBANG 台北演唱會座位圖與供品">
        <div class="cap">TAIPEI D-22 🙏 求票中</div>
      </div>
</div>
    </div>
  </div>`);

add('wordsq','猜猜看：這三個詞的意思',`
  <div class="eyebrow">先請大家猜猜看</div><h2>這三個詞，是什麼意思？</h2>
  <div class="grid3" style="margin-top:56px;flex:1">
    ${[['破防','沒搶到票，只能看一堆人爽爽進場，破防到不行'],['觸爛','我真的覺得每個社畜都需要推活，觸爛欸'],['我真的會謝','小卡寄來直接凹爛掉，我真的會謝']].map(w=>`
      <div style="display:flex;flex-direction:column;align-items:center;gap:30px">
        <div class="circle" style="width:300px;height:300px;background:${({'破防':'var(--c)','觸爛':'var(--g)'})[w[0]]||'var(--p)'};color:#fff;font-size:${w[0].length>3?46:62}px;font-weight:900;padding:20px;box-shadow:8px 8px 0 var(--ink)">${w[0]}</div>
        <div style="font-size:27px;line-height:1.6;text-align:center;color:var(--ink2);max-width:380px">「${w[1].replace(w[0],'<b style="color:var(--g3)">'+w[0]+'</b>')}」</div>
        <div style="font-size:40px;font-weight:900;color:var(--mute);border-bottom:4px dashed #b7beb9;padding:0 40px 4px">＝ ？</div>
      </div>`).join('')}
  </div>`);

add('words','答案：三個詞的意思',`
  <div class="eyebrow">答案揭曉</div><h2>用<span class="hl">簡短的文字</span>表達自己複雜的情緒</h2>
  <div class="grid3" style="margin-top:50px;flex:1">
    ${[['破防','令人崩潰','沒搶到票，只能看一堆人爽爽進場'],['觸爛','完全認同','每個社畜都需要推活'],['我真的會謝','無奈','小卡寄來直接凹爛掉']].map(w=>`
      <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
        <div class="circle" style="width:250px;height:250px;background:#fff;box-shadow:7px 7px 0 var(--ink);color:var(--ink);font-size:${w[0].length>3?40:54}px;font-weight:900;padding:20px">${w[0]}</div>
        <div style="font-size:26px;color:var(--mute)">≈</div>
        <div style="font-size:52px;font-weight:900;text-align:center;line-height:1.3"><span class="hl">${w[1]}</span></div>
        <div style="font-size:24px;color:var(--mute);text-align:center">「${w[2]}」</div>
      </div>`).join('')}
  </div>
  <p class="lead" style="text-align:center;margin-top:6px">不是不說話，而是用很短的字，快速傳遞很複雜的心情</p>`);

add('eatbitterq','填空：吃苦是＿＿',`
  <div class="eyebrow">換個立場想想</div>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px">
    <div style="font-size:150px;font-weight:900;line-height:1">吃苦是<span style="display:inline-block;width:420px;border-bottom:14px solid var(--g);margin-left:20px"></span></div>
    <p class="lead" style="font-size:36px;text-align:center">請站在自己的立場——你是前輩，還是年輕人？<br>想一想，給大家 10 秒鐘</p>
  </div>`);

add('eatbitter','答案：吃苦是美德 vs 成本',`
  <div class="eyebrow">答案揭曉</div><h2>同樣是「吃苦」，兩個世代的答案不同</h2>
  <div class="body-row" style="gap:40px;align-items:stretch">
    <div class="card" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px"><span class="pill xy" style="font-size:24px">前輩世代</span><div style="font-size:42px;font-weight:700;color:var(--ink2)">吃苦是</div><div style="font-size:150px;font-weight:900;line-height:1">美德</div><p style="font-size:28px;text-align:center">「年輕人就是要吃苦，吃苦才有未來。」</p></div>
    <div class="card g" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px"><span class="pill z" style="font-size:24px;background:#06170c">Z 世代</span><div style="font-size:42px;font-weight:700">吃苦是</div><div style="font-size:150px;font-weight:900;line-height:1">成本</div><p style="font-size:28px;text-align:center">「不是不能吃苦，但先讓我想清楚：<br>值不值得？能換來什麼？」</p></div>
  </div>`);

add('why','我們為何聚焦年輕族群',`
  <div class="eyebrow">研究動機</div><h2>我們為何聚焦年輕族群？</h2>
  <div class="grid3" style="margin-top:56px;flex:1">
    <div class="card c">${ib('eye','w')}<div class="num" style="margin-top:16px">現況</div><p style="font-size:29px;line-height:1.7">無論在哪個時代，年長世代面對年輕人時，往往因為價值觀不同，<b>只會看到令自己感到負面的地方</b>。</p></div>
    <div class="card y">${ib('search','w')}<div class="num" style="margin-top:16px">機會</div><p style="font-size:29px;line-height:1.7">我們認為從「生活者發想」的角度出發，仍有很大的空間可以<b>更深入地理解年輕人</b>。</p></div>
    <div class="card g">${ib('heart','w')}<div class="num" style="margin-top:16px">目標</div><p style="font-size:29px;line-height:1.7">希望透過重新解讀年輕人的想法・行動，釐清驅動這些行動的深層欲求，提出能<b style="color:#fff">應援年輕人追求幸福生活</b>、引發他們共鳴的行銷方式。</p></div>
  </div>`);

add('gen','研究對象',`
  <div class="eyebrow">研究對象</div><h2>年輕族群的定義</h2>
  <div style="flex:1;position:relative;margin-top:50px">
    <svg viewBox="0 0 1380 430" width="100%" height="100%">
      ${[1965,1970,1975,1980,1985,1990,1995,2000,2005,2010].map((y,i)=>`<line x1="${60+i*135}" x2="${60+i*135}" y1="40" y2="400" stroke="#dfe3dd" stroke-width="2"/><text x="${60+i*135}" y="28" text-anchor="middle" font-size="20" fill="#78817c">${y}</text>`).join('')}
      <line x1="40" x2="1340" y1="44" y2="44" stroke="#131715" stroke-width="3"/><polygon points="1340,36 1360,44 1340,52" fill="#131715"/>
      ${[['X世代','1965–1980 年生','今年 46–61 歲',60,465,80,'#ffffff','#131715'],['Y世代','1981–1996 年生','今年 30–45 歲',492,432,190,'#ffffff','#131715'],['Z世代','1997–2012 年生','今年 14–29 歲',897,432,300,'#1ea653','#ffffff']].map(g=>`
        <path d="M${g[3]} ${g[5]} h${g[4]-40} l40 50 l-40 50 h-${g[4]-40} z" fill="${g[6]}" stroke="${g[6]==='#ffffff'?'#131715':'#1ea653'}" stroke-width="2"/>
        <text x="${g[3]+(g[4]-30)/2}" y="${g[5]+34}" text-anchor="middle" font-size="28" font-weight="900" fill="${g[7]}">${g[0]}</text>
        <text x="${g[3]+(g[4]-30)/2}" y="${g[5]+64}" text-anchor="middle" font-size="19" fill="${g[7]}">${g[1]} ・ ${g[2]}</text>`).join('')}
      
    </svg>
  </div>
  <p class="lead" style="text-align:right;margin-top:0">在 Z 世代中，鎖定<b class="hl">今年 18–29 歲</b>的族群</p>`);

add('method','研究資料',`
  <div class="eyebrow">研究方法</div><h2>博報堂獨家資料庫 ＋ Z 世代專案調查</h2>
  <div class="grid3" style="margin-top:50px;flex:1;grid-auto-rows:1fr">
    ${[['Z世代 家庭訪問調查','大台北/台中/高雄 20–25 歲・N=20','2026 年 1–2 月',1],['Z世代 價值觀調查','北/中/南 18–25 歲 & 50–59 歲・N=600','2026 年 3 月',1],['Z世代 insight 調查','北/中/南 18–61 歲・N=900','2026 年 9 月',1],['Global HABIT','北/中/南 15–59 歲・N=4,500','2025 年 8 月',0],['台灣生活定點調查','北/中/南 15–59 歲・台灣 N=2,000、日本 N=1,000','2026 年 1 月',0],['MIC 媒體接觸狀況調查','北/中/南 20–59 歲・N=1,068','2026 年 2 月',0]]
      .map((c,k)=>`<div class="card ${c[3]?'soft':''}" style="display:flex;flex-direction:column;justify-content:center">${ib(['home','heart','search','globe','chart','phone'][k],c[3]?'g':'w',28)}<h3 style="font-size:32px;margin-top:14px">${c[0]}</h3><p style="font-size:22px">${c[1]}<br>${c[2]}</p></div>`).join('')}
  </div>
  <p class="muted" style="font-size:20px;margin-top:16px">綠色：本次 Z 世代專案調查　白色：博報堂既有資料庫</p>`);

/* ===== 03 時代背景 ===== */
add('s3','03 時代背景',`<div class="no">03</div><h2>Z 世代成長的時代背景</h2><p>Z 世代身處的環境與世代意識</p><div class="line"></div>`,'section');

add('pop','人口結構',`
  <div class="eyebrow">人口結構</div><h2>近 20 年間，20–29 歲人口占比從 <span class="hl">17%</span> 降至 <span class="hl">12%</span></h2>
  <div class="legend" style="margin-top:16px;font-size:20px"><span><i style="background:#7fa8f0"></i>男性</span><span><i style="background:#f2a7a0"></i>女性</span><span><i style="background:var(--g)"></i>20–29 歲（男性／女性）</span></div>
  <div class="grid3" style="margin-top:14px;flex:1;min-height:0">
    ${[['2005',2273.0,387.7,17.1],['2015',2346.3,319.9,13.6],['2025',2335.0,270.1,11.6]].map(y=>`
      <div class="card" style="display:flex;flex-direction:column;align-items:center;padding:18px 22px 10px;min-height:0">
        <div style="display:flex;align-items:center;gap:14px"><span class="pill z" style="font-size:22px">${y[0]} 年</span><span style="font-size:18px;color:var(--mute)">總人口 ${y[1].toLocaleString()} 萬人</span></div>
        <div style="display:flex;align-items:baseline;gap:12px;margin-top:6px"><span style="font-family:var(--disp);font-size:64px;font-weight:800;color:var(--g3)">${y[3]}<span style="font-size:30px">%</span></span><span style="font-size:20px;font-weight:700">20–29 歲 ${y[2]} 萬人</span></div>
        <div style="flex:1;min-height:0;width:100%">${pyramid(POP[y[0]])}</div>
      </div>`).join('')}
  </div>
  <div class="src">資料來源：內政部戶政司（年中人口，5 歲一級距）</div>`);

add('era','成長的時代背景',`
  <div class="eyebrow">Z 世代成長的時代背景</div><h2 style="font-size:34px">生長於民主與富裕已成常態的社會，自幼起接受持續變革的教育；<br>青春期在社群媒體普及的環境中度過，如今正面對充滿可能性與不確定的未來</h2>
  <div class="tl tl-sm">
    <div></div><div class="h">時代觀</div><div class="h">社會・經濟</div><div class="h">資訊・媒體・文化</div><div class="h g">教育・工作</div>
    <div class="rh">1990 年代<small>出生前〜幼年<br>（1999 年時 0〜2 歲）</small></div><div class="c k">民主與富裕成為常態的社會</div><div class="c">1996 首次總統直選<br>電子與高科技產業成長<br>1997 亞洲金融風暴</div><div class="c">有線電視多元化、1995 PTT 成立<br>日本漫畫動畫、台港明星文化</div><div class="c">1994 教改運動、1998 教改行動方案<br>法定工時每週 48 小時</div>
    <div class="rh">2000 年代<small>出生〜小學<br>（2009 年時 0〜12 歲）</small></div><div class="c k">網路讓世界更寬廣，成長同時伴隨不確定性</div><div class="c">2003 SARS<br>2008–09 世界金融危機</div><div class="c">MSN、部落格、線上遊戲<br>2001《流星花園》F4、偶像劇</div><div class="c">2001 九年一貫、2004 性平教育法<br>工時改為兩週 84 小時、無薪假</div>
    <div class="rh">2010 年代<small>國中小〜大學、就業<br>（2019 年時 7〜22 歲）</small></div><div class="c k">自己的聲音與多元的生活方式得以被看見</div><div class="c">2014 太陽花學運<br>2019 同性婚姻合法化</div><div class="c">智慧型手機、LINE、IG、2011 Dcard<br>K-POP、韓劇、2016 Netflix 來台</div><div class="c">2014 十二年國教、2019 108 課綱<br>2016 工時改為每週 40 小時</div>
    <div class="rh">2020 年代<small>中學〜社會人士<br>（2026 年時 14〜29 歲）</small></div><div class="c k">在不確定的未來中重新選擇生活方式</div><div class="c">COVID-19<br>半導體與 AI 帶動成長<br>物價、房價負擔成為課題</div><div class="c">短影音、Threads；2022 底生成式 AI 普及（假資訊挑戰）<br>2023 青年文化幣</div><div class="c">2021 全國停課、遠距辦公<br>生成式 AI 改變工作方式</div>
  </div>`);

add('gdp','人均 GDP',`
  <div class="eyebrow">人均 GDP</div><h2>台灣 GDP 一路成長，<span class="hl">2024 年超越日本</span></h2>
  <div style="flex:1;min-height:0;margin-top:20px">${lineChart({w:1380,h:560,x:[1990,2025],y:[0,60000],xt:[1990,1995,2000,2005,2010,2015,2020,2025],yt:[0,10000,20000,30000,40000,50000,60000],yf:v=>v?(v/1000)+'k':'0',band:[[1997,2012,'#e2f3e7','Z世代出生（1997–2012）']],pr:170,
    series:[{c:'#2f6bff',pts:[[1990,26399],[1995,44967],[2000,39818],[2005,38183],[2010,45539],[2015,35690],[2020,41269],[2025,36119]],name:'日本',ny:26,nw:90,labels:[[0,'26,399',14,-14,'start'],[7,'36,119',-14,40,'end']]},
            {c:'#1ea653',pts:[[1990,8167],[1995,13173],[2000,14930],[2005,16402],[2010,19201],[2015,22736],[2020,28764],[2025,39512]],name:'台灣',ny:-26,nw:90,labels:[[0,'8,167',14,-14,'start'],[7,'39,512',-14,-22,'end']]}]})}</div>
  <div style="display:flex;gap:30px;font-size:24px;font-weight:700"><span class="jp">● 誕生於經濟成熟期的日本 Z 世代</span><span class="g">● 成長於經濟上升期的台灣 Z 世代</span></div>
  <div class="src" style="left:auto;right:110px">單位：美元　資料來源：IMF</div>`);

add('salary','消費者物價指數與起薪',`
  <div class="eyebrow">消費者物價指數與大專畢業生起薪</div><h2>應屆畢業生的起薪漲幅<span class="hl">高於物價漲幅</span></h2>
  <div class="chart-box" style="margin-top:30px">
    <div class="legend"><span><i style="background:#c9c7d1"></i>消費者物價指數（2010 = 100）</span><span><i style="background:var(--g)"></i>大專畢業生平均月薪漲幅</span></div>
    <div class="area">${(()=>{const cpi=[100,101.5,103.5,104.5,105.5,105.5,107,107.5,109,109.5,109,111.5,114.5,117.5,120,122];
      const W=1300,H=440,L=50,B=40,T=20,bw=46,gap=(W-L-40)/16; const sy=v=>H-B-(v/200)*(H-B-T);
      let g=`<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%">`;
      g+=`<rect x="${L+9*gap}" y="${T}" width="${7*gap}" height="${H-B-T}" fill="#ffd23f" opacity=".3"/><text x="${L+12.5*gap}" y="${T+28}" text-anchor="middle" font-size="22" font-weight="900" fill="#17191a">Z 世代陸續從大學畢業／進入職場</text>`;
      cpi.forEach((v,i)=>{const x=L+i*gap+(gap-bw)/2; g+=`<rect class="gb" style="transform-origin:0 ${H-B}px" x="${x}" y="${sy(v)}" width="${bw}" height="${H-B-sy(v)}" rx="6" fill="#c9c7d1" stroke="#17191a" stroke-width="2"/><text x="${x+bw/2}" y="${H-12}" text-anchor="middle" font-size="17" fill="#767b77">${2010+i}</text>`;});
      const x0=L+gap/2, x1=L+15.5*gap;
      g+=`<path class="ln" pathLength="1" d="M${x0} ${sy(100)} L${x1} ${sy(138)}" stroke="#19a957" stroke-width="7" stroke-dasharray="14 10" fill="none"/><circle cx="${x0}" cy="${sy(100)}" r="9" fill="#19a957" stroke="#17191a" stroke-width="3"/><circle cx="${x1}" cy="${sy(138)}" r="9" fill="#19a957" stroke="#17191a" stroke-width="3"/>`;
      g+=`<text x="${L+0.4*gap}" y="${sy(170)+40}" font-family="Bricolage Grotesque" font-size="54" font-weight="800" fill="#0d6b35">起薪 +38%</text><text x="${L+0.4*gap}" y="${sy(170)+86}" font-family="Bricolage Grotesque" font-size="38" font-weight="800" fill="#6f7773">物價 +22%</text>`;
      return g+'</svg>';})()}</div>
  </div>
  <div class="src">2010→2025　資料來源：行政院主計總處（消費者物價指數）、勞動部（大專畢業生平均月薪；圖中只標示起訖漲幅）</div>`);

add('hours','20–29 歲每週工作時數',`
  <div class="eyebrow">20–29 歲每週工作時數</div><h2>長工時比例減少，<span class="hl">時間更為充裕</span></h2>
  <div class="chart-box" style="margin-top:30px"><div class="q nq">20–29 歲青年就業者之主要工作每週工作時數占比</div>
    <div class="area">${lineChart({w:1300,h:470,x:[2013,2025],y:[0,100],xt:[2013,2016,2019,2022,2025],yt:[0,20,40,60,80,100],yf:v=>v+'%',pl:70,pr:180,
      series:[{c:'#19a957',dots:1,pts:[[2013,56],[2016,67],[2019,73],[2022,82],[2025,84]],name:'44 小時以下',nw:150,labels:[[0,'56%',0,-20],[4,'84%',0,-20]]},{c:'#6f7773',dots:1,pts:[[2013,44],[2016,33],[2019,27],[2022,18],[2025,16]],name:'45 小時以上',nw:150,labels:[[0,'44%',0,36],[4,'16%',0,36]]}]})}</div>
  </div>
  <div class="src">資料來源：行政院主計總處「人力資源調查統計」</div>`);

add('outlook','對生活的展望',`
  <div class="eyebrow">對生活的展望（台灣 vs. 日本）</div><h2>對經濟前景抱持樂觀，同時也對社會變化感到不安</h2>
  <div class="body-row">
    ${chartBox('您對未來生活的經濟狀況有何看法？（「會變得比較輕鬆」合計）', twjp([65.0,20.9],65,330,'%'))}
    ${chartBox('現在社會上的變化太多了', twjp([46.6,30.8],65,330,'%'))}
  </div>
  <div class="src">資料來源：台灣生活定點調查</div>`);

add('marriage','平均初婚年齡',`
  <div class="eyebrow">平均初婚年齡</div><h2>初婚年齡延後，Z 世代多數處於未婚狀態</h2>
  <div style="flex:1;min-height:0;margin-top:20px">${lineChart({w:1380,h:560,x:[1990,2025],y:[20,36],xt:[1990,1995,2000,2005,2010,2015,2020,2025],yt:[20,24,28,32,36],yf:v=>v+'歲',pr:170,
    series:[{c:'#2f6bff',dots:1,pts:[[1990,29.0],[1995,30.1],[2000,30.3],[2005,30.6],[2010,31.8],[2015,32.3],[2020,32.3],[2025,33.4]],name:'男性',nw:90,labels:[[0,'29.0',0,-18],[7,'33.4',0,-18]]},
            {c:'#d64561',dots:1,pts:[[1990,25.8],[1995,28.2],[2000,26.0],[2005,27.4],[2010,29.2],[2015,30.0],[2020,30.3],[2025,31.4]],name:'女性',nw:90,labels:[[0,'25.8',0,34],[7,'31.4',0,36]]}]})}</div>
  <div class="src" style="left:auto;right:110px">資料來源：內政部戶政司</div>`);

add('sns','SNS 使用率',`
  <div class="eyebrow">SNS 使用率</div><h2>依不同需求，<span class="hl">靈活運用多種 SNS</span> 的年輕族群</h2>
  <div class="legend" style="margin-top:26px;font-size:22px"><span><i style="background:var(--g)"></i>20–29 歲</span><span><i style="background:#c3c9c5"></i>30–39 歲</span><span><i style="background:#9aa29d"></i>40–49 歲</span><span><i style="background:#6f7773"></i>50–59 歲</span></div>
  <div class="body-row" style="margin-top:16px">
    <div class="chart-box" style="flex:.8"><div class="q nq">各世代都普遍使用</div><div class="area">${['LINE','Facebook'].map((n,k)=>{const v=[[78,85,96,92],[67,79,85,88]][k];return `<div style="display:inline-flex;flex-direction:column;width:48%;height:100%;vertical-align:top"><div style="flex:1;display:flex;align-items:flex-end;gap:6px;justify-content:center">${v.map((x,i)=>`<div style="width:36px;height:${x*3.2}px;background:${['var(--g)','#c3c9c5','#9aa29d','#6f7773'][i]};border-radius:5px 5px 0 0;position:relative">${i==0?`<b style="position:absolute;top:-34px;left:50%;transform:translateX(-50%);font-size:24px;color:var(--g3)">${x}%</b>`:''}</div>`).join('')}</div><div style="text-align:center;font-size:24px;font-weight:700;margin-top:10px">${n}</div></div>`}).join('')}</div></div>
    <div class="chart-box" style="flex:1.2;background:#eef7f1;border-color:#c4e7cf"><div class="q nq">年輕族群使用較多</div><div class="area">${['Instagram','Threads','Dcard'].map((n,k)=>{const v=[[67,63,54,40],[49,42,34,26],[46,31,16,9]][k];return `<div style="display:inline-flex;flex-direction:column;width:33%;height:100%;vertical-align:top"><div style="flex:1;display:flex;align-items:flex-end;gap:6px;justify-content:center">${v.map((x,i)=>`<div style="width:36px;height:${x*3.2}px;background:${['var(--g)','#c3c9c5','#9aa29d','#6f7773'][i]};border-radius:5px 5px 0 0;position:relative">${i==0?`<b style="position:absolute;top:-34px;left:50%;transform:translateX(-50%);font-size:24px;color:var(--g3)">${x}%</b>`:''}</div>`).join('')}</div><div style="text-align:center;font-size:24px;font-weight:700;margin-top:10px">${n}</div></div>`}).join('')}</div></div>
  </div>
  <div class="src">資料來源：MIC 媒體接觸狀況調查（30–59 歲數值依原始圖表換算）</div>`);

add('ai','AI 的運用方式',`
  <div class="eyebrow">AI 的運用方式</div><h2>Z 世代廣泛運用 AI：除了工作、翻譯，<br>更涵蓋<span class="hl">學習、內容創作及諮詢陪伴</span></h2>
  <div class="legend" style="margin-top:22px;font-size:22px"><span><i style="background:var(--g)"></i>20–29 歲</span><span><i style="background:#a9b0ac"></i>50–59 歲</span></div>
  <div class="body-row" style="margin-top:6px;gap:0">
    ${[['解答問題與提供資訊',51,57],['語音・文字翻譯轉換',42,43],['專業決策或分析輔助',41,25],['創意與內容創作協作',32,20],['情緒支持或陪伴互動',29,11]].map((a,i)=>`
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;${i>=2?'background:#eef7f1;':''}${i==2?'border-radius:18px 0 0 18px;':''}${i==4?'border-radius:0 18px 18px 0;':''}padding:16px 0">
        <div style="flex:1;display:flex;align-items:flex-end;gap:10px">
          <div style="display:flex;flex-direction:column;align-items:center"><b style="font-size:30px;color:var(--g3)">${a[1]}%</b><div style="width:70px;height:${a[1]*5.4}px;background:var(--g);border-radius:6px 6px 0 0"></div></div>
          <div style="display:flex;flex-direction:column;align-items:center"><span style="font-size:22px;color:var(--mute)">${a[2]}%</span><div style="width:70px;height:${a[2]*5.4}px;background:#a9b0ac;border-radius:6px 6px 0 0"></div></div>
        </div>
        <div style="font-size:22px;font-weight:700;margin-top:14px;text-align:center">${a[0]}</div>
      </div>`).join('')}
  </div>
  <div class="src">資料來源：MIC 媒體接觸狀況調查</div>`);

add('view','我們如何看待 Z 世代',`
  <div class="eyebrow">小結</div><h2>我們如何看待 Z 世代</h2>
  <div style="display:flex;flex-direction:column;gap:26px;margin-top:60px">
    ${['享受運用新媒體，也樂於分享資訊的人們','引領新型消費模式與流行趨勢的人們','對企業而言，將成為未來顧客群的人們'].map((t,i)=>`<div class="card ${['','y','pp'][i]}" style="display:flex;align-items:center;gap:30px;padding:24px 40px">${ib(['phone','spark','users'][i],['g','c','p'][i])}<div style="font-size:40px;font-weight:700">${t}</div></div>`).join('')}
  </div>
  <p class="lead" style="margin-top:40px">但光看「做了什麼」還不夠——要問的是：<b>他們的力氣用在哪裡？</b></p>`);

/* ===== 04 Z 世代如何用力 ===== */
add('actions','由年輕族群開始的行動',`
  <div class="eyebrow">家訪中看到的日常</div>
  <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:22px;margin-top:10px">
    ${[['bolt','匹克球、運動穿搭','c'],['heart','透明痛包、娃娃吊飾','p'],['spark','應援手燈、公仔收藏','y'],null,['chat','偶像生日應援咖啡廳','g'],['eye','帶著相機去海邊旅行','p'],['users','朋友夜晚聚會','c']].map(t=> t===null
      ? `<div class="card" style="background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;text-align:center;font-size:42px;font-weight:900;line-height:1.35">由年輕族群<br>開始的行動</div>`
      : `<div class="card ${({c:'c',p:'pp',y:'y',g:'soft'})[t[2]]}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center"><span class="ib ${t[2]==='y'?'':t[2]}" style="width:96px;height:96px">${icon(t[0],46)}</span><div style="font-size:28px;font-weight:900">${t[1]}</div></div>`).join('')}
    <div class="card y" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center"><div style="font-size:30px;font-weight:900">「這個也要花錢？」</div><div style="font-size:30px;font-weight:900">「怎麼省成這樣？」</div></div>
  </div>`);

add('s4','04 Z 世代如何用力',`<div class="no">04</div><h2>Z 世代如何「用力」</h2><p>我們著眼於台灣年輕族群的特徵行動</p><div class="line"></div>`,'section');

add('axis1','用力的方向',`
  <div class="eyebrow">分析框架</div><h2>第一個軸：用力的<span class="hl">方向</span></h2>
  <div style="flex:1;position:relative">
    <svg viewBox="0 0 1380 520" width="100%" height="100%"><line class="ln" pathLength="1" x1="200" y1="260" x2="1180" y2="260" stroke="#17191a" stroke-width="6"/><polygon points="200,244 168,260 200,276" fill="#17191a"/><polygon points="1180,244 1212,260 1180,276" fill="#17191a"/>
    <text x="110" y="276" text-anchor="middle" font-size="52" font-weight="900">自我</text><text x="1290" y="276" text-anchor="middle" font-size="52" font-weight="900">他人</text>
    <text x="690" y="340" text-anchor="middle" font-size="38" font-weight="700" fill="#3b3f3d">力氣是為了自己，還是為了在乎的人？</text></svg>
  </div>`);

add('axis2','用力的程度',`
  <div class="eyebrow">分析框架</div><h2>第二個軸：用力的<span class="hl">程度</span></h2>
  <div style="flex:1;position:relative">
    <svg viewBox="0 -20 1380 640" width="100%" height="100%"><line class="ln" pathLength="1" x1="690" y1="70" x2="690" y2="540" stroke="#17191a" stroke-width="6"/><polygon points="674,70 690,38 706,70" fill="#17191a"/><polygon points="674,540 690,572 706,540" fill="#17191a"/>
    <text x="690" y="26" text-anchor="middle" font-size="44" font-weight="900">保留</text><text x="690" y="600" text-anchor="middle" font-size="44" font-weight="900">全力</text>
    <text x="740" y="315" font-size="38" font-weight="700" fill="#3b3f3d">要拼，還是不要拼？</text></svg>
  </div>`);

add('axes','用力的方向 × 程度',`
  <div class="eyebrow">分析框架</div><h2>用力的<span class="hl">「方向」</span>×<span class="hl">「程度」</span>，分出四個象限</h2>
  <div class="body-row" style="margin-top:30px;gap:60px">
    <div class="col" style="flex:.8;justify-content:center;gap:30px">
      <div class="card"><div class="num">方向（橫軸）</div><h3>自我 ⟷ 他人</h3><p>力氣是用在自己身上，還是用在與他人的關係上？</p></div>
      <div class="card"><div class="num">程度（縱軸）</div><h3>保留 ⟷ 全力</h3><p>是有所保留，還是全力投入？</p></div>
    </div>
    <div class="col" style="flex:1.2;padding:50px 90px">${quad([{cls:'dim',raw:'<div style="font-size:30px;font-weight:900;color:#aaa;text-align:center">I</div>'},{cls:'dim',raw:'<div style="font-size:30px;font-weight:900;color:#aaa;text-align:center">II</div>'},{cls:'dim',raw:'<div style="font-size:30px;font-weight:900;color:#aaa;text-align:center">III</div>'},{cls:'dim',raw:'<div style="font-size:30px;font-weight:900;color:#aaa;text-align:center">IV</div>'}])}</div>
  </div>`);

/* --- I 定義自我 --- */
add('q1','象限 I：他人 × 保留',`
  <div class="eyebrow">象限 I ・ 他人 × 保留</div><h2>定義自我</h2>
  <div style="flex:1;padding:50px 120px 40px;display:flex;flex-direction:column">${quad([{...Q.I,cls:'on'},null,null,null])}</div>`);

add('q1caseA','自我介紹：主動幫自己貼標籤',`
  ${caseLayout({eyebrow:'象限 I ・ 定義自我',tag:'自我介紹',icon:'tag',h:'主動幫自己<span class="hl">貼標籤</span>',q:'我覺得自己算是比較偏 I，<b>應該是 I 型吧。</b>',who:'高雄小港 游小姐',visual:`<div class="card" style="width:600px;padding:26px 30px;transform:rotate(-2deg)"><div style="display:flex;align-items:center;gap:14px;margin-bottom:20px"><span class="pill z" style="font-size:22px">About me</span><span style="font-size:20px;color:var(--mute)">第一週的自我介紹</span></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${[['globe','#高雄人','#INTJ'],['bolt','#逛市集','#騎腳踏車'],['heart','#拍照','#咖啡']].map(t=>`<div style="background:var(--p2);border:2px solid var(--ink);border-radius:14px;height:150px;display:flex;align-items:center;justify-content:center">${icon(t[0],60)}</div>`).join('')}
  ${[['#高雄人','#INTJ'],['#逛市集','#騎腳踏車'],['#拍照','#咖啡']].map(t=>`<div style="display:flex;flex-direction:column;gap:6px;align-items:center">${t.map(x=>`<span class="pill" style="background:${x==='#INTJ'?'var(--y)':'#fff'};font-size:20px">${x}</span>`).join('')}</div>`).join('')}</div></div>`})}`);

add('q1caseB','社群發文：希望被關注但不想被解讀',`
  ${caseLayout({eyebrow:'象限 I ・ 定義自我',tag:'社群發文',icon:'phone',h:'希望被關注<br><span class="hl">但不想被解讀</span>',q:'貼文會顯示按讚數，會一直留在頁面上被看到，有種一直被評價的感覺。<br><b>但限時動態不會留下來，比較不用在意別人的眼光，也比較容易發。</b>',who:'高雄三民 郭小姐',visual:`<div style="display:flex;gap:30px">
  <div class="card" style="width:300px;padding:20px;border-radius:30px"><div style="display:flex;align-items:center;gap:14px"><div class="circle" style="width:70px;height:70px;background:var(--p2)">${icon('user',34)}</div>
    <div style="display:flex;gap:14px;text-align:center"><div style="border:3px solid var(--c);border-radius:50%;width:58px;height:58px;display:flex;flex-direction:column;justify-content:center"><b style="font-size:22px">8</b><span style="font-size:12px">貼文</span></div><div><b style="font-size:22px">475</b><div style="font-size:12px">粉絲</div></div><div><b style="font-size:22px">601</b><div style="font-size:12px">追蹤中</div></div></div></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:20px">${Array.from({length:6}).map((_,i)=>`<div style="aspect-ratio:1;background:${['#c9c7d1','#ebe4ff','#d6f4e1','#ffe0d6','#fff1bf','#e4ebff'][i]}"></div>`).join('')}</div>
    <div style="text-align:center;font-size:20px;font-weight:900;margin-top:14px">貼文：只有 8 篇</div></div>
  <div class="card" style="width:300px;padding:20px;border-radius:30px"><div style="text-align:center;font-size:18px;color:var(--mute);font-weight:700">限時動態典藏・2025 年 8 月</div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:14px">${Array.from({length:31}).map((_,i)=>`<div style="aspect-ratio:1;border-radius:50%;background:${i%9===4?'#ebe4ff':'var(--ink)'};color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center">${i+1}</div>`).join('')}</div>
    <div style="text-align:center;font-size:20px;font-weight:900;margin-top:14px">限動：幾乎每天都發</div></div></div>`})}`);

add('q1data','定義自我：數據',`
  <div class="eyebrow">象限 I ・ 定義自我</div><h2>會依社群切換自己的樣子；人際關係是壓力來源</h2>
  <div class="body-row">
    ${chartBox('我會根據不同社群媒體的屬性，切換我呈現給別人的樣子', zyx([82.3,76.0,61.3],85,320))}
    <div class="chart-box"><div class="q">壓力來源</div><div class="legend" style="margin:6px 0 10px"><span><i style="background:var(--g)"></i>台灣 Z 世代</span><span><i style="background:var(--jp)"></i>日本 Z 世代</span></div><div class="area">
      ${[['職場／學校中的人際關係',48.2,42.5],['家庭中的人際關係',34.4,30.8],['網路上的人際關係',18.8,11.5],['鄰里間的人際關係',11.6,7.0]].map(r=>`<div class="hrow"><div class="lab">${r[0]}</div><div class="bars"><div class="hb"><i style="width:${r[1]*7}px;background:var(--g)"></i>${r[1]}</div><div class="hb" style="color:var(--jp)"><i style="width:${r[2]*7}px;background:var(--jp)"></i>${r[2]}</div></div></div>`).join('')}
    </div></div>
  </div>
  <div class="src">單位：%</div>`);

add('q1vs','定義自我：世代對比',`
  <div class="eyebrow">象限 I ・ 定義自我</div><h2>同樣是「呈現自己」，出發點不同</h2>
  ${vsBlock('會根據與他人的關係<br>選擇性地呈現自己希望被看見的一面','為了向所有人展現<br>更好的自己而發布資訊')}`);

/* --- II 管理標準 --- */
add('q2','象限 II：自我 × 保留',`
  <div class="eyebrow">象限 II ・ 自我 × 保留</div><h2>管理標準</h2>
  <div style="flex:1;padding:50px 120px 40px;display:flex;flex-direction:column">${quad([{...Q.I,cls:'dim'},{...Q.II,cls:'on'},null,null])}</div>`);

add('q2caseA','工作型態：刻意讓自己的職能降級',`
  ${caseLayout({eyebrow:'象限 II ・ 管理標準',tag:'工作型態',icon:'briefcase',h:'刻意讓自己的<br><span class="hl">職能降級</span>',q:'在公司上班的話，薪水差不多就是那樣，<b>而且會一直被綁在那裡</b>，不太自由。<br>我覺得現在已經不是<b>只靠一份收入生活的時代了。</b>',who:'台中潭子 許先生',visual:`<div style="display:flex;flex-direction:column;gap:24px;width:560px">
  <div class="card y" style="display:flex;align-items:center;gap:24px">${ib('book','w',36)}<div><div style="font-size:32px;font-weight:900">補習班教課</div><div style="font-size:22px;color:var(--ink2)">用自己的專長賺錢</div></div></div>
  <div class="card c" style="display:flex;align-items:center;gap:24px">${ib('plane','w',36)}<div><div style="font-size:32px;font-weight:900">跑外送</div><div style="font-size:22px;color:var(--ink2)">時間自己安排</div></div></div>
  <div class="card" style="display:flex;align-items:center;gap:24px">${ib('briefcase','p',36)}<div><div style="font-size:32px;font-weight:900;color:var(--mute);text-decoration:line-through">一份正職綁一輩子</div><div style="font-size:22px;color:var(--ink2)">不急著正式進入職場</div></div></div></div>`})}`);

add('q2caseB','繳交期限：在最後期限前壓線交出',`
  ${caseLayout({eyebrow:'象限 II ・ 管理標準',tag:'繳交期限',icon:'clock',h:'在最後期限前<br><span class="hl">壓線交出</span>',q:'除了研究報告之外，我還有其他想做的事，<b>所以就算提早做完，也不會立刻交出去。</b>',who:'台北信義 陳先生',visual:`<div class="card" style="width:560px;padding:0;overflow:hidden;background:#fdf3dc"><div style="background:var(--ink);color:#fff;font-size:22px;font-weight:700;padding:12px 20px">研究所同學　<span style="opacity:.6;font-size:18px">Today</span></div>
  <div style="padding:20px 22px;display:flex;flex-direction:column;gap:12px;font-size:25px">
  ${[['l','你這週報告寫了嗎？'],['l','我要鼠了 🐭'],['r','剛寫好'],['r','但我打算禮拜二再交'],['l','幹嘛不先上傳'],['r','藏一下進度 😍']].map(m=>`<div style="align-self:${m[0]==='l'?'flex-start':'flex-end'};display:flex;align-items:flex-end;gap:8px;${m[0]==='r'?'flex-direction:row-reverse':''}"><div style="background:${m[0]==='l'?'#fff':'#c8f7a6'};border:2px solid var(--ink);border-radius:20px;padding:8px 18px;font-weight:700">${m[1]}</div><span style="font-size:14px;color:var(--mute)">${m[0]==='r'?'已讀 ':''}00:0${['2','2','2','2','3','4'][0]}</span></div>`).join('')}
  </div></div>`})}`);

add('q2data','管理標準：數據',`
  <div class="eyebrow">象限 II ・ 管理標準</div><h2>量太大時主動降標；準時就好，不必提早</h2>
  <div class="body-row">
    ${chartBox('當工作量／課業量太大時，我會主動降低品質標準', zyx([62.7,54.0,46.7],65,320))}
    ${chartBox('不會提早到公司，只要來得及在上班時間前到就好', twjp([34.8,28.9],65,320))}
  </div><div class="src">單位：%</div>`);

add('q2vs','管理標準：世代對比',`
  <div class="eyebrow">象限 II ・ 管理標準</div><h2>標準設多高，背後的理由不同</h2>
  ${vsBlock('為了保有生活的餘裕<br>而刻意降低標準','為了證明自身能力<br>而設定高標準')}`);

/* --- III 投入資源 --- */
add('q3','象限 III：自我 × 全力',`
  <div class="eyebrow">象限 III ・ 自我 × 全力</div><h2>投入資源</h2>
  <div style="flex:1;padding:50px 120px 40px;display:flex;flex-direction:column">${quad([{...Q.I,cls:'dim'},{...Q.II,cls:'dim'},{...Q.III,cls:'on'},null])}</div>`);

add('q3caseA','值得努力的部分：在心中對效益有一套精明盤算',`
  ${caseLayout({eyebrow:'象限 III ・ 投入資源',tag:'值得努力的部分',icon:'trophy',h:'在心中對<span class="hl">效益</span><br>有一套精明盤算',q:'喜歡效益比較大的事情，經營成 KOL 我評估好多人在做，做起來可能每天要花太多時間。<br>所以<b>現在有在分享證照怎麼考到，很直接就是要賣我的講義</b>、跟輔導做企劃書提案的計畫。',who:'新北板橋 林先生',visual:`<div class="card" style="width:600px;padding:0;overflow:hidden;transform:rotate(-2deg)"><div style="background:var(--c);color:#fff;padding:20px 26px;border-bottom:3px solid var(--ink)"><div style="font-size:46px;font-weight:900;font-style:italic">這樣 Sale 也可以！</div><div style="font-size:24px;font-weight:700">創意點子王銷售競賽・頒獎典禮</div></div>
  <div style="padding:26px;display:flex;align-items:center;gap:26px"><div class="circle" style="width:150px;height:150px;background:var(--y);flex:none;font-size:70px">★</div><div><div style="font-size:30px;font-weight:900">明日之星獎</div><div style="font-family:var(--disp);font-size:64px;font-weight:800;color:var(--g3)">100,000 元</div></div></div>
  <div style="padding:0 26px 22px;display:flex;gap:10px;flex-wrap:wrap">${['社團','營隊','競賽','多張證照'].map(t=>`<span class="pill" style="background:var(--p2)">${t}</span>`).join('')}</div></div>`})}`);

add('q3caseB','先認同再行動：想確認自己付出的意義',`
  ${caseLayout({eyebrow:'象限 III ・ 投入資源',tag:'先認同再行動',icon:'target',h:'想確認自己<br><span class="hl">付出的意義</span>',q:'我會<b>希望可以先告訴我為什麼要做、目的是什麼，再去行動。</b>而不是都不知道就傻傻地做。',who:'台北大安 陳小姐',visual:`<div style="display:flex;flex-direction:column;gap:22px;width:560px">
  <div class="card" style="align-self:flex-start;max-width:420px;border-radius:24px 24px 24px 6px"><div style="font-size:18px;color:var(--mute);font-weight:700">主管</div><div style="font-size:30px;font-weight:900">這個新任務，交給你喔</div></div>
  <div class="card g" style="align-self:flex-end;max-width:460px;border-radius:24px 24px 6px 24px"><div style="font-size:18px;font-weight:700;opacity:.85">我</div><div style="font-size:30px;font-weight:900">好的！想先確認：<br>為什麼要做？目的是什麼？</div></div>
  <div class="card y" style="align-self:flex-start;max-width:420px;border-radius:24px 24px 24px 6px;font-size:26px;font-weight:700">先認同，再行動 ✓</div></div>`})}`);

add('q3data','投入資源：數據',`
  <div class="eyebrow">象限 III ・ 投入資源</div><h2>先算投資報酬率；積極取得對未來有幫助的證照</h2>
  <div class="body-row">
    ${chartBox('做決定前，我會先計算這件事的「投資報酬率」', zyx([79.0,75.7,66.0],80,320))}
    ${chartBox('已經取得對將來有幫助的資格證照', zyx([71.3,63.0,64.3],80,320))}
  </div><div class="src">單位：%</div>`);

add('q3vs','投入資源：世代對比',`
  <div class="eyebrow">象限 III ・ 投入資源</div><h2>同樣是努力，判斷依據不同</h2>
  ${vsBlock('對於能看到效果的事<br>才會積極投入心力','對眼前該做的事<br>踏實努力')}`);

/* --- IV 創造互惠 --- */
add('q4','象限 IV：他人 × 全力',`
  <div class="eyebrow">象限 IV ・ 他人 × 全力</div><h2>創造互惠</h2>
  <div style="flex:1;padding:50px 120px 40px;display:flex;flex-direction:column">${quad([{...Q.I,cls:'dim'},{...Q.II,cls:'dim'},{...Q.III,cls:'dim'},{...Q.IV,cls:'on'}])}</div>`);

add('q4caseA','和家人的關係：希望以對等的關係回饋家人',`
  ${caseLayout({eyebrow:'象限 IV ・ 創造互惠',tag:'和家人的關係',icon:'home',h:'希望以<span class="hl">對等的關係</span><br>回饋家人',q:'今年和父母一起在日本旅行。<b>住宿和行程全都由我安排，旅費則是父母出</b>；大家各自用<b>自己擅長的方式</b>為這趟旅行出力。老實說有點累，但明年還想再去一次。',who:'台北內湖 黃小姐',visual:`<div class="card" style="width:600px;padding:0;overflow:hidden;transform:rotate(2deg)"><div style="height:250px;background:linear-gradient(#cdeccf,#7cc08a);position:relative;border-bottom:3px solid var(--ink)">
  <svg viewBox="0 0 600 250" width="100%" height="100%"><path d="M0 170 L120 70 L220 150 L330 50 L460 160 L600 80 V250 H0z" fill="#3f8f57" stroke="#17191a" stroke-width="3"/><rect x="60" y="175" width="480" height="50" rx="10" fill="#8a3b2e" stroke="#17191a" stroke-width="3"/>${[0,1,2,3,4].map(i=>`<rect x="${80+i*92}" y="185" width="60" height="22" rx="4" fill="#fff1bf" stroke="#17191a" stroke-width="2"/>`).join('')}<line x1="40" y1="230" x2="560" y2="230" stroke="#17191a" stroke-width="4"/></svg>
  <span class="pill" style="position:absolute;left:18px;top:16px;background:#fff">黑部峽谷小火車・日本家族旅行</span></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
  <div style="padding:20px 24px;border-right:3px solid var(--ink)"><div style="font-size:20px;color:var(--mute);font-weight:700">我負責</div><div style="font-size:30px;font-weight:900">住宿＋行程規劃</div><div style="font-size:20px">（會日文、擅長查資料）</div></div>
  <div style="padding:20px 24px"><div style="font-size:20px;color:var(--mute);font-weight:700">爸媽負責</div><div style="font-size:30px;font-weight:900">旅費</div></div></div></div>`})}`);

add('q4caseB','主動回饋的精神：希望發揮專長回饋周遭的人',`
  ${caseLayout({eyebrow:'象限 IV ・ 創造互惠',tag:'主動回饋的精神',icon:'heart',h:'希望<span class="hl">發揮專長</span><br>回饋周遭的人',q:'我現在會回學校帶學弟妹，這真的是我自己想做的。<b>其實有沒有報酬沒有太大關係</b>，我只是希望把我們一路承接下來的東西，再傳給下一個世代。',who:'高雄鳳山 莊小姐',visual:`<div style="display:flex;gap:30px;align-items:center">
  <div class="card" style="width:250px;height:360px;background:linear-gradient(160deg,#3d7bff,#a98cff);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;clip-path:polygon(50% 0,100% 18%,100% 100%,0 100%,0 18%)">${icon('trophy',80)}<div style="font-size:40px;font-weight:900">優勝</div><div style="font-size:18px">全國技能競賽</div></div>
  <div class="circle" style="width:270px;height:270px;background:radial-gradient(#f3f3f3,#bfc3c6);box-shadow:7px 7px 0 var(--ink);flex-direction:column"><div style="font-family:var(--disp);font-size:70px;font-weight:800;line-height:1">54</div><div style="font-size:26px;font-weight:900">第 54 屆</div><div style="font-size:20px;font-weight:700">全國技能競賽</div></div></div>`})}`);

add('q4data','創造互惠：數據',`
  <div class="eyebrow">象限 IV ・ 創造互惠</div><h2>和父母像朋友；為家庭付出是「自己的選擇」</h2>
  <div class="body-row">
    ${[['和父母的關係','朋友／平輩','階級／上下關係',[63.3,61.7,49.0]],['對家庭的貢獻','自己的選擇','責任・義務',[60.7,50.0,47.3]]].map(c=>`
    <div class="chart-box"><div class="q">${c[0]}</div><div class="legend" style="margin:4px 0 12px"><span><i style="background:var(--g)"></i>${c[1]}</span><span><i style="background:#4a524e"></i>${c[2]}</span></div>
      <div class="area" style="display:flex;gap:40px;justify-content:center;align-items:stretch">
        ${c[3].map((v,i)=>`<div style="display:flex;flex-direction:column;align-items:center;width:120px"><div style="flex:1;width:100%;display:flex;flex-direction:column;border-radius:8px;overflow:hidden"><div style="flex:${100-v};background:#4a524e;color:#fff;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center">${(100-v).toFixed(1)}</div><div style="flex:${v};background:${i?'#9fd8b4':'var(--g)'};color:#fff;font-size:30px;font-weight:900;display:flex;align-items:center;justify-content:center">${v}</div></div><div style="margin-top:10px;font-size:22px;font-weight:700">${i?['','Y世代','X世代'][i]:'<span class="pill z">Z世代</span>'}</div></div>`).join('')}
      </div></div>`).join('')}
  </div><div class="src">單位：%</div>`);

add('q4vs','創造互惠：世代對比',`
  <div class="eyebrow">象限 IV ・ 創造互惠</div><h2>同樣是為別人付出，關係的想像不同</h2>
  ${vsBlock('發揮自己擅長的優勢<br>同時為他人和自己帶來助益','在既有的角色分工中<br>享有對自己有利的成果')}`);

add('quadall','四個象限總覽',`
  <div class="eyebrow">小結</div><h2>Z 世代用力的四種樣貌</h2>
  <div style="flex:1;padding:44px 120px 36px;display:flex;flex-direction:column">${quad([Q.I,Q.II,Q.III,Q.IV])}</div>`);

/* ===== 05 劃界線 ===== */
add('s5','05 核心洞察：劃界線',`<div class="no">05</div><h2>核心洞察：劃界線</h2><p>Z 世代特徵行動的洞察：四種行為背後，其實是同一件事</p><div class="line"></div>`,'section');

add('line1','對關係 劃界線',`
  ${lineSlide({tag:'定義自我',def:'會根據與他人的關係，選擇性地呈現自己希望被看見的一面。',rows:[['先定義自己的角色','避免被他人任意解讀'],['不想因為誤解','精神內耗']],line:'對關係',svg:`<svg viewBox="0 0 520 460" width="100%" height="100%"><line class="ln" pathLength="1" x1="40" y1="90" x2="400" y2="430" stroke="#19a957" stroke-width="10" stroke-linecap="round"/>${[[250,140],[330,140],[410,140],[290,260],[370,260],[450,260]].map(p=>P(p[0],p[1],'#9aa09c',.9)).join('')}<circle cx="140" cy="360" r="90" fill="#d6f4e1" stroke="#17191a" stroke-width="3"/>${P(110,410,'#19a957',.9)}${P(170,410,'#17191a',.9)}${LIKE(60,250)}</svg>`})}`);

add('line2','對目標水準 劃界線',`
  ${lineSlide({tag:'管理標準',def:'為了保有生活的餘裕，刻意降低標準。',rows:[['即使有能力','也不希望「由自己來做」變成理所當然'],['在能力範圍內盡到責任','不消耗自己']],line:'對目標水準',svg:`<svg viewBox="0 0 520 460" width="100%" height="100%"><rect x="40" y="40" width="190" height="170" rx="20" fill="#fff" stroke="#17191a" stroke-width="4"/><rect x="290" y="40" width="190" height="170" rx="20" fill="#fff" stroke="#17191a" stroke-width="4"/><g transform="translate(135,105)">${icon('briefcase',60).replace('<svg','<svg x="-30" y="-30"')}</g><g transform="translate(385,105)">${icon('home',60).replace('<svg','<svg x="-30" y="-30"')}</g><text x="135" y="180" text-anchor="middle" font-size="26" font-weight="700">Work Space</text><text x="385" y="180" text-anchor="middle" font-size="26" font-weight="700">Private Space</text><line class="ln" pathLength="1" x1="260" y1="30" x2="260" y2="330" stroke="#19a957" stroke-width="10" stroke-linecap="round"/>${P(260,440,'#19a957',1)}${LIKE(200,300)}</svg>`})}`);

add('line3','對未來價值 劃界線',`
  ${lineSlide({tag:'投入資源',def:'對於能看到效果的事，才會積極投入心力。',rows:[['想做／必須做的事很多','希望選擇能讓自己看到可能性的事'],['看不到回報的努力，只是徒增辛苦','希望更有效率地運用自己的時間與心力']],line:'對未來價值',svg:`<svg viewBox="0 0 520 460" width="100%" height="100%"><circle cx="110" cy="90" r="60" fill="#19a957" stroke="#17191a" stroke-width="3"/><g transform="translate(110,90)">${icon('bulb',60).replace('<svg','<svg x="-30" y="-30" color="#fff"')}</g>${[[330,100,'spark'],[430,220,'trophy'],[350,360,'chart']].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="52" fill="#fff" stroke="#17191a" stroke-width="3"/><g transform="translate(${p[0]},${p[1]})">${icon(p[2],50).replace('<svg','<svg x="-25" y="-25"')}</g>`).join('')}<line class="ln" pathLength="1" x1="290" y1="40" x2="170" y2="290" stroke="#19a957" stroke-width="10" stroke-linecap="round"/>${P(150,430,'#19a957',1)}${LIKE(80,280)}</svg>`})}`);

add('line4','對相互平衡 劃界線',`
  ${lineSlide({tag:'創造互惠',def:'發揮自己擅長的優勢，同時為他人和自己帶來助益。',rows:[['希望在自己能夠承擔的責任範圍內','發揮專長回饋重要的人'],['展現自身存在感','希望透過主動貢獻發揮影響力']],line:'對相互平衡',svg:`<svg viewBox="0 0 520 460" width="100%" height="100%">${[[230,'r'],[290,'b'],[380,'l']].map(a=>`<g transform="translate(260,${a[0]-120})"><line x1="-110" y1="0" x2="110" y2="0" stroke="#17191a" stroke-width="16"/>${a[1]!=='l'?'<polygon points="110,-20 150,0 110,20" fill="#17191a"/>':''}${a[1]!=='r'?'<polygon points="-110,-20 -150,0 -110,20" fill="#17191a"/>':''}</g>`).join('')}<line class="ln" pathLength="1" x1="40" y1="330" x2="480" y2="330" stroke="#19a957" stroke-width="10" stroke-linecap="round"/>${P(70,300,'#19a957',1)}<g transform="translate(450,300)"><circle cx="0" cy="-70" r="16" fill="#17191a"/><path d="M-40 0 q40 -60 80 0 z M-20 -50 h40 l6 40 h-52z" fill="#17191a"/></g>${LIKE(60,150)}</svg>`})}`);

add('linesum','四種劃界線',`
  <div class="eyebrow">每個行動背後</div><h2>他們都在為某件事<span class="hl">劃界線</span></h2>
  <div style="flex:1;padding:40px 120px 30px;display:flex;flex-direction:column">${quad([{cls:'gr',raw:'<div class="t">對關係<br><u>劃界線</u></div>'},{cls:'gr',raw:'<div class="t">對目標水準<br><u>劃界線</u></div>'},{cls:'gr',raw:'<div class="t">對未來價值<br><u>劃界線</u></div>'},{cls:'gr',raw:'<div class="t">對相互平衡<br><u>劃界線</u></div>'}])}</div>`);

add('core','共通點：主動劃界線',`
  <div class="lead" style="font-size:34px;color:#9fb0a7">Z 世代行動的共通點</div>
  <div class="big" style="margin-top:30px">為日常生活中的<br>力氣運用方式</div>
  <div class="big" style="margin-top:20px;color:var(--g)">主動劃界線</div>`,'dark');

add('keyword','關鍵字：劃界線',`
  <div style="position:relative;display:flex;align-items:center;justify-content:center;flex:1">
    <div style="position:absolute;left:120px;top:60px;width:500px;height:22px;background:var(--g);border:3px solid var(--ink)"></div>
    <div style="position:absolute;left:120px;top:60px;width:22px;height:560px;background:var(--g);border:3px solid var(--ink)"></div>
    <div style="position:absolute;right:160px;top:120px;width:22px;height:460px;background:var(--y);border:3px solid var(--ink)"></div>
    <div style="position:absolute;right:160px;top:240px;width:300px;height:22px;background:var(--y);border:3px solid var(--ink)"></div>
    <div style="position:absolute;left:420px;bottom:60px;width:520px;height:22px;background:var(--c);border:3px solid var(--ink)"></div>
    <div style="font-size:260px;font-weight:900;letter-spacing:.1em;line-height:1"><span class="hl">劃界線</span></div>
  </div>`);

add('xytable','四種行動的世代比較',`
  <div class="eyebrow">世代比較</div><h2>同樣的四種行動，X/Y 世代和 Z 世代的選擇不同</h2>
  <div style="display:grid;grid-template-columns:1fr 220px 1fr;gap:16px 20px;margin-top:40px;align-items:stretch">
    <div class="pill xy" style="justify-self:center;font-size:24px">X / Y 世代</div><div></div><div class="pill tw" style="justify-self:center;font-size:24px">Z 世代</div>
    ${[['為了向所有人展現更好的自己而發布資訊','定義自我','會根據與他人的關係，選擇性地呈現自己希望被看見的一面','c'],['為了證明自身能力而設定高標準','管理標準','為了保有生活的餘裕，刻意降低標準','y'],['對眼前該做的事踏實努力','投入資源','對於能看到效果的事，才會積極投入心力','pp'],['在既有的角色分工中，享有對自己有利的成果','創造互惠','發揮自己擅長的優勢，同時為他人和自己帶來助益','soft']].map(r=>`
      <div class="card" style="padding:22px 26px;font-size:28px;color:var(--ink2);display:flex;align-items:center;box-shadow:4px 4px 0 var(--ink)">${r[0]}</div>
      <div style="display:flex;align-items:center;justify-content:center"><span class="tagq" style="font-size:26px">${r[1]}</span></div>
      <div class="card ${r[3]}" style="padding:22px 26px;font-size:28px;font-weight:700;display:flex;align-items:center;box-shadow:4px 4px 0 var(--ink)">${r[2]}</div>`).join('')}
  </div>`);

add('xyz','X/Y vs Z 世代',`
  <div class="eyebrow">世代比較</div><h2>X / Y 世代也想劃界線，但 Z 世代<span class="hl">真的付諸行動</span></h2>
  <div class="body-row" style="align-items:center;justify-content:center;gap:40px">
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px"><div class="circle" style="width:270px;height:270px;border:4px dashed #b7beb9;color:var(--mute)"><span style="font-size:22px">對於「劃界線」</span><b style="font-size:44px">概念薄弱</b></div><div style="font-size:24px;color:var(--ink2)">先接受現狀</div></div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px"><div class="circle" style="width:270px;height:270px;background:#6f7773;color:#fff"><span style="font-size:22px">對於「劃界線」</span><b style="font-size:44px">有概念</b></div><div style="font-size:24px;color:var(--ink2);text-align:center">想要劃界線<br>但無法／沒有這麼做</div></div>
    <div style="font-size:80px;font-weight:900">⟷</div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px"><div class="circle" style="width:330px;height:330px;background:var(--g);color:#fff"><span style="font-size:26px">對於「劃界線」</span><b style="font-size:58px">付諸行動</b></div><div style="font-size:28px;font-weight:900" class="hl">明確地劃界線</div></div>
  </div>
  <div style="display:flex;justify-content:space-between;padding:0 120px;font-size:28px;font-weight:900"><span>X ・ Y 世代</span><span class="g">Z 世代</span></div>`);

add('insight2','回到 INSIGHT OUT：深層欲求',`
  <div class="eyebrow">INSIGHT OUT</div><h2>往 U 字底部挖：<span class="hl">看不見的深層欲求</span></h2>
  <div style="flex:1;min-height:0;margin-top:10px">${uSVG('in')}</div>`);

add('why2','為什麼會劃界線',`
  <div class="eyebrow">背景 ・ 意識</div><h2>是什麼讓 Z 世代主動劃界線？</h2>
  <div class="body-row" style="align-items:center;gap:30px">
    <div class="col" style="gap:20px">
      <div style="font-size:30px;font-weight:900;border-bottom:4px solid var(--ink);padding-bottom:8px;align-self:flex-start">全球共通的世代因素</div>
      <div class="card"><h3><span class="hl">數位 ・ 優勢</span></h3><p>具備高度 IT 素養，能發揮自身強項與創造力</p></div>
      <div class="card"><h3 style="color:var(--jp)">數位 ・ 壓力</h3><p>面對資訊過量、隨時連線所帶來的人際壓力</p></div>
    </div>
    <div class="circle" style="width:300px;height:300px;background:var(--g);color:#fff;font-size:46px;font-weight:900;flex:none">深層的欲求</div>
    <div class="col" style="gap:20px">
      <div style="font-size:30px;font-weight:900;border-bottom:4px solid var(--ink);padding-bottom:8px;align-self:flex-start">台灣特有的環境因素</div>
      <div class="card"><h3><span class="hl">教育孕育出的自發性</span></h3><p>受惠於教育改革，養成主動提問、思考與表達的思維，並由此形塑價值觀</p></div>
      <div class="card"><h3 style="color:var(--jp)">社會變遷下的適應力</h3><p>社會朝更多元、更包容的方向發展；以全球化視野看待經濟發展並抱持憧憬</p></div>
    </div>
  </div>`);

add('desire','兩個深層欲求',`
  <div class="eyebrow">深層的欲求</div><h2>劃界線，是為了確保兩件事</h2>
  <div style="display:flex;flex-direction:column;gap:34px;margin-top:50px;flex:1;justify-content:center">
    ${[['① 確保自主性','源於外在規範影響的協調性','源於內在動機驅動的自主性'],['② 確保資源','投入資源，拓展機會','管理資源，減少消耗']].map((r,i)=>`
      <div><div class="pill ${i?'jpn':'tw'}" style="font-size:28px;padding:8px 30px;margin-bottom:16px">${r[0]}</div>
      <div style="display:grid;grid-template-columns:1fr 90px 1fr;align-items:center">
        <div class="card" style="text-align:center;padding:34px"><div class="muted" style="font-size:20px;margin-bottom:6px">X / Y 世代</div><div style="font-size:36px;font-weight:700;color:var(--ink2)">${r[1]}</div></div>
        <div style="text-align:center;font-size:50px;font-weight:900">→</div>
        <div class="card g" style="text-align:center;padding:34px"><div style="font-size:20px;margin-bottom:6px;opacity:.85">Z 世代</div><div style="font-size:40px;font-weight:900">${r[2]}</div></div>
      </div></div>`).join('')}
  </div>`);

add('backcast','Forecast vs Backcast',`
  <div class="eyebrow">兩種人生視角</div><h2>從「累積」到「探索」</h2>
  <div class="body-row" style="gap:40px">
    <div class="card" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px"><span class="pill xy" style="font-size:24px">X / Y 世代</span>
      <div style="font-size:34px;line-height:1.7;color:var(--ink2)">以源自現實的 <b>Forecast</b> 視角<br>付出努力<br>想要累積</div>
      <div style="font-size:44px;font-weight:900;margin-top:10px">自己所選擇的<br>職涯與生活成果</div>
      <svg width="360" height="70" viewBox="0 0 360 70"><line x1="20" y1="35" x2="320" y2="35" stroke="#6f7773" stroke-width="6"/><polygon points="320,20 350,35 320,50" fill="#6f7773"/><circle cx="20" cy="35" r="12" fill="#6f7773"/><text x="20" y="68" font-size="16" text-anchor="middle" fill="#6f7773">現在</text></svg>
    </div>
    <div class="card" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px;border:4px solid var(--g)"><span class="pill tw" style="font-size:24px">Z 世代</span>
      <div style="font-size:34px;line-height:1.7;color:var(--ink2)">以源自理想的 <b>Backcast</b> 視角<br>講求效率<br>想要探索</div>
      <div style="font-size:44px;font-weight:900;margin-top:10px"><span class="hl">更適合自己的<br>職涯與生活選項</span></div>
      <svg width="360" height="70" viewBox="0 0 360 70"><line x1="340" y1="35" x2="40" y2="35" stroke="#1ea653" stroke-width="6"/><polygon points="40,20 10,35 40,50" fill="#1ea653"/><circle cx="340" cy="35" r="12" fill="#1ea653"/><text x="340" y="68" font-size="16" text-anchor="middle" fill="#1ea653">理想</text></svg>
    </div>
  </div>`);

add('agree','63% 認同',`
  <div class="eyebrow">Z 世代的自我認同</div><h2>超過六成 Z 世代認同這種 Backcast 思考</h2>
  <div class="body-row" style="align-items:center;gap:70px">
    <div style="position:relative;width:500px;height:500px;flex:none">${donut([{v:13.7,c:'#0f6b33'},{v:49.3,c:'#1ea653'},{v:34.3,c:'#c9cfcb'},{v:2.7,c:'#6f7773'}],500)}
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:24px;color:var(--mute)">「同意」合計</div><div style="font-size:84px;font-weight:900;color:var(--g3)">63.0<span style="font-size:40px">%</span></div></div></div>
    <div class="col" style="gap:24px">
      <div class="legend" style="flex-direction:column;gap:14px;font-size:32px"><span><i style="background:#0f6b33"></i>非常同意 13.7%</span><span><i style="background:#1ea653"></i>同意 49.3%</span><span><i style="background:#c9cfcb"></i>不同意 34.3%</span><span><i style="background:#6f7773"></i>完全不同意 2.7%</span></div>
      <div class="quote" style="margin-top:10px"><p style="font-size:36px">以源自理想的 Backcast 視角，講求效率、想要探索<b>更適合自己的職涯與生活選項</b></p></div>
    </div>
  </div>
  <div class="src">資料來源：台灣生活者研究專案 Z 世代 insight 調查</div>`);

add('insight3','回到 INSIGHT OUT：未來的啟示',`
  <div class="eyebrow">INSIGHT OUT</div><h2>往 U 字右邊走：<span class="hl">對未來的啟示</span></h2>
  <div style="flex:1;min-height:0;margin-top:10px">${uSVG('out')}</div>`);

add('future','未來的生活樣貌',`
  <div class="eyebrow">INSIGHT OUT ・ 對未來的啟示</div><h2>今後台灣年輕族群的生活樣貌</h2>
  <div style="display:flex;flex-direction:column;gap:26px;margin-top:56px">
    ${['有更多機會探索適合自己的<b class="hl">職涯與生活方式</b>','有更多年輕人為自己的<b class="hl">夢想與理想</b>更加努力','有更多場合能運用自身專長<b class="hl">回饋生活圈</b>'].map((t,i)=>`<div class="card ${['y','','pp'][i]}" style="display:flex;align-items:center;gap:30px;padding:28px 44px">${ib(['briefcase','target','heart'][i],['g','c','p'][i])}<div style="font-size:42px;font-weight:500">${t}</div></div>`).join('')}
  </div>`);

/* ===== 06 行銷啟示 ===== */
add('s6','06 行銷啟示',`<div class="no">06</div><h2>行銷啟示</h2><p>對於主動劃界線、探索理想生活的年輕族群，企業該如何「應援」？</p><div class="line"></div>`,'section');

add('mkt','劃界線行銷',`
  <div class="eyebrow">劃界線行銷</div><h2>掌握年輕族群的這份心情</h2>
  <div class="quote" style="margin-top:40px"><p style="font-size:40px;font-weight:700;text-align:center;padding:30px 20px 10px">以理想的 Backcast 視角，<br>有效率地探索<b>更適合自己的職涯與生活選項</b></p></div>
  <div class="grid2" style="margin-top:40px;flex:1">
    <div class="card pp" style="display:flex;gap:24px;align-items:center"><div style="font-family:var(--disp);font-size:110px;font-weight:800;color:transparent;-webkit-text-stroke:4px var(--ink)">1</div><div><span class="tagq" style="font-size:20px">投入資源</span><h3 style="margin-top:12px">為「講究的範圍」劃界線</h3><p>決定哪些事要投入心力、哪些可省略，為自己保留餘力</p></div></div>
    <div class="card c" style="display:flex;gap:24px;align-items:center"><div style="font-family:var(--disp);font-size:110px;font-weight:800;color:transparent;-webkit-text-stroke:4px var(--ink)">2</div><div><span class="tagq" style="font-size:20px">定義自我</span><h3 style="margin-top:12px">為「接收的資訊」劃界線</h3><p>依照彼此的關係，自己決定要跟誰保持聯繫、跟誰保持距離</p></div></div>
  </div>`);

add('mkt1','觀點 1：只客製重視的部分',`
  <div class="eyebrow">行銷觀點 1 ・ 為「講究的範圍」劃界線</div><h2><span class="hl">只客製重視的部分</span></h2>
  <p class="lead">不用整套都選高規格、高價位，只在自己重視的部分投入預算與心力。</p>
  <div class="body-row" style="align-items:stretch">
    <div class="card" style="flex:1;display:flex;flex-direction:column;justify-content:center"><div style="display:flex;gap:14px;align-items:center;margin-bottom:18px">${ib('plane','c')}<span class="pill tw">Idea</span></div><h3 style="font-size:44px">依重點分配的旅遊方案</h3><p style="font-size:30px">例如「住宿簡單就好，餐飲與體驗要豐富」，各項目的預算都能彈性分配。</p></div>
    <div class="card" style="flex:1;padding:36px 40px">
      ${[['住宿',25],['交通',20],['餐飲',80],['體驗',90]].map(r=>`<div style="display:flex;align-items:center;gap:20px;margin:22px 0"><div style="width:90px;font-size:28px;font-weight:700">${r[0]}</div><div style="flex:1;height:34px;background:#eef0ec;border-radius:17px;overflow:hidden"><div style="width:${r[1]}%;height:100%;background:${r[1]>50?'var(--g)':'#b9c0bc'};border-radius:17px"></div></div><div style="width:110px;font-size:22px;color:${r[1]>50?'var(--g3)':'var(--mute)'};font-weight:700">${r[1]>50?'重點投入':'精簡就好'}</div></div>`).join('')}
      <p class="muted" style="font-size:20px">（示意）預算滑桿</p>
    </div>
  </div>`);

add('mkt2','觀點 2：自訂專屬篩選規則',`
  <div class="eyebrow">行銷觀點 2 ・ 為「接收的資訊」劃界線</div><h2><span class="hl">自訂專屬篩選規則</span></h2>
  <p class="lead">不用全部隔絕或照單全收，自己選擇想接觸的對象與想接收的資訊。</p>
  <div class="body-row" style="align-items:stretch">
    <div class="card" style="flex:1;display:flex;flex-direction:column;justify-content:center"><div style="display:flex;gap:14px;align-items:center;margin-bottom:18px">${ib('headphones','p')}<span class="pill tw">Idea</span></div><h3 style="font-size:40px">「想聽誰，由你選」降噪功能</h3><p style="font-size:30px">耳機搭載可指定聆聽對象的降噪模式，在降低周遭噪音的同時，只保留「選定的人聲」。</p></div>
    <div class="card" style="flex:1;display:flex;align-items:center;justify-content:center">
      <svg viewBox="0 0 520 360" width="100%" height="100%">
        <circle cx="260" cy="180" r="150" fill="#eef7f1" stroke="#1ea653" stroke-width="4" stroke-dasharray="10 8"/>
        <circle cx="260" cy="180" r="40" fill="#131715"/><text x="260" y="188" text-anchor="middle" font-size="22" fill="#fff" font-weight="700">我</text>
        <circle cx="360" cy="120" r="30" fill="#1ea653"/><text x="360" y="128" text-anchor="middle" font-size="20" fill="#fff" font-weight="700">朋友</text>
        <line x1="296" y1="164" x2="332" y2="134" stroke="#1ea653" stroke-width="5"/>
        ${[[60,60],[470,60],[40,300],[480,310],[260,340]].map(p=>`<g opacity=".45"><circle cx="${p[0]}" cy="${p[1]}" r="22" fill="#a9b0ac"/><text x="${p[0]}" y="${p[1]+6}" text-anchor="middle" font-size="16" fill="#fff">噪音</text></g>`).join('')}
      </svg>
    </div>
  </div>`);

add('principle','劃界線行銷的核心原則',`
  <div class="lead" style="font-size:34px;color:#9fb0a7">劃界線行銷的核心原則</div>
  <div style="font-size:60px;font-weight:700;margin-top:40px;color:#9fb0a7;text-decoration:line-through;text-decoration-thickness:4px">不要替年輕人決定什麼是好的</div>
  <div class="big" style="margin-top:30px;font-size:80px">而是幫他們<span style="color:var(--g)">更容易畫下</span><br>自己的界線</div>
  <div class="lead" style="margin-top:40px">重點是「應援」，不是「教育」——Z 世代不需要品牌對他們說教</div>`,'dark');

add('vgrid','Virtual 生活者',`
  <div style="position:absolute;inset:0;display:grid;grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(5,1fr);z-index:0">
    ${Array.from({length:50}).map((_,i)=>`<div style="background:${['#ffd23f','#a98cff','#ff6b4a','#19a957','#3d7bff','#fff1bf','#ebe4ff','#ffe0d6','#d6f4e1'][(i*7)%9]};display:flex;align-items:flex-end;justify-content:center;border:1.5px solid rgba(23,25,26,.25)"><svg viewBox="0 0 60 60" width="70%" height="80%"><circle cx="30" cy="22" r="12" fill="#17191a" opacity=".75"/><path d="M8 60 q22 -34 44 0z" fill="#17191a" opacity=".75"/></svg></div>`).join('')}
  </div>
  <div style="position:relative;z-index:2;flex:1;display:flex;align-items:center;justify-content:center"><div class="card g" style="font-size:110px;font-weight:900;padding:20px 60px;box-shadow:12px 12px 0 var(--ink)">Virtual 生活者</div></div>`);

add('virtual','Virtual 生活者',`
  <div class="eyebrow">博報堂的新工具</div><h2>以調查數據 × 生成式 AI 打造<span class="hl">「Virtual 生活者」</span></h2>
  <div class="body-row" style="align-items:center;gap:40px">
    <div class="col" style="gap:16px;flex:.9">
      <div style="background:var(--ink);color:#fff;font-weight:900;font-size:26px;text-align:center;padding:14px;border-radius:10px">台灣生活者研究專案 獨家調查</div>
      ${['基本資料／生活意識','購物・媒體接觸','家庭意識／其他'].map(t=>`<div class="card" style="text-align:center;padding:18px;font-size:26px;font-weight:700">${t}</div>`).join('')}
    </div>
    <div style="text-align:center;font-size:26px;font-weight:700">生成式 AI<div style="font-size:60px">→</div></div>
    <div class="col" style="flex:1.3;gap:20px">
      ${[['林宇翔','24 歲・男性','與父母同住新北市。大學學商、企管與數據應用，進入職場第二年，在台北一家生活用品電商負責網路商店營運與銷售數據分析。喜歡重訓，也常在家打電動或看電影。'],['陳語晴','23 歲・女性','與父母同住台北市。大學學資訊管理與商業知識，進入職場第一年，在生活用品公司擔任一般行政與業務助理。假日喜歡和朋友去咖啡廳、逛街，或在家看韓劇、YouTube 放鬆。']].map(p=>`
        <div class="card" style="background:var(--ink);color:#fff;border:0;display:flex;gap:22px;align-items:flex-start;padding:22px 26px"><div class="circle" style="width:84px;height:84px;background:var(--g);flex:none;font-size:34px;font-weight:900">${p[0][0]}</div><div><div style="font-size:30px;font-weight:900">${p[0]} <span style="font-size:20px;color:#7fe0a3">${p[1]}</span></div><p style="font-size:19px;color:#cfd8d3;line-height:1.55;margin-top:6px">${p[2]}</p></div></div>`).join('')}
    </div>
  </div>`);

add('virtual2','Virtual 生活者的應用',`
  <div class="eyebrow">Virtual 生活者的應用情境</div><h2>隨時「訪談」一位虛擬的台灣 Z 世代</h2>
  <div class="body-row" style="gap:40px">
    <div class="col" style="flex:.7;gap:18px;justify-content:center">
      ${[['01 對談','Interview','隨時找 Virtual 生活者聊聊','chat'],['02 調查','Survey','進行訪談調查','search'],['03 發想','Ideation','聽聽關於未來的點子','bulb']].map((c,k)=>`<div class="card ${['y','pp','c'][k]}" style="display:flex;align-items:center;gap:20px;padding:22px 26px">${ib(c[3],'w')}<div><h3 style="font-size:30px;margin:0">${c[0].slice(3)} <span class="muted" style="font-size:18px;font-weight:500">${c[1]}</span></h3><p style="font-size:22px">${c[2]}</p></div></div>`).join('')}
    </div>
    <div class="col" style="flex:1.3;background:var(--ink);border-radius:20px;padding:26px 30px;gap:16px;color:#fff">
      <div style="font-size:20px;color:#9fb0a7">實例主題：了解生活者在「體味管理」上的困擾，作為產品的行銷參考</div>
      <div style="align-self:flex-end;background:var(--g);border-radius:18px 18px 4px 18px;padding:12px 20px;font-size:24px;font-weight:700">你會在哪些時刻「在意自己的體味」？</div>
      ${['跟朋友突然靠很近、一起看手機的時候……我腦中就會冒出：<b>「我身上會不會有汗味啊？」</b>','去演唱會、快閃店排完隊之後，流了汗，接著直接跟朋友去吃飯……<b>「明明玩得很開心，要是只有我身上有汗臭味，就糗了。」</b>','就算還不確定自己身上有沒有味道，<b>只要覺得這個距離對方可能聞得到，就會突然很不安。</b>'].map(t=>`<div style="background:#1f2522;border-radius:18px 18px 18px 4px;padding:14px 20px;font-size:22px;line-height:1.6;color:#dfe7e2">${t.replace(/<b>/g,'<b style="color:#7fe0a3">')}</div>`).join('')}
    </div>
  </div>`);

add('vuse','Virtual 生活者的運用方式',`
  <div class="eyebrow">Virtual 生活者的運用方式</div><h2>不是取代真實研究，而是行銷規劃的<span class="hl">新工具</span></h2>
  <div class="body-row" style="align-items:center;gap:40px">
    <div class="col" style="gap:20px;flex:1">
      ${[['bulb','客戶的行銷知識與經驗','y'],['book','本次研究的發現','pp'],['users','來自 Virtual 生活者的啟發','soft']].map(r=>`<div class="card ${r[2]}" style="display:flex;align-items:center;gap:20px;padding:22px 26px">${ib(r[0],'w')}<div style="font-size:28px;font-weight:900">${r[1]}</div></div>`).join('')}
    </div>
    <div style="font-size:60px;font-weight:900">→</div>
    <div class="circle" style="width:360px;height:360px;background:var(--ink);color:#fff;flex:none;padding:40px;font-size:28px;font-weight:900;line-height:1.5;box-shadow:8px 8px 0 var(--g)">專業行銷團隊<br>＋<br>生活者研究<br>專案成員</div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="font-size:50px;font-weight:900">⇄</div><div style="font-size:20px;font-weight:700">運用於<br>行銷規劃</div></div>
    <div class="card" style="width:200px;height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">${ib('briefcase','g',40)}<div style="font-size:30px;font-weight:900">客戶</div></div>
  </div>`);

add('closing','結語',`
  <div class="lead" style="font-size:34px;color:#9fb0a7">最後想說的是</div>
  <div class="big" style="margin-top:36px;font-size:78px">不只看他們<span style="color:#9fb0a7">做了什麼</span><br>也試著理解<span style="color:var(--g)">背後的原因</span></div>
  <div class="lead" style="margin-top:44px;max-width:1200px">有所保留也好、用盡全力也好——<br>他們只是用自己的方法，努力靠近自己的理想生活。</div>`,'dark');

add('s7','07 我們可以怎麼用',`<div class="no">07</div><h2>帶回我們這裡</h2><p>我們可以從中思考的事</p><div class="line"></div>`,'section');

add('takeaway','帶回來的三個思考',`
  <div class="eyebrow">TAKEAWAYS</div><h2>帶回來的三個思考</h2>
  <div class="grid3 bigp" style="margin-top:50px;flex:1">
    <div class="card y">${ib('eye','w')}<div class="num" style="margin-top:16px">01</div><h3>別誤讀「不努力」</h3><p>Z 世代不是沒有動力，而是很清楚力氣要用在哪。溝通時先說清楚「為什麼、有什麼好處」，比要求全力投入更有效。</p></div>
    <div class="card pp">${ib('sliders','w')}<div class="num" style="margin-top:16px">02</div><h3>讓他們自己劃線</h3><p>產品與服務提供「可選擇、可客製、可關掉」的設計：重點加值、其他精簡；資訊推送讓使用者決定接收範圍。</p></div>
    <div class="card g">${ib('target','w')}<div class="num" style="margin-top:16px">03</div><h3>從「理想」倒推</h3><p>用 Backcast 的語言對話：先描繪他們想要的生活樣貌，再告訴他們品牌如何幫忙更有效率地抵達。</p></div>
  </div>
  <p class="muted" style="font-size:20px;margin-top:16px">＊本頁為分享人心得，可依團隊討論調整</p>`);

add('qa','Q & A',`
  <div class="big" style="font-size:150px">Q &amp; A</div>
  <div class="lead" style="margin-top:30px">謝謝大家　歡迎討論</div>`,'dark');

window.DECK = S;
})();
