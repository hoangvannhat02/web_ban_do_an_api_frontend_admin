var _user = JSON.parse(localStorage.getItem("user")) || [];
var app = angular.module("MyApp", ['ui.bootstrap']);
app.service('searchService', function($http) {
  this.search = function(searchTerm, page, pageSize) {
    return $http({
      method: 'POST',
      url: current_url + '/api/SanPham/Tim-Kiem',
      headers: {
        'Authorization': 'Bearer ' + _user.token,
        'Content-Type': 'application/json'
      },
      data: {
        search: searchTerm,
        page: page,
        pagesize: pageSize
      }
    });
  };
});

app.controller("SanPhamCtrl", function ($scope, $http,searchService) {

  $scope.submit = "Thêm mới";
  $scope.masanpham;
  $scope.tensanpham;
  $scope.maloai;
  $scope.anh;
  $scope.giaban;
  $scope.soluong;
  $scope.mota;
  $scope.chitietsanpham;

  $scope.lcanh = current_img;

  $scope.searchTerm = '';
  $scope.totalCount = 0;
  $scope.currentPage = 1;
  $scope.pageSize = 10;

  //Tìm kiếm
  $scope.doSearch = function() {
    searchService.search($scope.searchTerm, $scope.currentPage, $scope.pageSize)
      .then(function(response) {
        $scope.filteredSanPham = response.data.results;
        $scope.totalCount = response.data.totalCount;
        
      });
  };
  
  $scope.pageChanged = function() {
    $scope.doSearch();
  }

  // $scope.doSearch();

  
  $scope.LoadUser = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      // data: { page: $scope.page, pageSize: $scope.pageSize },
      url: current_url + "/api/NguoiDung/user-id?id="+_user.maNguoiDung,
    }).then(function (response) {
      $scope.datauser = response.data;
      console.log($scope.datauser)
    });
  };
  $scope.LoadUser()
  

  $scope.submit = "Thêm mới";

  $scope.loadnew = function () {
    $scope.masanpham = "";
    $scope.tensanpham = "";
    $scope.maloai = "";
    $scope.anh = "";
    $scope.giaban = "";
    $scope.soluong = "";
    $scope.mota = "";
    $scope.chitietsanpham = "";
  };

  $scope.LoadSanPham = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      // data: { page: $scope.page, pageSize: $scope.pageSize },
      url: current_url + "/api/SanPham/Get-all-product",
    }).then(function (response) {
      $scope.filteredSanPham = response.data;
    });
  };

  $scope.LoadLoaiSanPham = function () {
    $http({
      method: "GET",
      headers: { Authorization: "Bearer " + _user.token },
      url: current_url + "/api/LoaiSanPham/get-all-cate",
    }).then(function (response) {
      $scope.listLoaiSP = response.data;
      console.log($scope.listLoaiSP)
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
        console.log(res)
        obj.Anh = res.data;
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
  
  $scope.loadnew();
  $scope.LoadLoaiSanPham();
  $scope.LoadSanPham();
});
