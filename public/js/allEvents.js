var limit=6
const d = new Date()
function fetchData(lim) {
    // ajax() method to make api calls
    $.ajax({
        url: "/api/v1/upcoming-events",
        type: "GET",
        data: {
            limit: lim,
        },
        beforeSend: function () {
            var html = `<div class=loader_wrap>
                          <div class="loader"></div></div>`;
            $("#spinn").html(html);
        },
        success: function (data) {
            console.log(data);

            if (data.status) {
                var dataArr = data.data.events;
                // var dataArr = []
                console.log(dataArr);

                var html = "";
                // for(var j = 0; j < dataFilter.length j++){

                // }
                for (var i = 0; i < dataArr.length; i++) {
                    var eventLastDate = new Date(dataArr[i].toDate)
                    eventLastDate = eventLastDate.getTime()
                    var todaysDate = d.getTime()
                    if (eventLastDate < todaysDate){
                        continue;
                    }
                    let images = [];
                    if(dataArr[i].featureImage !== null && dataArr[i].featureImage !== undefined){
                        images = dataArr[i].featureImage.split(",");
                    }
                    html += `<div class="grid-element">
                                <a   href="/events/${dataArr[i]._id}">
                                <div style="background-image:url(${images[0]})">
                                    <span class="inner-span">${(new Date(dataArr[i].toDate)).toDateString()}</span>
                                </div>
                                <p>
                                    ${dataArr[i].title.length > 50 ? dataArr[i].title.substring(0,47) + '...' : dataArr[i].title }
                                </p>
                                </a>
                            </div>`
                //     html +=  '<div class="past-episode-row-margin col-md-6 col-lg-4">' +
                //         '<div class="card" style="width: 21rem;position: relative;">' +
                //         '<img class="card-img-top" src="' +
                //         dataArr[i].featureImage +
                //         '" alt="Card image cap"' +
                //         'style="margin-top:-35px;z-index: 0;">' +
                //         '<div class="card-body">' +
                //         '<p class="past-episode-heading"><span class="past-episode-heading-bold"><a   href="/news/' +
                //         dataArr[i]._id +
                //         '">' +
                //         dataArr[i].title +
                //         " </a> </span></p>" +
                //         //   '<p class="past-episode-heading">'+
                //         //   "</p>"+;
                //         '<a   href="#" class="guest-show-episode">Read more <i' +
                //         'class="fas fa-chevron-right guest-right-arrow"></i></a>' +
                //         "</div>" +
                //         "</div>" +
                //         "</div>";
                // }
                }
                $("#events-result").html(html);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
    });
}



$(function () {
fetchData();
});


window.addEventListener('scroll', () => {
limit=limit+1
const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

console.log( { scrollTop, scrollHeight, clientHeight});

if(clientHeight + scrollTop >= scrollHeight-40) {
    // show the loading animation
fetchData(limit)
}
});