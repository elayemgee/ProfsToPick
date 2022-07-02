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
    $('#submit').click(function () {
            let form = 
            {
                studentid: $('#studentid.field').val(),
                name: $('#name.field').val(),
                subject: $('#subject.field').val(),
                date: $('#date.field').val(),
                review: $('#review.field').val(),
                stars: $('#stars.field').val()
            }
            console.log(form)
            $.get('/add', form, (data)=>
            {
                $('#reviewEntries').append(data)
            });

        

        
        
    });
	
});
