document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Draggable);

  const island = document.querySelector(".island");
  const key = document.querySelector(".key");
  const closedChest = document.querySelector(".closed-chest");
  const openedChest = document.querySelector(".opened-chest");
  const note = document.querySelector(".note");
  Draggable.create(key, {
    type: "x,y",
    bounds: island,
    onDragEnd: function () {
      const key = this.target;
      const chestRect = closedChest.getBoundingClientRect();
      const keyRect = key.getBoundingClientRect();

      // Проверяем пересечение ключа и сундука
      if (
        keyRect.right > chestRect.left &&
        keyRect.left < chestRect.right &&
        keyRect.bottom > chestRect.top &&
        keyRect.top < chestRect.bottom
      ) {
        // Запускаем анимацию открытия сундука
        closedChest.style.opacity = "0";
        openedChest.style.opacity = "1";
        note.style.opacity = "1";
        key.style.opacity = "0";
      }
    },
  });

  const shell = document.querySelector(".shell");

  shell.addEventListener("click", () => {
    // Добавляем класс анимации
    shell.classList.add("animate-fly-spin");

    // После окончания анимации можно скрыть элемент или удалить класс, чтобы повторять анимацию
    shell.addEventListener(
      "animationend",
      () => {
        shell.style.display = "none"; // Скрываем элемент после анимации
        // Если хотите, чтобы можно было анимировать повторно, вместо display:none используйте:
        // shell.classList.remove('animate-fly-spin');
      },
      { once: true }
    );
  });
});

// // Разрешаем дроп на сундук
// closedChest.addEventListener("dragover", (e) => {
//   e.preventDefault();
// });

// // Обработка дропа ключа на сундук
// closedChest.addEventListener("drop", (e) => {
//   e.preventDefault();

//   // Запускаем анимацию открытия сундука
//   closedChest.style.opacity = "0";
//   openedChest.style.opacity = "1";
//   note.style.opacity = "1";

//   // Можно дополнительно скрыть ключ или сделать что-то еще
//   key.style.display = "none";
// });
