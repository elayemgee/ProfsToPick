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
 
    $('#program').keyup(function () {

        validateField($('#program'), 'program', $('#errorProgram'));
		
    });
	
    $('#college').keyup(function () {

        validateField($('#studentid'), 'studentid', $('#errorID'));
		
    });
	
    $('#password').keyup(function () {

        validateField($('#password'), 'password', $('#errorPassword'));
		
    });

    $('#confirmpw').keyup(function () {

        validateField($('#confirmpw'), 'confirmpw', $('#errorConfirm'));
		
    });
	
});
