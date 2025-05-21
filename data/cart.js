import { deliveryOptions } from "../data/deliveryOption.js";

export let cart = [] ;
cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:1,
    deliveryOptionId:'1'
  },{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
  }];
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}


export function addToCart(productId){

  const quantitySelector=document.querySelector(`.js-product-quantity-selector-${productId}`);
  const quantity=Number(quantitySelector.value);

  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }});
    if(matchingItem){
      matchingItem.quantity+=quantity;
    }
    else{
      cart.push({
      productId:productId,
      quantity:quantity,
      deliveryOptionId:'1'
    });
    }

  
    saveToStorage();
}

export function removeFromCart(productId){
  let newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
}


export function calculateCartQuantity(){
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  });
  saveToStorage();
  return cartQuantity ;
}

export function updateQuantity(productId,newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  
  saveToStorage();
  return 
}


export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }});
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveToStorage();
}


