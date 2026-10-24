'use strict';

const legacyQuestions = [
  ['РћРєСѓСѓС‡СѓР»Р°СЂ Р¶Р°ТЈС‹ С‚ТЇС€ТЇРЅТЇРєС‚У©СЂРґТЇ РєР°РЅРґР°Р№С‡Р° У©Р·РґУ©С€С‚ТЇСЂТЇС€С‚ТЇ?','РњСѓРіР°Р»РёРј Р°Р№С‚РєР°РЅ Р°РЅС‹РєС‚Р°РјР°РЅС‹ РєР°Р№С‚Р°Р»Р°РґС‹','РўТЇС€ТЇРЅТЇРєС‚ТЇ У©Р· СЃУ©Р·ТЇ РјРµРЅРµРЅ С‚ТЇС€ТЇРЅРґТЇСЂТЇРї, РјРёСЃР°Р» РєРµР»С‚РёСЂРґРё','РўТЇС€ТЇРЅТЇРєРєУ© Р¶Р°ТЈС‹ РєРѕР»РґРѕРЅСѓСѓ Р¶РѕР»СѓРЅ СЃСѓРЅСѓС€С‚Р°РґС‹'],
  ['РЎР°Р±Р°РєС‚Р°РіС‹ РЅРµРіРёР·РіРё С‚Р°РїС€С‹СЂРјР°Р»Р°СЂ РєР°РЅРґР°Р№ Р°С‚РєР°СЂС‹Р»РґС‹?','Р”Р°СЏСЂ ТЇР»РіТЇРЅТЇ РєР°Р№С‚Р°Р»РѕРѕ РјРµРЅРµРЅ','УЁР· Р°Р»РґС‹РЅС‡Р° С‹РєРјР° С‚Р°РЅРґР°Рї, РјР°СЃРµР»Рµ С‡РµС‡ТЇТЇ РјРµРЅРµРЅ','УЁР·РіУ©С‡У© С‹РєРјР° РѕР№Р»РѕРї С‚Р°Р±СѓСѓ РјРµРЅРµРЅ'],
  ['РћРєСѓСѓС‡СѓР»Р°СЂ СЃСѓСЂРѕРѕР»РѕСЂРіРѕ РєР°РЅРґР°Р№ Р¶РѕРѕРї Р±РµСЂРёС€С‚Рё?','Р¤Р°РєС‚С‹Р»Р°СЂРґС‹ СЌСЃС‚РµРї Р°Р№С‚С‹Рї Р±РµСЂРёС€С‚Рё','РЎРµР±РµР±РёРЅ С‚ТЇС€ТЇРЅРґТЇСЂТЇРї, РґР°Р»РёР»РґРµС€С‚Рё','Р‘РёСЂ РЅРµС‡Рµ Р¶Р°ТЈС‹ Р±РѕР¶РѕРјРѕР» СЃСѓРЅСѓС€С‚Р°С€С‚С‹'],
  ['РњСѓСЂРґР°РіС‹ Р±РёР»РёРј Р¶Р°ТЈС‹ РєС‹СЂРґР°Р°Р»РґР° РєР°РЅРґР°Р№ РєРѕР»РґРѕРЅСѓР»РґСѓ?','РўР°Р°РЅС‹С€ РјРёСЃР°Р»РґС‹ РіР°РЅР° Р°С‚РєР°СЂС‹С€С‚С‹','Р–Р°ТЈС‹ Р¶Р°РіРґР°Р№РіР° Р±РёР»РёРјРґРё С‹Р»Р°Р№С‹РєС‚Р°С€С‚С‹СЂС‹С€С‚С‹','Р–Р°ТЈС‹ С‹РєРјР° Р¶Рµ РјРѕРґРµР»СЊ С‚ТЇР·ТЇС€С‚ТЇ'],
  ['РћРєСѓСѓС‡СѓР»Р°СЂ РјР°Р°Р»С‹РјР°С‚ РјРµРЅРµРЅ РєР°РЅРґР°Р№ РёС€С‚РµС€С‚Рё?','РўРµРєСЃС‚С‚РµРЅ РјР°Р°Р»С‹РјР°С‚С‚С‹ С‚Р°Р°Рї РєУ©С‡ТЇСЂТЇС€С‚ТЇ','РЎР°Р»С‹С€С‚С‹СЂС‹Рї, С‚Р°Р»РґР°Рї, Р¶С‹Р№С‹РЅС‚С‹Рє С‡С‹РіР°СЂС‹С€С‚С‹','РњР°Р°Р»С‹РјР°С‚С‚С‹ Р¶Р°ТЈС‹ РїСЂРѕРґСѓРєС‚РєР° Р°Р№Р»Р°РЅС‚С‹С€С‚С‹'],
  ['РўРѕРїС‚СѓРє РёС€С‚РёРЅ РЅР°С‚С‹Р№Р¶Р°СЃС‹ РєР°РЅРґР°Р№ Р±РѕР»РґСѓ?','Р‘РµСЂРёР»РіРµРЅ Р¶РѕРѕРїС‚Сѓ С‡РѕРіСѓСѓ РєР°Р№С‚Р°Р»РѕРѕ','РќРµРіРёР·РґРµР»РіРµРЅ Р±РёСЂРіРµР»РµС€РєРµРЅ С‡РµС‡РёРј','УЁР· Р°Р»РґС‹РЅС‡Р° РѕСЂРёРіРёРЅР°Р»РґСѓСѓ РґРѕР»Р±РѕРѕСЂ'],
  ['РћРєСѓСѓС‡СѓР»Р°СЂ РєР°С‚Р° Р¶Рµ РєС‹Р№С‹РЅС‡С‹Р»С‹РєРєР° РєР°РЅРґР°Р№ РјР°РјРёР»Рµ Р¶Р°СЃР°С€С‚С‹?','РњСѓРіР°Р»РёРјРґРёРЅ С‚СѓСѓСЂР° Р¶РѕРѕР±СѓРЅ РєТЇС‚ТЇС€С‚ТЇ','РљР°С‚Р°РЅС‹ С‚Р°Р»РґР°Рї, У©Р·РґУ©СЂТЇ РѕТЈРґРѕС€С‚Сѓ','РђР»СЊС‚РµСЂРЅР°С‚РёРІРґТЇТЇ Р¶РѕР»РґРѕСЂРґСѓ РёС€С‚РµРї С‡С‹РіС‹С€С‚С‹'],
  ['РћРєСѓСѓС‡СѓР»Р°СЂ РєР°РЅРґР°Р№ СЃСѓСЂРѕРѕР»РѕСЂРґСѓ Р±РµСЂРёС€С‚Рё?','РўР°РєС‚РѕРѕС‡Сѓ Р¶Р°РЅР° СЌСЃРєРµ С‚ТЇС€ТЇСЂТЇТЇС‡ТЇ','Р­РјРЅРµ ТЇС‡ТЇРЅ, РєР°РЅС‚РёРї РґРµРіРµРЅ С‚Р°Р»РґРѕРѕС‡Сѓ','Р­РіРµСЂ Р±Р°С€РєР°С‡Р° Р±РѕР»СЃРѕ РґРµРіРµРЅ РёР·РёР»РґУ©У©С‡ТЇ'],
  ['РЎР°Р±Р°Рє Р°СЏРіС‹РЅРґР° РѕРєСѓСѓС‡СѓР»Р°СЂ СЌРјРЅРµРЅРё РєУ©СЂСЃУ©С‚ТЇС€С‚ТЇ?','Р­СЂРµР¶Рµ Р¶Рµ С„Р°РєС‚С‹Р»Р°СЂРґС‹ РєР°Р№СЂР° Р°Р№С‚С‹Рї Р±РµСЂРёС€С‚Рё','РђР»РіР°РЅ Р±РёР»РёРјРё РјРµРЅРµРЅ С‚Р°РїС€С‹СЂРјР° С‡РµС‡РёС€С‚Рё','УЁР·ТЇРЅТЇРЅ Р¶Р°ТЈС‹ СЌРјРіРµРіРёРЅ Р¶Рµ РёРґРµСЏСЃС‹РЅ РєРѕСЂРіРѕС€С‚Сѓ'],
  ['РћРєСѓСѓС‡СѓРЅСѓРЅ У©Р· Р°Р»РґС‹РЅС‡Р°Р»С‹РіС‹ РєР°РЅРґР°Р№ Р±Р°Р№РєР°Р»РґС‹?','РљР°РґР°Рј-РєР°РґР°Рј РєУ©СЂСЃУ©С‚РјУ©РЅТЇ Р°С‚РєР°СЂРґС‹','РС€ Р¶РѕР»СѓРЅ У©Р· Р°Р»РґС‹РЅС‡Р° С‚Р°РЅРґР°РґС‹','РњР°РєСЃР°С‚, С‹РєРјР° Р¶Р°РЅР° РїСЂРѕРґСѓРєС‚С‚Сѓ У©Р·ТЇ РґРѕР»Р±РѕРѕСЂР»РѕРґСѓ']
];
const questions = [
  ['РЎР°Р±Р°РєС‚С‹РЅ РјР°РєСЃР°С‚С‹ РєР°РЅС‡Р°Р»С‹Рє РґРµТЈРіСЌСЌР»РґРµ РёС€РєРµ Р°С€С‚С‹?','РЎР°Р±Р°РєС‚С‹РЅ РјР°РєСЃР°С‚С‹ Р¶Р°СЂС‹Рј-Р¶Р°СЂС‚С‹Р»Р°Р№ РёС€РєРµ Р°С€С‚С‹.','РЎР°Р±Р°РєС‚С‹РЅ РЅРµРіРёР·РіРё РјР°РєСЃР°С‚С‹ РёС€РєРµ Р°С€С‚С‹.','РњР°РєСЃР°С‚ С‚РѕР»СѓРє РёС€РєРµ Р°С€С‹Рї, РѕРєСѓСѓС‡СѓР»Р°СЂ Р±РёР»РёРјРґРё Р¶Р°ТЈС‹ РєС‹СЂРґР°Р°Р»РґР° РєРѕР»РґРѕРЅРѕ Р°Р»С‹С€С‚С‹.'],
  ['РћРєСѓСѓС‡СѓР»Р°СЂРґС‹РЅ СЃР°Р±Р°РєС‚Р°РіС‹ Р°РєС‚РёРІРґТЇТЇР»ТЇРіТЇ РєР°РЅРґР°Р№ Р±РѕР»РґСѓ?','РћРєСѓСѓС‡СѓР»Р°СЂ РєУ©Р±ТЇРЅС‡У© РјСѓРіР°Р»РёРјРґРё СѓРіСѓРї, РґР°СЏСЂ РјР°Р°Р»С‹РјР°С‚С‚С‹ РєР°Р±С‹Р» Р°Р»С‹С€С‚С‹.','РћРєСѓСѓС‡СѓР»Р°СЂ СЃСѓСЂРѕРѕР»РѕСЂРіРѕ Р¶РѕРѕРї Р±РµСЂРёРї, С‚Р°РїС€С‹СЂРјР°Р»Р°СЂРґС‹ У©Р· Р°Р»РґС‹РЅС‡Р° Р°С‚РєР°СЂС‹С€С‚С‹.','РћРєСѓСѓС‡СѓР»Р°СЂ РґРµРјРёР»РіРµ РєУ©С‚У©СЂТЇРї, С‚Р°Р»РєСѓСѓР»Р°Рї, У©Р· РёРґРµСЏР»Р°СЂС‹РЅ Р¶Р°РЅР° С‡РµС‡РёРјРґРµСЂРёРЅ СЃСѓРЅСѓС€С‚Р°С€С‚С‹.'],
  ['РћРєСѓС‚СѓСѓРЅСѓРЅ СѓСЃСѓР»РґР°СЂС‹ РѕРєСѓСѓС‡СѓР»Р°СЂРґС‹РЅ РѕР№ Р¶ТЇРіТЇСЂС‚ТЇТЇСЃТЇРЅ РєР°РЅС‡Р°Р»С‹Рє У©РЅТЇРєС‚ТЇСЂРґТЇ?','РќРµРіРёР·РёРЅРµРЅ С‚ТЇС€ТЇРЅРґТЇСЂТЇТЇ Р¶Р°РЅР° РєР°Р№С‚Р°Р»РѕРѕ СѓСЃСѓР»РґР°СЂС‹ РєРѕР»РґРѕРЅСѓР»РґСѓ.','РўР°Р»РґРѕРѕ, СЃР°Р»С‹С€С‚С‹СЂСѓСѓ Р¶Р°РЅР° РєУ©Р№РіУ©Р№ С‡РµС‡ТЇТЇ С‚Р°РїС€С‹СЂРјР°Р»Р°СЂС‹ РєРѕР»РґРѕРЅСѓР»РґСѓ.','РР·РёР»РґУ©У©, С‡С‹РіР°СЂРјР°С‡С‹Р»С‹Рє Р¶Р°РЅР° У©Р· Р°Р»РґС‹РЅС‡Р° С‡РµС‡РёРј С‡С‹РіР°СЂСѓСѓ РёС€С‚РµСЂРё СѓСЋС€С‚СѓСЂСѓР»РґСѓ.'],
  ['РћРєСѓСѓС‡СѓР»Р°СЂ Р°Р»РіР°РЅ Р±РёР»РёРјРёРЅ РїСЂР°РєС‚РёРєР°РґР° РєР°РЅРґР°Р№ РєРѕР»РґРѕРЅРѕ Р°Р»С‹С€С‚С‹?','РћРєСѓСѓС‡СѓР»Р°СЂ ТЇР»РіТЇ Р±РѕСЋРЅС‡Р° С‚Р°РїС€С‹СЂРјР°Р»Р°СЂРґС‹ Р°С‚РєР°СЂС‹С€С‚С‹.','РћРєСѓСѓС‡СѓР»Р°СЂ Р°Р»РіР°РЅ Р±РёР»РёРјРёРЅ С‚Р°Р°РЅС‹С€ РїСЂР°РєС‚РёРєР°Р»С‹Рє РєС‹СЂРґР°Р°Р»РґР°СЂРґР° РєРѕР»РґРѕРЅСѓС€С‚Сѓ.','РћРєСѓСѓС‡СѓР»Р°СЂ Р°Р»РіР°РЅ Р±РёР»РёРјРёРЅ Р¶Р°ТЈС‹ С‚СѓСЂРјСѓС€С‚СѓРє РєС‹СЂРґР°Р°Р»РґР°СЂРґР° У©Р· Р°Р»РґС‹РЅС‡Р° РєРѕР»РґРѕРЅСѓС€С‚Сѓ.'],
  ['РЎР°Р±Р°РєС‚Р° РѕРєСѓСѓС‡СѓР»Р°СЂРґС‹РЅ Р¶РµС‚РёС€РєРµРЅРґРёРєС‚РµСЂРё РєР°РЅРґР°Р№ Р±Р°Р°Р»Р°РЅРґС‹?','РќРµРіРёР·РёРЅРµРЅ РјСѓРіР°Р»РёРј Р¶РѕРѕРїС‚РѕСЂРґСѓРЅ С‚СѓСѓСЂР°Р»С‹РіС‹РЅ С‚РµРєС€РµСЂРґРё.','Р‘Р°Р°Р»РѕРѕ РєСЂРёС‚РµСЂРёР№Р»РµСЂРё РєРѕР»РґРѕРЅСѓР»СѓРї, РѕРєСѓСѓС‡СѓР»Р°СЂРіР° РєР°Р№С‚Р°СЂС‹Рј Р±Р°Р№Р»Р°РЅС‹С€ Р±РµСЂРёР»РґРё.','РћРєСѓСѓС‡СѓР»Р°СЂ У©Р·ТЇРЅ-У©Р·ТЇ Р¶Р°РЅР° Р±РёСЂРё-Р±РёСЂРёРЅ Р±Р°Р°Р»Р°Рї, Р¶С‹Р№С‹РЅС‚С‹РєС‚С‹РЅ РЅРµРіРёР·РёРЅРґРµ РёС€РёРЅ Р¶Р°РєС€С‹СЂС‚С‹С€С‚С‹.']
];
const labels = ['Р РµРїСЂРѕРґСѓРєС‚РёРІРґТЇТЇ','РџСЂРѕРґСѓРєС‚РёРІРґТЇТЇ','РљСЂРµР°С‚РёРІРґТЇТЇ'];
const levels = ['РљР°РЅР°Р°С‚С‚Р°РЅРґС‹СЂР°СЂР»С‹Рє','Р–Р°РєС€С‹','Р­ТЈ Р¶Р°РєС€С‹'];
const literacy = ['РћРєСѓСѓ Р¶Р°РЅР° Р¶Р°Р·СѓСѓ СЃР°Р±Р°С‚С‚СѓСѓР»СѓРіСѓ','Р¤РёРЅР°РЅСЃС‹Р»С‹Рє СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','РўР°Р±РёРіС‹Р№-РёР»РёРјРёР№ СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','Р¤СѓРЅРєС†РёРѕРЅР°Р»РґС‹Рє СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','Р­РєРѕР»РѕРіРёСЏР»С‹Рє СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','РњР°РґР°РЅРёР№ СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','РЎР°СЏСЃРёР№ СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','РЎРѕС†РёР°Р»РґС‹Рє СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','Р“РµРЅРґРµСЂРґРёРє СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','РЎР°РЅР°СЂРёРї СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','Р­С‚РёРєР°Р»С‹Рє СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє','РЎР°Р»Р°РјР°С‚С‚С‹РєС‚С‹ СЃР°РєС‚РѕРѕ СЃР°Р±Р°С‚С‚СѓСѓР»СѓРіСѓ','РўРµС…РЅРёРєР°Р»С‹Рє СЃР°Р±Р°С‚С‚СѓСѓР»СѓРє'];
const steam = ['РР»РёРј (Science)','РўРµС…РЅРѕР»РѕРіРёСЏ (Technology)','РРЅР¶РµРЅРµСЂРёСЏ (Engineering)','РСЃРєСѓСЃСЃС‚РІРѕ (Arts)','РњР°С‚РµРјР°С‚РёРєР° (Mathematics)'];
const $ = id => document.getElementById(id);
const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const configured = window.SABAK_CONFIG?.url?.startsWith('https://') && !!window.SABAK_CONFIG?.anonKey && !window.SABAK_CONFIG.anonKey.startsWith('YOUR_');
const client = configured && window.supabase ? window.supabase.createClient(window.SABAK_CONFIG.url, window.SABAK_CONFIG.anonKey) : null;
let schools = [], all = [], isAdmin = false, isSuperAdminUser = false, adminSchoolId = null;
const schoolName = id => schools.find(s => String(s.id) === String(id))?.name || 'РњРµРєС‚РµР±Рё РєУ©СЂСЃУ©С‚ТЇР»РіУ©РЅ СЌРјРµСЃ';
const observedName = r => String(r.observation?.observed_teacher_name || '').trim();
const levelField = (name, title) => `<div class="question"><p>${escapeHtml(title)} *</p>${levels.map(v => `<label class="option"><input type="radio" name="${name}" value="${escapeHtml(v)}" required>${escapeHtml(v)}</label>`).join('')}</div>`;
const multiField = (name, title, options) => `<div class="question"><p>${escapeHtml(title)} *</p><div class="check-grid">${options.map(v => `<label><input type="checkbox" name="${name}" value="${escapeHtml(v)}">${escapeHtml(v)}</label>`).join('')}</div><p class="muted">Р‘РёСЂ Р¶Рµ Р±РёСЂ РЅРµС‡Рµ РІР°СЂРёР°РЅС‚С‚С‹ С‚Р°РЅРґР°ТЈС‹Р·.</p></div>`;

