import MouseFollower from"mouse-follower";import Vanilla from"./ProjectVanilla";import lozad from"lozad";let select=e=>document.querySelector(e),selectAll=e=>document.querySelectorAll(e);gsap.registerPlugin(ScrollTrigger,ScrollSmoother);const observer=lozad(".lozad",{rootMargin:"100px 0px",loaded:function(e){}});observer.observe();let midmoon=select(".mid-moon"),menuclose=select(".action--close"),menuopen=select(".action--menuUzi");function open(){midmoon.classList.add("mid-moon--light"),midmoon.classList.remove("mid-moon--dark")}function close(){midmoon.classList.add("mid-moon--dark"),midmoon.classList.remove("mid-moon--light")}function AnimateArrows(e){let o=select(".thirtyworks"),t=selectAll(".thirty-left svg"),n=selectAll(".thirty-right svg"),r=gsap.timeline({repeat:-1,paused:!0});r.addLabel("start",0).to(t,{duration:2,x:-30,ease:"none"},"start").to(n,{duration:2,x:30,ease:"none"},"start").to(t,{duration:2,x:0,ease:"none"},"start+=2").to(n,{duration:2,x:0,ease:"none"},"start+=2"),o.addEventListener("mouseenter",(()=>{r.play()})),o.addEventListener("mouseleave",(()=>{r.pause()}))}function assignLinks(e){for(const o in e)if(e.hasOwnProperty(o)){selectAll(o).forEach((t=>{t?t.href=e[o]:console.error(`Elements matching selector ${o} not found.`)}))}}function assignExp(e){for(const o in e)if(e.hasOwnProperty(o)){selectAll(o).forEach((t=>{t?t.innerHTML=e[o]:console.error(`Elements matching selector ${o} not found.`)}))}}async function fetchProjects(){try{const e=await fetch("../../../includes/project-data.json");if(!e.ok)throw new Error(`HTTP error status: ${e.status}`);return await e.json()}catch(e){return console.error("Failed to fetch project data:",e),[]}}function getMediaTypeFromExtension(e){return["mp4","webm"].includes(e.toLowerCase())?"video":"image"}function preloadMedia(e){e.forEach((e=>{const o=window.location.origin,t=new URL(e.previewImage,o).toString(),n=new URL(t).pathname.split("/"),r=n[n.length-1],l=r.lastIndexOf("."),s=getMediaTypeFromExtension(l>0?r.substring(l+1):""),a=t;if("video"===s){const e=document.createElement("video");e.preload="metadata",e.src=a,document.head.appendChild(e)}else{const e=document.createElement("link");e.rel="preload",e.as=s,e.href=a,document.head.appendChild(e)}}))}menuopen.addEventListener("click",open),menuclose.addEventListener("click",close),new Promise(((e,o)=>{document.addEventListener("DOMContentLoaded",(function(){fetch("includes/config.json").then((e=>e.json())).then((o=>{assignLinks(o),e()})).catch((e=>{console.error("Error loading config:",e),o(e)}))}))})).then((()=>{console.log("%c Greetings from Hypercritical","color:white;background:#c389e1; font-size: 26px;font-family:sans-serif")})).catch((e=>{console.error("Failed to load configuration or assign links:",e)})),new Promise(((e,o)=>{document.addEventListener("DOMContentLoaded",(function(){fetch("includes/config-data.json").then((e=>e.json())).then((o=>{assignExp(o),e()})).catch((e=>{console.error("Error loading config:",e),o(e)}))}))})).then((()=>{Vanilla(),AnimateArrows()})).catch((e=>{console.error("Failed to load configuration or assign links:",e)})),assignExp(),document.addEventListener("DOMContentLoaded",(function(){function e(){if(innerWidth>767){new MouseFollower({speed:.6});let e=select(".sniper"),o=select(".snipersvg"),t=selectAll(["a","details"]),n=selectAll(".snipedblack"),r=(selectAll(".snipedwhite"),document.documentElement);new MouseFollower({el:e});t.forEach(((e,t)=>{let n=document.documentElement;o.classList.add("rotate-cursorr"),n.style.setProperty("--sniper-color","var(--main-sub")})),n.forEach((e=>{e.addEventListener("mouseenter",(()=>{r.style.setProperty("--sniper-color","#000")})),e.addEventListener("mouseleave",(()=>{r.style.setProperty("--sniper-color","var(--main-sub")}))}))}}e(),window.addEventListener("resize",e)})),document.addEventListener("DOMContentLoaded",(function(){let e=select("#toTop");function o(){(window.scrollY||document.documentElement.scrollTop)>1.2*window.innerHeight?e.style.display="block":e.style.display="none"}o(),window.addEventListener("scroll",o),e.addEventListener("click",(function(){gsap.to(window,{duration:2,delay:0,scrollTo:{y:".hero-main"},ease:e=>Math.min(1,1.001-Math.pow(2,-10*e))})}))})),document.addEventListener("DOMContentLoaded",(()=>{gsap.registerPlugin(ScrollTrigger);const e=gsap.utils.toArray(".white-section");var o=select(".top-arrow-wrapper"),t=select(".top-arrow-path"),n=select(".menu-name"),r=selectAll(".menu-dot-line");let l=select(".nav .below-line"),s=select(".nav_logo_parent"),a=select(".est_nav");function c(){t.style.stroke="var(--color-bg)",o.style.fill="var(--color-black)",r.forEach((e=>{e.style.background="var(--color-black)"})),n.style.color="var(--color-black)"}function i(){a.style.fill="var(--color-bg)",l.style.background="var(--color-bg)",s.style.color="var(--color-bg)",r.forEach((e=>{e.style.background="var(--color-bg)"})),n.style.color="var(--color-bg)"}function d(){(window.scrollY||document.documentElement.scrollTop)<.8*window.innerHeight&&i()}d(),window.addEventListener("scroll",d),e.forEach(((e,d)=>{gsap.timeline({scrollTrigger:{trigger:e,id:d+1,start:"top top",endtrigger:e,end:"bottom bottom",scrub:!0,markers:!1,onEnter:()=>(t.style.stroke="var(--color-black)",a.style.fill="var(--color-black)",l.style.background="var(--color-black)",s.style.color="var(--color-black)",o.style.fill="var(--color-black)",r.forEach((e=>{e.style.background="var(--color-black)"})),void(n.style.color="var(--color-black)")),onLeave:()=>c(),onEnterBack:()=>i(),onLeaveBack:()=>c()}})}))})),fetchProjects().then(preloadMedia).catch(console.error);