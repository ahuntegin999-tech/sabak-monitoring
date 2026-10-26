// V7: local-only appearance preview. Does NOT save images or modify Supabase.
(()=>{'use strict';
 const $=id=>document.getElementById(id);
 let bg=null,logo=null,authorized=false;
 function clearPreview(){
  if(bg)URL.revokeObjectURL(bg);if(logo)URL.revokeObjectURL(logo);bg=logo=null;
  document.body.classList.remove('preview-background','preview-logo');
  document.body.style.removeProperty('--preview-bg');document.body.style.removeProperty('--preview-logo');
  $('previewBackground').value='';$('previewLogo').value='';
  for(const id of ['previewBackgroundName','previewLogoName']){
   const el=$(id);el.setAttribute('data-ky','Файл тандалган жок');el.setAttribute('data-ru','Файл не выбран');
   el.textContent=$('siteLanguage').value==='ru'?'Файл не выбран':'Файл тандалган жок';
  }
 }
 function setAccess(value){authorized=!!value;$('designPreviewPanel').classList.toggle('hidden',!authorized);
  for(const id of ['previewBackground','previewLogo','resetDesignPreview'])$(id).disabled=!authorized;
  if(!authorized)clearPreview();
 }
 window.addEventListener('sabak-admin-access',e=>setAccess(e.detail?.canPreview));
 setAccess(false);
 function status(ky,ru){$('designPreviewStatus').textContent=$('siteLanguage').value==='ru'?ru:ky}
 function setImage(input,kind){if(!authorized){input.value='';return;}const file=input.files?.[0];if(!file)return;
   if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024){status('JPG, PNG же WebP, 8 МБ чейин гана.','Только JPG, PNG или WebP до 8 МБ.');input.value='';return}
   const url=URL.createObjectURL(file);
   if(kind==='bg'){if(bg)URL.revokeObjectURL(bg);bg=url;document.body.style.setProperty('--preview-bg',`url("${url}")`);document.body.classList.add('preview-background')}
   else{if(logo)URL.revokeObjectURL(logo);logo=url;document.body.style.setProperty('--preview-logo',`url("${url}")`);document.body.classList.add('preview-logo')}
   status('Алдын ала көрүнүш жаңырды. Серверге сакталган жок.','Предпросмотр обновлён. На сервер не сохранено.');
 }
 $('previewBackground').addEventListener('change',e=>setImage(e.target,'bg'));
 $('previewLogo').addEventListener('change',e=>setImage(e.target,'logo'));
 $('resetDesignPreview').addEventListener('click',()=>{if(!authorized)return;clearPreview();status('Баштапкы дизайн калыбына келди.','Исходное оформление восстановлено.')});
})();
