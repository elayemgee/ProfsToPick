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
                studentid: document.getElementById('studentid').value,
                name: document.getElementById('name').value,
                subject: document.getElementById('subject').value,
                date: document.getElementById('date').value,
                review: document.getElementById('review').value,
                stars: document.getElementById('stars').value
            }
            console.log(form)
            $.get('/profpage', form, (data)=>
            {
                $('#reviewEntries').append(data)
            });

    });
	
});
