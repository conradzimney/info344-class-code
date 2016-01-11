<h1>Lookup Weather</h1>
<form action="" method="GET">
    <div class="form-group">
        <input type="text" 
            id="qInput" 
            name="q"
            class="form-control" 
            value="<?= htmlentities($q) ?>"
            placeholder="enter a zip code or city name"
            required
            >
    </div>
    <div class="form-group">
        <button class="btn btn-primary" type="submit">Get Weather</button>
    </div>
</form>
