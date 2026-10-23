 'use strict';
const legacyQuestions=[
['Окуучулар жаңы түшүнүктөрдү кандайча өздөштүрүштү?','Мугалим айткан аныктаманы кайталады','Түшүнүктү өз сөзү менен түшүндүрүп, мисал келтирди','Түшүнүккө жаңы колдонуу жолун сунуштады'],
['Сабактагы негизги тапшырмалар кандай аткарылды?','Даяр үлгүнү кайталоо менен','Өз алдынча ыкма тандап, маселе чечүү менен','Өзгөчө ыкма ойлоп табуу менен'],
['Окуучулар суроолорго кандай жооп беришти?','Фактыларды эстеп айтып беришти','Себебин түшүндүрүп, далилдешти','Бир нече жаңы божомол сунушташты'],
['Мурдагы билим жаңы кырдаалда кандай колдонулду?','Тааныш мисалды гана аткарышты','Жаңы жагдайга билимди ылайыкташтырышты','Жаңы ыкма же модель түзүштү'],
['Окуучулар маалымат менен кандай иштешти?','Тексттен маалыматты таап көчүрүштү','Салыштырып, талдап, жыйынтык чыгарышты','Маалыматты жаңы продуктка айлантышты'],
['Топтук иштин натыйжасы кандай болду?','Берилген жоопту чогуу кайталоо','Негизделген биргелешкен чечим','Өз алдынча оригиналдуу долбоор'],
['Окуучулар ката же кыйынчылыкка кандай мамиле жасашты?','Мугалимдин туура жообун күтүштү','Катаны талдап, өздөрү оңдошту','Альтернативдүү жолдорду иштеп чыгышты'],
['Окуучулар кандай суроолорду беришти?','Тактоочу жана эске түшүрүүчү','Эмне үчүн, кантип деген талдоочу','Эгер башкача болсо деген изилдөөчү'],
['Сабак аягында окуучулар эмнени көрсөтүштү?','Эреже же фактыларды кайра айтып беришти','Алган билими менен тапшырма чечишти','Өзүнүн жаңы эмгегин же идеясын коргошту'],
['Окуучунун өз алдынчалыгы кандай байкалды?','Кадам-кадам көрсөтмөнү аткарды','Иш жолун өз алдынча тандады','Максат, ыкма жана продуктту өзү долбоорлоду']
];
const questions=[
['Сабактын максаты канчалык деңгээлде ишке ашты?','Сабактын максаты жарым-жартылай ишке ашты.','Сабактын негизги максаты ишке ашты.','Максат толук ишке ашып, окуучулар билимди жаңы кырдаалда колдоно алышты.'],
['Окуучулардын сабактагы активдүүлүгү кандай болду?','Окуучулар көбүнчө мугалимди угуп, даяр маалыматты кабыл алышты.','Окуучулар суроолорго жооп берип, тапшырмаларды өз алдынча аткарышты.','Окуучулар демилге көтөрүп, талкуулап, өз идеяларын жана чечимдерин сунушташты.'],
['Окутуунун усулдары окуучулардын ой жүгүртүүсүн канчалык өнүктүрдү?','Негизинен түшүндүрүү жана кайталоо усулдары колдонулду.','Талдоо, салыштыруу жана көйгөй чечүү тапшырмалары колдонулду.','Изилдөө, чыгармачылык жана өз алдынча чечим чыгаруу иштери уюштурулду.'],
['Окуучулар алган билимин практикада кандай колдоно алышты?','Окуучулар үлгү боюнча тапшырмаларды аткарышты.','Окуучулар алган билимин тааныш практикалык кырдаалдарда колдонушту.','Окуучулар алган билимин жаңы турмуштук кырдаалдарда өз алдынча колдонушту.'],
['Сабакта окуучулардын жетишкендиктери кандай бааланды?','Негизинен мугалим жооптордун тууралыгын текшерди.','Баалоо критерийлери колдонулуп, окуучуларга кайтарым байланыш берилди.','Окуучулар өзүн-өзү жана бири-бирин баалап, жыйынтыктын негизинде ишин жакшыртышты.']
];
const labels=['Репродуктивдүү','Продуктивдүү','Креативдүү'];
const levels=['Канааттандырарлык','Жакшы','Эң жакшы'];
const literacy=['Окуу жана жазуу сабаттуулугу','Финансылык сабаттуулук','Табигый-илимий сабаттуулук','Функционалдык сабаттуулук','Экологиялык сабаттуулук','Маданий сабаттуулук','Саясий сабаттуулук','Социалдык сабаттуулук','Гендердик сабаттуулук','Санарип сабаттуулук','Этикалык сабаттуулук','Саламаттыкты сактоо сабаттуулугу','Техникалык сабаттуулук'];
const steam=['Илим (Science)','Технология (Technology)','Инженерия (Engineering)','Искусство (Arts)','Математика (Mathematics)'];
const levelField=(name,title)=>`<div class="question"><p>${title} *</p>${levels.map(v=>`<label class="option"><input type="radio" name="${name}" value="${v}" required>${v}</label>`).join('')}</div>`;
const multiField=(name,title,options)=>`<div class="question"><p>${title} *</p><div class="check-grid">${options.map(v=>`<label><input type="checkbox" name="${name}" value="${v}">${v}</label>`).join('')}</div><p class="muted">Бир же бир нече вариантты тандаңыз.</p></div>`;

