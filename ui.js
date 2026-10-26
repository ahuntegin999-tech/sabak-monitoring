// UI layer only. Existing auth and role checks remain in app.js and Supabase.
(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 const nav = $('sideNav');
 let current = 'home';
 let lang = localStorage.getItem('sabak-language') === 'ru' ? 'ru' : 'ky';
 function translate() {
   document.documentElement.lang = lang;
   $('siteLanguage').value = lang;
   document.querySelectorAll('[data-ky][data-ru]').forEach(el => {el.textContent=el.dataset[lang]});
   $('homeWelcome').textContent = lang === 'ky' ? 'Ар бир талдоо — кесиптик өсүүгө карай жасалган кадам!' : 'Каждый анализ урока — шаг к профессиональному росту!';
   $('homeStatsNote').textContent = lang === 'ky' ? 'Жеке көрсөткүчтөр аккаунтка киргенден кийин жаңыланат. Мектептик жалпы статистика үчүн уруксат берилген маалымат булагы керек.' : 'Личные показатели обновляются после входа. Общешкольная статистика требует защищённого источника данных.';
 }
 function go(section) {
   current = section;
   document.body.classList.toggle('home-mode',section === 'home');
   document.body.classList.toggle('settings-mode',section === 'settings');
   document.body.classList.toggle('notices-mode',section === 'notices');
   $('notices').classList.toggle('hidden',section !== 'notices');
   if(section === 'notices') window.sabakNoticesOpen?.();
   $('siteSettings').classList.toggle('hidden',section !== 'settings');
   if (section !== 'home' && section !== 'settings' && section !== 'notices') {
     const original = $(section === 'director' ? 'directorTab' : section+'Tab');
     original?.click();
   }
   document.querySelectorAll('[data-go]').forEach(b=>b.classList.toggle('active',b.dataset.go===section));
   nav.classList.remove('open');
   if (section === 'home') refreshHome();
   if (section === 'cabinet') window.sabakNoticesCabinet?.();
   window.scrollTo({top:0,behavior:'instant'});
 }
 async function refreshHome() {
   if (typeof client === 'undefined' || !client) return;
   // Only the authenticated teacher's whitelisted, observer-anonymized RPC is used.
   try {
     const auth = await client.auth.getUser();
     const loggedIn = !!auth.data?.user;
     $('sideLogin').classList.toggle('hidden',loggedIn);
     $('sideLogout').classList.toggle('hidden',!loggedIn);
     if (!loggedIn) { $('homeMyReviews').textContent='—';$('homeMyRecent').textContent='—';return; }
     const result = await client.rpc('get_my_lesson_reviews');
     if (!result.error && Array.isArray(result.data)) {
       $('homeMyReviews').textContent=String(result.data.length);
       const now=Date.now();
       $('homeMyRecent').textContent=String(result.data.filter(r=>r.created_at && now-new Date(r.created_at).getTime()<7*86400000).length);
     }
   } catch(err) { console.warn('Башкы бет көрсөткүчү жүктөлгөн жок',err); }
 }
 document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
 $('homeStart').addEventListener('click',()=>go('teacher'));
 $('settingsAccount').addEventListener('click',()=>go('cabinet'));
 $('sideLogin').addEventListener('click',()=>go('cabinet'));
 $('sideLogout').addEventListener('click',async()=>{if (typeof client!=='undefined' && client) {await client.auth.signOut();}go('home');});
 $('mobileMenu').addEventListener('click',()=>nav.classList.toggle('open'));
 $('siteLanguage').addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('sabak-language',lang);translate();if(current==='cabinet')window.sabakNoticesCabinet?.()});
 // Sync with the old tab buttons if the app triggers them itself.
 ['teacher','cabinet','admin','director'].forEach(s=>$(s+'Tab')?.addEventListener('click',()=>{if(current!==s)go(s)}));
 translate();
 if(typeof client!=='undefined' && client) client.auth.onAuthStateChange(()=>setTimeout(refreshHome,100));
 refreshHome();
})();
