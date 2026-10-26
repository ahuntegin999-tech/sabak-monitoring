/* V12 school notices. All database writes go through role-checked RPCs. */
(()=>{'use strict';
const el=id=>document.getElementById(id);
const txt=(ky,ru)=>el('siteLanguage')?.value==='ru'?ru:ky;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let school=null,role=null,teacherId=null,teacherList=[],sent=[],inbox=[];
const lang=()=>el('siteLanguage')?.value==='ru'?'ru':'ky';
const localized=n=>n?.['title_'+lang()]||n?.['title_'+(lang()==='ru'?'ky':'ru')]||'';
const localizedBody=n=>n?.['body_'+lang()]||n?.['body_'+(lang()==='ru'?'ky':'ru')]||'';
const fmt=s=>new Date(s).toLocaleString(lang()==='ru'?'ru-RU':'ky-KG');
const status=(s,error=false)=>{el('noticesStatus').textContent=s;el('noticesStatus').className=error?'error':'muted';};
async function init(){
 if(typeof client === 'undefined' || !client){status(txt('Supabase конфигурациясы жок.','Нет подключения к Supabase.'),true);return;}
 const {data:{user},error}=await client.auth.getUser();
 if(error||!user){el('noticeManager').classList.add('hidden');el('noticeInbox').classList.add('hidden');status(txt('Билдирүүлөрдү көрүү үчүн аккаунтка кириңиз.','Войдите в аккаунт, чтобы просмотреть уведомления.'));return;}
 const [admins,dirs,teachers]=await Promise.all([
 client.from('admin_users').select('school_id').eq('user_id',user.id),
 client.from('director_users').select('school_id').eq('user_id',user.id),
 client.rpc('get_my_teacher_profile')
 ]);
 role=null;school=null;teacherId=null;
 const manager=[...(admins.data||[]),...(dirs.data||[])].find(x=>x.school_id!=null);
 if(manager){role='manager';school=manager.school_id;}
 else if(teachers.data){const t=Array.isArray(teachers.data)?teachers.data[0]:teachers.data;if(t?.is_active){role='teacher';school=t.school_id;teacherId=t.id;}}
 el('noticeManager').classList.toggle('hidden',role!=='manager');
 el('noticeInbox').classList.toggle('hidden',!school);
 if(!role){status(txt('Бул аккаунтка мектептин билдирүүлөрүн көрүү укугу берилген эмес.','У этой учётной записи нет доступа к уведомлениям школы.'));return;}
 status('');
 if(role==='manager'){
  const list=await client.rpc('notice_teacher_list',{p_school_id:school});
  teacherList=(list.data||[]).filter(t=>t.user_id);
  const sel=el('noticeRecipient');sel.replaceChildren(new Option(txt('Бардык кызматкерлерге','Всем сотрудникам'),''));
  for(const t of teacherList)sel.add(new Option(t.full_name,t.user_id));
  if(list.error)status(txt('Мугалимдердин тизмеси жүктөлгөн жок: ','Не удалось загрузить список учителей: ')+list.error.message,true);
  await loadSent();
 }
 if(school){const t=Array.isArray(teachers.data)?teachers.data[0]:teachers.data;if(t?.is_active&&Number(t.school_id)===Number(school))await loadInbox();else el('noticeInbox').classList.add('hidden');}
}
async function loadSent(){const r=await client.rpc('notice_sent',{p_school_id:school});if(r.error){status(txt('Билдирүүлөр жүктөлгөн жок: ','Не удалось загрузить уведомления: ')+r.error.message,true);return;}sent=r.data||[];renderSent();}
function renderSent(){el('noticeSentList').innerHTML=sent.length?sent.map(n=>`<article class="notice-entry"><div class="topline"><strong>${esc(localized(n))}</strong><small>${esc(fmt(n.created_at))}</small></div><p>${esc(localizedBody(n)).replace(/\n/g,'<br>')}</p><p class="muted">${n.recipient_user_id?esc(teacherList.find(t=>t.user_id===n.recipient_user_id)?.full_name||txt('Жеке билдирүү','Личное сообщение')):txt('Бардык кызматкерлер','Все сотрудники')} · ${n.archived_at?txt('Архивделген','В архиве'):txt('Жөнөтүлгөн','Отправлено')}</p><div class="topline"><button type="button" class="secondary smallbtn" data-resend="${n.id}">${txt('Кайра жөнөтүү','Отправить повторно')}</button>${!n.archived_at?`<button type="button" class="secondary smallbtn" data-archive="${n.id}">${txt('Архивдөө','Архивировать')}</button>`:''}</div></article>`).join(''):`<p class="muted">${txt('Азырынча билдирүү жок.','Уведомлений пока нет.')}</p>`;}
async function loadInbox(){const r=await client.rpc('notice_inbox',{p_school_id:school});if(r.error){status(txt('Билдирүүлөр жүктөлгөн жок: ','Не удалось загрузить уведомления: ')+r.error.message,true);return;}inbox=r.data||[];renderInbox();}
function renderInbox(){el('noticeInboxList').innerHTML=inbox.length?inbox.map(n=>`<article class="notice-entry"><div class="topline"><strong>${esc(localized(n))}</strong><small>${esc(fmt(n.created_at))}</small></div><p>${esc(localizedBody(n)).replace(/\n/g,'<br>')}</p><div class="topline"><span class="muted">${n.read_at?txt('Окулду','Прочитано'):txt('Жаңы билдирүү','Новое уведомление')}</span>${n.read_at?'':`<button type="button" class="secondary smallbtn" data-read="${n.id}">${txt('Окудум','Отметить прочитанным')}</button>`}</div></article>`).join(''):`<p class="muted">${txt('Азырынча билдирүү жок.','Уведомлений пока нет.')}</p>`;}
el('noticeCompose').addEventListener('submit',async e=>{e.preventDefault();if(role!=='manager')return;const b=el('noticeSendButton');b.disabled=true;status(txt('Жөнөтүлүүдө...','Отправка...'));try{const f=new FormData(e.target);const args={p_school_id:school,p_recipient_user_id:f.get('recipient')||null,p_title_ky:String(f.get('title_ky')||'').trim(),p_title_ru:String(f.get('title_ru')||'').trim(),p_body_ky:String(f.get('body_ky')||'').trim(),p_body_ru:String(f.get('body_ru')||'').trim()};if(!(args.p_title_ky&&args.p_body_ky)&&!(args.p_title_ru&&args.p_body_ru)){throw new Error(txt('Бир тилде болсо да аталышын жана текстин толтуруңуз.','Заполните заголовок и текст хотя бы на одном языке.'));}
if(!args.p_title_ky){args.p_title_ky=args.p_title_ru;args.p_body_ky=args.p_body_ru;}
if(!args.p_title_ru){args.p_title_ru=args.p_title_ky;args.p_body_ru=args.p_body_ky;}
const r=await client.rpc('notice_send',args);if(r.error)throw r.error;e.target.reset();status(txt('Билдирүү ийгиликтүү жөнөтүлдү.','Уведомление успешно отправлено.'));await loadSent();}catch(err){status(txt('Жөнөтүү катасы: ','Ошибка отправки: ')+err.message,true)}finally{b.disabled=false}});
el('noticeSentList').addEventListener('click',async e=>{const resend=e.target.closest('[data-resend]'),archive=e.target.closest('[data-archive]');if(resend){const n=sent.find(x=>String(x.id)===resend.dataset.resend);if(!n)return;el('noticeRecipient').value=n.recipient_user_id||'';for(const key of ['title_ky','title_ru','body_ky','body_ru'])el('noticeCompose').elements.namedItem(key).value=n[key];status(txt('Мурунку билдирүү формага көчүрүлдү. Текшерип, «Жөнөтүү» басыңыз.','Сообщение скопировано в форму. Проверьте и нажмите «Отправить».'));el('noticeCompose').scrollIntoView({behavior:'smooth'});}if(archive){if(!confirm(txt('Билдирүүнү архивдейсизби?','Архивировать уведомление?')))return;const r=await client.rpc('notice_archive',{p_notice_id:Number(archive.dataset.archive)});if(r.error)status(r.error.message,true);else await loadSent();}});
el('noticeInboxList').addEventListener('click',async e=>{const b=e.target.closest('[data-read]');if(!b)return;const r=await client.rpc('notice_mark_read',{p_notice_id:Number(b.dataset.read)});if(r.error)status(r.error.message,true);else await loadInbox();});
el('siteLanguage').addEventListener('change',()=>{if(role==='manager'){const v=el('noticeRecipient').value;el('noticeRecipient').options[0].textContent=txt('Бардык кызматкерлерге','Всем сотрудникам');el('noticeRecipient').value=v;renderSent();}if(school)renderInbox();});
async function cabinetInbox(){
 const panel=el('cabinetNoticeCard');if(!panel)return;
 if(typeof client==='undefined'||!client){panel.classList.add('hidden');return;}
 const a=await client.auth.getUser();if(!a.data?.user){panel.classList.add('hidden');return;}
 const r=await client.rpc('get_my_teacher_profile');const t=Array.isArray(r.data)?r.data[0]:r.data;
 if(r.error||!t?.school_id||!t.is_active){panel.classList.add('hidden');return;}
 const v=await client.rpc('notice_inbox',{p_school_id:t.school_id});
 panel.classList.remove('hidden');
 if(v.error){el('cabinetNoticeList').textContent=txt('Билдирүүлөр жүктөлгөн жок: ','Не удалось загрузить уведомления: ')+v.error.message;return;}
 const rows=v.data||[];
 el('cabinetNoticeList').innerHTML=rows.length?rows.map(x=>`<article class="notice-entry"><div class="topline"><strong>${esc(localized(x))}</strong><small>${esc(fmt(x.created_at))}</small></div><p>${esc(localizedBody(x)).replace(/\n/g,'<br>')}</p><div class="topline"><span>${x.read_at?txt('Окулду','Прочитано'):txt('Жаңы билдирүү','Новое уведомление')}</span>${x.read_at?'':`<button type="button" class="secondary smallbtn" data-cabinet-read="${x.id}">${txt('Окудум','Отметить прочитанным')}</button>`}</div></article>`).join(''):`<p class="muted">${txt('Азырынча билдирүү жок.','Уведомлений пока нет.')}</p>`;
}
el('cabinetNoticeList').addEventListener('click',async e=>{const b=e.target.closest('[data-cabinet-read]');if(!b)return;const r=await client.rpc('notice_mark_read',{p_notice_id:Number(b.dataset.cabinetRead)});if(r.error)alert(r.error.message);else await cabinetInbox();});
window.sabakNoticesCabinet=cabinetInbox;
if(typeof client!=='undefined'&&client)client.auth.onAuthStateChange(()=>setTimeout(()=>{if(!el('cabinet')?.classList.contains('hidden'))cabinetInbox();},150));
window.sabakNoticesOpen=init;
})();
