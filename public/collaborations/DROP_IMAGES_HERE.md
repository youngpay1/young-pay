# Drop images here

One image per collaboration entry. File name must match exactly what's in `src/data/collaborations.ts`.

## Current entries and their expected filenames

### Artists
- travis-scott.jpg
- shoreline-mafia.jpg
- madeinTYO.jpg
- pierre-bourne.jpg
- lancey-foux.jpg
- slimesito.jpg
- night-lovell.jpg
- jay1.jpg
- brickz.jpg
- adlib.jpg
- pashani.jpg
- elias.jpg

### Venues
- trap-hole.jpg
- zoom.jpg
- soho-house.jpg
- paris.jpg
- zimmer.jpg

### Brands
- trap-or-die.jpg
- culture-vibes.jpg
- barrys.jpg
- emt.jpg
- melt.jpg

## Adding a new entry
1. Drop the image here with any filename (e.g. `new-artist.jpg`)
2. Open `src/data/collaborations.ts` and add an entry:
   { id: 'new-artist', name: 'New Artist', type: 'artist', images: ['/collaborations/new-artist.jpg'] }
3. Vite hot-reloads — appears immediately in the grid.
