import{_ as z}from"./file_logoleave.b2556a4f.js";import{i as f,r as g,h as k,z as b,o as c,c as n,l as d,A as m,e as _,n as r,m as o,a as A,b as h,B,p as E,g as Q}from"./file_index.3b1825b6.js";import{_ as w}from"./file__plugin-vue_export-helper.e718e6fb.js";const R="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIEAgQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgQFAQMH/8QALhABAAICAAMGBAYDAAAAAAAAAAECAxEEITESIkFRYXEFMpGhE1JicoHhMzRC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAA6Dg64AAAAAAAAAAAAATaIiZmYiI6yKHH5ZnJGOJ7sRufcEsvHdYxRv9Uqts2S8969vqgLBKMl46Xt9Xti4zJWY7czevqrhBr4slcle1Sf6TZnBXmmeseFuUtNAAAAAAAAAAAZGae1lvM+Npa8sfLGsl4n80giAoAAli5ZaT+qGwxq/NHu2UAAAAAAAAAAHL77FtddTpizM2nc9Zbc8+TGvXs3mvlOgRHRRzRp0ByNxMabGCZthpNus1jbIiNzER1ls1js1ivlyQdAAAAAAAAAAU/iNeVL69NriOTHXJSaW6SDHCY1MwKAALnw6nO1/4heeeCkUxViPLc+r0QAAAAAAAAANwAhlzY8Ud+0RPhHi8s3F48e4rM3t6dGfkvOS83nlMgjM7mZ8wFAAGpw+fHelYi3eiOcS9mNWZraJjrE7X8PGUtERk7k/ZBaCJiY3E7gAAAAAeWbPTDHenn4RHVPJf8Olrz4RtkWtN7Ta07mQWr8df/itY9+avky5Mnz3mfTwQFgAAAAAAAAlTJek7paY9pWKcdkj5q1t9lUINTBxNM06jcW8pezFidTuJlrcNk/Fw1tPXpKD0AB5cX/rZPZlAuAAAAAAAAAAAAA0fh/8Agn90uhosAIP/2Q==",e=t=>(E("data-v-802eb48f"),t=t(),Q(),t),x={class:"is-flex is-justify-content-space-between p-2 nav-bar"},C=e(()=>A("div",{class:"name-logo"},[A("img",{src:z,alt:"",srcset:"",class:"logo"}),A("h1",{class:"is-size-3 pl-3"},"Progress")],-1)),H={class:"logout-div"},I=["src"],M={key:1,class:"logout-img",src:R},T=e(()=>A("i",{class:"fa-solid fa-arrow-right-from-bracket is-size-5"},null,-1)),O=[T],D=e(()=>A("div",{class:"modal-background"},null,-1)),G=e(()=>A("h1",{class:"has-text-weight-bold is-size-5"},"Are you sure you want to log out?",-1)),J=e(()=>A("button",{class:"modal-close is-large","aria-label":"close"},null,-1)),P={__name:"NavBar",setup(t){const a=f();g();const l=g(!1),s=k();console.log(a.currentRoute.value.name);const p=s.user?s.user.photo:"",i=()=>l.value=!l.value,N=async()=>{await B()===!0?(console.log("log out succesfull"),a.push({name:"login"}),s.logout(),console.log(s.id)):console.log("something went wrong")};return(v,S)=>{const u=b("router-link");return c(),n("nav",x,[C,d(u,{class:r(["has-text-weight-bold router-link",{prueba:o(a).currentRoute.value.name==="home"}]),to:{name:"home"}},{default:m(()=>[_("Home")]),_:1},8,["class"]),d(u,{class:r(["has-text-weight-bold router-link",{prueba:o(a).currentRoute.value.name==="user"}]),to:{name:"user"}},{default:m(()=>[_("Profile")]),_:1},8,["class"]),A("div",H,[o(s).user?(c(),n("img",{key:0,src:o(p),alt:"",class:"logout-img"},null,8,I)):h("",!0),o(s).user?h("",!0):(c(),n("img",M)),A("button",{class:"button logout-button",onClick:i},O)]),A("div",{class:r(["modal",{"is-active":l.value}])},[D,A("div",{class:"modal-content"},[A("div",{class:"box modal-box"},[G,A("div",{class:"m-5"},[A("button",{class:"button m-2",onClick:N},"Log Out "),A("button",{class:"button m-2",onClick:i},"Cancel")])])]),J],2)])}}},y=w(P,[["__scopeId","data-v-802eb48f"]]);export{y as N};