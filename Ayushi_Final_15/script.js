const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const photos=Array.from({length:15},(_,i)=>`assets/photos/photo${String(i+1).padStart(2,'0')}.jpg`);
const lines=[
['Tumhari baatein sunna…','mujhe genuinely accha lagta hai. ❤️','🐰💗'],
['Kabhi college ka stress hota hai…','tumse thodi der baat ho jaaye toh mind halka sa better feel karta hai. 🫶🏻','🐰❤️'],
['Kabhi-kabhi bina reason…','phone check karta hoon… shayad tumhara message aaya ho. 📱💌','🐱💗'],
['Tumhari smile toh seriously…','bas dekh ke mood thoda aur accha ho jaata hai. 🥹','🌸🐰'],
['Kuch dino tak phone kharab tha…','phir new mobile ke baad tumse baat hui — woh moment genuinely accha laga. ❤️','📱✨'],
['Tumse baat karna…','busy day ke beech ka ek peaceful little moment lagta hai. 🌷','🐱🌷'],
['Tumhari chhoti-chhoti baatein…','pata nahi kaise, but yaad reh jaati hain. 💗','💭🐰'],
['Ordinary moments bhi…','tumhari wajah se thode special lagne lagte hain. ✨','🌸💞'],
['Pata hi nahi chala kab…','dheere-dheere tum mere liye bahut special ban gayi. ❤️','🥹🌷'],
['Bas ek honest baat…','tumhari friendship mere liye genuinely important hai. 🫶🏻','🐱❤️'],
['Kuch photos…','bas dekhte hi smile aa jaati hai. 😂','🌷📸'],
['Kabhi-kabhi sochta hoon…','kitni simple si baatein bhi kitni achhi memories ban jaati hain. ✨','🐰💐'],
['Tumhari presence…','chahe chhoti si conversation hi kyun na ho, notice hoti hai. 💗','💌🐱'],
['Isliye ye website…','kisi pressure ke liye nahi, bas ek cute sa way hai ye sab kehne ka. 🌸','🐰🫶🏻'],
['Aur sabse important…','tum jo feel karo, honestly wahi kehna. Friendship important hai. ❤️','🥹🌷']
];
const grid=$('#memoryGrid');
lines.forEach((x,i)=>{const card=document.createElement('article');card.className='memory-card';card.innerHTML=`<div class="memory-text"><span class="num">${String(i+1).padStart(2,'0')}</span><h3>${x[0]}</h3><p>${x[1]}</p><div class="sticker">${x[2]}</div></div><div class="memory-photo"><img src="${photos[i]}" alt="Ayushi photo ${i+1}" loading="lazy"></div>`;grid.appendChild(card)});
const wall=$('#polaroids');
photos.forEach((p,i)=>{const f=document.createElement('figure');f.className='polaroid';f.style.setProperty('--r',`${i%2?-1.6:1.2}deg`);f.innerHTML=`<img src="${p}" alt="Ayushi memory ${i+1}" loading="lazy"><figcaption>Memory ${String(i+1).padStart(2,'0')} ♡</figcaption>`;wall.appendChild(f)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});$$('.memory-card').forEach(e=>io.observe(e));
function greeting(){const h=new Date().getHours();let g=h<12?'Good Morning':h<17?'Good Afternoon':h<21?'Good Evening':'Good Night';$('#greeting').textContent=`${g}, Ayushi 🌸`;}
greeting();
$('#dayBtn').onclick=()=>theme('day');$('#nightBtn').onclick=()=>theme('night');function theme(t){document.body.classList.toggle('night',t==='night');$('#dayBtn').classList.toggle('active',t==='day');$('#nightBtn').classList.toggle('active',t==='night');localStorage.setItem('ayushiTheme',t)}theme(localStorage.getItem('ayushiTheme')||'day');
const tracks=[['Arz Kiya Hai','Anuv Jain'],['Tera Hua Sahiba','Garvit-Priyansh'],['Gehra Hua','Shashwat Sachdev, Arijit Singh'],['Phir Aur Kya Chahiye','Sachin-Jigar, Arijit Singh'],['Apna Bana Le','Arijit Singh'],['Dhoonde Akhiyaan','Jabariya Jodi'],['Hona Tha Pyar','Hona Tha Pyar']];
const audio=$('#audio'), trackWrap=$('#tracks');
tracks.forEach((t,i)=>{const b=document.createElement('button');b.className='music-track'+(i===0?' active':'');b.innerHTML=`<span class="play">▶</span><span><b>${t[0]}</b><small>${t[1]}</small></span><span>♡</span>`;b.onclick=()=>play(i);trackWrap.appendChild(b)});
function play(i){audio.src=`assets/music/song${i+1}.mp3`;audio.volume=+$('#volume').value;audio.play().catch(()=>{});$$('.music-track').forEach((b,j)=>b.classList.toggle('active',i===j))}
$('#volume').oninput=()=>audio.volume=+$('#volume').value;
let on=true;$('#musicToggle').onclick=()=>{on=!on;$('#musicToggle').textContent=on?'ON':'OFF';if(!on)audio.pause();else play(Math.max(0,$$('.music-track').findIndex(x=>x.classList.contains('active'))))};

