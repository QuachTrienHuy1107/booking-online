(this.webpackJsonpcinema=this.webpackJsonpcinema||[]).push([[16],{444:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(34),a=n(68),r=n(0),i=n.n(r);function s(e,t){var n=i.a.useState({page:e,size:t}),r=Object(a.a)(n,2),s=r[0],o=r[1];return{resPagination:s,handlePageChange:function(e){o(Object(c.a)(Object(c.a)({},s),{},{page:e}))}}}},451:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c=n(580),a=n(0),r=n(73),i=n(14),s=(n(457),n(3)),o=Object(a.memo)((function(e){var t,n=e.movie,a=e.isHome;return Object(s.jsx)("div",{className:"movie ".concat(a?"movie-recommend":""),children:Object(s.jsx)(c.a,{hoverable:!0,cover:Object(s.jsx)("div",{className:"movie__poster",children:Object(s.jsx)(r.b,{to:{pathname:"".concat(i.b.MOVIEDETAIL,"/").concat(n._id)},children:Object(s.jsx)("img",{className:"movie__poster--img",alt:"",src:n.poster})})}),children:Object(s.jsxs)("div",{className:"movie__info",children:[Object(s.jsx)(r.b,{to:{pathname:"".concat(i.b.MOVIEDETAIL,"/").concat(n._id)},children:Object(s.jsx)("h1",{className:"movie__content movie__content--title",children:n.title})}),Object(s.jsx)("span",{className:"movie__content movie__content--genres ",children:null===(t=n.genres)||void 0===t?void 0:t.map((function(e){return e})).join(" / ")})]})})},n._id)}))},457:function(e,t,n){},486:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var c=n(581),a=(n(0),n.p+"static/media/loading-page.6eb15f4c.gif"),r=n(3),i=function(){return Object(r.jsx)("div",{style:{position:"fixed",width:"100%",height:"100%",top:0,left:0,zIndex:9,backgroundColor:"#fff"},children:Object(r.jsxs)("div",{style:{width:"100%",height:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"},children:[Object(r.jsx)("style",{}),Object(r.jsx)("span",{className:"display-4 text-white",children:Object(r.jsx)(c.b,{size:"middle",children:Object(r.jsx)("img",{src:a,alt:"loading"})})})]})})}},569:function(e,t,n){},570:function(e,t,n){},595:function(e,t,n){"use strict";n.r(t);var c=n(130),a=n(34),r=n(68),i=n(578),s=n(579),o=n(581),l=n(99),u=n(503),j=n(486),f=n(451),b=n(0),d=n.n(b),h=(n(569),n(3)),O=function(e){var t=e.title;return Object(h.jsx)("h1",{className:"title",children:t})},v=n(13),g=n.n(v),m=n(97),x=n(70),p=n(444),_=n(438),w=n(522),N=n(523),E=n(36),S=n(56),k=(n(570),i.a.Panel);t.default=function(){var e,t=Object(S.b)(),n=Object(S.c)((function(e){return e.movieSlice})),b=n.moviePagination,v=(n.isLoading,n.error,function(){var e=d.a.useState([]),t=Object(r.a)(e,2),n=t[0],a=t[1],i=d.a.useState(""),s=Object(r.a)(i,2),o=s[0],l=s[1],u=d.a.useState(!1),j=Object(r.a)(u,2),f=j[0],b=j[1];return d.a.useEffect((function(){function e(){return(e=Object(m.a)(g.a.mark((function e(){var t,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,b(!0),e.next=4,x.a.getAllLanguages();case 4:if(t=e.sent,n=t.response,!t.error){e.next=9;break}throw new Error("INTERNAL SERVER");case 9:a((function(e){return[].concat(Object(c.a)(e),Object(c.a)(n.data))})),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("Error",e.t0.message),l(e.t0.message);case 16:return e.prev=16,b(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[0,12,16,19]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),{languages:n,loading:f,error:o}}()),y=(v.languages,function(){var e=d.a.useState([]),t=Object(r.a)(e,2),n=t[0],a=t[1],i=d.a.useState(""),s=Object(r.a)(i,2),o=s[0],l=s[1],u=d.a.useState(!1),j=Object(r.a)(u,2),f=j[0],b=j[1];return d.a.useEffect((function(){function e(){return(e=Object(m.a)(g.a.mark((function e(){var t,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,b(!0),e.next=4,x.a.getAllGenres();case 4:if(t=e.sent,n=t.response,!t.error){e.next=9;break}throw new Error("INTERNAL SERVER");case 9:a((function(e){return[].concat(Object(c.a)(e),Object(c.a)(n.data))})),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("Error",e.t0.message),l(e.t0.message);case 16:return e.prev=16,b(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[0,12,16,19]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),{genres:n,loading:f,error:o}}()),I=y.genres,A=y.loading,C=Object(p.a)(1,12),L=C.resPagination,P=C.handlePageChange,R=d.a.useState([]),T=Object(r.a)(R,2),z=T[0],V=T[1];d.a.useEffect((function(){var e=Object(a.a)({},L);t(Object(E.j)(e))}),[t,L]),d.a.useEffect((function(){var e=Object(c.a)(z).toString().replaceAll(",","|");0!==z.length&&t(Object(E.d)({filter:e}))}),[t,z]);var D=function(){0!==z.length&&(V([]),t(Object(E.j)(L)))};return Object(h.jsx)("div",{className:"movielist",children:Object(h.jsxs)(_.a,{children:[A&&Object(h.jsx)(j.a,{}),Object(h.jsx)(O,{title:"Filter"}),Object(h.jsxs)(w.a,{children:[Object(h.jsxs)(N.a,{xl:3,lg:12,children:[Object(h.jsx)("div",{className:"filter filter__genres",children:Object(h.jsx)(i.a,{bordered:!1,defaultActiveKey:["1"],ghost:!0,children:Object(h.jsx)(k,{header:Object(h.jsx)("span",{className:"filter__text filter__text--title",children:"Genres"}),children:Object(h.jsx)(o.b,{size:[8,16],wrap:!0,children:null===I||void 0===I?void 0:I.slice(0,10).map((function(e,t){var n=-1!==z.findIndex((function(t){return t===e}))?"picked":"";return Object(h.jsx)(l.a,{className:"filter__btn filter__btn--genres filter__btn--".concat(n),onClick:function(){return function(e){if(-1===z.findIndex((function(t){return t===e}))&&z.length<4)V((function(t){return Array.from(new Set([].concat(Object(c.a)(t),[e])))}));else{4===z.length&&s.b.warn("The categories must be less than 4");var t=Object(c.a)(z);if(0===(t=t.filter((function(t){return t!==e}))).length)return void D();V(t)}}(e)},children:Object(h.jsx)("span",{className:"filter__text filter__text--genre",children:e})},t)}))})},"1")})}),Object(h.jsx)("div",{children:Object(h.jsx)(l.a,{className:"filter__btn filter__btn--clear",onClick:function(){return D()},children:"Clear"})})]}),Object(h.jsxs)(N.a,{xl:9,lg:12,children:[Object(h.jsx)(w.a,{children:null===(e=b.movies)||void 0===e?void 0:e.map((function(e){return Object(h.jsx)(N.a,{md:3,children:Object(h.jsx)(f.a,{movie:e})},e._id)}))}),Object(h.jsx)(w.a,{children:0===z.length&&Object(h.jsx)(u.a,{defaultCurrent:1,total:b.total,className:"pagination",onChange:function(e){P(e),window.scrollTo({top:0,behavior:"smooth"})}})})]})]})]})})}}}]);
//# sourceMappingURL=16.9001cbfc.chunk.js.map