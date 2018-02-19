/*****************8
 * 윈도우 시작시 input 감시
 */
$(document).ready(function(){
	$('#join_id').focusout(function(){
		if(validationCheck($('#join_id'), "이메일을 입력하세요", "id")) checkJoin(this, "idchk");
	});
	$('#join_name').focusout(function(){
		if(validationCheck($('#join_name'), "이름을 입력하세요", "name")) checkJoin(this, "namechk");
	});
	
	// 비밀번호 안정성 검사 셋팅
	var options = {
			minChar : 3,
			bootstrap3 : true,
			errorMessages : {
				password_too_short : "<font color='red'>비밀번호가 너무 짧습니다.</font>",
				same_as_username : "id와 pw는 같을 수 없습니다."
			},
			scores : [ 17, 26, 40, 50 ],
			verdicts : [ "안전성: 약함", "안전성: 보통", "안전성: 중간", "안전성: 강함",
					"안전성: 매우강함" ],
			showVerdicts : true,
			showVerdictsInitially : false,
			raisePower : 1.4,
			usernameField : "#join_pass",
		};

		$("#join_pass").pwstrength(options);
		
		

		/*비밀번호 일치 검사  */
		$("#join_pass_chk").on('change', validate).on('focus', validate).on(
				'blur', validate).on('keydown', validate).on('keyup', validate);

		$("#join_pass").on('change', validate).on('focus', validate).on('blur',
				validate).on('keydown', validate).on('keyup', validate);
		
		/*bookseting */
		bookReadyMain();
		
});

//비밀번호 일치 검사
function validate() {

	var $validation = $("#join_pass_chk").parents().find("#passChk");
	if ($("#join_pass_chk").val() == $("#join_pass").val()) {

		$validation.html("비밀번호 일치").css({
			color : 'green'
		});
	} else {
		$validation.html("비밀번호 불일치").css({
			color : 'red'
		});
	}
}

function validationCheck($target, message, type) {
	var span;
	if ($target.val().replace(/\s/g, "") == "") {
		if(type == "id"){
			span = document.getElementById("emailChk");
			span.innerHTML = message;
		} else if(type == "name"){
			span = document.getElementById("nameChk");
			span.innerHTML = message;
		} else if(type == "pass"){
			span = document.getElementById("passChk1");
			span.innerHTML = message;
		} else if(type == "passc"){
			span = document.getElementById("passChk");
			span.innerHTML = message;
		} else if(type == null){
			return;
		}
		span.style.color = '#f00';
		return false;
	} else {
		return true;
	}
}
/***********8
 * modal관련 메서드
 * @returns
 */
function myModal() {
	$("body").removeClass("is-menu-visible");
	$('#myModal').modal('show');
	setTimeout(function(){
		$('#join_id').focus();
	}, 600);
	
}
function myModal1() {
	$("body").removeClass("is-menu-visible");
	$('#myModal1').modal('show');
}

/************************8
 * 중복검사 ajax들
 */
function checkJoin(inputObj, req){
	if(req == 'idchk') document.getElementById("emailChk").innerHTML = '검사중';
	if(req == 'namechk') document.getElementById("nameChk").innerHTML = '검사중';;
	$.ajax({
        type:"POST",
        url:"./member/"+req,
        data : inputObj.name+'='+$('#'+inputObj.id).val(),
        dataType : "json",
        success: function(data){
        	resultJoinChk(data);
        },
        error: function(xhr, status, error) {
        	console.log();
        }  
    });
}

function resultJoinChk(data){
	var span; 
	if(data.type == 'email') span = document.getElementById("emailChk");
	else if(data.type == '닉네임') span = document.getElementById("nameChk");
	if(!data.result){
		span.innerHTML = data.type+'이 중복되지 않습니다.';
		span.style.color = 'blue';
	} else {
		span.innerHTML = data.type+'이 중복됩니다.';
		span.style.color = '#f00';
	}
}

/***********
 *  회원가입 관련 ajax
 */
