// lấy danh sách sản phẩm và đổ ra table
function getListProduct(){
    /** method
     * get: lấy dữ liệu
     * post: thêm dữ liệu
     * put: cập nhật
     * delete: xóa
    */
   
   // B1: lấy danh sách sản phẩm từ db.json sử dụng fetch
    fetch(`http://localhost:3000/products`)// mặc định {method:'get'}
        .then((res)=>{
            // console.log(res);
            return res.json();// nhận lại dữ liệu
        })
        .then((data)=>{
            // console.log(data);

            // b2: đổ dữ liệu ra table
            // duyệt mảng data
            const trElements = data?.map((item,index)=>{
                return `
                    <tr>
                        <th scope="row">${index+1}</th>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td><img style="height:70px" src="${item.image}" alt=""></td>
                        <td>
                            <a href="edit.html?id=${item.id}" class="btn btn-warning">Sửa</a>
                        </td>
                    </tr>
                `
            }).join('');// join chuyển 1 mảng về chuỗi
            // console.log(trElements);

            // đổ dữ liệu vào tbody
            const tbodyElement = document.querySelector('tbody');
            tbodyElement.innerHTML = trElements
            
        })
        .catch()

}

getListProduct();