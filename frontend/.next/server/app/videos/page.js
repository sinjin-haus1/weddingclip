(()=>{var e={};e.id=55,e.ids=[55],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7547:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>d}),t(8790),t(6288),t(996);var a=t(170),i=t(5002),n=t(3876),o=t.n(n),s=t(6299),l={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>s[e]);t.d(r,l);let d=["",{children:["videos",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8790)),"/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/videos/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,6288)),"/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,996,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/videos/page.tsx"],u="/videos/page",p={require:t,loadChunk:()=>Promise.resolve()},h=new a.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/videos/page",pathname:"/videos",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},389:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,3642,23)),Promise.resolve().then(t.t.bind(t,7586,23)),Promise.resolve().then(t.t.bind(t,7838,23)),Promise.resolve().then(t.t.bind(t,8057,23)),Promise.resolve().then(t.t.bind(t,7741,23)),Promise.resolve().then(t.t.bind(t,3118,23))},1099:(e,r,t)=>{Promise.resolve().then(t.bind(t,1513))},8078:(e,r,t)=>{Promise.resolve().then(t.bind(t,9302)),Promise.resolve().then(t.bind(t,6740)),Promise.resolve().then(t.bind(t,4503))},3189:(e,r,t)=>{"use strict";t.d(r,{Z:()=>n});var a=t(531),i=t(7247);let n=(0,a.Z)((0,i.jsx)("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"}),"Share")},1513:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>en});var a=t(7247),i=t(8964),n=t(4178),o=t(4222),s=t(3104),l=t(4742),d=t(1090),c=t(2697),u=t(4435),p=t(4468),h=t(2844),m=t(436),v=t(8264),g=t(7150),f=t(981),b=t(3142),x=t(1929),y=t(3574),j=t(5314),I=t(1372),P=t(4759),Z=t(9380),w=t(5089),C=t(4280),$=t(9537),S=t(4974),k=t(7269),D=t(1358);function A(e){return(0,D.ZP)("MuiLinearProgress",e)}(0,k.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","bar1","bar2","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);let V=(0,P.F4)`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`,M="string"!=typeof V?(0,P.iv)`
        animation: ${V} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,U=(0,P.F4)`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`,T="string"!=typeof U?(0,P.iv)`
        animation: ${U} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,L=(0,P.F4)`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`,R="string"!=typeof L?(0,P.iv)`
        animation: ${L} 3s infinite linear;
      `:null,W=e=>{let{classes:r,variant:t,color:a}=e,i={root:["root",`color${(0,S.Z)(a)}`,t],dashed:["dashed",`dashedColor${(0,S.Z)(a)}`],bar1:["bar","bar1",`barColor${(0,S.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","bar2","buffer"!==t&&`barColor${(0,S.Z)(a)}`,"buffer"===t&&`color${(0,S.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,y.Z)(i,A,r)},q=(e,r)=>e.vars?e.vars.palette.LinearProgress[`${r}Bg`]:"light"===e.palette.mode?(0,j.$n)(e.palette[r].main,.62):(0,j._j)(e.palette[r].main,.5),E=(0,Z.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.root,r[`color${(0,S.Z)(t.color)}`],r[t.variant]]}})((0,w.Z)(({theme:e})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(e.palette).filter((0,C.Z)()).map(([r])=>({props:{color:r},style:{backgroundColor:q(e,r)}})),{props:({ownerState:e})=>"inherit"===e.color&&"buffer"!==e.variant,style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),G=(0,Z.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.dashed,r[`dashedColor${(0,S.Z)(t.color)}`]]}})((0,w.Z)(({theme:e})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(e.palette).filter((0,C.Z)()).map(([r])=>{let t=q(e,r);return{props:{color:r},style:{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`}}})]})),R||{animation:`${L} 3s infinite linear`}),O=(0,Z.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.bar,r.bar1,r[`barColor${(0,S.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&r.bar1Indeterminate,"determinate"===t.variant&&r.bar1Determinate,"buffer"===t.variant&&r.bar1Buffer]}})((0,w.Z)(({theme:e})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(e.palette).filter((0,C.Z)()).map(([r])=>({props:{color:r},style:{backgroundColor:(e.vars||e).palette[r].main}})),{props:{variant:"determinate"},style:{transition:"transform .4s linear"}},{props:{variant:"buffer"},style:{zIndex:1,transition:"transform .4s linear"}},{props:({ownerState:e})=>"indeterminate"===e.variant||"query"===e.variant,style:{width:"auto"}},{props:({ownerState:e})=>"indeterminate"===e.variant||"query"===e.variant,style:M||{animation:`${V} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),N=(0,Z.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.bar,r.bar2,r[`barColor${(0,S.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&r.bar2Indeterminate,"buffer"===t.variant&&r.bar2Buffer]}})((0,w.Z)(({theme:e})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(e.palette).filter((0,C.Z)()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(e.vars||e).palette[r].main}})),{props:({ownerState:e})=>"buffer"!==e.variant&&"inherit"!==e.color,style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:e})=>"buffer"!==e.variant&&"inherit"===e.color,style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(e.palette).filter((0,C.Z)()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:q(e,r),transition:"transform .4s linear"}})),{props:({ownerState:e})=>"indeterminate"===e.variant||"query"===e.variant,style:{width:"auto"}},{props:({ownerState:e})=>"indeterminate"===e.variant||"query"===e.variant,style:T||{animation:`${U} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),F=i.forwardRef(function(e,r){let t=(0,$.i)({props:e,name:"MuiLinearProgress"}),{className:i,color:n="primary",value:o,valueBuffer:s,variant:l="indeterminate",...d}=t,c={...t,color:n,variant:l},u=W(c),p=(0,I.V)(),h={},m={bar1:{},bar2:{}};if(("determinate"===l||"buffer"===l)&&void 0!==o){h["aria-valuenow"]=Math.round(o),h["aria-valuemin"]=0,h["aria-valuemax"]=100;let e=o-100;p&&(e=-e),m.bar1.transform=`translateX(${e}%)`}if("buffer"===l&&void 0!==s){let e=(s||0)-100;p&&(e=-e),m.bar2.transform=`translateX(${e}%)`}return(0,a.jsxs)(E,{className:(0,x.Z)(u.root,i),ownerState:c,role:"progressbar",...h,ref:r,...d,children:["buffer"===l?(0,a.jsx)(G,{className:u.dashed,ownerState:c}):null,(0,a.jsx)(O,{className:u.bar1,ownerState:c,style:m.bar1}),"determinate"===l?null:(0,a.jsx)(N,{className:u.bar2,ownerState:c,style:m.bar2})]})});var _=t(9027),B=t(9065),z=t(7528),H=t(6122),K=t(3275),Q=t(3187);let X=(0,t(531).Z)((0,a.jsx)("path",{d:"M8 5v14l11-7z"}),"PlayArrow");var Y=t(3189),J=t(4442),ee=t(2404),er=t(8330),et=t(2420);let ea={PENDING:"default",PROCESSING:"info",COMPLETED:"success",FAILED:"error"},ei={ELEGANT:"✨ Elegant",RUSTIC:"\uD83C\uDF3F Rustic",MODERN:"\uD83D\uDC8E Modern",CLASSIC:"\uD83D\uDCDC Classic",FLORAL:"\uD83D\uDC90 Floral"};function en(){return a.jsx(i.Suspense,{fallback:a.jsx("div",{children:"Loading..."}),children:a.jsx(eo,{})})}function eo(){let e=(0,n.useSearchParams)().get("vendorId")||"",[r,t]=(0,i.useState)(e),[x,y]=(0,i.useState)(""),[j,I]=(0,i.useState)("ELEGANT"),[P,Z]=(0,i.useState)(!1),[w,C]=(0,i.useState)(!1),[$,S]=(0,i.useState)(""),{data:k}=(0,J.aM)(er.e4),{data:D,refetch:A}=(0,J.aM)(er.hL,{variables:{vendorId:r},skip:!r}),{data:V,refetch:M}=(0,J.aM)(er.Hl,{variables:{vendorId:r||void 0}}),[U,{loading:T}]=(0,ee.D)(et.Qj),[L,{loading:R}]=(0,ee.D)(et.tU),W=async()=>{if(r&&x)try{await U({variables:{input:{vendorId:r,reviewId:x,templateStyle:j,duration:15}}}),M(),Z(!1)}catch(e){console.error("Failed to generate video:",e)}},q=async(e,r)=>{try{await L({variables:{videoId:$,input:{accountId:e,platform:r}}}),M(),C(!1)}catch(e){console.error("Failed to post:",e)}};return(0,a.jsxs)(o.Z,{children:[a.jsx(s.Z,{variant:"h4",sx:{mb:1,fontWeight:700},children:"Videos"}),a.jsx(s.Z,{variant:"body1",sx:{color:"text.secondary",mb:4},children:"Generate and manage wedding review videos"}),a.jsx(l.Z,{sx:{mb:4},children:a.jsx(d.Z,{children:(0,a.jsxs)(c.Z,{direction:{xs:"column",sm:"row"},spacing:2,alignItems:"flex-end",children:[(0,a.jsxs)(u.Z,{sx:{minWidth:200},fullWidth:!0,children:[a.jsx(p.Z,{children:"Vendor"}),(0,a.jsxs)(h.Z,{value:r,label:"Vendor",onChange:e=>{t(e.target.value),y("")},children:[a.jsx(m.Z,{value:"",children:a.jsx("em",{children:"Select vendor..."})}),k?.vendors?.map(e=>a.jsx(m.Z,{value:e.id,children:e.name},e.id))]})]}),a.jsx(v.Z,{variant:"contained",startIcon:a.jsx(X,{}),onClick:()=>Z(!0),disabled:!r||!D?.reviews?.length,children:"Generate Video"})]})})}),V?.videos?.length===0&&a.jsx(g.Z,{severity:"info",children:"No videos yet. Select a vendor and generate your first video!"}),V?.videos&&V.videos.length>0&&a.jsx(f.ZP,{container:!0,spacing:3,children:V.videos.map(e=>a.jsx(f.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,a.jsxs)(l.Z,{children:[(0,a.jsxs)(d.Z,{children:[(0,a.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"space-between",mb:2},children:[a.jsx(b.Z,{label:e.status,size:"small",color:ea[e.status]}),a.jsx(b.Z,{label:ei[e.templateStyle]||e.templateStyle,size:"small",variant:"outlined"})]}),"PROCESSING"===e.status&&a.jsx(F,{sx:{mb:2}}),"COMPLETED"===e.status&&e.outputUrl&&a.jsx(o.Z,{sx:{mb:2},children:a.jsx("video",{src:e.outputUrl,style:{width:"100%",borderRadius:8},controls:!0})}),"FAILED"===e.status&&a.jsx(g.Z,{severity:"error",sx:{mb:2},children:e.error||"Video generation failed"}),(0,a.jsxs)(s.Z,{variant:"body2",sx:{color:"text.secondary"},children:[e.duration,"s •"," ",e.socialPostUrls?.length||0," social posts"]})]}),"COMPLETED"===e.status&&a.jsx(_.Z,{sx:{px:2,pb:2},children:a.jsx(v.Z,{size:"small",variant:"outlined",startIcon:a.jsx(Y.Z,{}),onClick:()=>{S(e.id),C(!0)},sx:{borderColor:"primary.main",color:"primary.main"},children:"Post to Social"})})]})},e.id))}),(0,a.jsxs)(B.Z,{open:P,onClose:()=>Z(!1),maxWidth:"sm",fullWidth:!0,children:[a.jsx(z.Z,{children:"Generate New Video"}),a.jsx(H.Z,{children:(0,a.jsxs)(c.Z,{spacing:3,sx:{mt:1},children:[(0,a.jsxs)(u.Z,{fullWidth:!0,children:[a.jsx(p.Z,{children:"Select Review"}),a.jsx(h.Z,{value:x,label:"Select Review",onChange:e=>y(e.target.value),children:D?.reviews?.map(e=>a.jsxs(m.Z,{value:e.id,children:['"',e.text.substring(0,50),'..." - ',e.reviewerName," (",e.rating,"★)"]},e.id))})]}),(0,a.jsxs)(u.Z,{fullWidth:!0,children:[a.jsx(p.Z,{children:"Template Style"}),a.jsx(h.Z,{value:j,label:"Template Style",onChange:e=>I(e.target.value),children:Object.entries(ei).map(([e,r])=>a.jsx(m.Z,{value:e,children:r},e))})]})]})}),(0,a.jsxs)(K.Z,{children:[a.jsx(v.Z,{onClick:()=>Z(!1),children:"Cancel"}),a.jsx(v.Z,{variant:"contained",onClick:W,disabled:T||!x,startIcon:T?a.jsx(Q.Z,{size:20,color:"inherit"}):null,children:T?"Generating...":"Generate"})]})]}),(0,a.jsxs)(B.Z,{open:w,onClose:()=>C(!1),maxWidth:"xs",fullWidth:!0,children:[a.jsx(z.Z,{children:"Post to Social"}),(0,a.jsxs)(H.Z,{children:[a.jsx(s.Z,{variant:"body2",sx:{color:"text.secondary",mb:2},children:"Select a platform to post this video"}),a.jsx(c.Z,{spacing:2,children:["TIKTOK","INSTAGRAM","YOUTUBE"].map(e=>(0,a.jsxs)(v.Z,{variant:"outlined",onClick:()=>q("default-account-id",e),disabled:R,fullWidth:!0,children:["TIKTOK"===e&&"\uD83D\uDCF1 ","INSTAGRAM"===e&&"\uD83D\uDCF8 ","YOUTUBE"===e&&"▶️ ",e.charAt(0)+e.slice(1).toLowerCase()]},e))})]}),a.jsx(K.Z,{children:a.jsx(v.Z,{onClick:()=>C(!1),children:"Cancel"})})]})]})}},9302:(e,r,t)=>{"use strict";t.d(r,{default:()=>h});var a=t(7247),i=t(2747),n=t(7841),o=t(2191),s=t(3104),l=t(331),d=t(4661),c=t(9906),u=t(4178);let p=[{label:"Dashboard",href:"/"},{label:"Discover Vendors",href:"/discover"},{label:"My Vendors",href:"/vendors"},{label:"Videos",href:"/videos"},{label:"Social Accounts",href:"/social"}];function h(){let e=(0,u.usePathname)(),r=p.findIndex(r=>r.href===e);return a.jsx(i.Z,{position:"static",sx:{background:"linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",borderBottom:"1px solid rgba(201, 169, 98, 0.3)"},children:a.jsx(n.Z,{maxWidth:"xl",children:(0,a.jsxs)(o.Z,{disableGutters:!0,sx:{gap:4},children:[a.jsx(s.Z,{variant:"h6",sx:{color:"primary.main",fontWeight:700,letterSpacing:1,display:"flex",alignItems:"center",gap:1},children:"\uD83D\uDC8D WeddingClip"}),a.jsx(l.Z,{value:r>=0?r:0,sx:{flexGrow:1,"& .MuiTabs-indicator":{backgroundColor:"primary.main"}},children:p.map((e,r)=>a.jsx(d.Z,{label:e.label,component:c.default,href:e.href,sx:{color:"text.secondary","&.Mui-selected":{color:"primary.main"},fontWeight:500}},e.href))})]})})})}},2420:(e,r,t)=>{"use strict";t.d(r,{Qj:()=>n,t7:()=>i,tU:()=>o,wv:()=>l,yj:()=>s});var a=t(9674);(0,a.Ps)`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
      id
      name
      category
      location {
        city
        state
        lat
        lng
      }
      googlePlaceId
      logoUrl
      website
    }
  }
`;let i=(0,a.Ps)`
  mutation ImportVendorFromGooglePlace($placeId: String!, $category: VendorCategory!) {
    importVendorFromGooglePlace(placeId: $placeId, category: $category) {
      id
      name
      category
      googlePlaceId
      location {
        city
        state
      }
    }
  }
`;(0,a.Ps)`
  mutation UpdateVendor($id: ID!, $input: UpdateVendorInput!) {
    updateVendor(id: $id, input: $input) {
      id
      name
      category
      location {
        city
        state
      }
      logoUrl
      website
    }
  }
`,(0,a.Ps)`
  mutation DeleteVendor($id: ID!) {
    deleteVendor(id: $id)
  }
`;let n=(0,a.Ps)`
  mutation GenerateVideo($input: GenerateVideoInput!) {
    generateVideo(input: $input) {
      id
      vendorId
      reviewIds
      status
      outputUrl
      templateStyle
      duration
      error
    }
  }
`,o=(0,a.Ps)`
  mutation PostToSocial($videoId: ID!, $input: PostToSocialInput!) {
    postToSocial(videoId: $videoId, input: $input) {
      id
      status
      socialPostUrls {
        platform
        url
        postedAt
        postId
      }
    }
  }
`;(0,a.Ps)`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      vendorId
      reviewerName
      rating
      text
      date
    }
  }
