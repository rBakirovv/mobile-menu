(function () {
  // Основная функция инициализации виджета
  function widgetInit(options) {
    // Устанавливаем значения по умолчанию для опций
    const defaultOptions = {
      color: "#409ADD", // Цвет по умолчанию
      position: "middle-right", // Позиция: middle-right, middle-left, bottom-right, bottom-left
      bottom: 40, // Отступ снизу (если позиция - bottom)
    };

    // Объединяем переданные опции с дефолтными
    const settings = {
      ...defaultOptions,
      ...options
    };

    // Создаём стили для виджета
    const styles = `
      .phone-widget {
        z-index: 100002;
        position: fixed;
        display: flex;
        top: 0;
        bottom: 0;
        flex-direction: column;
        pointer-events: none;
        padding: 25px;
      }

      .phone-widget_middle {
        justify-content: center;
      }

      .phone-widget_bottom {
        justify-content: flex-end;
      }

      .phone-widget_right {
        right: 0;
      }

      .phone-widget_left {
        left: 0;
      }

      .phone-widget-c-sitephone-label {
        height: 60px;
        width: 60px;
        position: relative;
        pointer-events: auto;
        cursor: pointer;
        text-align: left;
        transition-property: transform, opacity, height;
        transition-duration: 0.7s, 0.7s, 1.4s;
      }

      .phone-widget_right .phone-widget-js-sitephone-label--hidden {
        transform: translateX(100px);
      }

      .phone-widget_left .phone-widget-js-sitephone-label--hidden {
        transform: translateX(-100px);
      }

      .phone-widget.phone-widget-js-sitephone-label--shown {
        opacity: 1;
        transition-delay: 0.3s, 0.3s, 0s;
        transform: translateX(0px);
      }

      .phone-widget-c-simple-sitephone~* {
        pointer-events: none;
      }

      .phone-widget-sitephone-label__icon {
        position: absolute;
        z-index: 2;
        margin-left: 15px;
        margin-top: 15px;
        height: 30px;
        width: 30px;
        transform: rotate3d(0, 0, 0, 0);
        background-size: cover;
      }

      .phone-widget-sitephone-label__icon--sitephone {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 128 128'%3E%3Cg fill='%23fff'%3E%3Cpath d='M104.2,96.1c-1.4-1.6-2.9-3-4.4-4.4c-0.7-0.7-1.5-1.4-2.2-2.2l-6.4-6.4c-2.7-2.7-5.9-4.2-9.2-4.2c-3.3,0-6.5,1.4-9.2,4.2c-0.7,0.7-1.3,1.3-2,2c-1.5,1.5-3.1,3-4.6,4.7c-2.7-1.3-5.5-3.1-8.7-5.7c-4.2-3.4-7.8-6.8-10.9-10.5c-1.7-2-4.7-2.2-6.7-0.4c-2,1.7-2.2,4.7-0.4,6.7c3.5,4,7.5,7.9,12.1,11.6c0,0,0,0,0.1,0c4.7,3.7,8.6,6.1,12.7,7.8c0.1,0.1,0.2,0.1,0.3,0.1c1,0.3,4,1.3,6.9-1.6l0.2-0.2c1.8-2,3.7-3.9,5.7-5.8c0.7-0.7,1.4-1.3,2-2c0.6-0.6,1.6-1.4,2.6-1.4c0.9,0,1.9,0.8,2.5,1.4l6.4,6.4c0.8,0.8,1.6,1.5,2.3,2.3c1.5,1.4,2.8,2.8,4.2,4.2c0,0.1,0.1,0.1,0.1,0.1c1,1,2.1,2.6-0.1,4.8l-8,8c-1.7,1.7-3.6,2.6-6,2.8c-4.1,0.3-8.4-0.4-14.1-2.5c-9.4-3.5-18.2-8.8-27.7-16.6C30.2,89.6,21.2,78.1,14.8,65c-2.3-4.8-4.9-11.1-5.4-17.8c-0.2-3.7,0.8-6.4,3.2-8.7c1.8-1.5,3.3-3.1,4.8-4.6c0.9-1,1.8-1.9,2.8-2.8l0,0c1.9-1.8,3.4-1.8,5.2-0.1l13,13l0.1,0.1c0.6,0.5,1.2,1.3,1.2,2.2c0,0.9-0.7,1.9-1.3,2.5l-8,8c-1.8,1.8-1.8,4.8,0,6.7c1.8,1.8,4.8,1.8,6.7,0l8-8c2.7-2.7,4.1-5.9,4.1-9.3c0-3.3-1.4-6.4-4.1-8.9L32.1,24.4c-5.4-5.4-12.8-5.4-18.4-0.1c-1.1,1-2.1,2.1-3.1,3.1c-1.4,1.4-2.7,2.8-4.1,4c-0.1,0.1-0.1,0.1-0.2,0.2C1.8,35.7-0.3,41.2,0,47.8c0.6,8.3,3.6,15.7,6.3,21.2v0c7,14.4,16.8,26.9,29.3,37.4c10.3,8.6,20,14.4,30.4,18.2c3.8,1.4,9.4,3.2,15.6,3.2c0.8,0,1.7,0,2.5-0.1h0c4.6-0.4,8.6-2.3,11.9-5.5l8-8l0.1-0.1C109.4,108.8,109.3,101.3,104.2,96.1L104.2,96.1z M104.2,96.1'/%3E%3Cpath d='M102.3,64c-1.6-9.6-6.2-18.3-13.1-25.2c-6.9-6.9-15.6-11.4-25.2-13c-2.6-0.4-5,1.3-5.5,3.9c-0.4,2.6,1.3,5,3.9,5.5c7.6,1.3,14.6,4.9,20.1,10.4C88.1,51,91.7,57.9,93,65.6c0.4,2.3,2.4,3.9,4.7,3.9c0.3,0,0.5,0,0.8-0.1C101,69,102.8,66.5,102.3,64L102.3,64z M102.3,64'/%3E%3Cpath d='M127.9,62.8c-2.7-15.7-10.1-29.9-21.4-41.3C95.2,10.2,80.9,2.8,65.3,0.1c-2.6-0.4-5,1.3-5.5,3.9c-0.4,2.6,1.3,5,3.9,5.5c13.7,2.3,26.2,8.8,36.2,18.7c9.9,9.9,16.4,22.4,18.7,36.2c0.4,2.3,2.4,3.9,4.7,3.9c0.3,0,0.5,0,0.8-0.1C126.6,67.8,128.4,65.4,127.9,62.8L127.9,62.8z M127.9,62.8'/%3E%3C/g%3E%3C/svg%3E");
        animation: phone-widget-label-icon-sitephone 6.6s ease-in-out infinite;
      }

      .phone-widget-label__bubble--solid {
        height: 60px;
        width: 60px;
        box-shadow: 0 1px 7px rgba(0, 0, 0, 0.09), 0 2px 14px rgba(0, 0, 0, 0.19);
      }

      .phone-widget-label__bubble {
        position: absolute;
        box-sizing: border-box;
        border: 1px solid #409ADD;
        border-radius: 100%;
      }

      .phone-widget-label__bubble--solid-color {
        background-color: #409ADD;
      }

      .phone-widget-sitephone-opacity {
        opacity: 0;
      }

      .phone-widget-label__bubble--solid-animation {
        animation: phone-widget-label-bubble-solid 6s ease-in infinite;
      }

      .phone-widget-label__bubble--empty-inner-animation {
        animation: phone-widget-label-bubble-empty-inner 6s ease-out infinite;
      }

      .phone-widget-label__bubble--empty-inner {
        height: 120px;
        width: 120px;
        top: -30px;
        left: -30px;
      }

      .phone-widget-label__bubble--empty-outer-animation {
        animation: phone-widget-label-bubble-empty-outer 6s ease-out infinite;
      }

      .phone-widget-label__bubble--empty-outer {
        height: 120px;
        width: 120px;
        top: -30px;
        left: -30px;
      }

      @keyframes phone-widget-label-bubble-solid {
        0% {
          transform: scale(0.7);
          opacity: 0
        }

        50% {
          transform: scale(1.25);
          opacity: 0.5
        }

        75%,
        100% {
          transform: scale(0.7);
          opacity: 0
        }
      }

      @keyframes phone-widget-label-bubble-empty-outer {

        0%,
        33.33% {
          transform: scale3d(0.4, 0.4, 0.4);
          opacity: 0.75
        }

        66.67%,
        100% {
          transform: scale3d(0.9, 0.9, 0.9);
          opacity: 0
        }
      }

      @keyframes phone-widget-label-bubble-empty-inner {

        0%,
        33.33% {
          transform: scale3d(0.4, 0.4, 0.4);
          opacity: 0.75
        }

        66.67%,
        100% {
          transform: scale3d(0.7, 0.7, 0.7);
          opacity: 0
        }
      }

      @keyframes phone-widget-label-bubble-solid-hide {

        60%,
        100% {
          height: 36px;
          width: 36px
        }

        90%,
        100% {
          opacity: 0
        }
      }

      @keyframes phone-widget-label-icon-sitephone {

        1%,
        2% {
          transform: rotate3d(0, 0, 1, 9deg);
          opacity: 1
        }

        3%,
        5%,
        7% {
          transform: rotate3d(0, 0, 1, -9deg)
        }

        4%,
        6%,
        8% {
          transform: rotate3d(0, 0, 1, 9deg)
        }

        9% {
          transform: rotate3d(0, 0, 1, 0)
        }
      }

      .phone-widget-label__bubble {
        border: 1px solid ${settings.color};
      }
      .phone-widget-label__bubble--solid-color {
        background-color: ${settings.color};
      }
    `;

    // Добавляем стили на страницу
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // Определяем положение на основе настроек
    let widgetClass = "";
    if (settings.position.includes("middle")) {
      widgetClass += " phone-widget_middle";
    }
    if (settings.position.includes("bottom")) {
      widgetClass += " phone-widget_bottom";
    }
    if (settings.position.includes("right")) {
      widgetClass += " phone-widget_right";
    }
    if (settings.position.includes("left")) {
      widgetClass += " phone-widget_left";
    }

    // Создаём HTML-структуру виджета
    const widgetHTML = `
      <a href="#order" class="phone-widget ${widgetClass}">
        <div class="phone-widget-c-sitephone-label phone-widget-js-sitephone-label--hidden">
          <i class="phone-widget-sitephone-label__icon phone-widget-sitephone-label__icon--sitephone"></i>
          <div class="phone-widget-label__bubble phone-widget-label__bubble--solid"></div>
          <div class="phone-widget-label__bubble phone-widget-label__bubble--solid phone-widget-label__bubble--solid-color"></div>
          <div class="phone-widget-label__bubble phone-widget-label__bubble--solid phone-widget-label__bubble--solid-color phone-widget-label__bubble--solid-animation phone-widget-sitephone-opacity"></div>
          <div class="phone-widget-label__bubble phone-widget-label__bubble--empty-inner phone-widget-label__bubble--empty-inner-animation phone-widget-sitephone-opacity"></div>
          <div class="phone-widget-label__bubble phone-widget-label__bubble--empty-outer phone-widget-label__bubble--empty-outer-animation phone-widget-sitephone-opacity"></div>
        </div>
      </a>
    `;

    // Вставляем виджет в конец <body>
    document.body.insertAdjacentHTML("beforeend", widgetHTML);

    // Активируем логику для виджета
    window.addEventListener("DOMContentLoaded", function () {
      const phoneWidget = document.querySelector(".phone-widget");
      const widgetLabel = document.querySelector(".phone-widget-c-sitephone-label");
      const phoneWidgetBubble = phoneWidget && phoneWidget.querySelectorAll(".phone-widget-label__bubble");
      const phoneWidgetBackground = phoneWidget && phoneWidget.querySelectorAll(".phone-widget-label__bubble--solid-color");

      // Применяем настройки цвета
      phoneWidgetBubble.forEach((item) => {
        item.style.border = `1px solid ${settings.color}`;
      });

      phoneWidgetBackground.forEach((item) => {
        item.style.backgroundColor = `${settings.color}`;
      });

      // Если виджет снизу, устанавливаем отступ
      if (phoneWidget.classList.contains("phone-widget_bottom")) {
        widgetLabel.style.marginBottom = `${settings.bottom}px`;
      }

      // Показать виджет
      widgetLabel.classList.remove("phone-widget-js-sitephone-label--hidden");
      widgetLabel.classList.add("phone-widget-js-sitephone-label--shown");
    });
  }

  // Экспортируем функцию в глобальную область
  window.widgetInit = widgetInit;
})();