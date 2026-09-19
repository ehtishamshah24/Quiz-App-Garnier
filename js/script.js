/* ---------- Asset paths ---------- */
const FLOAT = {
  avocado:'assets/images/float/avocado.svg',
  olive:'assets/images/float/olive.svg',
  leaf:'assets/images/float/leaf.svg',
  drop:'assets/images/float/drop.svg',
};
const boxPath  = code => `assets/images/shades/box_${code}.webp`;

/* ---------- Questions ---------- */
const QUESTIONS = [
  { 
    text: 'Are you a morning person or a night owl?', 
    a: { label: '☀️ Morning', val: 'Morning' }, 
    b: { label: '🌑 Night Owl', val: 'Night Owl' } 
  },
  { 
    text: 'Tea or Coffee?', 
    a: { label: '🍵 Tea', val: 'Tea' }, 
    b: { label: '☕ Coffee', val: 'Coffee' } 
  },
  { 
    text: 'Stay In or Party Out?', 
    a: { label: '🏡 Stay In', val: 'Stay In' }, 
    b: { label: '🎉 Party Out', val: 'Party Out' } 
  },
  { 
    text: 'Beach or Mountain?', 
    a: { label: '🏖️ Beach', val: 'Beach' }, 
    b: { label: '🏔️ Mountain', val: 'Mountain' } 
  },
  { 
    text: 'Full Glam or Clean Girl aesthetic?', 
    a: { label: '💅 Full Glam', val: 'Full Glam' }, 
    b: { label: '🌿 Clean Girl', val: 'Clean Girl' } 
  },
];

/* ---------- Shade meta (box image per shade) ---------- */
const SHADES = {
  '1':    { name:'Natural Black', hex:'#1c1715', box:'1' },
  '3':    { name:'Darkest Brown', hex:'#2c1c14', box:'3' },
  '3.6': { name:' Deep Red Brown',      hex:'#5e1a2c', box:'3_6' },
  '4':    { name:'Natural Brown', hex:'#4a2c1c', box:'4' },
  '5':    { name:'Light Golden Brown',   hex:'#70492c', box:'5' },
  '5.3': { name:'Caramel Brown', hex:'#8a5a2e', box:'5_3' },
  '6.66': { name:'Intense Red',   hex:'#7e251b', box:'6_66' },
  '7.3':  { name:'Golden Brown',  hex:'#9c6a31', box:'7_3' },
};
const LINES = {
  '1':'Deep, glossy and timeless. A true black that adds instant polish and shine.',
  '3':'Rich espresso depth with a warm, luxurious finish — sophisticated and grounding.',
  '3.6':'A bold wine-kissed jewel tone. Dramatic, glamorous and unforgettable.',
  '4':'Soft, true brown that flatters everyone. Cosy, natural and effortlessly elegant.',
  '5':'Bright, breezy and sun-kissed. A fresh, easy brown with a natural glow.',
  '5.3':'Warm caramel with a golden sweetness — radiant, dimensional and chic.',
  '6.66':'Fiery, head-turning red. The ultimate statement shade for the bold.',
  '7.3':'Luminous golden warmth that lights up your complexion. Glamorous and glowing.',
};

/* ---------- Result mapping: EXACT 32 combinations from the brief ----------
   [q1, q2, q3, q4, q5, shadeCode, personalityTitle]  (never random)        */
