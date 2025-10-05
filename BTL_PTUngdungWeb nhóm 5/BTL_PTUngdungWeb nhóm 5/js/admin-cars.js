//Dữ liệu thử nghiệm
let cars = [{
    id: 1,
    name: "Ferrari SF90 Stradale",
    brand: "Ferrari",
    year: 2023,
    price: 13800000000,
    image: "images/ferrari.jpg",
    status: "available",
    description: "Siêu xe hybrid hiệu năng cao"
},

{
    id: 2,
    name: "Lamborghini Aventador SVJ",
    brand: "Lamborghini",
    year: 2024,
    price: 12000000000,
    power: 770,
    image: "images/lamborghini.jpg",
    status: "available",
    description: "Siêu xe V12 mạnh mẽ"
},

{
    id: 3,
    name: "Porsche 911 Turbo S",
    brand: "Porsche",
    year: 2024,
    price: 15790000000,
    power: 640,
    image: "images/pordche.jpg",
    status: "sold",
    description: "Xe thể thao hiệu suất cao"
}
];

let currentEditId = null;

// Hiển thị danh sách xe
function renderCars(carsToRender = cars) {
    const tbody = document.getElementById('carTableBody');
    tbody.innerHTML = '';//xóa nội dung cũ để tránh trùng

    carsToRender.forEach((car, index) => {//forEach giúp lặp qua từng xe trong mảng,car chứa thông tin và index bắt đầu từ 0
        const row = document.createElement('tr');//tạo table row mới chứa dữ liệu từng xe
        //gán dữ liệu HTML cho dòng
        row.innerHTML = ` 
            <td>${index + 1}</td> 
            <td><img src="${car.image}" alt="${car.name}" class="car-image" onerror="this.src='images/placeholder.jpg'"></td>
            <td><strong>${car.name}</strong></td>
            <td>${car.brand}</td>
            <td>${car.year}</td>
            <td class="price">${formatPrice(car.price)}</td>
            <td><span class="status ${car.status}">${car.status === 'available' ? 'Còn Hàng' : 'Đã Bán'}</span></td>
            <td class="actions">
                <button class="btn btn-edit" onclick="editCar(${car.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-delete" onclick="deleteCar(${car.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </td>
        `;
        tbody.appendChild(row); //sau khi tạo xong tr sẽ được thêm vào tablebody
    });
    updateStats();//cập nhật số liệu
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price); //theo định dạng Việt Nam đồng
}

// Cập nhật thống kê
function updateStats() {
    document.getElementById('totalCars').textContent = cars.length;
    document.getElementById('availableCars').textContent = cars.filter(c => c.status === 'available').length;
    document.getElementById('soldCars').textContent = cars.filter(c => c.status === 'sold').length;
}

// Mở modal thêm xe
function openAddModal() {
    currentEditId = null; //báo đang ở chế độ thêm mới
    document.getElementById('modalTitle').textContent = 'Thêm Xe Mới';
    document.getElementById('carForm').reset(); //xóa input
    document.getElementById('carId').value = '';
    document.getElementById('carModal').style.display = 'block'; //hiện modal
}

// Sửa xe
function editCar(id) {
    currentEditId = id;
    const car = cars.find(c => c.id === id); //tìm obj car theo id
    if (!car) { alert('Không tìm thấy xe'); return; }

    document.getElementById('modalTitle').textContent = 'Chỉnh Sửa Xe';
    document.getElementById('carId').value = car.id;
    document.getElementById('carName').value = car.name;
    document.getElementById('carBrand').value = car.brand;
    document.getElementById('carYear').value = car.year;
    document.getElementById('carPrice').value = car.price;
    document.getElementById('carPower').value = car.power;
    document.getElementById('carImage').value = car.image;
    document.getElementById('carStatus').value = car.status;
    document.getElementById('carDescription').value = car.description;
    document.getElementById('carModal').style.display = 'block';
}

// Xóa xe
function deleteCar(id) {
    if (confirm('Bạn có chắc chắn muốn xóa xe này?')) { //xác nhận hàm blocking
        cars = cars.filter(c => c.id !== id); //tạo mảng mới không chứa xe có id đó
        renderCars();
        alert('Đã xóa xe thành công!');
    }
}

// Đóng modal
function closeModal() {
    document.getElementById('carModal').style.display = 'none';
}

// Submit form
document.getElementById('carForm').addEventListener('submit', function (e) {
    e.preventDefault(); //ngăn reload trang khi submitform
    const carData = {
        id: currentEditId || Date.now(),
        name: document.getElementById('carName').value,
        brand: document.getElementById('carBrand').value,
        year: parseInt(document.getElementById('carYear').value),
        price: parseInt(document.getElementById('carPrice').value),
        power: parseInt(document.getElementById('carPower').value) || 0,
        image: document.getElementById('carImage').value || 'images/placeholder.jpg',
        status: document.getElementById('carStatus').value,
        description: document.getElementById('carDescription').value
    };

    if (currentEditId) {
        // Cập nhật xe
        const index = cars.findIndex(c => c.id === currentEditId);
        cars[index] = carData;
        alert('Đã cập nhật xe thành công!');
    } else {
        // Thêm xe mới
        cars.push(carData);
        alert('Đã thêm xe mới thành công!');
    }

    renderCars();
    closeModal();
});

// Tìm kiếm
document.getElementById('searchInput').addEventListener('input', function (e) { //.addEventListener:sự kiện khi ng dùng gõ chữ
    const searchTerm = e.target.value.toLowerCase();//e.target....lấy giá trị đang nhập,k phân biệt hoa thường
    const filteredCars = cars.filter(car => //lọc ds
        car.name.toLowerCase().includes(searchTerm) ||
        car.brand.toLowerCase().includes(searchTerm)
    );
    renderCars(filteredCars);//hiển thị
});

// Đóng modal khi click bên ngoài
window.onclick = function (event) {//mọi cú click trên trang
    const modal = document.getElementById('carModal');
    //phần tử ng dùng click:event.target
    if (event.target === modal) {//click vào vùng ngoài modal
        closeModal();//ẩn modal
    }
};

// Khởi tạo trang
renderCars();