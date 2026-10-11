const nav=document.querySelector('[data-nav]');
const toggle=document.querySelector('[data-menu]');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
const form=document.querySelector('[data-demo-form]');
const query=new URLSearchParams(location.search);
for(const key of ['service','industry']){
  const select=form?.elements.namedItem(key);
  const value=query.get(key);
  if(select&&value&&[...select.options].some(option=>option.value===value))select.value=value;
}
form?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const result=document.querySelector('[data-result]');
  result.hidden=false;
  result.textContent='Demo only: this proposal request was checked in your browser. No details or files were sent, saved, or reviewed. A real project needs a client-approved secure intake and routing setup.';
  result.focus();
});
const files=document.querySelector('[data-files]');
files?.addEventListener('change',()=>{
  const note=document.querySelector('[data-file-note]');
  const selected=[...files.files];
  const okay=selected.length<=3&&selected.every(file=>file.size<=5*1024*1024&&/\.(pdf|png|jpe?g)$/i.test(file.name));
  files.setCustomValidity(okay?'':'Choose up to three PDF, PNG, or JPG files under 5 MB each.');
  note.textContent=selected.length?(okay?`${selected.length} local file${selected.length===1?'':'s'} selected. Nothing will upload.`:'Files exceed the demo limits. Nothing was uploaded.'):'Optional. Demo selection stays in your browser; nothing uploads.';
});
