<?php 

$connect = new PDO("mysql:host=localhost;dbname=ansell","root","");
$received_data = json_decode(file_get_contents("php://input"));
$data = array();

   
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
if($received_data->actions == "callmachinedip")
{
    $query ="SELECT * FROM machine where machine NOT like 'S%' ";
    
    $statement = $connect->prepare($query);
    $statement->execute();
    while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }
    echo json_encode($data);
}
if($received_data->actions == "calltime")
{
    $query ="SELECT * FROM time where timeshift  IN ('1','2','3')";
    
    $statement = $connect->prepare($query);
    $statement->execute();
    while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }
    echo json_encode($data);
}
if($received_data->actions == "callproductdata")
{
    $query ="SELECT * FROM product";
    
    $statement = $connect->prepare($query);
    $statement->execute();
    while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }
    echo json_encode($data);
}
if($received_data->actions == "callglovecolor")
{
    $query ="SELECT * FROM glovecolor";
    
    $statement = $connect->prepare($query);
    $statement->execute();
    while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }
    echo json_encode($data);
}
if($received_data->actions == "callmachine")
{
    $query ="SELECT * FROM machine where machine like 'S%' ";
    
    $statement = $connect->prepare($query);
    $statement->execute();
    while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }
    echo json_encode($data);
}
if($received_data->actions == "callsize")
{
    $query ="SELECT * FROM size";
    
    $statement = $connect->prepare($query);
    $statement->execute();
    while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        $data[] = $row;
    }
    echo json_encode($data);
}
if($received_data->actions == "dataas1")
{
        
    foreach ($received_data->send as $res)
    {    
        if($res%2==1)
        {            
            $query = "INSERT INTO dipping_lot_batch_l value (:send, '','','','','','','','','','','','',0,'' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":send", $res);
            $statement->execute();
        }
        else
        {
            $query = "INSERT INTO dipping_lot_batch_r value (:send, '','','','','','','','','','','','',0,'' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":send", $res);
            $statement->execute();  
        }
       
    }
    foreach ($received_data->send as $res)
    {   
        if($res%2==1)
        {                  
            $query = "INSERT INTO dipping_lot_hand_l value ('', :send,'','' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":send", $res);
            $statement->execute();
        }
        else
        {
            $query = "INSERT INTO dipping_lot_hand_r value ('', :send,'','' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":send", $res);
            $statement->execute();
        }
       $output = array(
         'message' => 'Data Inserted Complete!'
         );
        echo json_encode($output);

    }
         

    
   
}
if($received_data->actions == "dataas2")
{
      
    foreach ($received_data->sendas2 as $res) 
    {    
        if($res%2==0)
        {       
            $query = "INSERT INTO dipping_lot_batch_r value (:sendas2, '','','','','','','','','','','','',0,'' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":sendas2", $res);
            $statement->execute();

        }

        else
        {
            $query = "INSERT INTO dipping_lot_batch_l value (:sendas2, '','','','','','','','','','','','',0,'' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":sendas2", $res);
            $statement->execute();
        }
        $output = array(
            'message' => 'Data Inserted Complete!'
            );
            echo json_encode($output);

    }
             
    foreach ($received_data->sendas2 as $res)
    { 
        if($res%2==0)
        {       
            $query = "INSERT INTO dipping_lot_hand_r value ('', :sendas2,'','' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":sendas2", $res);
            $statement->execute();
        }
        else
        {
            $query = "INSERT INTO dipping_lot_hand_l value ('', :sendas2,'','' )";
            $statement = $connect->prepare($query);
            $statement->bindValue(":sendas2", $res);
            $statement->execute();
        }  
        
          $output = array(
            'message' => 'Data Inserted Complete!'
            );
            echo json_encode($output);
    }
          
}
if($received_data->actions == 'delete'){
    $query = "SELECT * FROM dipping_lot_batch_l WHERE DippingLot_L = '".$received_data->id."'";
    $statement = $connect->prepare($query);
    $statement->execute();

    $output = array(
        'message' => 'Success!!'
    );
    echo json_encode($output);
}

if($received_data->actions == 'deleteR'){
    $query = "SELECT * FROM dipping_lot_batch_r WHERE DippingLot_R = '".$received_data->id."'";
    $statement = $connect->prepare($query);
    $statement->execute();

    $output = array(
        'message' => 'Success!!'
    );
    echo json_encode($output);
}
?>