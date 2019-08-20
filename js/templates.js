
// currying, reduce
const templater = tf => oa =>
	(Array.isArray(oa)?oa:[oa]).reduce((r,o,i,a)=>r+tf(o,i,a),'');

// javascript backtick template literals

//" o " means the current object
const makeUserList = templater(o=>`
    <div class="user">
        <div class="user-name">${o.name}</div>
        <div>${makeBagsList(o.bags)}</div>
    </div>
`);
// const makeBagsList = templater(o=>`
//     <div class="bags" style="padding-left:1em">
//         <div class="bags-name">${o.name}</div>
//     </div>
// `);

const makeBagsList = templater(o=>`
        <div class="list-main">   
        <div class="bag-list">
    <div class="bags flex-parent flex-align-center">
        <div class="flex-none bags-icon bags-jump list-content media-image">
            <img src="${o.img}" alt="${o.name}" data-id="${o.id}">
        </div>
        <div class="flex-child list-content">
        <div class="bags-name flex-child list-title" data-id="${o.id}">${o.name}</div>
        <div class="bags-name flex-child list-text" data-id="${o.id}">${o.brand}, ${o.type}</div>
                </div>
    </div>
    </div></div>
`);
const makeLocationsList = templater(o=>`
    <div class="location" style="padding-left:1em">
        ${o.lat} x ${o.lng}
    </div>
`);



const makeBagProfile = templater(o=>`
    <div class="detail-img-box" data-role="none" style="text-align: center;">
            <label class="detail-img" data-role="none">
                <img src="${o.img}" alt="" width="150px">
            </label>
    </div>
    <div class="delete-bag"><a href="#" class="rem-bag" data-id="${o.id}">Delete?</a></div>

    <div class="detail-chart">
        <div class="flex-justify-center">
            <div class="detail-title">
                ${o.name}
            </div>
            <div class="flex-parent" style="margin-top:10px;margin-bottom:15px">
                <div class="flex-child">
                    <div class="detail-subtitle" style="font-weight:600;">${o.locations.length}</div>
                    <div class="detail-subtitle">times</div>
                </div>
                <div class="flex-child">
                    <div class="detail-subtitle" style="font-weight:600;">${o.type}</div>
                    <div class="detail-subtitle">type</div>
                </div>
                <div class="flex-child">
                    <div class="detail-subtitle" style="font-weight:600;">${o.brand}</div>
                    <div class="detail-subtitle">brand</div>
                </div>
            </div>
            <div class="detail-map map"></div>
        <div class="bag-more">
        ${o.locations.reduce((r,o)=>r+`${o.lat}x${o.lng}<br>`,'')}
        </div>
        </div>
    </div>

`);

const makeBagEditContent = templater(o=>`
    <div class="flex-parent flex-vertical flex-align-center flex-justify-center">
            <div class="back">
                <a href="#page-detail" data-rel="back" data-role="none" data-ajax="false"><img src="img/back.svg" alt="" width="16"></a>
            </div>
            <div class="big-title"><h1>Edit Bag Profile</h1>
            </div>

        <div class="detail-img-box detail-img" data-role="none" style="text-align: center; margin-top: 20%; margin-bottom: 20%;">
                <label data-role="none">
                    <img src="${o.img}" alt="" width="150px" style="border-radius: 50%;">
                </label>

        </div>
            <form id="edit-bag-form" data-role="none" data-ajax="false" style="width:120%;">
                <div class="form-control">
                    <label class="form-label" for="">Name</label>
                    <input class="form-input" type="text" id="edit-bag-name" data-role="none" value="${o.name}" style="text-transform: capitalize; padding-top: 1em;">
                </div>
                <div class="form-control">
                    <label class="form-label" for="">Brand</label> 
                    <input class="form-input" type="text" id="edit-bag-brand" data-role="none" value="${o.brand}" style="text-transform: capitalize; padding-top: 1em;">
                </div>
                <div class="form-control">
                    <label class="form-label" for="">Type</label>
                    <input class="form-input" type="text" id="edit-bag-type" data-role="none" value="${o.type}" style="text-transform: capitalize; padding-top: 1em;">
                </div>
                
                <div class="form-control">
                    <input class="form-button js-submit-editbag btn-big" type="submit" data-role="none" data-deactivate="#page-bag-edit" value="Save">

                </div>
            </form>
    </div>
    `);



