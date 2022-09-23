const frame = document.querySelector(".frame");
const imgs = [
  "./img1.jpg",
  "./img2.jpg",
  "./img3.jpg",
  "./img4.jpg",
  "./img5.jpg",
];
let imageCount = 0;
for (let i = 0; i < 5; i++) {
  appendCard();
}

let current = frame.querySelector(".card:last-child");
let startX = 0,
  startY = 0,
  moveX = 0,
  moveY = 0;
addEventListener(current);
document.querySelector("#hate-btn").onclick = () => {
  moveX = -1;
  moveY = 0;
  complete();
};
document.querySelector("#like-btn").onclick = () => {
  moveX = 1;
  moveY = 0;
  complete();
};
function appendCard() {
  const firstCard = frame.children[0];
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.style.backgroundImage = `url(${imgs[imageCount++ % imgs.length]})`;
  if (firstCard) frame.insertBefore(newCard, firstCard);
  else frame.appendChild(newCard);
}

function addEventListener(card) {
  card.addEventListener("pointerdown", onPointerDown);
}

function setTransform(x, y, deg, duration) {
  current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
  if (duration) current.style.transition = `transform ${duration}ms`;
}

function onPointerDown(e) {
  startX = e.clientX;
  startY = e.clientY;
  current.addEventListener("pointermove", onPointerMove);
  current.addEventListener("pointerup", onPointerUp);
  current.addEventListener("pointerleave", onPointerUp);
}

function onPointerMove(e) {
  moveX = e.clientX - startX;
  moveY = e.clientY - startY;
  setTransform(moveX, moveY, (moveX / innerWidth) * 50);
}

function onPointerUp() {
  current.removeEventListener("pointerdown", onPointerMove);
  current.removeEventListener("pointermove", onPointerMove);
  current.removeEventListener("pointerup", onPointerUp);
  if (Math.abs(moveX) > frame.clientWidth / 2) {
    current.removeEventListener("pointerleave", onPointerUp);
    complete();
  } else {
    cancel();
  }
}

function complete() {
  //날아가는 트랜지션
  const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.1;
  const flyY = (moveY / moveX) * flyX;
  setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth * 0.5);
  //카드 쿄체식
  const prev = current;
  const next = current.previousElementSibling;
  current = next;
  addEventListener(next);
  appendCard();
  setTimeout(() => frame.removeChild(prev), innerWidth * 0.5);
}
function cancel() {
  setTransform(0, 0, 0, 100);
  setTimeout(() => (current.style.transition = ""), 100);
}