async function loadSchools() {
  if (!client) return;
  const {data,error} = await client.from('schools').select('id,name').order('name');
  if (error) { $('surveyError').textContent = 'РњРµРєС‚РµРїС‚РµСЂ Р¶ТЇРєС‚У©Р»РіУ©РЅ Р¶РѕРє: ' + error.message; return; }
  schools = data || [];
  const previousAdmin = $('adminSchool').value, previousSurvey = $('schoolSelect').value;
  $('schoolSelect').innerHTML = '<option value="">РњРµРєС‚РµРїС‚Рё С‚Р°РЅРґР°ТЈС‹Р·</option>';


  $('adminSchool').innerHTML = '<option value="all">Р‘Р°СЂРґС‹Рє РјРµРєС‚РµРїС‚РµСЂ</option><option value="none">РњРµРєС‚РµР±Рё РєУ©СЂСЃУ©С‚ТЇР»РіУ©РЅ СЌРјРµСЃ</option>';
  
$('newAdminSchool').innerHTML = '<option value="">РњРµРєС‚РµРїС‚Рё С‚Р°РЅРґР°ТЈС‹Р·</option>';

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
// РњРµРєС‚РµРї 1: РєР°С‚Р°Р»РѕРіРґРѕСЂ РєРѕРѕРїСЃСѓР· RPC Р°СЂРєС‹Р»СѓСѓ РіР°РЅР° Р¶ТЇРєС‚У©Р»У©С‚.
// Р‘Р°С€РєР° РјРµРєС‚РµРїС‚РµСЂ РјСѓСЂРґР°РіС‹ РєРѕР» РјРµРЅРµРЅ С‚РѕР»С‚СѓСЂСѓСѓС‡Сѓ С„РѕСЂРјР°РЅС‹ РєРѕР»РґРѕРЅРѕ Р±РµСЂРµС‚.
let directory = {teachers:[], subjects:[], classes:[]};
let directoryRequest = 0;
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
async function refreshDirectory() {
  const request = ++directoryRequest;
  const schoolId = Number($('schoolSelect').value);
  $('directoryStatus').textContent = '';
  if (schoolId !== 1) { setLegacyMode(true); return; }
  setLegacyMode(false);
  for (const id of directorySelects) $(id).disabled = true;
  $('directoryStatus').textContent = 'РњСѓРіР°Р»РёРјРґРµСЂ, РїСЂРµРґРјРµС‚С‚РµСЂ Р¶Р°РЅР° РєР»Р°СЃСЃС‚Р°СЂ Р¶ТЇРєС‚У©Р»ТЇТЇРґУ©...';
  if (!client) { $('directoryStatus').textContent = 'Supabase РєРѕРЅС„РёРіСѓСЂР°С†РёСЏСЃС‹ Р¶РѕРє.'; return; }
  const {data,error} = await client.rpc('get_observation_directory', {p_school_id: schoolId});
  if (request !== directoryRequest) return;
  if (error) {
    $('directoryStatus').textContent = 'РўРёР·РјРµР»РµСЂ Р¶ТЇРєС‚У©Р»РіУ©РЅ Р¶РѕРє. РђР»РіР°С‡ Р°СЂС…РёРІРґРµРіРё SQL С„Р°Р№Р»С‹РЅ Supabase SQL Editor Р°СЂРєС‹Р»СѓСѓ РёС€С‚РµС‚РёТЈРёР·. РљР°С‚Р°: ' + error.message;
    return;
  }
  directory = {
    teachers: Array.isArray(data?.teachers) ? data.teachers : [],
    subjects: Array.isArray(data?.subjects) ? data.subjects : [],
    classes: Array.isArray(data?.classes) ? data.classes : []
  };
  fillDirectorySelect('teacherSelect',directory.teachers,'РўР°Р»РґРѕРѕС‡Сѓ РјСѓРіР°Р»РёРјРґРё С‚Р°РЅРґР°ТЈС‹Р·','full_name');
  fillDirectorySelect('observedTeacherSelect',directory.teachers,'РЎР°Р±Р°Рє У©С‚РєУ©РЅ РјСѓРіР°Р»РёРјРґРё С‚Р°РЅРґР°ТЈС‹Р·','full_name');
  fillDirectorySelect('subjectSelect',directory.subjects,'РџСЂРµРґРјРµС‚С‚Рё С‚Р°РЅРґР°ТЈС‹Р·');
  fillDirectorySelect('classSelect',directory.classes,'РљР»Р°СЃСЃС‚С‹ С‚Р°РЅРґР°ТЈС‹Р·');
  const complete = directory.teachers.length && directory.subjects.length && directory.classes.length;
  for (const id of directorySelects) $(id).disabled = !complete;
  $('directoryStatus').textContent = complete ? 'РўРёР·РјРµР»РµСЂ РґР°СЏСЂ. РўРµСЃС‚ РјСѓРіР°Р»РёРј Р¶Р°РЅР° С‚РµСЃС‚ РїСЂРµРґРјРµС‚ СЂР°СЃРјРёР№ С‚Р°РЅРґРѕРѕРґРѕРЅ Р¶Р°С€С‹СЂС‹Р»РіР°РЅ.' : 'РўРёР·РјРµР»РµСЂ С‚РѕР»СѓРє СЌРјРµСЃ. Supabase РјР°Р°Р»С‹РјР°С‚С‚Р°СЂС‹РЅ С‚РµРєС€РµСЂРёТЈРёР·.';
}
$('schoolSelect').addEventListener('change', refreshDirectory);

if (!client) $('configWarning').classList.remove('hidden');
$('observationFields').innerHTML =
  levelField('organization_level','РЎР°Р±Р°РєС‚С‹ СѓСЋС€С‚СѓСЂСѓСѓ Р¶У©РЅРґУ©РјРґТЇТЇР»ТЇРіТЇ') +
  levelField('technology_level','РРЅРЅРѕРІР°С†РёСЏР»С‹Рє-РєРѕРјРїСЊСЋС‚РµСЂРґРёРє С‚РµС…РЅРѕР»РѕРіРёСЏР»Р°СЂ РјРµРЅРµРЅ РёС€С‚У©У© Р¶У©РЅРґУ©РјРґТЇТЇР»ТЇРіТЇ') +
  multiField('literacy_types','РЎР°Р±Р°С‚С‚СѓСѓР»СѓРєС‚СѓРЅ РєР°Р№СЃС‹ С‚ТЇСЂР»У©СЂТЇРЅУ© Р±Р°СЃС‹Рј Р¶Р°СЃР°Р»РґС‹?',literacy) +
  '<div class="question"><p>STEAM РєРѕРјРїРѕРЅРµРЅС‚С‚РµСЂРё</p><p class="muted">S вЂ” Science (РёР»РёРј), T вЂ” Technology (С‚РµС…РЅРѕР»РѕРіРёСЏ), E вЂ” Engineering (РёРЅР¶РµРЅРµСЂРёСЏ), A вЂ” Arts (РёСЃРєСѓСЃСЃС‚РІРѕ), M вЂ” Mathematics (РјР°С‚РµРјР°С‚РёРєР°).</p></div>' +
  multiField('steam_components','РЎР°Р±Р°РєС‚Р° STEAMРґРёРЅ РєР°Р№СЃС‹ РєРѕРјРїРѕРЅРµРЅС‚С‚РµСЂРё РєРѕР»РґРѕРЅСѓР»РґСѓ?',steam) +
  levelField('pedagogical_level','РџСЃРёС…РѕР»РѕРіРёСЏР»С‹Рє-РїРµРґР°РіРѕРіРёРєР°Р»С‹Рє РєС‹СЂРґР°Р°Р»РґР°РЅ С‡С‹РіСѓСѓ Р¶У©РЅРґУ©РјРґТЇТЇР»ТЇРіТЇ') +
  levelField('reinforcement_level','РЎР°Р±Р°РєС‚С‹ Р±С‹С€С‹РєС‚РѕРѕ Р¶У©РЅРґУ©РјРґТЇТЇР»ТЇРіТЇ') +
  '<div class="question"><p>РЎР°Р±Р°РєС‚Р° РєР°Р№СЃС‹ РєУ©РЅРґТЇРј Р±Р°СЃС‹РјРґСѓСѓР»СѓРє РєС‹Р»РґС‹? *</p><label class="option"><input type="radio" name="dominant_skill" value="Р–СѓРјС€Р°Рє РєУ©РЅРґТЇРј (soft skills)" required>Р–СѓРјС€Р°Рє РєУ©РЅРґТЇРј (soft skills)</label><label class="option"><input type="radio" name="dominant_skill" value="РљР°С‚СѓСѓ РєУ©РЅРґТЇРј (hard skills)" required>РљР°С‚СѓСѓ РєУ©РЅРґТЇРј (hard skills)</label></div>';
$('questions').innerHTML = questions.map((q,i) => `<div class="question"><p>${i+1}. ${escapeHtml(q[0])}</p>${q.slice(1).map((a,j) => `<label class="option"><input type="radio" name="q${i}" value="${j}" required>${escapeHtml(a)}</label>`).join('')}</div>`).join('');

function tab(which) {
  $('teacher').classList.toggle('hidden',which !== 'teacher');
  $('admin').classList.toggle('hidden',which !== 'admin');
  $('teacherTab').className = which === 'teacher' ? '' : 'secondary';
  $('adminTab').className = which === 'admin' ? '' : 'secondary';
  if (which === 'admin') checkSession();
}
$('teacherTab').onclick = () => tab('teacher');
$('adminTab').onclick = () => tab('admin');

$('survey').onsubmit = async e => {
  e.preventDefault(); $('surveyError').textContent = '';
  if (!client) { $('surveyError').textContent = 'РћРЅР»Р°Р№РЅ Р±Р°Р·Р° Р°Р·С‹СЂС‹РЅС‡Р° РѕСЂРЅРѕС‚СѓР»РіР°РЅ СЌРјРµСЃ.'; return; }
  const form = new FormData(e.target);
  const answers = questions.map((_,i) => form.get('q'+i) === null ? NaN : Number(form.get('q'+i)));
  const schoolId = Number(form.get('school_id'));
  if (!schools.some(s => Number(s.id) === schoolId)) { $('surveyError').textContent = 'РњРµРєС‚РµРїС‚Рё С‚Р°РЅРґР°ТЈС‹Р·.'; return; }
  if (answers.some(v => ![0,1,2].includes(v))) { $('surveyError').textContent = '5 СЃСѓСЂРѕРѕРЅСѓРЅ Р±Р°Р°СЂС‹РЅР° Р¶РѕРѕРї Р±РµСЂРёТЈРёР·.'; return; }
  const selectedLiteracy = form.getAll('literacy_types'), selectedSteam = form.getAll('steam_components');
  if (!selectedLiteracy.length || !selectedSteam.length) { $('surveyError').textContent = 'РЎР°Р±Р°С‚С‚СѓСѓР»СѓРєС‚СѓРЅ Р¶Р°РЅР° STEAMРґРёРЅ Р¶РѕРє РґРµРіРµРЅРґРµ Р±РёСЂРґРµРЅ С‚ТЇСЂТЇРЅ С‚Р°РЅРґР°ТЈС‹Р·.'; return; }
  const studentCount = Number(form.get('student_count'));
  if (!Number.isInteger(studentCount) || studentCount < 0 || studentCount > 1000) { $('surveyError').textContent = 'РћРєСѓСѓС‡СѓР»Р°СЂРґС‹РЅ СЃР°РЅС‹РЅ С‚СѓСѓСЂР° Р¶Р°Р·С‹ТЈС‹Р·.'; return; }
  const counts = labels.map((_,i) => answers.filter(x => x === i).length);
  const max = Math.max(...counts), winners = labels.filter((_,i) => counts[i] === max);
  const outcome = winners.length === 1 ? winners[0] : 'РђСЂР°Р»Р°С€: ' + winners.join(' / ');
  const useDirectory = schoolId === 1;
  const getSelected = (id, rows) => rows.find(x => String(x.id) === String(form.get(id)));
  const observer = useDirectory ? getSelected('teacher_id',directory.teachers) : null;
  const observed = useDirectory ? getSelected('observed_teacher_id',directory.teachers) : null;
  const selectedSubject = useDirectory ? getSelected('subject_id',directory.subjects) : null;
  const selectedClass = useDirectory ? getSelected('class_id',directory.classes) : null;
  if (useDirectory && (!observer || !observed || !selectedSubject || !selectedClass)) {
    $('surveyError').textContent = 'РњСѓРіР°Р»РёРјРґРё, РїСЂРµРґРјРµС‚С‚Рё Р¶Р°РЅР° РєР»Р°СЃСЃС‚С‹ С‚РёР·РјРµРґРµРЅ С‚Р°РЅРґР°ТЈС‹Р·.'; return;
  }
  const observedTeacher = useDirectory ? observed.full_name : String(form.get('observed_teacher') || '').trim();
  const observerTeacher = useDirectory ? observer.full_name : String(form.get('teacher') || '').trim();
  if (!observerTeacher || !observedTeacher) { $('surveyError').textContent = 'Р­РєРё РјСѓРіР°Р»РёРјРґРёРЅ С‚РµТЈ Р°С‚С‹-Р¶У©РЅТЇРЅ РєУ©СЂСЃУ©С‚ТЇТЈТЇР·.'; return; }
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
    school_id:schoolId, teacher_name:observerTeacher,
    subject:useDirectory ? selectedSubject.name : String(form.get('subject') || '').trim(),
    classroom:useDirectory ? selectedClass.name : String(form.get('classroom') || '').trim(),
    topic:String(form.get('topic') || '').trim(),
    answers,counts,outcome,observation
  };
  $('submitBtn').disabled = true;
  try {
    const {error} = await client.from('lesson_reviews').insert(payload);
    if (error) throw error;
    $('survey').classList.add('hidden'); $('result').classList.remove('hidden');
    $('result').innerHTML = `<h2>Р–С‹Р№С‹РЅС‚С‹Рє СЃР°РєС‚Р°Р»РґС‹ вњ“</h2><h3>${escapeHtml(outcome)}</h3>${labels.map((l,i) => `<p>${l}: <b>${Math.round(counts[i]/questions.length*100)}%</b></p><div class="bar"><div class="fill" style="width:${counts[i]/questions.length*100}%"></div></div>`).join('')}<p class="muted">Р–С‹Р№С‹РЅС‚С‹Рє Р°РґРјРёРЅРёСЃС‚СЂР°С†РёСЏРЅС‹РЅ Р±Р°Р·Р°СЃС‹РЅР° СЃР°РєС‚Р°Р»РґС‹.</p><button id="again">Р–Р°ТЈС‹ С‚Р°Р»РґРѕРѕ</button>`;
    $('again').onclick = () => { e.target.reset(); $('survey').classList.remove('hidden'); $('result').classList.add('hidden'); window.scrollTo(0,0); };
  } catch(err) { $('surveyError').textContent = 'РЎР°РєС‚РѕРѕ РјТЇРјРєТЇРЅ Р±РѕР»РіРѕРЅ Р¶РѕРє: ' + err.message; }
  finally { $('submitBtn').disabled = false; }
};

