$(document).ready(function () {

    var arrData = [];
    function Task(value, status) {
        this.value = value;
        this.status = status;
    }
    readData(); //add comment for test, another one
    
    $('#inputTask').keypress(function (e) {
        if (e.which == 13) {
            addTask();
        }
    });
    $('#add').click(addTask);
    $('#reset').click(reset);
    $('#done').click(checkAll);
    $('.tasks').on('click', '.list', check);
    $('.tasks').on('click', '.close', delTask);

    function delTask() {
        arrData.splice($('.close').index(this), 1);
        saveData();
        $(this).closest('.list').remove();
    }

    function checkAll() {
        $.each(arrData, function (index, value) {
            arrData[index].status = "checked";
            $('.list:eq(' + index + ')').addClass("checked");
        });
        saveData();

    }

    function addTask() {
        if ($('#inputTask').val() != "") {
            $('.tasks').append('<div class = "list">' +
                '<div class = "blockBefore"><span class="glyphicon glyphicon-ok"></span></div>' +
                '<div class = "content">' + $('#inputTask').val() + '</div>' + '<button type="button" class="close" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>');

            arrData.push(new Task($('#inputTask').val(), "unchecked"));
            saveData();
            $('#inputTask').val('');
        }


    }

    function reset() {
        localStorage.clear();
        $('.tasks').empty();
        arrData = [];
    }

    function check() {
        var i = $(".list").index(this);
        if (arrData[i].status == "unchecked") {
            $(this).addClass("checked");
            arrData[i].status = "checked";
        } else {
            $(this).removeClass("checked");
            arrData[i].status = "unchecked";
        }
        saveData();
    }

    function saveData() {
        localStorage.setItem("data", JSON.stringify(arrData));
    }

    function readData() {
        if (localStorage.getItem("data") != null) {
            arrData = JSON.parse(localStorage.getItem("data"));
            $.each(arrData, function (index, value) {
                if (value.status == "checked") {
                    $('.tasks').append('<div class = "list checked">' +
                        '<div class = "blockBefore"><span class="glyphicon glyphicon-ok"></span></div>' +
                        '<div class = "content">' + value.value + '</div>' + '<button type="button" class="close" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>');
                } else {
                    $('.tasks').append('<div class = "list">' +
                        '<div class = "blockBefore"><span class="glyphicon glyphicon-ok"></span></div>' +
                        '<div class = "content">' + value.value + '</div>' + '<button type="button" class="close" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>');
                }
            });
        }
    }




});
