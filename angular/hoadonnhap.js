var _user = JSON.parse(localStorage.getItem("user"));
var app = angular.module("MyApp", []);
app.controller("HoaDonNhapCtrl", function ($scope, $http) {
  $scope.submit = "Thêm mới";
  $scope.mahoadonnhap;
  $scope.manhacungcap;
  $scope.manguoidung;
  $scope.ngaynhap;
  $scope.nameuser;


  $scope.loadnew = function () {
    $scope.mahoadonnhap = "";
    $scope.manhacungcap = "";
    $scope.manguoidung = "";
    $scope.ngaynhap = "";  
  };

  $scope.LoadHoaDonNhap= function () {
    $http({
      method: "GET",
    //   headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/HoaDonNhap/get-all-input-bill",
    }).then(function (response) {
      $scope.listhoadonnhap = response.data;
      console.log($scope.listhoadonnhap)
    });
  };
  $scope.LoadNguoiDung= function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/LoaiSanPham/get-all-cate",
    }).then(function (response) {
      $scope.listLoaiSP = response.data;

    });
  };

  

  $scope.save = function () {
    let obj = {};
    obj.MaSanPham = Number($scope.masanpham);
    obj.TenSanPham = $scope.tensanpham;
    obj.MaLoai = $scope.maloai;
    obj.GiaBan = $scope.giaban;
    obj.SoLuong = $scope.soluong;
    obj.MoTa = $scope.mota;
    obj.ChiTietSanPham = $scope.chitietsanpham;

    var file = document.getElementById("file").files[0];
    console.log(file);
    if (file != undefined) {
      var formData = new FormData();
      formData.append("image", file);
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
        obj.Anh = res.data.filePath;
        if ($scope.submit == "Thêm mới") {
          $http({
            method: "POST",
            headers: {
              Authorization: "Bearer " + _user.token,
            },
            data: obj,
            url: current_url + "/api/SanPham/Them-SanPham",
          }).then(function (response) {
            $scope.LoadSanPham();
            alert("Thêm sản phẩm thành công");
            $scope.loadnew();
          });
        }
        else{
            
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
                  url: current_url + "/api/SanPham/Sua-SanPham",
                }).then(function (response) {
                  $scope.LoadSanPham();
                  alert("Sửa sản phẩm thành công");
                  $scope.loadnew();
                });
              }
        }
      });
    }
    else{
        obj.Anh = $scope.anh;
        if($scope.submit == "Sửa"){
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
                  url: current_url + "/api/SanPham/Sua-SanPham",
                }).then(function (response) {
                  $scope.LoadSanPham();
                  alert("Sửa sản phẩm thành công");
                  $scope.loadnew();
                });
              }
        }
    }
    
  };

  $scope.sua = function (id) {
    $scope.submit = "Sửa";
    $http({
      method: "GET",
      headers: {
        Authorization: "Bearer " + _user.token,
      },
      url: current_url + "/api/SanPham/Get-Product-Id/" + id,
    }).then(function (response) {
      $scope.masanpham = response.data.maSanPham;
      $scope.tensanpham = response.data.tenSanPham;
      $scope.maloai = response.data.maLoai;

      $scope.anh = response.data.anh;
      $scope.giaban = response.data.giaBan;
      $scope.soluong = response.data.soLuong;
      $scope.mota = response.data.moTa;
      $scope.chitietsanpham = response.data.chiTietSanPham;
      
    });
  };

  $scope.delete = function (id) {
    var ktra = confirm(
      "Bạn có chắc muốn xóa sản phẩm này ra khỏi danh sách không?"
    );
    if (ktra) {
      $http({
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + _user.token,
        },
        url: current_url + "/api/SanPham/Xoa-SanPham?id=" + id,
      }).then(function (response) {
        alert("Xóa sản phẩm thành công");
        $scope.LoadSanPham();
      });
    }
  };
  $scope.LoadHoaDonNhap();
});
