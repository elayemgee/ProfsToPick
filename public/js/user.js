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


    
    $('#button2').click(function () {
        //var profname = $('#rating').children('.profDets').children('.flexDeisplay').children('.profBold').text()
        //var profname = $('.profBold').text();
        var profname = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').text();
        var subject = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#subBold').text();
        var stars =  $('#starsDate').children('.starRating').children('.stars').text();
        var date =  $('#starsDate').children('.date').text();
        var review =  $('#userReview').text();

        //$('#rating').children('.profDets').children('.flexDeisplay').children('.profBold').css('color', 'cyan');
        /*
        $('#starsDate').children('.starRating').children('.stars').css('color', 'cyan');
        $('#starsDate').children('.date').css('color', 'green');
        $('#userReview').css('color', 'green');
        $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').css('color', 'cyan');
        $('#rating').css('background-color', 'red');
        */
    
        $.get('/deleteReview', {profname:profname, subject:subject, review:review, stars:stars, date:date}, function() {
            if (result)
                $('#rating').remove();

        });
    });

    
   
    /*
    $('.rating').on('click', 'button2', function() {
        var profname = $(this).parentsUntil('#rating').children('.flexDisplay:last').children('.profBold').text();
        var subject = $(this).parentsUntil('#rating').children('.flexDisplay:last').children('.subBold').text();
        var stars = $(this).parentsUntil('#rating').children('.starsDate:last').children('.stars').text();
        var date = $(this).parentsUntil('#rating').children('.starsDate:last').children('.date').text();
        var review = $(this).parentsUntil('#rating').children('.review').text();

        console.log('in user.js');
        console.log(studentid);

        $.get('/deleteReview', {profname:profname, subject:subject, review:review, stars:stars, date:date}, function() {
            //if (result)
            $(this).parent.remove();
        });
    });
    */
    
    

})
