import React, { useMemo, useState } from 'react';

const wedding = {
  groom: {
    name: '이세진',
    father: '이동화',
    mother: '강미옥',
    account: '국민은행 / 054901-04-163688 / 이세진',
    phone: '010-2702-2346',
  },
  bride: {
    name: '김보라',
    father: '김범석',
    mother: '이광순',
    account: '국민은행 / 699202-01-253065 / 김보라',
    phone: '010-8893-8243',
  },
  dateText: '2026년 9월 12일 토요일 오후 3시',
  dateShort: '2026.09.12 SAT 3:00 PM',
  venue: '웨딩시그니처',
  addressRoad: '서울 마포구 양화로 87',
  addressJibun: '서울 마포구 서교동 378-7',
  naverMapUrl: 'https://naver.me/xFLuQhhM',
  tmapUrl: 'https://tmap.life/2e5cb536',
  kakaoMapUrl: 'https://kko.to/1CEYqTTP3L',
};

const imageBasePath = '/images/';
const weddingDate = new Date(2026, 8, 12, 15, 0, 0);

const photos = [
  imageBasePath + 'LYW01152-2.jpg',
  imageBasePath + 'LYW01413-2.jpg',
  imageBasePath + 'LYW01418-1.jpg',
  imageBasePath + 'LYW01483-1.jpg',
  imageBasePath + 'LYW01453-1.jpg',
  imageBasePath + 'LYW01531-1.jpg',
  imageBasePath + 'LYW01560-2.jpg',
  imageBasePath + 'LYW01608-2.jpg',
  imageBasePath + 'LYW01620-2.jpg',
  imageBasePath + 'LYW01796-1.jpg',
  imageBasePath + 'LYW01897-2.jpg',
  imageBasePath + 'LYW01959-2.jpg',
  imageBasePath + 'LYW02064-2.jpg',
];

const iconPath = {
  heart: 'M12 21s-7.5-4.7-9.3-9.4C1.2 7.8 3.8 4.5 7.3 4.5c2 0 3.3 1.1 4.7 2.7 1.4-1.6 2.7-2.7 4.7-2.7 3.5 0 6.1 3.3 4.6 7.1C19.5 16.3 12 21 12 21z',
  calendar: 'M7 2v3M17 2v3M4 8h16M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  map: 'M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  copy: 'M9 9h10v10H9z M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  up: 'M6 15l6-6 6 6',
  down: 'M6 9l6 6 6-6',
  navigation: 'M12 2l7 19-7-4-7 4 7-19z',
  share: 'M18 8a3 3 0 1 0-2.8-4M6 13a3 3 0 1 0 0-2M18 16a3 3 0 1 0-2.8 4M8.7 12.2l6.6 3.6M15.3 8.2L8.7 11.8',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z',
  image: 'M4 5h16v14H4z M8 13l2.5-3 3.5 4.5 2-2.5 4 5M8.5 8.5h.01',
};

function calculateDday(targetDate, baseDate) {
  const target = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const base = baseDate instanceof Date ? baseDate : new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.ceil((target.getTime() - base.getTime()) / oneDay);
}

function getLiveDdayText(dDay) {
  if (dDay > 0) return '저희의 첫 페이지까지 D-' + dDay;
  if (dDay === 0) return '오늘, 저희가 결혼합니다';
  return '함께해 주셔서 감사합니다';
}

function getShareData(currentUrl) {
  const url = currentUrl || (typeof window === 'undefined' ? '' : window.location.href);

  return {
    title: wedding.groom.name + ' & ' + wedding.bride.name + '의 결혼식에 초대합니다',
    text: wedding.dateText + ', ' + wedding.venue,
    url,
  };
}

function isValidPhoneNumber(phone) {
  return /^010-\d{4}-\d{4}$/.test(phone);
}

function isValidAccountText(account) {
  return account.indexOf('국민은행') > -1 && /\d{6}-\d{2}-\d{6}/.test(account);
}

