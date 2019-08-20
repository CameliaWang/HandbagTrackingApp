

// HELPERS

// const waitForDB = fn => {
// 	if(!db.length) {
// 		setTimeout(()=>fn(),10);
// 		return false;
// 	} return true;
// }

const checkData = (checker,t=10) => new Promise((resolve,reject) => {
	let c = 0;
	const check = () => ++c>50 ? reject('too many tries') :
		checker() ?
		resolve(checker()) :
		setTimeout(check,t);
	check();
});



const getUser = id => db.find(o=>o.id==id);
const getBag = (u,id) => (u?u:{}).bags.find(o=>o.id==id);

const currentUser = () => getUser(sessionStorage.userId);
const currentBag = () => getBag(currentUser(),sessionStorage.bagId);

const readFiles = (files,callback,index=0) => {
  if (files && files[0]) {
    let file = files[index++],
        reader = new FileReader();
    reader.onload = (e)=>{
      callback(e);
      if(index<files.length) readFiles(files,callback,index);
    }
    reader.readAsDataURL(file);
  }
}



const search = (str,arr,props) => {
	let r = RegExp(str,'i');
	return arr.filter(o=>{
		return props.some(p=>r.test(o[p]));
	});
}
const makeFilterList = (arr,prop,template) => {
	return arr
	.reduce((r,a)=>{
		if(!r.some(b=>b==a[prop])) r.push(a[prop]);
		return r;
	},[])
	.reduce((r,o)=>{
		return r+(template?template(o,prop):
			`<span class="sort-btn" data-filter="${prop}" data-value="${o}">${o}</span>`);
	},'')
}
















