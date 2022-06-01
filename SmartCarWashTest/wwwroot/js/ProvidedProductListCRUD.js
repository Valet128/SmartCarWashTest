var host = window.location.origin;
// Получение всех продуктов

async function getStoreProducts(idSalesPoint) {
    const response = await fetch(host + "/api/providedproduct/" + idSalesPoint, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const products = await response.json();
        const rows = document.querySelector("tbody");
        products.forEach(product => rows.append(row(product, idSalesPoint)));
    }
}


// Удаление продукта
async function deleteProduct(id, salesPointId) {
    const response = await fetch(host + "/api/providedproduct/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            salespointid: salesPointId
        })
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


function row(product, idSalesPoint) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);

    const nameTd = document.createElement("td");
    nameTd.setAttribute("style", "cursor:pointer;padding:15px");
    nameTd.append(product.productId);

    tr.append(nameTd);

    const quantityTd = document.createElement("td");
    quantityTd.append(product.productQuantity);
    tr.append(quantityTd);

    const LinkTd = document.createElement("td");
    const DeleteProductLink = document.createElement("a");
    DeleteProductLink.setAttribute("style", "cursor:pointer;padding:15px;");
    DeleteProductLink.append("Удалить");
    DeleteProductLink.addEventListener("click", e => {

        e.preventDefault();
        deleteProduct(product.productId, idSalesPoint);
    });
    LinkTd.append(DeleteProductLink);
    
    tr.appendChild(LinkTd);

    return tr;
}



// загрузка продуктов
var id = localStorage.getItem("salesPointId");
getStoreProducts(id);