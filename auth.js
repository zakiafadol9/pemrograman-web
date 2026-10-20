(function(S){'use strict';
 const visible={admin:['*'],pimpinan:['dashboard','masuk','keluar','disposisi','persetujuan','agenda','arsip','laporan','notifikasi','profil'],tu:['dashboard','masuk','keluar','disposisi','agenda','arsip','templates','klasifikasi','kontak','laporan','notifikasi','profil'],staf:['dashboard','keluar','disposisi','templates','notifikasi','profil'],arsip:['dashboard','masuk','agenda','arsip','klasifikasi','laporan','notifikasi','profil']};
 S.auth={
  load(){let id;try{id=sessionStorage.getItem('sismara_user')}catch(e){} S.user=S.data.users.find(u=>u.id===id&&u.active)||null;},
  login(email,password){const user=S.data.users.find(u=>u.active&&u.email.toLowerCase()===String(email).trim().toLowerCase()&&u.password===password);if(!user)return false;try{sessionStorage.setItem('sismara_user',user.id)}catch(e){}S.user=user;S.log('Login','Autentikasi',user.id,'Pengguna masuk ke prototipe');S.navigate('dashboard');return true;},
  logout(){if(S.user)S.log('Logout','Autentikasi',S.user.id,'Pengguna keluar dari sesi');try{sessionStorage.removeItem('sismara_user')}catch(e){}S.user=null;S.render();},
  canPage(page){return !!(S.user&&(visible[S.user.role]?.includes('*')||visible[S.user.role]?.includes(page)));},
  is(...roles){return !!S.user&&roles.includes(S.user.role);},
  can(action,record){const role=S.user?.role;if(role==='admin')return true;
   if(action==='incoming-edit'||action==='incoming-add'||action==='incoming-archive')return role==='tu';
   if(action==='incoming-delete')return false;
   if(action==='outgoing-add')return ['tu','staf'].includes(role);
   if(action==='outgoing-edit')return ['tu','staf'].includes(role)&&!!record&&['Draft','Revisi'].includes(record.status)&&(role==='tu'||record.authorId===S.user.id);
   if(action==='outgoing-submit')return ['tu','staf'].includes(role)&&!!record&&['Draft','Revisi'].includes(record.status)&&(role==='tu'||record.authorId===S.user.id);
   if(action==='outgoing-send')return role==='tu'&&record?.status==='Disetujui';
   if(action==='outgoing-archive')return role==='tu'&&record?.status==='Dikirim';
   if(action==='approve')return role==='pimpinan';
   if(action==='disposition-add')return ['pimpinan','tu'].includes(role);
   if(action==='disposition-update')return record?.toId===S.user.id;
   if(action==='archive-manage')return ['tu','arsip'].includes(role);
   if(action==='classification-manage')return ['tu','arsip'].includes(role);
   if(action==='contact-manage'||action==='template-manage')return role==='tu';
   if(action==='settings')return false;
   if(action==='users')return false;
   return false;},
  canSeeIncoming(l){return S.user&&(S.user.role==='admin'||(l.priority!=='Rahasia'&&['tu','pimpinan','arsip'].includes(S.user.role))||(l.priority==='Rahasia'&&S.user.role==='pimpinan'));},
  canSeeOutgoing(l){return S.user&&(S.user.role==='admin'||S.user.role==='tu'||S.user.role==='pimpinan'||(S.user.role==='staf'&&l.authorId===S.user.id));},
  canSeeDisposition(d){return S.user&&(['admin','pimpinan','tu'].includes(S.user.role)||d.toId===S.user.id);}
 };
})(window.SISMARA);
