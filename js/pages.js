// SHOW PAGE FUNCTIONS


const showListPage = async (arr) => {
    await checkData(()=>db.length);
    
    arr = arr||currentUser().bags;

    $("#page-list .filter-box")
        .html(!arr.length?"No bags. Add one?":
            `<div class="filter-list">
            <span class="sort-btn" data-filter="type" data-value="">All</span>
            ${makeFilterList(arr,"type")}
            ${makeFilterList(arr,"brand")}
            </div>`);

    $("#page-list .bag-list")
        .html(makeBagsList(arr));
}


const showMapPage = async (arr) => {
	// if(!waitForDB(showMapPage)) return false;
	await checkData(()=>db.length);
	// await checkData(()=>window.google);

    arr = arr || currentUser().bags;

   let locs = arr.reduce((r,o)=>{
     if(o.locations.length) {
            let last = o.locations.slice(-1)[0];
            last.icon = o.icon;
            last.bagId = o.id;
            r.push(last);
        }
        return r;
    },[]);


    $("#page-map .filter-box")
        .html(!arr.length?"No bags. Add one?":
            `<div class="filter-list">
            <span class="sort-btn" data-mapfilter="type" data-value="">All</span>
            ${makeFilterList(arr,"type",(o,prop)=>`<span class="sort-btn" data-mapfilter="${prop}" data-value="${o}">${o}</span>`)}
            ${makeFilterList(arr,"brand",(o,prop)=>`<span class="sort-btn" data-mapfilter="${prop}" data-value="${o}">${o}</span>`)}
            </div>`);

    showMap(
        locs,
        "#page-map .map",
        t=>{
            console.log(t);
            let tm = $(t);

            tm.data("markers").forEach((o,i)=>{
                    let bags = getBag(
                    currentUser(),
                    locs[i].bagId);


                o.addListener("click",e=>{
                    // console.log(e);

                    tm.data("infoWindow")
                        // ${locs[i].lat} x ${locs[i].lng}<br>

                        .setContent(`
                        <div class="flex-parent bags-jump" data-id="${bags.id}" style="padding-top: 5%; padding-bottom: 5%; width: 100%;">
                         <div class="noclick">
                            <img src="${bags.img}" style="border-radius: 50%; width: 75px; height: 75px; object-fit: cover; object-position: center;">
                        </div>
                        <div class="noclick" style="padding-left: 1em; color: #4c5999; text-transform: capitalize;">
                            <strong>Name: </strong>${bags.name}<br>
                            <strong>Type: </strong>${bags.type}<br>
                            <strong>Brand: </strong>${bags.brand}<br>
                            <strong>Locations: </strong>${bags.locations.length}
                        </div> 
                        </div>
                        `);
                    tm.data("infoWindow")
                        .open(tm[0],o);
                })
            })
        }
    );
}

const showBagProfilePage = async () => {
    await checkData(()=>db.length);


    $("#page-detail .bag-profile-top")
        .html(makeBagProfile(currentBag()));



    showMap(
        currentBag().locations.map(o=>{
            o.icon = currentBag().icon;
            return o;
        }),
        "#page-detail .map",
        t=>{
            console.log(t);
            let tm = $(t);

            tm.data("map").addListener("click",e=>{
                console.log(e.latLng.lat(),e.latLng.lng());
                console.log("center of map",tm.data("map").getCenter())

                $("#add-location-lat").val(e.latLng.lat());
                $("#add-location-lng").val(e.latLng.lng());
                $("#add-location-modal").addClass("active");
            })    
        }
    );
}


const showUserProfilePage = async () => {
	// if(!waitForDB(showUserProfilePage)) return false;
	await checkData(()=>db.length);

    console.log("User Profile Page");

	$(".user-profile")
		.html(makeUserProfile(currentUser()));
}


const showEditBagPage = async () => {
    // if(!waitForDB(showEditBagPage)) return;

    await checkData(()=>db.length);
$(".bag-edit-content")
        .html(makeBagEditContent(currentBag()));
}

const makeEditUserFormPage = async () => {
    // if(!waitForDB(showEditBagPage)) return;

    await checkData(()=>db.length);
$(".edit-user-profile")
        .html(makeEditUserForm(currentUser()));
}




