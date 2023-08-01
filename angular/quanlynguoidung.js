var _user = JSON.parse(localStorage.getItem("user"));
var app = angular.module("MyApp", []);

app.controller("QuanLyNguoiDungCtrl", function ($scope, $http) {
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

  $scope.loadnew = function () {
    $scope.manguoidung = "";
    $scope.username = "";
    $scope.password = "";
    $scope.anh = "";
    $scope.ngaytao = "";
   

    $scope.hoten = "";
    $scope.diachi = "";
    $scope.dienthoai = "";
    $scope.trangthai = "";
  };

  $scope.save = function () {
    var date = new Date($scope.ngaytao);
    date.setUTCHours(date.getUTCHours() + 7);
    var formattedDate = date.toISOString().slice(0, -8);

    let obj = {};
    obj.MaNguoiDung = $scope.manguoidung;
    obj.UserName = $scope.username;
    obj.PassWord = $scope.password;

    obj.NgayTao = formattedDate;
    obj.HoTen = $scope.hoten;
    obj.DiaChi = $scope.diachi;
    obj.DienThoai = $scope.dienthoai;
    obj.TrangThai = $scope.trangthai;
    console.log(obj);
    var file = document.getElementById("file").files[0];
    console.log(file);
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
        console.log(res);
        obj.Anh = res.data;
        if ($scope.submit == "Thêm mới") {
          $http({
            method: "POST",
            headers: {
              Authorization: "Bearer " + _user.token,
            },
            data: obj,
            url: current_url + "/api/NguoiDung/add-user",
          }).then(function (response) {
            $scope.LoadAllNguoiDung();
            alert("Thêm người dùng thành công");
            $scope.loadnew();
          });
        } else {
          var check = confirm(
            "Bạn có chắc muốn sửa thông tin sản phẩm này không?"
          );
          if (check) {
            $http({
              method: "PUT",
              headers: {
                Authorization: "Bearer " + _user.token,
              },
              data: obj,
              url: current_url + "/api/NguoiDung/edit-user",
            }).then(function (response) {
              $scope.LoadAllNguoiDung();
              alert("Sửa thông tin thành công");
              $scope.loadnew();
            });
          }
        }
      });
    } else {
      obj.Anh = $scope.anh;
      if ($scope.submit == "Sửa") {
        var check = confirm(
          "Bạn có chắc muốn sửa thông tin sản phẩm này không?"
        );
        if (check) {
          $http({
            method: "PUT",
            headers: {
              Authorization: "Bearer " + _user.token,
            },
            data: obj,
            url: current_url + "/api/NguoiDung/edit-user",
          }).then(function (response) {
            $scope.LoadAllNguoiDung();
            alert("Sửa sản phẩm thành công");
            $scope.loadnew();
          });
        }
      }
    }
  };

  $scope.LoadUser = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/NguoiDung/user-id?id=" + _user.maNguoiDung,
    }).then(function (response) {
      $scope.datauser = response.data;
      console.log($scope.datauser);
    });
  };
  $scope.LoadUser();
  //Quản lý người dùng
  $scope.LoadAllNguoiDung = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/NguoiDung/get-all-users",
    }).then(function (response) {
      $scope.listalluser = response.data;
      console.log($scope.listuser);
    });
  };
  $scope.LoadNguoiDung = function (id) {
    $scope.submit = "Sửa";
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/NguoiDung/user-id?id=" + id,
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

  $scope.delete = function (id) {
    var ktra = confirm(
      "Bạn có chắc muốn xóa người dùng này ra khỏi danh sách không?"
    );
    if (ktra) {
      $http({
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + _user.token,
        },
        url: current_url + "/api/NguoiDung/delete-user?id=" + id,
      }).then(function (response) {
        alert("Xóa người dùng thành công");
        $scope.LoadAllNguoiDung();
      });
    }
  };

  

  $scope.LoadAllNguoiDung();
});
