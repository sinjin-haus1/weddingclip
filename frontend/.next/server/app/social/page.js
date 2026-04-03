(()=>{var e={};e.id=674,e.ids=[674],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1353:(e,t,o)=>{"use strict";o.r(t),o.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>l}),o(7764),o(6288),o(996);var r=o(170),n=o(5002),a=o(3876),i=o.n(a),s=o(6299),d={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>s[e]);o.d(t,d);let l=["",{children:["social",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(o.bind(o,7764)),"/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/social/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(o.bind(o,6288)),"/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(o.t.bind(o,996,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/social/page.tsx"],u="/social/page",p={require:o,loadChunk:()=>Promise.resolve()},h=new r.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/social/page",pathname:"/social",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},389:(e,t,o)=>{Promise.resolve().then(o.t.bind(o,3642,23)),Promise.resolve().then(o.t.bind(o,7586,23)),Promise.resolve().then(o.t.bind(o,7838,23)),Promise.resolve().then(o.t.bind(o,8057,23)),Promise.resolve().then(o.t.bind(o,7741,23)),Promise.resolve().then(o.t.bind(o,3118,23))},1065:(e,t,o)=>{Promise.resolve().then(o.bind(o,3087))},8078:(e,t,o)=>{Promise.resolve().then(o.bind(o,9302)),Promise.resolve().then(o.bind(o,6740)),Promise.resolve().then(o.bind(o,4503))},6988:(e,t,o)=>{"use strict";o.d(t,{Z:()=>a});var r=o(531),n=o(7247);let a=(0,r.Z)((0,n.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},6055:(e,t,o)=>{"use strict";o.d(t,{Z:()=>a});var r=o(531),n=o(7247);let a=(0,r.Z)((0,n.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")},3087:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>V});var r=o(7247),n=o(4222),a=o(3104),i=o(8264),s=o(7150),d=o(4742),l=o(1090),c=o(981),u=o(3142),p=o(9027),h=o(9065),g=o(7528),x=o(6122),m=o(2697),v=o(4435),f=o(4468),y=o(2844),b=o(436),I=o(3275),j=o(6988),w=o(6055),P=o(8964),Z=o(4442),$=o(2404),k=o(8330),A=o(2420);let C={TIKTOK:"#ff0050",INSTAGRAM:"#e1306c",YOUTUBE:"#ff0000"},T={TIKTOK:"TikTok",INSTAGRAM:"Instagram",YOUTUBE:"YouTube"};function V(){let[e,t]=(0,P.useState)(!1),[o,V]=(0,P.useState)(""),[S,U]=(0,P.useState)("TIKTOK"),[D,W]=(0,P.useState)(""),{data:M}=(0,Z.aM)(k.e4),{data:q,refetch:G}=(0,Z.aM)(k.z3,{variables:{vendorId:""},skip:!0}),[_]=(0,$.D)(A.yj),[O]=(0,$.D)(A.wv),N=async()=>{if(o&&S)try{await _({variables:{input:{vendorId:o,platform:S,accountName:D||void 0,accessToken:"placeholder-access-token"}}}),t(!1),W("")}catch(e){console.error("Failed to connect social account:",e)}},R=async e=>{try{await O({variables:{id:e}})}catch(e){console.error("Failed to disconnect:",e)}};return(0,r.jsxs)(n.Z,{children:[(0,r.jsxs)(n.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:4},children:[(0,r.jsxs)(n.Z,{children:[r.jsx(a.Z,{variant:"h4",sx:{mb:1,fontWeight:700},children:"Social Accounts"}),r.jsx(a.Z,{variant:"body1",sx:{color:"text.secondary"},children:"Connect TikTok, Instagram, or YouTube to auto-post videos"})]}),r.jsx(i.Z,{variant:"contained",startIcon:r.jsx(j.Z,{}),onClick:()=>t(!0),children:"Connect Account"})]}),r.jsx(s.Z,{severity:"info",sx:{mb:4},children:"Connect your social media accounts to automatically post generated videos. OAuth authentication is handled securely through each platform."}),!q?.socialAccounts?.length&&r.jsx(d.Z,{sx:{textAlign:"center",py:6},children:(0,r.jsxs)(l.Z,{children:[r.jsx(a.Z,{variant:"h6",sx:{mb:2},children:"No connected accounts"}),r.jsx(a.Z,{variant:"body2",sx:{color:"text.secondary",mb:3},children:"Connect TikTok, Instagram, or YouTube to start posting videos automatically"}),r.jsx(i.Z,{variant:"contained",startIcon:r.jsx(j.Z,{}),onClick:()=>t(!0),children:"Connect Account"})]})}),q?.socialAccounts&&q.socialAccounts.length>0&&r.jsx(c.ZP,{container:!0,spacing:3,children:q.socialAccounts.map(e=>r.jsx(c.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,r.jsxs)(d.Z,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsxs)(n.Z,{sx:{display:"flex",justifyContent:"space-between",mb:2},children:[r.jsx(a.Z,{variant:"h6",children:T[e.platform]||e.platform}),r.jsx(u.Z,{label:"Connected",size:"small",sx:{backgroundColor:`${C[e.platform]||"#888"}20`,color:C[e.platform]||"#888",fontWeight:600}})]}),e.accountName&&(0,r.jsxs)(a.Z,{variant:"body2",sx:{color:"text.secondary"},children:["@",e.accountName]})]}),r.jsx(p.Z,{sx:{px:2,pb:2},children:r.jsx(i.Z,{size:"small",variant:"outlined",color:"error",startIcon:r.jsx(w.Z,{}),onClick:()=>R(e.id),children:"Disconnect"})})]})},e.id))}),(0,r.jsxs)(h.Z,{open:e,onClose:()=>t(!1),maxWidth:"xs",fullWidth:!0,children:[r.jsx(g.Z,{children:"Connect Social Account"}),r.jsx(x.Z,{children:(0,r.jsxs)(m.Z,{spacing:3,sx:{mt:1},children:[(0,r.jsxs)(v.Z,{fullWidth:!0,children:[r.jsx(f.Z,{children:"Vendor"}),r.jsx(y.Z,{value:o,label:"Vendor",onChange:e=>V(e.target.value),children:M?.vendors?.map(e=>r.jsx(b.Z,{value:e.id,children:e.name},e.id))})]}),(0,r.jsxs)(v.Z,{fullWidth:!0,children:[r.jsx(f.Z,{children:"Platform"}),(0,r.jsxs)(y.Z,{value:S,label:"Platform",onChange:e=>U(e.target.value),children:[r.jsx(b.Z,{value:"TIKTOK",children:"TikTok"}),r.jsx(b.Z,{value:"INSTAGRAM",children:"Instagram"}),r.jsx(b.Z,{value:"YOUTUBE",children:"YouTube"})]})]}),r.jsx(s.Z,{severity:"warning",children:"In production, this would redirect to OAuth flow. Placeholder token is used for development."})]})}),(0,r.jsxs)(I.Z,{children:[r.jsx(i.Z,{onClick:()=>t(!1),children:"Cancel"}),r.jsx(i.Z,{variant:"contained",onClick:N,disabled:!o,children:"Connect"})]})]})]})}},9302:(e,t,o)=>{"use strict";o.d(t,{default:()=>h});var r=o(7247),n=o(2747),a=o(7841),i=o(2191),s=o(3104),d=o(331),l=o(4661),c=o(9906),u=o(4178);let p=[{label:"Dashboard",href:"/"},{label:"Discover Vendors",href:"/discover"},{label:"My Vendors",href:"/vendors"},{label:"Videos",href:"/videos"},{label:"Social Accounts",href:"/social"}];function h(){let e=(0,u.usePathname)(),t=p.findIndex(t=>t.href===e);return r.jsx(n.Z,{position:"static",sx:{background:"linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",borderBottom:"1px solid rgba(201, 169, 98, 0.3)"},children:r.jsx(a.Z,{maxWidth:"xl",children:(0,r.jsxs)(i.Z,{disableGutters:!0,sx:{gap:4},children:[r.jsx(s.Z,{variant:"h6",sx:{color:"primary.main",fontWeight:700,letterSpacing:1,display:"flex",alignItems:"center",gap:1},children:"\uD83D\uDC8D WeddingClip"}),r.jsx(d.Z,{value:t>=0?t:0,sx:{flexGrow:1,"& .MuiTabs-indicator":{backgroundColor:"primary.main"}},children:p.map((e,t)=>r.jsx(l.Z,{label:e.label,component:c.default,href:e.href,sx:{color:"text.secondary","&.Mui-selected":{color:"primary.main"},fontWeight:500}},e.href))})]})})})}},2420:(e,t,o)=>{"use strict";o.d(t,{Qj:()=>a,t7:()=>n,tU:()=>i,wv:()=>d,yj:()=>s});var r=o(9674);(0,r.Ps)`
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
`;let n=(0,r.Ps)`
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
`;(0,r.Ps)`
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
`,(0,r.Ps)`
  mutation DeleteVendor($id: ID!) {
    deleteVendor(id: $id)
  }
`;let a=(0,r.Ps)`
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
`,i=(0,r.Ps)`
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
`;(0,r.Ps)`
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
`;let s=(0,r.Ps)`
  mutation ConnectSocial($input: ConnectSocialInput!) {
    connectSocial(input: $input) {
      id
      vendorId
      platform
      accountName
      accountId
    }
  }
`,d=(0,r.Ps)`
  mutation DisconnectSocial($id: ID!) {
    disconnectSocial(id: $id)
  }
`},8330:(e,t,o)=>{"use strict";o.d(t,{Hl:()=>i,e4:()=>n,hL:()=>s,ll:()=>a,z3:()=>d});var r=o(9674);let n=(0,r.Ps)`
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
`;(0,r.Ps)`
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
`;let a=(0,r.Ps)`
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
`;(0,r.Ps)`
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
`;let i=(0,r.Ps)`
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
`;(0,r.Ps)`
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
`;let s=(0,r.Ps)`
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
`,d=(0,r.Ps)`
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
`},6740:(e,t,o)=>{"use strict";o.d(t,{ApolloWrapper:()=>l});var r=o(7247),n=o(6662),a=o(6169),i=o(7332),s=o(7441),d=o(8964);function l({children:e}){let[t]=(0,d.useState)(()=>new a.f({link:new i.u({uri:"http://localhost:4000/graphql",credentials:"include"}),cache:new s.h,defaultOptions:{watchQuery:{fetchPolicy:"cache-and-network"}}}));return r.jsx(n.e,{client:t,children:e})}},4503:(e,t,o)=>{"use strict";o.d(t,{default:()=>l});var r=o(7247),n=o(6368),a=o(7833),i=o(9299),s=o(9143);let d=(0,n.Z)({palette:{mode:"dark",primary:{main:"#c9a962",light:"#e0c988",dark:"#9a7b3a"},secondary:{main:"#1a1a2e",light:"#2d2d4a",dark:"#0f0f1a"},background:{default:"#0f0f1a",paper:"#1a1a2e"},text:{primary:"#f8f8f2",secondary:"#a0a0b0"}},typography:{fontFamily:'"Inter", "Roboto", "Helvetica", "Arial", sans-serif',h1:{fontWeight:700},h2:{fontWeight:600},h3:{fontWeight:600},h4:{fontWeight:600},h5:{fontWeight:500},h6:{fontWeight:500}},shape:{borderRadius:12},components:{MuiButton:{styleOverrides:{root:{textTransform:"none",fontWeight:600}}},MuiCard:{styleOverrides:{root:{backgroundImage:"none",border:"1px solid rgba(201, 169, 98, 0.2)"}}},MuiChip:{styleOverrides:{root:{fontWeight:500}}}}});function l({children:e}){return r.jsx(s.Z,{options:{enableCssLayer:!0},children:(0,r.jsxs)(a.Z,{theme:d,children:[r.jsx(i.ZP,{}),e]})})}},6288:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>l,metadata:()=>d});var r=o(2051),n=o(5347);let a=(0,n.createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/theme/ThemeRegistry.tsx#default`),i=(0,n.createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/lib/apollo-provider.tsx#ApolloWrapper`),s=(0,n.createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/components/AppHeader.tsx#default`),d={title:"WeddingClip - AI Video Generator for Wedding Vendors",description:"Transform Google reviews into elegant TikTok and Shorts videos for wedding vendors"};function l({children:e}){return r.jsx("html",{lang:"en",children:r.jsx("body",{children:r.jsx(i,{children:(0,r.jsxs)(a,{children:[r.jsx(s,{}),r.jsx("main",{style:{padding:"24px",maxWidth:"1400px",margin:"0 auto"},children:e})]})})})})}},7764:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>r});let r=(0,o(5347).createProxy)(String.raw`/Users/sinjinhaus/.openclaw/workspace/weddingclip/frontend/src/app/social/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[693,26,622,236,141],()=>o(1353));module.exports=r})();