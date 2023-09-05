function writeToHead(url){
  let fastCssStylesheet = document.querySelector('#fastCssStylesheet')
  if(!fastCssStylesheet){
    let elm  = document.createElement("link");
    elm.type="text/css"
    elm.href=url
    elm.rel="stylesheet"
    elm.id="fastCssStylesheet"
   document.querySelector("head").appendChild(elm);
  }else{
    fastCssStylesheet.href=url;
  }
}
function objectToCssString(obj) {
    if (typeof obj === "string") {
      try {
        obj = JSON.parse(obj);
      } catch (error) {
        console.error("Invalid JSON string:", error);
        return "";
      }
    }
  
    if (typeof obj === "object") {
      return Object.entries(obj)
        .map(([property, value]) => {
          const kebabProperty = property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
          return `${kebabProperty}:${value};`;
        })
        .join('');
    } else {
      console.error("Input is not a valid object:", obj);
      return "";
    }
  }

function initializer(){
  let data = fastCss.ids;
 let css =  data.reduce((prev,cur)=>{
        return prev+`
        ${cur.selector}{
          ${cur.data}
        }
        `
  },'')
  let blob = new Blob([css],{type:'text/css'})
  let url = URL.createObjectURL(blob)
  writeToHead(url)
  URL.revokeObjectURL(url)
}
function updateAndConcat(toupdate, forupdate) {
  for (const key in forupdate) {
    if (forupdate.hasOwnProperty(key)) {
      if (toupdate.hasOwnProperty(key)) {
        toupdate[key] = forupdate[key];
        delete forupdate[key]; 
      }
    }
  }
  const result = { ...toupdate, ...forupdate };

  return result;
}
const fastCss = {
ids:[],
write:(selector,json)=>{
let ft = fastCss.ids.filter(e=>e.selector==selector);
if(ft.length>0){
  let spt = ft[0].data.split(';')
  spt.pop()
  let mp = spt.map(e=>e.split(':'))
  let obj = Object.fromEntries(mp)
  console.log(obj);
  let cdata = objectToCssString(json)
  let cspt = cdata.split(';')
  cspt.pop()
  let cmp = cspt.map(e=>e.split(':'))
  let cobj = Object.fromEntries(cmp)
  let uc = updateAndConcat(obj,cobj)
  let str = JSON.stringify(uc)
  ft[0].data=objectToCssString(str)
}else{
fastCss.ids.push({selector,data:objectToCssString(json)})
}
},
init:()=>{
  initializer()
}
}
fastCss.write('body',{backgroundColor:"red"})
fastCss.init()
  let str= '0123456789ABCDEF'.split('')
  let rdm = ()=>Math.floor(Math.random()*16)
  let hex = "#"+str[rdm()]+str[rdm()]+str[rdm()]
  fastCss.write('body',{opacity:0})
  fastCss.write('body:hover',{backgroundColor:'pink'})
  fastCss.init()