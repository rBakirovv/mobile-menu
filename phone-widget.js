window.addEventListener("DOMContentLoaded", function () {
  const phoneWidget = document.querySelector(".phone-widget");
  const widgetLabel = document.querySelector(".phone-widget-c-sitephone-label");
  const phoneWidgetBubble = phoneWidget && phoneWidget.querySelectorAll(".phone-widget-label__bubble");
  const phoneWidgetBackground = phoneWidget && phoneWidget.querySelectorAll(".phone-widget-label__bubble--solid-color");

  const color = phoneWidget.dataset.color;
  const bottom = phoneWidget.dataset.bottom;

  phoneWidgetBubble.forEach((item) => {
    item.style.border = `1px solid ${color}`;
  })

  phoneWidgetBackground.forEach((item) => {
    item.style.backgroundColor = `${color}`;
  })

  if (phoneWidget.classList.contains("phone-widget_bottom")) {
    widgetLabel.style.marginBottom = `${bottom}px`;
  }

  widgetLabel.classList.remove("phone-widget-js-sitephone-label--hidden");
  widgetLabel.classList.add("phone-widget-js-sitephone-label--shown");
})