# this script merges iter results into one result with an average
import csv
import sys
import os

# check if argv is valid, we should have 2 arguments
if len(sys.argv) != 3:
    print(
        f"Usage: {sys.argv[0]} <path_to_results, separated by spaces> <path_to_merged_results>")
    sys.exit(1)

# get path to one of the iter results, we can then get the path to the other iter results
paths = sys.argv[1].split()
out_path = sys.argv[2]


# dict key -> val
# (file, model, lang, strategy, retries, num_comp, temp) -> (iters, successes, [qualities])
results = {}

for path in paths:
    # get iter number
    iter = int(path.split("_")[-1].split(".")[0])

    # read results from file
    with open(path, "r") as f:
        reader = csv.reader(f)
        next(reader)  # skip header
        for row in reader:
            file, model, lang, strategy, retries, num_comp, temp, status, quality = row
            key = (file, model, lang, strategy, retries, num_comp, temp)

            # if the key is not in the dict, add it
            if key not in results:
                results[key] = (1,
                                1 if status == "success" else 0,
                                [quality] if quality != "NA" else [])
            elif status == "success":  # if the key is in the dict, append the quality if we are successful
                curr_iters, curr_status, curr_quality = results[key]
                curr_iters += 1
                curr_status += 1
                curr_quality.append(quality)
                results[key] = (curr_iters, curr_status, curr_quality)
            else:  # we are not successful, but we must increase the number of iters
                curr_iters, curr_status, curr_quality = results[key]
                curr_iters += 1
                results[key] = (curr_iters, curr_status, curr_quality)


# average the qualities
for key in results:
    iters, status, qualities = results[key]
    if len(qualities) > 0:
        results[key] = (iters, status, sum(
            map(float, qualities)) / len(qualities))
    else:
        results[key] = (iters, status, "NA")

# write results to file
with open(out_path, "w") as f:
    writer = csv.writer(f)
    writer.writerow(
        ["file", "model", "lang", "strategy", "retries", "num_comp", "temp",  "iters", "successes", "avg_quality"])
    for key in results:
        writer.writerow(list(key) + list(results[key]))
