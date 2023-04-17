const url = 'https://mindhub-xj03.onrender.com/api/petshop'
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> {
        const {} = data
        console.log(data)
        const dataLocalStorage = data
        printArticle(data)
        PrintcartNumber(dataLocalStorage)
        buttonsCart(dataLocalStorage)
    }) 
    .catch((error)=> console.log("error", error))

    const $ = id => document.getElementById(id)
    const cart = $("cart")

    function printArticle(data){
        template = $("templateCartItem").content
        fullShipment = $("fullShipment")
        allItems = $("allItems")
        const fragment = document.createDocumentFragment()
        let valuefullShipment = 0

        data.forEach(item => {
            
        let allValue = item.__v * item.precio
        console.log(allValue)
        console.log(item.__v)
        console.log(item.precio)
            template.querySelector(".nameItem").textContent = item.producto
            template.querySelector("img").src = item.imagen
            template.querySelector(".descriptionItem").textContent = ''
            template.querySelector(".price").textContent = `$ ${item.precio}`
            template.querySelector(".valueStock").textContent = `Stock: ${item.disponibles} Uds`
            template.querySelector('.addItem').setAttribute("id", item._id);
            template.querySelector('.subtractItem').setAttribute("id", item._id);
            template.querySelector('.delet').setAttribute("id", item._id);
            template.querySelector('.allValue').textContent = allValue
            template.querySelector('.quantity').textContent = `${item.__v} Unidades`
            const clone = template.cloneNode(true)
            fragment.appendChild(clone)

            valuefullShipment = valuefullShipment + allValue
            //console.log(valuefullShipment)
        })
        cart.appendChild(fragment)
        fullShipment.textContent = `Total de la compra: ${valuefullShipment}`
    }

    function PrintcartNumber(data){
        const cartNumber = $("cartNumber")
        //console.log(cartNumber)
        cartNumber.textContent = `Articulos: ${data.length}`
    }
    function buttonsCart(data){
        const cartConteiner = $("cartConteiner")
        cartConteiner.addEventListener("click", (e) => {
            btAction(e)
        })

        const btAction = (e) => {
            if(e.target.classList.contains("delet")){
                console.log("botton de borrar")
                const dataDelet = data.filter(data => data._id !== e.target.id)
                data = dataDelet
                localStorage.setItem('carrito', JSON.stringify(data));
                cart.textContent = ''
                printArticle(data)
                PrintcartNumber(data)
            }
            if(e.target.classList.contains("subtractItem")){
                console.log("botton de restar")
                data.map(function(item){
                    console.log(item._id)
                    if(item._id === e.target.id){
                        if(item.__v === 1){
                            item.disponibles++;
                            const dataDelet = data.filter(data => data._id !== e.target.id)
                            data = dataDelet
                            localStorage.setItem('carrito', JSON.stringify(data));
                            cart.textContent = ''
                            printArticle(data)
                            PrintcartNumber(data)
                        }else{
                            item.__v--;
                            item.disponibles++;
                            console.log(data)
                            localStorage.setItem('carrito', JSON.stringify(data));
                            cart.textContent = ''
                            printArticle(data)
                            PrintcartNumber(data)
                        }
                    }
                })
            }
            if(e.target.classList.contains("addItem")){
                console.log("botton de agregar")
                data.map(function(item){
                    if(item._id === e.target.id){
                        if(item.disponibles > 0){
                            item.disponibles--;
                            item.__v++
                            localStorage.setItem('carrito', JSON.stringify(data));
                            cart.textContent = ''
                            printArticle(data)
                            PrintcartNumber(data)
                        }else{
                            alert('no hay mas disponibles');
                        }
                    }
                })
                console.log(data)
            }
        }
    }