(this.webpackJsonpcinema=this.webpackJsonpcinema||[]).push([[19],{446:function(e,a,r){"use strict";var s=r(471);a.a=s.a},447:function(e,a,r){"use strict";var s=r(461);a.a=s.a},449:function(e,a,r){"use strict";r.d(a,"b",(function(){return s})),r.d(a,"a",(function(){return t}));var s={labelCol:{span:24},wrapperCol:{span:24}},t={labelCol:{span:24},wrapperCol:{span:24}}},585:function(e,a,r){"use strict";r.r(a);var s=r(34),t=r(68),n=r(590),c=r(579),i=r(446),l=r(447),j=r(593),o=r(99),b=r(0),u=r.n(b),d=r(26),m=r(73),O=r(33),p=r(56),h=r(14),f=r(449),x=r(3);a.default=function(){var e=n.a.useForm(),a=Object(t.a)(e,1)[0],r=Object(p.b)(),b=Object(p.c)((function(e){return e.authSlice})),g=b.credential,w=b.isLoading,v=b.error,y=(b.isAuth,Object(d.g)()),P=u.a.useRef(!0);return u.a.useEffect((function(){if(!P.current)return v?c.b.error(v):void 0}),[v]),u.a.useEffect((function(){P.current||0!==Object.keys(g).length&&y.push(h.b.LOGIN)}),[g,y]),Object(x.jsx)(n.a,Object(s.a)(Object(s.a)({form:a},f.b),{},{name:"form",initialValues:{remember:!0},onFinish:function(e){P.current=!1,r(Object(O.h)(e))},children:Object(x.jsxs)(i.a,{justify:"center",className:"register",children:[Object(x.jsx)(l.a,{span:24,className:"register--username",children:Object(x.jsx)(n.a.Item,Object(s.a)(Object(s.a)({},f.a),{},{name:"username",label:"Username",rules:[{required:!0,message:"Please enter your username!"}],validateFirst:!0,children:Object(x.jsx)(j.a,{})}))}),Object(x.jsx)(l.a,{span:24,className:"register--email",children:Object(x.jsx)(n.a.Item,Object(s.a)(Object(s.a)({},f.a),{},{name:"email",label:"Email",rules:[{required:!0,message:"Please enter your email!"},{type:"email",message:"Email is invalid"}],validateFirst:!0,children:Object(x.jsx)(j.a,{})}))}),Object(x.jsx)(l.a,{span:24,children:Object(x.jsx)(n.a.Item,Object(s.a)(Object(s.a)({},f.a),{},{name:"password",label:"Password",rules:[{required:!0,message:"Please enter your password!"}],children:Object(x.jsx)(j.a.Password,{})}))}),Object(x.jsx)(l.a,{span:24,children:Object(x.jsx)(n.a.Item,Object(s.a)(Object(s.a)({},f.a),{},{name:"confirmPassword",label:"Confirm password",dependencies:["password"],rules:[{required:!0,message:"Please confirm your password!"},function(e){var a=e.getFieldValue;return{validator:function(e,r){return r&&a("password")!==r?Promise.reject(new Error("The two passwords that you entered do not match!")):Promise.resolve()}}}],children:Object(x.jsx)(j.a.Password,{})}))}),Object(x.jsx)(l.a,{span:24,children:Object(x.jsx)(n.a.Item,Object(s.a)(Object(s.a)({},f.a),{},{style:{textAlign:"center"},children:Object(x.jsx)(o.a,{loading:w,type:"primary",htmlType:"submit",className:"register__btn register__btn--registerLocal",children:"Register"})}))}),Object(x.jsx)(l.a,{span:24,children:Object(x.jsxs)(n.a.Item,{style:{textAlign:"center"},children:[Object(x.jsx)("span",{children:"Have an account? "}),Object(x.jsx)(m.b,{to:h.b.LOGIN,children:"Login now"})]})})]})}))}}}]);
//# sourceMappingURL=19.e0cc1b85.chunk.js.map