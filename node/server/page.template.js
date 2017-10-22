
module.exports = (vitreum)=>{
	return `<html>
	<head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
		<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css" />
		${vitreum.head}
	</head>
	<body>
		<main id="reactRoot">${vitreum.body}</main>
	</body>
	${vitreum.js}
</html>`;
};