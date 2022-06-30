$(document).ready(function () {


    $('#subject').keyup(function () {
		
        validateField($('#subject'), 'subject', $('#errorSubject'));
		
    });
	
	$('#name').keyup(function () {
		
        validateField($('#name'), 'name', $('#errorName'));
		
    });

	$('#studentid').keyup(function () {

        validateField($('#studentid'), 'studentid', $('#errorID'));
		
    });
 
    $('#review').keyup(function () {

        validateField($('#review'), 'review', $('#errorReview'));
		
    });
	
    $('#date').keyup(function () {

        validateField($('#date'), 'date', $('#errorDate'));
		
    });
	
    $('#stars').keyup(function () {

        validateField($('#stars'), 'stars', $('#errorStars'));
		
    });
	
});
