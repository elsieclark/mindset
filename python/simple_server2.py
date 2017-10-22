rom bottle import Bottle, request, response, run, post
from bottle import static_file
app = Bottle()
import time
import os

@app.route('/get_data/', method="POST")
def from_laptop():
   to_time = 20*int(time.time()/20)
   from_time = 20*int(float(request.params["from"])/20)
   print to_time
   print from_time
   time_data = []
   for i in range(from_time/20, to_time/20):
      search_time = i*20
      got_data = False
      while not got_data:
         if not os.path.isfile(str(search_time) + ".short"):
			print str(search_time) + " is missing"
			search_time -= 20
		 elif not len(open(str(search_time) + ".short").read().spl$
		 print "Corrupted file"
		 search_time -= 20
		 else:
			 got_data = True
		 fileread = open(str(search_time) + ".short").read()
		 filedata = fileread.split(" ")
      dict = {'alpha':filedata[0], 'beta':filedata[1], 'delta':fil$
      time_data.append(dict)
   outer = {}
   outer['type'] = 'muse'
   outer['firstTimestamp'] = from_time
   outer['lastTimestamp'] = to_time
   outer['data'] = time_data
   return outer

@app.route('/send_data/', method="POST")
def from_muse():
   timestamp = str(20*int(time.time()/20))
   longfile = open(timestamp + ".long", "w")
   shortfile = open(timestamp + ".short", "w")
   raw_data = request.params["data"]
   raw_data = raw_data.split(" ")
   while "" in raw_data:
      raw_data.remove("")
   print raw_data
   simplified = []
   for type in range(5):
	   sum = 0
	   for val in range(6):
		   if raw_data[type * 6 + val] == "NaN":
			   raw_data[type * 6 + val] = 0
		   sum += float(raw_data[type * 6 + val])
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

        run(app, host='165.227.46.196', port=4245)
        #run(app, host=options.host, port=int(options.port))
