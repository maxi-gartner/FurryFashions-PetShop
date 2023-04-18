const data = JSON.parse(localStorage.getItem('carrito'));

buttonsCart(data)

const $ = id => document.getElementById(id)
const cart = $("cart")


function printArticle(data){
    template = document.getElementById("templateCartItem").content
    fullShipment = document.getElementById("fullShipment")
    allItems = document.getElementById("allItems")
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
function printCardEmpty(){
    template = document.getElementById("templateCartEmply").content
    fullShipment = document.getElementById("fullShipment")
    allItems = document.getElementById("allItems")

    const fragment = document.createDocumentFragment()
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    cart.appendChild(fragment)/* 
    document.getElementById('buttonDelet').style.display = 'none';
    document.getElementById('buttomPurchase').style.display = 'none';
    document.querySelector('.subtrtactAndAdd').style.display = 'none';
    document.querySelector('.valueStock').style.display = 'none'; */

    const cartNumber = document.getElementById("cartNumber")
    cartNumber.textContent = `Articulos: 0`
}

if(data){
    printArticle(data)
    PrintcartNumber(data)
}else{
    printCardEmpty()
}

function PrintcartNumber(data){
    const cartNumber = document.getElementById("cartNumber")
    //console.log(cartNumber)
    cartNumber.textContent = `Articulos: ${data.length}`
}

function buttonsCart(data){
    const cartConteiner = document.getElementById("cartConteiner")
    cartConteiner.addEventListener("click", (e) => {
        btAction(e)
    })

    const btAction = (e) => {
        if(e.target.classList.contains("delet")){
            console.log("botton de borrar")
            const dataDelet = data.filter(data => data._id !== e.target.id)
            data = dataDelet
            console.log(data.length)
            printArticle(data)
            if(data.length === 0){
                console.log("data es igual a 0")
                cart.textContent = ''
                localStorage.removeItem('carrito');
                printCardEmpty()
            }else{
                localStorage.setItem('carrito', JSON.stringify(data));
                cart.textContent = ''
                printArticle(data)
                PrintcartNumber(data)
            }
        }
        if(e.target.classList.contains("subtractItem")){
            console.log("botton de restar")
            data.map(function(item){
                console.log(item._id)
                if(item._id === e.target.id){
                    if(item.__v === 1){
                        item.disponibles++;
                        item.__v--
                        const dataDelet = data.filter(data => data._id !== e.target.id)
                        data = dataDelet
                        localStorage.setItem('carrito', JSON.stringify(data));
                        console.log("data es igual a 0")
                        cart.textContent = ''
                        if(data.length === 0){
                            console.log("data es igual a 0")
                            cart.textContent = ''
                            localStorage.removeItem('carrito');
                            printCardEmpty()
                        }else{
                            cart.textContent = ''
                            printArticle(data)
                            PrintcartNumber(data)
                    }
                    }else{
                        item.disponibles++;
                        item.__v--
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
                        Swal.fire('No hay mas disponibles😅')
                    }
                }
            })
            console.log(data)
        }
        if(e.target.classList.contains("purchaseButton")){
            if(!data){
                Swal.fire('No hay ningun articulo en el carrito🤔')
            }else{
            Swal.fire({
                title: '¿Desea continuar con la compra?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        conteinerModal.style.display="flex"
                    }
                })
            }
        }if(e.target.classList.contains("buttonExit")){
            console.log("boton exit")
            const conteinerModal = $("conteinerModal")
            conteinerModal.style.removeProperty("display");
        }
    }
}
function completeCreditCard($){
    const cardNumber = $("card-number")
    const cardName = $("card-name")
    const cardMonth = $("card-month")
    const cardYear = $("card-year")
    const cardCvc = $("card-cvc")
    const inputName = $("input-name")
    const inputNumber = $("input-number")
    const inputMonth = $("input-month")
    const inputYear = $("input-year")
    const inputCvc = $("input-cvc")
    const buttonCreditCard = $("buttonCreditCard")
    //console.log(inputCvc, inputMonth, inputYear, inputCvc, inputName, inputNumber,)
    inputName.addEventListener('keyup',() => cardName.textContent = inputName.value)
    inputNumber.addEventListener('keyup',() => {
        keyup = inputNumber.value
        keyupSeparate = [...keyup].reduce((p, c, i) => p += (i && !(i % 4)) ? "  " + c : c, "");;
        cardNumber.textContent = keyupSeparate
        if(inputNumber.value.length == 16){
            inputNumber.disabled = true;
        }
        })
    inputMonth.addEventListener('keyup',() => {
        cardMonth.textContent = inputMonth.value
        if(inputMonth.value.length == 2){
            inputMonth.disabled = true;
        }
    })
    inputYear.addEventListener('keyup',() => {
        cardYear.textContent = inputYear.value
        if(inputYear.value.length == 2 ){
            inputYear.disabled = true;
        }
    })
    inputCvc.addEventListener('keyup',() => {
        cardCvc.textContent = `CVC: ${inputCvc.value}`
        if(inputCvc.value.length == 4){
            inputCvc.disabled = true;
        }
    })
    buttonCreditCard.addEventListener('click',(e) => {
        e.preventDefault();
        if(inputCvc.value.length < 3 || inputNumber.value.length < 16 || inputMonth.value.length < 2 || inputYear.value.length < 2){
            console.log("error de datos")
            Swal.fire({
                title: 'Error al ingresar los datos',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Volver a ingresar'
                })
        }else{
            Swal.fire({
                title: '¿Confirmar el pago?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Confirmar'
                }).then((result) => {
                    if (result.isConfirmed) {
                    Swal.fire(
                        'Pago Exitoso!',
                        'Gracias por tu compra'
                    )
                    setTimeout(function(){
                        location.href ="../../index.html";
                        localStorage.removeItem('carrito');
                    }, 1000);
                    }
                })
        }
    })
}
completeCreditCard($)