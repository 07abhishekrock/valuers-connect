$(function () {
  var page = 1,
    limit = 5,
    totalrecord = 0;

  fetchData();

  $(".prev-btn").on("click", function () {
    if (page > 1) {
      page--;
      fetchData();
    }
    console.log("Prev Page: " + page);
  });

  // handling the next-btn
  $(".next-btn").on("click", function () {
    // if (page * limit < totalrecord) {
    page++;
    fetchData();
    // }
    console.log("Next Page: " + page);
  });

  function fetchData() {
    // ajax() method to make api calls
    $.ajax({
      url: "http://localhost:9000/api/v1/forum-thread",
      type: "GET",
      data: {
        page: page,
        limit: 5,
        // user: "60770e0a4bc5681bb8ac0616",
      },
      success: function (data) {
        console.log(data);

        if (data.status) {
          var dataArr =data.data;
          totalrecord =data.totalRecord;

          var html = "";

          for (var i = 0; i < dataArr.length; i++) {
            html +=
              "<div class='sample-user'>" +
              "<h3>ID: " +
              dataArr[i]._id +
              "</h3>" +
              `<a   href=/threads?category=${dataArr[i].category}>First Name: ` +
              dataArr[i].category +
              `</a>` +
              // "<p>Last Name: " + dataArr[i].lastname + "</p>" +
              // "<p>Last Modified At: " + dataArr[i].lastmodified + "</p>" +
              // "<p>Created At: " + dataArr[i].created + "</p>" +
              "</div>" +
              "<hr />";
          }
          $("#result").html(html);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      },
    });
  }
});
