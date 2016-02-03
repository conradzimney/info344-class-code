<h1>Possible Matches</h1>
<ul>
<<<<<<< HEAD
    <?php foreach($matches as $match):?>
=======
    <?php foreach($matches as $match): ?>
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
    <li>
        <?= htmlentities($match['primary_city']) ?>,
        <?= htmlentities($match['state']) ?>
        <?= htmlentities($match['zip']) ?>
        <?= htmlentities($match['country']) ?>
    </li>
    <?php endforeach; ?>
</ul>