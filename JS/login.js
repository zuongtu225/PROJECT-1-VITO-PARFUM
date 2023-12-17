const cartRender = document.querySelector("#cartRender");
cartRender.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
const length = document.querySelector("#length-cart");
length.innerHTML = 0;

const usersAccLocal = JSON.parse(localStorage.getItem("usersAccounts"));
const btnLogin = document.querySelector("#btn-login");
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const emailImport = document.getElementById("email").value;
  const passWordImport = document.getElementById("password").value;
  const userImport = {
    email: emailImport,
    passWord: passWordImport,
  };

  // tìm tài khoản có hay không trên local
  const userLogin = usersAccLocal.find(
    (item) =>
      item.email == userImport.email && item.passWord == userImport.passWord
  );
  //Nếu userLogin có giá trị (không phải null, undefined hoặc false), điều kiện trong if sẽ được thực thi.
  if (userLogin) {
    if (userLogin.id === 0) {
      window.location.href = "../index.html";
      localStorage.setItem("authAdmin", JSON.stringify(userLogin));
    } else if (userLogin.status === true) {
      window.location.href = "../index.html";
      localStorage.setItem("authUser", JSON.stringify(userLogin));
    } else if (userLogin.status === false) {
      const accBlock = document.getElementById("accBlock");
      accBlock.innerHTML = "Tài khoản của bạn đã bị khóa!";
    }
  } else {
    const newError = {
      isError: false,
      passwordMSG: "",
    };
    newError.isError = true;
    newError.passwordMSG = "Email hoặc mật khẩu không đúng!";
    renderError(newError);
  }
});

function renderError(newError) {
  const passwordMSG = document.querySelector("#passwordMSG");
  passwordMSG.innerHTML = newError.passwordMSG;
}
