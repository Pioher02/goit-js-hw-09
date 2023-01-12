const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let o;function n(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(()=>{o=setInterval(n,1e3)})),e.addEventListener("click",(()=>{clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.3bb44cef.js.map