async function isSuperAdmin() {
  if (!client) return false;
  const {data:userData,error:userError} = await client.auth.getUser();
  if (userError || !userData.user) return false;
  const {data,error} = await client.from('super_admins').select('user_id').eq('user_id',userData.user.id).maybeSingle();
  if (error) { console.error('РЈРєСѓРєС‚Сѓ С‚РµРєС€РµСЂТЇТЇ РєР°С‚Р°СЃС‹:',error); return false; }
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
    await loadSchools();
  $('loginCard').classList.toggle('hidden',isAdmin);
  $('dashboard').classList.toggle('hidden',!isAdmin);
  $('superAdminPanel').classList.toggle('hidden',!isSuperAdminUser);
  $('schoolComparisonPanel').classList.toggle('hidden', !isSuperAdminUser);
  if (isAdmin) {
  await loadDashboard();

  if (isSuperAdminUser) {
    renderManageSchools();
    await loadManageAdmins();
  }
}
  else if (user) $('loginError').textContent = 'Р‘СѓР» Р°РєРєР°СѓРЅС‚ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂ РєР°С‚Р°СЂС‹ РєР°С‚С‚Р°Р»РіР°РЅ СЌРјРµСЃ.';
}
$('login').onsubmit = async e => {
  e.preventDefault(); $('loginError').textContent = '';
  if (!client) { $('loginError').textContent = 'РђРґРµРіРµРЅРґРµ Р±Р°Р·Р°РЅС‹ РѕСЂРЅРѕС‚СѓТЈСѓР·.'; return; }
  const f = new FormData(e.target);
  const {error} = await client.auth.signInWithPassword({email:f.get('email'),password:f.get('password')});
  if (error) { $('loginError').textContent = 'РљРёСЂТЇТЇ РёС€РєРµ Р°С€РєР°РЅ Р¶РѕРє: ' + error.message; return; }
  await checkSession();
};
$('logout').onclick = async () => { await client?.auth.signOut(); all=[]; isAdmin=false; isSuperAdminUser=false; adminSchoolId=null; $('loginError').textContent=''; await checkSession(); };
async function loadDashboard() {
  try {
    $('adminError').textContent = ''; all=[]; let start=0;
    while (true) {
      const {data,error} = await client.from('lesson_reviews').select('*').order('created_at',{ascending:false}).range(start,start+999);
      if (error) throw error;
      all.push(...data);
      if (data.length < 1000) break;
      start += 1000;
    }
    renderDashboard();
  } catch(e) { $('adminError').textContent = 'РњР°Р°Р»С‹РјР°С‚С‚Р°СЂРґС‹ Р°Р»СѓСѓ РјТЇРјРєТЇРЅ Р±РѕР»РіРѕРЅ Р¶РѕРє: ' + e.message; }
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
    else byTeacher.set(key,{school:schoolName(r.school_id),observer,observed:observed || 'вЂ”',n:1,last:r.outcome});
  }
  $('unique').textContent = new Set(rows.map(r => String(r.school_id??'none')+'|'+String(r.teacher_name||'').trim().toLocaleLowerCase())).size;
  $('total').textContent = rows.length;
  $('week').textContent = rows.filter(r => Date.now()-new Date(r.created_at).getTime() <= 7*86400000).length;
  $('distribution').innerHTML = labels.map(l => {
    const n=rows.filter(r => r.outcome===l).length;
    const pct=rows.length?Math.round(n/rows.length*100):0;
    return `<p>${l}: <b>${n}</b> (${pct}%)</p><div class="bar"><div class="fill" style="width:${pct}%"></div></div>`;
  }).join('') + `<p class="muted">РђСЂР°Р»Р°С€ Р¶С‹Р№С‹РЅС‚С‹РєС‚Р°СЂ: ${rows.filter(r => String(r.outcome||'').startsWith('РђСЂР°Р»Р°С€')).length}</p>`;
  $('teachersTable').innerHTML = [...byTeacher.values()].sort((a,b) => b.n-a.n).map(x => `<tr><td>${escapeHtml(x.school)}</td><td>${escapeHtml(x.observer)}</td><td>${escapeHtml(x.observed)}</td><td>${x.n}</td><td>${escapeHtml(x.last)}</td></tr>`).join('') || '<tr><td colspan="5">РњР°Р°Р»С‹РјР°С‚ Р¶РѕРє</td></tr>';
  const groups = new Map();
  for (const r of all) { const key=String(r.school_id??'none'); if(!groups.has(key)) groups.set(key,[]); groups.get(key).push(r); }
  $('schoolsTable').innerHTML = [...groups].map(([id,list]) => `<tr><td>${escapeHtml(schoolName(id==='none'?null:id))}</td><td>${new Set(list.map(r => String(r.teacher_name||'').trim().toLocaleLowerCase())).size}</td><td>${list.length}</td>${labels.map(l => `<td>${list.filter(r => r.outcome===l).length}</td>`).join('')}<td>${list.filter(r => String(r.outcome||'').startsWith('РђСЂР°Р»Р°С€')).length}</td></tr>`).join('') || '<tr><td colspan="7">РњР°Р°Р»С‹РјР°С‚ Р¶РѕРє</td></tr>';
  renderRecords();
}
const observationFields = [
  ['observed_teacher_name','РЎР°Р±Р°Рє У©С‚РєУ©РЅ РјСѓРіР°Р»РёРј'],
  ['student_count','РљР°С‚С‹С€РєР°РЅ РѕРєСѓСѓС‡СѓР»Р°СЂ'],
  ['visit_purpose','РљР°С‚С‹С€СѓСѓРЅСѓРЅ РјР°РєСЃР°С‚С‹'],
  ['teaching_methods','РљРѕР»РґРѕРЅСѓР»РіР°РЅ СѓСЃСѓР»РґР°СЂ'],
  ['organization_level','РЈСЋС€С‚СѓСЂСѓСѓ Р¶У©РЅРґУ©РјРґТЇТЇР»ТЇРіТЇ'],
  ['technology_level','РљРѕРјРїСЊСЋС‚РµСЂРґРёРє С‚РµС…РЅРѕР»РѕРіРёСЏР»Р°СЂ'],
  ['literacy_types','РЎР°Р±Р°С‚С‚СѓСѓР»СѓРєС‚СѓРЅ С‚ТЇСЂР»У©СЂТЇ'],
  ['steam_components','STEAM РєРѕРјРїРѕРЅРµРЅС‚С‚РµСЂРё'],
  ['pedagogical_level','РџРµРґР°РіРѕРіРёРєР°Р»С‹Рє РєС‹СЂРґР°Р°Р»'],
  ['reinforcement_level','Р‘С‹С€С‹РєС‚РѕРѕ Р¶У©РЅРґУ©РјРґТЇТЇР»ТЇРіТЇ'],
  ['dominant_skill','Р‘Р°СЃС‹РјРґСѓСѓ РєУ©РЅРґТЇРј'],
  ['feedback','РЎСѓРЅСѓС€С‚Р°СЂ Р¶Р°РЅР° РїРёРєРёСЂР»РµСЂ']
];
const valueText = v => Array.isArray(v) ? v.join(', ') : String(v??'');
function recordDetails(r) {
  const obs=r.observation||{}, qs=Array.isArray(r.answers)&&r.answers.length===10?legacyQuestions:questions;
  const meta=obs.version===2 ? observationFields.map(([key,title]) => `<p><b>${escapeHtml(title)}:</b> ${escapeHtml(valueText(obs[key]))||'вЂ”'}</p>`).join('') : '<p class="muted">РњСѓСЂРґР°РіС‹ 10 СЃСѓСЂРѕРѕР»СѓРє С‚Р°Р»РґРѕРѕ</p>';
  const answers=(r.answers||[]).map((v,i) => `<p><b>${i+1}. ${escapeHtml(qs[i]?.[0]||'')}</b> ${escapeHtml(qs[i]?.[Number(v)+1]||'')}</p>`).join('');
  return `<details><summary>РљУ©СЂТЇТЇ</summary>${meta}<h4>РљСЂРёС‚РµСЂРёР№Р»РµСЂ Р±РѕСЋРЅС‡Р° Р¶РѕРѕРїС‚РѕСЂ</h4>${answers}</details>`;
}
function renderRecords() {
  $('records').innerHTML = visibleRows().map(r => `<tr><td>${escapeHtml(new Date(r.created_at).toLocaleString('ky-KG'))}</td><td>${escapeHtml(schoolName(r.school_id))}</td><td>${escapeHtml(r.teacher_name)}</td><td>${escapeHtml(observedName(r)||'вЂ”')}</td><td>${escapeHtml(r.subject)} / ${escapeHtml(r.classroom)}</td><td>${escapeHtml(r.topic)}</td><td>${escapeHtml(r.outcome)}</td><td>${recordDetails(r)}</td><td>${canDeleteReview(r)?`<button class="danger smallbtn" data-delete-id="${escapeHtml(r.id)}">УЁС‡ТЇСЂТЇТЇ</button>`:''}</td></tr>`).join('') || '<tr><td colspan="9">РњР°Р°Р»С‹РјР°С‚ Р¶РѕРє</td></tr>';
}
$('adminSchool').onchange = renderDashboard;
$('filter').oninput = renderRecords;
$('records').onclick = async e => {
  const button = e.target.closest('[data-delete-id]');
  if (!button || !client || !isAdmin) return;
  const id = button.dataset.deleteId;
  const review = all.find(r => String(r.id) === id);
  if (!review || !canDeleteReview(review)) {
    $('adminError').textContent = 'Р‘СѓР» С‚Р°Р»РґРѕРѕРЅСѓ У©С‡ТЇСЂТЇТЇРіУ© СѓСЂСѓРєСЃР°С‚С‹ТЈС‹Р· Р¶РѕРє.';
    return;
  }
  const description = [schoolName(review.school_id), review.teacher_name, observedName(review), review.topic].filter(Boolean).join(' / ');
  if (!confirm('РўУ©РјУ©РЅРєТЇ С‚Р°Р»РґРѕРѕРЅСѓ Р±РёСЂРѕС‚РѕР»Рѕ У©С‡ТЇСЂУ©СЃТЇР·Р±ТЇ?\n\n' + description + '\n\nР‘СѓР» Р°СЂР°РєРµС‚ РєР°Р№С‚Р°СЂС‹Р»Р±Р°Р№С‚.')) return;
  button.disabled = true;
  $('adminError').textContent = '';
  try {
    // РЈРєСѓРєС‚Сѓ Р°РєС‹СЂРєС‹ Р¶РѕР»Сѓ Supabase'С‚РµРіРё admin_delete_review С„СѓРЅРєС†РёСЏСЃС‹ С‚РµРєС€РµСЂРµС‚.
    const {error} = await client.rpc('admin_delete_review', {review_id:id});
    if (error) throw error;
    await loadDashboard();
  } catch (error) {
    $('adminError').textContent = 'УЁС‡ТЇСЂТЇТЇ РёС€РєРµ Р°С€РєР°РЅ Р¶РѕРє: ' + error.message;
    button.disabled = false;
  }
};
async function resetStats(allSchools) {
  if(!isSuperAdminUser)return;
  const selected=$('adminSchool').value;
  if(!allSchools&&selected==='all'){alert('РђРґРµРіРµРЅРґРµ Р±РёСЂ РјРµРєС‚РµРїС‚Рё С‚Р°РЅРґР°ТЈС‹Р·.');return;}
  const target=allSchools?'Р‘РђР Р”Р«Рљ РњР•РљРўР•РџРўР•Р ':selected==='none'?'РњР•РљРўР•Р‘Р РљУЁР РЎУЁРўТ®Р›Р‘УЁР“УЁРќ Р–РђР—РЈРЈР›РђР ':schoolName(selected);
  if(!confirm(target+' Р±РѕСЋРЅС‡Р° Р±Р°СЂРґС‹Рє С‚Р°Р»РґРѕРѕР»РѕСЂРґСѓ Р±РёСЂРѕС‚РѕР»Рѕ У©С‡ТЇСЂУ©СЃТЇР·Р±ТЇ?'))return;
  if(prompt('Р«СЂР°СЃС‚РѕРѕ ТЇС‡ТЇРЅ РўРђР—РђР›Рђ РґРµРї Р¶Р°Р·С‹ТЈС‹Р·:')!=='РўРђР—РђР›Рђ')return;
  for(const id of ['resetAll','resetSchool'])$(id).disabled=true;
  try {
    const {data,error}=await client.rpc('admin_reset_reviews',{target_school_id:allSchools?null:selected==='none'?-1:Number(selected),reset_all:allSchools});
    if(error)throw error;
    $('deleteStatus').textContent='УЁС‡ТЇСЂТЇР»РіУ©РЅ Р¶Р°Р·СѓСѓР»Р°СЂ: '+data;
    await loadDashboard();
  } catch(e) { $('deleteStatus').textContent='РљР°С‚Р°: '+e.message; }
  finally { for(const id of ['resetAll','resetSchool'])$(id).disabled=false; }
}
$('resetSchool').onclick=()=>resetStats(false);
$('resetAll').onclick=()=>resetStats(true);
$('export').onclick=()=>{
  const columns=['РЈР±Р°РєС‹С‚','РњРµРєС‚РµРї','РўР°Р»РґРѕРѕС‡Сѓ РјСѓРіР°Р»РёРј','РЎР°Р±Р°Рє У©С‚РєУ©РЅ РјСѓРіР°Р»РёРј','РџСЂРµРґРјРµС‚','РљР»Р°СЃСЃ','РўРµРјР°','Р–С‹Р№С‹РЅС‚С‹Рє','РђРЅРєРµС‚Р° РІРµСЂСЃРёСЏСЃС‹','Р РµРїСЂРѕРґСѓРєС‚РёРІРґТЇТЇ','РџСЂРѕРґСѓРєС‚РёРІРґТЇТЇ','РљСЂРµР°С‚РёРІРґТЇТЇ',...observationFields.filter(x=>x[0]!=='observed_teacher_name').map(x=>x[1]),...Array.from({length:10},(_,i)=>`РЎСѓСЂРѕРѕ ${i+1}`)];
  const rows=visibleRows().map(r=>{
    const obs=r.observation||{}, qs=Array.isArray(r.answers)&&r.answers.length===10?legacyQuestions:questions;
    return [r.created_at,schoolName(r.school_id),r.teacher_name,observedName(r),r.subject,r.classroom,r.topic,r.outcome,obs.version===2?'5 СЃСѓСЂРѕРѕ':'10 СЃСѓСЂРѕРѕ',...(r.counts||[]),...observationFields.filter(x=>x[0]!=='observed_teacher_name').map(([key])=>valueText(obs[key])),...Array.from({length:10},(_,i)=>qs[i]?.[Number(r.answers?.[i])+1]||'')];
  });
  const csv='\ufeff'+[columns,...rows].map(row=>row.map(v=>{let s=String(v??'');if(/^[\s]*[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}).join(';')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='sabak-monitoring.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
async function loadManageAdmins() {
  if (!client || !isSuperAdminUser) return;

  const table = $('manageAdminsTable');

  table.innerHTML =
    '<tr><td colspan="3">Р–ТЇРєС‚У©Р»ТЇТЇРґУ©...</td></tr>';

  const { data, error } = await client.rpc('list_school_admins');

  if (error) {
    table.innerHTML =
      '<tr><td colspan="3">РўРёР·РјРµРЅРё Р¶ТЇРєС‚У©У©РґУ© РєР°С‚Р° РєРµС‚С‚Рё</td></tr>';

    $('adminManageStatus').textContent =
      'РљР°С‚Р°: ' + error.message;

    return;
  }

  table.innerHTML = (data || []).map(admin => `
    <tr>
      <td>${escapeHtml(admin.email)}</td>
      <td>${escapeHtml(admin.school_name || 'Р‘Р°С€РєС‹ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂ')}</td>
      <td>вЂ”</td>
    </tr>
  `).join('') ||
  '<tr><td colspan="3">РђРґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР»РѕСЂ Р¶РѕРє</td></tr>';
}
function renderManageSchools() {
  if(!isSuperAdminUser)return;
  
$('manageSchoolsTable').innerHTML = schools.map(s => `
  <tr>
    <td>${escapeHtml(s.name)}</td>
    <td>
      <button type="button" class="secondary smallbtn"
        data-rename-school="${escapeHtml(s.id)}">
        РђС‚С‹РЅ У©Р·РіУ©СЂС‚ТЇТЇ
      </button>
      ${Number(s.id) === 1 ? '' : `
        <button type="button" class="danger smallbtn"
          data-delete-school="${escapeHtml(s.id)}">
          УЁС‡ТЇСЂТЇТЇ
        </button>
      `}
    </td>
  </tr>
`).join('') || '<tr><td colspan="2">РњРµРєС‚РµРї Р¶РѕРє</td></tr>';

}
$('addSchoolForm').onsubmit=async event=>{
  event.preventDefault();if(!client||!isSuperAdminUser)return;
  const name=$('newSchoolName').value.trim();if(!name)return;
  const button=$('addSchoolForm').querySelector('button[type="submit"]');button.disabled=true;$('schoolManageStatus').textContent='';
  try {
    const {error}=await client.rpc('admin_add_school',{school_name:name});if(error)throw error;
    $('newSchoolName').value='';await loadSchools();renderManageSchools();renderDashboard();
    $('schoolManageStatus').textContent='РњРµРєС‚РµРї РёР№РіРёР»РёРєС‚ТЇТЇ РєРѕС€СѓР»РґСѓ.';
  }catch(error){$('schoolManageStatus').textContent='РљР°С‚Р°: '+error.message;}
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
      'РђРґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРіРѕ С‡Р°РєС‹СЂСѓСѓ Р¶У©РЅУ©С‚ТЇР»РґТЇ. Р­Р»РµРєС‚СЂРѕРЅРґСѓРє РїРѕС‡С‚Р°СЃС‹РЅ С‚РµРєС€РµСЂСЃРёРЅ.';
  } catch (error) {
    $('adminManageStatus').textContent =
      'РљР°С‚Р°: ' + error.message;
  } finally {
    button.disabled = false;
  }
};

$('manageSchoolsTable').onclick=async event=>{
  const button=event.target.closest('[data-rename-school]');if(!button||!client||!isSuperAdminUser)return;
  const school=schools.find(s=>String(s.id)===button.dataset.renameSchool);if(!school)return;
  const answer=prompt('РњРµРєС‚РµРїС‚РёРЅ Р¶Р°ТЈС‹ Р°С‚Р°Р»С‹С€С‹:',school.name);if(answer===null)return;
  const name=answer.trim();if(!name||name===school.name)return;
  if(name.length>200){$('schoolManageStatus').textContent='РђС‚Р°Р»С‹С€ 200 Р±РµР»РіРёРґРµРЅ Р°С€РїР°С€С‹ РєРµСЂРµРє.';return;}
  button.disabled=true;$('schoolManageStatus').textContent='';
  try{
    const {error}=await client.rpc('admin_rename_school',{target_id:school.id,new_name:name});if(error)throw error;
    await loadSchools();renderManageSchools();renderDashboard();$('schoolManageStatus').textContent='РњРµРєС‚РµРїС‚РёРЅ Р°С‚Р°Р»С‹С€С‹ У©Р·РіУ©СЂС‚ТЇР»РґТЇ.';
  }catch(error){$('schoolManageStatus').textContent='РљР°С‚Р°: '+error.message;}
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
    `"${school.name}" РјРµРєС‚РµР±РёРЅ У©С‡ТЇСЂУ©СЃТЇР·Р±ТЇ?\n\n` +
    'РњРµРєС‚РµРїС‚Рµ С‚Р°Р»РґРѕРѕР»РѕСЂ Р¶Рµ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР»РѕСЂ Р±РѕР»СЃРѕ, У©С‡ТЇСЂТЇТЇРіУ© СѓСЂСѓРєСЃР°С‚ Р±РµСЂРёР»Р±РµР№С‚.'
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
      'РњРµРєС‚РµРї РёР№РіРёР»РёРєС‚ТЇТЇ У©С‡ТЇСЂТЇР»РґТЇ.';
  } catch (error) {
    $('schoolManageStatus').textContent =
      'УЁС‡ТЇСЂТЇТЇ РёС€РєРµ Р°С€РєР°РЅ Р¶РѕРє: ' + error.message;
  } finally {
    button.disabled = false;
  }
});

loadSchools();