const makeUserProfile = templater(o=>`

<div class="profile-handler">

        ${makeProfileImage(o)}

        <div class="profile-title">
            <div class="title-name text-center" style="color: #4c5999;">
                <h2 style="margin-bottom: 0;">${o.name}</h2>
                <p style="margin-top: 0;">${o.city}, ${o.state}</p>
            </div>
        </div>                       
        <div class="profile-form">
            <ul class="profile-content-list">
                <li class="profile-content">
                    <dl class="deflist">
                        <dt>Name</dt>
                            <dd>${o.name}</dd>
                        <dt>Gender</dt>
                            <dd>${o.gender}</dd>
                            <dt>Email</dt>
                            <dd>${o.email}</dd>                        
                            <dt>Username</dt>
                            <dd>${o.username}</dd>
                        <dt>Tracking Bags</dt>
                            <dd>${o.bags.length} Bags</dd>
                    </dl>           
                </li>                           
            </ul>
        </div>
    </div>
`);

const makeProfileImage = templater(o=>`
    <div class="profile-image"><img src="${o.img}"></div>
`);

const makeEditUserForm = templater(o=>`
            <form  id="edit-user-form" data-ajax="false">
        <div class="setting-div editprofile-form style="width:70vw; margin-top:0;" >

                <div class="form-control" style="margin-bottom: 2em;">
                    <label class="small-title" for="edit-user-name">Name</label>
                    <input class="form-input text-white" id="edit-user-name" type="text" data-role="none" value="Camelia Wang">
                </div>
                <div class="form-control" style="margin-bottom: 2em;">
                    <label class="small-title" for="edit-user-username">Username</label>
                    <input class="form-input text-white" id="edit-user-username" type="text" data-role="none" value="${o.username}">
                </div>

                <div class="form-control" style="margin-bottom: 2em;">
                    <label class="small-title" for="edit-user-email">Email</label>
                    <input class="form-input text-white" id="edit-user-email" type="text" data-role="none" value="${o.email}">
                </div>              
                <div class="form-control" style="margin-bottom: 2em;">
                    <label class="small-title" for="edit-user-password">Password</label>
                    <input class="form-input text-white" id="edit-user-password" type="text" data-role="none" value="********">
                </div>          
                <label class="small-title" for="edit-user-gender">Gender</label>                  
                       <div class="addnew-selections small-title selection-field flex-justify-center" id="form-user-gender">
                          <input type="radio" id="user-gender-female" name="choose-gender" value="Female" data-role="none" checked="">
                          <label class="sort-btn" for="user-gender-female"data-role="none" style="box-shadow: none; text-align: center; -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1); box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1); ">Female</label>

                          <input type="radio" id="user-gender-male" name="choose-gender" value="Male" data-role="none">
                          <label class="sort-btn" for="user-gender-male" data-role="none" style="box-shadow: none; text-align: center; -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1); box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1); ">Male</label>
                      </div>
           

                
                <div class="form-control">
                    <input class="form-button btn-big-white submit-user-edit" type="submit" data-role="none" data-ajax="false" value="Save">
                </div>
         </div>
                  
            </form>
`);

// const makeUserList = templater(o=>`<div>${o.name}</div>`);


//var s = o.bags
//var keys = [];
//for(var k in s) keys.push(k);





// const makeBagList0 = templater(o=>`
//   	<div class="bag-name">${o.bags[0].name}</div>
// `);

// const makeBagList1 = templater(o=>`
//     <div class="bag-name">${o.bags[1].name}</div>
// `);
// const makeBagList2 = templater(o=>`
//     <div class="bag-name">${o.bags[2].name}</div>
// `);

// const makeBagList3 = templater(o=>`
//     <div class="bag-name">${o.bags[3].name}</div>
// `);
// const makeBagList4 = templater(o=>`
//     <div class="bag-name">${o.bags[4].name}</div>
// `);

// const makeBagList5 = templater(o=>`
//     <div class="bag-name">${o.bags[5].name}</div>
// `);
// const makeBagList6 = templater(o=>`
//     <div class="bag-name">${o.bags[6].name}</div>
// `);

// const makeBagList7 = templater(o=>`
//     <div class="bag-name">${o.bags[7].name}</div>
// `);

// const makeBagList1 = templater(o=>`

// `);









// console.log(makeUserList([{name:'Me'},{name:'You'}]));


// const showBagAll = {bags},
// res1 = jsonPath(o, "$..brand").toJSONString(),
// res2 = jsonPath(o, "$..type", {resultType:"PATH"}).toJSONString();

//    <div class="bag-name">${o.name}</div>


	//<div class="bag-name">${o.name}</div>
	//<div class="bag-type">${o.gender}</div>
	//<div class="bag-brand">${o.city}</div>