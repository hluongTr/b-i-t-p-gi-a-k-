
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

  
});