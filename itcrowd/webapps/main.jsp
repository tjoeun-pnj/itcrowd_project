<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>보담</title>
<script src="js/jquery.js"></script>
<link rel="stylesheet" href="css/menubarcss.css" />
<link rel="stylesheet" href="assets/css/mainmenu.css" />
<link rel="stylesheet" href="css/what.css" />
<script src="js/menubar.js"></script>
<script src="assets/js/skel.min.js"></script>
<script src="assets/js/util.js"></script>
<script src="assets/js/main.js"></script>
  <script src="js/mainboot.js"></script>
  <script src="js/pwstrength.js"></script>
  <link rel="stylesheet" href="css/mainboot.css">
  <link rel="stylesheet" href="css/mainCustom.css">
<script src="js/mainCustom.js"></script>
</head>
<body>
<div id="main_header">
		<jsp:include page="/header.jsp" flush="false" />
	</div>
	<div id="blog-container"> 
		<jsp:include page="/mainContent.jsp" flush="false" />				
	</div>
	
	<div id="footer">
		풋터
	</div>
</body>
</html>