$(document).ready(function () {
    

    //Edit Button
    $('.rating').on('click', '#button1', function() {
        $(this).parentsUntil('#userRatings').children('#userReview').css('border', 'solid thin green');
        //hides edit and delete button and shows a submit button
        $(this).parentsUntil('#userRatings').children('#button1').css('display', 'none');
        $(this).parentsUntil('#userRatings').children('#button2').css('display', 'none');
        $(this).parentsUntil('#userRatings').children('#button3').css('display', 'flex');
        $(this).parentsUntil('#userRatings').children('#button4').css('display', 'flex');
        $(this).parentsUntil('#userRatings').children('#userReview').attr('contenteditable','true');
    });
    

    //Delete review button
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
            {
                location.reload(true);
            }
        });

    });

    //Used to cancel edit review
    $('.rating').on('click', '#button3', function() {
        $(this).parentsUntil('#userRatings').children('#userReview').css('border', 'none');
        $(this).parentsUntil('#userRatings').children('#button1').css('display', 'flex');
        $(this).parentsUntil('#userRatings').children('#button2').css('display', 'flex');
        $(this).parentsUntil('#userRatings').children('#button3').css('display', 'none');
        $(this).parentsUntil('#userRatings').children('#button4').css('display', 'none');
        $(this).parentsUntil('#userRatings').children('#userReview').attr('contenteditable','false');
    });

    //submitting edited review
    $('.rating').on('click', '#button4', function() {
        var profname = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#profBold').text();
        var subject = $(this).parentsUntil('#rating').children('#profDets').children('#flexDisplay').children('#subBold').text();
        var stars =  $(this).parentsUntil('#userRatings').children('#starsDate').children('#starRating').children('#stars').text();
        var date = $(this).parentsUntil('#userRatings').children('#starsDate').children('#date').text();
        var review =   $(this).parentsUntil('#userRatings').children('#userReview').text();

        $.get('/editReview', {profname:profname, subject:subject, review:review, stars:stars, date:date}, function(success) {
            if(success)
            {
                location.reload();
            }
        });
    });
   

})
