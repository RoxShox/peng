window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    preloader.style.display = "none";
  }, 500); // время совпадает с переходом opacity

  gsap.registerPlugin(Draggable);
  // const cursor = document.querySelector(".typed-cursor--blink");
  // cursor.remove();
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
        closedChest.style.width = "0";
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
        shell.style.display = "none";
      },
      { once: true }
    );
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Запускаем Typed.js только когда элемент виден
          new Typed(entry.target, {
            strings: [entry.target.dataset.text],
            typeSpeed: 30, // скорость печати (мс на символ)
            loop: false,
            showCursor: false,
          });

          observer.unobserve(entry.target); // Отключаем наблюдение, чтобы не запускать повторно
        }
      });
    },
    { threshold: 0.5 }
  ); // 50% видимости
  document.querySelectorAll("#type-text-title").forEach((el) => {
    observer.observe(el);
  });

  const button = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  const exit = document.querySelector(".exit");
  // Открываем/закрываем меню по кнопке меню
  button.addEventListener("click", () => {
    menu.classList.add("open");
  });

  // Закрываем меню по кнопке крестика
  exit.addEventListener("click", () => {
    menu.classList.remove("open");
  });

  // Закрываем меню по нажатию клавиши Esc
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      menu.classList.remove("open");
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    // Если меню открыто и клик НЕ по меню и НЕ по кнопке меню — закрываем
    if (
      menu.classList.contains("open") &&
      !menu.contains(target) &&
      target !== button
    ) {
      menu.classList.remove("open");
    }
  });

  const openBtn = document.getElementById("open-modal-btn");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close-modal-btn");

  // Открыть модальное окно
  openBtn.addEventListener("click", () => {
    modal.classList.add("open");
  });

  // // Закрыть модальное окно по кнопке "×"
  // closeBtn.addEventListener("click", () => {
  //   modal.classList.remove("open");
  // });

  // Закрыть модальное окно при клике вне содержимого
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  // Закрыть модальное окно по нажатию клавиши Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      modal.classList.remove("open");
    }
  });

  // menu scroll
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Скроллим вниз — скрываем меню
      navbar.classList.add("hidden");
    } else {
      // Скроллим вверх — показываем меню
      navbar.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для корректной работы на iOS
  });

  let isCopying = false;
  document.getElementById("textToCopy").addEventListener("click", function () {
    if (isCopying) return;
    isCopying = true;
    const text = this.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const popup = document.getElementById("popup");
        popup.classList.add("popup-active");
        setTimeout(() => {
          popup.classList.remove("popup-active");
          isCopying = false;
        }, 2000);
        console.log("Текст скопирован в буфер обмена!");
      })
      .catch((err) => {
        console.error("Ошибка при копировании: ", err);
      });
  });

  const menuLinks = menu.querySelectorAll(".menu__item");

  // Для каждой ссылки добавляем обработчик клика
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Убираем класс активности меню (закрываем меню)
      menu.classList.remove("open");
    });
  });
});
