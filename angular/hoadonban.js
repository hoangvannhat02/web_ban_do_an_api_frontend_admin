var _user = JSON.parse(localStorage.getItem("user"));
var app = angular.module("MyApp", []);
app.controller("HoaDonBanCtrl", function ($scope, $http) {
  $scope.mahoadon;
  $scope.makhachhang;
  $scope.ngaytao;
  $scope.diachinhan;
  $scope.trangthai;
  $scope.mota;
  $scope.tongtien = 0;

  
  $scope.LoadHoaDonBan = function () {
    $http({
      method: "GET",
      //   headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/HoaDonBan/get-all-output-bill",
    }).then(function (response) {
      $scope.listhoadonban = response.data;
      console.log($scope.listhoadonban);
    });
  };

  $scope.xemchitietkhachhang = function(id){
    $http({
        method: "GET",
        //   headers: { Authorization: "Bearer " + _user.token },
        url: current_url + "/api/HoaDonBan/Get-Customer-Id?id="+id,
      }).then(function (response) {
        $scope.infocustomer = response.data;
      });
  }

  $scope.chitietdonhang = function(id){
    $http({
        method: "GET",
        //   headers: { Authorization: "Bearer " + _user.token },
        url: current_url + "/api/HoaDonBan/Get-Output-Bill-Id?id="+id,
      }).then(function (response) {
        $scope.danhsachsanpham = response.data;
        
        console.log($scope.danhsachsanpham);
      });
  }

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
        // headers: {
        //   Authorization: "Bearer " + _user.token,
        // },
        url: current_url + "/api/HoaDonBan/delete-output-bill?id=" + id,
      }).then(function (response) {
        alert("Xóa sản phẩm thành công");
        $scope.LoadHoaDonBan();
      });
    }
  };
  $scope.LoadHoaDonBan();
});
