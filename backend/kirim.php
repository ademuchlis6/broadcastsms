<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type, origin");
header('Content-Type: application/json');

function gen_uuid() {
    return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
        mt_rand( 0, 0xffff ),
        mt_rand( 0, 0x0fff ) | 0x4000,
        mt_rand( 0, 0x3fff ) | 0x8000,
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
    );
}


//cek method
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
   $json = array("status" => 0, "message" =>"Method not allowed");
   echo json_encode($json);
}else{
    $content=trim(file_get_contents("php://input"));
    $data = json_decode($content, true);

    $userdb="root";
    $passdb="";
    $hostname = "localhost:3306";
	
    
    $secret=$data['secret'];
	$id = gen_uuid();
	
	$kirim=$data['data']['kirim'];

	
    if($kirim==null||$secret==null){
        $json = array("status" => 1, "message" => "bad request");
        echo json_encode($json);
    }else{
		if($secret!="4DeMuchlis"){
			$json = array("status" => 1, "message" => "key anda salah");
			echo json_encode($json);
		}else{
			$mysqli = new mysqli($hostname, $userdb, $passdb, "test_isat");
			/* check connection */
			if (mysqli_connect_errno()) {
				printf("Connect failed: %s\n", mysqli_connect_error());
				exit();
			}

			for($i=0; $i<count($kirim); $i++){
				$nomorKirim = $kirim[$i]['nomor'];
				$pesanKirim = $kirim[$i]['pesan'];
				$sql = "INSERT INTO test_isat.messagemt(messageid, userid, original, sendto, message, receivedate)
				VALUES ('$id.$i','Gammu','CapilKabBGR','$nomorKirim', '$pesanKirim', now())";
				$mysqli->query($sql);
//				sleep(1)
			}
			$data = array('idSendItem' =>$mysqli->insert_id);

			$json = array("status" => 1,
			 "data"=> null,
			 "message" => "Pesan telah dikirim ke server sms"
			 );

			/* close connection */
			$mysqli->close();

			header('Content-type: application/json');
			echo json_encode($json);        	
		}
    }
}

?>