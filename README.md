# chunk-view
Visualize http chunks for an endpoint.

Demo - [here](https://chunk-view-evpytcjatr.now.sh)

I beleive everyone knows why optimizing Time to First Byte(TTFB) is an important metric for improving
performance of your website. By flushing the http response as soon as possible, the browser can incrementally parse the
partial response and fetch the critical resources. By understanding what your server is transmitting at each point in time
you can optimize for TTFB easily. This is an attempt to provide these information.

Most browsers wait for some content before they start rendering the partial chunked http response from your
server. If you are interested in the data, look this [thread](http://stackoverflow.com/questions/16909227/using-transfer-encoding-chunked-how-much-data-must-be-sent-before-browsers-s)

**Note - Will not work if endpoint does not have gzipped and chunked response**.

## Todos

+ Show the available chunks and byte length.
+ Indicate if first byte is >14k.
+ Indicate when the first byte is too slow.