function runSmokeTests() {
  if (typeof console === 'undefined') return;

  const sameDay = calculateDday(weddingDate, new Date(2026, 8, 12, 0, 0, 0));
  console.assert(sameDay === 1, 'calculateDday should count partial remaining wedding day as D-1');

  const dayBefore = calculateDday(weddingDate, new Date(2026, 8, 11, 15, 0, 0));
  console.assert(dayBefore === 1, 'calculateDday should return 1 exactly one day before');

  const afterWedding = calculateDday(weddingDate, new Date(2026, 8, 13, 15, 0, 0));
  console.assert(afterWedding === -1, 'calculateDday should return a negative number after the wedding');

  console.assert(getLiveDdayText(10) === '저희의 첫 페이지까지 D-10', 'live D-Day text should show remaining days');
  console.assert(getLiveDdayText(0) === '오늘, 저희가 결혼합니다', 'live D-Day text should handle wedding day');
  console.assert(getLiveDdayText(-1) === '함께해 주셔서 감사합니다', 'live D-Day text should handle past wedding day');

  const shareData = getShareData('https://example.com');
  console.assert(shareData.title.indexOf('이세진') > -1 && shareData.title.indexOf('김보라') > -1, 'share title should include bride and groom names');
  console.assert(shareData.text.indexOf('웨딩시그니처') > -1, 'share text should include venue');
  console.assert(shareData.url === 'https://example.com', 'share url should use explicit currentUrl when provided');
  console.assert(photos.length >= 9, 'gallery should include enough photos for the layout');
  console.assert(isValidPhoneNumber(wedding.groom.phone), 'groom phone should use 010-0000-0000 format');
  console.assert(isValidPhoneNumber(wedding.bride.phone), 'bride phone should use 010-0000-0000 format');
  console.assert(isValidAccountText(wedding.groom.account), 'groom account should include bank and account number');
  console.assert(isValidAccountText(wedding.bride.account), 'bride account should include bank and account number');
  console.assert(wedding.tmapUrl.indexOf('https://tmap.life/') === 0, 'TMAP url should be configured');
  console.assert(wedding.kakaoMapUrl.indexOf('https://kko.to/') === 0, 'Kakao map url should be configured');
}

runSmokeTests();

function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={name === 'heart' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={iconPath[name]} />
    </svg>
  );
}

function WeddingImage({ src, alt, className, onClick }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={className + ' flex items-center justify-center bg-stone-100 text-center text-xs leading-6 text-stone-400'}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
      >
        <span>
          사진을 불러오지 못했어요
          <br />
          public/images 폴더와 파일명을 확인해 주세요
        </span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onClick={onClick} onError={() => setFailed(true)} />;
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mb-8 text-center">
      <p className="mb-3 text-[11px] tracking-[0.35em] text-stone-400 uppercase">{eyebrow}</p>
      <h2 className="font-serif text-2xl text-stone-800">{title}</h2>
      {children ? <p className="mx-auto mt-4 max-w-[280px] text-sm leading-7 text-stone-500">{children}</p> : null}
    </div>
  );
}

function CopyButton({ text, label = '복사하기' }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard) throw new Error('Clipboard API is unavailable');
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      if (typeof alert !== 'undefined') alert('복사에 실패했어요. 직접 선택해서 복사해 주세요.');
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs text-stone-600 shadow-sm transition active:scale-[0.98]"
    >
      <Icon name="copy" size={14} />
      {copied ? '복사 완료' : label}
    </button>
  );
}

function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, function (_, index) {
        return {
          id: index,
          left: Math.random() * 120 - 10,
          drift: 120 + Math.random() * 110,
          delay: Math.random() * -24,
          duration: 22,
          scale: 0.55 + Math.random() * 0.28,
          opacity: 0.38 + Math.random() * 0.22,
          rotate: Math.random() * 360,
          blur: Math.random() * 0.6,
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[20] overflow-hidden">
      {petals.map((petal) => {
        const petalStyle = {
          left: petal.left + '%',
          opacity: 0,
          animationDelay: petal.delay + 's',
          animationDuration: petal.duration + 's',
          filter: 'blur(' + petal.blur * 0.45 + 'px)',
          ['--drift-x']: petal.drift + 'px',
          ['--petal-rotate']: petal.rotate + 'deg',
          ['--petal-scale']: petal.scale,
          ['--petal-opacity']: petal.opacity,
        };

        return (
          <span
            key={'petal-' + petal.id}
            className="absolute top-[-12vh] animate-petal"
            style={petalStyle}
          >
            <span className="relative block h-[15px] w-[10px] rounded-[100%_0_100%_0] bg-gradient-to-br from-[#fffdfd] via-[#ffddea] to-[#ffadc9] shadow-[0_0_12px_rgba(255,190,212,0.45)] before:absolute before:left-[1px] before:top-[1px] before:h-[7px] before:w-[4px] before:rounded-full before:bg-white/75 before:content-['']" />
          </span>
        );
      })}
    </div>
  );
}

