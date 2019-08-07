var express = require('express');
var router = express.Router();
var managerControllers = require('./../controllers/managerControllers.js')
var userControllers = require('./../controllers/userControllers.js')
var paymentControllers = require('./../controllers/paymentControllers.js')
var courseControllers = require('./../controllers/courseControllers.js')
var classControllers = require('./../controllers/classControllers.js')
var lessonController = require('./../controllers/lessonController.js')

const knex = require('./../models/knex.js');

/*管理员*/
router.post('/manager', managerControllers.insert);/*添加管理员*/
router.get('/manager', managerControllers.show);/*获取管理员所有信息*/
router.get('/manager/:id', managerControllers.personal);/*获取管理员个人信息*/
router.put('/manager/:id', managerControllers.updata);/*修改管理员个人信息*/
router.delete('/manager/:id',managerControllers.delete);/*删除管理员个人信息 软删除*/


/*客户*/
router.post('/user', userControllers.insert);/*添加客户*/
router.get('/user', userControllers.show);/*获取客户所有信息*/
router.get('/user/:id', userControllers.personal);/*获取客户个人信息*/
router.put('/user/:id', userControllers.updata);/*修改客户个人信息*/

/*钱款收入*/
router.post('/payment', paymentControllers.insert);/*添加钱款*/
router.get('/payment', paymentControllers.show);/*获取钱款所有信息*/

// 课程
router.post('/course', courseControllers.insert);/*添加课程*/
router.get('/course', courseControllers.show);/*获取课程所有信息*/
router.get('/course/:id', courseControllers.personal);/*获取课程个人信息*/
router.put('/course/:id', courseControllers.updata);/*修改课程个人信息*/
router.delete('/course/:id',courseControllers.delete);/*删除课程信息 软删除*/

// 班
router.post('/class', classControllers.insert);/*添加班级*/
router.get('/class', classControllers.show);/*获取班级所有信息*/
router.get('/class/:id', classControllers.personal);/*获取班级信息*/
router.put('/class/:id', classControllers.updata);/*修改班级信息*/
router.post('/class/:id/adduser', classControllers.adduser);

// 课
router.put('/lesson/:id', lessonController.update);
router.get('/lesson/:id', lessonController.show);
router.get('/lesson/:id/callnow', lessonController.callnow);


module.exports = router;
 
