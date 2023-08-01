var _user = JSON.parse(localStorage.getItem("user"));
var app = angular.module("MyApp", []);

app.controller("NguoiDungCtrl", function ($scope, $http) {
  $scope.manguoidung;
  $scope.username;
  $scope.password;
  $scope.anh;
  $scope.ngaytao;
  $scope.submit = "Thêm mới";

  $scope.hoten;
  $scope.diachi;
  $scope.dienthoai;
  $scope.trangthai;

  $scope.lcanh = current_img;
  

  $scope.LoadNguoiDung = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/NguoiDung/user-id?id=" + _user.maNguoiDung,
    }).then(function (response) {
      $scope.listuser = response.data;
      $scope.manguoidung = $scope.listuser.maNguoiDung;
      $scope.username = $scope.listuser.userName;
      $scope.password = $scope.listuser.passWord;
      $scope.anh = $scope.listuser.anh;
     
      $scope.ngaytao = $scope.listuser.ngayTao;
  
      $scope.hoten = $scope.listuser.hoTen;
      $scope.diachi = $scope.listuser.diaChi;
      $scope.dienthoai = $scope.listuser.dienThoai;
      $scope.trangthai = $scope.listuser.trangThai;
    });
  };

  $scope.LoadUser = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/NguoiDung/user-id?id="+_user.maNguoiDung,
    }).then(function (response) {
      $scope.datauser = response.data;
      console.log($scope.datauser)
    });
  };
  $scope.LoadUser()
 

  $scope.save = function () {
    var date = new Date($scope.ngaytao);
    date.setUTCHours(date.getUTCHours() + 7);
    var formattedDate = date.toISOString().slice(0, -8);

    let obj = {};
    obj.MaNguoiDung = $scope.manguoidung;
    obj.UserName = $scope.username;
    obj.PassWord = $scope.password;
    obj.Anh = $scope.anh;
    
    obj.NgayTao = formattedDate;
    obj.HoTen = $scope.hoten;
    obj.DiaChi = $scope.diachi;
    obj.DienThoai = $scope.dienthoai;
    obj.TrangThai = $scope.trangthai;
    console.log(obj);
    var check = confirm("Bạn có chắc muốn sửa thông tin này không?");
    if (check) {
      $http({
        method: "PUT",
        headers: {
          Authorization: "Bearer " + _user.token,
        },
        data: obj,
        url: current_url + "/api/NguoiDung/edit-user",
      }).then(function (response) {        
        alert("Sửa thông tin thành công");
        $scope.LoadNguoiDung();
      });
    }
  };
  $scope.showUploadDialog = function (event) {
    // Ngăn chặn hành động mặc định của thẻ a
    event.preventDefault();
    // Tạo một input[type="file"]
    var input = document.createElement("input");
    input.type = "file";

    // Gắn sự kiện 'change' để xử lý khi người dùng chọn file ảnh
    angular.element(input).on("change", function (event) {
      // Xử lý khi người dùng chọn file ảnh ở đây
      var file = event.target.files[0];
      if (file != undefined) {
        var formData = new FormData();
        formData.append("file", file);
        $http({
          method: "POST",
          headers: {
            Authorization: "Bearer " + _user.token,
            "Content-Type": undefined,
          },
          data: formData,
          url: current_url + "/api/SanPham/Upload-file",
          transformRequest: angular.identity,
        }).then(function (res) {
          
          $scope.anh = res.data;
          
          $scope.save();
        });
      }
    });

    // Click vào input[type="file"] để hiển thị cửa sổ chọn file
    input.click();

    // var file = document.getElementById("file").files[0];
  };


  //Quản lý người dùng
  $scope.LoadAllNguoiDung = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/NguoiDung/get-all-users",
    }).then(function (response) {
      $scope.listalluser = response.data;     
      console.log($scope.listuser) 
    });
  };

  $scope.LoadAllNguoiDung();
  $scope.LoadNguoiDung();
});
