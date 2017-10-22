from bottle import Bottle, request, response, run, post
from bottle import static_file
app = Bottle()
import time

@app.route('/send_data/', method="POST")
def from_muse():
   timestamp = str(20*int(time.time()/20))
   longfile = open(timestamp + ".long", "w")
   shortfile = open(timestamp + ".short", "w")
   raw_data = request.params["data"]
   raw_data = raw_data.split(" ")
   if ("Nan" in raw_data) or ("0.0000" in raw_data):
      print "INVALID"
      print raw_data
      return "ok"
   while "" in raw_data:
      raw_data.remove("")
   print raw_data
   simplified = []
   for type in range(5):
      sum = 0
      for val in range(6):
         if raw_data[type*6+val] == "NaN":
            raw_data[type*6+val] = 0
         sum += float(raw_data[type*6+val])
      simplified.append(sum)
   raw_data = map(lambda x: str(x), raw_data)
   simplified = map(lambda x: str(x), simplified)
   longfile.write(" ".join(raw_data))
   longfile.close()
   shortfile.write(" ".join(simplified))
   shortfile.close()
   return "ok"

if __name__ == '__main__':
        from optparse import OptionParser
        parser = OptionParser()
        parser.add_option("--host", dest="host", default="localhos$
        help="hostname or ip address", metavar="host")
        parser.add_option("--port", dest="port", default=8080,
        help="port number", metavar="port")
        (options, args) = parser.parse_args()

        run(app, host='165.227.46.196', port=4242)
        #run(app, host=options.host, port=int(options.port))
