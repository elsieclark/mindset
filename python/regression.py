import numpy as np
import pandas

from pandas import DataFrame, Series
import statsmodels.formula.api as sm
from sklearn.linear_model import LinearRegression
import scipy, scipy.stats
import matplotlib.pyplot as plt
import time

time = "time"
time += "\n" + str(0+25/60.0)
time += "\n" + str(0+30/60.0)
time += "\n" + str(0+35/60.0)
time += "\n" + str(0+40/60.0)
time += "\n" + str(0+45/60.0)
time += "\n" + str(0+50/60.0)
time += "\n" + str(0+55/60.0)
time += "\n" + str(1+0/60.0)
time += "\n" + str(1+45/60.0)
time += "\n" + str(1+50/60.0)
time += "\n" + str(1+55/60.0)
time += "\n" + str(2+0/60.0)
time += "\n" + str(2+5/60.0)

time += "\n" + str(2+45/60.0)
time += "\n" + str(3+5/60.0)
time += "\n" + str(3+10/60.0)
time += "\n" + str(3+15/60.0)

time_results = "score\n"
time_results += "3501.8\n"  # 12:27
time_results += "4146\n"    # 12:32
time_results += "3756.9\n"  # 12:37
time_results += "4669.1\n"  # 12:42
time_results += "5514.1\n"  # 12:47
time_results += "5065.7\n"  # 12:52
time_results += "3482.7\n"  # 12:57
time_results += "3611.6\n"  # 1:02
time_results += "3182.6\n"  # 1:46
time_results += "3721.6\n"  # 1:51
time_results += "3533.7\n"  # 1:56
time_results += "3868.7\n"  # 2:01
time_results += "2883\n"    # 2:06

time_results += "4030.5\n"    # 2:47
time_results += "4905\n"    # 3.5
time_results += "4308\n"    # 3.10
time_results += "3996.1"    # 3.15
#time_results += "\n"

time_results = time_results.split("\n")
scores = []
for each in time_results[1:]:
	scores.append(str(125 - float(each)*0.025))
scores = "\n".join([time_results[0]] + scores)
print scores


eeg_data = "alpha beta delta gamma theta"
eeg_data += "\n58.8537 39.2216 66.5193 27.6128 48.3451"  # 12:25
eeg_data += "\n41.0605 35.414 41.1774 39.2252 33.053"
eeg_data += "\n41.8218 34.5681 44.3741 37.4 36.6726"  # 12:35
eeg_data += "\n41.5414 36.452 37.0126 38.04 37.4083"
eeg_data += "\n42.2926 33.8757 43.5776 39.6556 36.5269"  # 12:45
eeg_data += "\n37.408 33.132 31.2224 36.2745 27.7889"
eeg_data += "\n44.1239 35.2061 40.8915 35.6851 39.795"  # 12:55
eeg_data += "\n36.8351 33.3033 35.615 37.8238 30.328"  # 1:00
eeg_data += "\n56.8672 49.7827 63.2843 31.6064 49.3013"  # 1:45
eeg_data += "\n59.178 54.4678 58.8618 36.7817 52.0482"  # 1:50
eeg_data += "\n56.4118 54.5052 61.976 30.9845 51.6689"  # 1:55
eeg_data += "\n66.9307 45.9328 77.0937 25.9046 57.762"  # 2:00
eeg_data += "\n61.8261 51.1428 66.745 32.0554 55.0229"  # 2:05

eeg_data += "\n66.246 69.1946 55.1495 61.9056 63.2806"  # 2:45
eeg_data += "\n45.6559 41.4936 51.7716 33.9494 39.1077"  # 3:05
eeg_data += "\n52.048 47.7258 50.2586 35.4888 43.7294"  # 3:10
eeg_data += "\n65.5253 55.8265 44.9253 47.9814 51.5608"  # 3:15

eeg_data = eeg_data.split("\n")
scores = scores.split("\n")
time = time.split("\n")

print len(eeg_data)
print len(time_results)

combined = []
for i in range(len(eeg_data)):
	combined.append(eeg_data[i].rstrip() + " " + scores[i].rstrip() + " " + time[i])
combined = "\n".join(combined)

print combined
d = combined.split('\n')
d = [ i.split(' ') for i in d ]

for i in range( len( d ) ):
	for j in range( len( d[0] ) ):
		try:
			d[i][j] = float( d[i][j] )
		except:
			pass

df = DataFrame(d[1:], columns=d[0])
print str(df)



plt.scatter( df.gamma, df.score,
         marker='o',
         edgecolor='b',
         facecolor='none',
         alpha=0.5 )

plt.xlabel('Gamma')
plt.ylabel('Score')
plt.savefig('gammaVscore2.png', fmt='png', dpi=100)



model = sm.ols(formula="score ~ gamma", data=df).fit()
print model.summary()