function joinMember(){
	
	if(!validationCheck($('#join_id'), "이메일을 입력하세요", "id")) {
		$('#join_id').focus();
		return;
	}
	if(!validationCheck($('#join_name'), "이름을 입력하세요", "name")) {
		$('#join_name').focus();
		return;
	}
	if(!validationCheck($('#join_pass'), "비밀번호를 입력하세요", "pass")){
		$('#join_pass').focus();
		return;
	}
	if(!validationCheck($('#join_pass_chk'), "비밀번호 확인을 입력하세요", "passc")){
		$('#join_pass_chk').focus();
		return;
	}
	
	if (!($("#join_pass").val() == $("#join_pass_chk").val())) return;
    $.ajax({
        type:"POST",
        url:"./member/join",
        data : $("#joinForm").serialize(),
        dataType : "json",
        success: function(data){
        	joinSuccess(data);
        },
        error: function(xhr, status, error) {
            joinFail();
        }  
    });
   
}
/*************
 * 회원가입 ajax 후 실패와 성공처리
 * @returns
 */
function reqFail(){
	alert("죄송합니다. 연결오류로 가입이 실패하였습니다. 잠시후 다시 실행해 주세요.");
}

function joinSuccess(success){
	if(success.result){
		alert("축하합니다 회원가입에 성공하셨습니다.");
		$('#myModal').modal('hide');
		$('#join_id').val('');
		$('#join_name').val('');
		$('#join_pass').val('');
		$('#join_pass_chk').val('');
		$("body").addClass("is-menu-visible");
		setTimeout(function(){
			$('#log_id').focus();
		}, 600);
	}
	else ;
}

/************************
 * 로그인 관련 function
 * @returns
 */
function loginMember(){
	if(!validationCheck($('#log_id'), null, null)) {
		alert("이메일을 입력하세요.");
		return;
	}
	if(!validationCheck($('#log_pass'), null, null)){
		alert("비밀번호를 입력하세요.");
		return;
	}
	$.ajax({
        type:"POST",
        url:"./member/login",
        data : $("#loginForm").serialize(),
        dataType : "json",
        success: function(data){
        	loginSuccess(data);
        },
        error: function(xhr, status, error) {
            reqFail();
        }  
    });
}

function loginSuccess(success){
	if(success.result){
		alert("로그인 성공하셨습니다.");
		window.location.reload();
	}
	else {
		$('#log_pass').val('');
		alert("로그인 실패 다시 시도하세요.");
		$('#log_pass').focus();
	}
}


/***********************
	메인페이지 베스트 & 신간 셋팅
	
*/
function bookReadyMain() {
	// 베스트
	$.ajax({
        type:"POST",
        url:"./book/mainBest",
        dataType : "json",
        success: function(data){
        	if(data.result) setBookBest(data.json);
        	else alset("book 실패");
        },
        error: function(xhr, status, error) {
            alert("bookSet 실패");
        }  
    });
	// 신간
	$.ajax({
		type:"POST",
		url:"./book/mainNew",
		dataType : "json",
		success: function(data){
			if(data.result) setBookNew(data.json);
			else alset("book 실패");
		},
		error: function(xhr, status, error) {
			alert("bookSet 실패");
		}  
	});
	// 독립
	$.ajax({
		type:"POST",
		url:"./book/mainBest",
		dataType : "json",
		success: function(data){
			if(data.result) setBookIndie(data.json);
			else alset("book 실패");
		},
		error: function(xhr, status, error) {
			alert("bookSet 실패");
		}  
	});
}