const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const configured=window.SABAK_CONFIG?.url?.startsWith('https://') && !window.SABAK_CONFIG?.anonKey?.startsWith('YOUR_');
const client=configured&&window.supabase?window.supabase.createClient(window.SABAK_CONFIG.url,window.SABAK_CONFIG.anonKey):null;
let schools=[],all=[],isAdmin=false,isSuperAdminUser=false;
const schoolName=id=>schools.find(s=>String(s.id)===String(id))?.name||'Мектеби көрсөтүлгөн эмес';
async function loadSchools(){if(!client)return;const {data,error}=await client.from('schools').select('id,name').order('name');if(error){$('surveyError').textContent='Мектептер жүктөлгөн жок: '+error.message;return}schools=data||[];const previousAdminSchool=$('adminSchool').value;const previousSurveySchool=$('schoolSelect').value;$('schoolSelect').innerHTML='<option value="">Мектепти тандаңыз</option>';$('adminSchool').innerHTML='<option value="all">Бардык мектептер</option><option value="none">Мектеби көрсөтүлгөн эмес</option>';for(const s of schools){for(const id of ['schoolSelect','adminSchool']){const option=document.createElement('option');option.value=s.id;option.textContent=s.name;$(id).appendChild(option)}}if([...$('adminSchool').options].some(o=>o.value===previousAdminSchool))$('adminSchool').value=previousAdminSchool;if([...$('schoolSelect').options].some(o=>o.value===previousSurveySchool))$('schoolSelect').value=previousSurveySchool;}
if(!client)$('configWarning').classList.remove('hidden');
$('observationFields').innerHTML=
  levelField('organization_level','Сабакты уюштуруу жөндөмдүүлүгү')+
  levelField('technology_level','Инновациялык-компьютердик технологиялар менен иштөө жөндөмдүүлүгү')+
  multiField('literacy_types','Сабаттуулуктун кайсы түрлөрүнө басым жасалды?',literacy)+
  `<div class="question"><p>STEAM компоненттери</p><p class="muted">S — Science (илим), T — Technology (технология), E — Engineering (инженерия), A — Arts (искусство), M — Mathematics (математика).</p></div>`+
  multiField('steam_components','Сабакта STEAMдин кайсы компоненттери колдонулду?',steam)+
  levelField('pedagogical_level','Психологиялык-педагогикалык кырдаалдан чыгуу жөндөмдүүлүгү')+
  levelField('reinforcement_level','Сабакты бышыктоо жөндөмдүүлүгү')+
  `<div class="question"><p>Сабакта кайсы көндүм басымдуулук кылды? *</p><label class="option"><input type="radio" name="dominant_skill" value="Жумшак көндүм (soft skills)" required>Жумшак көндүм (soft skills)</label><label class="option"><input type="radio" name="dominant_skill" value="Катуу көндүм (hard skills)" required>Катуу көндүм (hard skills)</label></div>`;
