(this.webpackJsonppokemons=this.webpackJsonppokemons||[]).push([[0],{120:function(t,e,n){},155:function(t,e,n){},156:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(31),i=n.n(c),o=(n(120),n(24)),s=n(25),u=n(28),p=n(27),l=n(162),j=n(164),g=n(43),h=n(19),b=n.n(h),m=n(33),O=n(61),f=n(41),d=n(159),x=n(6),v=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={changeSize:!1},t.onChangePaginationSize=function(){var e=Object(m.a)(b.a.mark((function e(n,a,r){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.setState({changeSize:!0});case 2:t.props.setPaginationLimit(a);case 3:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),t.onChangePagination=function(e){t.state.changeSize?t.setState({changeSize:!1}):t.props.setPaginationCurrent(e)},t}return Object(s.a)(n,[{key:"render",value:function(){var t=this.props.pagination,e=t.page,n=t.limit,a=this.props.itemsCount;return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(O.a,{justify:"center",className:"pagination-margin",children:Object(x.jsx)(f.a,{children:Object(x.jsx)(d.a,{defaultCurrent:e,total:a,onChange:this.onChangePagination,defaultPageSize:n,onShowSizeChange:this.onChangePaginationSize})})})})}}]),n}(a.Component),k=n(160),y=n(161),P=n(114),S=n(107),w=n.n(S).a.create({baseURL:"https://pokeapi.co/api/v2/"}),C=function(){var t=Object(m.a)(b.a.mark((function t(e){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.get("/pokemon?limit="+e.limit+"&offset="+e.offset,null);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),F=function(){var t=Object(m.a)(b.a.mark((function t(e){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.get("/pokemon/"+e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();var E=n(58),L=n(165),I=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("div",{className:"center-on-the-page",children:Object(x.jsx)(L.a,{tip:"Loading...",size:"large"})})})}}]),n}(a.Component),z=k.a.Meta,N=Object(E.b)(null,{getPokemon:function(t){return Object(m.a)(b.a.mark((function e(){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F(t).then((function(t){return t})).catch((function(t){return t}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})))}})(function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={pokemon:null,styleWidth:300,imageWidth:300,loading:!0},t.getPokemon=Object(m.a)(b.a.mark((function e(){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.props.getPokemon(t.props.pokemon.name);case 2:return n=e.sent,e.next=5,t.setState({pokemon:n});case 5:t.setState({loading:!1});case 6:case"end":return e.stop()}}),e)}))),t}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.getPokemon()}},{key:"render",value:function(){var t=this.state,e=t.loading,n=t.pokemon,a=t.styleWidth,r=t.imageWidth;return Object(x.jsx)(x.Fragment,{children:!e&&Object(x.jsx)(k.a,{loading:e,style:{width:a},cover:Object(x.jsxs)(x.Fragment,{children:[e&&Object(x.jsx)(I,{}),!e&&Object(x.jsx)(y.a,{height:r,alt:"example",src:n.sprites.other.dream_world.front_default})]}),actions:[Object(x.jsx)(P.a,{},"accept")],children:Object(x.jsx)(z,{title:n.name.charAt(0).toUpperCase()+n.name.slice(1),description:"Base experience: "+n.base_experience})})})}}]),n}(a.Component)),T=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={},t}return Object(s.a)(n,[{key:"render",value:function(){return Object(x.jsx)(x.Fragment,{})}}]),n}(a.Component),_=Object(E.b)(null,{getPokemons:function(t){return Object(m.a)(b.a.mark((function e(){var n,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={limit:t.limit,offset:t.page},e.next=3,C(n).then((function(t){return t})).catch((function(t){return t}));case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})))}})(function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={loading:!0,pokemons:null,itemsCount:0,pagination:{page:0,limit:20}},t.getPokemonsInPage=Object(m.a)(b.a.mark((function e(){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.setState({loading:!0}),e.next=3,t.props.getPokemons(t.state.pagination);case 3:n=e.sent,t.setState({itemsCount:n.count}),console.log(t.state.pagination),t.setState({pokemons:n.results}),t.setState({loading:!1});case 8:case"end":return e.stop()}}),e)}))),t.setPaginationLimit=function(e){var n="/?page="+t.state.pagination.page+"&limit="+e;t.setState({pagination:Object(g.a)(Object(g.a)({},t.state.pagination),{},{limit:e})}),t.props.history.push(n),t.getPokemonsInPage()},t.setPaginationCurrent=function(e){var n=t.state.pagination.limit,a="/?page="+e;a+=n?"&limit="+n:"",t.setState({pagination:Object(g.a)(Object(g.a)({},t.state.pagination),{},{page:e})}),t.props.history.push(a),t.getPokemonsInPage()},t.getQuery=function(e){var n=t.props.location.search;return new URLSearchParams(n).get(e)},t.setPokemonFilter=function(t){},t}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var t=Object(m.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.next=3,this.getQuery("page");case 3:if(!t.sent){t.next=9;break}return t.next=6,this.getQuery("page");case 6:t.t1=t.sent,t.next=10;break;case 9:t.t1=0;case 10:return t.t2=t.t1,t.next=13,this.getQuery("limit");case 13:if(!t.sent){t.next=19;break}return t.next=16,this.getQuery("limit");case 16:t.t3=t.sent,t.next=20;break;case 19:t.t3=20;case 20:return t.t4=t.t3,t.t5={page:t.t2,limit:t.t4},t.t6={pagination:t.t5},t.t0.setState.call(t.t0,t.t6),t.next=26,this.getPokemonsInPage();case 26:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this.state,e=t.loading,n=t.pagination,a=t.pokemons,r=t.itemsCount;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(T,{setPokemonFilter:this.setPokemonFilter}),e&&Object(x.jsx)(I,{}),!e&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(O.a,{justify:"space-around",gutter:[8,40],children:a.map((function(t,e){return Object(x.jsx)(f.a,{children:Object(x.jsx)(N,{pokemon:t})},e)}))}),Object(x.jsx)(v,{pagination:n,itemsCount:r,setPaginationLimit:this.setPaginationLimit,setPaginationCurrent:this.setPaginationCurrent})]})]})}}]),n}(a.Component)),M=l.a.Header,A=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(M,{children:Object(x.jsx)("div",{className:"logo",children:Object(x.jsx)("img",{src:"../../common/images/logo.png",alt:"Logo"})})})})}}]),n}(a.Component),D=n(109),Q=n(18),R=l.a.Content,U=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(x.jsx)(D.a,{children:Object(x.jsxs)(l.a,{className:"layout",children:[Object(x.jsx)(j.a,{offsetTop:0,children:Object(x.jsx)(A,{})}),Object(x.jsx)(R,{className:"min-height-100vh",children:Object(x.jsxs)(Q.c,{children:[Object(x.jsx)(Q.a,{path:"/?page=:page&limit=:limit",component:_}),Object(x.jsx)(Q.a,{path:"/page=:page",component:_}),Object(x.jsx)(Q.a,{path:"/",component:_})]})})]})})}}]),n}(a.Component),W=(n(154),n(155),n(82)),B=n(110),J={token:localStorage.getItem("token")};var K=window.REDUX_DEVTOOLS_EXTENSION_COMPOSE||W.b,V=Object(W.c)((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_TOKEN":localStorage.setItem("token",e.payload),t=Object(g.a)(Object(g.a)({},t),{},{token:e.payload});break;case"REMOVE_TOKEN":localStorage.removeItem("token"),t=Object(g.a)(Object(g.a)({},t),{},{token:null});break;default:console.log()}return t}),K(Object(W.a)(B.a)));var X=function(){return Object(x.jsx)(E.a,{store:V,children:Object(x.jsx)(U,{})})},H=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,166)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),c(t),i(t)}))};i.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(X,{})}),document.getElementById("root")),H()}},[[156,1,2]]]);
//# sourceMappingURL=main.2a658ec6.chunk.js.map