function GalleryModal({ selectedImage, onClose }) {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
      >
        닫기
      </button>

      <img
        src={selectedImage}
        alt="selected wedding"
        className="max-h-[90vh] w-full max-w-[520px] rounded-3xl object-cover"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

function AccountCard({ title, person }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="text-xs tracking-[0.22em] text-stone-400">{title}</p>
          <p className="mt-1 font-serif text-xl text-stone-800">{person.name}</p>
        </div>
        <Icon name={open ? 'up' : 'down'} size={18} />
      </button>

      {open ? (
        <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
          <p className="leading-7">{person.account}</p>
          <div className="mt-4 flex justify-end">
            <CopyButton text={person.account} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function WeddingInvitation() {
  const dDay = useMemo(() => calculateDday(weddingDate), []);
  const liveDdayText = useMemo(() => getLiveDdayText(dDay), [dDay]);
  const [selectedImage, setSelectedImage] = useState(null);

  const shareInvitation = async () => {
    const shareData = getShareData();

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (typeof navigator === 'undefined' || !navigator.clipboard) throw new Error('Clipboard API is unavailable');
      await navigator.clipboard.writeText(window.location.href);
      if (typeof alert !== 'undefined') alert('청첩장 링크를 복사했어요.');
    } catch (error) {
      if (typeof alert !== 'undefined') alert('공유에 실패했어요. 주소창의 링크를 직접 복사해 주세요.');
    }
  };

  const styles = '@keyframes petal-fall { 0% { transform: translate3d(-3vw, -14vh, 0) rotate(var(--petal-rotate)) scale(var(--petal-scale)); opacity: 0; } 10% { opacity: var(--petal-opacity); } 25% { transform: translate3d(calc(var(--drift-x) * 0.22), 24vh, 0) rotate(calc(var(--petal-rotate) + 70deg)) scale(calc(var(--petal-scale) * 1.02)); opacity: var(--petal-opacity); } 50% { transform: translate3d(calc(var(--drift-x) * 0.48), 52vh, 0) rotate(calc(var(--petal-rotate) + 160deg)) scale(var(--petal-scale)); opacity: calc(var(--petal-opacity) * 0.96); } 75% { transform: translate3d(calc(var(--drift-x) * 0.72), 82vh, 0) rotate(calc(var(--petal-rotate) + 240deg)) scale(calc(var(--petal-scale) * 0.98)); opacity: calc(var(--petal-opacity) * 0.88); } 100% { transform: translate3d(var(--drift-x), 118vh, 0) rotate(calc(var(--petal-rotate) + 320deg)) scale(calc(var(--petal-scale) * 0.94)); opacity: 0; } } @keyframes fade-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } } .animate-petal { animation-name: petal-fall; animation-timing-function: linear; animation-iteration-count: infinite; animation-fill-mode: both; will-change: transform, opacity; } .fade-up { animation: fade-up 0.9s ease forwards; }';

  return (
    <>
      <style>{styles}</style>

      <main className="relative min-h-screen bg-[#fbf8f2] text-stone-700">
        <FloatingPetals />
        <section className="relative mx-auto min-h-screen max-w-[430px] overflow-hidden bg-[#f7f0e8]">
          <WeddingImage
            src={imageBasePath + 'LYW01405-2.jpg'}
            alt="wedding main"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/15 via-black/5 to-[#1f1a17]/55" />
          <div className="relative z-10 flex min-h-screen flex-col justify-between px-7 py-10 text-white fade-up">
            <div className="text-center">
              <p className="text-[11px] tracking-[0.45em] opacity-90">WEDDING INVITATION</p>
            </div>

            <div className="pb-8 text-center drop-shadow-sm">
              <p className="mb-5 font-serif text-[15px] italic opacity-90">We are getting married</p>
              <h1 className="font-serif text-5xl leading-tight">
                {wedding.groom.name}
                <span className="mx-3 text-3xl">&</span>
                {wedding.bride.name}
              </h1>
              <div className="mx-auto my-7 h-px w-16 bg-white/70" />
              <p className="text-sm tracking-[0.2em]">{wedding.dateShort}</p>
              <p className="mt-2 text-sm">{wedding.venue}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[430px] bg-[#fbf8f2] px-7 py-16 text-center">
          <Icon name="heart" className="mx-auto mb-6 text-rose-300" size={26} />
          <p className="font-serif text-2xl leading-[1.75] text-stone-800">
            서로의 계절이 되어준 두 사람이
            <br />
            이제 같은 방향을 바라보며
            <br />
            한 걸음을 내딛습니다.
          </p>
          <p className="mt-8 text-[15px] leading-8 text-stone-600">
            소중한 분들을 모시고 저희의 시작을 약속하려 합니다.
            <br />
            바쁘시더라도 함께 자리하시어
            <br />
            따뜻한 축복으로 지켜봐 주시면 감사하겠습니다.
          </p>
          <div className="mt-10 rounded-[2rem] border border-stone-200 bg-white/70 p-6 text-sm leading-8 shadow-sm">
            <p>
              <span className="text-stone-500">{wedding.groom.father} / {wedding.groom.mother}</span>의 아들 <strong>{wedding.groom.name}</strong>
            </p>
            <p>
              <span className="text-stone-500">{wedding.bride.father} / {wedding.bride.mother}</span>의 딸 <strong>{wedding.bride.name}</strong>
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[430px] bg-white px-7 py-16">
          <SectionTitle eyebrow="date" title="예식 안내" />
          <div className="rounded-[2rem] bg-[#f8f4ee] p-7 text-center shadow-sm fade-up">
            <Icon name="calendar" className="mx-auto mb-4 text-stone-500" size={26} />
            <p className="font-serif text-2xl text-stone-800">2026. 09. 12</p>
            <p className="mt-2 text-sm text-stone-500">토요일 오후 3시</p>
            <div className="mx-auto my-6 h-px w-12 bg-stone-300" />
            <p className="text-sm text-stone-500">결혼식까지</p>
            <p className="mt-1 font-serif text-3xl text-stone-800">D-{dDay}</p>
            <p className="mt-3 text-sm tracking-[0.08em] text-stone-500">{liveDdayText}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[430px] bg-[#fbf8f2] px-5 py-16">
          <SectionTitle eyebrow="gallery" title="우리의 순간" />
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedImage(imageBasePath + 'LYW01152-2.jpg')}
              className="col-span-2 overflow-hidden rounded-[2rem]"
            >
              <WeddingImage
                src={imageBasePath + 'LYW01152-2.jpg'}
                alt="gallery main"
                className="h-64 w-full object-cover shadow-sm transition duration-300 active:scale-[0.98]"
              />
            </button>

            {photos.slice(1, 9).map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedImage(src)}
                className="overflow-hidden rounded-3xl"
              >
                <WeddingImage
                  src={src}
                  alt={'gallery ' + String(index + 1)}
                  className="aspect-[3/4] w-full object-cover shadow-sm transition duration-300 active:scale-[0.98]"
                />
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[430px] bg-white px-7 py-16">
          <SectionTitle eyebrow="location" title="오시는 길">
            귀한 걸음 편히 오실 수 있도록 예식장 위치를 안내드립니다.
          </SectionTitle>

          <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#f8f4ee] shadow-sm">
            <div className="flex h-48 items-center justify-center bg-stone-100">
              <div className="text-center text-stone-400">
                <Icon name="map" className="mx-auto mb-2" size={24} />
                <p className="text-sm">지도 영역</p>
                <p className="mt-1 text-xs">카카오맵 퍼가기 영역으로 교체 가능</p>
              </div>
            </div>

            <div className="p-6">
              <p className="font-serif text-2xl text-stone-800">{wedding.venue}</p>
              <p className="mt-3 text-sm leading-7 text-stone-600">도로명 : {wedding.addressRoad}</p>
              <p className="text-sm leading-7 text-stone-500">지번 : {wedding.addressJibun}</p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <a
                  href={wedding.naverMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-full bg-[#03C75A] px-3 py-3 text-[11px] font-semibold text-white"
                >
                  <Icon name="navigation" size={14} />
                  네이버
                </a>

                <a
                  href={wedding.tmapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-3 py-3 text-[11px] font-medium text-white"
                >
                  TMAP
                </a>

                <a
                  href={wedding.kakaoMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#FEE500] px-3 py-3 text-[11px] font-semibold text-black"
                >
                  카카오맵
                </a>
              </div>

              <div className="mt-3 flex justify-end">
                <CopyButton text={wedding.addressRoad} label="주소 복사" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[430px] bg-white px-7 py-16">
          <SectionTitle eyebrow="contact" title="연락하기" />
          <div className="grid grid-cols-2 gap-3">
            <a href={'tel:' + wedding.groom.phone} className="rounded-3xl border border-stone-200 p-5 text-center text-sm shadow-sm">
              <Icon name="phone" className="mx-auto mb-3 text-stone-500" size={20} />
              신랑에게 연락
            </a>
            <a href={'tel:' + wedding.bride.phone} className="rounded-3xl border border-stone-200 p-5 text-center text-sm shadow-sm">
              <Icon name="phone" className="mx-auto mb-3 text-stone-500" size={20} />
              신부에게 연락
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-[430px] bg-[#fbf8f2] px-7 py-16">
          <SectionTitle eyebrow="account" title="마음 전하실 곳">
            참석이 어려우신 분들을 위해 계좌 정보를 안내드립니다.
          </SectionTitle>
          <div className="space-y-4">
            <AccountCard title="신랑측" person={wedding.groom} />
            <AccountCard title="신부측" person={wedding.bride} />
          </div>
        </section>

        <section className="mx-auto max-w-[430px] bg-[#2f2925] px-7 py-16 text-center text-white">
          <Icon name="image" className="mx-auto mb-5 text-white/70" size={24} />
          <p className="font-serif text-3xl leading-snug">
            {wedding.groom.name} & {wedding.bride.name}
          </p>
          <p className="mt-4 text-sm leading-7 text-white/70">저희의 시작을 함께 축복해 주세요.</p>
          <button
            type="button"
            onClick={shareInvitation}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm text-stone-800"
          >
            <Icon name="share" size={15} />
            청첩장 공유하기
          </button>
        </section>

        <GalleryModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </main>
    </>
  );
}