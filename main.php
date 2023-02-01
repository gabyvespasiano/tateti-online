<?php
$idpartida = $_GET['idpartida'];
$tablero = $_GET['tablero'];
$turno = $_GET['turno'];
$ganador = $_GET['ganador'];
$tarea = $_GET['tarea'];

$conexion = mysqli_connect("HOST", "USER", "PASSWORD", "TABLE");

function verify($conexion, $id)
{
    $query = "SELECT * FROM partidas WHERE idpartida = ?";

    $stmt = mysqli_prepare($conexion, $query);
    mysqli_stmt_bind_param($stmt, 'i', $id);

    if (mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0) {
            // echo "Existe un registro con el id especificado.";
            mysqli_stmt_close($stmt);
            return true;
        } else {
            // echo "No existe un registro con el id especificado.";
            mysqli_stmt_close($stmt);
            return false;
        }
    } else {
        // echo "Error: " . mysqli_stmt_error($stmt);
        echo '{"idpartida": "nothing"}';
    }

    mysqli_stmt_close($stmt);
    //return $arg_1;
}

if ($tarea == "write"){

    if (verify($conexion,$idpartida)){
        $query = "UPDATE partidas SET tablero = ?, turno = ?, ganador = ? WHERE idpartida = ?";
        $stmt = mysqli_prepare($conexion, $query);
        mysqli_stmt_bind_param($stmt, 'sssi', $tablero, $turno, $ganador, $idpartida);
        
        if (mysqli_stmt_execute($stmt)) {
            echo "Los datos se han actualizado correctamente.";
        } else {
            echo "Error: " . mysqli_stmt_error($stmt);
        }
        mysqli_stmt_close($stmt);
    }else{
        $query = "INSERT INTO partidas (idpartida, tablero, turno, ganador) VALUES (?,?,?,?)";

        $stmt = mysqli_prepare($conexion, $query);
        mysqli_stmt_bind_param($stmt, 'ssss', $idpartida, $tablero, $turno, $ganador);

        if (mysqli_stmt_execute($stmt)) {
          //echo "Los datos se han insertado correctamente.";
        } else {
            // echo "Error: " . mysqli_stmt_error($stmt);
        }
        mysqli_stmt_close($stmt);
    }
    //echo "write";
}else if ($tarea == "read"){
    $query = "SELECT * FROM partidas WHERE idpartida = ?";

    $stmt = mysqli_prepare($conexion, $query);
    mysqli_stmt_bind_param($stmt, 'i', $idpartida);

    if (mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                echo '{"idpartida": "' . $row['idpartida'] . '",';
                    echo '"tablero": "' . $row['tablero'] . '",';
                    echo '"turno": "' . $row['turno'] . '",';
                    echo '"ganador": "' . $row['ganador'] . '"}';
            }
        } else {
            echo '{"idpartida": "nothing"}';
            // echo '{"idpartida": "' . $row['idpartida'] . '",';
            //     echo '"tablero": "' . $row['tablero'] . '",';
            //     echo '"turno": "' . $row['turno'] . '",';
            //     echo '"ganador": "' . $row['ganador'] . '"}';
            //echo "No se han encontrado resultados para el id especificado.";
        }
    } else {
        echo '{"idpartida": "nothing"}';
        //echo "Error: " . mysqli_stmt_error($stmt);
    }

    mysqli_stmt_close($stmt);

    //echo "read";
} else if ($tarea == "update") {

    //echo "update";
} else if ($tarea == "delete") {
    echo "delete";
}
//echo 'Response: ' . $tarea;
?>