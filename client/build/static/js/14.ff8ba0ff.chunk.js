(this.webpackJsonpcinema=this.webpackJsonpcinema||[]).push([[14],{444:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var n=i(34),c=i(68),s=i(0),a=i.n(s);function o(e,t){var i=a.a.useState({page:e,size:t}),s=Object(c.a)(i,2),o=s[0],r=s[1];return{resPagination:o,handlePageChange:function(e){r(Object(n.a)(Object(n.a)({},o),{},{page:e}))}}}},451:function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));var n=i(580),c=i(0),s=i(73),a=i(14),o=(i(457),i(3)),r=Object(c.memo)((function(e){var t,i=e.movie,c=e.isHome;return Object(o.jsx)("div",{className:"movie ".concat(c?"movie-recommend":""),children:Object(o.jsx)(n.a,{hoverable:!0,cover:Object(o.jsx)("div",{className:"movie__poster",children:Object(o.jsx)(s.b,{to:{pathname:"".concat(a.b.MOVIEDETAIL,"/").concat(i._id)},children:Object(o.jsx)("img",{className:"movie__poster--img",alt:"",src:i.poster})})}),children:Object(o.jsxs)("div",{className:"movie__info",children:[Object(o.jsx)(s.b,{to:{pathname:"".concat(a.b.MOVIEDETAIL,"/").concat(i._id)},children:Object(o.jsx)("h1",{className:"movie__content movie__content--title",children:i.title})}),Object(o.jsx)("span",{className:"movie__content movie__content--genres ",children:null===(t=i.genres)||void 0===t?void 0:t.map((function(e){return e})).join(" / ")})]})})},i._id)}))},452:function(e,t,i){"use strict";var n=i(6),c=i(0),s=i(458);t.a=function(){var e=c.useState(!1),t=Object(n.a)(e,2),i=t[0],a=t[1];return c.useEffect((function(){a(Object(s.b)())}),[]),i}},455:function(e,t,i){"use strict";i(0);var n=i(73),c=(i(468),i(3));t.a=function(e){var t=e.title,i=e.subTitle,s=e.linkTo,a=e.state;return Object(c.jsxs)("div",{className:"heading-title",children:[Object(c.jsx)("h1",{children:t}),a?Object(c.jsx)(n.b,{to:{pathname:s,state:a},children:i}):Object(c.jsx)(n.b,{to:s,children:i})]})}},457:function(e,t,i){},458:function(e,t,i){"use strict";i.d(t,"a",(function(){return s})),i.d(t,"b",(function(){return a}));var n,c=i(63),s=function(){return Object(c.a)()&&window.document.documentElement},a=function(){if(!s())return!1;if(void 0!==n)return n;var e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e),n=1===e.scrollHeight,document.body.removeChild(e),n}},468:function(e,t,i){},469:function(e,t,i){"use strict";var n=i(34),c=i(444),s=i(0),a=i.n(s),o=i(460),r=i.n(o),l=i(36),d=i(56),j=(i(470),i(451)),b=i(3),u={dots:!0,infinite:!1,speed:500,slidesToShow:5,slidesToScroll:1};t.a=function(e){var t,i=e.movieRec,s=e.isHome,o=Object(d.b)(),m=Object(d.c)((function(e){return e.movieSlice})),v=(m.isLoading,m.moviePagination),O=Object(c.a)(1,10).resPagination;return a.a.useEffect((function(){if(!i){var e=Object(n.a)({},O);o(Object(l.j)(e))}}),[o,i,O]),Object(b.jsxs)("div",{className:"movie-rec ".concat(s?"":"movie-rec--detail"),children:[Object(b.jsx)(r.a,Object(n.a)(Object(n.a)({},u),{},{children:null===(t=v.movies)||void 0===t?void 0:t.map((function(e){return Object(b.jsx)("div",{className:s?"":"movie-rec--detail",children:Object(b.jsx)(j.a,{isHome:s,movie:e})},e._id)}))})),Object(b.jsx)("div",{className:s?"fence fence--home":"fence"})]})}},470:function(e,t,i){},521:function(e,t,i){},524:function(e,t,i){},596:function(e,t,i){"use strict";i.r(t);var n=i(455),c=i(469),s=i(34),a=i(502),o=i(444),r=i(0),l=i.n(r),d=i(522),j=i(523),b=i(460),u=i.n(b),m=i(36),v=i(56),O=i(14),h=(i(521),i(98)),f=i(451),x=i(3),p=(a.a.TabPane,{arrows:!1,centerMode:!0,infinite:!0,centerPadding:"0",slidesToShow:1,speed:400,rows:2,slidesPerRow:5,responsive:[{breakpoint:992,settings:{slidesToShow:1,slidesPerRow:3,initialSlide:3}},{breakpoint:756,settings:{slidesToShow:1,slidesPerRow:2,initialSlide:2}},{breakpoint:576,settings:{slidesToShow:2,slidesPerRow:1,slidesToScroll:1,rows:2}}]}),g=function(){var e,t=Object(v.b)(),i=Object(v.c)((function(e){return e.movieSlice})),c=i.moviePagination,a=i.isLoading,r=Object(o.a)(1,20).resPagination;return l.a.useEffect((function(){var e=Object(s.a)({},r);t(Object(m.j)(e))}),[t,r]),Object(x.jsx)("div",{className:"movies",children:Object(x.jsx)(d.a,{children:Object(x.jsxs)(j.a,{children:[!!a&&0===c.movies.length&&Object(x.jsx)(h.a,{}),Object(x.jsx)("div",{style:{paddingRight:25},children:Object(x.jsx)(n.a,{title:"Now Showing",linkTo:O.b.MOVIELIST,subTitle:"See all"})}),Object(x.jsx)(u.a,Object(s.a)(Object(s.a)({},p),{},{children:null===(e=c.movies)||void 0===e?void 0:e.map((function(e){return Object(x.jsx)("div",{className:"movies__item",children:Object(x.jsx)(f.a,{movie:e})},e._id)}))}))]})})})},w=i(438),_=(i(524),i.p+"static/media/premier.d3b5de74.webp");t.default=function(){return Object(x.jsxs)("div",{className:"home",children:[Object(x.jsx)(w.a,{children:Object(x.jsx)(g,{})}),Object(x.jsx)("section",{className:"premier",children:Object(x.jsxs)(w.a,{children:[Object(x.jsx)("img",{src:_,alt:""}),Object(x.jsx)("div",{className:"heading-title--hasFence",children:Object(x.jsx)(n.a,{title:"Premieres",linkTo:O.b.MOVIELIST,subTitle:"See all"})}),Object(x.jsx)("p",{children:"Brand new releases every Friday"}),Object(x.jsx)(c.a,{isHome:!0})]})})]})}}}]);
//# sourceMappingURL=14.ff8ba0ff.chunk.js.map