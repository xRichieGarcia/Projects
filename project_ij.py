#import numpy as np


sample_size = 50
#  self.data = np.empty(100, dtype=string)
data = [None] * sample_size
i = 'i'
j = 'j'

for l in range(sample_size):
  data[l] = input('Enter the letter i or j: ')
print('Your Data:')
print(data)

sequence = ''
count = 0
seq_set = {}

for l in range(5, sample_size-1):
  sequence = ''.join(str(m) for m in data[l-5:l-1])
  if sequence not in seq_set:
    seq_set[sequence] = [0,0]
    count+=1
  
  if data[l] == 'i':
    seq_set[sequence][0] +=1
  
  if data[l] == 'j':
    seq_set[sequence][1] +=1
  

print('Total unique sequences: ' + str(count))
print("'xxxx':[i_count, j_count]")
print(seq_set)

latest_seq = ''.join(str(m) for m in data[sample_size-5:sample_size-1])
if latest_seq not in seq_set:
    print('I actually have no idea')
else:
    delta = seq_set[latest_seq][1] - seq_set[latest_seq][0]
    odds = str(seq_set[latest_seq][0]) + ':' + str(seq_set[latest_seq][1])
    if delta > 0:
        print('Guess j, i:j odds ' + odds)
    if delta == 0:
        print('Even odds, go figure')
    if delta < 0:
        print('Guess i, i:j odds ' + odds)
