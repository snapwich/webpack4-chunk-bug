```
npm install
npm run bootstrap
npm run build-shared
```
View console output at `localhost:5000`

All entry points executed except entry.js from splitChunks, being part of shared cacheGroup somehow prevents it
from executing like a normal entry point.

```
npm run build-no-shared
```

All entry points are executed.