// ==============================
// EMAILJS + MEENA BAZAR
// ==============================
const EMAIL_SERVICE='service_4ed8sox';
const EMAIL_TEMPLATE='template_7xptopb';
const EMAIL_PUBLIC_KEY='0RpH7GbjoJAZyN9Du';
let emailReady=false;
try{if(window.emailjs){emailjs.init({publicKey:EMAIL_PUBLIC_KEY});emailReady=true;}}catch(e){console.warn('EmailJS init error',e)}

let meenaChoice='Kuch aur 💗';
$$('#meenaOptions button').forEach(btn=>btn.addEventListener('click',()=>{
  meenaChoice=btn.dataset.choice;
  $$('#meenaOptions button').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
}));

async function sendResponseEmail(message){
  if(!emailReady) throw new Error('EmailJS is not loaded');
  // Existing template uses {{time}}, so the complete message is sent through that variable.
  return emailjs.send(EMAIL_SERVICE,EMAIL_TEMPLATE,{time:message});
}

$('#meenaSubmit').onclick=async()=>{
  const time=$('#meenaTime').value.trim();
  const status=$('#meenaStatus');
  if(!time){status.textContent='Pehle time batao naaa 😭💗';$('#meenaTime').focus();return}
  const record={choice:meenaChoice,time};
  localStorage.setItem('ayushiMeenaBazar',JSON.stringify(record));
  status.textContent='Bhej raha hoon… 💌';
  $('#meenaSubmit').disabled=true;
  try{
    await sendResponseEmail(`🛍️ AYUSHI MEENA BAZAR RESPONSE\n\nChoice: ${meenaChoice}\nTime/Day: ${time}`);
    status.textContent='Doneee 💌 Choice + time tumhare email par bhej diya!';
  }catch(err){
    console.error('Meena EmailJS error',err);
    status.textContent='Choice + time save ho gaya, lekin email send nahi hua. Internet/EmailJS check karo.';
  }finally{$('#meenaSubmit').disabled=false}
};

// ==============================
// YES / NO — mobile friendly moving NO
// ==============================
const no=$('#no'),msg=$('#answerMsg'),answerBox=$('.answers');
function dodge(){
  const box=answerBox.getBoundingClientRect();
  const btn=no.getBoundingClientRect();
  const maxX=Math.max(18,Math.min(90,(box.width-btn.width)/2));
  const x=(Math.random()*2-1)*maxX;
  const y=(Math.random()*2-1)*14;
  no.style.transform=`translate(${x}px,${y}px) rotate(${Math.random()*8-4}deg)`;
  msg.textContent='😂 Arreyy… but seriously, jo feel karo honestly bata dena. 🌷';
}
no.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')dodge()});
no.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){e.preventDefault();dodge()}});

async function answerEmail(answer){
  const meena=JSON.parse(localStorage.getItem('ayushiMeenaBazar')||'null');
  const meenaLine=meena?`Meena Bazar: ${meena.choice}\nTime/Day: ${meena.time}`:'Meena Bazar: not answered';
  return sendResponseEmail(`💌 AYUSHI WEBSITE RESPONSE\n\nAnswer: ${answer}\n\n${meenaLine}`);
}

$('#yes').onclick=async()=>{
  localStorage.setItem('ayushiAnswer','YES ❤️');
  msg.textContent='Bhej raha hoon… 💌';
  try{await answerEmail('YES ❤️');msg.textContent='🥹❤️ YES mil gaya! Response email bhi bhej diya gaya.'}
  catch(e){console.error(e);msg.textContent='🥹❤️ YES save ho gaya, lekin email send nahi hua.'}
};
$('#honestNo').onclick=async()=>{
  localStorage.setItem('ayushiAnswer','NO 🌷');
  msg.textContent='Bhej raha hoon… 💌';
  try{await answerEmail('NO 🌷');msg.textContent='🌷 NO save ho gaya. No pressure — response email bhi bhej diya gaya.'}
  catch(e){console.error(e);msg.textContent='🌷 NO save ho gaya, lekin email send nahi hua.'}
};
