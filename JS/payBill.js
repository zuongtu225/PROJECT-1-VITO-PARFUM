// local______________________________________________________________________________start
const authUser = JSON.parse(localStorage.getItem("authUser"));
const usersAccounts = JSON.parse(localStorage.getItem("usersAccounts"));
const billNeedToPay = JSON.parse(localStorage.getItem("billNeedToPay")) || [];
const productsLocal = JSON.parse(localStorage.getItem("PerfumeProducts"));

// local______________________________________________________________________________end
const userLogin = usersAccounts.find((user) => user.id === authUser.id);
//thông tin đặt hàng
const namePeople = document.getElementById("name");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const listOder = billNeedToPay.listOrder;

let coupon = JSON.parse(localStorage.getItem("Coupon")) || [];
const btnUseCoupon = document.getElementById("btnUseCoupon");
btnUseCoupon.addEventListener("click", () => {
  const discount = document.getElementById("discount").value;
  const newPriceTotal = coupon.find((item) => item.title == discount);
  if (newPriceTotal) {
    const priceMinus = (billNeedToPay.sumMoney * newPriceTotal.discount) / 100;
    billNeedToPay.sumMoney -= priceMinus;
  }
  document.getElementById("printPrice").innerHTML =
    billNeedToPay.sumMoney.toLocaleString() + " " + "đ";
});
renderBill();
function renderBill() {
  const print = document.querySelector(".list-products");
  const totalBill = document.querySelector("#printPrice");
  //auto hiển thị thông tin user
  namePeople.value = userLogin.name;
  email.value = userLogin.email;
  phone.value = userLogin.phone;
  //hiển thị tổng tiền cần thanh toán
  let content = "";
  listOder.forEach((item) => {
    content += ` <div class="item">
    <p class="length">${item.orderQty}</p>
  <img src="../img/${item.img}" alt="" />
  <div class="content-title">  
  <p class="name-product">${item.name} </p>
  <p>${item.type}</p>
  </div>

  <p>${item.price.toLocaleString()} đ</p>
  
</div>`;
  });
  totalBill.innerHTML = billNeedToPay.sumMoney.toLocaleString() + " " + "đ";
  print.innerHTML = content;
}

//tạo mảng chứa lịch sử đơn hàng []
let historyOrders = JSON.parse(localStorage.getItem("historyOrders")) || [];
function payBillDone() {
  //khi nhấn đặt hàng thì mình lấy đc info của user
  let order = {};
  minusQuantity();
  //tạo 1 đối tượng Đơn Hàng mới gồm thông tin Khách Hàng và list sp mua và tổng Tiền đã mua
  if (historyOrders.length === 0) {
    //nếu lịch sử đơn hàng ko có đơn thì id = 1
    order = {
      id: 0, //chỉ là id thứ tự trong lịch sử đơn hàng
      userId: userLogin.id, // idUser để biết thèn nào mua đống hàng đó sau này dễ tìm
      address: userLogin.value,
      name: namePeople.value,
      phone: +phone.value,
      email: userLogin.email,
      date: new Date(),
      codeOrder: Number("2" + (Math.random() * 10000000).toFixed(0)),
      ...billNeedToPay, // phải có list sp đã mua và tổng tiền đã thanh toán
      status: "Processing",
    };
  } else {
    const maxId = Math.max(...historyOrders.map((item) => item.id));
    //nếu lịch sử đã có đơn hàng thì id + 1
    order = {
      id: maxId + 1,
      name: namePeople.value,
      userId: userLogin.id,
      address: userLogin.value,
      phone: +phone.value,
      email: userLogin.email,
      ...billNeedToPay,
      date: new Date(),
      codeOrder: Number("2" + (Math.random() * 10000000).toFixed(0)),
      status: "Processing",
    };
  }
  historyOrders.push(order); //thêm 1 đơn hàng vào lịch sử đơn hàng
  localStorage.setItem("historyOrders", JSON.stringify(historyOrders));
  localStorage.removeItem("billNeedToPay"); //sau khi đặt hàng thì xóa

  userLogin.cart = [];
  localStorage.setItem("usersAccounts", JSON.stringify(usersAccounts));
  const payBill = document.querySelector(".payBill");
  const notify = document.querySelector(".notify");
  payBill.style.display = "none";
  notify.style.display = "block";
}

// payOderDone();
const returnHome = document.querySelector("#returnHome");
returnHome.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

function minusQuantity() {
  const productsLocal = JSON.parse(localStorage.getItem("PerfumeProducts"));
  const billNeedToPay = JSON.parse(localStorage.getItem("billNeedToPay")) || [];
  const listOder = billNeedToPay.listOrder;

  for (let i = 0; i < listOder.length; i++) {
    for (let k = 0; k < productsLocal.length; k++) {
      if (listOder[i].idClick === productsLocal[k].id) {
        productsLocal[k].quantity -= listOder[i].orderQty;
        localStorage.setItem("PerfumeProducts", JSON.stringify(productsLocal));
      }
    }
  }
}
