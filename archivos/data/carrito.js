const url = 'https://mindhub-xj03.onrender.com/api/petshop'
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> {
        const {} = data
        console.log(data)
        printArticle(data)
        PrintcartNumber(data)
    }) 
    .catch((error)=> console.log("error", error))

    const $ = id => document.getElementById(id)
    const cart = $("cart")

    function printArticle(data){
        template = $("templateCartItem").content
        fullShipment = $("fullShipment")
        const fragment = document.createDocumentFragment()
        let valuefullShipment = 0

        data.forEach(item => {
            template.querySelector(".nameItem").textContent = item.producto
            template.querySelector("img").src = item.imagen
            template.querySelector(".descriptionItem").textContent = ''
            template.querySelector(".price").textContent = `$ ${item.precio}`
            template.querySelector(".valueStock").textContent = `Stock: ${item.disponibles} Uds`
            const clone = template.cloneNode(true)
            fragment.appendChild(clone)

            valuefullShipment = valuefullShipment + item.precio
            console.log(valuefullShipment)
        })
        cart.appendChild(fragment)
        fullShipment.textContent = `Total de la compra: ${valuefullShipment}`
    }

    function PrintcartNumber(data){
        const cartNumber = $("cartNumber")
        console.log(cartNumber)
        cartNumber.textContent = `Articulos: ${data.length}`

    }