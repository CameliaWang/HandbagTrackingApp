let db = [];


$.ajax({
	url:'data/data.json',
	dataType:'json'
})
.done(d=>{
	console.log(d);
	db = d;
})



// Document Ready
$(()=>{

	checkStorage();

	// Event Delegation
	$(document)

	.on("pagecontainerbeforeshow",(e,ui)=>{
		// console.log(e,ui,ui.toPage[0].id);

		switch(ui.toPage[0].id) {
			case "page-map":
				showMapPage();
				break;
			case "page-list":
				showListPage();
				break;
			case "page-detail":
				showBagProfilePage();
				break;
			case "page-profile":
				showUserProfilePage();
				break;			
			case "page-bag-edit":
				showEditBagPage();
				break;				
			case "page-edit-profile":
				makeEditUserFormPage();
				break;			
		}
	})

	// Form Submissions
// Login form
	.on("submit","#form-login",e=>{
		e.preventDefault();
		// $.mobile.navigate("#page-map")

		checkLoginForm();
	})
//Add New Bag form in Detail Page
	.on("submit","#add-location-form",e=>{
		e.preventDefault();

		let newid = currentBag().locations.length ?
			currentBag().locations.slice(-1)[0].id+1 :
			0;
		
		currentBag().locations.push({
			"id": newid,
            "lat": +$("#add-location-lat").val(),
            "lng": +$("#add-location-lng").val(),
            "description": $("#add-location-description").val(),
            "img": "https://via.placeholder.com/400x300"
		});
		showBagProfilePage();
	})
//Edit User form
	.on("submit","#edit-user-form",e=>{
		e.preventDefault();

		currentUser().name = $("#edit-user-name").val();
		currentUser().username = $("#edit-user-username").val();
		currentUser().email = $("#edit-user-email").val();
		currentUser().password = $("#edit-user-password").val();
		currentUser().gender = $("#edit-user-form [name='choose-gender']:checked").val();

		// showUserProfilePage();
		$.mobile.navigate("#page-profile")

	})
//Search form
	.on("input","#page-list .search-box",e=>{
		e.preventDefault();

		let searchresult = 
			search(
				$("#page-list .search-box input").val(),
				currentUser().bags,
				["name","type","brand"]
			);

		showListPage(searchresult);
	})

	.on("submit","#page-list .search-box",e=>{
		e.preventDefault();
	})	

  	.on("change",".imagepicker-replace input",ev=> {
  		console.log("honk")
	  readFiles(ev.target.files, e=> {
	    $(ev.target).parent()
	      .addClass("picked")
	      .css({"background-image":"url("+e.target.result+")"})
	      .data({"image":e.target.result});
	  });
	})
	.on("submit","#list-add-form",e=>{
		e.preventDefault();

		let newid = currentUser().bags.length ?
			currentUser().bags.slice(-1)[0].id+1 :
			0;
		
		currentUser().bags.push({
			"id": newid,
            "name": $("#list-add-name").val(),
            "type": $("#list-add-form [name='choose-type']:checked").val(),
            "brand": $("#list-add-brand").val(),
            "img": $("#list-add-form .imagepicker").data("image"),
            "icon": $("#list-add-form .imagepicker").data("image"),
            "locations":[]
		});

		// showListPage();
		e.target.reset();
		
		$.mobile.navigate("#page-list")
	})	

	.on("submit","#edit-bag-form",e=>{
		e.preventDefault();

		currentBag().name = $("#edit-bag-name").val();
		currentBag().brand = $("#edit-bag-brand").val();
		currentBag().type = $("#edit-bag-type").val();

		$.mobile.navigate("#page-detail")
	})



	// Clicks
//Log out
	.on("click",".js-logout",e=>{
		e.preventDefault();
		sessionStorage.removeItem('userId');
		checkStorage();
	})

	.on("click",".bags-jump",e=>{
		console.log(e.target)
		sessionStorage.bagId = $(e.target).data("id");
		$.mobile.navigate("#page-detail")
	})

	// <div data-activate="#form-login">
	.on("click","[data-activate]",e=>{
		$($(e.target).data("activate"))
			.addClass("active");
	})
	.on("click","[data-deactivate]",e=>{
		console.log(e.target)
		$($(e.target).data("deactivate"))
			.removeClass("active");
	})
	.on("click","[data-toggle]",e=>{
		$($(e.target).data("toggle"))
			.toggleClass("active");
	})

	.on("click",".rem-bag",e=>{
		currentUser().bags =
			currentUser().bags.filter(o=>
				o.id!=$(e.target).data("id")
			);

		$.mobile.navigate("#page-list");
	})

	.on("click","[data-filter]",e=>{
		let searchresult = 
			search(
				$(e.target).data("value"),
				currentUser().bags,
				[$(e.target).data("filter")]
			);

		showListPage(searchresult);
	})		


	.on("click","[data-mapfilter]",e=>{
		let searchresult = 
			search(
				$(e.target).data("value"),
				currentUser().bags,
				[$(e.target).data("mapfilter")]
			);

		showMapPage(searchresult);
	})


	// Open Edit Forms
	.on("click",".open-edit-user",e=>{
		$("#edit-user-form .editprofile-form")
			.html(makeEditUserForm(currentUser()));

	})

	.on("click",".submit-user-edit",e=>{
		$("#page-profile .profile-form")
			.html(makeUserProfile(currentUser()));
	})


	$("[data-template]").each((i,o)=>{
		$(o).html( $( $(o).data("template") ).html());
	})

	.on("click",".js-submit-editbag",e=>{
		sessionStorage.bagId = $(e.target).data("id");
		$.mobile.navigate("#page-detail")
	})	

	// .on("click",".submit-add-new",e=>{
	// 	$("#page-list .bag-list")
	// 		.html(showListPage(currentUser()));
	// })

	// .on("click",".submit-add-new",e=>{
	// 	// sessionStorage.bagId = $(e.target).data("id");
	// 	$.mobile.navigate("#page-list")
	// })

});

















