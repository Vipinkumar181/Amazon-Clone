import {cart,calculateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOption.js';



export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  cart.forEach((cartItem)=>{

  const product=getProduct(cartItem.productId);
  productPriceCents+=(product.priceCents)*(cartItem.quantity);

    
  const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId)
  shippingPriceCents+=deliveryOption.priceCents;
    
  });
  // console.log(productPriceCents/100); 
  // console.log(shippingPriceCents/100);
  const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
  const estimatedTaxCens=totalBeforeTaxCents*0.1;
  const totalCents=totalBeforeTaxCents+estimatedTaxCens;
  const paymentSummaryHTML=
  `   <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${(productPriceCents/100).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(shippingPriceCents/100).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(totalBeforeTaxCents/100).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(estimatedTaxCens/100).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
      </div>
      <a href="orders.html">
      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
      </a>
  `;

  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}

