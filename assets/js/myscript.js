  var biz_data = {}
  var sci_data = {}
  var eng_data = {}

  var biz_data_filter = {}
  var eng_data_filter = {}
  var sci_data_filter = {}
 function processData(allText) {
      var allTextLines = allText.split(/\r\n|\n/);
      var headers = allTextLines[0].split(',');
      var lines = [];
      var result = new Object()
      for (var i=1; i<allTextLines.length; i++) {
      // for (var i=1; i<10; i++) {
          var data = allTextLines[i].split(',');
          if (data.length == headers.length) {

              let tarr = new Object();
              for (var j=0; j<headers.length; j++) {
                let header = headers[j].substring(1, headers[j].length-1);
                let value = data[j]
                if(isNaN(value)){
                  value =value.substring(1, value.length-1);
                }
                tarr[header] = value;
              }
              lines.push(tarr);
          }
      }

      for(let i = 0 ; i < lines.length; i++){
        let line = lines[i]

        if (!(line["スキルカテゴリ"] in result)){
          
          let obj = new Object()
          obj.isOpen = false
          obj.data = [line]
          result[line["スキルカテゴリ"]] = obj
        }
        else{
          let data= result[line["スキルカテゴリ"]].data
          data.push(line)
          result[line["スキルカテゴリ"]].data = data
        }

      }

      return result
  }

function makeid(length) {
 var result           = '';
 var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 var charactersLength = characters.length;
 for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
        timers[uniqueId] = setTimeout(callback, ms);
      };
  })();


$(window).resize(function () {
    waitForFinalEvent(function(){
      generateHtmlBizdata(biz_data)
      generateHtmlScidata(sci_data)
      generateHtmlScidata(sci_data)
    }, 1000, "some unique string");
  });
  
  function setExpandAllButton(){
    $(".expandAll").click(function(){

      let isSearchActive = false
      let data = {}, data1 = {}, data2 = {}
      if (Object.keys(biz_data_filter).length || Object.keys(sci_data_filter).length || Object.keys(eng_data_filter).length){
        data = biz_data_filter
        data1 = sci_data_filter
        data2 = eng_data_filter
      }
      else{
          data = biz_data
          data1 = sci_data
          data2 = eng_data
      }
      let objectKeys = Object.keys(data);
      objectKeys.forEach(function (key, index) {
        let ele = data[key]
        ele.isOpen = true
        data[key] = ele
      })
      generateHtmlBizdata(data)


      let objectKeys1 = Object.keys(data1);

      objectKeys1.forEach(function (key, index) {
        let ele = data1[key]
        ele.isOpen = true
        data1[key] = ele
      })
      generateHtmlScidata(data1)

      let objectKeys2 = Object.keys(data2);

      objectKeys2.forEach(function (key, index) {
        let ele = data2[key]
        ele.isOpen = true
        data2[key] = ele
      })
      generateHtmlEngdata(data2)
    })
  }
  
  function setCollapseAllButton(){
    $(".collapseAll").click(function(){

      let isSearchActive = false
      let data = {}, data1 = {}, data2 = {}
      if (Object.keys(biz_data_filter).length || Object.keys(sci_data_filter).length || Object.keys(eng_data_filter).length){
        data = biz_data_filter
        data1 = sci_data_filter
        data2 = eng_data_filter
      }
      else{
          data = biz_data
          data1 = sci_data
          data2 = eng_data
      }
      let objectKeys = Object.keys(data);
      objectKeys.forEach(function (key, index) {
        let ele = data[key]
        ele.isOpen = false
        data[key] = ele
      })
      generateHtmlBizdata(data)


      let objectKeys1 = Object.keys(data1);

      objectKeys1.forEach(function (key, index) {
        let ele = data1[key]
        ele.isOpen = false
        data1[key] = ele
      })
      generateHtmlScidata(data1)

      let objectKeys2 = Object.keys(data2);

      objectKeys2.forEach(function (key, index) {
        let ele = data2[key]
        ele.isOpen = false
        data2[key] = ele
      })
      generateHtmlEngdata(data2)
    })
  }
  
  function setSearch(){
    $("#keyword").keypress(function(){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        $(this).next().trigger("click")
      }
    })
    $(".search-icon").click(function(){

      biz_data_filter = {}
      sci_data_filter = {}
      eng_data_filter = {}

      let keyword = $("#keyword").val().trim()
      $("#keyword").val(keyword)
      if(keyword == ""){
        return
      }

      var objectKeys = Object.keys(biz_data);
      objectKeys.forEach(function (key, index) {


        let ele = JSON.parse(JSON.stringify(biz_data[key]))
        let data = ele["data"]
        let data_filter = []

        for(var i = 0; i < data.length; i++){
          if(data[i]["サブカテゴリ"].includes(keyword) || data[i]["スキルカテゴリ"].includes(keyword) || data[i]["チェック項目"].includes(keyword) ){
            data_filter.push(data[i])
          }
        }

        if(data_filter.length){
          ele.isOpen=false
          ele.data=data_filter
          biz_data_filter[key] = ele
        }
        
      })


      var objectKeys = Object.keys(sci_data);
      objectKeys.forEach(function (key, index) {


        let ele = JSON.parse(JSON.stringify(sci_data[key]))
        let data = ele["data"]
        let data_filter = []

        for(var i = 0; i < data.length; i++){
          if(data[i]["サブカテゴリ"].includes(keyword) || data[i]["スキルカテゴリ"].includes(keyword) || data[i]["チェック項目"].includes(keyword) ){
            data_filter.push(data[i])
          }
        }

        if(data_filter.length){
          ele.isOpen=false
          ele.data=data_filter
          sci_data_filter[key] = ele
        }
        
      })


      var objectKeys = Object.keys(eng_data);
      objectKeys.forEach(function (key, index) {


        let ele = JSON.parse(JSON.stringify(eng_data[key]))
        let data = ele["data"]
        let data_filter = []

        for(var i = 0; i < data.length; i++){
          if(data[i]["サブカテゴリ"].includes(keyword) || data[i]["スキルカテゴリ"].includes(keyword) || data[i]["チェック項目"].includes(keyword) ){
            data_filter.push(data[i])
          }
        }

        if(data_filter.length){
          ele.isOpen=false
          ele.data=data_filter
          eng_data_filter[key] = ele
        }
        
      })

      generateHtmlBizdata(biz_data_filter)
      generateHtmlScidata(sci_data_filter)
      generateHtmlEngdata(eng_data_filter)

    })
  }

