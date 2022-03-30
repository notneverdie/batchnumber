<?php 

$connect = new PDO("mysql:host=localhost;dbname=ansell","root","");
$received_data = json_decode(file_get_contents("php://input"));
$data = array();
$totalGrove = 0;

    if($received_data->actions == "fetchalldata")
    {
        $query ="SELECT * FROM dipping_lot_batch_r  ";
        $statement = $connect->prepare($query);
        $statement->execute();
        while($row = $statement->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        echo json_encode($data);
    }
    if($received_data->actions == "fetchall")
    {
        $query ="SELECT * FROM dipping_lot_batch_l  ";
        $statement = $connect->prepare($query);
        $statement->execute();
        while($row = $statement->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        echo json_encode($data);
    }



    if($received_data->actions == 'fetchSingle'){  
        $query = "SELECT * FROM dipping_lot_batch_l WHERE DippingLot_L = '".$received_data->id."' ";  

        $statement = $connect->prepare($query);
        $statement->execute($data);  
        $result = $statement->fetchall();  //ดึงข้อมูลมาเก็บที่ตัวแปร result

        foreach($result as $row){      // ลูปข้อมูล $result
            $data['id'] = $row['DippingLot_L']; 
          
            $data['dipping_lot'] = $row['DippingLot_L'];
            $data['Batch_1'] = $row['Batch1'];
            $data['amt_1'] = $row['amt1'];
            $data['Batch_2'] = $row['Batch2'];
            $data['amt_2'] = $row['amt2'];
            $data['Batch_3'] = $row['Batch3'];
            $data['amt_3'] = $row['amt3'];
            $data['Batch_4'] = $row['Batch4'];
            $data['amt_4'] = $row['amt4'];
            $data['Batch_5'] = $row['Batch5'];
            $data['amt_5'] = $row['amt5'];
            $data['Batch_6'] = $row['Batch6'];
            $data['amt_6'] = $row['amt6'];
            $data['total_glove'] = $row['TotalPcs'];
           
          
        }
        echo json_encode($data);  
    }
    if($received_data->actions == 'fetchSingleR'){  
        $query = "SELECT * FROM dipping_lot_batch_r WHERE DippingLot_R = '".$received_data->id."' ";  

        $statement = $connect->prepare($query);
        $statement->execute($data);  
        $result = $statement->fetchall();  //ดึงข้อมูลมาเก็บที่ตัวแปร result

        foreach($result as $row){      // ลูปข้อมูล $result
            $data['id'] = $row['DippingLot_R']; 
            $data['dipping_lot'] = $row['DippingLot_R'];
            $data['Batch_1'] = $row['Batch1'];
            $data['amt_1'] = $row['amt1'];
            $data['Batch_2'] = $row['Batch2'];
            $data['amt_2'] = $row['amt2'];
            $data['Batch_3'] = $row['Batch3'];
            $data['amt_3'] = $row['amt3'];
            $data['Batch_4'] = $row['Batch4'];
            $data['amt_4'] = $row['amt4'];
            $data['Batch_5'] = $row['Batch5'];
            $data['amt_5'] = $row['amt5'];
            $data['Batch_6'] = $row['Batch6'];
            $data['amt_6'] = $row['amt6'];
            $data['total_glove'] = $row['TotalPcs'];
           
          
        }
        echo json_encode($data);  
    }
    if($received_data->actions == 'update'){   // ส่ง$received_data ผ่าน actions ถ้ามันตรงกับ update
        $data = array(
            //  รับข้อมูลที่ส่งมาจาก update vue มา แล้วดึงตัวแปร data array มาแล้วมาเก็บไว้ที่ array
            // ':bin_no' => $received_data->binNo,
            // เข้าไปเอาข้อมูลมาเก็บไว้ ผ่าน$received_data มาเก็บที่ array ':employee_number'
            // ':product_code' => $received_data->productCode,
            ':dipping_lot' => $received_data->dipLot,
            ':Batch_1' => $received_data->Batch1,
            ':amt_1' => $received_data->Amt1,
            ':Batch_2' => $received_data->Batch2,
            ':amt_2' => $received_data->Amt2,
            ':Batch_3' => $received_data->Batch3,
            ':amt_3' => $received_data->Amt3,
            ':Batch_4' => $received_data->Batch4,
            ':amt_4' => $received_data->Amt4,
            ':Batch_5' => $received_data->Batch5,
            ':amt_5' => $received_data->Amt5,
            ':Batch_6' => $received_data->Batch6,
            ':amt_6' => $received_data->Amt6,
            ':total_glove' => $received_data->TotalGlove,
         
            ':id' => $received_data->hiddenId,
          
        );
        $query = "UPDATE dipping_lot_batch_l SET DippingLot_L = :dipping_lot , 
        Batch1 = :Batch_1, amt1 = :amt_1, Batch2 = :Batch_2, amt2 = :amt_2, Batch3 = :Batch_3,
        amt3 = :amt_3, Batch4 = :Batch_4, amt4 = :amt_4, Batch5 = :Batch_5,
        amt5 = :amt_5, Batch6 = :Batch_6, amt6 = :amt_6, TotalPcs = :total_glove
        WHERE DippingLot_L = :id";  //update เข้า ฐานข้อมูล ต้อง where id = :id ด้วยเป็นการ update ต้องใส่เพื่อให้รูั้ว่าตัวไหนมันตรงกัน
        $statement = $connect->prepare($query);
        $statement->execute($data); //ประมวลผล หลัง prepare
        $queryR = "UPDATE dipping_lot_batch_r SET DippingLot_R = :dipping_lot , 
        Batch1 = :Batch_1, amt1 = :amt_1, Batch2 = :Batch_2, amt2 = :amt_2, Batch3 = :Batch_3,
        amt3 = :amt_3, Batch4 = :Batch_4, amt4 = :amt_4, Batch5 = :Batch_5,
        amt5 = :amt_5, Batch6 = :Batch_6, amt6 = :amt_6, TotalPcs = :total_glove
        WHERE DippingLot_R = :id";  //update เข้า ฐานข้อมูล ต้อง where id = :id ด้วยเป็นการ update ต้องใส่เพื่อให้รูั้ว่าตัวไหนมันตรงกัน
        $statementR = $connect->prepare($queryR);
        $statementR->execute($data);
        $output = array(
            'message' => 'Data Update!!'
        );
        echo json_encode($output);  // ส่งค่าไปยัง frontend
    }

    // if($received_data->actions == 'delete'){
    //     $query = "SELECT * FROM dipping_lot_batch_l WHERE DippingLot_L = '".$received_data->id."'";

    //     $statement = $connect->prepare($query);
    //     $statement->execute();

    //     $output = array(
    //         'message' => 'Success!!'
    //     );
    //     echo json_encode($output);
    // }
?>