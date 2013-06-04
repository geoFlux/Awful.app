/* Zepto v1.0rc1-107-gdea8af9 - zepto event detect ajax touch - zeptojs.com/license */
var Zepto=function(){function A(e){return T.call(e)=="[object Function]"}function O(e){return e instanceof Object}function M(e){return O(e)&&e.__proto__==Object.prototype}function _(e){return e instanceof Array}function D(e){return typeof e.length=="number"}function P(t){return o.call(t,function(t){return t!==e&&t!==null})}function H(e){return e.length>0?n.fn.concat.apply([],e):e}function B(e){return e.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function j(e){return e in f?f[e]:f[e]=new RegExp("(^|\\s)"+e+"(\\s|$)")}function F(e,t){return typeof t=="number"&&!c[B(e)]?t+"px":t}function I(e){var t,n;return a[e]||(t=u.createElement(e),u.body.appendChild(t),n=l(t,"").getPropertyValue("display"),t.parentNode.removeChild(t),n=="none"&&(n="block"),a[e]=n),a[e]}function q(e){return"children"in e?s.call(e.children):n.map(e.childNodes,function(e){if(e.nodeType==1)return e})}function R(n,r,i){for(t in r)i&&M(r[t])?(M(n[t])||(n[t]={}),R(n[t],r[t],i)):r[t]!==e&&(n[t]=r[t])}function U(t,r){return r===e?n(t):n(t).filter(r)}function z(e,t,n,r){return A(t)?t.call(e,n,r):t}function W(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function X(t,n){var r=t.className,i=r&&r.baseVal!==e;if(n===e)return i?r.baseVal:r;i?r.baseVal=n:t.className=n}function V(e){var t;try{return e?e=="true"||(e=="false"?!1:e=="null"?null:isNaN(t=Number(e))?/^[\[\{]/.test(e)?n.parseJSON(e):e:t):e}catch(r){return e}}function $(e,t){t(e);for(var n in e.childNodes)$(e.childNodes[n],t)}var e,t,n,r,i=[],s=i.slice,o=i.filter,u=window.document,a={},f={},l=u.defaultView.getComputedStyle,c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,d=/^(?:body|html)$/i,v=["val","css","html","text","data","width","height","offset"],m=["after","prepend","before","append"],g=u.createElement("table"),y=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:g,thead:g,tfoot:g,td:y,th:y,"*":u.createElement("div")},w=/complete|loaded|interactive/,E=/^\.([\w-]+)$/,S=/^#([\w-]*)$/,x=/^[\w-]+$/,T={}.toString,N={},C,k,L=u.createElement("div");return N.matches=function(e,t){if(!e||e.nodeType!==1)return!1;var n=e.webkitMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.matchesSelector;if(n)return n.call(e,t);var r,i=e.parentNode,s=!i;return s&&(i=L).appendChild(e),r=~N.qsa(i,t).indexOf(e),s&&L.removeChild(e),r},C=function(e){return e.replace(/-+(.)?/g,function(e,t){return t?t.toUpperCase():""})},k=function(e){return o.call(e,function(t,n){return e.indexOf(t)==n})},N.fragment=function(t,r,i){t.replace&&(t=t.replace(p,"<$1></$2>")),r===e&&(r=h.test(t)&&RegExp.$1),r in b||(r="*");var o,u,a=b[r];return a.innerHTML=""+t,u=n.each(s.call(a.childNodes),function(){a.removeChild(this)}),M(i)&&(o=n(u),n.each(i,function(e,t){v.indexOf(e)>-1?o[e](t):o.attr(e,t)})),u},N.Z=function(e,t){return e=e||[],e.__proto__=arguments.callee.prototype,e.selector=t||"",e},N.isZ=function(e){return e instanceof N.Z},N.init=function(t,r){if(!t)return N.Z();if(A(t))return n(u).ready(t);if(N.isZ(t))return t;var i;if(_(t))i=P(t);else if(O(t))i=[M(t)?n.extend({},t):t],t=null;else if(h.test(t))i=N.fragment(t.trim(),RegExp.$1,r),t=null;else{if(r!==e)return n(r).find(t);i=N.qsa(u,t)}return N.Z(i,t)},n=function(e,t){return N.init(e,t)},n.extend=function(e){var t,n=s.call(arguments,1);return typeof e=="boolean"&&(t=e,e=n.shift()),n.forEach(function(n){R(e,n,t)}),e},N.qsa=function(e,t){var n;return e===u&&S.test(t)?(n=e.getElementById(RegExp.$1))?[n]:[]:e.nodeType!==1&&e.nodeType!==9?[]:s.call(E.test(t)?e.getElementsByClassName(RegExp.$1):x.test(t)?e.getElementsByTagName(t):e.querySelectorAll(t))},n.contains=function(e,t){return e!==t&&e.contains(t)},n.isFunction=A,n.isObject=O,n.isArray=_,n.isPlainObject=M,n.inArray=function(e,t,n){return i.indexOf.call(t,e,n)},n.camelCase=C,n.trim=function(e){return e.trim()},n.uuid=0,n.support={},n.expr={},n.map=function(e,t){var n,r=[],i,s;if(D(e))for(i=0;i<e.length;i++)n=t(e[i],i),n!=null&&r.push(n);else for(s in e)n=t(e[s],s),n!=null&&r.push(n);return H(r)},n.each=function(e,t){var n,r;if(D(e)){for(n=0;n<e.length;n++)if(t.call(e[n],n,e[n])===!1)return e}else for(r in e)if(t.call(e[r],r,e[r])===!1)return e;return e},n.grep=function(e,t){return o.call(e,t)},window.JSON&&(n.parseJSON=JSON.parse),n.fn={forEach:i.forEach,reduce:i.reduce,push:i.push,sort:i.sort,indexOf:i.indexOf,concat:i.concat,map:function(e){return n(n.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return n(s.apply(this,arguments))},ready:function(e){return w.test(u.readyState)?e(n):u.addEventListener("DOMContentLoaded",function(){e(n)},!1),this},get:function(t){return t===e?s.call(this):this[t]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(e){return this.forEach(function(t,n){e.call(t,n,t)}),this},filter:function(e){return A(e)?this.not(this.not(e)):n(o.call(this,function(t){return N.matches(t,e)}))},add:function(e,t){return n(k(this.concat(n(e,t))))},is:function(e){return this.length>0&&N.matches(this[0],e)},not:function(t){var r=[];if(A(t)&&t.call!==e)this.each(function(e){t.call(this,e)||r.push(this)});else{var i=typeof t=="string"?this.filter(t):D(t)&&A(t.item)?s.call(t):n(t);this.forEach(function(e){i.indexOf(e)<0&&r.push(e)})}return n(r)},has:function(e){return this.filter(function(){return O(e)?n.contains(this,e):n(this).find(e).size()})},eq:function(e){return e===-1?this.slice(e):this.slice(e,+e+1)},first:function(){var e=this[0];return e&&!O(e)?e:n(e)},last:function(){var e=this[this.length-1];return e&&!O(e)?e:n(e)},find:function(e){var t;return this.length==1?t=n(N.qsa(this[0],e)):t=this.map(function(){return N.qsa(this,e)}),t},closest:function(e,t){var r=this[0];while(r&&!N.matches(r,e))r=r!==t&&r!==u&&r.parentNode;return n(r)},parents:function(e){var t=[],r=this;while(r.length>0)r=n.map(r,function(e){if((e=e.parentNode)&&e!==u&&t.indexOf(e)<0)return t.push(e),e});return U(t,e)},parent:function(e){return U(k(this.pluck("parentNode")),e)},children:function(e){return U(this.map(function(){return q(this)}),e)},contents:function(){return this.map(function(){return s.call(this.childNodes)})},siblings:function(e){return U(this.map(function(e,t){return o.call(q(t.parentNode),function(e){return e!==t})}),e)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(e){return n.map(this,function(t){return t[e]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),l(this,"").getPropertyValue("display")=="none"&&(this.style.display=I(this.nodeName))})},replaceWith:function(e){return this.before(e).remove()},wrap:function(e){var t=A(e);if(this[0]&&!t)var r=n(e).get(0),i=r.parentNode||this.length>1;return this.each(function(s){n(this).wrapAll(t?e.call(this,s):i?r.cloneNode(!0):r)})},wrapAll:function(e){if(this[0]){n(this[0]).before(e=n(e));var t;while((t=e.children()).length)e=t.first();n(e).append(this)}return this},wrapInner:function(e){var t=A(e);return this.each(function(r){var i=n(this),s=i.contents(),o=t?e.call(this,r):e;s.length?s.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var r=n(this);(t===e?r.css("display")=="none":t)?r.show():r.hide()})},prev:function(e){return n(this.pluck("previousElementSibling")).filter(e||"*")},next:function(e){return n(this.pluck("nextElementSibling")).filter(e||"*")},html:function(t){return t===e?this.length>0?this[0].innerHTML:null:this.each(function(e){var r=this.innerHTML;n(this).empty().append(z(this,t,e,r))})},text:function(t){return t===e?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=t})},attr:function(n,r){var i;return typeof n=="string"&&r===e?this.length==0||this[0].nodeType!==1?e:n=="value"&&this[0].nodeName=="INPUT"?this.val():!(i=this[0].getAttribute(n))&&n in this[0]?this[0][n]:i:this.each(function(e){if(this.nodeType!==1)return;if(O(n))for(t in n)W(this,t,n[t]);else W(this,n,z(this,r,e,this.getAttribute(n)))})},removeAttr:function(e){return this.each(function(){this.nodeType===1&&W(this,e)})},prop:function(t,n){return n===e?this[0]?this[0][t]:e:this.each(function(e){this[t]=z(this,n,e,this[t])})},data:function(t,n){var r=this.attr("data-"+B(t),n);return r!==null?V(r):e},val:function(t){return t===e?this.length>0?this[0].multiple?n(this[0]).find("option").filter(function(e){return this.selected}).pluck("value"):this[0].value:e:this.each(function(e){this.value=z(this,t,e,this.value)})},offset:function(){if(this.length==0)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:e.width,height:e.height}},css:function(n,r){if(arguments.length<2&&typeof n=="string")return this.length==0?e:this[0].style[C(n)]||l(this[0],"").getPropertyValue(n);var i="";for(t in n)!n[t]&&n[t]!==0?this.each(function(){this.style.removeProperty(B(t))}):i+=B(t)+":"+F(t,n[t])+";";return typeof n=="string"&&(!r&&r!==0?this.each(function(){this.style.removeProperty(B(n))}):i=B(n)+":"+F(n,r)),this.each(function(){this.style.cssText+=";"+i})},index:function(e){return e?this.indexOf(n(e)[0]):this.parent().children().indexOf(this[0])},hasClass:function(e){return this.length<1?!1:j(e).test(X(this[0]))},addClass:function(e){return this.each(function(t){r=[];var i=X(this),s=z(this,e,t,i);s.split(/\s+/g).forEach(function(e){n(this).hasClass(e)||r.push(e)},this),r.length&&X(this,i+(i?" ":"")+r.join(" "))})},removeClass:function(t){return this.each(function(n){if(t===e)return X(this,"");r=X(this),z(this,t,n,r).split(/\s+/g).forEach(function(e){r=r.replace(j(e)," ")}),X(this,r.trim())})},toggleClass:function(t,r){return this.each(function(i){var s=z(this,t,i,X(this));(r===e?!n(this).hasClass(s):r)?n(this).addClass(s):n(this).removeClass(s)})},scrollTop:function(){if(!this.length)return;return"scrollTop"in this[0]?this[0].scrollTop:this[0].scrollY},position:function(){if(!this.length)return;var e=this[0],t=this.offsetParent(),r=this.offset(),i=d.test(t[0].nodeName)?{top:0,left:0}:t.offset();return r.top-=parseFloat(n(e).css("margin-top"))||0,r.left-=parseFloat(n(e).css("margin-left"))||0,i.top+=parseFloat(n(t[0]).css("border-top-width"))||0,i.left+=parseFloat(n(t[0]).css("border-left-width"))||0,{top:r.top-i.top,left:r.left-i.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||u.body;while(e&&!d.test(e.nodeName)&&n(e).css("position")=="static")e=e.offsetParent;return e})}},["width","height"].forEach(function(t){n.fn[t]=function(r){var i,s=t.replace(/./,function(e){return e[0].toUpperCase()});return r===e?this[0]==window?window["inner"+s]:this[0]==u?u.documentElement["offset"+s]:(i=this.offset())&&i[t]:this.each(function(e){var i=n(this);i.css(t,z(this,r,e,i[t]()))})}}),m.forEach(function(e,t){var r=t%2;n.fn[e]=function(){var e=n.map(arguments,function(e){return O(e)?e:N.fragment(e)}),i,s=this.length>1;return e.length<1?this:this.each(function(o,u){i=r?u:u.parentNode,u=t==0?u.nextSibling:t==1?u.firstChild:t==2?u:null,e.forEach(function(e){if(s)e=e.cloneNode(!0);else if(!i)return n(e).remove();$(i.insertBefore(e,u),function(e){e.nodeName!=null&&e.nodeName.toUpperCase()==="SCRIPT"&&(!e.type||e.type==="text/javascript")&&!e.src&&window.eval.call(window,e.innerHTML)})})})},n.fn[r?e+"To":"insert"+(t?"Before":"After")]=function(t){return n(t)[e](this),this}}),N.Z.prototype=n.fn,N.uniq=k,N.deserializeValue=V,n.zepto=N,n}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function(e){function o(e){return e._zid||(e._zid=r++)}function u(e,t,r,i){t=a(t);if(t.ns)var s=f(t.ns);return(n[o(e)]||[]).filter(function(e){return e&&(!t.e||e.e==t.e)&&(!t.ns||s.test(e.ns))&&(!r||o(e.fn)===o(r))&&(!i||e.sel==i)})}function a(e){var t=(""+e).split(".");return{e:t[0],ns:t.slice(1).sort().join(" ")}}function f(e){return new RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)")}function l(t,n,r){e.isObject(t)?e.each(t,r):t.split(/\s/).forEach(function(e){r(e,n)})}function c(e,t){return e.del&&(e.e=="focus"||e.e=="blur")||!!t}function h(e){return s[e]||e}function p(t,r,i,u,f,p){var d=o(t),v=n[d]||(n[d]=[]);l(r,i,function(n,r){var i=a(n);i.fn=r,i.sel=u,i.e in s&&(r=function(t){var n=t.relatedTarget;if(!n||n!==this&&!e.contains(this,n))return i.fn.apply(this,arguments)}),i.del=f&&f(r,n);var o=i.del||r;i.proxy=function(e){var n=o.apply(t,[e].concat(e.data));return n===!1&&(e.preventDefault(),e.stopPropagation()),n},i.i=v.length,v.push(i),t.addEventListener(h(i.e),i.proxy,c(i,p))})}function d(e,t,r,i,s){var a=o(e);l(t||"",r,function(t,r){u(e,t,r,i).forEach(function(t){delete n[a][t.i],e.removeEventListener(h(t.e),t.proxy,c(t,s))})})}function b(t){var n,r={originalEvent:t};for(n in t)!g.test(n)&&t[n]!==undefined&&(r[n]=t[n]);return e.each(y,function(e,n){r[e]=function(){return this[n]=v,t[e].apply(t,arguments)},r[n]=m}),r}function w(e){if(!("defaultPrevented"in e)){e.defaultPrevented=!1;var t=e.preventDefault;e.preventDefault=function(){this.defaultPrevented=!0,t.call(this)}}}var t=e.zepto.qsa,n={},r=1,i={},s={mouseenter:"mouseover",mouseleave:"mouseout"};i.click=i.mousedown=i.mouseup=i.mousemove="MouseEvents",e.event={add:p,remove:d},e.proxy=function(t,n){if(e.isFunction(t)){var r=function(){return t.apply(n,arguments)};return r._zid=o(t),r}if(typeof n=="string")return e.proxy(t[n],t);throw new TypeError("expected function")},e.fn.bind=function(e,t){return this.each(function(){p(this,e,t)})},e.fn.unbind=function(e,t){return this.each(function(){d(this,e,t)})},e.fn.one=function(e,t){return this.each(function(n,r){p(this,e,t,null,function(e,t){return function(){var n=e.apply(r,arguments);return d(r,t,e),n}})})};var v=function(){return!0},m=function(){return!1},g=/^([A-Z]|layer[XY]$)/,y={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,n,r){return this.each(function(i,s){p(s,n,r,t,function(n){return function(r){var i,o=e(r.target).closest(t,s).get(0);if(o)return i=e.extend(b(r),{currentTarget:o,liveFired:s}),n.apply(o,[i].concat([].slice.call(arguments,1)))}})})},e.fn.undelegate=function(e,t,n){return this.each(function(){d(this,t,n,e)})},e.fn.live=function(t,n){return e(document.body).delegate(this.selector,t,n),this},e.fn.die=function(t,n){return e(document.body).undelegate(this.selector,t,n),this},e.fn.on=function(t,n,r){return!n||e.isFunction(n)?this.bind(t,n||r):this.delegate(n,t,r)},e.fn.off=function(t,n,r){return!n||e.isFunction(n)?this.unbind(t,n||r):this.undelegate(n,t,r)},e.fn.trigger=function(t,n){if(typeof t=="string"||e.isPlainObject(t))t=e.Event(t);return w(t),t.data=n,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(t)})},e.fn.triggerHandler=function(t,n){var r,i;return this.each(function(s,o){r=b(typeof t=="string"?e.Event(t):t),r.data=n,r.target=o,e.each(u(o,t.type||t),function(e,t){i=t.proxy(r);if(r.isImmediatePropagationStopped())return!1})}),i},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t){e.fn[t]=function(e){return e?this.bind(t,e):this.trigger(t)}}),["focus","blur"].forEach(function(t){e.fn[t]=function(e){return e?this.bind(t,e):this.each(function(){try{this[t]()}catch(e){}}),this}}),e.Event=function(e,t){typeof e!="string"&&(t=e,e=t.type);var n=document.createEvent(i[e]||"Events"),r=!0;if(t)for(var s in t)s=="bubbles"?r=!!t[s]:n[s]=t[s];return n.initEvent(e,r,!0,null,null,null,null,null,null,null,null,null,null,null,null),n.isDefaultPrevented=function(){return this.defaultPrevented},n}}(Zepto),function(e){function t(e){var t=this.os={},n=this.browser={},r=e.match(/WebKit\/([\d.]+)/),i=e.match(/(Android)\s+([\d.]+)/),s=e.match(/(iPad).*OS\s([\d_]+)/),o=!s&&e.match(/(iPhone\sOS)\s([\d_]+)/),u=e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),a=u&&e.match(/TouchPad/),f=e.match(/Kindle\/([\d.]+)/),l=e.match(/Silk\/([\d._]+)/),c=e.match(/(BlackBerry).*Version\/([\d.]+)/),h=e.match(/Chrome\/([\d.]+)/)||e.match(/CriOS\/([\d.]+)/);if(n.webkit=!!r)n.version=r[1];i&&(t.android=!0,t.version=i[2]),o&&(t.ios=t.iphone=!0,t.version=o[2].replace(/_/g,".")),s&&(t.ios=t.ipad=!0,t.version=s[2].replace(/_/g,".")),u&&(t.webos=!0,t.version=u[2]),a&&(t.touchpad=!0),c&&(t.blackberry=!0,t.version=c[2]),f&&(t.kindle=!0,t.version=f[1]),l&&(n.silk=!0,n.version=l[1]),!l&&t.android&&e.match(/Kindle Fire/)&&(n.silk=!0),h&&(n.chrome=!0,n.version=h[1])}t.call(e,navigator.userAgent),e.__detect=t}(Zepto),function($){function triggerAndReturn(e,t,n){var r=$.Event(t);return $(e).trigger(r,n),!r.defaultPrevented}function triggerGlobal(e,t,n,r){if(e.global)return triggerAndReturn(t||document,n,r)}function ajaxStart(e){e.global&&$.active++===0&&triggerGlobal(e,null,"ajaxStart")}function ajaxStop(e){e.global&&!--$.active&&triggerGlobal(e,null,"ajaxStop")}function ajaxBeforeSend(e,t){var n=t.context;if(t.beforeSend.call(n,e,t)===!1||triggerGlobal(t,n,"ajaxBeforeSend",[e,t])===!1)return!1;triggerGlobal(t,n,"ajaxSend",[e,t])}function ajaxSuccess(e,t,n){var r=n.context,i="success";n.success.call(r,e,i,t),triggerGlobal(n,r,"ajaxSuccess",[t,n,e]),ajaxComplete(i,t,n)}function ajaxError(e,t,n,r){var i=r.context;r.error.call(i,n,t,e),triggerGlobal(r,i,"ajaxError",[n,r,e]),ajaxComplete(t,n,r)}function ajaxComplete(e,t,n){var r=n.context;n.complete.call(r,t,e),triggerGlobal(n,r,"ajaxComplete",[t,n]),ajaxStop(n)}function empty(){}function mimeToDataType(e){return e&&(e==htmlType?"html":e==jsonType?"json":scriptTypeRE.test(e)?"script":xmlTypeRE.test(e)&&"xml")||"text"}function appendQuery(e,t){return(e+"&"+t).replace(/[&?]{1,2}/,"?")}function serializeData(e){e.processData&&isObject(e.data)&&(e.data=$.param(e.data,e.traditional)),e.data&&(!e.type||e.type.toUpperCase()=="GET")&&(e.url=appendQuery(e.url,e.data))}function serialize(e,t,n,r){var i=$.isArray(t);$.each(t,function(t,s){r&&(t=n?r:r+"["+(i?"":t)+"]"),!r&&i?e.add(s.name,s.value):(n?$.isArray(s):isObject(s))?serialize(e,s,n,t):e.add(t,s)})}var jsonpID=0,isObject=$.isObject,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(e){if("type"in e){var t="jsonp"+ ++jsonpID,n=document.createElement("script"),r=function(){$(n).remove(),t in window&&(window[t]=empty),ajaxComplete("abort",i,e)},i={abort:r},s;return e.error&&(n.onerror=function(){i.abort(),e.error()}),window[t]=function(r){clearTimeout(s),$(n).remove(),delete window[t],ajaxSuccess(r,i,e)},serializeData(e),n.src=e.url.replace(/=\?/,"="+t),$("head").append(n),e.timeout>0&&(s=setTimeout(function(){i.abort(),ajaxComplete("timeout",i,e)},e.timeout)),i}return $.ajax(e)},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host);var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,"callback=?")),$.ajaxJSONP(settings);settings.url||(settings.url=window.location.toString()),serializeData(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=$.ajaxSettings.xhr(),abortTimeout;settings.crossDomain||(baseHeaders["X-Requested-With"]="XMLHttpRequest"),mime&&(baseHeaders.Accept=mime,mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime));if(settings.contentType||settings.contentType!==!1&&settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:$.parseJSON(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,"error",xhr,settings)}};var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(e,t){return $.ajax({url:e,success:t})},$.post=function(e,t,n,r){return $.isFunction(t)&&(r=r||n,n=t,t=null),$.ajax({type:"POST",url:e,data:t,success:n,dataType:r})},$.getJSON=function(e,t){return $.ajax({url:e,success:t,dataType:"json"})},$.fn.load=function(e,t){if(!this.length)return this;var n=this,r=e.split(/\s/),i;return r.length>1&&(e=r[0],i=r[1]),$.get(e,function(e){n.html(i?$("<div>").html(e.replace(rscript,"")).find(i):e),t&&t.apply(n,arguments)}),this};var escape=encodeURIComponent;$.param=function(e,t){var n=[];return n.add=function(e,t){this.push(escape(e)+"="+escape(t))},serialize(n,e,t),n.join("&").replace(/%20/g,"+")}}(Zepto),function(e){function u(e){return"tagName"in e?e:e.parentNode}function a(e,t,n,r){var i=Math.abs(e-t),s=Math.abs(n-r);return i>=s?e-t>0?"Left":"Right":n-r>0?"Up":"Down"}function f(){o=null,t.last&&(t.el.trigger("longTap"),t={})}function l(){o&&clearTimeout(o),o=null}function c(){n&&clearTimeout(n),r&&clearTimeout(r),i&&clearTimeout(i),o&&clearTimeout(o),n=r=i=o=null,t={}}var t={},n,r,i,s=500,o;e(document).ready(function(){var h,p;e(document.body).bind("touchstart",function(r){h=Date.now(),p=h-(t.last||h),t.el=e(u(r.touches[0].target)),n&&clearTimeout(n),t.x1=r.touches[0].pageX,t.y1=r.touches[0].pageY,p>0&&p<=250&&(t.isDoubleTap=!0),t.last=h,o=setTimeout(f,s)}).bind("touchmove",function(e){l(),t.x2=e.touches[0].pageX,t.y2=e.touches[0].pageY}).bind("touchend",function(s){l(),t.x2&&Math.abs(t.x1-t.x2)>30||t.y2&&Math.abs(t.y1-t.y2)>30?i=setTimeout(function(){t.el.trigger("swipe"),t.el.trigger("swipe"+a(t.x1,t.x2,t.y1,t.y2)),t={}},0):"last"in t&&(r=setTimeout(function(){var r=e.Event("tap");r.cancelTouch=c,t.el.trigger(r),t.isDoubleTap?(t.el.trigger("doubleTap"),t={}):n=setTimeout(function(){n=null,t.el.trigger("singleTap"),t={}},250)},0))}).bind("touchcancel",c),e(window).bind("scroll",c)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){e.fn[t]=function(e){return this.bind(t,e)}})}(Zepto);;(function(){
var Awful = {}

Awful.posts = function(posts){
  $('#posts').empty()
  $.each(posts, function(i, post){
    render(post).appendTo('#posts')
  })
}

Awful.insertPost = function(post, i){
  if (i === 0) {
    render(post).prependTo('#posts')
  } else if (i >= $('#posts > article').length) {
    render(post).appendTo('#posts')
  } else {
    $('#posts > article').eq(i).before(render(post))
  }
}

Awful.deletePost = function(post, i){
  $('#posts > article').eq(i).remove()
}

Awful.post = function(i, post){
  $('#posts > article').eq(i).replaceWith(render(post))
}

Awful.invoke = function(selector /*, varargs */){
  var stem = "x-objc:///" + selector + "/"
  var args = Array.prototype.slice.call(arguments, 1)
  var url = stem + encodeURIComponent(JSON.stringify(args))
  $('<iframe>', { src: url, style: 'display: none' }).appendTo($('html')).remove()
}

Awful.stylesheetURL = function(url){
  if ($('link').length) {
    $('link').attr('href', url)
  } else {
    $('head').append($('<link>', { rel: 'stylesheet', href: url }))
    $('#awful-inline-style').remove()
  }
}

Awful.dark = function(dark){
  $('body').toggleClass('dark', dark)
}

Awful.ad = function(ad){
  $('#ad').html(ad)
}

Awful.endMessage = function(end){
  $('#end').text(nullOrUndefined(end) ? '' : end)
}

Awful.highlightQuoteUsername = function(username){
  Awful._highlightQuoteUsername = username
  if (nullOrUndefined(username)) {
    $('.bbc-block.mention').removeClass('mention')
  } else {
    $('.postbody').each(function(){ highlightQuotes(this) })
  }
}

Awful.highlightMentionUsername = function(username){
  Awful._highlightMentionUsername = username
  if (nullOrUndefined(username)) {
    $('span.mention').each(function(){
      this.parentNode.replaceChild(this.firstChild, this)
      this.parentNode.normalize()
    })
  } else {
    $('.postbody').each(function(){ highlightMentions(this) })
  }
}

Awful.showAvatars = function(on){
  Awful._showAvatars = !!on
  if (on) {
    $('#posts > article > header[data-avatar]').each(function(){
      $('<img>', { src: $(this).data('avatar'), alt: '', class: 'avatar' }).insertBefore($(this).children('button'))
      $(this).data('avatar', null)
      $(this).closest('article').removeClass('no-avatar')
    })
  } else {
    $('#posts > article > header > img').each(function(){
      hideAvatar($(this).closest('article'))
    })
  }
}

Awful.showImages = function(on){
  Awful._showImages = !!on
  if (on) {
    $('#posts > article > section a[data-awful="image"]').each(function(){
      $(this).replaceWith($('<img>', { src: $(this).text(), border: '0' }))
    })
  } else {
    $('#posts > article').each(function(){
      hideImages(this)
    })
  }
}

Awful.fontSize = function(size) {
  $('body').css('font-size', size + "px")
}

function render(post) {
  post = $(post)
  
  // Some links and images come with relative URLs, which break as we set our
  // relative URL to the app's resource directory. Let's fix those up.
  post.find('a:not([href *= ":"])').each(function(){
    var a = $(this)
    a.attr('href', prependBaseURL(a.attr('href')))
  })
  post.find('img:not([src *= ":"])').each(function(){
    var img = $(this)
    img.attr('src', prependBaseURL(img.attr('src')))
  })
  
  // We style spoilers ourselves.
  post.find('span.bbc-spoiler')
      .removeAttr('onmouseover')
      .removeAttr('onmouseout')
      .removeAttr('style')
  
  // Remove empty "editedby" paragraphs; they make for ugly spacing.
  post.find('.editedby').filter(function(){ return $(this).text().trim().length == 0 }).remove()
  
  if (!Awful._showAvatars) hideAvatar(post)
  if (!Awful._showImages) hideImages(post)
  highlightQuotes(post.find('.postbody'))
  highlightMentions(post.find('.postbody'))
  fixVimeoEmbeds(post)
  return post
}

function prependBaseURL(relativeURL) {
  return "http://forums.somethingawful.com" + (relativeURL.indexOf('/') !== 0 ? '/' : '') + relativeURL
}

function nullOrUndefined(arg) {
  return arg === null || arg === undefined
}

function highlightQuotes(post) {
  var username = Awful._highlightQuoteUsername
  if (nullOrUndefined(username)) return
  $(post).find('.bbc-block h4').each(function(){
    var text = $(this).text()
    if (text.indexOf(username) === 0 && text.indexOf("posted") !== -1) {
      $(this).closest('div.bbc-block').addClass('mention')
    }
  })
}

function highlightMentions(post) {
  var username = Awful._highlightMentionUsername
  if (nullOrUndefined(username)) return
  var regex = new RegExp("\\b" + regexEscape(username) + "\\b", "i")
  eachTextNode($(post)[0], replaceAll)
  
  function eachTextNode(node, callback) {
    if (node.nodeType === Node.TEXT_NODE) callback(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
      eachTextNode(node.childNodes[i], callback)
    }
  }
  function replaceAll(node) {
    if ($(node.parentNode).filter('span.mention').length > 0) return
    var match = node.data.match(regex)
    if (match === null) return
    var nameNode = node.splitText(match.index)
    var rest = nameNode.splitText(username.length)
    var span = node.ownerDocument.createElement('span')
    span.className = 'mention'
    span.appendChild(nameNode.cloneNode(true))
    node.parentNode.replaceChild(span, nameNode)
    replaceAll(rest)
  }
}

function regexEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function fixVimeoEmbeds(post) {
  $(post).find('div.bbcode_video object param[value^="http://vimeo.com"]').each(function(){
    var videoID = $(this).attr('value').match(/clip_id=(\d+)/)
    if (videoID === null) return
    videoID = videoID[1]
    var object = $(this).closest('object')
    $(this).closest('div.bbcode_video').replaceWith($('<iframe/>', {
      src: "http://player.vimeo.com/video/" + videoID + "?byline=0&portrait=0",
      width: object.attr('width'),
      height: object.attr('height'),
      frameborder: 0,
      webkitAllowFullScreen: '',
      allowFullScreen: ''
    }))
  })
}

function hideAvatar(post) {
  var img = $(post).find('header > img')
  if (img.length === 0) return
  img.closest('header').data('avatar', img.attr('src'))
  img.remove()
  $(post).addClass('no-avatar')
}

function hideImages(post) {
  $(post).children('section').find('img')
         .not('img[src*="://fi.somethingawful.com/images/smilies"]')
         .not('img[src*="://fi.somethingawful.com/safs/smilies"]')
         .not('img[src*="://i.somethingawful.com/images/emot"]')
         .not('img[src*="://i.somethingawful.com/forumsystem/emoticons"]')
         .not('img[src*="://fi.somethingawful.com/forums/posticons"]')
         .not('img[src*="://forumimages.somethingawful.com/forums/posticons"]')
         .not('img[src*="://forumimages.somethingawful.com/images"]')
         .each(function(){
    $(this).replaceWith($('<a data-awful="image"/>').text($(this).attr('src')))
  })
}

window.Awful = Awful
})()


;(function(){

$(function(){
  $('body').addClass($.os.ipad ? 'ipad' : 'iphone')
  
  $('#posts').on('tap', '.action-button', showPostActions)
  
  $('#posts').on('longTap', 'section img', previewImage)
  
  $('#posts').on('click', 'a[data-awful="image"]', showLinkedImage)
  
  $('#posts').on('click', '.bbc-spoiler', toggleSpoiled)
  
  $('#posts').on('longTap', 'section a', showLinkMenu)
})

function showPostActions(e) {
  var button = $(e.target)
  var post = button.closest('article')
  var rect = button.offset()
  rect.left -= window.pageXOffset
  rect.top -= window.pageYOffset
  Awful.invoke("showActionsForPostAtIndex:fromRectDictionary:", post.index(), rect)
}

function previewImage(e) {
  var src = $(e.target).attr('src')
  // Need to encode the URL to pass it through to Objective-C land. It may already be encoded, so we can't blindly encode it. It may also require encoding (a common one is spaces in image URLs for some reason) so we need to encode it at some point.
  var skip = src.indexOf('://') != -1 ? 1 : 0
  var decodedParts = $.map(src.split('/'), function(part, i){
    return i < skip ? part : decodeURIComponent(part)
  })
  var url = encodeURI(decodedParts.join('/'))
  Awful.invoke("previewImageAtURLString:", url)
}

function showLinkedImage(e) {
  var link = $(e.target)
  link.replaceWith($('<img border=0>').attr('src', link.text()))
  e.preventDefault()
}

function toggleSpoiled(e) {
  var target = $(e.target)
  var spoiler = target.closest('.bbc-spoiler')
  if (!spoiler.hasClass('spoiled') && target.filter('a').length > 0) {
    e.preventDefault()
  }
  spoiler.toggleClass('spoiled')
}

function cancelUnspoiledLinks(e) {
  var link = $(e.target)
  var spoiler = link.closest('.bbc-spoiler')
  if (!spoiler.hasClass('spoiled')) {
    spoiler.addClass('spoiled')
    e.preventDefault()
  }
}

function showLinkMenu(e) {
  var link = $(e.target).closest('a')
  var spoiler = link.closest('.bbc-spoiler')
  if (spoiler.length == 0 || spoiler.hasClass('spoiled')) {
    var rect = link.offset()
    rect.left -= window.pageXOffset
    rect.top -= window.pageYOffset
    Awful.invoke("showMenuForLinkWithURLString:fromRectDictionary:", link.attr('href'), rect)
  }
  e.preventDefault()
}

})()
