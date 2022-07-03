$(document).ready(function () {
    //Used to edit review
    $('#button1').click(function () {
        //$(this).parentsUntil('#rating').children('#userReview').attr('contenteditable','true');;
        $('#userReview').css('border', 'solid thin green');
        //hides edit and delete button and shows a submit button
        $('#button1').css('display', 'none');
        $('#button2').css('display', 'none');
        $('#button3').css('display', 'flex');
        $('#button4').css('display', 'flex');
        $('#userReview').attr('contenteditable','true');
    });

    //Used to cancel edit review
    $('#button3').click(function () {
        $('#userReview').css('border', 'none');
        $('#button1').css('display', 'flex');
        $('#button2').css('display', 'flex');
        $('#button3').css('display', 'none');
        $('#button4').css('display', 'none');
        $('#userReview').attr('contenteditable','false');
    });

    //Used to submit review
    $('#button4').click(function () {
        var profname = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').text();
        var subject = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#subBold').text();
        var stars =  $('#starsDate').children('.starRating').children('.stars').text();
        var date =  $('#starsDate').children('.date').text();
        var review =  $('#userReview').text();

        $.get('/editReview', {profname:profname, subject:subject, review:review, stars:stars, date:date}, function(success) {
            if(success)
            {
                location.reload();
            }
        });
    });
    

    
    $('#button5').click(function () {
        var profname = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').text();
        var subject = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#subBold').text();
        /*
        var stars =  $(this).parentsUntil('#rating').children('#starsDate').children('.starRating').children('.stars').text();
        var date =   $(this).parentsUntil('#rating').children('#starsDate').children('.date').text();
        var review =  $(this).parentsUntil('#rating').children('#userReview').text();
        */
        var stars =  $('#starsDate').children('.starRating').children('.stars').text();
        var date =  $('#starsDate').children('.date').text();
        var review =  $('#userReview').text();
        
                
        $('#starsDate').children('.starRating').children('.stars').css('color', 'cyan');
        $('#starsDate').children('.date').css('color', 'green');
        $('#userReview').css('color', 'green');
        $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').css('color', 'cyan');
        $('#rating').css('background-color', 'red');
        
        /*
        $.get('/deleteReview', {profname:profname, subject:subject, review:review, stars:stars, date:date}, function(result) {
            if(result)
                $('#rating').remove();
        });
        */
    });
    


    $('.rating').on('click', '#button2', function() {
        var profname = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').text();
        var subject = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#subBold').text();
        var stars =  $(this).parentsUntil('#userRatings').children('#starsDate').children('#starRating').children('#stars').text();
        var date = $(this).parentsUntil('#userRatings').children('#starsDate').children('#date').text();
        var review =   $(this).parentsUntil('#userRatings').children('#userReview').text();

        /*
        $(this).parentsUntil('#userRatings').children('#starsDate').children('#starRating').children('#stars').css('color', 'cyan');
        $(this).parentsUntil('#userRatings').children('#starsDate').children('#date').css('color', 'cyan');
        $(this).parentsUntil('#userRatings').children('#userReview').css('color', 'cyan');
        $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').css('color', 'cyan');
        $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#subBold').css('color', 'cyan');
        $(this).parentsUntil('#userRatings').css('background-color', 'red');
        */
        $.get('/deleteReview', {profname:profname, subject:subject, review:review, stars:stars, date:date}, function(success) {
            if(success)
                $('#rating').remove();
        });

    });
   

})
