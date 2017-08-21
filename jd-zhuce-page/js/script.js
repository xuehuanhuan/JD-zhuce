$(function(){
	// 数字、字母（不分大小写）、汉字、下划线
	// 4-20个字符
	// a-z A-Z 0-9 统统用\w表示
	// 汉字 unicode \u4e00-\u9fa5
	var re=/[^\w\u4e00-\u9fa5]/g;//数字、字母（不分大小写）、汉字、下划线
	var reNum=/[^\d]/g;//纯数字
	var name_length=0;
	//对用户名进行验证
	$('#username').focus(function(){//当鼠标聚焦
		$('.form-validate').eq(0).html('<i class="i-def point"></i><span>支持中文、字母、数字、“-”“_”的组合，4-20个字符</span>');
	});
	// 键盘输入
	$('#username').keyup(function(){
		name_length=getLength(this.value);
		// 含有非法字符
		if(re.test(this.value)){
			$('.form-validate').eq(0).html('<i class="i-def error"></i><span class="feifa">格式错误，仅支持汉字、字母、数字、“-”“_”的组合</span>');
			$('.form-list').eq(0).css('border','solid 1px #e22');
			$('.form-list').eq(0).find('.i-status').css('display','none');
		}else{
			$('.form-list').eq(0).css('border','solid 1px #ddd');
			$('.form-validate').eq(0).html('<i class="i-def point"></i><span>支持中文、字母、数字、“-”“_”的组合，4-20个字符</span>');
			$('.form-list').eq(0).find('.i-status').css('display','none');
		}
	});
	// 鼠标没有聚焦在输入框
	$('#username').blur(function(){
        // 不能为空
	    if(this.value==""){
			$('.form-validate').eq(0).html('');
			$('.form-list').eq(0).css('border','solid 1px #ddd');
			$('.form-list').eq(0).find('.i-status').css('display','none');
		}
		// 长度超过20个字符
		else if(name_length>20){
			$('.form-validate').eq(0).html('<i class="i-def error"></i><span class="feifa">长度只能在4-20个字符之间</span>');
			$('.form-list').eq(0).css('border','solid 1px #e22');
			$('.form-list').eq(0).find('.i-status').css('display','none');
		}
		// 长度少于4个字符
		else if(name_length<4){
			$('.form-validate').eq(0).html('<i class="i-def error"></i><span class="feifa">长度只能在4-20个字符之间</span>');
			$('.form-list').eq(0).css('border','solid 1px #e22');
			$('.form-list').eq(0).find('.i-status').css('display','none');
		}
		// 不可以为纯数字
		else if(!reNum.test(this.value)){
			$('.form-validate').eq(0).html('<i class="i-def error"></i><span class="feifa">用户不能是纯数字,请重新输入</span>');
			$('.form-list').eq(0).css('border','solid 1px #e22');
			$('.form-list').eq(0).find('.i-status').css('display','none');
		}
		// 成功之后应该显示的内容
		else{
			$('.form-list').eq(0).append('<i class="i-status"></i>');
			$('.form-list').eq(0).css('border','solid 1px #ddd');
			$('.form-validate').eq(0).html('');
			$('.form-list').eq(0).find('.i-status').css('display','block');
		}
	});

	// 设置密码
	var pwd_reg1= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,10}$/;//数字、字母、加字符 6到10
	var pwd_reg2= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{11,20}$/;//数字、字母、加字符 11到20
	var reChar=/[^a-zA-Z]/g;//纯字母
	$('#password').focus(function(){//鼠标聚焦
		$('.form-validate').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
	});
	// 键盘输入
	$('#password').keyup(function(){
		// 匹配至少有两种字符组合6-10,安全性为适中
		if($(this).val().match(pwd_reg1)){
			$('.form-validate').eq(1).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
			$('.form-list').eq(1).append('<i class="i-status"></i>');
			$('.form-list').eq(1).find('.i-status').css('display','block');
		}
		// 匹配至少有两种字符组合11-20,安全性为安全
		else if($(this).val().match(pwd_reg2)){
			$('.form-validate').eq(1).html('<i class="i-def point3"></i><span>你的密码很安全</span>');
			$('.form-list').eq(1).append('<i class="i-status"></i>');
			$('.form-list').eq(1).find('.i-status').css('display','block');
		}
		// 如果为纯数字或者纯字母安全性的判断
		else if(!reNum.test(this.value)||!reChar.test(this.value)){
			// 纯数字或密码为六位但小于10位安全性为弱
			if(this.value.length>5){
				$('.form-validate').eq(1).html('<i class="i-def point4"></i><span>有被盗风险,建议使用字母、数字和符号两种及以上组合</span>');
				$('.form-list').eq(1).append('<i class="i-status"></i>');
				$('.form-list').eq(1).find('.i-status').css('display','block');
			}
			// 纯数字或密码为十位以上安全性为适中
			if(this.value.length>10){
				$('.form-validate').eq(1).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
				$('.form-list').eq(1).append('<i class="i-status"></i>');
				$('.form-list').eq(1).find('.i-status').css('display','block');
			}
			// 小于六位则不能构成密码
			if(this.value.length<6){
				$('.form-validate').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
				$('.form-list').eq(1).find('.i-status').css('display','none');
			}
		}
		else{
			$('.form-validate').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
			$('.form-list').eq(1).find('.i-status').css('display','none');
		}
	});
	// 密码的失焦的长度判断
	$('#password').blur(function(){
		// 失焦之后为空时显示的内容
		if($(this).val() == ""){
			$('.form-validate').eq(1).html('');
			$('.form-list').eq(1).css('border','solid 1px #ddd');
			$('.form-list').eq(1).find('.i-status').css('display','none');
		}
		// 失焦时长度小于六时显示的内容
		else if(this.value.length<6){
			$('.form-validate').eq(1).html('<i class="i-def error"></i><span class="feifa">长度只能在6-20个字符之间</span>');
			$('.form-list').eq(1).css('border','solid 1px #e22');
		}else{
			$('.form-list').eq(1).css('border','solid 1px #ddd');
		}
	});

	// 确认密码设置
	$('#Repassword').focus(function(){//鼠标聚焦
		$('.form-validate').eq(2).html('<i class="i-def point"></i><span>请再次输入密码</span>');
	});
	// 鼠标离开
	$('#Repassword').blur(function(){
		// 如果再次密码为空时显示的内容
		if($(this).val() == ""){
			$('.form-validate').eq(2).html('');
			$('.form-list').eq(2).css('border','solid 1px #ddd');
			$('.form-list').eq(2).find('.i-status').css('display','none');
		}
		// 判断两次密码是否一致
		else if($(this).val() != $("#password").val()){
			$('.form-validate').eq(2).html('<i class="i-def error"></i><span class="feifa">两次密码输入不一致</span>');
			$('.form-list').eq(2).find('.i-status').css('border','solid 1px #e22');
		}else{
			$('.form-list').eq(2).css('border','solid 1px #ddd');
			$('.form-list').eq(2).append('<i class="i-status"></i>');
			$('.form-list').eq(2).find('.i-status').css('display','block');
			$('.form-validate').eq(2).html('');			
		}
	});

	// 电话号码的正则表达式判断
	var phone_reg = /^1[3|4|5|7|8]\d{9}$/;
	// 电话号码得到焦点显示的内容
	$('#telphone').focus(function(){
		$('.form-validate').eq(3).html('<i class="i-def point"></i><span>完成验证后，你可以用该手机登录和找回密码</span><a href="#">邮箱验证</a>');	
	});
	// 电话号码失去焦点
	$('#telphone').blur(function(){
        if ($(this).val() == "") {  
			$('.form-validate').eq(3).html('<a href="#">邮箱验证</a>');
			$('.form-list').eq(3).find('.i-status').css('display','none');
        }
        // 电话号码的长度应为11位
		else if($(this).val().length != 11) {   
            $('.form-validate').eq(3).html('<i class="i-def error"></i><span class="feifa">格式有误</span><a href="#">邮箱验证</a>');
        	$('.form-list').eq(3).css('border','solid 1px #e22');
        	$('.form-list').eq(3).find('.i-status').css('display','none');
        }
        // 判断输入的是不是手机号码  
        else if(!$(this).val().match(phone_reg)) {  
            $('.form-validate').eq(3).html('<i class="i-def error"></i><span class="feifa">格式有误</span><a href="#">邮箱验证</a>');
        	$('.form-list').eq(3).css('border','solid 1px #e22');
        	$('.form-list').eq(3).find('.i-status').css('display','none');
        } else {  
			$('.form-list').eq(3).css('border','solid 1px #ddd');
			$('.form-list').eq(3).append('<i class="i-status"></i>');
			$('.form-list').eq(3).find('.i-status').css('display','block');
			$('.form-validate').eq(3).html('<a href="#">邮箱验证</a>');	
        }  
	});
	// 验证码的验证鼠标得到焦点
	$('#identifycode').focus(function(){
		$('.form-validate').eq(4).html('<i class="i-def point"></i><span>看不清？点击图片更换验证码</span>');
	});
	// 验证码框鼠标失去焦点
	$('#identifycode').blur(function(){
		$('.form-validate').eq(4).html('');
	});
	// 1-9的验证码
	var array=["0","1","2","3","4","5","6","7","8"];
	// 点击验证码图片切换验证码
	$('#click').click(function(){
		var s = parseInt(Math.random()*array.length);//得到数组里随机的数
		$('.form-list').eq(4).find('img').attr("src","image/image"+s+".jpg");//对页面的二维码进行随机的更新		
	});
})
// 如果为汉字则占两个字节
function getLength(str){
	return str.replace(/[^\x00-xff]/g,"xx").length;
}