`;let s=(0,a.Ps)`
  mutation ConnectSocial($input: ConnectSocialInput!) {
    connectSocial(input: $input) {
      id
      vendorId
      platform
      accountName
      accountId
    }
  }
`,l=(0,a.Ps)`
  mutation DisconnectSocial($id: ID!) {
    disconnectSocial(id: $id)
  }
`},8330:(e,r,t)=>{"use strict";t.d(r,{Hl:()=>o,e4:()=>i,hL:()=>s,ll:()=>n,z3:()=>l});var a=t(9674);let i=(0,a.Ps)`
  query Vendors($category: VendorCategory) {
    vendors(category: $category) {
      id
      name
      category
      location {
        city
        state
        lat
        lng
      }
      googlePlaceId
      logoUrl
      website
      socialAccounts {
        instagram
        facebook
        tiktok
        youtube
        website
      }
    }
  }
`;(0,a.Ps)`
  query Vendor($id: ID!) {
    vendor(id: $id) {
      id
      name
      category
      location {
        city
        state
        lat
        lng
        zip
      }
      googlePlaceId
      logoUrl
      website
      socialAccounts {
        instagram
        facebook
        tiktok
        youtube
        website
      }
      createdAt
      updatedAt
    }
  }
`;let n=(0,a.Ps)`
  query DiscoverVendors($input: DiscoverVendorsInput!) {
    discoverVendors(input: $input) {
      vendors {
        placeId
        name
        address
        city
        state
        lat
        lng
        rating
        reviewCount
        photos
        website
        phone
        category
      }
      nextPageToken
      totalResults
    }
  }
