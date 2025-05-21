import {cart,removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption} from './cart.js';
import { uuid} from './uuid.js';
import {getProduct,products} from './products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption,calculateDeliveryDate} from './deliveryOption.js';

export let orders=[];
  // orders=JSON.parse(localStorage.getItem('orders')) ;
// if(!orders){
//   orders=[{
//   orderId:'bf55d098-8455-2e04-d3f0-b278ec3a188f',
//   totalCents:2098,
//   date:'June 31'
//   }]

// }


  // localStorage.setItem('orders',JSON.stringify(orders));
 



export function Order(){
  let orderId=uuid();
  let shippingPriceCents=0;
  let productPriceCents=0;
  let totalCents=0;
  let today;
  cart.forEach((cartItem)=>{
    
    const productId=cartItem.productId;
    const product=getProduct(productId);
    productPriceCents+=(product.priceCents)*(cartItem.quantity);
  
    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents+=deliveryOption.priceCents;
    const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
    const estimatedTaxCens=totalBeforeTaxCents*0.1;
    totalCents=totalBeforeTaxCents+estimatedTaxCens;
    today=dayjs().format('MMMM D');
    
  });
  orders.push({
    orderId:orderId,
    totalCents:totalCents,
    date:today
  })
  }

// export function buyItAgain(){
//   document.querySelectorAll('.js-buy-again').forEach((link)=>{
//     link.addEventListener('click',()=>{
//       const productId=link.dataset.productId;
//       cart.forEach((cartItem)=>{
//         const productID=link.dataset.productId;
//         console.log(productId);
//         const product=getProduct(productID);
//         product.quantity+=1;

//       });
//     });
//   });
//   productDetail();
// }

export function addOrders(){
    let orderHtml='';
    orders.forEach((order)=>{
      orderHtml+=`
            <div class="order-container">
              
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${order.date}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${(order.totalCents/100).toFixed(2)}</div>
                  </div>
                </div>

                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.orderId}</div>
                </div>
              </div>

              <div class="order-details-grid">               
                ${productDetail()}
              </div>
            </div>`;
          });
          document.querySelector('.js-orders-grid').innerHTML=orderHtml;
          let productId;
          document.querySelectorAll('.js-track-package').forEach((link)=>{
            link.addEventListener('click',()=>{
              productId=link.dataset.productId;
              // console.log(productId);
            });
          });
        
      
      return productId;
};





export function productDetail(){
  
  let productHtml='';
  cart.forEach((cartItem)=>{
    
    const product=getProduct(cartItem.productId);
    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);   
    const deliveryString=calculateDeliveryDate(deliveryOption);
    function calCartQuantity(){
      let cartQuantity=0;
      cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
      });
      return cartQuantity ;
    }
    
    document.querySelector('.js-cart').innerHTML=`${calCartQuantity()}`;
    
  productHtml+=`
                <div class="product-image-container">
                  <img src="${product.image}">
                </div>

                <div class="product-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-delivery-date">
                    Arriving on: ${deliveryString}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${cartItem.quantity}
                  </div>
                  <button class="buy-again-button button-primary js-buy-again" data-product-id=${cartItem.productId}>
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </div>

                <div class="product-actions">
                  <a href="tracking.html" >
                    <button class="track-package-button button-secondary js-track-package" data-product-id=${cartItem.productId}
                    data-order-id=${orders.orderId}>
                      Track package
                    </button>
                  </a>
                </div>`;

  });
  
  return productHtml;
}


