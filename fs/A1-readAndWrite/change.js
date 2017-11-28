let fs = require('fs');

fs.readFile('./siteInfoYGG.json', 'utf8', (err, data) => {  //data string(设置了编码格式时返回)|buffer(没有设置编码格式时返回)
	if (err) throw err;
	let yggAreaList = JSON.parse(data).list.SiteInfo;
	yggAreaList = yggAreaList.map(el => {
		let id = el['-id'];
		// 将区域站（6位为区域站）id前两位数转化为对应的字母
		if (id.length === 6) id = id.replace(/^\d{2}/, (group) => String.fromCharCode(group));
		return {
			province: el['-province'],  //省
			area: "",  //市
        	areaCode: "",  //市标识
			name: el['-name'],  //站名
	        id: id,  //站号
	        lat: el['-latitude'],  //经度
	        lon: el['-longitude'],  //纬度
	        guojia: el['-guojia'],  //国家站
	        quyu: el['-quyu'],  //区域站
	        chengzhong: el['-chengzhong'],  //称重站
	        height: el['-height'],  //海拔  
	        level: el['-level'],
	        shanhong: el['-shanhong'],
	        zhuanye: el['-zhuanye']
		}
	});
	yggAreaList = JSON.stringify(yggAreaList, null, '\t');
	fs.writeFile('./yggAreaList.json', yggAreaList, 'utf8', (err) => {
		if (err) throw err;
		console.log('文件保存成功!');
	});
});