`;(0,a.Ps)`
  query SearchNearbyVendors($lat: Int!, $lng: Int!, $category: VendorCategory!, $radius: Int) {
    searchNearbyVendors(lat: $lat, lng: $lng, category: $category, radius: $radius) {
      vendors {
        placeId
        name
        address
        city
        state
        lat
        lng
        rating
        reviewCount
        photos
        website
        category
      }
      totalResults
    }
  }
`;let o=(0,a.Ps)`
  query Videos($vendorId: ID, $status: VideoStatus) {
    videos(vendorId: $vendorId, status: $status) {
      id
      vendorId
      reviewIds
      status
      outputUrl
      templateStyle
      duration
      socialPostUrls {
        platform
        url
        postedAt
        postId
      }
      error
      createdAt
      updatedAt
    }
  }
`;(0,a.Ps)`
  query Video($id: ID!) {
    video(id: $id) {
      id
      vendorId
      reviewIds
      status
      outputUrl
      templateStyle
      duration
      socialPostUrls {
        platform
        url
        postedAt
        postId
      }
      error
      createdAt
      updatedAt
    }
  }
`;let s=(0,a.Ps)`
  query Reviews($vendorId: ID!) {
    reviews(vendorId: $vendorId) {
      id
      vendorId
      reviewerName
      rating
      text
      date
      sentimentScore
      usedInVideo
      createdAt
    }
  }
