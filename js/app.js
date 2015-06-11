!function t(i,e,n){function o(s,c){if(!e[s]){if(!i[s]){var a="function"==typeof require&&require;if(!c&&a)return a(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=e[s]={exports:{}};i[s][0].call(u.exports,function(t){var e=i[s][1][t];return o(e?e:t)},u,u.exports,t,i,e,n)}return e[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,i,e){function n(t){this.projectile=t.selector,this.initV=t.initV,this.g=t.g,this.frictionCo=t.frictionCo,this.frictionalA=this.getFrictionalA(),this.theta=this.degreesToRadians(t.degrees),this.initXPos=t.initXPos,this.initYPos=t.initYPos,this.initVx=this.getInitVx(),this.initVy=this.getInitVy(),this.animationStartTime=0,this.frictionStartTime=0}n.prototype.getFrictionalA=function(){return this.frictionCo*this.g},n.prototype.degreesToRadians=function(t){return t*(Math.PI/180)},n.prototype.getInitVx=function(){return this.initV*Math.cos(this.theta)},n.prototype.getInitVy=function(){return this.initV*Math.sin(this.theta)},n.prototype.projectileFrame=function(t){this.animationStartTime=this.animationStartTime||t,t-=this.animationStartTime,t/=1e3;var i=0,e=this.initYPos+this.initVy*t+.5*this.g*Math.pow(t,2);e=Math.max(0,e),this.projectileAnimation>1&&0===e&&(this.frictionStartTime=this.frictionStartTime||t,i=t-this.frictionStartTime);var n=+this.projectile.style.left.slice(0,-2),o=this.initXPos+this.initVx*t+.5*this.frictionalA*Math.pow(i,2);o=Math.max(n,o),this.projectile.style.left=o+"px",this.projectile.style.bottom=e+"px",0===t||o!==n?this.projectileAnimation=requestAnimationFrame(this.projectileFrame.bind(this)):this.stopAnimation()},n.prototype.startAnimation=function(){this.projectile.style.left=this.initXPos+"px",this.projectile.style.bottom=this.initYPos+"px",this.projectileAnimation=requestAnimationFrame(this.projectileFrame.bind(this))},n.prototype.stopAnimation=function(){cancelAnimationFrame(this.projectileAnimation),this.projectileAnimation=void 0},i.exports=n},{}],2:[function(t,i,e){i.exports={title:".main-title",container:".simulation-container",projectile:".projectile",form:".projectile-controls",jumpers:".jumper"}},{}],3:[function(t,i,e){var n=t("./css-classes"),o=t("./form-controls"),r=t("./intro-screen"),s=t("./jumpers");s.init(40),r.init(),o.init({simulationContainer:n.container,formContainer:n.form,projectile:n.projectile})},{"./css-classes":2,"./form-controls":4,"./intro-screen":5,"./jumpers":6}],4:[function(t,i,e){var n=t("./Projectile"),o=function(){var t,i,e,o,r,s,c=function(){var t=s.clientWidth,i=s.clientHeight;initXPos.max=r.clientWidth-t,initYPos.max=r.clientHeight-i},a=function(){var e=document.getElementById("initXPos"),n=document.getElementById("initYPos");c(),window.addEventListener("resize",c);for(var r=0;r<t.length;r++)i=t[r],i.parentNode.querySelector("span").textContent=i.value,i.addEventListener("change",function(t){this.parentNode.querySelector("span").textContent=this.value,o&&o.projectileAnimation||"initXPos"!==this.id&&"initYPos"!==this.id||(s.style.left=e.value+"px",s.style.bottom=n.value+"px")})},u=function(){e.addEventListener("submit",function(t){t.preventDefault();var i=document.getElementById("initV").value,e=document.getElementById("ga").value,r=document.getElementById("fc").value,c=document.getElementById("theta").value,a=document.getElementById("initXPos").value,u=document.getElementById("initYPos").value;o&&o.stopAnimation(),o=new n({selector:s,initV:+i,g:+e,frictionCo:+r,degrees:+c,initXPos:+a,initYPos:+u}),o.startAnimation()})},l=function(i){e=document.querySelector(i.formContainer),s=document.querySelector(i.projectile),r=document.querySelector(i.simulationContainer),t=e.querySelectorAll("input[type=range]"),a(),u()};return{init:l}}();i.exports=o},{"./Projectile":1}],5:[function(t,i,e){var n=t("./css-classes");i.exports=function(){var t,i,e,o=!1,r=function(){t.addEventListener("click",function(t){o=!0,this.classList.add("fade-out"),i.classList.add("fade-in"),e.classList.add("fade-in")})},s=function(){t=document.querySelector(n.title),i=document.querySelector(n.form),e=document.querySelector(n.projectile),r()};return{init:s,clicked:function(){return o}}}()},{"./css-classes":2}],6:[function(t,i,e){var n=t("./Projectile"),o=t("./utils"),r=t("./intro-screen");i.exports=function(){var t,i,e=window.outerWidth,s=document.createDocumentFragment(),c=function(){for(var e=0;i>e;++e)t=document.createElement("div"),t.classList.add("jumper"),t.classList.add("jumper-"+e),s.appendChild(t);document.body.appendChild(s)},a=function(){for(var t=(document.querySelectorAll(".jumper"),0);i>t;++t)!function(t){var i=o.randNumber(0,5e3),s=o.randNumber(250,750),c=o.randNumber(-1e3,0),a=o.randNumber(70,90),u=o.randNumber(0,e);setTimeout(function l(){var i=new n({selector:document.querySelector(".jumper-"+t),initV:s,g:c,frictionCo:.5,degrees:a,initXPos:u,initYPos:-50});i.startAnimation();var e=setInterval(function(){r.clicked()||i.projectileAnimation||(clearInterval(e),l()),r.clicked()&&clearInterval(e)},1e3)},i)}(t)},u=function(t){i=t,c(),a()};return{init:u}}()},{"./Projectile":1,"./intro-screen":5,"./utils":7}],7:[function(t,i,e){i.exports={randNumber:function(t,i){return Math.floor(Math.random()*(i-t+1)+t)}}},{}]},{},[3]);