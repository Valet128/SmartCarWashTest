var host = window.location.origin;
// Получение всех продуктов
async function getProducts(idSalesPoint) {
    const response = await fetch(host + "/api/product", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    if (response.ok === true) {
        const products = await response.json();
        const rows = document.querySelector("tbody");
        products.forEach(product => rows.append(row(product, idSalesPoint)));
    }
}


// Изменение продукта
async function addProductToSalesPoint(salesProductId, productId, productQuantity) {
    const response = await fetch(host + "/api/providedproduct", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                salespointid: salesProductId,
                productid: productId,
                productquantity: productQuantity 
            })
    });
    if (response.ok === true) {
        alert(productQuantity + " Добавлено в точку продажи")
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}



function row(product, idSalesPoint) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);

    const nameTd = document.createElement("td");
    nameTd.setAttribute("style", "cursor:pointer;padding:15px");
    nameTd.append(product.name);

    tr.append(nameTd);

    const priceTd = document.createElement("td");
    priceTd.append(product.price);
    tr.append(priceTd);

    const inputTdText = document.createElement("td");

    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("value", "1");

    inputTdText.append(inputText);

    const LinkTd = document.createElement("td");
    const AddProductLink = document.createElement("a");
    AddProductLink.setAttribute("style", "cursor:pointer;padding:15px;");
    AddProductLink.append("Добавить");
    AddProductLink.addEventListener("click", e => {

        e.preventDefault();
        addProductToSalesPoint(idSalesPoint, product.id, inputText.value);
    });
    LinkTd.append(AddProductLink);

    tr.appendChild(inputTdText);
    tr.appendChild(LinkTd);

    return tr;
}



// загрузка продуктов
var id = localStorage.getItem("salesPointId");
getProducts(id);
