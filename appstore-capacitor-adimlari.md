# BOXER PRO — App Store'a Çıkış: Capacitor Adım Adım

> Bu, web uygulamamızı (index.html + dosyalar) native bir iOS uygulamasına saran yoldur.
> **Gereken:** bir Mac, Xcode (App Store'dan ücretsiz), Node.js, ve Apple Developer üyeliği (99 USD/yıl).
> Komutları Terminal'de sırayla çalıştır. Takıldığın adımı bana söyle, çözelim.

---

## 0) Ön koşullar (bir kez)
1. **Xcode** kur (Mac App Store → Xcode).
2. **Node.js** kur → https://nodejs.org (LTS sürümü).
3. Xcode'u bir kez aç, "Command Line Tools" kurulumunu onayla.

## 1) Proje klasörünü hazırla
Web dosyalarını (index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, apple-touch-icon.png) bir klasöre koy. Terminalde o klasörün üstünde:

```bash
mkdir boxerpro-app && cd boxerpro-app
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios
```

## 2) Web dosyalarını "www" içine al
```bash
mkdir www
# index.html ve diğer 5 dosyayı www/ içine kopyala
# (Finder'dan sürükleyip www klasörüne bırakabilirsin)
```

## 3) Capacitor'ı başlat
```bash
npx cap init "BOXER PRO" com.SENINADIN.boxerpro --web-dir=www
```
> `com.SENINADIN.boxerpro` → benzersiz bir bundle ID olmalı (ör. `com.mertyilmaz.boxerpro`). Küçük harf, boşluksuz.

## 4) iOS platformunu ekle
```bash
npx cap add ios
npx cap sync
npx cap open ios
```
Son komut **Xcode**'u açar.

## 5) Xcode'da ayarlar
- Sol üstte proje → **Signing & Capabilities** → **Team**: Apple Developer hesabını seç (baban onayladıysa onun hesabı).
- **Display Name**: BOXER PRO
- **Bundle Identifier**: 3. adımdaki ID ile aynı.
- **App Icon**: `appstore-icon-1024.png` dosyasını icon set'e ekle (Assets → AppIcon). Xcode diğer boyutları isteyebilir; 1024'ü koymak çoğu şablonda yeterli, gerekiyorsa sana tüm boyutları üretirim.
- **Deployment Info**: iPhone, Portrait (dikey) seçili olsun.

## 6) Kendi telefonunda test et
- iPhone'u kabloyla bağla, Xcode'da cihazı seç, **Run (▶)** ile telefonuna kur ve dene.

## 7) App Store Connect'te uygulama oluştur
- https://appstoreconnect.apple.com → **Apps → +** → yeni uygulama.
- Bundle ID'yi seç, adı gir.
- Doldur: açıklama, anahtar kelimeler, kategori (Health & Fitness), yaş (4+), **Privacy Policy URL** (privacy sayfanın linki), destek e-postası.
- **Ekran görüntüleri**: gerçek cihaz/simülatörden birkaç ekran çek (6.7" ve 6.5" iPhone boyutları istenir). İstersen bunları hazırlamana yardım ederim.

## 8) Build'i yükle ve gönder
- Xcode → **Product → Archive** → **Distribute App → App Store Connect → Upload**.
- App Store Connect'te build görün<ünce sürüme ekle → **Submit for Review**.
- Apple inceler (**1-3 gün** civarı). Red gelirse sebebini düzeltip tekrar gönderirsin (normaldir).

---

## Sık takılınan noktalar
- **"Signing" hatası:** Team seçili değil ya da Apple Developer üyeliği aktif değil.
- **Beyaz ekran:** www içinde index.html eksik ya da dosya adları yanlış; `npx cap sync` tekrar çalıştır.
- **İkon reddi:** 1024×1024, şeffaflık YOK, köşe yuvarlama YOK (Apple kendi yuvarlar). Bizim `appstore-icon-1024.png` buna uygun.
- **Gizlilik reddi:** Privacy Policy URL'si çalışır olmalı.

Her adımda ekran görüntüsü atarsan tam olarak nerede olduğunu söyler, ilerletirim.
