var _user = JSON.parse(localStorage.getItem("user"));
var app = angular.module("MyApp", []);
app.controller("NhaCungCapCtrl", function ($scope, $http) {
  $scope.submit = "Thêm mới";
  $scope.mancc;
  $scope.tenncc;
  $scope.diachi;
  $scope.sdt;
  $scope.email;

  $scope.loadnew = function () {
    $scope.mancc = "";
    $scope.tenncc = "";
    $scope.diachi = "";
    $scope.sdt = "";
    $scope.email = "";
  };

  $scope.LoadNhaCungCap = function () {
    $http({
      method: "GET",
      //   headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/NhaCungCap/get-all-sup",
    }).then(function (response) {
      $scope.listncc = response.data;
    });
  };
  $scope.save = function () {
    let obj = {};
    obj.MaNhaCungCap = Number($scope.mancc);
    obj.HoTen = $scope.tenncc;
    obj.DiaChi = $scope.diachi;
    obj.DienThoai = $scope.sdt;
    obj.Email = $scope.email;
    if ($scope.submit == "Thêm mới") {
      $http({
        method: "POST",
        // headers: {
        //   Authorization: "Bearer " + _user.token,
        // },
        data: obj,
        url: current_url + "/api/NhaCungCap/Add-Supplier",
      }).then(function (response) {
        $scope.LoadNhaCungCap();
        alert("Thêm nhà cung cấp thành công");
        $scope.loadnew();
      });
    } else {
      var check = confirm(
        "Bạn có chắc muốn sửa thông tin nhà cung cấp này không?"
      );
      if (check) {
        $http({
          method: "PUT",
          //   headers: {
          //     Authorization: "Bearer " + _user.token,
          //   },
          data: obj,
          url: current_url + "/api/NhaCungCap/Update-Supplier",
        }).then(function (response) {
          $scope.LoadNhaCungCap();
          alert("Sửa nhà cung cấp thành công");
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
      url: current_url + "/api/NhaCungCap/Get-Sup-Id?id=" + id,
    }).then(function (response) {
      $scope.mancc = response.data.maNhaCungCap;
      $scope.diachi = response.data.diaChi;
      $scope.sdt = response.data.dienThoai;
      $scope.tenncc = response.data.hoTen;
      $scope.email = response.data.email;
    });
  };

  $scope.delete = function (id) {
    var ktra = confirm(
      "Bạn có chắc muốn xóa nhà cung cấp này ra khỏi danh sách không?"
    );
    if (ktra) {
      $http({
        method: "DELETE",
        // headers: {
        //   Authorization: "Bearer " + _user.token,
        // },
        url: current_url + "/api/NhaCungCap/delete-supplier?id=" + id,
      }).then(function (response) {
        alert("Xóa nhà cung cấp thành công");
        $scope.LoadNhaCungCap();
      });
    }
  };

  $scope.loadnew();
  $scope.LoadNhaCungCap();
});
