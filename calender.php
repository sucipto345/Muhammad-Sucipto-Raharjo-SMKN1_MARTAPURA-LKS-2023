<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Calendar</h1>
    <h2><?php echo $currentMonth . '' . $currentYear; ?></h2>
    <table>
        <thead>
            <tr>
                <th>sun</th>
                <th>mon</th>
                <th>tue</th>
                <th>wed</th>
                <th>thu</th>
                <th>fri</th>
                <th>sat</th>
            </tr>
        </thead>
        <tbody>
            <?php
                for ($row = 0; $row < $numRows; $row++){
                    echo '<tr>';

                    for ($col = 0; $col < 7; $col++) {
                        $index = $row * 7 + $col;

                        if (isset(calendar[$index])) {
                            $day = $calendar[$index];

                            $class = ($day == $today) ? 'highlight' : '';

                            echo "<td class ='$class'>$day</td>";
                        } else {
                            echo '<td></td>';
                        }
                    }

                    echo '</tr>';
                }
            ?>
        </tbody>
    </table>
</body>
</html>