function generateHtmlBizdata(data){
    let type = "biz-data"
    let wrap_div = $("." + type + "-wrap")
    wrap_div.empty()
    var objectKeys = Object.keys(data);

    objectKeys.forEach(function (key, index) {
      let ele = data[key]
      wrap_div.append("<div class='col-md-12 title'>"+key+"</div>")

      if(ele.isOpen){
        let width = $(window).width();
        if(width > 1000){
          let table_id = type + "-table-" + makeid(8)
          $("<div class='col-md-12 content'><table id='"+table_id+"' class='table table-web table-bordered'><tr>"
          + "<td class='sort-td'>NO</td><td class='sort-td'>SubNo</td><td class='medium-td'>スキルカテゴリ</td><td class='medium-td'>スキルレベル</td>"
          +"<td class='medium-td'>サブカテゴリ</td><td>チェック項目</td><td class='sort-td'>DE</td><td class='sort-td'>DS</td><td class='medium-td'>必須スキル</td>"
          +"</tr></table></div>").insertAfter("." + type + "-wrap .title:last-child")

          let rows_data = ele.data
          let table = $("#" + table_id)
          rows_data.forEach(function (row, index) {

            table.append("<tr>"
          + "<td>"+row["NO"]+"</td><td>"+row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td><td>"+row["チェック項目"] + "</td>"
          + "<td>"+row["DE"] + "</td><td>" + row["DS"] 
          + "</td><td>"+ row["必須スキル"] +"</td>"
          + "</tr>")
          })
        }
        else{

          let rows_data = ele.data
          let text = "<div class='col-md-12 content'>"
          rows_data.forEach(function (row, index) {
            let table_id = type + "-table-" + makeid(8)

            text += "<table id='"+table_id+"' class='table table-web table-bordered'><tr>"
            + "<td class='sort-td'>NO</td><td class='sort-td'>Sub</td><td class='medium-td'>カテゴリ</td><td class='medium-td'>レベル</td>"
            +"<td class='medium-td'>サブカテゴリ</td><td class='sort-td'>DE</td><td class='sort-td'>DS</td><td class='medium-td'>必須</td></tr>"

            text += "<tr>"
          + "<td>"+row["NO"]+"</td><td>" + row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td>" + "<td>"+row["DE"] +"</td>"
          +"<td>" + row["DS"] + "</td><td>"+ row["必須スキル"] +"</td></tr>"

            text += "<tr><td colspan='8'>"+row["チェック項目"] +"</td></tr>"

            text+="</table>"

          })

          text += "<div>"

          $(text).insertAfter("." + type + "-wrap .title:last-child")

        }
      }

    }); 


    $("." + type + "-wrap .title").click(function(){
      let key = $(this).text()
      let ele = data[key]

      ele.isOpen = !ele.isOpen
      if (ele.isOpen){
       
        let width = $(window).width();
        if(width > 1000){
          let table_id = type + "-table-" + makeid(8)
          $("<div class='col-md-12 content'><table id='"+table_id+"' class='table table-web table-bordered'><tr>"
          + "<td class='sort-td'>NO</td><td class='sort-td'>SubNo</td><td class='medium-td'>スキルカテゴリ</td><td class='medium-td'>スキルレベル</td>"
          +"<td class='medium-td'>サブカテゴリ</td><td>チェック項目</td><td class='sort-td'>DE</td><td class='sort-td'>DS</td><td class='medium-td'>必須スキル</td>"
          +"</tr></table></div>").insertAfter($(this))

          let rows_data = ele.data
          let table = $("#" + table_id)
          rows_data.forEach(function (row, index) {
            table.append("<tr>"
          + "<td>"+row["NO"]+"</td><td>"+row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td><td>"+row["チェック項目"] + "</td>"
          + "<td>"+row["DE"] + "</td><td>" + row["DS"] + "</td><td>"+ row["必須スキル"] +"</td>"
          + "</tr>")
          })
        }
        else{

          let rows_data = ele.data
          let text = "<div class='col-md-12 content'>"
          rows_data.forEach(function (row, index) {
            let table_id = type + "-table-" + makeid(8)
            text += "<table id='"+table_id+"' class='table table-web table-bordered'><tr>"
            + "<td class='sort-td'>NO</td><td class='sort-td'>Sub</td><td class='medium-td'>カテゴリ</td><td class='medium-td'>レベル</td>"
            +"<td class='medium-td'>サブカテゴリ</td><td class='sort-td'>DE</td><td class='sort-td'>DS</td><td class='medium-td'>必須</td></tr>"

            text += "<tr>"
          + "<td>"+row["NO"]+"</td><td>" + row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td>" + "<td>"+row["DE"] +"</td>"
          +"<td>" + row["DS"] + "</td><td>"+ row["必須スキル"] +"</td></tr>"

            text += "<tr><td colspan='8'>"+row["チェック項目"] +"</td></tr>"

            text+="</table>"

          })

          text += "<div>"

          $(text).insertAfter($(this))

        }
      }
      else{
        $(this).next().remove()
      }

    })
   
  }

  function generateHtmlScidata(data){
    let type = "sci-data"
    let wrap_div = $("." + type + "-wrap")
    wrap_div.empty()
    var objectKeys = Object.keys(data);
    objectKeys.forEach(function (key, index) {
      let ele = data[key]
      wrap_div.append("<div class='col-md-12 title'>"+key+"</div>")

      if(ele.isOpen){
        let width = $(window).width();
        if(width > 1000){
          let table_id = type + "-table-" + makeid(8)
          $("<div class='col-md-12 content'><table id='"+table_id+"' class='table table-web table-bordered'><tr>"
          + "<td class='sort-td'>NO</td><td class='sort-td'>SubNo</td><td class='medium-td'>スキルカテゴリ</td><td class='medium-td'>スキルレベル</td>"
          +"<td class='medium-td'>サブカテゴリ</td><td>チェック項目</td><td class='sort-td'>BZ</td><td class='sort-td'>DE</td><td class='medium-td'>必須スキル</td>"
          +"</tr></table></div>").insertAfter("." + type + "-wrap .title:last-child")

          let rows_data = ele.data
          let table = $("#" + table_id)
          rows_data.forEach(function (row, index) {

            table.append("<tr>"
          + "<td>"+row["NO"]+"</td><td>"+row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td><td>"+row["チェック項目"] + "</td>"
          + "<td>"+row["BZ"] + "</td><td>" + row["DE"] 
          + "</td><td>"+ row["必須スキル"] +"</td>"
          + "</tr>")
          })
        }
        else{

          let rows_data = ele.data
          let text = "<div class='col-md-12 content'>"
          rows_data.forEach(function (row, index) {
            let table_id = type + "-table-" + makeid(8)

            text += "<table id='"+table_id+"' class='table table-web table-bordered'><tr>"
            + "<td class='sort-td'>NO</td><td class='sort-td'>Sub</td><td class='medium-td'>カテゴリ</td><td class='medium-td'>レベル</td>"
            +"<td class='medium-td'>サブカテゴリ</td><td class='sort-td'>BZ</td><td class='sort-td'>DE</td><td class='medium-td'>必須</td></tr>"

            text += "<tr>"
          + "<td>"+row["NO"]+"</td><td>" + row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td>" + "<td>"+row["BZ"] +"</td>"
          +"<td>" + row["DE"] + "</td><td>"+ row["必須スキル"] +"</td></tr>"

            text += "<tr><td colspan='8'>"+row["チェック項目"] +"</td></tr>"

            text+="</table>"

          })

          text += "<div>"

          $(text).insertAfter("." + type + "-wrap .title:last-child")

        }
      }

    }); 


    $("." + type + "-wrap .title").click(function(){
      let key = $(this).text()
      let ele = data[key]

      ele.isOpen = !ele.isOpen
      if (ele.isOpen){
       
        let width = $(window).width();
        if(width > 1000){
          let table_id = type + "-table-" + makeid(8)
          $("<div class='col-md-12 content'><table id='"+table_id+"' class='table table-web table-bordered'><tr>"
          + "<td class='sort-td'>NO</td><td class='sort-td'>SubNo</td><td class='medium-td'>スキルカテゴリ</td><td class='medium-td'>スキルレベル</td>"
          +"<td class='medium-td'>サブカテゴリ</td><td>チェック項目</td><td class='sort-td'>BZ</td><td class='sort-td'>DE</td><td class='medium-td'>必須スキル</td>"
          +"</tr></table></div>").insertAfter($(this))

          let rows_data = ele.data
          let table = $("#" + table_id)
          rows_data.forEach(function (row, index) {
            table.append("<tr>"
          + "<td>"+row["NO"]+"</td><td>"+row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td><td>"+row["チェック項目"] + "</td>"
          + "<td>"+row["BZ"] + "</td><td>" + row["DE"] + "</td><td>"+ row["必須スキル"] +"</td>"
          + "</tr>")
          })
        }
        else{

          let rows_data = ele.data
          let text = "<div class='col-md-12 content'>"
          rows_data.forEach(function (row, index) {
            let table_id = type + "-table-" + makeid(8)
            text += "<table id='"+table_id+"' class='table table-web table-bordered'><tr>"
            + "<td class='sort-td'>NO</td><td class='sort-td'>Sub</td><td class='medium-td'>カテゴリ</td><td class='medium-td'>レベル</td>"
            +"<td class='medium-td'>サブカテゴリ</td><td class='sort-td'>BZ</td><td class='sort-td'>DE</td><td class='medium-td'>必須</td></tr>"

            text += "<tr>"
          + "<td>"+row["NO"]+"</td><td>" + row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td>" + "<td>"+row["BZ"] +"</td>"
          +"<td>" + row["DE"] + "</td><td>"+ row["必須スキル"] +"</td></tr>"

            text += "<tr><td colspan='8'>"+row["チェック項目"] +"</td></tr>"

            text+="</table>"

          })

          text += "<div>"

          $(text).insertAfter($(this))

        }
      }
      else{
        $(this).next().remove()
      }

    })
   
  }


  function generateHtmlEngdata(data){

    let type = "eng-data"
    let wrap_div = $("." + type + "-wrap")
    wrap_div.empty()
    var objectKeys = Object.keys(data);

    objectKeys.forEach(function (key, index) {
      let ele = data[key]
      wrap_div.append("<div class='col-md-12 title'>"+key+"</div>")

      if(ele.isOpen){
        let width = $(window).width();
        if(width > 1000){
          let table_id = type + "-table-" + makeid(8)
          $("<div class='col-md-12 content'><table id='"+table_id+"' class='table table-web table-bordered'><tr>"
          + "<td class='sort-td'>NO</td><td class='sort-td'>SubNo</td><td class='medium-td'>スキルカテゴリ</td><td class='medium-td'>スキルレベル</td>"
          +"<td class='medium-td'>サブカテゴリ</td><td>チェック項目</td><td class='sort-td'>BZ</td><td class='sort-td'>DS</td><td class='medium-td'>必須スキル</td>"
          +"</tr></table></div>").insertAfter("." + type + "-wrap .title:last-child")

          let rows_data = ele.data
          let table = $("#" + table_id)
          rows_data.forEach(function (row, index) {

            table.append("<tr>"
          + "<td>"+row["NO"]+"</td><td>"+row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td><td>"+row["チェック項目"] + "</td>"
          + "<td>"+row["BZ"] + "</td><td>" + row["DS"] 
          + "</td><td>"+ row["必須スキル"] +"</td>"
          + "</tr>")
          })
        }
        else{

          let rows_data = ele.data
          let text = "<div class='col-md-12 content'>"
          rows_data.forEach(function (row, index) {
            let table_id = type + "-table-" + makeid(8)

            text += "<table id='"+table_id+"' class='table table-web table-bordered'><tr>"
            + "<td class='sort-td'>NO</td><td class='sort-td'>Sub</td><td class='medium-td'>カテゴリ</td><td class='medium-td'>レベル</td>"
            +"<td class='medium-td'>サブカテゴリ</td><td class='sort-td'>BZ</td><td class='sort-td'>DS</td><td class='medium-td'>必須</td></tr>"

            text += "<tr>"
          + "<td>"+row["NO"]+"</td><td>" + row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td>" + "<td>"+row["BZ"] +"</td>"
          +"<td>" + row["DS"] + "</td><td>"+ row["必須スキル"] +"</td></tr>"

            text += "<tr><td colspan='8'>"+row["チェック項目"] +"</td></tr>"

            text+="</table>"

          })

          text += "<div>"

          $(text).insertAfter("." + type + "-wrap .title:last-child")

        }
      }

    }); 


    $("." + type + "-wrap .title").click(function(){
      let key = $(this).text()
      let ele = data[key]

      ele.isOpen = !ele.isOpen
      if (ele.isOpen){
       
        let width = $(window).width();

        if(width > 1000){
          let table_id = type + "-table-" + makeid(8)
          $("<div class='col-md-12 content'><table id='"+table_id+"' class='table table-web table-bordered'><tr>"
          + "<td class='sort-td'>NO</td><td class='sort-td'>SubNo</td><td class='medium-td'>スキルカテゴリ</td><td class='medium-td'>スキルレベル</td>"
          +"<td class='medium-td'>サブカテゴリ</td><td>チェック項目</td><td class='sort-td'>BZ</td><td class='sort-td'>DS</td><td class='medium-td'>必須スキル</td>"
          +"</tr></table></div>").insertAfter($(this))

          let rows_data = ele.data
          let table = $("#" + table_id)
          rows_data.forEach(function (row, index) {
            table.append("<tr>"
          + "<td>"+row["NO"]+"</td><td>"+row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td><td>"+row["チェック項目"] + "</td>"
          + "<td>"+row["BZ"] + "</td><td>" + row["DS"] + "</td><td>"+ row["必須スキル"] +"</td>"
          + "</tr>")
          })
        }
        else{

          let rows_data = ele.data
          let text = "<div class='col-md-12 content'>"
          rows_data.forEach(function (row, index) {
            let table_id = type + "-table-" + makeid(8)
            text += "<table id='"+table_id+"' class='table table-web table-bordered'><tr>"
            + "<td class='sort-td'>NO</td><td class='sort-td'>Sub</td><td class='medium-td'>カテゴリ</td><td class='medium-td'>レベル</td>"
            +"<td class='medium-td'>サブカテゴリ</td><td class='sort-td'>BZ</td><td class='sort-td'>DS</td><td class='medium-td'>必須</td></tr>"

            text += "<tr>"
          + "<td>"+row["NO"]+"</td><td>" + row["SubNo"]+"</td>"
          + "<td>" + row["スキルカテゴリ"] + "</td><td>" + row["スキルレベル"] + "</td>"
          + "<td>" + row["サブカテゴリ"] + "</td>" + "<td>"+row["BZ"] +"</td>"
          +"<td>" + row["DS"] + "</td><td>"+ row["必須スキル"] +"</td></tr>"

            text += "<tr><td colspan='8'>"+row["チェック項目"] +"</td></tr>"

            text+="</table>"

          })

          text += "<div>"

          $(text).insertAfter($(this))

        }
      }
      else{
        $(this).next().remove()
      }

    })
   
  }

function setResetButton(){
  $(".reset").click(function(){
    $.get(biz_data_url, function(data, status){
      biz_data = processData(data)
      generateHtmlBizdata(biz_data)
    });

    $.get(sci_url, function(data, status){
      sci_data = processData(data)
      generateHtmlScidata(sci_data)
    });

    $.get(eng_url, function(data, status){
      eng_data = processData(data)
      generateHtmlEngdata(eng_data)
    });

    $("#keyword").val("")
    biz_data_filter = {}
    sci_data_filter = {}
    eng_data_filter = {}
  })
}

function init(){
    $.get(biz_data_url, function(data, status){
      biz_data = processData(data)
      generateHtmlBizdata(biz_data)
    });

    $.get(sci_url, function(data, status){
      sci_data = processData(data)
      generateHtmlScidata(sci_data)
    });

    $.get(eng_url, function(data, status){
      eng_data = processData(data)
      generateHtmlEngdata(eng_data)
    });

    setExpandAllButton()
    setCollapseAllButton()
    setSearch()
    setResetButton()
}