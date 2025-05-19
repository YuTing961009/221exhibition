const scene = document.querySelector('.scene');
const cube = document.querySelector('.cube');
const faces = document.querySelectorAll('.face');
const popup = document.getElementById('popup');
const popupContent = popup.querySelector('.popup-content');
const cover = document.querySelector('.cover');
const title = document.querySelector('.title');

let isMoved = false;
let isDragging = false;
let dragMoved = false;
let longPressTimeout;
let startX = 0;
let startY = 0;
let rotateX = 0;
let rotateY = 0;

const popupTitles = ['化學', '物理', '生物', '數學', '生科', '資科'];
const popupMessages = [
  '這是化學相關的內容與介紹。',
  '這是物理相關的內容與介紹。',
  '這是生物相關的內容與介紹。',
  '這是數學相關的內容與介紹。',
  '這是生科相關的內容與介紹。',
  '這是資科相關的內容與介紹。'
];
const popupColors = ['brown', 'blue', 'green', 'yellow', 'red', 'black'];

// 自動旋轉動畫
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

// 點擊 cube 面：進入 popup / 回到大立方體
faces.forEach((face, index) => {
  face.addEventListener('click', () => {
    if (dragMoved) {
      dragMoved = false;
      return;
    }

    if (!isMoved) {
      // 進入 popup
      scene.classList.add('moved');
      popup.className = 'popup show ' + popupColors[index];

      // 插入內容（化學面加入圖片）
      popupContent.innerHTML = `
        ${popupColors[index] === 'brown' ? `
    <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/green/%E9%A6%96%E9%A0%81" target="_blank">
      <img src="image/35d68855-43a7-4e7c-81c6-e47b33c8983d-removebg-preview.png" alt="化學團隊圖" class="popup-image">
    </a>
    <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/212227/%E9%A6%96%E9%A0%81?authuser=0" target="_blank">
      <img id="che-2" src="image/71826689-a710-43b0-ad4b-184994974de9-removebg-preview.png" alt="化學團隊圖" class="popup-image">
    </a>
        ` : ''}
      `;

      title.classList.add('hidden');
      isMoved = true;
    } else {
      // 回到大立方體
      scene.classList.remove('moved');
      popup.className = 'popup';
      title.classList.remove('hidden');
      autoRotate = true;
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

  rotateY += dx * 0.4;
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

// 綁定拖曳事件
['mousedown', 'touchstart'].forEach(evt => document.addEventListener(evt, startLongPress));
['mousemove', 'touchmove'].forEach(evt => document.addEventListener(evt, move));
['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => document.addEventListener(evt, endDrag));

// 淡出封面
setTimeout(() => {
  cover.classList.add('hide');
  scene.classList.remove('hidden');
}, 50);