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
      
      ${popupColors[index] === 'green' ? `
        <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/gut-myth/%E9%A6%96%E9%A0%81" target="_blank">
          <img id="bio-1" src="image/IMG-1769-6.png" alt="生物團隊圖" class="popup-image">
        </a>
        <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/yyds/%E5%8B%95%E7%89%A9%E8%88%87%E9%86%AB%E5%AD%B8%E7%B5%84" target="_blank">
          <img id="bio-2" src="image/IMG-1773.png" alt="生物團隊圖" class="popup-image">
        </a>
        <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/juice/%E9%A6%96%E9%A0%81" target="_blank">
          <img id="bio-3" src="image/IMG-1771.png" alt="生物團隊圖" class="popup-image">
        </a>
      ` : ''}

      ${popupColors[index] === 'yellow' ? `
        <a href="https://hackmd.io/@Siestally/SJDvaQzakl" target="_blank">
          <img id="math-1" src="image/IMG-1794.png" alt="數學團隊圖" class="popup-image">
        </a>
        <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/yyds/%E6%95%B8%E5%AD%B8%E7%B5%84" target="_blank">
          <img id="math-2" src="image/IMG-1795.png" alt="數學團隊圖" class="popup-image">
        </a>
            ` : ''}

      ${popupColors[index] === 'blue' ? `
        <a href="https://s2112403.wixsite.com/com-lab" target="_blank">
          <img id="phy-1" src="image/IMG-1784.png" alt="物理團隊圖" class="popup-image">
        </a>
            ` : ''}      

      ${popupColors[index] === 'black' ? `
        <a href="https://www.google.com/?hl=zh_TW&safe=active&ssui=on" target="_blank">
          <img id="com-1" src="image/IMG-1767.png" alt="資訊團隊圖" class="popup-image">
        </a>
           ` : ''}   

      ${popupColors[index] === 'red' ? `
        <a href="https://octavian-math-learning-process.my.canva.site/08" target="_blank">
          <img id="liv-1" src="image/IMG-1796.png" alt="生科個人圖" class="popup-image">
        </a>
        <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/212246/%E9%A6%96%E9%A0%81" target="_blank">
          <img id="liv-2" src="image/IMG-1799.png" alt="生科個人圖" class="popup-image">
        </a>
        <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/balancing-car-arduino" target="_blank">
          <img id="liv-3" src="image/IMG-1798.png" alt="生科個人圖" class="popup-image">
        </a>
        <a href="https://sites.google.com/stu.tcssh.tc.edu.tw/21th-sky-and-future/%E9%A6%96%E9%A0%81" target="_blank">
          <img id="liv-4" src="image/IMG-1797.png" alt="生科個人圖" class="popup-image">
        </a>
        <a href="https://yuting961009.github.io/221exhibition/" target="_blank">
          <img id="liv-5" src="image/IMG-1800.png" alt="生科個人圖" class="popup-image">
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