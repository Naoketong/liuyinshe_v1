const UserModel = require('./../models/user.js');
const UserClassModel = require('./../models/userclass.js');
const { formatDate } = require('./../utils/date.js');


const UserControllers = {
	/*添加客户*/
	insert: async function(req, res, next){
		let name = req.body.name;
		let phone = req.body.phone;
		let password = req.body.password;
		let sex = req.body.sex;
		let birthday = req.body.birthday;
		// birthday = new Data(birthday);
		let sms_name = req.body.sms_name;
		let sms_phone  = req.body.sms_phone;
		let balance = req.body.balance;
		// let created_at = req.body.created_at;
		try{
			const users = await UserModel.insert({
				name, phone, password, sex, birthday, sms_name, sms_phone, balance
			});
			res.json({ 
        code: 200, 
        data: '上传成功'
      })
		}catch(err){
			console.log(err)
      res.json({ 
        code: 0,
        message: '内部错误'
      })
		}
	},
	/*获取客户所有信息*/
	show: async function(req, res, next) {
    let name = req.query.name;
    let phone = req.query.phone;
    let pageSize = req.query.page_size || 20;
    let currentPage = req.query.current_page || 1;
    let params = {};
    if(name) params.name = name;
    if(phone) params.phone = phone;
    try {
      let users = await UserModel
        .pagination(pageSize, currentPage, params)
        .orderBy('id', 'desc');
      let usersCount = await UserModel.count(params);

      let total = usersCount[0].total;
      res.json({code: 200, messsage: '获取成功', data: {
        datas: users,
        pagination: {
          total: total,
          current_page: currentPage,
          page_size: pageSize,
        }
      }})
    } catch (err) {
    	console.log(err)
      res.json({code:0,messsage: '服务器错误'});
    }
  },
	
	/*获取客户个人信息*/
	personal: async function(req, res, next){
		let id = req.params.id;
		try{
			const user = await UserModel.select({id})
			
			 let klass = await UserClassModel
          .where({ user_id: id })
          .leftJoin('class', 'user_class.class_id', 'class.id')
          .column('class.id','class.name', 'class.start_at', 'class.end_at')
        klass.forEach(data => {
          data.start_at = formatDate(data.start_at)
          data.end_at = formatDate(data.end_at)
        });
			res.json({ 
        code: 200, 
        data: {
        	user: data,
          class: klass
        }
      })
		}catch(err){
			console.log(err)
      res.json({ 
        code: 0,
        message: '获取失败'
      })
		}
	},
	/*修改客户个人信息*/
	updata:async function(req, res, next){
		let id = req.params.id;
		let name = req.body.name;
		let phone = req.body.phone;
		let password = req.body.password;
		let sex = req.body.sex;
		let birthday = req.body.birthday;
		// birthday = new Data(birthday);
		let sms_name = req.body.sms_name;
		let sms_phone  = req.body.sms_phone;
		let balance = req.body.balance;
		try{
			const users = await UserModel.update(
				id ,{
					name, phone, password, sex, birthday, sms_name, sms_phone, balance
				})
			res.json({ 
        code: 200, 
        data: users
      })
		}catch(err){
			console.log(err)
      res.json({ 
        code: 0,
        message: '修改失败'
      })
		}
	},
	/*删除客户个人信息 软删除*/
		
}
module.exports = UserControllers;