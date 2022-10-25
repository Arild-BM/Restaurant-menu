import { menuArray } from './data.js'

const menuId = document.getElementById("menu-id")
const purchaseBtn = document.getElementById("purchase-btn")
const orderItems = document.getElementById("order-items")
const totalPrice = document.getElementById("total-price")
const order = document.getElementById("order")
const paySection = document.getElementById("pay-section")
const payBtn = document.getElementById("pay-btn")
const completeSection = document.getElementById("complete-section")
const userName = document.getElementById('name')
const cardNumber = document.getElementById('card')
const cvv = document.getElementById('cvv')

let menu = ""
let orderList = []
let total = 0
let displayOrder = false

// Create menu, one line for each item in the menu
menuArray.forEach((e) => {
    menu += `
    <div class="menu-item">
        <img src="${e.picture}" alt="${e.name}">
        <div class="center-items">
            <h2>${e.name}</h2>
            <h4>${e.ingredients}</h4>
            <h5>$${e.price}</h5>
        </div>
        <span class="plus" data-menuitem=${e.id}>+</span>
    </div>`
})
//Print completed menu 
menuId.innerHTML = menu

// Listen for click on "+"-sign
document.addEventListener('click', function(e) {
        if (e.target.dataset.menuitem) {
            completeSection.classList.remove("show-complete-section")
            completeSection.innerHTML = ""
            addMenuItem(e.target.dataset.menuitem)
        }
})

// Listen for click on "Remove"
document.addEventListener('click', function(e) {
        if (e.target.dataset.orderitem) {
            removeItem(e.target.dataset.orderitem)
        }
})

// Listen for click on "Complete order"-button
purchaseBtn.addEventListener("click",function () {
    order.classList.add("show-total")
    purchaseBtn.classList.add("show-total")
    paySection.classList.add("show-pay-section")
    totalPrice.classList.remove("total-price-line")
    orderItems.innerHTML = ""
    totalPrice.innerHTML = ""
    total = 0
    orderList = []
})

// Listen for click on "PAY"-button
payBtn.addEventListener("click", function() {
    paySection.classList.remove("show-pay-section")
    completeSection.classList.add("show-complete-section")
    completeSection.innerHTML = `<p>Thanks ${userName.value}! Your order is on its way!</p>`
    userName.value = ""
    card.value = ""
    cvv.value = ""
})

//Add item user order
function addMenuItem(item) {
    const menuItem = menuArray.filter(function(index){
        return index.id === Number(item)
    })[0]
    orderList.push(menuItem)
    renderOrderlist(orderList)
 }

//Remove item from order
function removeItem(index) {
    orderList.splice(index,1)
    renderOrderlist(orderList)
    if (!orderList[0]) {
        displayOrder = false
    }
}

// Create one line for each order item and display the order
function renderOrderlist(list) {
    let listOutput = ""
    let orderIndex = 0
    let sum = 0
    list.forEach((e) => {
        listOutput += `<div class="item-line">
                <div>
                    <h2>${e.name}</h2>
                    <span class="remove" data-orderitem=${orderIndex}>Remove</span>
                </div>
                <h5>$${e.price}</h5>
            </div>`
        orderIndex++
        sum += e.price
        })
    orderItems.innerHTML = listOutput
    total = sum
    renderTotal()
}

// Write order and sum if any item on the order
function renderTotal() {
        if (total > 0) {
            order.classList.remove("show-total")
            purchaseBtn.classList.remove("show-total")
            totalPrice.classList.add("total-price-line")
            totalPrice.innerHTML = `<h2>Total Price:</h2>
                                    <h5>$${total}</h5>`
        } else {
            order.classList.add("show-total")
            purchaseBtn.classList.add("show-total")
            totalPrice.classList.remove("total-price-line")
            totalPrice.innerHTML = ""
        }
}