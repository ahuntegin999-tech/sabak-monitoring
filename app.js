'use strict';
// OBSERVER_IDENTITY_LOCK_V2_20261026: observer always matches authenticated teacher profile.

const legacyQuestions = [
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
const questions = [
  ['Сабактын максаты канчалык деңгээлде ишке ашты?','Сабактын максаты жарым-жартылай ишке ашты.','Сабактын негизги максаты ишке ашты.','Максат толук ишке ашып, окуучулар билимди жаңы кырдаалда колдоно алышты.'],
  ['Окуучулардын сабактагы активдүүлүгү кандай болду?','Окуучулар көбүнчө мугалимди угуп, даяр маалыматты кабыл алышты.','Окуучулар суроолорго жооп берип, тапшырмаларды өз алдынча аткарышты.','Окуучулар демилге көтөрүп, талкуулап, өз идеяларын жана чечимдерин сунушташты.'],
  ['Окутуунун усулдары окуучулардын ой жүгүртүүсүн канчалык өнүктүрдү?','Негизинен түшүндүрүү жана кайталоо усулдары колдонулду.','Талдоо, салыштыруу жана көйгөй чечүү тапшырмалары колдонулду.','Изилдөө, чыгармачылык жана өз алдынча чечим чыгаруу иштери уюштурулду.'],
  ['Окуучулар алган билимин практикада кандай колдоно алышты?','Окуучулар үлгү боюнча тапшырмаларды аткарышты.','Окуучулар алган билимин тааныш практикалык кырдаалдарда колдонушту.','Окуучулар алган билимин жаңы турмуштук кырдаалдарда өз алдынча колдонушту.'],
  ['Сабакта окуучулардын жетишкендиктери кандай бааланды?','Негизинен мугалим жооптордун тууралыгын текшерди.','Баалоо критерийлери колдонулуп, окуучуларга кайтарым байланыш берилди.','Окуучулар өзүн-өзү жана бири-бирин баалап, жыйынтыктын негизинде ишин жакшыртышты.']
];
const labels = ['Репродуктивдүү','Продуктивдүү','Креативдүү'];
const levels = ['Канааттандырарлык','Жакшы','Эң жакшы'];
const literacy = ['Окуу жана жазуу сабаттуулугу','Финансылык сабаттуулук','Табигый-илимий сабаттуулук','Функционалдык сабаттуулук','Экологиялык сабаттуулук','Маданий сабаттуулук','Саясий сабаттуулук','Социалдык сабаттуулук','Гендердик сабаттуулук','Санарип сабаттуулук','Этикалык сабаттуулук','Саламаттыкты сактоо сабаттуулугу','Техникалык сабаттуулук'];
const steam = ['Илим (Science)','Технология (Technology)','Инженерия (Engineering)','Искусство (Arts)','Математика (Mathematics)'];
const $ = id => document.getElementById(id);
const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const configured = window.SABAK_CONFIG?.url?.startsWith('https://') && !!window.SABAK_CONFIG?.anonKey && !window.SABAK_CONFIG.anonKey.startsWith('YOUR_');
const client = configured && window.supabase ? window.supabase.createClient(window.SABAK_CONFIG.url, window.SABAK_CONFIG.anonKey) : null;
let schools = [], all = [], isAdmin = false, isSuperAdminUser = false, adminSchoolId = null;
const schoolName = id => schools.find(s => String(s.id) === String(id))?.name || 'Мектеби көрсөтүлгөн эмес';
const observedName = r => String(r.observation?.observed_teacher_name || '').trim();
const levelField = (name, title) => `<div class="question"><p>${escapeHtml(title)} *</p>${levels.map(v => `<label class="option"><input type="radio" name="${name}" value="${escapeHtml(v)}" required>${escapeHtml(v)}</label>`).join('')}</div>`;
const multiField = (name, title, options) => `<div class="question"><p>${escapeHtml(title)} *</p><div class="check-grid">${options.map(v => `<label><input type="checkbox" name="${name}" value="${escapeHtml(v)}">${escapeHtml(v)}</label>`).join('')}</div><p class="muted">Бир же бир нече вариантты тандаңыз.</p></div>`;

async function loadSchools() {
  if (!client) return;
  const {data,error} = await client.from('schools').select('id,name').order('name');
  if (error) { $('surveyError').textContent = 'Мектептер жүктөлгөн жок: ' + error.message; return; }
  schools = data || [];
  const previousAdmin = $('adminSchool').value, previousSurvey = $('schoolSelect').value;
  $('schoolSelect').innerHTML = '<option value="">Мектепти тандаңыз</option>';


  $('adminSchool').innerHTML = '<option value="all">Бардык мектептер</option><option value="none">Мектеби көрсөтүлгөн эмес</option>';
  
$('newAdminSchool').innerHTML = '<option value="">Мектепти тандаңыз</option>';

for (const s of schools) for (const id of ['schoolSelect','adminSchool','newAdminSchool']) {

    const option = document.createElement('option'); option.value = s.id; option.textContent = s.name; $(id).appendChild(option);
  }
  if ([...$('adminSchool').options].some(o => o.value === previousAdmin)) $('adminSchool').value = previousAdmin;
  
  if (isAdmin && !isSuperAdminUser && adminSchoolId !== null) {
    $('adminSchool').innerHTML = '';
    const ownSchool = schools.find(s => String(s.id) === adminSchoolId);
    if (ownSchool) {
      const option = document.createElement('option');
      option.value = ownSchool.id;
      option.textContent = ownSchool.name;
      $('adminSchool').appendChild(option);
      $('adminSchool').value = adminSchoolId;
    }
  }

  if ([...$('schoolSelect').options].some(o => o.value === previousSurvey)) $('schoolSelect').value = previousSurvey;
  await refreshDirectory();
}
// Мектеп 1: каталогдор коопсуз RPC аркылуу гана жүктөлөт.
// Башка мектептер мурдагы кол менен толтуруучу форманы колдоно берет.
let directory = {teachers:[], subjects:[], classes:[]};
let directoryRequest = 0;
let testModeAuthorized = false;
let myTeacherProfile = null;
let sessionUser = null;
let observerTeachers = [];
let managedTeachers = [];
let managedSubjects = [];
let manageRequest = 0;
const testModeEnabled = () => testModeAuthorized && $('testModeToggle').checked && Number($('schoolSelect').value) === 1;
async function updateTestModeAccess() {
  testModeAuthorized = false;
  if (client) {
    const {data:auth} = await client.auth.getUser();
    if (auth?.user) {
      const [superResult,adminResult] = await Promise.all([
        client.from('super_admins').select('user_id').eq('user_id',auth.user.id).maybeSingle(),
        client.from('admin_users').select('school_id').eq('user_id',auth.user.id).eq('school_id',1).maybeSingle()
      ]);
      testModeAuthorized = (!!superResult.data && !superResult.error) || (!!adminResult.data && !adminResult.error);
    }
  }
  $('testModePanel').classList.toggle('hidden', !testModeAuthorized || Number($('schoolSelect').value) !== 1);
  if (!testModeAuthorized) $('testModeToggle').checked = false;
  await refreshDirectory();
}
$('testModeToggle').addEventListener('change', refreshDirectory);
const directorySelects = ['teacherSelect','observedTeacherSelect','subjectSelect','classSelect'];
function setLegacyMode(enabled) {
  $('legacyFields').classList.toggle('hidden', !enabled);
  $('directoryFields').classList.toggle('hidden', enabled);
  for (const input of $('legacyFields').querySelectorAll('input')) {
    input.required = enabled;
    input.disabled = !enabled;
  }
  for (const id of directorySelects) {
    $(id).required = !enabled;
    $(id).disabled = enabled;
  }
}
function fillDirectorySelect(id, rows, label, nameKey='name') {
  const select = $(id);
  select.replaceChildren(new Option(label, ''));
  for (const row of rows) select.add(new Option(row[nameKey], String(row.id)));
}
async function updateSurveyAccess() {
  if (!client) return;
  const {data} = await client.auth.getUser();
  sessionUser = data?.user || null;
  myTeacherProfile = null;
  if (sessionUser) {
    const profile = await client.rpc('get_my_teacher_profile');
    if (!profile.error) myTeacherProfile = Array.isArray(profile.data) ? (profile.data[0] || null) : (profile.data || null);
  }
  const allowed = !!sessionUser && !isSuperAdminUser && !!myTeacherProfile && myTeacherProfile.is_active === true && Number(myTeacherProfile.school_id) === Number($('schoolSelect').value);
  $('surveyAuthNotice').classList.toggle('hidden', allowed);
  $('surveyAuthNotice').textContent = sessionUser
    ? (isSuperAdminUser ? 'Супер администратор сабакка талдоо бере албайт.' : 'Талдоо үчүн аккаунтуңуз ушул мектептеги активдүү мугалим профилине байланышкан болушу керек.')
    : 'Талдоо жүргүзүү үчүн «Жеке кабинет» же «Администратор» бөлүмүнөн аккаунтуңузга кириңиз.';
  $('submitBtn').disabled = !allowed;
  return allowed;
}
async function refreshDirectory() {
  const request = ++directoryRequest;
  const schoolId = Number($('schoolSelect').value);
  $('directoryStatus').textContent = '';
  $('testModePanel').classList.toggle('hidden', !testModeAuthorized || schoolId !== 1);
  if (schoolId !== 1) {
    $('testModeToggle').checked = false;
    setLegacyMode(true);
    $('directoryStatus').textContent = 'Бул мектептин мугалимдер каталогу азырынча даяр эмес. Талдоо жөнөтүү убактылуу жеткиликсиз.';
    $('submitBtn').disabled = true;
    return;
  }
  setLegacyMode(false);
  for (const id of directorySelects) $(id).disabled = true;
  $('directoryStatus').textContent = 'Тизмелер жүктөлүүдө...';
  if (!client) return;
  const test = testModeEnabled();
  const [mainResult, observerResult] = await Promise.all([
    client.rpc(test ? 'get_test_observation_directory' : 'get_observation_directory', {p_school_id: schoolId}),
    test ? client.rpc('get_observation_directory', {p_school_id: schoolId}) : Promise.resolve(null)
  ]);
  if (request !== directoryRequest) return;
  if (mainResult.error || observerResult?.error) {
    $('directoryStatus').textContent = 'Каталог жүктөлгөн жок: ' + (mainResult.error || observerResult.error).message;
    return;
  }
  const data = mainResult.data;
  directory = {
    teachers:Array.isArray(data?.teachers)?data.teachers:[],
    subjects:Array.isArray(data?.subjects)?data.subjects:[],
    classes:Array.isArray(data?.classes)?data.classes:[]
  };
  observerTeachers = test ? (Array.isArray(observerResult.data?.teachers) ? observerResult.data.teachers : []) : directory.teachers;
  fillDirectorySelect('teacherSelect', observerTeachers, 'Талдоочу мугалимди тандаңыз', 'full_name');
  fillDirectorySelect('observedTeacherSelect',directory.teachers,'Сабак өткөн мугалимди тандаңыз','full_name');
  fillDirectorySelect('subjectSelect',directory.subjects,'Предметти тандаңыз');
  fillDirectorySelect('classSelect',directory.classes,'Классты тандаңыз');
  const complete = observerTeachers.length && directory.teachers.length && directory.subjects.length && directory.classes.length;
  for (const id of directorySelects) $(id).disabled = !complete;
  // Талдоочунун аты бардык ролдор үчүн аккаунттагы мугалим профилинен гана алынат.
  await updateSurveyAccess();
  const mine = myTeacherProfile && Number(myTeacherProfile.school_id) === schoolId && myTeacherProfile.is_active === true
    ? observerTeachers.find(t => Number(t.id) === Number(myTeacherProfile.id)) : null;
  $('teacherSelect').disabled = true;
  if (isSuperAdminUser) {
    $('directoryStatus').textContent = 'Супер администратор талдоо бере албайт.';
    $('submitBtn').disabled = true;
  } else if (mine) {
    $('teacherSelect').value = String(mine.id);
    $('directoryStatus').textContent = 'Талдоочу: ' + mine.full_name + ' (өзгөртүүгө болбойт).';
    $('submitBtn').disabled = !complete;
  } else {
    $('directoryStatus').textContent = 'Бул мектепте аккаунтуңузга байланышкан активдүү мугалим табылган жок.';
    $('submitBtn').disabled = true;
  }
  await updateSurveyAccess();
  if (schoolId !== 1) $('submitBtn').disabled = true;
}
$('schoolSelect').addEventListener('change', refreshDirectory);

if (!client) $('configWarning').classList.remove('hidden');
$('observationFields').innerHTML =
  levelField('organization_level','Сабакты уюштуруу жөндөмдүүлүгү') +
  levelField('technology_level','Инновациялык-компьютердик технологиялар менен иштөө жөндөмдүүлүгү') +
  multiField('literacy_types','Сабаттуулуктун кайсы түрлөрүнө басым жасалды?',literacy) +
  '<div class="question"><p>STEAM компоненттери</p><p class="muted">S — Science (илим), T — Technology (технология), E — Engineering (инженерия), A — Arts (искусство), M — Mathematics (математика).</p></div>' +
  multiField('steam_components','Сабакта STEAMдин кайсы компоненттери колдонулду?',steam) +
  levelField('pedagogical_level','Психологиялык-педагогикалык кырдаалдан чыгуу жөндөмдүүлүгү') +
  levelField('reinforcement_level','Сабакты бышыктоо жөндөмдүүлүгү') +
  '<div class="question"><p>Сабакта кайсы көндүм басымдуулук кылды? *</p><label class="option"><input type="radio" name="dominant_skill" value="Жумшак көндүм (soft skills)" required>Жумшак көндүм (soft skills)</label><label class="option"><input type="radio" name="dominant_skill" value="Катуу көндүм (hard skills)" required>Катуу көндүм (hard skills)</label></div>';
$('questions').innerHTML = questions.map((q,i) => `<div class="question"><p>${i+1}. ${escapeHtml(q[0])}</p>${q.slice(1).map((a,j) => `<label class="option"><input type="radio" name="q${i}" value="${j}" required>${escapeHtml(a)}</label>`).join('')}</div>`).join('');

function tab(which) {
  $('teacher').classList.toggle('hidden',which !== 'teacher');
  $('admin').classList.toggle('hidden',which !== 'admin');
  $('cabinet').classList.toggle('hidden',which !== 'cabinet');
  if ($('directorPanel')) $('directorPanel').classList.toggle('hidden',which !== 'director');
  if (which === 'director') $('teacher').classList.add('hidden');
  $('teacherTab').className = which === 'teacher' ? '' : 'secondary';
  $('adminTab').className = which === 'admin' ? '' : 'secondary';
  $('cabinetTab').className = which === 'cabinet' ? '' : 'secondary';
  if ($('directorTab')) $('directorTab').className = which === 'director' ? '' : 'secondary';
  if (which === 'director') loadDirectorDashboard();
  if (which === 'admin') checkSession();
  if (which === 'cabinet') loadCabinet();
}
$('teacherTab').onclick = () => tab('teacher');
$('adminTab').onclick = () => tab('admin');
$('cabinetTab').onclick = () => tab('cabinet');
if ($('directorTab')) $('directorTab').onclick = () => tab('director');

$('survey').onsubmit = async e => {
  e.preventDefault(); $('surveyError').textContent = '';
  if (!client) { $('surveyError').textContent = 'Онлайн база азырынча орнотулган эмес.'; return; }
  const allowed = await updateSurveyAccess();
  if (!allowed || Number($('schoolSelect').value) !== 1) { $('surveyError').textContent = 'Бул мектеп үчүн аккаунт менен каталог даяр болушу керек.'; return; }
  const form = new FormData(e.target);
  // Disabled select FormData'га кирбейт. ID аккаунт профилинен гана коюлат.
  if (myTeacherProfile) form.set('teacher_id', String(myTeacherProfile.id));
  const answers = questions.map((_,i) => form.get('q'+i) === null ? NaN : Number(form.get('q'+i)));
  const schoolId = Number(form.get('school_id'));
  if (!schools.some(s => Number(s.id) === schoolId)) { $('surveyError').textContent = 'Мектепти тандаңыз.'; return; }
  if (answers.some(v => ![0,1,2].includes(v))) { $('surveyError').textContent = '5 суроонун баарына жооп бериңиз.'; return; }
  const selectedLiteracy = form.getAll('literacy_types'), selectedSteam = form.getAll('steam_components');
  if (!selectedLiteracy.length || !selectedSteam.length) { $('surveyError').textContent = 'Сабаттуулуктун жана STEAMдин жок дегенде бирден түрүн тандаңыз.'; return; }
  const studentCount = Number(form.get('student_count'));
  if (!Number.isInteger(studentCount) || studentCount < 0 || studentCount > 1000) { $('surveyError').textContent = 'Окуучулардын санын туура жазыңыз.'; return; }
  const counts = labels.map((_,i) => answers.filter(x => x === i).length);
  const max = Math.max(...counts), winners = labels.filter((_,i) => counts[i] === max);
  const outcome = winners.length === 1 ? winners[0] : 'Аралаш: ' + winners.join(' / ');
  const useDirectory = schoolId === 1;
  const submittingTest = testModeEnabled();
  if (isSuperAdminUser || !myTeacherProfile || myTeacherProfile.is_active !== true || Number(myTeacherProfile.school_id) !== schoolId) { $('surveyError').textContent = 'Талдоону өзүңүздүн активдүү мугалим аккаунтуңуз менен гана жөнөтө аласыз.'; return; }
  const getSelected = (id, rows) => rows.find(x => String(x.id) === String(form.get(id)));
  const observer = useDirectory ? observerTeachers.find(t => Number(t.id) === Number(myTeacherProfile?.id)) : null;
  const observed = useDirectory ? getSelected('observed_teacher_id',directory.teachers) : null;
  const selectedSubject = useDirectory ? getSelected('subject_id',directory.subjects) : null;
  const selectedClass = useDirectory ? getSelected('class_id',directory.classes) : null;
  if (useDirectory && (!observer || !observed || !selectedSubject || !selectedClass)) {
    $('surveyError').textContent = 'Мугалимди, предметти жана классты тизмеден тандаңыз.'; return;
  }
  const observedTeacher = useDirectory ? observed.full_name : String(form.get('observed_teacher') || '').trim();
  const observerTeacher = useDirectory ? observer.full_name : String(form.get('teacher') || '').trim();
  if (!observerTeacher || !observedTeacher) { $('surveyError').textContent = 'Эки мугалимдин тең аты-жөнүн көрсөтүңүз.'; return; }
  const observation = {
    version:2, observed_teacher_name:observedTeacher, student_count:studentCount,
    ...(useDirectory ? {observer_teacher_id:observer.id, observed_teacher_id:observed.id, subject_id:selectedSubject.id, class_id:selectedClass.id} : {}),
    visit_purpose:String(form.get('visit_purpose') || '').trim(),
    teaching_methods:String(form.get('teaching_methods') || '').trim(),
    organization_level:String(form.get('organization_level') || ''),
    technology_level:String(form.get('technology_level') || ''),
    literacy_types:selectedLiteracy, steam_components:selectedSteam,
    pedagogical_level:String(form.get('pedagogical_level') || ''),
    reinforcement_level:String(form.get('reinforcement_level') || ''),
    dominant_skill:String(form.get('dominant_skill') || ''),
    feedback:String(form.get('feedback') || '').trim()
  };
  const payload = {
    is_test:submittingTest,
    school_id:schoolId, teacher_name:observerTeacher,
    subject:useDirectory ? selectedSubject.name : String(form.get('subject') || '').trim(),
    classroom:useDirectory ? selectedClass.name : String(form.get('classroom') || '').trim(),
    topic:String(form.get('topic') || '').trim(),
    answers,counts,outcome,observation
  };
  if (observer && Number(observer.id) === Number(observed?.id)) { $('surveyError').textContent = 'Өз сабагыңызга өзүңүз талдоо бере албайсыз.'; return; }
  $('submitBtn').disabled = true;
  try {
    const {error} = await client.from('lesson_reviews').insert(payload);
    if (error) throw error;
    $('survey').classList.add('hidden'); $('result').classList.remove('hidden');
    $('result').innerHTML = `<h2>Жыйынтык сакталды ✓</h2><h3>${escapeHtml(outcome)}</h3>${labels.map((l,i) => `<p>${l}: <b>${Math.round(counts[i]/questions.length*100)}%</b></p><div class="bar"><div class="fill" style="width:${counts[i]/questions.length*100}%"></div></div>`).join('')}<p class="muted">Жыйынтык администрациянын базасына сакталды.</p><button id="again">Жаңы талдоо</button>`;
    $('again').onclick = async () => { e.target.reset(); $('survey').classList.remove('hidden'); $('result').classList.add('hidden'); await refreshDirectory(); window.scrollTo(0,0); };
  } catch(err) { $('surveyError').textContent = 'Сактоо мүмкүн болгон жок: ' + err.message; }
  finally { await updateSurveyAccess(); }
};

async function isSuperAdmin() {
  if (!client) return false;
  const {data:userData,error:userError} = await client.auth.getUser();
  if (userError || !userData.user) return false;
  const {data,error} = await client.from('super_admins').select('user_id').eq('user_id',userData.user.id).maybeSingle();
  if (error) { console.error('Укукту текшерүү катасы:',error); return false; }
  return !!data;
}
async function checkSession() {
  if (!client) return;
  const {data,error} = await client.auth.getUser();
  const user = error ? null : data.user;
  isAdmin = false; adminSchoolId = null;
  if (user) {
    const {data:admin,error:adminError} = await client.from('admin_users').select('user_id,school_id').eq('user_id',user.id).maybeSingle();
    isAdmin = !adminError && !!admin;
    if (isAdmin && admin.school_id != null) adminSchoolId = String(admin.school_id);
  }
  isSuperAdminUser = await isSuperAdmin();
  isAdmin = isAdmin || isSuperAdminUser;
  window.dispatchEvent(new CustomEvent('sabak-admin-access', {detail:{canPreview: !!user && isAdmin && !isSuperAdminUser && adminSchoolId !== null}}));
    await loadSchools();
  $('loginCard').classList.toggle('hidden',isAdmin);
  $('dashboard').classList.toggle('hidden',!isAdmin);
  $('superAdminPanel').classList.toggle('hidden',!isSuperAdminUser);
  $('schoolComparisonPanel').classList.toggle('hidden', !isSuperAdminUser);
  $('teacherManagementPanel').classList.toggle('hidden', !isAdmin);
  $('passwordAdminPanel').classList.toggle('hidden', !isAdmin);
  $('accountApprovalPanel').classList.toggle('hidden', !isAdmin);
  if (isAdmin) {
  await loadDashboard();
  await loadTeacherManagement();
  await loadPasswordResetSchools();
  await loadAccountApprovals();

  if (isSuperAdminUser) {
    renderManageSchools();
    await loadManageAdmins();
  }
}
  else if (user) $('loginError').textContent = 'Бул аккаунт администратор катары катталган эмес.';
}
$('login').onsubmit = async e => {
  e.preventDefault(); $('loginError').textContent = '';
  if (!client) { $('loginError').textContent = 'Адегенде базаны орнотуңуз.'; return; }
  const f = new FormData(e.target);
  const {error} = await client.auth.signInWithPassword({email:f.get('email'),password:f.get('password')});
  if (error) { $('loginError').textContent = 'Кирүү ишке ашкан жок: ' + error.message; return; }
  await checkSession();
  await updateTestModeAccess();
};
$('logout').onclick = async () => { await client?.auth.signOut(); all=[]; isAdmin=false; isSuperAdminUser=false; adminSchoolId=null; $('loginError').textContent=''; await checkSession(); await updateTestModeAccess(); await updateSurveyAccess(); };
async function loadDashboard() {
  try {
    $('adminError').textContent = ''; all=[]; let start=0;
    while (true) {
      const {data,error} = await client.from('lesson_reviews').select('*').order('created_at',{ascending:false}).range(start,start+999);
      if (error) throw error;
      all.push(...data.filter(r => r.is_test !== true));
      if (data.length < 1000) break;
      start += 1000;
    }
    renderDashboard();
  } catch(e) { $('adminError').textContent = 'Маалыматтарды алуу мүмкүн болгон жок: ' + e.message; }
}
const canDeleteReview = r => isAdmin && (isSuperAdminUser || (adminSchoolId !== null && String(r.school_id) === adminSchoolId));
const schoolFiltered = () => all.filter(r => { const v=$('adminSchool').value; return v==='all' || (v==='none' ? r.school_id==null : String(r.school_id)===v); });
const visibleRows = () => schoolFiltered().filter(r => [r.teacher_name,observedName(r),r.subject,r.classroom,r.topic,schoolName(r.school_id)].some(x => String(x??'').toLocaleLowerCase().includes($('filter').value.trim().toLocaleLowerCase())));

function renderDashboard() {
  const rows = schoolFiltered();
  const byTeacher = new Map();
  for (const r of rows) {
    const observer = String(r.teacher_name || '').trim();
    const observed = observedName(r);
    const key = [String(r.school_id ?? 'none'),observer.toLocaleLowerCase(),observed.toLocaleLowerCase()].join('|');
    const existing = byTeacher.get(key);
    if (existing) existing.n++;
    else byTeacher.set(key,{school:schoolName(r.school_id),observer,observed:observed || '—',n:1,last:r.outcome});
  }
  $('unique').textContent = new Set(rows.map(r => String(r.school_id??'none')+'|'+String(r.teacher_name||'').trim().toLocaleLowerCase())).size;
  $('total').textContent = rows.length;
  $('week').textContent = rows.filter(r => Date.now()-new Date(r.created_at).getTime() <= 7*86400000).length;
  $('distribution').innerHTML = labels.map(l => {
    const n=rows.filter(r => r.outcome===l).length;
    const pct=rows.length?Math.round(n/rows.length*100):0;
    return `<p>${l}: <b>${n}</b> (${pct}%)</p><div class="bar"><div class="fill" style="width:${pct}%"></div></div>`;
  }).join('') + `<p class="muted">Аралаш жыйынтыктар: ${rows.filter(r => String(r.outcome||'').startsWith('Аралаш')).length}</p>`;
  $('teachersTable').innerHTML = [...byTeacher.values()].sort((a,b) => b.n-a.n).map(x => `<tr><td>${escapeHtml(x.school)}</td><td>${escapeHtml(x.observer)}</td><td>${escapeHtml(x.observed)}</td><td>${x.n}</td><td>${escapeHtml(x.last)}</td></tr>`).join('') || '<tr><td colspan="5">Маалымат жок</td></tr>';
  const groups = new Map();
  for (const r of all) { const key=String(r.school_id??'none'); if(!groups.has(key)) groups.set(key,[]); groups.get(key).push(r); }
  $('schoolsTable').innerHTML = [...groups].map(([id,list]) => `<tr><td>${escapeHtml(schoolName(id==='none'?null:id))}</td><td>${new Set(list.map(r => String(r.teacher_name||'').trim().toLocaleLowerCase())).size}</td><td>${list.length}</td>${labels.map(l => `<td>${list.filter(r => r.outcome===l).length}</td>`).join('')}<td>${list.filter(r => String(r.outcome||'').startsWith('Аралаш')).length}</td></tr>`).join('') || '<tr><td colspan="7">Маалымат жок</td></tr>';
  renderRecords();
}
const observationFields = [
  ['observed_teacher_name','Сабак өткөн мугалим'],
  ['student_count','Катышкан окуучулар'],
  ['visit_purpose','Катышуунун максаты'],
  ['teaching_methods','Колдонулган усулдар'],
  ['organization_level','Уюштуруу жөндөмдүүлүгү'],
  ['technology_level','Компьютердик технологиялар'],
  ['literacy_types','Сабаттуулуктун түрлөрү'],
  ['steam_components','STEAM компоненттери'],
  ['pedagogical_level','Педагогикалык кырдаал'],
  ['reinforcement_level','Бышыктоо жөндөмдүүлүгү'],
  ['dominant_skill','Басымдуу көндүм'],
  ['feedback','Сунуштар жана пикирлер']
];
const valueText = v => Array.isArray(v) ? v.join(', ') : String(v??'');
function recordDetails(r) {
  const obs=r.observation||{}, qs=Array.isArray(r.answers)&&r.answers.length===10?legacyQuestions:questions;
  const meta=obs.version===2 ? observationFields.map(([key,title]) => `<p><b>${escapeHtml(title)}:</b> ${escapeHtml(valueText(obs[key]))||'—'}</p>`).join('') : '<p class="muted">Мурдагы 10 суроолук талдоо</p>';
  const answers=(r.answers||[]).map((v,i) => `<p><b>${i+1}. ${escapeHtml(qs[i]?.[0]||'')}</b> ${escapeHtml(qs[i]?.[Number(v)+1]||'')}</p>`).join('');
  return `<details><summary>Көрүү</summary>${meta}<h4>Критерийлер боюнча жооптор</h4>${answers}</details>`;
}
function renderRecords() {
  $('records').innerHTML = visibleRows().map(r => `<tr><td>${escapeHtml(new Date(r.created_at).toLocaleString('ky-KG'))}</td><td>${escapeHtml(schoolName(r.school_id))}</td><td>${escapeHtml(r.teacher_name)}</td><td>${escapeHtml(observedName(r)||'—')}</td><td>${escapeHtml(r.subject)} / ${escapeHtml(r.classroom)}</td><td>${escapeHtml(r.topic)}</td><td>${escapeHtml(r.outcome)}</td><td>${recordDetails(r)}<p><button type="button" class="secondary smallbtn" data-pdf-admin="${escapeHtml(r.id)}">PDF отчет</button></p></td><td>${canDeleteReview(r)?`<button class="danger smallbtn" data-delete-id="${escapeHtml(r.id)}">Өчүрүү</button>`:''}</td></tr>`).join('') || '<tr><td colspan="9">Маалымат жок</td></tr>';
}
$('adminSchool').onchange = renderDashboard;
$('filter').oninput = renderRecords;
$('records').onclick = async e => {
  const button = e.target.closest('[data-delete-id]');
  if (!button || !client || !isAdmin) return;
  const id = button.dataset.deleteId;
  const review = all.find(r => String(r.id) === id);
  if (!review || !canDeleteReview(review)) {
    $('adminError').textContent = 'Бул талдоону өчүрүүгө уруксатыңыз жок.';
    return;
  }
  const description = [schoolName(review.school_id), review.teacher_name, observedName(review), review.topic].filter(Boolean).join(' / ');
  if (!confirm('Төмөнкү талдоону биротоло өчүрөсүзбү?\n\n' + description + '\n\nБул аракет кайтарылбайт.')) return;
  button.disabled = true;
  $('adminError').textContent = '';
  try {
    // Укукту акыркы жолу Supabase'теги admin_delete_review функциясы текшерет.
    const {error} = await client.rpc('admin_delete_review', {review_id:id});
    if (error) throw error;
    await loadDashboard();
  } catch (error) {
    $('adminError').textContent = 'Өчүрүү ишке ашкан жок: ' + error.message;
    button.disabled = false;
  }
};
async function resetStats(allSchools) {
  if(!isSuperAdminUser)return;
  const selected=$('adminSchool').value;
  if(!allSchools&&selected==='all'){alert('Адегенде бир мектепти тандаңыз.');return;}
  const target=allSchools?'БАРДЫК МЕКТЕПТЕР':selected==='none'?'МЕКТЕБИ КӨРСӨТҮЛБӨГӨН ЖАЗУУЛАР':schoolName(selected);
  if(!confirm(target+' боюнча бардык талдоолорду биротоло өчүрөсүзбү?'))return;
  if(prompt('Ырастоо үчүн ТАЗАЛА деп жазыңыз:')!=='ТАЗАЛА')return;
  for(const id of ['resetAll','resetSchool'])$(id).disabled=true;
  try {
    const {data,error}=await client.rpc('admin_reset_reviews',{target_school_id:allSchools?null:selected==='none'?-1:Number(selected),reset_all:allSchools});
    if(error)throw error;
    $('deleteStatus').textContent='Өчүрүлгөн жазуулар: '+data;
    await loadDashboard();
  } catch(e) { $('deleteStatus').textContent='Ката: '+e.message; }
  finally { for(const id of ['resetAll','resetSchool'])$(id).disabled=false; }
}
$('resetSchool').onclick=()=>resetStats(false);
$('resetAll').onclick=()=>resetStats(true);
$('export').onclick=()=>{
  const columns=['Убакыт','Мектеп','Талдоочу мугалим','Сабак өткөн мугалим','Предмет','Класс','Тема','Жыйынтык','Анкета версиясы','Репродуктивдүү','Продуктивдүү','Креативдүү',...observationFields.filter(x=>x[0]!=='observed_teacher_name').map(x=>x[1]),...Array.from({length:10},(_,i)=>`Суроо ${i+1}`)];
  const rows=visibleRows().map(r=>{
    const obs=r.observation||{}, qs=Array.isArray(r.answers)&&r.answers.length===10?legacyQuestions:questions;
    return [r.created_at,schoolName(r.school_id),r.teacher_name,observedName(r),r.subject,r.classroom,r.topic,r.outcome,obs.version===2?'5 суроо':'10 суроо',...(r.counts||[]),...observationFields.filter(x=>x[0]!=='observed_teacher_name').map(([key])=>valueText(obs[key])),...Array.from({length:10},(_,i)=>qs[i]?.[Number(r.answers?.[i])+1]||'')];
  });
  const csv='\ufeff'+[columns,...rows].map(row=>row.map(v=>{let s=String(v??'');if(/^[\s]*[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}).join(';')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='sabak-monitoring.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
async function loadManageAdmins() {
  if (!client || !isSuperAdminUser) return;

  const table = $('manageAdminsTable');

  table.innerHTML =
    '<tr><td colspan="3">Жүктөлүүдө...</td></tr>';

  const { data, error } = await client.rpc('list_school_admins');

  if (error) {
    table.innerHTML =
      '<tr><td colspan="3">Тизмени жүктөөдө ката кетти</td></tr>';

    $('adminManageStatus').textContent =
      'Ката: ' + error.message;

    return;
  }

  table.innerHTML = (data || []).map(admin => `
    <tr>
      <td>${escapeHtml(admin.email)}</td>
      <td>${escapeHtml(admin.school_name || 'Башкы администратор')}</td>
      <td>—</td>
    </tr>
  `).join('') ||
  '<tr><td colspan="3">Администраторлор жок</td></tr>';
}
function renderManageSchools() {
  if(!isSuperAdminUser)return;
  
$('manageSchoolsTable').innerHTML = schools.map(s => `
  <tr>
    <td>${escapeHtml(s.name)}</td>
    <td>
      <button type="button" class="secondary smallbtn"
        data-rename-school="${escapeHtml(s.id)}">
        Атын өзгөртүү
      </button>
      ${Number(s.id) === 1 ? '' : `
        <button type="button" class="danger smallbtn"
          data-delete-school="${escapeHtml(s.id)}">
          Өчүрүү
        </button>
      `}
    </td>
  </tr>
`).join('') || '<tr><td colspan="2">Мектеп жок</td></tr>';

}
$('addSchoolForm').onsubmit=async event=>{
  event.preventDefault();if(!client||!isSuperAdminUser)return;
  const name=$('newSchoolName').value.trim();if(!name)return;
  const button=$('addSchoolForm').querySelector('button[type="submit"]');button.disabled=true;$('schoolManageStatus').textContent='';
  try {
    const {error}=await client.rpc('admin_add_school',{school_name:name});if(error)throw error;
    $('newSchoolName').value='';await loadSchools();renderManageSchools();renderDashboard();
    $('schoolManageStatus').textContent='Мектеп ийгиликтүү кошулду.';
  }catch(error){$('schoolManageStatus').textContent='Ката: '+error.message;}
  finally{button.disabled=false;}
};

$('addAdminForm').onsubmit = async event => {
  event.preventDefault();

  if (!client || !isSuperAdminUser) return;

  const email = $('newAdminEmail').value.trim();
  const schoolId = Number($('newAdminSchool').value);
  const button = $('addAdminForm').querySelector('button[type="submit"]');

  if (!email || !Number.isSafeInteger(schoolId) || schoolId <= 0) return;

  button.disabled = true;
  $('adminManageStatus').textContent = '';

  try {
    const { data, error } = await client.functions.invoke(
      'manage-school-admins',
      {
        body: {
          email: email,
          school_id: schoolId
        }
      }
    );

if (error) {
  let message = error.message;

  if (error.context) {
    try {
      const result = await error.context.json();
      message = result.error || result.message || message;
    } catch (_) {}
  }

  throw new Error(message);
}

if (data?.error) throw new Error(data.error);

    $('newAdminEmail').value = '';
    $('newAdminSchool').value = '';

    $('adminManageStatus').textContent =
      'Администраторго чакыруу жөнөтүлдү. Электрондук почтасын текшерсин.';
  } catch (error) {
    $('adminManageStatus').textContent =
      'Ката: ' + error.message;
  } finally {
    button.disabled = false;
  }
};

$('manageSchoolsTable').onclick=async event=>{
  const button=event.target.closest('[data-rename-school]');if(!button||!client||!isSuperAdminUser)return;
  const school=schools.find(s=>String(s.id)===button.dataset.renameSchool);if(!school)return;
  const answer=prompt('Мектептин жаңы аталышы:',school.name);if(answer===null)return;
  const name=answer.trim();if(!name||name===school.name)return;
  if(name.length>200){$('schoolManageStatus').textContent='Аталыш 200 белгиден ашпашы керек.';return;}
  button.disabled=true;$('schoolManageStatus').textContent='';
  try{
    const {error}=await client.rpc('admin_rename_school',{target_id:school.id,new_name:name});if(error)throw error;
    await loadSchools();renderManageSchools();renderDashboard();$('schoolManageStatus').textContent='Мектептин аталышы өзгөртүлдү.';
  }catch(error){$('schoolManageStatus').textContent='Ката: '+error.message;}
  finally{button.disabled=false;}
};

$('manageSchoolsTable').addEventListener('click', async event => {
  const button = event.target.closest('[data-delete-school]');
  if (!button || !client || !isSuperAdminUser) return;

  const school = schools.find(
    s => String(s.id) === button.dataset.deleteSchool
  );

  if (!school || Number(school.id) === 1) return;

  const confirmed = confirm(
    `"${school.name}" мектебин өчүрөсүзбү?\n\n` +
    'Мектепте талдоолор же администраторлор болсо, өчүрүүгө уруксат берилбейт.'
  );

  if (!confirmed) return;

  button.disabled = true;
  $('schoolManageStatus').textContent = '';

  try {
    const {error} = await client.rpc('admin_delete_school', {
      target_id: school.id
    });

    if (error) throw error;

    await loadSchools();
    renderManageSchools();
    renderDashboard();

    $('schoolManageStatus').textContent =
      'Мектеп ийгиликтүү өчүрүлдү.';
  } catch (error) {
    $('schoolManageStatus').textContent =
      'Өчүрүү ишке ашкан жок: ' + error.message;
  } finally {
    button.disabled = false;
  }
});


// Жеке кабинет: талдоочунун аты-жөнү жок, сервер чектеген RPC гана колдонулат.
// Администратордук сессия менен бирдей Supabase Auth колдонулат.
function cabinetSafeText(value) {
  if (Array.isArray(value)) return value.map(cabinetSafeText).join(', ');
  if (value === null || value === undefined || value === '') return '—';
  return String(value);
}
const cabinetObservationLabels = [
  ['student_count','Катышкан окуучулар'],
  ['visit_purpose','Катышуунун максаты'],
  ['teaching_methods','Колдонулган усулдар'],
  ['organization_level','Сабакты уюштуруу'],
  ['technology_level','Технологияларды колдонуу'],
  ['literacy_types','Сабаттуулуктун түрлөрү'],
  ['steam_components','STEAM компоненттери'],
  ['pedagogical_level','Педагогикалык кырдаал'],
  ['reinforcement_level','Бышыктоо жөндөмдүүлүгү'],
  ['dominant_skill','Басымдуу көндүм'],
  ['feedback','Сунуштар жана пикирлер']
];
function renderCabinetReviews(reviews) {
  $('cabinetTotal').textContent = reviews.length;
  $('cabinetRecent').textContent = reviews.filter(r => Date.now() - new Date(r.review_date).getTime() <= 7*86400000).length;
  if (!reviews.length) {
    $('cabinetReviews').innerHTML = '<p class="empty">Азырынча сиздин сабактарыңыз боюнча талдоо жок.</p>';
    return;
  }
  $('cabinetReviews').innerHTML = reviews.map(r => {
    const counts = Array.isArray(r.counts) ? r.counts : [];
    const answers = Array.isArray(r.answers) ? r.answers : [];
    const qs = answers.length === 10 ? legacyQuestions : questions;
    const total = counts.reduce((sum,n) => sum + (Number(n)||0),0);
    const scores = labels.map((label,i) => {
      const n = Number(counts[i])||0;
      const pct = total ? Math.round(n/total*100) : 0;
      return `<p>${escapeHtml(label)}: <b>${n} (${pct}%)</b></p><div class="bar"><div class="fill" style="width:${pct}%"></div></div>`;
    }).join('');
    const details = cabinetObservationLabels.map(([key,label]) =>
      `<p><b>${escapeHtml(label)}:</b> ${escapeHtml(cabinetSafeText(r.observation?.[key]))}</p>`
    ).join('');
    const answerDetails = answers.map((answer,i) =>
      `<p><b>${i+1}. ${escapeHtml(qs[i]?.[0]||'Критерий')}</b> ${escapeHtml(qs[i]?.[Number(answer)+1]||'—')}</p>`
    ).join('');
    return `<article class="card" style="box-shadow:none;border:1px solid #e2e8f0;margin:14px 0">
      <div class="topline"><h3>${escapeHtml(r.subject||'Предмет көрсөтүлгөн эмес')} — ${escapeHtml(r.classroom||'')}</h3><span class="muted">${escapeHtml(new Date(r.review_date).toLocaleString('ky-KG'))}</span></div>
      <p><b>Тема:</b> ${escapeHtml(r.topic||'—')}</p>
      <p><b>Жыйынтык:</b> ${escapeHtml(r.outcome||'—')}</p>
      ${scores}
      <details><summary>Толук талдоону жана сунуштарды көрүү</summary>${details}<h4>Критерийлер боюнча жооптор</h4>${answerDetails}</details>
      <button type="button" class="secondary smallbtn" data-pdf-cabinet="${escapeHtml(r.review_id)}">PDF отчет</button>
    </article>`;
  }).join('');
}
// Калыбына келтирүү шилтемеси аркылуу кирген учурда кадимки кабинетти жашырабыз.
let passwordRecoveryMode = false;
// Supabase URL'деги recovery белгисин сессияны иштеткенде өчүрүшү мүмкүн.
// Ошондуктан белги index.html'деги алгачкы скриптте сакталат.
const recoveryLinkHint = !!window.__sabakRecoveryLink || /(?:[?#&])type=recovery(?:&|$)/.test(window.location.href);
const recoveryPendingKey = 'sabak-password-recovery-request';
const recoveryFromPendingLink = (() => {
  try {
    const sent = Number(sessionStorage.getItem(recoveryPendingKey) || 0);
    const hasAuthCallback = /(?:[?#&])(?:code|access_token|token_hash)=/.test(window.location.href) || !!window.__sabakRecoveryCallback;
    return hasAuthCallback && sent > 0 && Date.now() - sent < 60 * 60 * 1000;
  } catch (_) { return false; }
})();
if (client) {
  client.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') {
      passwordRecoveryMode = true;
      queueMicrotask(() => tab('cabinet'));
    }
  });
}
function showPasswordRecovery() {
  $('cabinetLoginCard').classList.add('hidden');
  $('cabinetDashboard').classList.add('hidden');
  $('teacherAccountLinkPanel').classList.add('hidden');
  $('passwordRecoveryCard').classList.remove('hidden');
}
// Сырсөздү калыбына келтирүү панелинин баскычы index.html ичинде өз алдынча иштейт.
$('forgotPasswordForm').onsubmit = async event => {
  event.preventDefault();
  const status = $('forgotPasswordStatus'); status.textContent = '';
  if (!client) { status.textContent = 'Supabase конфигурациясы жок.'; return; }
  const button = event.target.querySelector('button[type="submit"]'); button.disabled = true;
  try {
    const email = new FormData(event.target).get('email').trim();
    const redirectTo = window.location.origin + window.location.pathname;
    const {error} = await client.auth.resetPasswordForEmail(email, {redirectTo});
    if (error) throw error;
    try { sessionStorage.setItem(recoveryPendingKey, String(Date.now())); } catch (_) {}
    status.textContent = 'Эгер бул почта катталган болсо, сырсөздү калыбына келтирүү шилтемеси жөнөтүлөт. Почтаңызды жана Спам папкасын текшериңиз.';
  } catch (error) { status.textContent = 'Шилтемени жөнөтүү катасы: ' + error.message; }
  finally { button.disabled = false; }
};
$('passwordRecoveryForm').onsubmit = async event => {
  event.preventDefault();
  const status = $('passwordRecoveryStatus'); status.textContent = '';
  const form = new FormData(event.target);
  const password = String(form.get('password') || '');
  if (password !== String(form.get('confirm') || '')) { status.textContent = 'Сырсөздөр дал келген жок.'; return; }
  const button = event.target.querySelector('button[type="submit"]'); button.disabled = true;
  try {
    const {error} = await client.auth.updateUser({password});
    if (error) throw error;
    status.textContent = 'Сырсөз ийгиликтүү жаңыртылды. Эми жаңы сырсөз менен кириңиз.';
    event.target.reset();
    await client.auth.signOut();
    passwordRecoveryMode = false;
    try { sessionStorage.removeItem(recoveryPendingKey); } catch (_) {}
    history.replaceState(null, '', window.location.pathname);
    $('passwordRecoveryCard').classList.add('hidden');
    $('cabinetLoginCard').classList.remove('hidden');
    $('cabinetDashboard').classList.add('hidden');
    $('teacherAccountLinkPanel').classList.add('hidden');
    $('cabinetSessionNotice').textContent = 'Сырсөз жаңыртылды. Жаңы сырсөз менен кириңиз.';
    await updateSurveyAccess();
  } catch(error) { status.textContent = 'Сырсөздү жаңыртуу катасы: ' + error.message; }
  finally { button.disabled = false; }
};
async function loadCabinet() {
  $('cabinetLoginError').textContent = '';
  if (!client) {
    $('cabinetLoginError').textContent = 'Supabase конфигурациясын текшериңиз.';
    return;
  }
  const {data:authData,error:authError} = await client.auth.getUser();
  const signedIn = !authError && !!authData?.user;
  if (signedIn && (passwordRecoveryMode || recoveryLinkHint || recoveryFromPendingLink)) {
    passwordRecoveryMode = true;
    showPasswordRecovery();
    return;
  }
  $('passwordRecoveryCard').classList.add('hidden');
  $('cabinetLoginCard').classList.toggle('hidden',signedIn);
  $('cabinetDashboard').classList.toggle('hidden',!signedIn);
  $('teacherAccountLinkPanel').classList.toggle('hidden',!signedIn);
  if (!signedIn) return;
  await loadTeacherAccountLink();
  $('cabinetStatus').textContent = 'Талдоолор жүктөлүүдө...';
  $('cabinetReviews').replaceChildren();
  cabinetPdfReviews = [];
  const {data,error} = await client.rpc('get_my_lesson_reviews');
  if (error) {
    $('cabinetStatus').textContent = 'Маалыматты жүктөө мүмкүн болгон жок: ' + error.message;
    return;
  }
  const reviews = Array.isArray(data) ? data : [];
  $('cabinetStatus').textContent = 'Талдоочунун аты-жөнү жеке кабинетте көрсөтүлбөйт.';
  renderCabinetReviews(reviews);
  cabinetPdfReviews = reviews;
}
$('cabinetLogin').onsubmit = async event => {
  event.preventDefault();
  $('cabinetLoginError').textContent = '';
  if (!client) { $('cabinetLoginError').textContent = 'Supabase конфигурациясы жок.'; return; }
  const button = $('cabinetLogin').querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const form = new FormData(event.target);
    const {error} = await client.auth.signInWithPassword({email:form.get('email'),password:form.get('password')});
    if (error) throw error;
    event.target.reset();
    await checkSession();
    await loadCabinet();
    await updateTestModeAccess();
    await updateSurveyAccess();
  } catch(error) {
    $('cabinetLoginError').textContent = 'Кирүү ишке ашкан жок: ' + error.message;
  } finally { button.disabled = false; }
};
// Жеке кабинет: кирген колдонуучу өзүнүн гана сырсөзүн Supabase Auth аркылуу өзгөртөт.
$('changeOwnPasswordForm').onsubmit = async event => {
  event.preventDefault();
  const status = $('changeOwnPasswordStatus');
  const button = $('changeOwnPasswordBtn');
  status.textContent = '';
  if (!client) { status.textContent = 'Сервиске байланыш жок.'; return; }
  const password = $('ownNewPassword').value;
  const confirmPassword = $('ownConfirmPassword').value;
  if (password.length < 12 || password.length > 128) {
    status.textContent = 'Сырсөз 12–128 белгиден турушу керек.'; return;
  }
  if (password !== confirmPassword) {
    status.textContent = 'Сырсөздөр дал келген жок.'; return;
  }
  button.disabled = true;
  status.textContent = 'Сырсөз жаңыртылууда...';
  try {
    const {data:authData,error:authError} = await client.auth.getUser();
    if (authError || !authData?.user) throw new Error('Адегенде жеке кабинетиңизге кириңиз.');
    const {error} = await client.auth.updateUser({password});
    if (error) throw error;
    event.target.reset();
    status.textContent = 'Сырсөзүңүз ийгиликтүү өзгөртүлдү. Кийинки кирүүдө жаңы сырсөздү колдонуңуз.';
  } catch(error) {
    status.textContent = 'Сырсөз өзгөргөн жок: ' + error.message;
  } finally { button.disabled = false; }
};
$('cabinetLogout').onclick = async () => {
  if (!client) return;
  await client.auth.signOut();
  all=[];isAdmin=false;isSuperAdminUser=false;adminSchoolId=null;
  $('cabinetTotal').textContent='0';
  $('cabinetRecent').textContent='0';
  $('cabinetReviews').replaceChildren();
  cabinetPdfReviews = [];
  await loadCabinet();
  await updateTestModeAccess();
  await updateSurveyAccess();
};


// Мугалимдерди башкаруу: бардык жазуулар сервердин коопсуз RPC функциялары аркылуу.
async function loadTeacherManagement() {
  if (!client || !isAdmin) return;
  const select = $('manageTeacherSchool');
  const previous = select.value;
  select.replaceChildren(new Option('Мектепти тандаңыз', ''));
  const allowedSchools = isSuperAdminUser ? schools : schools.filter(s => String(s.id) === adminSchoolId);
  for (const s of allowedSchools) select.add(new Option(s.name, String(s.id)));
  if (allowedSchools.some(s => String(s.id) === previous)) select.value = previous;
  else if (allowedSchools.length === 1) select.value = String(allowedSchools[0].id);
  else if (allowedSchools.length) select.value = String(allowedSchools[0].id);
  await refreshManagedTeachers();
}
async function refreshManagedTeachers() {
  const request = ++manageRequest;
  const schoolId = Number($('manageTeacherSchool').value);
  if (!isAdmin || !schoolId) return;
  $('teacherManageStatus').textContent = 'Мугалимдер жүктөлүүдө...';
  const {data,error} = await client.rpc('admin_list_teachers', {p_school_id:schoolId});
  if (request !== manageRequest) return;
  if (error) { $('teacherManageStatus').textContent = 'Ката: ' + error.message; return; }
  managedTeachers = Array.isArray(data?.teachers) ? data.teachers : [];
  managedSubjects = Array.isArray(data?.subjects) ? data.subjects : [];
  $('teacherSubjectChecks').replaceChildren();
  for (const subject of managedSubjects) {
    const label = document.createElement('label');
    const input = document.createElement('input'); input.type='checkbox';input.value=String(subject.id);input.name='managed_subject';
    label.append(input,document.createTextNode(subject.name));
    $('teacherSubjectChecks').append(label);
  }
  clearTeacherEditor();
  renderManagedTeachers();
  $('teacherManageStatus').textContent = 'Мугалимдер: ' + managedTeachers.length;
}
function renderManagedTeachers() {
  const q = $('manageTeacherSearch').value.trim().toLocaleLowerCase();
  const rows = managedTeachers.filter(t => [t.full_name,t.position].some(x => String(x||'').toLocaleLowerCase().includes(q)));
  $('manageTeachersTable').innerHTML = rows.map(t => `<tr><td>${escapeHtml(t.full_name)}</td><td>${escapeHtml(t.position||'—')}</td><td>${escapeHtml((t.subjects||[]).map(s=>s.name).join(', ')||'—')}</td><td>${t.has_account?'Байланган':'Байланган эмес'}</td><td>${t.is_active?'Активдүү':'Активдүү эмес'}</td><td><button type="button" class="secondary smallbtn" data-edit-teacher="${escapeHtml(t.id)}">Оңдоо</button></td></tr>`).join('') || '<tr><td colspan="6">Мугалим табылган жок</td></tr>';
}
function clearTeacherEditor() {
  $('teacherManageForm').reset();
  $('editTeacherId').value='';
  $('editTeacherActive').checked=true;
  $('teacherEditorTitle').textContent='Мугалим кошуу';
}
$('manageTeacherSchool').onchange = refreshManagedTeachers;
$('manageTeacherSearch').oninput = renderManagedTeachers;
$('cancelTeacherEdit').onclick = clearTeacherEditor;
$('manageTeachersTable').onclick = e => {
  const button=e.target.closest('[data-edit-teacher]'); if(!button)return;
  const t=managedTeachers.find(x=>String(x.id)===button.dataset.editTeacher);if(!t)return;
  $('editTeacherId').value=String(t.id);
  $('editTeacherName').value=t.full_name;
  $('editTeacherPosition').value=t.position||'';
  $('editTeacherActive').checked=!!t.is_active;
  const ids=new Set((t.subjects||[]).map(s=>String(s.id)));
  for(const input of $('teacherSubjectChecks').querySelectorAll('input')) input.checked=ids.has(input.value);
  $('teacherEditorTitle').textContent='Мугалимди оңдоо: '+t.full_name;
  $('teacherManageForm').scrollIntoView({behavior:'smooth',block:'start'});
};
$('teacherManageForm').onsubmit = async e => {
  e.preventDefault();if(!isAdmin||!client)return;
  const button=$('saveTeacherBtn');button.disabled=true;
  $('teacherManageStatus').textContent='Сакталууда...';
  try {
    const teacherId=$('editTeacherId').value;
    const {data,error}=await client.rpc('admin_save_teacher', {
      p_school_id:Number($('manageTeacherSchool').value),
      p_teacher_id:teacherId ? Number(teacherId) : null,
      p_full_name:$('editTeacherName').value.trim(),
      p_position:$('editTeacherPosition').value.trim(),
      p_is_active:$('editTeacherActive').checked,
      p_subject_ids:[...$('teacherSubjectChecks').querySelectorAll('input:checked')].map(x=>Number(x.value))
    });
    if(error)throw error;
    await refreshManagedTeachers();
    $('teacherManageStatus').textContent='Мугалим сакталды (ID: '+data+').';
    if(Number($('schoolSelect').value)===Number($('manageTeacherSchool').value)) await refreshDirectory();
  }catch(error){$('teacherManageStatus').textContent='Сактоо катасы: '+error.message;}
  finally{button.disabled=false;}
};



// Катталуу жана мугалимдин профилине байланыштыруу.
$('teacherSignupForm').onsubmit = async event => {
  event.preventDefault();
  const status = $('teacherSignupStatus'); status.textContent = '';
  if (!client) { status.textContent = 'Supabase конфигурациясы жок.'; return; }
  const button = event.target.querySelector('button'); button.disabled = true;
  try {
    const form = new FormData(event.target);
    const {data,error} = await client.auth.signUp({
      email:String(form.get('email')).trim(),password:String(form.get('password')),
      options:{emailRedirectTo:window.location.origin + window.location.pathname}
    });
    if (error) throw error;
    event.target.reset();
    status.textContent = data.session
      ? 'Катталдыңыз. Мектепти жана аты-жөнүңүздү тандап арыз жөнөтүңүз.'
      : 'Каттоо өтүнүчү кабыл алынды. Электрондук почтаңызга келген ырастоо шилтемесин текшериңиз.';
    if (data.session) { await checkSession(); await loadCabinet(); await updateTestModeAccess(); }
  } catch(error) { status.textContent = 'Каттоо катасы: ' + error.message; }
  finally { button.disabled = false; }
};
let linkRequestData = null;
async function loadTeacherAccountLink() {
  if (!client) return;
  const status = $('teacherLinkStatus'); status.textContent = 'Аккаунт текшерилүүдө...';
  const profile = await client.rpc('get_my_teacher_profile');
  if (profile.error) { status.textContent = 'Профиль катасы: ' + profile.error.message; return; }
  if (profile.data) {
    $('requestSchool').disabled = true; $('requestTeacher').disabled = true;
    $('submitTeacherLinkRequest').disabled = true;
    status.textContent = 'Аккаунтуңуз байланышкан: ' + profile.data.full_name;
    return;
  }
  $('requestSchool').disabled = false; $('requestTeacher').disabled = false;
  $('submitTeacherLinkRequest').disabled = false;
  const schoolSelect = $('requestSchool');
  const previous = schoolSelect.value;
  schoolSelect.replaceChildren(new Option('Мектепти тандаңыз',''));
  for (const school of schools) schoolSelect.add(new Option(school.name,String(school.id)));
  if (schools.some(s => String(s.id) === previous)) schoolSelect.value = previous;
  await loadLinkRequestStatus();
  await loadLinkRequestTeachers();
}
async function loadLinkRequestStatus() {
  const {data,error} = await client.rpc('get_my_teacher_account_request');
  if (error) { $('teacherLinkStatus').textContent = 'Арыздын абалын алуу катасы: ' + error.message; return; }
  linkRequestData = data;
  if (data?.status === 'pending') {
    $('teacherLinkStatus').textContent = 'Арызыңыз администратордун кароосунда. Мектеп: ' + schoolName(data.school_id);
    $('requestSchool').value = String(data.school_id);
    $('submitTeacherLinkRequest').disabled = true;
  } else if (data?.status === 'rejected') {
    $('teacherLinkStatus').textContent = 'Мурдагы арызыңыз четке кагылган. Маалыматтарды текшерип, кайра арыз жөнөтсөңүз болот.';
    $('submitTeacherLinkRequest').disabled = false;
  } else {
    $('teacherLinkStatus').textContent = 'Мектепти жана өзүңүздүн аты-жөнүңүздү тандаңыз.';
  }
}
async function loadLinkRequestTeachers() {
  const schoolId = Number($('requestSchool').value);
  const select = $('requestTeacher'); select.replaceChildren(new Option('Мугалимди тандаңыз',''));
  if (!schoolId) return;
  const {data,error} = await client.rpc('get_observation_directory',{p_school_id:schoolId});
  if (error) { $('teacherLinkStatus').textContent = 'Мугалимдер жүктөлгөн жок: ' + error.message; return; }
  for (const teacher of (data?.teachers||[])) select.add(new Option(teacher.full_name,String(teacher.id)));
  if (linkRequestData && Number(linkRequestData.school_id) === schoolId) select.value = String(linkRequestData.teacher_id);
}
$('requestSchool').onchange = loadLinkRequestTeachers;
$('submitTeacherLinkRequest').onclick = async () => {
  const schoolId = Number($('requestSchool').value), teacherId = Number($('requestTeacher').value);
  if (!schoolId || !teacherId) { $('teacherLinkStatus').textContent = 'Мектепти жана мугалимди тандаңыз.'; return; }
  if (!confirm('Тандалган мугалим чын эле сиз экениңизди ырастайсызбы?')) return;
  const button = $('submitTeacherLinkRequest'); button.disabled = true;
  try {
    const {error} = await client.rpc('submit_teacher_account_request',{p_school_id:schoolId,p_teacher_id:teacherId});
    if (error) throw error;
    $('teacherLinkStatus').textContent = 'Арыз жөнөтүлдү. Мектеп администраторунун бекитүүсүн күтүңүз.';
    await loadLinkRequestStatus();
  } catch(error) { $('teacherLinkStatus').textContent = 'Арыз катасы: ' + error.message; button.disabled = false; }
};

// Администратор: арыздарды көрүү жана кароо.
async function loadAccountApprovals() {
  if (!client || !isAdmin) return;
  const select = $('approvalSchool'); const previous = select.value;
  select.replaceChildren(new Option('Мектепти тандаңыз',''));
  const permitted = isSuperAdminUser ? schools : schools.filter(s => String(s.id) === adminSchoolId);
  for (const s of permitted) select.add(new Option(s.name,String(s.id)));
  if (permitted.some(s => String(s.id) === previous)) select.value = previous;
  else if (permitted.length) select.value = String(permitted[0].id);
  await refreshAccountApprovals();
}
let accountRequests = [];
async function refreshAccountApprovals() {
  const schoolId = Number($('approvalSchool').value);
  const table = $('accountRequestsTable');
  if (!isAdmin || !schoolId) { table.innerHTML = '<tr><td colspan="5">Мектепти тандаңыз</td></tr>'; return; }
  table.innerHTML = '<tr><td colspan="5">Жүктөлүүдө...</td></tr>';
  const {data,error} = await client.rpc('admin_list_teacher_account_requests',{p_school_id:schoolId});
  if (error) { $('accountApprovalStatus').textContent = 'Ката: ' + error.message; table.replaceChildren(); return; }
  accountRequests = data || [];
  table.innerHTML = accountRequests.map(r => `<tr><td>${escapeHtml(r.teacher_name)}</td><td>${escapeHtml(r.applicant_email)}</td><td>${escapeHtml(r.request_status)}</td><td>${escapeHtml(new Date(r.requested_at).toLocaleString('ky-KG'))}</td><td>${r.request_status === 'pending' ? `<button class="smallbtn" data-account-approve="${escapeHtml(r.request_id)}">Бекитүү</button> <button class="secondary smallbtn" data-account-reject="${escapeHtml(r.request_id)}">Четке кагуу</button>` : '—'}</td></tr>`).join('') || '<tr><td colspan="5">Азырынча арыз жок</td></tr>';
  $('accountApprovalStatus').textContent = 'Арыздар: ' + accountRequests.length;
}
$('approvalSchool').onchange = refreshAccountApprovals;
$('refreshAccountRequests').onclick = refreshAccountApprovals;
$('accountRequestsTable').onclick = async event => {
  const button = event.target.closest('[data-account-approve],[data-account-reject]');
  if (!button || !isAdmin) return;
  const approve = button.hasAttribute('data-account-approve');
  const id = Number(approve ? button.dataset.accountApprove : button.dataset.accountReject);
  const request = accountRequests.find(r => Number(r.request_id) === id);
  if (!request) return;
  const message = approve
    ? `Бул адамдын ким экенин мектептен текшердиңизби?\n\n${request.applicant_email}\n${request.teacher_name}\n\nАккаунтту байланыштырасызбы?`
    : `${request.applicant_email} дарегинен келген арызды четке кагасызбы?`;
  if (!confirm(message)) return;
  button.disabled = true;
  try {
    const {error} = await client.rpc('admin_review_teacher_account_request',{p_request_id:id,p_approve:approve});
    if (error) throw error;
    await refreshAccountApprovals();
    await refreshManagedTeachers();
    $('accountApprovalStatus').textContent = approve ? 'Арыз бекитилди, аккаунт байланыштырылды.' : 'Арыз четке кагылды.';
  } catch(error) { $('accountApprovalStatus').textContent = 'Ката: ' + error.message; button.disabled = false; }
};


// Сырсөздү жаңыртуу: сервер мугалимдин ID'си жана администратордун мектеби боюнча текшерет.
async function loadPasswordResetSchools() {
  if (!client || !isAdmin) return;
  const select = $('resetTeacherSchool');
  const previous = select.value;
  const permitted = isSuperAdminUser ? schools : schools.filter(s => String(s.id) === adminSchoolId);
  select.replaceChildren(new Option('Мектепти тандаңыз', ''));
  for (const school of permitted) select.add(new Option(school.name, String(school.id)));
  if (permitted.some(s => String(s.id) === previous)) select.value = previous;
  else if (permitted.length) select.value = String(permitted[0].id);
  await loadPasswordResetTeachers();
}
async function loadPasswordResetTeachers() {
  const schoolId = Number($('resetTeacherSchool').value);
  const select = $('resetTeacherId');
  select.replaceChildren(new Option('Мугалимди тандаңыз', ''));
  if (!client || !isAdmin || !schoolId) return;
  $('resetTeacherStatus').textContent = 'Мугалимдер жүктөлүүдө...';
  const {data,error} = await client.rpc('admin_list_teachers',{p_school_id:schoolId});
  if (error) { $('resetTeacherStatus').textContent = 'Тизме жүктөлгөн жок: '+error.message; return; }
  for (const teacher of (data?.teachers || [])) {
    if (teacher.has_account && teacher.is_active) select.add(new Option(teacher.full_name, String(teacher.id)));
  }
  $('resetTeacherStatus').textContent = 'Аккаунту байланышкан активдүү мугалимдер гана көрсөтүлөт.';
}
$('resetTeacherSchool').onchange = loadPasswordResetTeachers;
$('adminPasswordResetForm').onsubmit = async event => {
  event.preventDefault();
  if (!client || !isAdmin) return;
  const status = $('resetTeacherStatus');
  const teacherId = Number($('resetTeacherId').value);
  const password = $('resetTeacherPassword').value;
  if (!Number.isSafeInteger(teacherId) || teacherId <= 0) { status.textContent='Мугалимди тандаңыз.'; return; }
  if (password.length < 12 || password.length > 128 || password !== $('resetTeacherPasswordConfirm').value) {
    status.textContent = 'Сырсөздөр дал келген жана кеминде 12 белгиден турушу керек.'; return;
  }
  if (!$('resetTeacherConsent').checked) { status.textContent = 'Мугалимдин макулдугун ырастоо талап кылынат.'; return; }
  const teacherName = $('resetTeacherId').selectedOptions[0]?.textContent || '';
  if (!confirm(teacherName+' мугалиминин сырсөзүн жаңыртасызбы?')) return;
  const button = $('resetTeacherSubmit'); button.disabled=true;
  status.textContent='Сырсөз жаңыртылууда...';
  try {
    const {data,error} = await client.functions.invoke('admin-password-reset', {
      body:{teacher_id:teacherId,new_password:password,teacher_consent:true}
    });
    if (error) {
      let message=error.message;
      if (error.context) { try { const detail=await error.context.json(); message=detail.error || detail.message || message; } catch (_) {} }
      throw new Error(message);
    }
    if (data?.error) throw new Error(data.error);
    $('resetTeacherPassword').value='';
    $('resetTeacherPasswordConfirm').value='';
    $('resetTeacherConsent').checked=false;
    status.textContent='Сырсөз жаңыртылды. Убактылуу сырсөздү мугалимге коопсуз жол менен бериңиз.';
  } catch (error) { status.textContent='Жаңыртуу катасы: '+error.message; }
  finally { button.disabled=false; }
};


// ДИРЕКТОР: өз мектебинин гана окууга уруксат берилген талдоолору.
// Маалымат базасындагы RLS укуктарды милдеттүү түрдө текшерет.
const directorPanel = document.createElement('section');
directorPanel.id = 'directorPanel';
directorPanel.className = 'hidden';
directorPanel.innerHTML = `
  <div class="card topline"><div><h2>Директордун мониторинг кабинети</h2>
    <p class="muted">Өз мектебинин талдоолорун көрүү жана CSV отчетун жүктөө. Өзгөртүү укугу жок.</p></div>
    <button type="button" id="directorLogout" class="secondary">Аккаунттан чыгуу</button></div>
  <div class="card" id="directorLoginCard"><h3>Кирүү</h3>
    <p class="muted">Директор болуп катталган электрондук почтаңыз жана сырсөзүңүз менен кириңиз.</p>
    <form id="directorLoginForm"><label>Электрондук почта<input type="email" name="email" required autocomplete="username"></label>
    <label>Сырсөз<input type="password" name="password" required autocomplete="current-password"></label>
    <button type="submit">Кирүү</button></form></div>
  <div id="directorContent" class="hidden"><div class="card">
    <h3 id="directorSchoolTitle">Мектептин мониторинги</h3>
    <div class="stats"><div class="stat"><strong id="directorTotal">0</strong>Жалпы талдоо</div>
    <div class="stat"><strong id="directorWeek">0</strong>Акыркы 7 күн</div>
    <div class="stat"><strong id="directorObservers">0</strong>Талдоочу мугалим</div></div>
    <h3>Деңгээлдер боюнча</h3><div id="directorDistribution"></div></div>
    <div class="card"><div class="topline"><h3>Сабак талдоолору</h3>
    <button type="button" id="directorExport">CSV жүктөө (Excel)</button></div>
    <label>Издөө<input id="directorSearch" placeholder="Мугалим, предмет, класс же тема"></label>
    <div class="scroll"><table><thead><tr><th>Убакыт</th><th>Талдоочу</th><th>Сабак өткөн мугалим</th>
    <th>Предмет / класс</th><th>Тема</th><th>Жыйынтык</th><th>Толук талдоо</th></tr></thead>
    <tbody id="directorRecords"></tbody></table></div></div></div>
  <p id="directorStatus" role="status" class="muted"></p>`;
document.querySelector('main').appendChild(directorPanel);
let directorRows = [], directorSchoolId = null;
const directorVisibleRows = () => directorRows.filter(r =>
  [r.teacher_name, observedName(r), r.subject, r.classroom, r.topic, r.outcome]
    .some(v => String(v ?? '').toLocaleLowerCase().includes($('directorSearch').value.trim().toLocaleLowerCase())));
function renderDirectorDashboard() {
  const rows = directorVisibleRows();
  $('directorTotal').textContent = directorRows.length;
  $('directorWeek').textContent = directorRows.filter(r => Date.now() - new Date(r.created_at).getTime() <= 7 * 86400000).length;
  $('directorObservers').textContent = new Set(directorRows.map(r => String(r.teacher_name || '').trim().toLocaleLowerCase())).size;
  $('directorDistribution').innerHTML = labels.map(l => {
    const n = directorRows.filter(r => r.outcome === l).length;
    return `<p>${escapeHtml(l)}: <b>${n}</b></p>`;
  }).join('') + `<p>Аралаш: ${directorRows.filter(r => String(r.outcome || '').startsWith('Аралаш')).length}</p>`;
  $('directorRecords').innerHTML = rows.map(r => `<tr>
    <td>${escapeHtml(new Date(r.created_at).toLocaleString('ky-KG'))}</td>
    <td>${escapeHtml(r.teacher_name)}</td><td>${escapeHtml(observedName(r) || '—')}</td>
    <td>${escapeHtml(r.subject)} / ${escapeHtml(r.classroom)}</td>
    <td>${escapeHtml(r.topic)}</td><td>${escapeHtml(r.outcome)}</td>
    <td>${recordDetails(r)}<p><button type="button" class="secondary smallbtn" data-pdf-director="${escapeHtml(r.id)}">PDF отчет</button></p></td></tr>`).join('') || '<tr><td colspan="7">Талдоолор жок</td></tr>';
}
async function loadDirectorDashboard() {
  const status = $('directorStatus');
  $('directorContent').classList.add('hidden');
  directorRows = []; directorSchoolId = null;
  if (!client) { status.textContent = 'Supabase конфигурациясы табылган жок.'; return; }
  status.textContent = 'Директордук укук текшерилүүдө...';
  try {
    const {data:auth,error:authError} = await client.auth.getUser();
    if (authError) throw authError;
    const user = auth?.user;
    $('directorLoginCard').classList.toggle('hidden', !!user);
    $('directorLogout').classList.toggle('hidden', !user);
    if (!user) { status.textContent = 'Кирүү талап кылынат.'; return; }
    const {data:role,error:roleError} = await client.from('director_users')
      .select('school_id').eq('user_id',user.id).maybeSingle();
    if (roleError) throw roleError;
    if (!role) { status.textContent = 'Бул аккаунтка директордук роль берилген эмес.'; return; }
    directorSchoolId = role.school_id;
    $('directorSchoolTitle').textContent = schoolName(directorSchoolId) + ' — мониторинг';
    status.textContent = 'Талдоолор жүктөлүүдө...';
    let start = 0;
    while (true) {
      const {data,error} = await client.from('lesson_reviews').select('*')
        .eq('school_id', directorSchoolId).order('created_at',{ascending:false})
        .range(start, start + 999);
      if (error) throw error;
      directorRows.push(...(data || []).filter(r => r.is_test !== true && String(r.school_id) === String(directorSchoolId)));
      if (!data || data.length < 1000) break;
      start += 1000;
    }
    $('directorContent').classList.remove('hidden');
    renderDirectorDashboard();
    status.textContent = 'Көрүү режими: өзгөртүү жана өчүрүү мүмкүн эмес.';
  } catch (error) { status.textContent = 'Маалымат жүктөлгөн жок: ' + error.message; }
}
$('directorSearch').oninput = renderDirectorDashboard;
$('directorLoginForm').onsubmit = async e => {
  e.preventDefault();
  if (!client) return;
  const button = e.target.querySelector('button'); button.disabled = true;
  try {
    const f = new FormData(e.target);
    const {error} = await client.auth.signInWithPassword({email:f.get('email'),password:f.get('password')});
    if (error) throw error;
    e.target.reset();
    await loadDirectorDashboard();
    await updateSurveyAccess();
  } catch (error) { $('directorStatus').textContent = 'Кирүү катасы: ' + error.message; }
  finally { button.disabled = false; }
};
$('directorLogout').onclick = async () => {
  await client?.auth.signOut();
  directorRows = []; directorSchoolId = null;
  await loadDirectorDashboard();
  await checkSession();
  await updateSurveyAccess();
};
$('directorExport').onclick = () => {
  if (directorSchoolId == null) return;
  const cols = ['Убакыт','Талдоочу мугалим','Сабак өткөн мугалим','Предмет','Класс','Тема','Жыйынтык',
    ...observationFields.filter(([k]) => k !== 'observed_teacher_name').map(([,label]) => label),
    ...Array.from({length:10},(_,i) => `Суроо ${i+1}`)];
  const data = directorVisibleRows().map(r => {
    const qs = Array.isArray(r.answers) && r.answers.length === 10 ? legacyQuestions : questions;
    return [r.created_at,r.teacher_name,observedName(r),r.subject,r.classroom,r.topic,r.outcome,
      ...observationFields.filter(([k]) => k !== 'observed_teacher_name').map(([k]) => valueText(r.observation?.[k])),
      ...Array.from({length:10},(_,i) => qs[i]?.[Number(r.answers?.[i])+1] || '')];
  });
  const csv = '\ufeff' + [cols,...data].map(row => row.map(v => {
    let s = String(v ?? '');
    if (/^[\s]*[=+@\-\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g,'""') + '"';
  }).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url;
  a.download = `director-school-${directorSchoolId}-reviews.csv`; a.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
};

// PDF: браузердин «Басып чыгаруу → PDF катары сактоо» мүмкүнчүлүгү.
// Мугалимдин маалыматы get_my_lesson_reviews RPC'синен гана алынат;
// анда талдоочунун аты жана ID'си кайтарылбайт.
let cabinetPdfReviews = [];
function pdfReportHtml(review, privileged) {
  const obs = review.observation || {};
  const answers = Array.isArray(review.answers) ? review.answers : [];
  const counts = Array.isArray(review.counts) ? review.counts : [];
  const qs = answers.length === 10 ? legacyQuestions : questions;
  const date = review.review_date || review.created_at;
  const safe = value => escapeHtml(valueText(value) || '—');
  const item = (title, value) => `<div class="item"><strong>${safe(title)}</strong><span>${safe(value)}</span></div>`;
  const criteria = answers.map((answer,i) => `<tr><td>${i+1}. ${safe(qs[i]?.[0] || 'Критерий')}</td><td>${safe(qs[i]?.[Number(answer)+1] || '—')}</td></tr>`).join('');
  const total = counts.reduce((sum, n) => sum + (Number(n) || 0), 0);
  const distribution = labels.map((label,i) => item(label, `${Number(counts[i]) || 0} (${total ? Math.round((Number(counts[i]) || 0) / total * 100) : 0}%)`)).join('');
  const details = cabinetObservationLabels.map(([key,title]) => item(title, obs[key])).join('');
  const observed = privileged ? observedName(review) : '';
  const school = privileged ? schoolName(review.school_id) : '';
  return `<!doctype html><html lang="ky"><head><meta charset="utf-8"><title>Сабактын талдоо отчёту</title>
  <style>@page{size:A4;margin:17mm}body{font:12px/1.55 Arial,sans-serif;color:#14243e;margin:0}h1{font-size:21px;color:#123365;border-bottom:3px solid #123365;padding-bottom:12px}h2{font-size:15px;margin:22px 0 8px;color:#123365}.item{display:flex;gap:12px;border-bottom:1px solid #e2e8f0;padding:6px 0;break-inside:avoid}.item strong{width:42%;flex-shrink:0}.item span{overflow-wrap:anywhere}table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:8px;text-align:left;vertical-align:top}th{background:#eaf0f9}tr{break-inside:avoid}.note{font-size:10px;color:#64748b;margin-top:25px}</style></head><body>
  <h1>Өз ара сабакка кирүү — талдоо отчёту</h1>
  ${privileged ? item('Мектеп',school) : ''}
  ${item('Убакыт',date ? new Date(date).toLocaleString('ky-KG') : '—')}
  ${privileged ? item('Талдоочу',review.teacher_name) : ''}
  ${privileged ? item('Сабак өткөн мугалим',observed) : ''}
  ${item('Предмет',review.subject)}${item('Класс',review.classroom)}${item('Тема',review.topic)}${item('Жыйынтык',review.outcome)}
  <h2>Деңгээлдер боюнча жыйынтык</h2>${distribution}
  <h2>Сабакка байкоо</h2>${details}
  <h2>Критерийлер боюнча жооптор</h2><table><thead><tr><th>Критерий</th><th>Тандалган жооп</th></tr></thead><tbody>${criteria}</tbody></table>
  <p class="note">${privileged ? 'Администрация / директор үчүн отчет.' : 'Мугалим үчүн отчет. Талдоочунун аты-жөнү жашырылган.'}</p>
  </body></html>`;
}
function openPdfReport(review, privileged) {
  if (!review) return;
  const popup = window.open('', '_blank');
  if (!popup) { alert('PDF ачылбады. Браузерден жаңы терезелерге уруксат бериңиз.'); return; }
  popup.document.open();
  popup.document.write(pdfReportHtml(review, privileged));
  popup.document.close();
  popup.focus();
  // Колдонуучу ачылган терезеден Ctrl+P → «PDF катары сактоо» тандайт.
  popup.addEventListener('load', () => popup.print(), {once:true});
  setTimeout(() => { if (!popup.closed) popup.print(); }, 450);
}
$('records').addEventListener('click', event => {
  const button = event.target.closest('[data-pdf-admin]');
  if (!button || !isAdmin) return;
  const review = visibleRows().find(r => String(r.id) === button.dataset.pdfAdmin);
  if (review) openPdfReport(review, true);
});
$('directorRecords').addEventListener('click', event => {
  const button = event.target.closest('[data-pdf-director]');
  if (!button || directorSchoolId == null) return;
  const review = directorVisibleRows().find(r => String(r.id) === button.dataset.pdfDirector && String(r.school_id) === String(directorSchoolId));
  if (review) openPdfReport(review, true);
});
$('cabinetReviews').addEventListener('click', event => {
  const button = event.target.closest('[data-pdf-cabinet]');
  if (!button) return;
  const review = cabinetPdfReviews.find(r => String(r.review_id) === button.dataset.pdfCabinet);
  if (review) openPdfReport(review, false);
});


// Бириктирилген PDF: ар бир роль үчүн буга чейин уруксат берилген маалыматтар гана.
function combinedPdfHtml(reviews, privileged, heading) {
  const ordered = [...reviews].sort((a,b) => new Date(b.review_date || b.created_at) - new Date(a.review_date || a.created_at));
  const base = pdfReportHtml(ordered[0], privileged);
  const head = base.slice(0, base.indexOf('<body>'));
  const count = ordered.length;
  const sums = labels.map((_,i) => ordered.reduce((n,r) => n + (Number(r.counts?.[i]) || 0),0));
  const total = sums.reduce((a,b) => a+b,0);
  const outcomes = labels.map((label,i) => `<tr><td>${escapeHtml(label)}</td><td>${sums[i]}</td><td>${total ? Math.round(sums[i]*100/total) : 0}%</td></tr>`).join('');
  const summary = `<h1>${escapeHtml(heading)}</h1><p><b>Жалпы талдоолор:</b> ${count}</p>
    <h2>Жалпы статистика (бардык критерийлер боюнча)</h2>
    <table><thead><tr><th>Деңгээл</th><th>Жооптордун саны</th><th>Үлүшү</th></tr></thead><tbody>${outcomes}</tbody></table>
    <p class="note">Бул статистика ар бир критерийге берилген жооптордун жалпы бөлүштүрүлүшүн көрсөтөт. Талдоолордун өзүнчө жыйынтыктары төмөндө берилген.</p>`;
  const sections = ordered.map((r,i) => {
    const html = pdfReportHtml(r,privileged);
    const body = html.split('<body>')[1].split('</body>')[0];
    return `<section class="pdf-review" style="break-before:page;page-break-before:always"><h2>${i+1}-талдоо / ${count}</h2>${body}</section>`;
  }).join('');
  return `${head}<body>${summary}${sections}</body></html>`;
}
function openCombinedPdf(reviews, privileged, heading) {
  if (!Array.isArray(reviews) || !reviews.length) {
    alert('Бириктирүү үчүн талдоолор табылган жок.'); return;
  }
  const popup = window.open('', '_blank');
  if (!popup) { alert('PDF ачылбады. Браузерден жаңы терезелерге уруксат бериңиз.'); return; }
  popup.document.open();
  popup.document.write(combinedPdfHtml(reviews,privileged,heading));
  popup.document.close();
  popup.focus();
  popup.addEventListener('load', () => popup.print(), {once:true});
  setTimeout(() => { if (!popup.closed && !popup.document.hidden) popup.print(); }, 600);
}
function addCombinedPdfButton(container, id, text) {
  if (!container || $(id)) return;
  const button = document.createElement('button');
  button.type='button'; button.id=id; button.className='secondary smallbtn';
  button.textContent=text;
  button.style.margin='8px 8px 8px 0';
  container.prepend(button);
}
// Башкаруу панелинде тандалган мектептин бардык талдоолору (издөө талаасына көз каранды эмес).
addCombinedPdfButton($('export')?.parentElement,'adminCombinedPdf','Бардык талдоолорду PDF');
$('adminCombinedPdf')?.addEventListener('click', () => {
  if (!isAdmin) return;
  const selected = $('adminSchool').value;
  if (selected === 'all' || selected === 'none') {
    alert('Бир мектепти тандаңыз.'); return;
  }
  if (!isSuperAdminUser && String(selected) !== String(adminSchoolId)) return;
  const rows = all.filter(r => String(r.school_id) === String(selected));
  openCombinedPdf(rows,true,`${schoolName(selected)} — бардык сабак талдоолору`);
});
// Директор: өз мектебинин бардык расмий талдоолору.
addCombinedPdfButton($('directorExport')?.parentElement,'directorCombinedPdf','Бардык талдоолорду PDF');
$('directorCombinedPdf')?.addEventListener('click', () => {
  if (directorSchoolId == null) return;
  openCombinedPdf(directorRows.filter(r => String(r.school_id) === String(directorSchoolId)),true,
    `${schoolName(directorSchoolId)} — бардык сабак талдоолору`);
});
// Жеке кабинет: өзүнүн гана RPC аркылуу алынган талдоолору, талдоочунун аты жок.
addCombinedPdfButton($('cabinetReviews')?.parentElement,'cabinetCombinedPdf','Бардык талдоолорду PDF');
$('cabinetCombinedPdf')?.addEventListener('click', () => {
  if ($('cabinetDashboard')?.classList.contains('hidden')) return;
  openCombinedPdf(cabinetPdfReviews,false,'Менин сабактарыма берилген бардык талдоолор');
});

loadSchools().then(async () => { await checkSession(); await updateTestModeAccess(); await updateSurveyAccess(); if (recoveryLinkHint || recoveryFromPendingLink || passwordRecoveryMode) tab('cabinet'); });
