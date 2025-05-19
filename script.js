// script.js
document.addEventListener('DOMContentLoaded', () => {
  const frame = document.querySelector('.device-frame');
  const scrollContainer = frame || window;

  // Rainbow & Title 淡入
  const rainbow = document.getElementById('rainbow-img');
  const title   = document.getElementById('title-img');
  setTimeout(() => rainbow.classList.add('active'), 200);
  setTimeout(() => title.classList.add('active'), 500);

  // Spotlight 當 marker 滾到框頂時顯示
  const marker     = document.getElementById('mid-marker');
  const spotlights = [
    document.getElementById('spotlight-l-img'),
    document.getElementById('spotlight-r-img')
  ];
  function toggleSpotlights() {
    const markerRect = marker.getBoundingClientRect();
    const frameTop   = frame
      ? frame.getBoundingClientRect().top
      : 0;
    if (markerRect.top <= frameTop) {
      spotlights.forEach((img, i) => {
        setTimeout(() => img.classList.add('active'), i * 100);
      });
    }
  }
  scrollContainer.addEventListener('scroll', toggleSpotlights);
  toggleSpotlights();

  // 前言標題 & 內容 IntersectionObserver
  const observerOpts = { root: frame || null, threshold: 0.1 };
  const prefaces = [
    document.getElementById('preface-title'),
    document.getElementById('preface-content')
  ];
  const prefaceObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOpts);
  prefaces.forEach(el => prefaceObserver.observe(el));

  // 段落逐行淡入 + 按鈕顯示
  const prefaceContent = document.getElementById('preface-content');
  const button         = document.getElementById('preface-button');
  const contentObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(prefaceContent);
        const paras = Array.from(prefaceContent.querySelectorAll('p'));
        paras.forEach((p, i) => {
          setTimeout(() => p.classList.add('show'), i * 600);
        });
        setTimeout(() => button.classList.add('active'),
          paras.length * 600 + 300);
      }
    });
  }, observerOpts);
  contentObserver.observe(prefaceContent);
});