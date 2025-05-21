import {cart,removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryOption.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary(){
    let cartSummaryHTML='';
    cart.forEach((cartItem)=>{

      const productId=cartItem.productId;
      const matchingProduct=getProduct(productId);
     
      const deliveryOptionId=cartItem.deliveryOptionId;
      const deliveryOption=getDeliveryOption(deliveryOptionId);

      
      const deliveryString=calculateDeliveryDate(deliveryOption);
      
      cartSummaryHTML+=`<div class="cart-item-container
                          js-cart-item-container-${matchingProduct.id}">
                          <div class="delivery-date">
                          Delivery Date :${deliveryString}
                          </div>

                          <div class="cart-item-details-grid">
                            <img class="product-image"
                              src="${matchingProduct.image}">

                            <div class="cart-item-details">
                              <div class="product-name">
                                ${matchingProduct.name}
                              </div>
                              <div class="product-price">
                                $${(matchingProduct.priceCents/100).toFixed(2)}
                              </div>
                              <div class="product-quantity">
                                <span>
                                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary js-update-quantity-link"
                                data-product-id="${matchingProduct.id}">
                                  Update
                                </span>
                                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                                <span class="save-quantity-link link-primary js-save-quantity"
                                data-product-id="${matchingProduct.id}">Save</span>
                                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                                  Delete
                                </span>
                              </div>
                            </div>

                            <div class="delivery-options">
                              <div class="delivery-options-title">
                                Choose a delivery option:
                              </div>
                              
                              ${deliveryOptionsHTML(matchingProduct,cartItem)}
                              
                            </div>
                          </div>
                        </div>`;
    });


    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    function deliveryOptionsHTML(matchingProduct,cartItem){
      let html='';
      deliveryOptions.forEach((deliveryOption)=>{
        const deliveryString=calculateDeliveryDate(deliveryOption);
        const priceString=deliveryOption.priceCents===0
        ? 'FREE'
        :`$${(deliveryOption.priceCents/100).toFixed(2)}`;
        
        const isChecked = deliveryOption.id===cartItem.deliveryOptionId;
        
        html+=`<div class="delivery-option js-delivery-options"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'Checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date js-delivery-date">
          ${deliveryString}
          </div>
          <div class="delivery-option-price">
            ${priceString}-Shipping
          </div>
          </div>
          </div>`;
      });
      return html;
      
    }


    function updateCartQuantity(){
      let cartquantity=calculateCartQuantity();
      document.querySelector('.js-return-to-home-link')
        .innerHTML=`${cartquantity} items`;
      renderPaymentSummary();
    }

    document.querySelectorAll('.js-delete-link')
      .forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          removeFromCart(productId);
          
          // const container=document.querySelector(`.js-cart-item-container-${productId}`);
          // container.remove();
          renderCheckoutHeader();
          renderPaymentSummary();
          renderOrderSummary();
          // updateCartQuantity();
          
        });
        
      });
    ///////////////////////////////////////////
    // updateCartQuantity();
    ///////////////////////////////////////////

    document.querySelectorAll('.js-update-quantity-link')
      .forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          const container=document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add('is-editing-quantity');
          
        });
      });

    document.querySelectorAll('.js-save-quantity')
      .forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          const container=document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');

          const quantityInput=document.querySelector(`.js-quantity-input-${productId}`);      
          const newQuantity = Number(quantityInput.value);
          if(newQuantity<=0 || newQuantity>=1000){
            alert('Quantity must be betweem 1 to 1000');
            return ;
          }
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
          updateQuantity(productId,newQuantity);
          updateCartQuantity();

        });
    });

    document.querySelectorAll('.js-delivery-options')
      .forEach((element)=>{
        element.addEventListener('click',()=>{
          const {productId,deliveryOptionId}=element.dataset;
          updateDeliveryOption(productId,deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        });
        
      });
      

}

