/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

console.log("hello world!");

document.body.addEventListener("click", () => {
  console.log("hello vscode!");
});

function showMenu(env) {
  env.preventDefault(); // 禁止浏览器的默认菜单
  var e = env || window.event; // 兼容event事件
  var menu = document.getElementById("global-menu");
  var x = e.clientX; // 获取鼠标的坐标
  var y = e.clientY;
  menu.style.left = x + "px";
  menu.style.top = y + "px";
  menu.style.display = "block";

  return false;
}

// 当鼠标点击后关闭右键菜单
document.onclick = function () {
  closeMenu();
};
function closeMenu() {
  var menu = document.getElementById("global-menu");
  menu.style.display = "none";
}

// // Dropdowns
// var $dropdowns = getAll(".dropdown:not(.is-hoverable)");

// if ($dropdowns.length > 0) {
//   $dropdowns.forEach(function ($el) {
//     $el.addEventListener("click", function (event) {
//       event.stopPropagation();
//       $el.classList.toggle("is-active");
//     });
//   });

//   document.addEventListener("click", function (event) {
//     closeDropdowns();
//   });
// }

// function closeDropdowns() {
//   $dropdowns.forEach(function ($el) {
//     $el.classList.remove("is-active");
//   });
// }

// // Utils
// function getAll(selector) {
//   var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

//   return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
// }

// dropdown JQuery代码：简化很多
$(".dropdown-trigger").click(function (e) {
  e.preventDefault();
  $(this).parent(".dropdown").toggleClass("is-active");
});

// 只响应id = btnDropdown
// $("#btnDropdown").blur(function () {
//   $(this).parent().parent().removeClass("is-active");
// });

// 这个比上面的更通用，把所有的dropdown都隐藏
// 1 只有button edit等元素才能响应blur
// 2 而且只有自己失去焦点时，才会触发blur
// $(".dropdown-trigger button").blur(function () {
//   $(this).parent().parent().removeClass("is-active");
// });

// 1 div等任何元素都能响应focusout
// 2 自己或子元素失去焦点时，都会触发focusout
$(".dropdown").focusout(function () {
  $(this).removeClass("is-active");
});

// // 模态框 原生JS
// document.addEventListener("DOMContentLoaded", () => {
//   // Functions to open and close a modal
//   function openModal($el) {
//     $el.classList.add("is-active");
//   }

//   function closeModal($el) {
//     $el.classList.remove("is-active");
//   }

//   function closeAllModals() {
//     (document.querySelectorAll(".modal") || []).forEach(($modal) => {
//       closeModal($modal);
//     });
//   }

//   // Add a click event on buttons to open a specific modal
//   (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
//     const modal = $trigger.dataset.target;
//     const $target = document.getElementById(modal);

//     $trigger.addEventListener("click", () => {
//       openModal($target);
//     });
//   });

//   // Add a click event on various child elements to close the parent modal
//   (document.querySelectorAll(".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button") || []).forEach(($close) => {
//     const $target = $close.closest(".modal");

//     $close.addEventListener("click", () => {
//       closeModal($target);
//     });
//   });

//   // Add a keyboard event to close all modals
//   document.addEventListener("keydown", (event) => {
//     const e = event || window.event;

//     if (e.keyCode === 27) {
//       // Escape key
//       closeAllModals();
//     }
//   });
// });

// 模态框 JQuery代码：简化很多
$(document).ready(function () {
  $(".modal-close, .modal-background").click(function () {
    $(".modal").removeClass("is-active");
  });

  $(".js-modal-trigger").click(function () {
    // alert($(this).data("target"));
    var id = $(this).data("target"); // HTML5新属性data-target
    $("#" + id).addClass("is-active");
  });
});

// delete图标样式的响应
$(".tag .delete").click(function (e) {
  $(this).parent(".tag").remove();
});

$(".notification .delete").click(function (e) {
  $(this).parent(".notification").remove();
});

$(".message .delete").click(function (e) {
  $(this).parents(".message").remove();
});

// 用JQuery自己处理tabs
$(".tabs>ul>li").click(function (e) {
  e.preventDefault();
  $(this).addClass("is-active").siblings().removeClass("is-active");
  $(this).parents(".tabs").next().children().eq($(this).index()).addClass("is-block").siblings().removeClass("is-block");
});

// JQuery UI现成的tabs。 但是跟bulma不兼容，内容一个是放到tabs里面，一个是跟tabs同级。所以这个tabs不能融合只能二选一，显然风格更重要，自己再用上面的js就行了
$("#tabsJQueryUI").tabs();
