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
  $(".modal-close, .modal-background, .delete").click(function () {
    $(this).parent(".modal").removeClass("is-active"); // 只关闭目前的
    // $(".modal").removeClass("is-active"); // 关闭所有模态框
  });

  $(".js-modal-trigger").click(function () {
    // alert($(this).data("target"));
    var id = $(this).data("target"); // HTML5新属性data-target
    $("#" + id).addClass("is-active");
    // $(":root").toggleClass("is-clipped");
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

// JQuery UI现成的tabs。 但是跟bulma不兼容，内容是放到tabs里面，但bulma是跟tabs同级。所以这个tabs不能融合只能二选一，显然风格更重要，自己再用上面的js就行了
var tabs = $("#tabsJQueryUI").tabs();
// tabs可拖拽
var previouslyFocused = false;
tabs.find(".ui-tabs-nav").sortable({
  axis: "x",

  // Sortable removes focus, so we need to restore it if the tab was focused
  // prior to sorting
  start: function (event, ui) {
    previouslyFocused = document.activeElement === ui.item[0];
  },
  stop: function (event, ui) {
    tabs.tabs("refresh");
    if (previouslyFocused) {
      ui.item.trigger("focus");
    }
  },
});

// 可拖拽排序  要加上class="group"属性，并且改变div布局，不兼容bluma的css,但是包装一下bluma的应该可以
// 搞定了，调整下函数调用顺序，把accordion({ icons: icons });放到最后，然后removeClass("ui-icon");
$("#accordion2")
  .accordion({
    header: "> div > h3",
    // header: "h3",
  })
  .sortable({
    axis: "y",
    handle: "h3",
    stop: function (event, ui) {
      // IE doesn't register the blur when sorting
      // so trigger focusout handlers to remove .ui-state-focus
      ui.item.children("h3").triggerHandler("focusout");

      // Refresh accordion to handle new order
      $(this).accordion("refresh");
      $(".ui-icon").removeClass("ui-icon"); // JQuery UI会操作css，所以要重置一下
    },
  });

// JQuery UI的图标，是css生成的
// var icons = {
//   header: "ui-icon-circle-arrow-e",
//   activeHeader: "ui-icon-circle-arrow-s",
// };
//
// bulma的图标
var icons = {
  header: "fa-solid fa-caret-right",
  activeHeader: "fa-solid fa-caret-down",
};
// $("#accordion2").accordion(); // 默认样式，不可拖拽排序
// $("#accordion2").accordion({ icons: icons }); // 启动后,就不能改图标了
// $("#accordion2").accordion("option", "icons", icons); // 启动后,也可以改图标
$("#accordion2").accordion({ icons: icons }); // 这句必须放到最后，否则样式会混乱
$(".ui-icon").removeClass("ui-icon"); // 删除JQuery UI的所有图标，这样bulma的图标才能生效
