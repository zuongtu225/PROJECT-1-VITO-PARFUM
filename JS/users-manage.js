// admin_________________________________________________start
const authAdmin = JSON.parse(localStorage.getItem("authAdmin"));
//authAdmin admin ở bên login chuyển tới
const accUsersLocal = JSON.parse(localStorage.getItem("usersAccounts"));
if (authAdmin) {
}

function renderAllUsers() {
  const print = document.querySelector("tbody");
  let content = "";
  accUsersLocal.forEach((user, index) => {
    content += ` 
       <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
              <td>${user.role}</td>
              <td class="status">${
                user.role === "admin"
                  ? ""
                  : `<button style="background-color: ${
                      user.status === true ? "green" : "red"
                    } " onclick="statusUser(${user.id})">
                    ${user.status === true ? "ON" : "OFF"}</button>`
              }</td>
              <td><i class="fa-solid fa-eye"></i></td>
        </tr>`;
  });
  // khi click vào label, checkbox tương ứng sẽ được chọn.
  print.innerHTML = content;
}
function statusUser(id) {
  const userFinded = accUsersLocal.find((user) => user.id === id);

  if (userFinded.status === true) {
    userFinded.status = false;
  } else {
    userFinded.status = true;
  }
  console.log("new", accUsersLocal);
  localStorage.setItem("usersAccounts", JSON.stringify(accUsersLocal));
  renderAllUsers(accUsersLocal);
}
renderAllUsers();
