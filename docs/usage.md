## Usage

```javascript
var gulp = required("gulp");
var lintspaces = require("gulp-lintspaces");

gulp.task("YOURTASK", function() {
    return gulp.src("**/*.js")
        .pipe(lintspaces(/* options */));
});
```
