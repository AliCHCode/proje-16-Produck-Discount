let head = document.querySelector("head");
let body = document.querySelector("body");
let productCode = document.querySelector(".product-code").innerHTML.trim().split("Ürün Kodu:").join("").split(" ").join("").trim();
let priceContainer = document.querySelector(".current-price").closest("div"); 
let originalPrice = priceContainer.querySelector(".current-price").innerHTML.trim();

const clearCodes= ()=>{
    document.querySelector(".popUpScreen")?.remove();
    document.querySelector(".styleLink")?.remove();
}

const addStyleAndCdn= ()=>{
    let style = document.createElement("style");
    style.classList.add("styleLink");
    style.textContent = `*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.new-price{
    font-size: 2rem;
}
.current-price.active:not(.new-price){
    color: gray;
    text-decoration: line-through;
}

.popUpScreen{
    z-index:10000;
    position: fixed;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba( 0, 0, 0, 0.8);

    .popUpContainer{
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 400px;
        padding: 10px;
        border: 3px solid orange;
        background-color: white;
        border-radius: 20px;
        color: black;
        font-size: 1.5rem;
        font-weight: 600;
        font-style: inherit;
        .closeButton{
            justify-self: flex-start;
            margin-bottom: auto;
            align-self: flex-end;
            background-color: lightgray;
            height: 30px;
            width: 30px;
            border-radius: 7px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .popUpContentContainer{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            justify-self: center;
            margin-bottom: auto;
            .giftBox{
                font-size: 8rem;
                margin-bottom: 25px;
            }
            .ContentDiscount{
                font-size: 1.8rem;
                &> span{
                    text-decoration: line-through;
                }
            }
        }
    }
    }`;
    head.appendChild(style);
    let cdn = document.createElement("link");
    cdn.rel = "StyleSheet";
    cdn.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" 
    head.appendChild(cdn);
}

const listMaker= ()=>{
    var productCodeList = JSON.parse(localStorage.getItem("productCodeList")) || {};
    var discount = 0;
    var discountList = {
        2: 5,
        3: 10,
        4: 20,
        5:25
    };
    var countNumber = 0;
    var numberOfVisit = 1;
    if(productCodeList[productCode]){
        productCodeList[productCode] += 1
        countNumber = productCodeList[productCode];
        discount = discountList[countNumber] || 25;
        numberOfVisit = productCodeList[productCode];
    }
    else {
        productCodeList[productCode] = 1
    }
    // productCodeList[productCode] = (productCodeList[productCode] || 0) +1;
 
    localStorage.setItem("productCodeList",JSON.stringify(productCodeList));
}

const calculateDiscount=(discount)=>{
    var cleanNumberPrice = parseFloat(originalPrice.replace(",",".").replace("TL","").trim());
    var calculatedPrice = cleanNumberPrice - (cleanNumberPrice/100*discount);
    return calculatedPrice;
}

const changePrice=(calculatedPrice)=>{
    priceContainer.querySelector(".current-price").classList.add("active");
    var newPrice = document.createElement("span");
    newPrice.classList.add("current-price","new-price");
    newPrice.textContent = calculatedPrice;
    priceContainer.appendChild(newPrice);
}

const showPopUp=(numberOfVisit,discount,originalPrice)=>{
    let popUp = document.createElement("div");
    popUp.classList.add("popUpScreen");
    popUp.innerHTML=`<div class="popUpContainer">
    <div class="closeButton"><i class="fa-solid fa-xmark"></i></div>
    <div class="popUpContentContainer">
    <div class="giftBox"><i class="fa-solid fa-gift"></i></div>
    <p class="ContentHeader">Bu Ürünü ${numberOfVisit}. Ziyaret Edişiniz</p>
    <p class="ContentDiscount">${discount}% Discount, <span>${originalPrice}</span></p>
    </div>
    </div>`;
    body.appendChild(popUp);
}

const deleteHandler= ()=>{
    body.removeChild(popUp);
}

const giveDeleteHandlers= (popUp)=>{
    popUp.querySelector(".closeButton").addEventListener("click",deleteHandler);
    popUp.addEventListener("click",deleteHandler);
    popUp.querySelector(".popUpContainer").addEventListener("click",(event)=>event.stopPropagation);
}

const initialize = ()=>{
    clearCodes();
    addStyleAndCdn();
    listMaker();
    calculateDiscount(discount);
    changePrice(calculatedPrice);
    showPopUp(numberOfVisit,discount,originalPrice);
    giveDeleteHandlers(popUp);
    
}

if(productCode)initialize(popUp);