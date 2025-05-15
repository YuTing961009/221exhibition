let isAutoScrolling = false;
let autoScrollProgress = 0;

const wrapper = document.querySelector('.image-wrapper');
const floatingText = document.querySelector('.floating-text');
const image = wrapper.querySelector('img');

window.addEventListener('scroll', () => {
  if (isAutoScrolling) return;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const wrapperTop = wrapper.offsetTop;
  const wrapperHeight = wrapper.offsetHeight;

  // ✅ 文字浮現邏輯
  const fadeStart = wrapperTop + wrapperHeight * 0.3 - windowHeight / 2;
  const fadeEnd = wrapperTop + wrapperHeight * 0.6 - windowHeight / 2;

  if (scrollY >= fadeStart && scrollY <= fadeEnd) {
    const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    floatingText.style.opacity = progress;
  } else if (scrollY < fadeStart) {
    floatingText.style.opacity = 0;
  } else {
    floatingText.style.opacity = 1;
  }

  // ✅ 滾動到圖片 1/2 進入畫面時，觸發自動滑到底
  const triggerPoint = wrapperTop + wrapperHeight / 2 - windowHeight / 2;
  if (Math.abs(scrollY - triggerPoint) < 5) {
    startAutoScroll();
  }
});

function startAutoScroll() {
  if (isAutoScrolling) return;

  isAutoScrolling = true;
  document.body.style.overflow = 'hidden';

  const docHeight = document.body.scrollHeight - window.innerHeight;
  autoScrollProgress = window.scrollY;

  const autoScroll = setInterval(() => {
    autoScrollProgress += 2;

    if (autoScrollProgress >= docHeight) {
      autoScrollProgress = docHeight;
      clearInterval(autoScroll);
      isAutoScrolling = false;
      document.body.style.overflow = '';
    }

    window.scrollTo(0, autoScrollProgress);
  }, 16);
}

// ✅ 進入頁面時回頂部
window.onbeforeunload = () => window.scrollTo(0, 0);

// ✅ 修正圖片下方白邊問題：確保圖片高度大於視窗+滾動區
window.addEventListener('load', () => {
  const neededHeight = window.innerHeight * 2; // 預留滑動空間
  if (wrapper.offsetHeight < neededHeight) {
    image.style.height = 'auto';
    image.style.minHeight = `${neededHeight}px`; // 保證圖片足夠長
  }
});
