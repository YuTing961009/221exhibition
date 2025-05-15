const scene = document.querySelector('.scene');
const cube = document.querySelector('.cube');
const faces = document.querySelectorAll('.face');
const popup = document.getElementById('popup');
const popupContent = popup.querySelector('.popup-content');
const cover = document.querySelector('.cover');

let isMoved = false;
let isDragging = false;
let dragMoved = false;
let longPressTimeout;
let startX = 0;
let startY = 0;
let rotateX = 0;
let rotateY = 0;

// 資料
const popupTitles = ['化學', '物理', '生物', '數學', '生科', '資科'];
const popupMessages = [
  '歡迎來到化學展區！🧪',
  '歡迎來到物理展區！⚡',
  '歡迎來到生物展區！🌱',
  '歡迎來到數學展區！➗',
  '歡迎來到生科展區！🧬',
  '歡迎來到資科展區！💻'
];
const popupColors = ['brown', 'blue', 'green', 'yellow', 'red', 'black'];

// 自動旋轉
let autoRotate = true;
function animate() {
  if (autoRotate && !isDragging) {
    rotateX += 0.1;
    rotateY += 0.2;
    updateCubeTransform();
  }
  requestAnimationFrame(animate);
}
animate();

function updateCubeTransform() {
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// 點擊某一面
faces.forEach((face, index) => {
  face.addEventListener('click', () => {
    if (dragMoved) {
      dragMoved = false;
      return;
    }

    if (!isMoved) {
      scene.classList.add('moved');
      popup.className = 'popup show ' + popupColors[index];
      popupContent.innerHTML = `
        <h2>${popupTitles[index]}</h2>
        <p>${popupMessages[index]}</p>
      `;
      isMoved = true;
    } else {
      scene.classList.remove('moved');
      popup.className = 'popup';
      isMoved = false;
    }
  });
});

// 長按開始拖曳
function startLongPress(event) {
  if (isMoved) return;
  const point = event.touches ? event.touches[0] : event;
  startX = point.clientX;
  startY = point.clientY;

  longPressTimeout = setTimeout(() => {
    isDragging = true;
    autoRotate = false;
  }, 300);
}

function move(event) {
  if (!isDragging) return;
  dragMoved = true;

  const point = event.touches ? event.touches[0] : event;
  const dx = point.clientX - startX;
  const dy = point.clientY - startY;

  rotateY += dx * 0.4;     // ← 修正為跟滑鼠同方向
  rotateX -= dy * 0.4;

  updateCubeTransform();

  startX = point.clientX;
  startY = point.clientY;
}

function endDrag() {
  clearTimeout(longPressTimeout);
  if (isDragging) {
    isDragging = false;
    autoRotate = true;
  }
}

// 綁定事件
['mousedown', 'touchstart'].forEach(evt => document.addEventListener(evt, startLongPress));
['mousemove', 'touchmove'].forEach(evt => document.addEventListener(evt, move));
['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => document.addEventListener(evt, endDrag));

// === 淡出封面並顯示立方體 ===
setTimeout(() => {
  cover.classList.add('hide');
  scene.classList.remove('hidden');
}, 50); // 5秒後
