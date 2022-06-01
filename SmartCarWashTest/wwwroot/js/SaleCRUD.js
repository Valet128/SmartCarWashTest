var host = window.location.origin;
// Получение всех продуктов
async function getProducts() {
    const response = await fetch(host + "/api/sale" , {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    if (response.ok === true) {
        const products = await response.json();
        const rows = document.querySelector("tbody");
        products.forEach(product => rows.append(row(product)));
    }
}

// Удаление продукта
async function deleteProduct(id) {
    const response = await fetch(host + "/api/sale/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const product = await response.json();
        document.querySelector("tr[data-rowid='" + product.id + "']").remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

// создание строки для таблицы
function row(product) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);

    const idTd = document.createElement("td");
    idTd.setAttribute("style", "cursor:pointer;padding:15px");
    idTd.append(product.id);

    tr.append(idTd);

    const DateTd = document.createElement("td");
    DateTd.setAttribute("style", "cursor:pointer;padding:15px");
    DateTd.append(product.date);

    tr.append(DateTd);

    const timeTd = document.createElement("td");
    timeTd.setAttribute("style", "cursor:pointer;padding:15px");
    timeTd.append(product.time);

    tr.append(timeTd);

    const SalesPointIdTd = document.createElement("td");
    SalesPointIdTd.setAttribute("style", "cursor:pointer;padding:15px");
    SalesPointIdTd.append(product.salesPointId);

    tr.append(SalesPointIdTd);

    const buyerIdTd = document.createElement("td");
    buyerIdTd.setAttribute("style", "cursor:pointer;padding:15px");
    buyerIdTd.append(product.buyerId);

    tr.append(buyerIdTd);

    const amountTd = document.createElement("td");
    amountTd.setAttribute("style", "cursor:pointer;padding:15px");
    amountTd.append(product.totalAmount);

    tr.append(amountTd);

    const linksTd = document.createElement("td");

    
    const removeLink = document.createElement("a");
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteProduct(product.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}


// загрузка продуктов
var buyerId = localStorage.getItem("BuyerId"); 
getProducts(buyerId);