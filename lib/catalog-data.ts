export const categories = ['Camisetas', 'Camisas & Polos', 'Bermudas', 'Calças', 'Jaquetas', 'Acessórios'] as const;
export type Category = typeof categories[number];
export type Product = { id:string; name:string; category:Category; description:string; price:number; sizes:string[]; colors:{name:string;hex:string}[]; image:string; tile?:number; published:boolean; tag:string; demo:boolean; };
const black={name:'Preto',hex:'#181818'}, white={name:'Off-white',hex:'#ded8ca'}, gray={name:'Cinza',hex:'#727774'}, sand={name:'Areia',hex:'#a08c70'};
// O catálogo real vive em `public/catalog.json` e é editado pelo painel
// externo (Decap CMS em /admin), que grava as mudanças via API do GitHub.
// Esta lista embutida é apenas a coleção demonstrativa de segurança:
// o site a exibe se `public/catalog.json` ainda não existir ou não carregar.
export const fallbackProducts: Product[] = [
 {id:'db-001',name:'Camiseta Oversized Essential',category:'Camisetas',price:89.9,sizes:['P','M','G','GG'],colors:[black,white,gray],image:'assets/essentials.png',tile:0,tag:'ESSENCIAL',description:'Silhueta ampla, ombros deslocados e um visual que combina com o seu dia. Uma peça versátil para compor o look.',published:true,demo:true},
 {id:'db-002',name:'Polo Texture Off-white',category:'Camisas & Polos',price:119.9,sizes:['P','M','G','GG'],colors:[white,black],image:'assets/essentials.png',tile:1,tag:'DESTAQUE',description:'Textura marcante e um caimento leve. O equilíbrio entre o casual e o sofisticado para sair do básico.',published:true,demo:true},
 {id:'db-005',name:'Bermuda Cargo Sand',category:'Bermudas',price:129.9,sizes:['38','40','42','44','46'],colors:[sand,black],image:'assets/urban.png',tile:0,tag:'URBAN',description:'Bolsos utilitários e modelagem confortável. Um complemento para camisetas amplas e produções urbanas.',published:true,demo:true},
 {id:'db-007',name:'Boné Signature Black',category:'Acessórios',price:69.9,sizes:['Único'],colors:[black,gray],image:'assets/urban.png',tile:2,tag:'',description:'Design discreto, aba curva e ajuste posterior. O detalhe que completa o visual.',published:true,demo:true},
 {id:'db-003',name:'Camiseta Oversized Stone',category:'Camisetas',price:89.9,sizes:['P','M','G','GG'],colors:[gray,black],image:'assets/essentials.png',tile:2,tag:'',description:'Tonalidade stone, corte amplo e personalidade. Um essencial para combinar sem esforço.',published:true,demo:true},
 {id:'db-004',name:'Camisa Night Edition',category:'Camisas & Polos',price:139.9,sizes:['P','M','G','GG'],colors:[black,white],image:'assets/essentials.png',tile:3,tag:'NIGHT EDITION',description:'Camisa de manga curta com linhas limpas e acabamento minimalista. Do encontro casual à saída à noite.',published:true,demo:true},
 {id:'db-006',name:'Calça Cargo Black',category:'Calças',price:179.9,sizes:['38','40','42','44','46'],colors:[black,sand],image:'assets/urban.png',tile:1,tag:'',description:'Modelagem utilitária, bolsos laterais e presença urbana. Feita para compor o look completo.',published:true,demo:true},
 {id:'db-008',name:'Jaqueta Gold Statement',category:'Jaquetas',price:249.9,sizes:['P','M','G','GG'],colors:[{name:'Bronze',hex:'#956e3c'},black],image:'assets/urban.png',tile:3,tag:'GOLD EDITION',description:'Tonalidade bronze e visual marcante. Uma camada extra de personalidade para o seu guarda-roupa.',published:true,demo:true},
];
export const money=(value:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value);