const MAP = [
  ['Morning','Tea','Stay In','Beach','Clean Girl','5','The Sun-Kissed Minimalist'],
  ['Morning','Tea','Stay In','Beach','Full Glam','7.3','The Sandy Shore Siren'],
  ['Morning','Tea','Stay In','Mountain','Clean Girl','4','The Cozy Cabin Sweetheart'],
  ['Morning','Tea','Stay In','Mountain','Full Glam','5.3','The Elegant Alpinist'],
  ['Morning','Tea','Party Out','Beach','Clean Girl','5','The Free-Spirited Beach Babe'],
  ['Morning','Tea','Party Out','Beach','Full Glam','7.3','The Golden Hour Socialite'],
  ['Morning','Tea','Party Out','Mountain','Clean Girl','4','The Outdoorsy Adventurer'],
  ['Morning','Tea','Party Out','Mountain','Full Glam','5.3','The Mountain Festival Chic'],
  ['Morning','Coffee','Stay In','Beach','Clean Girl','5','The Bright & Breezy Coffee Lover'],
  ['Morning','Coffee','Stay In','Beach','Full Glam','7.3','The Sunlit Glamourist'],
  ['Morning','Coffee','Stay In','Mountain','Clean Girl','1','The Grounded Morning Muse'],
  ['Morning','Coffee','Stay In','Mountain','Full Glam','3','The Polished Morning Professional'],
  ['Morning','Coffee','Party Out','Beach','Clean Girl','7.3','The Radiant Trailblazer'],
  ['Morning','Coffee','Party Out','Beach','Full Glam','6.66','The Sun-Drenched Showstopper'],
  ['Morning','Coffee','Party Out','Mountain','Clean Girl','5.3','The High-Energy Explorer'],
  ['Morning','Coffee','Party Out','Mountain','Full Glam','6.66','The Bold Horizon Seeker'],
  ['Night Owl','Tea','Stay In','Beach','Clean Girl','4','The Midnight Tide Thinker'],
  ['Night Owl','Tea','Stay In','Beach','Full Glam','5.3','The Coastal Moonlight Diva'],
  ['Night Owl','Tea','Stay In','Mountain','Clean Girl','3','The Bookworm & Stargazer'],
  ['Night Owl','Tea','Stay In','Mountain','Full Glam','3.6','The Mystic Forest Enchantress'],
  ['Night Owl','Tea','Party Out','Beach','Clean Girl','5','The Night Beach Dancer'],
  ['Night Owl','Tea','Party Out','Beach','Full Glam','3.6','The Neon Sunset Queen'],
  ['Night Owl','Tea','Party Out','Mountain','Clean Girl','4','The Campfire Storyteller'],
  ['Night Owl','Tea','Party Out','Mountain','Full Glam','3.6','The Velvet Night Glamour'],
  ['Night Owl','Coffee','Stay In','Beach','Clean Girl','3','The Deep Espresso Thinker'],
  ['Night Owl','Coffee','Stay In','Beach','Full Glam','5.3','The Midnight Café Icon'],
  ['Night Owl','Coffee','Stay In','Mountain','Clean Girl','1','The Sleek Midnight Shadow'],
  ['Night Owl','Coffee','Stay In','Mountain','Full Glam','3','The Dark Chocolate Luxe'],
  ['Night Owl','Coffee','Party Out','Beach','Clean Girl','5.3','The Beach Club VIP'],
  ['Night Owl','Coffee','Party Out','Beach','Full Glam','6.66','The Red-Hot Party Starter'],
  ['Night Owl','Coffee','Party Out','Mountain','Clean Girl','3','The Nocturnal Jetsetter'],
  ['Night Owl','Coffee','Party Out','Mountain','Full Glam','3.6','The Ultimate Midnight Rebel'],
];
const RESULTS = Object.fromEntries(MAP.map(r => [r.slice(0,5).join('|'), {shade:r[5], title:r[6]}]));

/* ---------- State ---------- */
let current = 0, answers = [], idleTimer = null;
const screens = {
  landing: document.getElementById('screen-landing'),
  quiz:    document.getElementById('screen-quiz'),
  result:  document.getElementById('screen-result'),
};

function show(name){
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  manageIdle(name);
}

/* ---------- Floating botanicals ---------- */
function makeFloaties(el, specs){
  el.innerHTML = specs.map(s =>
    `<img src="${s.src}" class="floatie" style="width:${s.size}px;left:${s.x};top:${s.y};
      --dur:${s.dur}s;--delay:${s.delay}s;--amp:${s.amp}px;--r0:${s.r0}deg;--r1:${s.r1}deg;opacity:${s.op}">`
  ).join('');
}

/* ---------- Quiz flow ---------- */
function startQuiz(){ current = 0; answers = []; renderQuestion(true); show('quiz'); }

function setBar(){ document.getElementById('qBar').style.width = (current / QUESTIONS.length * 100) + '%'; }

function renderQuestion(first){
  const q = QUESTIONS[current];
  document.getElementById('qCount').textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
  document.getElementById('qText').textContent  = q.text;
  setBar();
  const wrap = document.getElementById('qOptions');
  wrap.innerHTML = [q.a, q.b].map((o, idx) => `
    <button class="opt" onclick="choose('${o.val.replace(/'/g,"\\'")}', this)">
      ${o.label}
    </button>`).join('');
    
  if(!first){
    const w = document.getElementById('qWrap');
    w.classList.add('q-enter');
    requestAnimationFrame(() => requestAnimationFrame(() => w.classList.remove('q-enter')));
  }
}

/* ---------- Go Back Function ---------- */
function goBack() {
  if (current > 0) {
    current--;
    answers.pop(); 
    renderQuestion(false); 
  } else {
    resetToLanding();
  }
}

function choose(val, btn){
  btn.classList.add('chosen');
  answers[current] = val;
  const w = document.getElementById('qWrap');
  setTimeout(() => {
    w.classList.add('q-leave');
    setTimeout(() => {
      w.classList.remove('q-leave');
      current++;
      if(current < QUESTIONS.length){ renderQuestion(false); }
      else { setBar(); showResult(); }
    }, 300);
  }, 220);
}

