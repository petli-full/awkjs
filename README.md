# awkjs
The JavaScript compilation of GNU awk that can be run in browser and NodeJS.

This JavaScript library is a result of compiling [GNU awk](https://www.gnu.org/software/gawk/) using [emscripten](https://emscripten.org/). [Here](https://opensource.com/article/19/4/command-line-playgrounds-webassembly) is a step-by-step guide on how to do it. Though the guide uses jq for the example, but the process is the same. 

### install it
```
npm install awkjs --save
```

### use it in the code
```
import { awkjs } from 'awkjs';

awkjs().then(({ awk }) => {
    // echo 'Hello World' | awk '{$2="AWK"; print $0}'
    const output = awk('Hello World', '{$2="AWK"; print $0}', []);
    // stdout has the result (succeeds)
    const result = output.stdout;
    // stderr has the error (fails)
    const error = output.stderr;
});
```
or
```
var awkjs = require("awkjs").awkjs

awkjs().then(({ awk }) => {
    // echo 'Hello World' | awk '{$2="AWK"; print $0}'
    const output = awk('Hello World', '{$2="AWK"; print $0}', []);
    console.log(output);
});
```

### just a note 
The above `awkjs()` promise resolves to the [Module](https://emscripten.org/docs/api_reference/module.html) object of emscripten API. However, for this library, the user should only cares and uses the `awk` method. Other members in the `Module` object should never be used.

### more examples
```
// awk -V
awkjs().then(({ awk }) => {
    const output = awk('', '', ['-V'])
});

// echo 'AWK is an awesome!\nIt is usefully.\nAWK is cool.' | awk '/^AWK/'
awkjs().then(({ awk }) => {
    const output = awk('AWK is an awesome!\nIt is usefully.\nAWK is cool.', '/^AWK/', []);
});

// echo 'JAVA code\nphp code\nJava tests' | awk 'tolower($0) ~ /^java/;'
awkjs().then(({ awk }) => {
    const output = awk('JAVA code\nphp code\nJava tests', 'tolower($0) ~ /^java/;', []);
});
```

### version
```
GNU Awk 5.1.0, API: 3.1
```