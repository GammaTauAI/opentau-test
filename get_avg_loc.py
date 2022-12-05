# this program gets the average, min, max and standard deviation of the lines of codes
# in all the files in the directory

import os
import sys

# check that the user has given a directory
if len(sys.argv) != 2:
    print("Usage: get_avg_loc.py <directory>")
    sys.exit(1)

# get the directory
directory = sys.argv[1]

# check that the directory exists
if not os.path.isdir(directory):
    print("Error: the given directory does not exist")
    sys.exit(1)

# get the list of files in the directory
files = os.listdir(directory)

# check that there are files
if len(files) == 0:
    print("Error: there are no files in the given directory")
    sys.exit(1)

# get the lines of code in each file
loc = []
for file in files:
    # get the lines of code in the file
    with open(os.path.join(directory, file)) as f:
        loc.append(len(f.readlines()))

# get the average, min, max and standard deviation
avg = sum(loc) / len(loc)
minimum = min(loc)
maximum = max(loc)
std = (sum([(x - avg) ** 2 for x in loc]) / len(loc)) ** 0.5

# print the results
print("Average: {}".format(avg))
print("Min: {}".format(minimum))
print("Max: {}".format(maximum))
print("Standard deviation: {}".format(std))

