(this["webpackJsonpcan-i-use-npm"]=this["webpackJsonpcan-i-use-npm"]||[]).push([[0],{30:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(17),s=n.n(a),i=(n(30),n(10)),o=n.n(i),j=n(13),u=n(18),d=n(19),l=n(25),p=n(24),h=(n(32),n(33),n(20)),b=n(11),x=n(3),f=n(1);function O(e,t){var n=function(e){return"module"===e.module?0:1};return n(e)-n(t)}function v(e,t){return"."===t?e:"".concat(e,"/").concat(t)}function m(e,t,n){return Object(f.jsxs)("div",{children:["\u7528\u6cd5\uff1aESM \u6a21\u5757",Object(f.jsxs)("div",{children:[Object(f.jsx)("pre",{children:(Array.isArray(n.export)?n.export:[n.export]).map((function(t){return"import ".concat(function(e){switch(e.type){case"default":return"".concat(e.local);case"namespace":return"* as ".concat(e.local);case"named":var t=Array.isArray(e.exports)?e.exports:[e.exports];return"{ ".concat(t.map((function(e){return"string"===typeof e?e:"".concat(e.exported," as ").concat(e.local)})).join(", ")," }")}}(t),' from "').concat(v(e,n.path),'";')})).join("\n\u6216\n")}),k(e,t,n)]})]})}function y(e,t,n){return Object(f.jsxs)("div",{children:["\u7528\u6cd5\uff1aCommonJS \u6a21\u5757",Object(f.jsxs)("div",{children:[Object(f.jsx)("pre",{children:"import ".concat(n.local,' from "').concat(v(e,n.path),'";')}),k(e,t,n)]})]})}function g(e,t){var n=t.types;if(n){var c=n.definitelyTyped;return Object(f.jsx)("div",{children:c?Object(f.jsxs)("div",{children:["\u6b64\u5305\u7684\u7c7b\u578b\u5b9a\u4e49\u5b58\u653e\u5728 ",Object(f.jsx)("a",{href:"https://github.com/DefinitelyTyped/DefinitelyTyped",children:"DefinitelyTyped"})," \u4e0a\u3002",Object(f.jsx)("br",{}),"\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u5b89\u88c5\uff1a",Object(f.jsxs)("pre",{children:["npm install --save-dev @types/",e]})]}):Object(f.jsx)("div",{children:"\u6b64\u5305\u672c\u8eab\u63d0\u4f9b\u4e86\u7c7b\u578b\u5b9a\u4e49\u3002"})})}}function k(e,t,n){var c=t.types;if(c){var r=c.subPathTypes;return Object(f.jsx)("div",{children:function(){if("."!==n.path&&!r){var t=v(e,n.path);return Object(f.jsxs)("div",{children:["\u6a21\u5757\u201c",t,"\u201d\u53ef\u80fd\u6ca1\u6709\u76f8\u5e94\u7684\u7c7b\u578b\u58f0\u660e\u3002",Object(f.jsx)("br",{}),"\u4e3a\u4e86\u83b7\u53d6\u7c7b\u578b\u63d0\u793a\uff0c\u5c06\u4ee5\u4e0b\u5185\u5bb9\u62f7\u8d1d\u81f3\u4efb\u4f55 `.d.ts` \u6587\u4ef6\u4e2d\uff0c\u5e76\u5728 tsconfig.json \u4e2d\u5f15\u7528\u8be5 `.d.ts` \u6587\u4ef6\u3002",Object(f.jsxs)("pre",{children:['declare module "',t,'" ',"{\n                    export *".concat("module"===n.module?"":" as default"," from '").concat(e,"';\n                }")]})]})}}()})}}var w=function(e){Object(l.a)(n,e);var t=Object(p.a)(n);function n(e){var c;return Object(u.a)(this,n),(c=t.call(this,e)).state={database:null},c}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(j.a)(o.a.mark((function t(){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C();case 2:n=t.sent,e.setState({database:n});case 4:case"end":return t.stop()}}),t)})))()}},{key:"render",value:function(){var e=this.state.database;return e&&Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(h.a,{children:Object(f.jsx)("title",{children:"Can I use ... npm module.."})}),Object(f.jsx)(b.a,{children:Object(f.jsx)("div",{children:Object(f.jsx)(x.c,{children:Object(f.jsx)(x.a,{path:"/",component:function(){return function(e){var t=Object(x.g)();if(!e)return Object(f.jsx)("div",{});return Object(f.jsx)(b.a,{children:Object(f.jsxs)("div",{children:[Object(f.jsx)("h1",{children:" \u6211\u80fd\u5426\u5728 Cocos Creator \u4e2d\u4f7f\u7528 npm \u5305\u2026\u2026 "}),Object(f.jsxs)(x.c,{children:[Object(f.jsx)(x.a,{path:"".concat(t.path,"packages/:packageId"),component:function(){return function(e){var t=Object(x.f)().packageId,n=e.packages[t];if(!n)return Object(f.jsx)("div",{children:"\u6211\u4eec\u6682\u672a\u6536\u5f55\u6b64\u5305\u7684\u7528\u6cd5\u3002"});var c=Array.isArray(n.usage)?n.usage:[n.usage];return c.slice().sort(O),Object(f.jsxs)("div",{children:[Object(f.jsx)("a",{href:"https://www.npmjs.com/package/".concat(t),children:"npmjs.com/package/".concat(t)}),Object(f.jsxs)("ul",{children:[Object(f.jsxs)("li",{children:[" \u53ef\u7528\uff1a",c.length>0?"\u2714\ufe0f":"\u274c"]}),Object(f.jsxs)("li",{children:[" \u5b89\u88c5\uff1anpm install --save ",t]}),Object(f.jsxs)("li",{children:[" ",g(t,n)]}),c.map((function(e){return Object(f.jsxs)("li",{children:[" ","module"===e.module?m(t,n,e):y(t,n,e)," "]})}))]})]})}(e)}}),Object(f.jsx)(x.a,{path:t.path,children:Object(f.jsx)("nav",{children:Object(f.jsx)("ul",{children:Object.keys(e.packages).map((function(e){return Object(f.jsx)("li",{children:Object(f.jsx)(b.b,{to:"".concat(t.path,"packages/").concat(e),children:e})},e)}))})})})]})]})})}(e)}})})})})]})}}]),n}(r.a.Component);function C(){return A.apply(this,arguments)}function A(){return(A=Object(j.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("/can-i-use-npm-in-cocos-creator","/database/index.json"));case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,43)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};s.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(w,{})}),document.getElementById("root")),T()}},[[42,1,2]]]);
//# sourceMappingURL=main.ff6257ce.chunk.js.map