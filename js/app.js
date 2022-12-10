const btnCart = document.querySelector('.container-cart-icon')

const containerCartProduct = document.querySelector(".container-cart-product")

btnCart.addEventListener('click', ()=>{
    containerCartProduct.classList.toggle('hidden-cart')
})



const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')
const listproduct = document.querySelector('.container-items')
const total = document.querySelector(".total-pagar")
const totalContainer = document.querySelector(".cart-total")
const counterProduct = document.querySelector("#contador-productos")
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.btn-cart-container');


let allProduct =[]

listproduct.addEventListener('click', e =>{
    if(e.target.classList.contains('addcarr')){
        const product = e.target.parentElement
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent
        }

        const exits = allProduct.some(product => product.title === infoProduct.title)

        if (exits) {
			const products = allProduct.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProduct = [...products];
		} else {
			allProduct = [...allProduct, infoProduct];
		}

        showHTML()
        totolir();
    }
    
})


rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProduct = allProduct.filter(
			product => product.title !== title
		);
        
		showHTML();
        totolir();
	}
});


totolir = () => {
    let suma = 0
    let count = 0
    const totalsuma = allProduct.forEach((item)=>{
        suma += Number(item.price.substring(4))*item.quantity
        count += item.quantity
    })
    total.innerHTML = `S/. ${suma.toFixed(2)}`
    counterProduct.innerHTML = count
}

showHTML = () => {
    
    if(allProduct.length > 0){
        cartTotal.classList.remove('hidden-empty')
        totalContainer.classList.remove('hidden-empty')
        cartEmpty.classList.add('hidden-empty')
    } else{
        cartTotal.classList.add('hidden-empty')
        totalContainer.classList.add('hidden-empty')
        cartEmpty.classList.remove('hidden-empty')
    }

    rowProduct.innerHTML = ''
    allProduct.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')
        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>                        
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `
        rowProduct.append(containerProduct)
    })
}


const urlJson = './js/productJson.json'


const getData = async () => {
    const datos = await fetch(urlJson);
    const data = await datos.json();
    data.forEach( p => {
        const itemProduct = document.createElement('div')
        itemProduct.classList.add('item')
        itemProduct.innerHTML = `
        <figure>
            <img src="${p.image}"></img>
        </figure>
        <div class="info-product">
            <h2>${p.titleProduct}</h2>
            <p class="price">${p.price}</p>
            <button class="addcarr">Añadir al Carrito</button>
        </div>
        `;
        listproduct.append(itemProduct);
    })
}

getData();