function setBookBest(json){
	var bVo = JSON.parse(json).item;
	var setHtml = "";
	console.log(bVo);
	for(var x=0;x<10;x++){
		if(x < 5){
			setHtml += '<div class="movie-card size-1x1 poster-type base_movie  user-action-m4d83i card grid-1 hei-1 top-0 left-'+x+'"><div class="poster-wrapper">';
		} else {
			setHtml += '<div class="movie-card size-1x1 poster-type base_movie  user-action-m4d83i card grid-1 hei-1 top-1 left-'+(x%5)+'"><div class="poster-wrapper">';
		}
		setHtml += '<img class="poster" src="'+bVo[x].cover+'" width="150px" height="220px"><div class="detail-opener gradation"></div><div class="bottom"></div><div class="action-wrapper">';
		setHtml += '<div class="movie-title">'+bVo[x].title+'</div><div class="rating"><span class="watcha-star half left" data-value="0.5"></span><span class="watcha-star half right" data-value="1"></span><span class="watcha-star half left" data-value="1.5"></span><span class="watcha-star half right" data-value="2"></span><span class="watcha-star half left" data-value="2.5"></span><span class="watcha-star half right" data-value="3"></span><span class="watcha-star half left" data-value="3.5"></span><span class="watcha-star half right" data-value="4"></span><span class="watcha-star half left" data-value="4.5"></span><span class="watcha-star half right" data-value="5"></span></div>';
		setHtml += '<div class="wish-comment"><div class="comment"><span class="icon"></span><span class="text">코멘트 쓰기</span></div></div></div></div></div>';
	}
	document.getElementById('best-grid-container').innerHTML = setHtml;
}

function setBookNew(json){
	var bVo = JSON.parse(json).item;
	var setHtml = "";
	for(var x=0;x<bVo.length;x++){
		if(x < 5){
			setHtml += '<div class="movie-card size-1x1 poster-type base_movie  user-action-m4d83i card grid-1 hei-1 top-0 left-'+x+'"><div class="poster-wrapper">';
		} else {
			setHtml += '<div class="movie-card size-1x1 poster-type base_movie  user-action-m4d83i card grid-1 hei-1 top-1 left-'+(x%5)+'"><div class="poster-wrapper">';
		}
		setHtml += '<img class="poster" src="'+bVo[x].cover+'" width="150px" height="220px"><div class="detail-opener gradation"></div><div class="bottom"></div><div class="action-wrapper">';
		setHtml += '<div class="movie-title">'+bVo[x].title+'</div><div class="rating"><span class="watcha-star half left" data-value="0.5"></span><span class="watcha-star half right" data-value="1"></span><span class="watcha-star half left" data-value="1.5"></span><span class="watcha-star half right" data-value="2"></span><span class="watcha-star half left" data-value="2.5"></span><span class="watcha-star half right" data-value="3"></span><span class="watcha-star half left" data-value="3.5"></span><span class="watcha-star half right" data-value="4"></span><span class="watcha-star half left" data-value="4.5"></span><span class="watcha-star half right" data-value="5"></span></div>';
		setHtml += '<div class="wish-comment"><div class="comment"><span class="icon"></span><span class="text">코멘트 쓰기</span></div></div></div></div></div>';
	}
	document.getElementById('new-grid-container').innerHTML = setHtml;
}
function setBookIndie(json){
	var bVo = JSON.parse(json).item;
	console.log(bVo);
	var setHtml = "";
	for(var x=0;x<5;x++){
		setHtml += '<div class="movie-card size-1x1 poster-type base_movie  user-action-m4d83i card grid-1 hei-1 top-0 left-'+x+'"><div class="poster-wrapper">';
		setHtml += '<img class="poster" src="'+bVo[x].cover+'" width="150px" height="220px"><div class="detail-opener gradation"></div><div class="bottom"></div><div class="action-wrapper">';
		setHtml += '<div class="movie-title">'+bVo[x].title+'</div><div class="rating"><span class="watcha-star half left over horver" data-value="0.5"></span><span class="watcha-star half right" data-value="1"></span><span class="watcha-star half left over horver" data-value="1.5"></span><span class="watcha-star half right" data-value="2"></span><span class="watcha-star half left" data-value="2.5"></span><span class="watcha-star half right" data-value="3"></span><span class="watcha-star half left" data-value="3.5"></span><span class="watcha-star half right" data-value="4"></span><span class="watcha-star half left" data-value="4.5"></span><span class="watcha-star half right" data-value="5"></span></div>';
		setHtml += '<div class="wish-comment"><div class="comment"><span class="icon"></span><span class="text">코멘트 쓰기</span></div></div></div></div></div>';
	}
	document.getElementById('indie-grid-container').innerHTML = setHtml;
}