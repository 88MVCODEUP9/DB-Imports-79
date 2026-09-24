export type HeroSlide={eyebrow:string;line1:string;line2:string;description:string;label:string;filter:string};
export type SiteConfig={
 brand:{name:string;tagline:string};
 logoImage:string;
 instagramIcon:string;
 instagram:{url:string;handle:string};
 announcement:{left:string;right:string};
 nav:{label:string;href:string}[];
 heroImage:string;
 heroSlides:HeroSlide[];
 ticker:string[];
 story:{eyebrow:string;heading:string[];text:string;signature:string;images:string[]};
 footer:{tagline:string;secondary:string};
};

export const defaultSite:SiteConfig={
 brand:{name:'DB IMPORTS',tagline:"MEN'S COLLECTION"},
 logoImage:'',
 instagramIcon:'',
 instagram:{url:'https://www.instagram.com/db_imports79/',handle:'@db_imports79'},
 announcement:{left:'ESTILO. QUALIDADE. PRESENÇA.',right:'MODA MASCULINA ✦ DB IMPORTS'},
 nav:[{label:'Início',href:'#inicio'},{label:'Catálogo',href:'#catalogo'},{label:'Nossa essência',href:'#identidade'}],
 heroImage:'assets/hero.png',
 heroSlides:[
  {eyebrow:'DB IMPORTS / MENSWEAR',line1:'SEU ESTILO.',line2:'SUA PRESENÇA.',description:'Peças que falam por você. Do essencial ao extraordinário.',label:'ESSENTIAL COLLECTION',filter:'Todas'},
  {eyebrow:'ATITUDE EM CADA DETALHE',line1:'NADA BÁSICO.',line2:'SÓ ESSENCIAL.',description:'Modelagens amplas. Tons marcantes. A sua nova assinatura.',label:'URBAN ESSENTIALS',filter:'Camisetas'},
  {eyebrow:'A SUA PRÓXIMA VERSÃO',line1:'VISTA A SUA',line2:'IDENTIDADE.',description:'Uma seleção de moda masculina para ocupar o seu espaço.',label:'THE GOLD EDIT',filter:'Jaquetas'},
 ],
 ticker:['ESTILO','QUALIDADE','PRESENÇA','DB IMPORTS'],
 story:{eyebrow:'MUITO ALÉM DE VESTIR',heading:['ESTILO É','DEIXAR SUA','MARCA.'],text:'Uma escolha. Uma atitude. O seu jeito de chegar.\nNa DB Imports, o seu estilo começa aqui.',signature:'Estilo • Qualidade • Presença',images:['assets/instagram-original.png','assets/instagram-original.png']},
 footer:{tagline:'ESTILO. QUALIDADE. PRESENÇA.',secondary:'CATÁLOGO DE MODA MASCULINA'},
};

// A configuração do site vive em `public/site.json` (editável à mão, mesmo
// mecanismo do catalog.json). Se faltar alguma chave ou não carregar, cai no
// defaultSite acima. Produtos NÃO fazem parte deste arquivo: continuam no
// public/catalog.json.
export async function getSite():Promise<SiteConfig>{
 let d:Partial<SiteConfig>|undefined;
 try{const r=await fetch('site.json',{cache:'no-store'});if(r.ok)d=await r.json();}catch{/* fallback padrão */}
 return {
  brand:{...defaultSite.brand,...(d?.brand||{})},
  logoImage:d?.logoImage||defaultSite.logoImage,
  instagramIcon:d?.instagramIcon||defaultSite.instagramIcon,
  instagram:{...defaultSite.instagram,...(d?.instagram||{})},
  announcement:{...defaultSite.announcement,...(d?.announcement||{})},
  nav:d?.nav?.length?d.nav:defaultSite.nav,
  heroImage:d?.heroImage||defaultSite.heroImage,
  heroSlides:d?.heroSlides?.length?d.heroSlides:defaultSite.heroSlides,
  ticker:d?.ticker?.length?d.ticker:defaultSite.ticker,
  story:{...defaultSite.story,...(d?.story||{})},
  footer:{...defaultSite.footer,...(d?.footer||{})},
 };
}