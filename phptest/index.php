<!DOCTYPE html>
<html>
    <head>
		<title>A loop of your own</title>
        <link type='text/css' rel='stylesheet' href='style.css'/>
	</head>
	<body>
    <?php
	//Add while loop below
    	$tvar = 0;
    while ($tvar < 100) {
        $tvar = $tvar + 1;
        echo "<li>$tvar</li>";
    }
    ?>
    </body>
</html>
