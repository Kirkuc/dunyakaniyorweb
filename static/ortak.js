/* dünyakanıyor.com — ortak üst/alt kısım ve sohbet kutusu (taslak, sunucusuz)
   Not: Gerçek sitede üyelik, konu ve mesajlar bir sunucuda (örn. phpBB, MyBB, Flarum
   veya kendi backend'iniz) tutulacak. Bu dosya sadece görünümü canlandırmak içindir. */

function ustKisim(aktif) {
  var menu = [
    ["/", "Forum Ana Sayfa", "forum"],
    ["/lore", "Lore Ansiklopedisi", "lore"],
    ["/sohbet", "Sohbet Odası", "sohbet"],
    ["/bolumler", "Bölümler", "bolumler"],
    ["/uyeler", "Üye Listesi", "uyeler"],
    ["#", "Kurallar", "kurallar"],
    ["#", "Ara", "ara"]
  ];
  var h = '';
  h += '<div class="banner">';
  h += '  <div class="drip"></div>';
  h += '  <div class="logo">DÜNYA<span>KANIYOR</span></div>';
  h += '  <div class="slogan">~ Resmi dizi evreni forumu &amp; lore arşivi ~ Est. 2026</div>';
  h += '  <div class="userbox">Kullanıcı: <input type="text" value="Misafir"> Şifre: <input type="password"> ';
  h += '  <input type="button" value="Giriş" onclick="alert(\'Taslak sürüm: üyelik sistemi henüz bağlı değil.\')"> <a href="#">Kayıt Ol</a></div>';
  h += '</div>';
  h += '<div class="navbar"><table><tr>';
  for (var i = 0; i < menu.length; i++) {
    h += '<td' + (menu[i][2] === aktif ? ' class="aktif"' : '') + '><a href="' + menu[i][0] + '">' + menu[i][1] + '</a></td>';
  }
  h += '</tr></table></div>';
  h += '<div class="duyuru"><marquee scrollamount="4">&raquo; DUYURU: Sezon 1 / Bölüm 6 &quot;Yarık Açıldığında&quot; bu cuma 20:00\'de YouTube kanalımızda! &nbsp;&nbsp;&nbsp; &raquo; Lore ansiklopedisine katkı yapmak isteyen üyeler Yazar rütbesi için başvurabilir. &nbsp;&nbsp;&nbsp; &raquo; Spoiler kurallarına uymayan mesajlar uyarısız silinir!</marquee></div>';
  document.write(h);
}

function altKisim() {
  var h = '';
  h += '<div class="footer">';
  h += 'Tüm saatler GMT +3. Şu an saat <b>' + saatYaz(new Date()) + '</b>.<br>';
  h += 'dünyakanıyor.com &copy; 2026 &mdash; Dünya Kanıyor bir YouTube dizisidir. Tüm karakterler ve olaylar kurgudur.<br>';
  h += 'Site en iyi 1024x768 çözünürlükte ve Internet Explorer 6 ile görüntülenir. ;)<br><br>';
  h += 'Ziyaretçi sayacı: <span class="sayac">0013666</span>';
  h += '<div class="rozetler"><span class="rozet r1">DÜNYA KANIYOR</span><span class="rozet r2">VALID HTML 4.01</span><span class="rozet r3">YouTube KANALI</span><span class="rozet r4">SPOILER YOK!</span></div>';
  h += '</div>';
  document.write(h);
}

function saatYaz(d) {
  function iki(n) { return (n < 10 ? "0" : "") + n; }
  return iki(d.getHours()) + ":" + iki(d.getMinutes());
}

/* ---------------- SOHBET KUTUSU (shoutbox) ---------------- */
var ornekMesajlar = [
  ["19:02", "Kızıl_Mühürcü", "u-admin", "Herkese iyi akşamlar, bölüm 6 fragmanı ana sayfada!"],
  ["19:04", "yarikcocugu_34", "u-uye", "fragmandaki ses Kaan'ın ağabeyi değil mi yaa"],
  ["19:05", "Ademin_Kulu", "u-uye", "bence değil, ses efekti farklı bi de çatlak sesi var arkada"],
  ["19:07", "KülHatun", "u-mod", "spoiler konuşacaksanız ilgili konuya lütfen arkadaşlar :)"],
  ["19:09", "sessiz_tanık", "u-uye", "lore ansiklopedisine Demir Konsey maddesi eklenmiş, okuyun"],
  ["19:11", "Arşivci_Nur", "u-yazar", "evet ekledim, eksik gördüğünüz yeri yazın düzeltirim"],
  ["19:14", "yarikcocugu_34", "u-uye", "harika olmuş eline sağlık"],
  ["19:16", "Kan_Ozu", "u-uye", "Kızıl Yağmur'un tarihi 3. bölümde 17 yıl önce diyordu, ansiklopedide 18 yazıyor??"],
  ["19:17", "Arşivci_Nur", "u-yazar", "@Kan_Ozu takvim farkı var, maddede dipnot olarak açıkladım"]
];

function sohbetKutusu(id) {
  var kutu = document.getElementById(id);
  if (!kutu) return;
  var liste = [];
  try {
    var kayit = localStorage.getItem("dk_sohbet");
    if (kayit) liste = JSON.parse(kayit);
  } catch (e) {}
  var hepsi = ornekMesajlar.concat(liste);
  kutu.innerHTML = "";
  for (var i = 0; i < hepsi.length; i++) satirEkle(kutu, hepsi[i]);
  kutu.scrollTop = kutu.scrollHeight;
}

function satirEkle(kutu, m) {
  var d = document.createElement("div");
  d.innerHTML = '<span class="zaman">[' + m[0] + ']</span> <a href="/uyeler" class="' + m[2] + '">' + kacis(m[1]) + '</a>: ' + kacis(m[3]);
  kutu.appendChild(d);
}

function kacis(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sohbetGonder(kutuId, nickId, mesajId) {
  var kutu = document.getElementById(kutuId);
  var nick = document.getElementById(nickId).value.trim() || "Misafir";
  var alan = document.getElementById(mesajId);
  var metin = alan.value.trim();
  if (!metin) return false;
  var m = [saatYaz(new Date()), nick, "u-uye", metin];
  satirEkle(kutu, m);
  kutu.scrollTop = kutu.scrollHeight;
  alan.value = "";
  try {
    var liste = JSON.parse(localStorage.getItem("dk_sohbet") || "[]");
    liste.push(m);
    localStorage.setItem("dk_sohbet", JSON.stringify(liste.slice(-50)));
  } catch (e) {}
  return false;
}

function sohbetTemizle(kutuId) {
  try { localStorage.removeItem("dk_sohbet"); } catch (e) {}
  sohbetKutusu(kutuId);
}
