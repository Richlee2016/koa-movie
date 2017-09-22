import pagination from "../plugin/pagination";
class Index {
  constructor() {
    this.onload();
  }

  onload() {
    this.initBd();
    this.searchGo();
    this.pagination();
  }

  // 设置背景
  initBd() {
    let url = "/images/test.jpg";
    const imgUrl = JSON.parse($("#DataSet").val());
    if (imgUrl.img) {
      url = imgUrl.img;
    }
    $("#container").css({
        minHeight:$(document).height(),
        background:`url('${url}')`
    });
  }

  // 搜索
  searchGo() {
    $("#searchGo").click(function() {
      const val = $("#searchVal").val();
      if (val) {
        location.href = `/movie/s=${encodeURI(val)}`;
      } else {
        console.log("0");
      }
    });
  }
  
  // 分页器
  
  pagination() {
    var self = this;
    pagination();
    const qs = $("#DataSet").val();
    const { query } = JSON.parse(qs);
    let myQs = Object.assign({}, query, { page: 1 });
    // html替换
    const listHtml = list => {
      $("#MovieList").html("");
      list.forEach(o => {
        $("#MovieList").append(`<li>
                    <a href="movie/${o.id}">
                      <img src=${o.img} alt="">
                      <span class="black-block">${o.year}</span>
                      <!-- <span class="black-block">${o.score}</span> -->
                      <p class="black-block">${o.name}</p>
                    </a>
                  </li>`);
      });
    };
    this.ajax(myQs).then(res => {
        listHtml(res.list);
        return Promise.resolve(res.count);
    })
    .then(count => {
        const pageNum = Math.ceil(count/21);
        $(".allPage").html(pageNum);
        $("#Pagination").pagination(pageNum,{
                callback:function(p){
                    myQs = Object.assign({}, query, { page: p+1 });
                    self.ajax(myQs).then( page => {
                      listHtml(page.list);
                  })
                }
            });
    })
  }

  ajax(qs) {
    return new Promise((resolve, reject) => {
      $.post("/pagination", qs, function(data) {
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
}

const index = new Index();
