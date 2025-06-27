let head = document.querySelector("head");
let body = document.querySelector("body");
let priceContainer = document.querySelector(".current-price").closest("div"); 
let productCode = document.querySelector(".product-code").innerHTML.trim().split("Ürün Kodu:").join("").split(" ").join("").trim();
let originalPrice = priceContainer.querySelector(".current-price").innerHTML.trim();

const clearFirst = () => {
    document.querySelector(".popUpScreen")?.remove();
    document.querySelector(".styleLink")?.remove();
}


clearFirst();

///Add Header///
let style = document.createElement('style');
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
////////////////

if(productCode){
     var productCodes = JSON.parse(localStorage.getItem("productCodes")) || [];
     productCodes.push(productCode);
     localStorage.setItem("productCodes",JSON.stringify(productCodes));

     filteredCodes = [];

    productCodes.forEach((item)=>{
        if(item === productCode){
            filteredCodes.push(item);
        }
    });
    // console.log(productCodes, productCodes.length);
    // console.log(filteredCodes, filteredCodes.length);
    if(filteredCodes.length >= 2){
        switch(true){
            case filteredCodes.length === 2:
                showPopUP("2","5",originalPrice)
                customizePrice(calculateDiscount(5));
                // console.log("yüzde 5")
                break;
            case filteredCodes.length === 3:
                showPopUP("3","10",originalPrice)
                customizePrice(calculateDiscount(10));
                // console.log("yüzde 10")
                break;
            case filteredCodes.length === 4:
                showPopUP("4","20",originalPrice)
                customizePrice(calculateDiscount(20));
                // console.log("yüzde 20")S
                break;
            case filteredCodes.length >= 5:
                showPopUP("5","25",originalPrice)
                customizePrice(calculateDiscount(25));
                console.log("yüzde 25")
                break;
        }
    }
}
////calculate////
function calculateDiscount(discount){
    var toCalculate =+priceContainer.querySelector(".current-price").innerHTML.trim().replace("TL","").replace(",",".");
    // console.log(typeof(toCalculate), toCalculate);
    calculated = toCalculate - parseFloat((toCalculate/100*discount)).toFixed(2);
    // console.log(typeof(calculated), calculated);
    var stringVersion = calculated.toString().replace(".",",") + " TL";;
    // console.log(typeof(stringVersion), stringVersion);
    return stringVersion;
}
////Add Price////
function customizePrice(discountedPrice){
    priceContainer.querySelector(".current-price").classList.add("active");
    let newPrice = document.createElement("span");
    newPrice.classList.add("current-price","new-price");
    newPrice.textContent = discountedPrice;
    if(priceContainer.querySelector(".new-price"))priceContainer.removeChild(priceContainer.querySelector(".new-price"));
    else console.log("No new price found");
    priceContainer.appendChild(newPrice);
};

////popUp////
function showPopUP(numberOfVisit,percentOfDiscount,beforeDiscount){
    let popUp = document.createElement('div');
    popUp.classList.add("popUpScreen");
    popUp.innerHTML=`<div class="popUpContainer">
    <div class="closeButton"><i class="fa-solid fa-xmark"></i></div>
    <div class="popUpContentContainer">
    <div class="giftBox"><i class="fa-solid fa-gift"></i></div>
    <p class="ContentHeader">Bu Ürünü ${numberOfVisit}. Ziyaret Edişiniz</p>
    <p class="ContentDiscount">${percentOfDiscount}% Discount, <span>${beforeDiscount}</span></p>
    </div>
    </div>`;
    body.append(popUp);

    popUp.querySelector(".closeButton").addEventListener("click", deleteHandler);
    popUp.addEventListener("click",deleteHandler);
    popUp.querySelector(".popUpContainer").addEventListener("click",(event)=>{
        event.stopPropagation();
    })

    function deleteHandler(event){
        
        body.removeChild(popUp);
        // console.log(event.target)

        
    }
}



// const initialize = () => {



// }


// solidCode = ProductCode.split("Ürün Kodu:").join("").split(" ").join("").trim();
// solidCode = ProductCode.replace("Ürün Kodu:", "").trim();
// console.log(solidCode);




// let data ={


// "bedirhan":3,
// "salih":7

// }


// data["bedirhan"]