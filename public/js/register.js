$(document).ready(function () {

    /*
    $('#studentid').keyup(function () {
        console.log('find');
        $.get('/checkID', {studentid: $('#studentid.field').val()}, (data) => {
            if (data !== '') {
                $('#studentid.field').css('background-color', 'red')
                $('#errorID').text('Student ID number already in the database')
                $('#submit').prop('disabled', true)
            } else {
                $('#studentid.field').css('background-color', '#E3E3E3')
                $('#errorID').text('')
                $('#submit').prop('disabled', false)
            }
        })
    });
    */

    $('#email').keyup(function () {
		
        validateField($('#email'), 'email', $('#errorEmail'));
		
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
