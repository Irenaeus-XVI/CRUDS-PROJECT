var productName = document.querySelector("#productName");
var productPrice = document.querySelector("#productPrice");
var productModel = document.querySelector("#productModel");
var productDesc = document.querySelector("#productDesc");
var addBTN = document.querySelector("#addBTN");
var updateBTN = document.querySelector("#updateBTN");
var tbody = document.querySelector("#tbody");
var deleteBTN;
var inputSearch = document.querySelector("#inputSearch");
var productList;
var productListName = "productList";
var productNameWarning = document.querySelector("#productNameWarning");
var productPriceWarning = document.querySelector("#productPriceWarning");
var productModelWarning = document.querySelector("#productModelWarning");
var productDescWarning = document.querySelector("#productDescWarning");
var allowed;
var allowedName = false;
var allowedPrice = false;
var allowedModel = false;
var allowedDesc = false;

(function () {
    if (localStorage.getItem("productList") == null) {
        productList = [];
        console.log("h");
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
        displayProduct(productList);
        console.log("s");

    }
})();


Validate();

// NOTE ADD-PRODUCT
addBTN.addEventListener("click", function () {

    isAllowed();
    console.log(allowed);
    if (allowed) {
        Clear();
        product = {
            name: productName.value,
            price: productPrice.value,
            model: productModel.value,
            Desc: productDesc.value
        }
        productList.push(product);
        displayProduct(productList);
        updateFormValues();
        setLocalStorage(productList);

    }
})

// NOTE DISPLAY-PRODUCT

function displayProduct(list) {
    var box = ``;

    for (var i = 0; i < list.length; i++) {
        box += ` <tr>
        <td>${i}</td>
        
        <td>${list[i].newName ? list[i].newName : list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].model}</td>
        <td>${list[i].Desc}</td>
        <td> <button class="btn btn-warning btn-sm updateBTN"onclick="updateItems(${i})" >Update</button></td>
        <td><button class=" btn btn-danger btn-sm deleteBTN" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`
    }
    tbody.innerHTML = box;
    deleteBTN = Array.from(document.querySelectorAll(".deleteBTN"));

}

// NOTE CLEAR-PRODUCT
function updateFormValues(flag) {
    productName.value = flag ? flag.name : "";
    productPrice.value = flag ? flag.price : "";
    productModel.value = flag ? flag.model : "";
    productDesc.value = flag ? flag.Desc : "";

}

// NOTE SETLOCALSTORAGEPRODUCT-PRODUCT
function setLocalStorage(list) {

    localStorage.setItem(productListName, JSON.stringify(list));
}

// NOTE DELETE-PRODUCT
function deleteProduct(index) {
    productList.splice(index, 1);
    setLocalStorage(productList);
    displayProduct(productList);
}




// NOTE SEARCH-PRODUCT
inputSearch.addEventListener("input", function (event) {
    var foundedList = [];
    for (var i = 0; i < productList.length; i++) {
        var term = event.target.value;
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`);
            foundedList.push(productList[i]);

        }
    }
    displayProduct(foundedList);

})




// NOTE UPDATE-PRODUCT
function updateItems(index) {
    updateFormValues(productList[index]);
    addBTN.classList.add("d-none");
    updateBTN.classList.replace("d-none", "d-block");
    loc = index;

}





var loc;

// NOTE UPDATE-PRODUCT
updateBTN.addEventListener("click", function () {
    Validate();
    isAllowed();
    console.log(allowed);
    if (allowed) {
        Clear();
        console.log(loc);
        productList[loc].name = productName.value;
        productList[loc].price = productPrice.value;
        productList[loc].model = productModel.value;
        productList[loc].Desc = productDesc.value;
        displayProduct(productList);
        setLocalStorage(productList);
        updateFormValues();
        updateBTN.classList.add("d-none");
        addBTN.classList.replace("d-none", "d-block");
    }
});


// NOTE VAlidation-PRODUCT 

function Validate() {





    // NOTE VALIDATE-PRODUCT-NAME

    function validateProductName() {
        var regex = /^[A-Z][a-z]{3,}$/;


        if (regex.test(productName.value)) {
            productNameWarning.classList.replace("d-block", "d-none");
            allowedName = true;

        }
        else {
            productNameWarning.classList.replace("d-none", "d-block");
            allowedName = false;
        }
    }
    // NOTE VALIDATE-PRODUCT-PRICE
    function validateProductPrice() {
        var regex = /^(([1-9][0-9][0-9][0-9])|10000)$/
        if (regex.test(productPrice.value)) {
            productPriceWarning.classList.replace("d-block", "d-none");
            allowedPrice = true;

        }
        else {
            productPriceWarning.classList.replace("d-none", "d-block");
            allowedPrice = false;
        }
    }

    // NOTE VALIDATE-PRODUCT-MODEL
    function validateProductModel() {
        var regex = /^(mobile|tv)$/i
        if (regex.test(productModel.value)) {
            productModelWarning.classList.replace("d-block", "d-none");
            allowedModel = true;

        }
        else {
            productModelWarning.classList.replace("d-none", "d-block");
            allowedModel = false;
        }
    }



    // NOTE VALIDATE-PRODUCT-DESC

    function validateProductDesc() {
        var regex = /^[a-z ]{10,}$/gmi;
        if (regex.test(productDesc.value)) {
            productDescWarning.classList.replace("d-block", "d-none");
            allowedDesc = true;

        }
        else {
            productDescWarning.classList.replace("d-none", "d-block");
            allowedDesc = false;
        }
    }







    productName.addEventListener("blur", function () {
        validateProductName()
    });


    productPrice.addEventListener("blur", function () {
        console.log("hi");
        validateProductPrice();
    });


    productModel.addEventListener("blur", function () {
        console.log("hi");
        validateProductModel();
    });


    productDesc.addEventListener("blur", function () {
        validateProductDesc();
    })

}

function isAllowed() {
    allowed = (allowedName && allowedPrice && allowedModel && allowedDesc);
}
function Clear() {
    allowed = false;
    allowedName = false;
    allowedPrice = false;
    allowedModel = false;
    allowedDesc = false;
}





















// for (var i = 0; i < deleteBTN.length; i++) {
//     deleteBTN[i].addEventListener("click", function (event) {
//         productList.splice(this, 1);
//         setLocalStorage(productList);
//         displayProduct(productList);
//     });
// }
// console.log(deleteBTN);

// var updateBTN = Array.from(document.querySelectorAll(".updateBTN"));
// console.log(updateBTN);