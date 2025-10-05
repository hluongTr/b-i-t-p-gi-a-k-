
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website EliteCar đã tải hoàn tất!");
    
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = '#0d0d0d';
        }
    });

   /* Login page */
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegisterFormLink = document.getElementById('showRegisterForm');
  const showLoginFormLink = document.getElementById('showLoginForm');
  const loginBox = document.getElementById('loginBox');
  const registerBox = document.getElementById('registerBox');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault(); /* không cho reload trang mặc định */
      const username = document.getElementById('username').value.trim(); /* .trim() xóa bỏ khoảng trắng */
      const password = document.getElementById('password').value.trim();

      if (username === "admin" && password === "123") {
        alert("Đăng nhập thành công! Chào mừng " + username);
        window.location.href = "index.html"; /* về trang chủ */
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    });
  }
  
});