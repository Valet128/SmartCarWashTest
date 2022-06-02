var host = window.location.origin;

// Получение всех продуктов
async function getProducts() {
    const response = await fetch(host + "/api/product", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const products = await response.json();

        const response2 = await fetch(host + "/api/salespoint", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response2.ok === true) {
            const salespoints = await response2.json();

            const response3 = await fetch(host + "/api/providedproduct", {
                method: "GET",
                headers: { "Accept": "application/json" }
            });

            if (response3.ok === true) {
                 provided = await response3.json();
                

                const rows = document.querySelector("tbody");
                products.forEach(product => {
                    rows.append(row(product, salespoints, provided, products));
                });
                listQuantity(products, provided);
            }
        }
    }
}

function listQuantity(products, provided) {
    var select = document.querySelector('select');
    products.forEach(product => {
        var avel = document.getElementById("av" + product.id);
        avel.innerText = 0;
    });
    var indexSelected = select.selectedIndex,
        option = select.querySelectorAll('option')[indexSelected];
    var selectedId = option.getAttribute('id');
    
    products.forEach(product => {
        
        provided.forEach(prov => {

            if (product.id == prov.productId && prov.salesPointId == selectedId) {
                var avel = document.getElementById("av" + product.id);
                avel.innerText = prov.productQuantity;
            }

        });
    });
}

function row(product, salepoints, provided, products) {
    if (document.querySelector("select").children.length === 0) {
        salepoints.forEach(point => {
            const optionPoint = document.createElement("option");
            document.querySelector("select").append(optionPoint)
            optionPoint.append(point.name);
            optionPoint.setAttribute("id", point.id)
        });
    }
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);
    tr.setAttribute("id", product.id);

    const nameTd = document.createElement("td");
    nameTd.setAttribute("style", "cursor:pointer;padding:15px");
    nameTd.append(product.name);

    tr.append(nameTd);

    const priceTd = document.createElement("td");
    priceTd.append(product.price);
    tr.append(priceTd);

    const amountTd = document.createElement("td");
    amountTd.append(product.price);
    tr.append(amountTd);
    
    const availableTd = document.createElement("td");
    availableTd.setAttribute("id", "av"+product.id)
    
    tr.append(availableTd);
    
    var select = document.querySelector('select');
    
    select.onchange = function () {
        
        listQuantity(products, provided);
    };
    
    

    const quantityTd = document.createElement("td");
    const quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("style", "width:40px");
    quantityInput.setAttribute("value", "1");

    quantityInput.onchange = function () {
        
        amountTd.innerText = product.price * quantityInput.value;
    };
  

    quantityTd.append(quantityInput);

    tr.append(quantityTd);

    const linksTd = document.createElement("td");

    const buyLink = document.createElement("a");
    buyLink.setAttribute("style", "cursor:pointer;padding:15px;");
    buyLink.append("Купить");
    buyLink.addEventListener("click", e => {

        e.preventDefault();
        buyProduct(product.id);
    });
    linksTd.append(buyLink);

    
    tr.appendChild(linksTd);

    return tr;
    
}
getProducts();


