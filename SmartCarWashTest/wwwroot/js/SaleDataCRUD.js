var host = window.location.origin;
// Получение всех продуктов
async function getProducts(id) {
    const response = await fetch(host + "/api/saledata/" + id , {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    if (response.ok === true) {
        const products = await response.json();
        const rows = document.querySelector("tbody");
        products.forEach(product => rows.append(row(product)));
    }
}



// создание строки для таблицы
function row(product) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);

    const nameTd = document.createElement("td");
    nameTd.setAttribute("style", "cursor:pointer;padding:15px");
    nameTd.append(product.productId);

    tr.append(nameTd);

    const buyerIdTd = document.createElement("td");
    buyerIdTd.setAttribute("style", "cursor:pointer;padding:15px");
    buyerIdTd.append(product.productQuantity);

    tr.append(buyerIdTd);

    const amountTd = document.createElement("td");
    amountTd.setAttribute("style", "cursor:pointer;padding:15px");
    amountTd.append(product.productIdAmount);

    tr.append(amountTd);

    return tr;
}


// загрузка продуктов
var saleId = localStorage.getItem("SaleId"); 
getProducts(saleId);