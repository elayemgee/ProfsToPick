$(document).ready(function () {

    $('#refno').keyup(function () {
        // your code here

        $.get('/getCheckRefNo', {refno: $('#refno.field').val()}, (data) => {
            if (data !== '') {
                $('#refno.field').css('background-color', 'red')
                $('#error').text('Reference number already in the database')
                $('#submit').prop('disabled', true)
            } else {
                $('#refno.field').css('background-color', '#E3E3E3')
                $('#error').text('')
                $('#submit').prop('disabled', false)
            }
        })
        
    });

   
    $('#submit').click(function () {
        // your code here
        var name = document.getElementById("name").value;
        var userid = document.getElementById("userid").value;
        var password = document.getElementById("pw").value;
        var email = document.getElementById("email").value;

        let user = {
            name: name,
            userid: userid,
            email: email,
            password: password
        }
        $.get('/register', user, (data) => {
            
        })

        /*
        if(document.getElementById("name").value == "" || document.getElementById("refno").value == "" || document.getElementById("amount").value == "" ){
            document.getElementById("error").innerHTML = "Fill up all fields.";
        }
        else {

            var name = document.getElementById("name").value;
            var refno = document.getElementById("refno").value;
            var amount = parseFloat(document.getElementById("amount").value);
            var roundAmount = amount.toFixed(2);

            let transaction = {
                name: name,
                refno: refno,
                amount: roundAmount
            }

            $.get('/add', transaction, (data) => {
                $('#cards').append(data)

                $('#name.field').val('')
                $('#refno.field').val('')
                $('#amount.field').val('')
            })
        }
        */
        
        
    });

    $('.userRatings').on('click', '.button2' , function () {
        var parent = $(this).parent();
        var studentid = parent.find("p.text")[0].innerText;
        var profname = parent.find(".profBold")[1].innerText;
        var subject = parent.find(".subBold")[2].innerText;
        var review = parent.find(".review")[3].innerText;
        var stars = parent.find(".starRating")[4].innerText;
        var date = parent.find(".date")[5].innerText;
        $.get('/deleteReview', {studentid:studentid, profname:profname, subject:subject, review:review, stars:stars, date:date}, function(result) {
            if (result) {
                console.log('Enters if in yser.js');
                parent.remove();
            }
        });
    });

})
