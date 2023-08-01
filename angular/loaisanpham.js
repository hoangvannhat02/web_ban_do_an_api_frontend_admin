var _user = JSON.parse(localStorage.getItem("user"));
var app = angular.module("MyApp", []);
app.controller("LoaiSanPhamCtrl", function ($scope, $http) {
  $scope.submit = "Thêm mới";
  $scope.maloai;
  $scope.tenloai;
  $scope.mota;

  $scope.loadnew = function () {
    $scope.maloai = "";
    $scope.tenloai = "";
    $scope.mota = "";
  };

  $scope.LoadLoaiSanPham = function () {
    $http({
      method: "GET",
      //   headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/LoaiSanPham/get-all-cate",
    }).then(function (response) {
      $scope.listLoaiSP = response.data;
    });
  };
  $scope.save = function () {
    let obj = {};
    obj.MaLoai = $scope.maloai;
    obj.TenLoai = $scope.tenloai;
    obj.MoTa = $scope.mota;
    if ($scope.submit == "Thêm mới") {
      $http({
        method: "POST",
        // headers: {
        //   Authorization: "Bearer " + _user.token,
        // },
        data: obj,
        url: current_url + "/api/LoaiSanPham/Add-Category",
      }).then(function (response) {
        $scope.LoadLoaiSanPham();
        alert("Thêm loại sản phẩm thành công");
        $scope.loadnew();
      });
    } else {
      var check = confirm("Bạn có chắc muốn sửa thông tin loại sản phẩm này không?");
      if (check) {
        $http({
          method: "PUT",
        //   headers: {
        //     Authorization: "Bearer " + _user.token,
        //   },
          data: obj,
          url: current_url + "/api/LoaiSanPham/Update-Category",
        }).then(function (response) {
          $scope.LoadLoaiSanPham();
          alert("Sửa loại sản phẩm thành công");
          $scope.loadnew();
        });
      }
    }
  };

  $scope.sua = function (id) {
    $scope.submit = "Sửa";
    $http({
      method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + _user.token,
    //   },
      url: current_url + "/api/LoaiSanPham/Get-Category-Id?id=" + id,
    }).then(function (response) {
      $scope.maloai = response.data.maLoai;
      $scope.tenloai = response.data.tenLoai;
      $scope.mota = response.data.moTa;
    });
  };

  $scope.delete = function (id) {
    var ktra = confirm(
      "Bạn có chắc muốn xóa loại sản phẩm này ra khỏi danh sách không?"
    );
    if (ktra) {
      $http({
        method: "DELETE",
        // headers: {
        //   Authorization: "Bearer " + _user.token,
        // },
        url: current_url + "/api/LoaiSanPham/delete-category?id=" + id,
      }).then(function (response) {
        alert("Xóa loại sản phẩm thành công");
        $scope.LoadLoaiSanPham();
      });
    }
  };

    $scope.loadnew();
  $scope.LoadLoaiSanPham();
});