function computeResult(){
  return RESULTS[answers.join('|')] || { shade:'5', title:'The Color Naturals Original' };
}

function showResult(){
  const res = computeResult(), s = SHADES[res.shade];
  document.documentElement.style.setProperty('--shade', s.hex);
  document.getElementById('shadeName').textContent = s.name;
  document.getElementById('shadeNo').textContent   = res.shade;
  document.getElementById('vibeTitle').textContent = res.title;
  document.getElementById('vibeLine').textContent  = LINES[res.shade];
  document.getElementById('packImg').src           = boxPath(s.box);
  document.querySelectorAll('#screen-result .reveal, #screen-result .pop').forEach(el => {
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  });
  show('result');
  burstConfetti();
}

function burstConfetti(){
  const c = document.getElementById('confetti'); c.innerHTML = '';
  const set = [FLOAT.avocado, FLOAT.drop, FLOAT.leaf, FLOAT.drop];
  let html = '';
  for(let i=0;i<24;i++){
    const src = set[i % set.length], x = Math.random()*100, sz = 22+Math.random()*26,
      d = 2.6+Math.random()*2, dl = Math.random()*0.6, r = (Math.random()*900-200)|0;
    html += `<img src="${src}" class="piece" style="left:${x}%;width:${sz}px;--cd:${d}s;--cdl:${dl}s;--cr:${r}deg">`;
  }
  c.innerHTML = html;
  setTimeout(() => c.innerHTML = '', 5400);
}

function retake(){ resetToLanding(); }
function resetToLanding(){ current = 0; answers = []; show('landing'); }

/* ---------- Kiosk: idle auto-reset ---------- */
function manageIdle(name){
  clearTimeout(idleTimer);
  const v = name === 'result' ? '--idle-result' : name === 'quiz' ? '--idle-quiz' : null;
  if(v){
    const ms = parseInt(getComputedStyle(document.documentElement).getPropertyValue(v)) || 50000;
    idleTimer = setTimeout(resetToLanding, ms);
  }
}
['pointerdown','keydown'].forEach(ev => document.addEventListener(ev, () => {
  const a = Object.entries(screens).find(([,el]) => el.classList.contains('active'));
  if(a) manageIdle(a[0]);
}));

/* fullscreen + kiosk lockdown */
document.getElementById('fsBtn').addEventListener('click', () => {
  if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('gesturestart', e => e.preventDefault());

/* ---------- Init ---------- */
(function init(){
  makeFloaties(document.getElementById('quizFloat'), [
    {src:FLOAT.avocado,size:110,x:'4%', y:'15%',dur:9, delay:0,  amp:-32,r0:-8,r1:6, op:.95},
    {src:FLOAT.leaf,   size:78, x:'90%',y:'13%',dur:8, delay:.6, amp:-26,r0:6, r1:-8,op:.9},
    {src:FLOAT.leaf,  size:66,x:'7%',y:'72%',dur:10,delay:.3,amp:-26,r0:4,r1:-10,op:.9},
    {src:FLOAT.avocado,size:80, x:'89%',y:'70%',dur:11,delay:.9, amp:-30,r0:-6,r1:8, op:.9},
    {src:FLOAT.drop,  size:60, x:'2%', y:'45%',dur:9, delay:.2, amp:-20,r0:0, r1:10,op:.85},
    {src:FLOAT.drop,   size:54, x:'95%',y:'47%',dur:10,delay:1.1,amp:-22,r0:8, r1:-6,op:.8},
  ]);
  makeFloaties(document.getElementById('landFloat'), [
    {src:FLOAT.avocado,size:110,x:'4%', y:'15%',dur:9, delay:0,  amp:-32,r0:-8,r1:6, op:.95},
    {src:FLOAT.leaf,   size:78, x:'90%',y:'13%',dur:8, delay:.6, amp:-26,r0:6, r1:-8,op:.9},
    {src:FLOAT.leaf,  size:66,x:'7%',y:'72%',dur:10,delay:.3,amp:-26,r0:4,r1:-10,op:.9},
    {src:FLOAT.avocado,size:80, x:'89%',y:'70%',dur:11,delay:.9, amp:-30,r0:-6,r1:8, op:.9},
    {src:FLOAT.drop,  size:60, x:'2%', y:'45%',dur:9, delay:.2, amp:-20,r0:0, r1:10,op:.85},
    {src:FLOAT.drop,   size:54, x:'95%',y:'47%',dur:10,delay:1.1,amp:-22,r0:8, r1:-6,op:.8},
  ]);
  manageIdle('landing');
})();
