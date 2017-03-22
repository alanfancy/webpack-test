// var messages=require('./messages');
import Button from './button';
 import face from './face';
 import content from './content';
import $ from 'jquery';
var style=require('./style/globalStyle.css');
// var style=require('./style/test.less');
// var newMessage=()=>(Button.button);
// var newMessage=()=>(`<p>${face} ${content}</p>`);
/*const newMessage=()=>(`
    <div class="${style.box}">
    DEV:${DEVELOPMENT.toString()}<br>
    PRO:${PRODUCTION.toString()}<br>
    </div>
`)*/
var app=document.getElementById('app');
// app.innerHTML='<p>'+messages.hi +'，'+ messages.event+"</p>";
// app.innerHTML=newMessage();
// Button.attachEl();
app.innerHTML=`
    <div id="${style.menu}">
        <button id="loadPage1">Load1</button>
        <button id="loadPage2">Load2</button>
    </div>
    <div id="content">
        <h1>home</h1>
        ${Button.button}<br>
        ${face}<br>
        <i class="icon"></i>
        ${content}<br>
    </div>
`;
const arr=[1,2,3,4];
let clonearr=[];
clonearr=arr;
clonearr.splice(1,1);
clonearr.push(5);
arr.push(6);
console.log(arr);
console.log(clonearr);
document.getElementById('loadPage1').addEventListener('click',()=>{
    //System.import 会令每个可能的模块都产生一个独立的块（chunk）。
    System.import('./page1').then(pageModule=>{
        document.getElementById('content').innerHTML=pageModule.default;
    })
});
document.getElementById('loadPage2').addEventListener('click',()=>{
    System.import('./page2').then(pageModule=>{
        document.getElementById('content').innerHTML=pageModule.default;
    })
});
$('#app').css('background','#ff0');
if(DEVELOPMENT){
    if(module.hot){//启用热重载
        module.hot.accept();
    }
}