`,l=(0,a.Ps)`
  query SocialAccounts($vendorId: ID!) {
    socialAccounts(vendorId: $vendorId) {
      id
      vendorId
      platform
      accountName
      accountId
      expiresAt
      createdAt
    }
  }
`},6740:(e,r,t)=>{"use strict";t.d(r,{ApolloWrapper:()=>d});var a=t(7247),i=t(6662),n=t(6169),o=t(7332),s=t(7441),l=t(8964);function d({children:e}){let[r]=(0,l.useState)(()=>new n.f({link:new o.u({uri:"http://localhost:4000/graphql",credentials:"include"}),cache:new s.h,defaultOptions:{watchQuery:{fetchPolicy:"cache-and-network"}}}));return a.jsx(i.e,{client:r,children:e})}},4503:(e,r,t)=>{"use strict";t.d(r,{default:()=>d});var a=t(7247),i=t(6368),n=t(7833),o=t(9299),s=t(9143);let l=(0,i.Z)({palette:{mode:"dark",primary:{main:"#c9a962",light:"#e0c988",dark:"#9a7b3a"},secondary:{main:"#1a1a2e",light:"#2d2d4a",dark:"#0f0f1a"},background:{default:"#0f0f1a",paper:"#1a1a2e"},text:{primary:"#f8f8f2",secondary:"#a0a0b0"}},typography:{fontFamily:'"Inter", "Roboto", "Helvetica", "Arial", sans-serif',h1:{fontWeight:700},h2:{fontWeight:600},h3:{fontWeight:600},h4:{fontWeight:600},h5:{fontWeight:500},h6:{fontWeight:500}},shape:{borderRadius:12},components:{MuiButton:{styleOverrides:{root:{textTransform:"none",fontWeight:600}}},MuiCard:{styleOverrides:{root:{backgroundImage:"none",border:"1px solid rgba(201, 169, 98, 0.2)"}}},MuiChip:{styleOverrides:{root:{fontWeight:500}}}}});function d({children:e}){return a.jsx(s.Z,{options:{enableCssLayer:!0},children:(0,a.jsxs)(n.Z,{theme:l,children:[a.jsx(o.ZP,{}),e]})})}},6288:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>d,metadata:()=>l});var a=t(2051),i=t(5347);let n=(0,i.createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/theme/ThemeRegistry.tsx#default`),o=(0,i.createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/lib/apollo-provider.tsx#ApolloWrapper`),s=(0,i.createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/components/AppHeader.tsx#default`),l={title:"WeddingClip - AI Video Generator for Wedding Vendors",description:"Transform Google reviews into elegant TikTok and Shorts videos for wedding vendors"};function d({children:e}){return a.jsx("html",{lang:"en",children:a.jsx("body",{children:a.jsx(o,{children:(0,a.jsxs)(n,{children:[a.jsx(s,{}),a.jsx("main",{style:{padding:"24px",maxWidth:"1400px",margin:"0 auto"},children:e})]})})})})}},8790:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});let a=(0,t(5347).createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/videos/page.tsx#default`)}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[693,26,622,236,141],()=>t(7547));module.exports=a})();