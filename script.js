const lists = document.querySelector(".lists");
let datas = [];
window.addEventListener("DOMContentLoaded",()=>{
    fetch("http://localhost:3000/products")
    .then(res=>res.json())
    .then(data=>{
      for(let i=0;i<data.length;i++){
        datas.push(data[i])
      }
      displayLists(datas)
    })
})

function displayLists(data){
    let products = data.map((elem)=>`
    <div class="details">
    <img src="${elem.images[0]}" class="pic"><span class="material-symbols-outlined">
    favorite
    </span>
    <p class="name">${elem.name}</p>
    <div class="pricelist"
    <p><del>${elem.price}</del></p>
    <p Class="offerprice" >${elem.offer_price}</p>
    <p class="discount">${elem.discount} </p> 
    </div>
    <div class="freedelivery"><span>Free Delivery</span></div>
    <p class="exchange">Upto <b>₹12000.00</b> Off on Exchange</p>
    </div>
    `).join("")
    lists.innerHTML = products

}



let nextBtn = document.querySelector(".next");
let prev = document.querySelector(".prev");
var slider_img = document.querySelector('.slider-img');
var images = ['a.png', 'b.png', 'c.png'];
var i = 0;

nextBtn.addEventListener("click",next)

function next(){
  if(i >= images.length-1) i = -1;
	i++;
	return setImg();
}

prev.addEventListener("click",()=>{
	if(i <= 0)
   i = images.length;	
	i--;
	return setImg();
})

function setImg(){
	return slider_img.setAttribute('src', "Images-home/"+images[i]);
	
}

window.setInterval(function () 
{next()},2000);  