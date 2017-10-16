import pagination from "../plugin/pagination";
import * as dom from "../plugin/domhandle";
// https://search.bilibili.com/all?keyword=%E5%A4%A7%E6%8A%A4%E6%B3%95&from_source=banner_search
class Index {
  constructor() {
    this.getdata = JSON.parse($("#DataSet").val());
    this.onload();
  }

  onload() {
    this.initBd();
    this.searchGo();
    this.animate();
  }
  // 设置背景
  initBd() {
    let url = "/images/test.jpg";
    const { img } = this.getdata;
    if (img) {
      url = img;
    }
    $("#container").css({
      minHeight: $(document).height(),
      background: `url('${url}')`
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
  // 请求bili
  fetchbili() {
    const { name } = this.getdata;
    const listHtml = list => {
      const self = this;
      $("#Bili").html("");
      list.forEach((o, i) => {
          $("#Bili").append(dom.domBili(o));
      });
      $("#Bili li").each(function(i,o){
        $(o).find(".bili-img").append(dom.domIframe(list[i].img,list[i].av));
      })
      setTimeout(function() {
        $("#Bili li").show().addClass("fadeInBottom")
      }, 2000);
    };
    this.ajax("POST", "/bili", { name: name })
      .then(res => {
        console.log(res.data);
        listHtml(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // 分页器
  pagination() {
    var self = this;
    pagination();
    const { query } = this.getdata;
    let myQs = Object.assign({}, query, { page: 1 });
    // html替换
    const listHtml = list => {
      $("#MovieList").html("");
      list.forEach(o => {
        $("#MovieList").append(dom.domPage(o));
      });
    };
    this.ajax("POST", "/pagination", myQs)
      .then(res => {
        listHtml(res.list);
        return Promise.resolve(res.count);
      })
      .then(count => {
        const pageNum = Math.ceil(count / 21);
        $(".allPage").html(pageNum);
        $("#Pagination").pagination(pageNum, {
          callback: function(p) {
            myQs = Object.assign({}, query, { page: p + 1 });
            self.ajax("POST", "/pagination", myQs).then(page => {
              listHtml(page.list);
            });
          }
        });
      });
  }
  // 请求封装
  ajax(type, url, qs) {
    return new Promise((resolve, reject) => {
      let options = {
        type,
        url,
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      };
      if (qs) {
        options = Object.assign({}, options, { data: qs });
      }
      $.ajax(options);
    });
  }

  // 动画
  animate() {
    $(".look-detail").on("click", function() {
      $(".msg-text")
        .show()
        .addClass("flipInX");
      $(".msg-text").removeClass("flipOutX");
    });
    $(".msg-text h3").on("click", function() {
      $(".msg-text").removeClass("flipInX");
      $(".msg-text").addClass("flipOutX");
    });
  }
}

const index = new Index();
$.extend({
  rich: index
});
