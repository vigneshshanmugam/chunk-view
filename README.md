# chunk-view
Visualize http chunks for an endpoint.

Demo - [here](https://chunk-view-fknotjnayb.now.sh/)

I beleive everyone knows why optimizing Time to First Byte(TTFB) is an important metric for improving
performance of your website. By flushing the http response as soon as possible, the browser can incrememtally parse the
partial response and show meaninful content to the user fast. By understanding what your server is transmitting at each point in time
you can optimize for TTFB easily. This is an attempt to provide these information.

Most browsers wait for some content before they start rendering the partial chunked http response from your
server. If you are interested in the data, look this [thread](http://stackoverflow.com/questions/16909227/using-transfer-encoding-chunked-how-much-data-must-be-sent-before-browsers-s)

** Note - Will not work if endpoint does not have gzipped and chunked response**.

## Todos

+ Show the available chunks and byte length.
+ Indicate if first byte is >14k.
+ Indicate when the first byte is too slow.

## License

The MIT License (MIT)

Copyright (c) 2016 Zalando SE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.