$('questions').innerHTML=questions.map((q,i)=>`<div class="question"><p>${i+1}. ${escapeHtml(q[0])}</p>${q.slice(1).map((a,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}" required>${escapeHtml(a)}</label>`).join('')}</div>`).join('');
function tab(which){$('teacher').classList.toggle('hidden',which!=='teacher');$('admin').classList.toggle('hidden',which!=='admin');$('teacherTab').className=which==='teacher'?'':'secondary';$('adminTab').className=which==='admin'?'':'secondary';if(which==='admin')checkSession()}
$('teacherTab').onclick=()=>tab('teacher');$('adminTab').onclick=()=>tab('admin');
$('survey').onsubmit=async e=>{
  e.preventDefault(); $('surveyError').textContent='';
  if(!client){$('surveyError').textContent='Онлайн база азырынча орнотулган эмес.';return}
  const form=new FormData(e.target);
  const answers=questions.map((_,i)=>form.get('q'+i)===null?NaN:Number(form.get('q'+i)));
  const schoolId=Number(form.get('school_id'));
  if(!schools.some(s=>Number(s.id)===schoolId)){$('surveyError').textContent='Мектепти тандаңыз.';return}
  if(answers.some(v=>![0,1,2].includes(v))){$('surveyError').textContent='5 суроонун баарына жооп бериңиз.';return}
  const selectedLiteracy=form.getAll('literacy_types'),selectedSteam=form.getAll('steam_components');
  if(!selectedLiteracy.length||!selectedSteam.length){$('surveyError').textContent='Сабаттуулуктун жана STEAMдин жок дегенде бирден түрүн тандаңыз.';return}
  const studentCount=Number(form.get('student_count'));
  if(!Number.isInteger(studentCount)||studentCount<0||studentCount>1000){$('surveyError').textContent='Окуучулардын санын туура жазыңыз.';return}
  const counts=labels.map((_,i)=>answers.filter(x=>x===i).length);
  const max=Math.max(...counts),winners=labels.filter((_,i)=>counts[i]===max);
  const outcome=winners.length===1?winners[0]:'Аралаш: '+winners.join(' / ');
  const observedTeacher=String(form.get('observed_teacher')||'').trim();
   const observerTeacher=String(form.get('teacher')||'').trim();
   if(!observerTeacher||!observedTeacher){$('surveyError').textContent='Эки мугалимдин тең аты-жөнүн жазыңыз.';return}
   const observation={version:2,observed_teacher_name:observedTeacher,student_count:studentCount,visit_purpose:String(form.get('visit_purpose')).trim(),teaching_methods:String(form.get('teaching_methods')).trim(),organization_level:String(form.get('organization_level')),technology_level:String(form.get('technology_level')),literacy_types:selectedLiteracy,steam_components:selectedSteam,pedagogical_level:String(form.get('pedagogical_level')),reinforcement_level:String(form.get('reinforcement_level')),dominant_skill:String(form.get('dominant_skill')),feedback:String(form.get('feedback')||'').trim()};
  const payload={school_id:schoolId,teacher_name:observerTeacher,subject:String(form.get('subject')).trim(),classroom:String(form.get('classroom')).trim(),topic:String(form.get('topic')).trim(),answers,counts,outcome,observation};
  $('submitBtn').disabled=true;
  try{
    const {error}=await client.from('lesson_reviews').insert(payload);if(error)throw error;
    $('survey').classList.add('hidden');$('result').classList.remove('hidden');
    $('result').innerHTML=`<h2>Жыйынтык сакталды ✓</h2><h3>${escapeHtml(outcome)}</h3>${labels.map((l,i)=>`<p>${l}: <b>${Math.round(counts[i]/questions.length*100)}%</b></p><div class="bar"><div class="fill" style="width:${counts[i]/questions.length*100}%"></div></div>`).join('')}<p class="muted">Жыйынтык администрациянын базасына сакталды.</p><button id="again">Жаңы талдоо</button>`;
    $('again').onclick=()=>{e.target.reset();$('survey').classList.remove('hidden');$('result').classList.add('hidden');window.scrollTo(0,0)};
  }catch(err){$('surveyError').textContent='Сактоо мүмкүн болгон жок: '+err.message}
  finally{$('submitBtn').disabled=false}
};

async function checkSession() {
  if (!client) return;

  const { data, error } = await client.auth.getUser();
  const user = error ? null : data.user;

  isAdmin = false;

  if (user) {
    const { data: admin, error: adminError } = await client
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    isAdmin = !adminError && !!admin;
  }

  isSuperAdminUser = await isSuperAdmin();
  isAdmin = isAdmin || isSuperAdminUser;
  const superAdmin = isSuperAdminUser;

  $('loginCard').classList.toggle('hidden', isAdmin);
  $('dashboard').classList.toggle('hidden', !isAdmin);

  $('superAdminPanel').classList.toggle(
    'hidden',
    !superAdmin
  );

  if (isAdmin) {
    await loadDashboard();
    if (isSuperAdminUser) renderManageSchools();
  } else if (user) {
    $('loginError').textContent =
      'Бул аккаунт администратор катары катталган эмес.';
  }
}

$('login').onsubmit=async e=>{e.preventDefault();$('loginError').textContent='';if(!client){$('loginError').textContent='Адегенде базаны орнотуңуз.';return}const f=new FormData(e.target);const {error}=await client.auth.signInWithPassword({email:f.get('email'),password:f.get('password')});if(error){$('loginError').textContent='Кирүү ишке ашкан жок: '+error.message;return}await checkSession()};
$('logout').onclick=async()=>{await client?.auth.signOut();all=[];isAdmin=false;isSuperAdminUser=false;$('loginError').textContent='';await checkSession()};
async function loadDashboard(){try{$('adminError').textContent='';all=[];let start=0;while(true){const {data,error}=await client.from('lesson_reviews').select('*').order('created_at',{ascending:false}).range(start,start+999);if(error)throw error;all.push(...data);if(data.length<1000)break;start+=1000}renderDashboard()}catch(e){$('adminError').textContent='Маалыматтарды алуу мүмкүн болгон жок: '+e.message}}
const schoolFiltered=()=>all.filter(r=>{const v=$('adminSchool').value;return v==='all'||(v==='none'?r.school_id==null:String(r.school_id)===v)});
const visibleRows=()=>schoolFiltered().filter(r=>[r.teacher_name,r.observation?.observed_teacher_name,r.subject,r.classroom,r.topic,schoolName(r.school_id)].some(x=>String(x??'').toLocaleLowerCase().includes($('filter').value.trim().toLocaleLowerCase())));
function renderDashboard(){const rows=schoolFiltered();const byTeacher=new Map();for(const r of rows){const key=String(r.school_id??'none')+'|'+r.teacher_name.trim().toLocaleLowerCase();const x=byTeacher.get(key)||{name:r.teacher_name,school:schoolName(r.school_id),n:0,last:r.outcome};x.n++;byTeacher.set(key,x)}$('unique').textContent=byTeacher.size;$('total').textContent=rows.length;$('week').textContent=rows.filter(r=>Date.now()-new Date(r.created_at).getTime()<=7*86400000).length;$('distribution').innerHTML=labels.map(l=>{const n=rows.filter(r=>r.outcome===l).length;return `<p>${l}: <b>${n}</b> (${rows.length?Math.round(n/rows.length*100):0}%)</p><div class="bar"><div class="fill" style="width:${rows.length?n/rows.length*100:0}%"></div></div>`}).join('')+`<p class="muted">Аралаш жыйынтыктар: ${rows.filter(r=>r.outcome.startsWith('Аралаш')).length}</p>`;$('teachersTable').innerHTML=[...byTeacher.values()].sort((a,b)=>b.n-a.n).map(x=>`<tr><td>${escapeHtml(x.school)}</td><td>${escapeHtml(x.name)}</td><td>${x.n}</td><td>${escapeHtml(x.last)}</td></tr>`).join('');const groups=new Map();for(const r of all){const key=String(r.school_id??'none');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r)}$('schoolsTable').innerHTML=[...groups].map(([id,list])=>`<tr><td>${escapeHtml(schoolName(id==='none'?null:id))}</td><td>${new Set(list.map(r=>r.teacher_name.trim().toLocaleLowerCase())).size}</td><td>${list.length}</td>${labels.map(l=>`<td>${list.filter(r=>r.outcome===l).length}</td>`).join('')}<td>${list.filter(r=>r.outcome.startsWith('Аралаш')).length}</td></tr>`).join('')||'<tr><td colspan="7">Маалымат жок</td></tr>';renderRecords()}
const observationFields=[['observed_teacher_name','Сабак өткөн мугалим'],['student_count','Катышкан окуучулар'],['visit_purpose','Катышуунун максаты'],['teaching_methods','Колдонулган усулдар'],['organization_level','Уюштуруу жөндөмдүүлүгү'],['technology_level','Компьютердик технологиялар'],['literacy_types','Сабаттуулуктун түрлөрү'],['steam_components','STEAM компоненттери'],['pedagogical_level','Педагогикалык кырдаал'],['reinforcement_level','Бышыктоо жөндөмдүүлүгү'],['dominant_skill','Басымдуу көндүм'],['feedback','Сунуштар жана пикирлер']];
const valueText=v=>Array.isArray(v)?v.join(', '):String(v??'');
function recordDetails(r){
 const obs=r.observation||{},qs=Array.isArray(r.answers)&&r.answers.length===10?legacyQuestions:questions;
 const meta=obs.version===2?observationFields.map(([key,title])=>`<p><b>${escapeHtml(title)}:</b> ${escapeHtml(valueText(obs[key]))||'—'}</p>`).join(''):'<p class="muted">Мурдагы 10 суроолук талдоо</p>';
 const answers=(r.answers||[]).map((v,i)=>`<p><b>${i+1}. ${escapeHtml(qs[i]?.[0]||'')}</b> ${escapeHtml(qs[i]?.[Number(v)+1]||'')}</p>`).join('');
 return `<details><summary>Көрүү</summary>${meta}<h4>Критерийлер боюнча жооптор</h4>${answers}</details>`;
}
function renderRecords(){$('records').innerHTML=visibleRows().map(r=>`<tr><td>${escapeHtml(new Date(r.created_at).toLocaleString('ky-KG'))}</td><td>${escapeHtml(schoolName(r.school_id))}</td><td>${escapeHtml(r.teacher_name)}</td><td>${escapeHtml(r.observation?.observed_teacher_name||'—')}</td><td>${escapeHtml(r.subject)} / ${escapeHtml(r.classroom)}</td><td>${escapeHtml(r.topic)}</td><td>${escapeHtml(r.outcome)}</td><td>${recordDetails(r)}</td><td>${isSuperAdminUser?`<button class="danger smallbtn" data-delete-id="${escapeHtml(r.id)}">Өчүрүү</button>`:''}</td></tr>`).join('')||'<tr><td colspan="8">Маалымат жок</td></tr>'}
$('adminSchool').onchange=renderDashboard;$('filter').oninput=renderRecords;
$('records').onclick=async e=>{const button=e.target.closest('[data-delete-id]');if(!button||!isSuperAdminUser)return;const id=button.dataset.deleteId;if(!confirm('Бул талдоону биротоло өчүрөсүзбү?'))return;button.disabled=true;const {error}=await client.rpc('admin_delete_review',{review_id:id});if(error){$('adminError').textContent='Өчүрүү ишке ашкан жок: '+error.message;button.disabled=false;return}await loadDashboard()};
async function resetStats(allSchools){if(!isSuperAdminUser)return;const selected=$('adminSchool').value;if(!allSchools&&selected==='all'){alert('Адегенде бир мектепти тандаңыз.');return}const target=allSchools?'БАРДЫК МЕКТЕПТЕР':selected==='none'?'МЕКТЕБИ КӨРСӨТҮЛБӨГӨН ЖАЗУУЛАР':schoolName(selected);if(!confirm(target+' боюнча бардык талдоолорду биротоло өчүрөсүзбү?'))return;const phrase=prompt('Ырастоо үчүн ТАЗАЛА деп жазыңыз:');if(phrase!=='ТАЗАЛА')return;for(const id of ['resetAll','resetSchool'])$(id).disabled=true;try{const {data,error}=await client.rpc('admin_reset_reviews',{target_school_id:allSchools?null:selected==='none'?-1:Number(selected),reset_all:allSchools});if(error)throw error;$('deleteStatus').textContent='Өчүрүлгөн жазуулар: '+data;await loadDashboard()}catch(e){$('deleteStatus').textContent='Ката: '+e.message}finally{for(const id of ['resetAll','resetSchool'])$(id).disabled=false}}
$('resetSchool').onclick=()=>resetStats(false);$('resetAll').onclick=()=>resetStats(true);
$('export').onclick=()=>{
 const columns=['Убакыт','Мектеп','Талдоочу мугалим','Предмет','Класс','Тема','Жыйынтык','Анкета версиясы','Репродуктивдүү','Продуктивдүү','Креативдүү',...observationFields.map(x=>x[1]),...Array.from({length:10},(_,i)=>`Суроо ${i+1}`)];
 const rows=visibleRows().map(r=>{const obs=r.observation||{},qs=Array.isArray(r.answers)&&r.answers.length===10?legacyQuestions:questions;return [r.created_at,schoolName(r.school_id),r.teacher_name,r.subject,r.classroom,r.topic,r.outcome,obs.version===2?'5 суроо':'10 суроо',...(r.counts||[]),...observationFields.map(([key])=>valueText(obs[key])),...Array.from({length:10},(_,i)=>qs[i]?.[Number(r.answers?.[i])+1]||'')];});
 const csv='\ufeff'+[columns,...rows].map(row=>row.map(v=>{let s=String(v??'');if(/^[\s]*[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}).join(';')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='sabak-monitoring.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
loadSchools();

async function isSuperAdmin() {
  if (!client) return false;

  const { data: userData, error: userError } =
    await client.auth.getUser();

  if (userError || !userData.user) return false;

  const { data, error } = await client
    .from('super_admins')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (error) {
    console.error('Укукту текшерүү катасы:', error);
    return false;
  }

  return !!data;
}


// Башкы администратор: мектептерди башкаруу.
function renderManageSchools() {
  if (!isSuperAdminUser) return;
  $('manageSchoolsTable').innerHTML = schools.map(s =>
    `<tr><td>${escapeHtml(s.name)}</td><td><button type="button" class="secondary smallbtn" data-rename-school="${escapeHtml(s.id)}">Атын өзгөртүү</button></td></tr>`
  ).join('') || '<tr><td colspan="2">Мектеп жок</td></tr>';
}

$('addSchoolForm').onsubmit = async event => {
  event.preventDefault();
  if (!client || !isSuperAdminUser) return;
  const name = $('newSchoolName').value.trim();
  if (!name) return;
  const button = $('addSchoolForm').querySelector('button[type="submit"]');
  button.disabled = true;
  $('schoolManageStatus').textContent = '';
  try {
    const { error } = await client.rpc('admin_add_school', { school_name: name });
    if (error) throw error;
    $('newSchoolName').value = '';
    await loadSchools();
    renderManageSchools();
    renderDashboard();
    $('schoolManageStatus').textContent = 'Мектеп ийгиликтүү кошулду.';
  } catch (error) {
    $('schoolManageStatus').textContent = 'Ката: ' + error.message;
  } finally {
    button.disabled = false;
  }
};

$('manageSchoolsTable').onclick = async event => {
  const button = event.target.closest('[data-rename-school]');
  if (!button || !client || !isSuperAdminUser) return;
  const school = schools.find(s => String(s.id) === button.dataset.renameSchool);
  if (!school) return;
  const answer = prompt('Мектептин жаңы аталышы:', school.name);
  if (answer === null) return;
  const name = answer.trim();
  if (!name || name === school.name) return;
  if (name.length > 200) {
    $('schoolManageStatus').textContent = 'Аталыш 200 белгиден ашпашы керек.';
    return;
  }
  button.disabled = true;
  $('schoolManageStatus').textContent = '';
  try {
    const { error } = await client.rpc('admin_rename_school', {
      target_id: school.id,
      new_name: name
    });
    if (error) throw error;
    await loadSchools();
    renderManageSchools();
    renderDashboard();
    $('schoolManageStatus').textContent = 'Мектептин аталышы өзгөртүлдү.';
  } catch (error) {
    $('schoolManageStatus').textContent = 'Ката: ' + error.message;
  } finally {
    button.disabled = false;
  }
};
