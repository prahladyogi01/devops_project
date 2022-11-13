$("#contactForm").submit(function (e) {
	e.preventDefault();

	var formData = {
		hs_buying_role: $("#inquiry").val(),
		firstname: $("#fullName").val(),
		email: $("#email").val(),
		mobilephone: $("#contact").val(),
		company: $("#companyName").val(),
		message: $("#message").val()
	};

	$.ajax({
		type: "POST",
		url: "https://staging-v3.vdo.ai/api/plunic-contact-us",
		data: formData,
		dataType: "json",
		encode: true,
		beforeSend: function () {
			if (!$('#contactForm').parsley().validate()) {
				return false;
			}
		},
		error: function () {
			$('.vError').removeClass('d-none');
		},
		success: function () {
			$('.vSuccess').removeClass('d-none');
			$("#contactForm")[0].reset();
		}
	})

});

