import { cartechoropleth } from "./choropleth.js";
import { fonctionne } from "./histogram.js";
import { afficherDataMonde } from "./ligne.js";
import { bubbles } from "./bubblechart.js";

const slider = document.getElementById("slider");
slider.value = 100;

document.addEventListener("DOMContentLoaded", function () {
  cartechoropleth();
  document.getElementById("map1").style.width = `${slider.value}%`;
});

function observeElement(selector, callback) {
  const elementToObserve = document.querySelector(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    });
  });

  observer.observe(elementToObserve);
}

observeElement("#stat2", fonctionne);
observeElement("#stat3", afficherDataMonde);
observeElement("#section5", bubbles);
observeElement("#section2", () => setTimeout(afficheslider, 1500));

let ine = 0;

function afficheslider() {
  console.log("affiche slider");
  if (ine == 0) {
    let i = 100;
    let timer = setInterval(function () {
      if (i == 50) clearInterval(timer);
      slider.value = i;
      i--;
      document.getElementById("map1").style.width = `${slider.value}%`;
    }, 35);

    ine = 1;
  }
}
