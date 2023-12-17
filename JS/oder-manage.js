const historyOrders = JSON.parse(localStorage.getItem("historyOrders"));
render();
function render() {
  const print = document.querySelector("tbody");
  let content = "";
  historyOrders.forEach((item, index) => {
    content += `
    <tr class="item-order">
    <td><input type="checkbox" name="" id="" /></td>
    <td>${item.codeOrder}</td>
    <td>Chuyển khoản</td>
    <td>${new Date(item.date).toLocaleDateString()}</td>
    <td>${new Date(
      new Date(item.date).getTime() + 259200000
    ).toLocaleDateString()}</td>
    <td><button style="background-color: ${
      item.status === "Processing"
        ? "lightBlue"
        : item.status === "Done"
        ? "green"
        : "red"
    }" onclick = "status(${item.id})">${item.status}</button> </td>
    <td>${item.sumMoney.toLocaleString()} đ</td>
    <td>
      <button><i class="fa-solid fa-eye"></i></button>
      <button><i class="fa-regular fa-pen-to-square"></i></button>
    </td>
  </tr>`;
  });
  print.innerHTML = content;
}
function status(id) {
  const orderFind = historyOrders.find((item) => item.id === id);

  if (orderFind.status === "Processing") {
    orderFind.status = "Done";
  }
  render(historyOrders);
  localStorage.setItem("historyOrders", JSON.stringify(historyOrders));
  revenue();
}
function statusCancel(id) {
  console.log(id);
}
//doanh thu
revenue();
function revenue() {
  const revenue = document.querySelector("#revenue");
  const historyOrders = JSON.parse(localStorage.getItem("historyOrders"));

  let sum = 0;
  historyOrders.forEach((item) => {
    if (item.status === "Done") {
      sum += item.sumMoney;
    }
  });

  revenue.innerHTML = sum.toLocaleString() + " vnd";
}
